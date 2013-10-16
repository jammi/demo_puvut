require 'nokogiri'

class AnimSVGBuild
  def initialize( animpath )
    @animpath = animpath
  end
  def read_svg_paths( svgfile )
    # rounds coordinaties to closest integer using optionally up/downscaling
    def reducepath(pdata,scale=0.1)
      numre = /([0-9\.]+)/s
      pdata.gsub(numre) { |n| (scale*n.to_f).round.to_s }
    end
    # verifies the layers are identical in structure
    def verify_layers( svgfile, layer_names, layers_arr )
      first_layer = layers_arr.first
      num_paths = first_layer.length
      pts = []
      first_layer.each do |path|
        pts << path.split(' ').map { |c| c[0] }
      end
      layers_arr.each_with_index do |layer_arr,i|
        if layer_arr.length != num_paths
          warn "#{svgfile}: #{layer_names[i]}: path count mismatch: #{layer_arr.length} != #{num_paths}"
        end
        layer_arr.each_with_index do |path,j|
          splitpath = path.split(' ')
          if splitpath.length != pts[j].length
            warn "#{svgfile}: #{layer_names[i]}: path #{j} parts count: #{splitpath.length} != #{pts[j].length}"
          end
          splitpath.each_with_index do |c,k|
            if c[0] != pts[j][k]
              warn "#{svgfile}: #{layer_names[i]}: path #{j} structure mismatch; index #{k} #{c[0]} != #{pts[j][k]}"
            end
          end
        end
      end
    end
    svgdata  = File.read( svgfile )
    svg = Nokogiri::XML( svgdata )
    svg.remove_namespaces!
    layers = {}
    svg.xpath("//g").each do |g|
      name = g['id']
      paths = []
      g.xpath("path").each do |path|
        paths << path['d']
      end
      layers[name] = paths.dup
    end
    layers_arr = []
    layer_keys = layers.keys.sort
    layer_keys.each do |key|
      paths = layers[key]
      paths.map! { |path| reducepath( path, 1.0 ) }
      layers_arr << paths
    end
    verify_layers( svgfile, layer_keys, layers_arr )
    layers_arr
  end
  def build_svgs
    anims = {}
    Dir.entries( @animpath ).each do |file|
      if file.end_with?('.svg')
        svgfile = File.expand_path( file, @animpath )
        anim_name = file.split('.').first
        anims[anim_name] = read_svg_paths( svgfile )
      end
    end
    anims
  end
end
