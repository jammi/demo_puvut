#!/usr/bin/env ruby

unless ARGV.length == 1 and File.exist? ARGV.first
  puts "Usage: #{$0} svgfile.svg"
  exit
end
svgpath  = ARGV.first
htmlpath = svgpath.gsub('.svg','.html')
tmplpath = 'tmpl/anim_3frame.html'

require_relative 'animtest/lib/animhtml_build'
animhtml_build = AnimHTMLBuild.new( tmplpath )
animhtml_build.build( svgpath, htmlpath )
