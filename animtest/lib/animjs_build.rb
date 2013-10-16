require 'json'
require_relative 'animsvg_build'

class AnimJSBuild
  def initialize
    libpath = File.split( __FILE__ )[0]
    projpath = File.expand_path( '../../', libpath )
    @jspath = File.expand_path( 'js', projpath )
    @animpath = File.expand_path( 'anim', projpath )
    @svg = AnimSVGBuild.new( @animpath )
  end
  attr_reader :svg
  def build_js
    svgs = JSON.pretty_generate( @svg.build_svgs )
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
