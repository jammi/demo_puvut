  pupumush: {
    next: 'end',
    time: 150000,
    init: function(t){
      var
      _this = timeline.forest;
      setSVGAttrs( _this.taika, {
        d: _this.taikaPaths[6]
      } );
      _this.taikaAnim3 = createSVGAnim( _this.taika, t, 2000, 0, 'd',
        _this.taikaPaths.join(';')+';'
      );
    }
  },
