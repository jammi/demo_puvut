require 'nokogiri'
require_relative 'animjs_build'
class AnimHTMLBuild
  def tmpldata
    File.read(@tmplpath)
  end
  def initialize( tmplpath )
    @tmplpath = tmplpath
    @jsbuild = AnimJSBuild.new
  end
  def build_html( svgpath, htmlpath, animspeed=1000 )
    svgdata  = File.read(svgpath)
    htmldata = tmpldata
    svg = Nokogiri::XML( svgdata )
    svg.remove_namespaces!
    layers = {}
    svg.xpath("//g").each do |g|
      name = g['id']
      path = g.xpath("path").first['d']
      layers[name] = path.dup
    end
    jslines = []
    def reducepath(pdata,scale=0.1)
      numre = /([0-9\.]+)/s
      pdata.gsub(numre) { |n| (scale*n.to_f).round.to_s }
    end
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
  def build_html2
    tmpldata.gsub( '---', @jsbuild.build_js )
  end
end
