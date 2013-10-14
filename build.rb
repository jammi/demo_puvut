#!/usr/bin/env ruby

mode2 = false
if ARGV.length == 0
  mode2 = true
elsif ARGV.length != 1 and not File.exist? ARGV.first
  puts "Usage: #{$0} svgfile.svg"
  exit
end


require_relative 'animtest/lib/animhtml_build'

if mode2
  tmplpath = 'tmpl/main_tmpl.html'
  animhtml_build = AnimHTMLBuild.new( tmplpath )
  puts animhtml_build.build_html2
else
  svgpath  = ARGV.first
  htmlpath = svgpath.gsub('.svg','.html')
  tmplpath = 'tmpl/anim_3frame.html'
  animhtml_build = AnimHTMLBuild.new( tmplpath )
  animhtml_build.build_html( svgpath, htmlpath )
end
