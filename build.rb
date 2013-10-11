#!/usr/bin/env ruby

unless ARGV.length == 1 and File.exist? ARGV.first
  puts "Usage: #{$0} svgfile.svg"
  exit
end
svgpath  = ARGV.first
htmlpath = svgpath.gsub('.svg','.html')
tmplpath = 'tmpl/anim_3frame.html'
svgdata  = File.read(svgpath)
htmldata = File.read(tmplpath)

require 'nokogiri'
svg = Nokogiri::XML( svgdata )
svg.remove_namespaces!
layers = {}
svg.xpath("//g").each do |g|
  name = g['id']
  path = g.xpath("path").first['d']
  # p name,path
  layers[name] = path.dup
end
jslines = []
def reducepath(pdata,scale=0.1)
  numre = /([0-9\.]+)/s
  pdata.gsub(numre) {|n|(scale*n.to_f).floor.to_s}
end
layers.keys.sort.each do |key|
  value = reducepath( layers[key], 0.1 )
  # p value, layers[key][0..100]
  # puts
  jslines << "    // #{key}:\n    '#{value}'"
end
jsdata = jslines.join(",\n")
re = /(frames \= \[\n)(.*?)(\n  \],\n)/m
newhtml = htmldata.gsub(re,"\\1#{jsdata}\\3")
html = File.open(htmlpath,'w')
html.write( newhtml )
html.close
