PupuFrame = HControl.extend
  componentName: 'pupu_frame'
  animSrc: ->
    animName = @value.split('/').pop().split('.svg')[0]
    "/animhtml/#{new Date().getTime().toString(36)}/#{animName}.html"
  refreshValue: ->
    if @markupElemIds.control
      @elemOfPart('control').src = @animSrc()
