# PUVUT

A demo to Alt Party 2013

The demo files are in the 'demo' folder,
just open the 'index.html' file to play.

## Development information:

### Building html previews for svg animation

To build a html file from an svg file, do this:
  ./build.rb anim/puvujuoksu.svg

To build the demo, do this:
  ./build.rb > demo/test.html

That will create `anim/puvunjuoksu.html`, which will
enable a simple preview of how the svg works out animated.

### Running the svg animation server

To run the animation preview server, do this:
  rsence-pre run -af animtest

Then point your web browser to http://127.0.0.1:12013/

### Development dependencies:
  - ruby2
  - gem install nokogiri rsence-pre sass

## Credits:
  jammi - code, concept, graphics, animation
  ainu  - support, story, graphics, animation
  frank_one - music
