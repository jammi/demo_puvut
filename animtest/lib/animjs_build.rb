
require 'nokogiri'
require 'json'

class AnimJSBuild
  def initialize
    libpath = File.split( __FILE__ )[0]
    projpath = File.expand_path( '../../', libpath )
    @jspath = File.expand_path( 'js', projpath )
    @animpath = File.expand_path( 'anim', projpath )
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
  def build_js
    svgs = JSON.pretty_generate( build_svgs )
    js_files = {}
    Dir.entries( @jspath ).each do |file|
      if file.end_with?('.js')
        jsfile = File.expand_path( file, @jspath )
        ( js_order, js_name ) = file.split('.').first.split('_')
        # puts "#{js_order.inspect}, #{js_name.inspect}"
        js_data = File.read( jsfile )
        if js_name == 'animdata'
          js_data.gsub!('{}','  '+svgs.gsub("\n","\n  "))
        end
        js_files[js_order] = "/** #{js_name} **/\n#{js_data}"
      end
    end
    js_arr = []
    js_files.keys.sort.each do |js_order|
      js_arr.push( js_files[js_order] )
    end
    js_arr.join('')
  end
end
if $0 == __FILE__
  puts AnimJSBuild.new.build_js
end
