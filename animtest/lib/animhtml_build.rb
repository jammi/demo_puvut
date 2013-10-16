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
    htmldata = tmpldata
    jsdata = @jsbuild.svg.read_svg_paths( svgpath ).to_json
    re = /(frames \= )(\[\])(,\n)/m
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
