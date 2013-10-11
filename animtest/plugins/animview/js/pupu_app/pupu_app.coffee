PupuApp = RSence.GUIApp.extend
  drawSubviews: ->
    _values = @values
    @list = HRadioButtonList.new( [ 0, 0, 120, null, null, 0 ], @,
      bind: _values.anim_select
      listItems: _values.anim_files.value
    )
    HValueAction.new( @list,
      action: 'setListItems'
      bind: _values.anim_files
    )
    @frame = PupuFrame.new( [ 120, 0, null, null, 0, 24 ], @,
      bind: _values.anim_select
    )
    HValueAction.new( @frame,
      action: 'refreshValue'
      bind: _values.anim_built
    )
    @speed = HSlider.new( [ 120, null, null, 24, 0, 0 ], @,
      bind: _values.anim_speed
      minValue: 10
      maxValue: 5000
    )
    HValueAction.new( @frame,
      action: 'refreshValue'
      bind: _values.anim_speed
    )
