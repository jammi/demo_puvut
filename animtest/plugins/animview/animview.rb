require 'animhtml_build'
class PupuAnim < GUIPlugin
  def open
    super
    @build = AnimHTMLBuild.new(
      File.expand_path(
        '../tmpl/anim_3frame.html',
        RSence.env_path
      )
    )
  end
  def score; 100; end
  def valid_uri( uri, exact=true )
    return true if not exact and uri.start_with?('/animhtml/')
    return false unless uri.start_with?('/animhtml/') and uri.end_with?('.html')
    anim_file = uri.split('/')[-1].split('.')[0]
    anim_files(true).include?(anim_file)
  end
  def match( uri, m ); (m == :get and valid_uri(uri,false)); end
  def ses_data( ses, name )
    ses[:animview][name].data
  end
  def get( req, res, ses )
    uri = req.fullpath
    unless valid_uri( uri )
      res.status = 404
      res['Content-Type'] = 'text/plain'
      res.body = "Error 404: Pupu not found!"
      return
    end
    res.status = 200
    res['Content-Type'] = 'text/html; charset=UTF-8'
    res['Date'] = httime( Time.now )
    res['Cache-Control'] = 'no-cache'
    svg_path = File.expand_path( ses_data(ses,:anim_select)+'.svg', anim_dir )
    anim_speed = ses_data(ses,:anim_speed)
    html_data = @build.build_html( svg_path, false, anim_speed )
    res.body = html_data
  end
  def anim_dir; bundle_path '../../../anim'; end
  def anim_name_path( name ); File.expand_path( name, anim_dir ); end
  def anim_files(flat=false)
    files = []
    Dir.entries( anim_dir ).each do |file|
      if file.end_with? '.svg'
        filebase = file.split('.svg').first
        if flat
          files << filebase
        else
          files << [
            filebase,
            filebase.capitalize
          ]
        end
      end
    end
    files
  end
  def anim_first
    anim_files.first.first
  end
  def anim_select( msg, value )
    get_ses(msg,:anim_built).set(msg,0)
    true
  end
  def anim_mtime( file )
    path = anim_name_path( file )
    return 0 unless File.exist? path
    File.stat( path ).mtime.to_i
  end
  def idle( msg )
    ses = get_ses(msg)
    last_built = ses[:anim_built].data
    selected_anim = ses[:anim_select].data
    last_mtime = anim_mtime( selected_anim )
    if last_built < last_mtime
      ses[:anim_built].set( msg, last_mtime )
    end
    if anim_files != ses[:anim_files].data
      ses[:anim_files].set( msg, anim_files )
      unless anim_files.include? selected_anim
        ses[:anim_select].set( msg, anim_first )
      end
    end
  end
end
