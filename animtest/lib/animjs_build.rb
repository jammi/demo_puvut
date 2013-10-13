
require 'nokogiri'
require 'json'

class AnimJSBuild
  def tmpldata
    File.read(@tmplpath)
  end
  def initialize
    libpath = File.split( __FILE__ )[0]
    projpath = File.expand_path( '../../', libpath )
    @jspath = File.expand_path( 'js', projpath )
    @animpath = File.expand_path( 'anim', projpath )
  end
  def read_svg_paths( svgfile )
    def reducepath(pdata,scale=0.1)
      numre = /([0-9\.]+)/s
      pdata.gsub(numre) { |n| (scale*n.to_f).round.to_s }
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
    layers.keys.sort.each do |key|
      paths = layers[key]
      paths.map! { |path| reducepath( path, 1.0 ) }
      layers_arr << paths
    end
    layers_arr
  end
  def build_svgs
    Dir.entries( @animpath ).each do |file|
      if file.end_with?('.svg')
        svgfile = File.expand_path( file, @animpath )
        anim_name = file.split('.').first
        anim = {
          'info' => {},
          'data' => read_svg_paths( svgfile )
        }
        puts anim_name
        pp anim
        # exit
      end
    end
  end
  def foo
    jslines = []
    layers.keys.sort.each do |key|
      value = reducepath( layers[key], 1.0 )
      jslines << "    // #{key}:\n    '#{value}'"
    end
    jsdata = jslines.join(",\n")
    re = /(frames \= \[\n)(.*?)(\n  \],\n)/m
    newhtml = htmldata.gsub(
      re,  "\\1#{jsdata}\\3"
    ).gsub(
      "dur: '1000ms',",
      "dur: '#{animspeed}ms',"
    )
    return newhtml if htmlpath == false
    html = File.open(htmlpath,'w')
    html.write( newhtml )
    html.close
  end
end
require 'pp'
AnimJSBuild.new.build_svgs
