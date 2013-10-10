#!/usr/bin/env ruby

svgdata  = File.read('puvujuoksu.svg')
htmldata = File.read('puvujuoksu.html')

require 'nokogiri'
svg = Nokogiri::XML( svgdata )
svg.remove_namespaces!
layers = {}
svg.xpath("//g").each do |g|
  name = g['id']
  path = g.xpath("path").first['d']
  p name,path
  layers[name] = path.dup
end
jslines = []
def reducepath(pdata,scale=0.1)
  numre = /([0-9\.]+)/s
  pdata.gsub(numre) {|n|(scale*n.to_f).floor.to_s}
end
layers.keys.sort.each do |key|
  value = reducepath( layers[key], 0.1 )
  p value, layers[key][0..100]
  puts
  jslines << "    // #{key}:\n    '#{value}'"
end
jsdata = jslines.join(",\n")
re = /(frames \= \[\n)(.*?)(\n  \],\n)/m
newhtml = htmldata.gsub(re,"\\1#{jsdata}\\3")
html = File.open('puvujuoksu.html','w')
html.write( newhtml )
html.close
