(function($) {
  var _setOptions = function(popup, option) {
    if( typeof option.btnClass !== 'undefined' ) popup.attr('data-sp-btnClass', option.btnClass);
    if( typeof option.time !== 'undefined' ) {
      popup.attr('data-sp-time', option.time);
    } else {
      popup.attr('data-sp-time', 300);
    }
    if( typeof option.overflow !== 'undefined' ) {
      popup.attr('data-sp-overflow', option.overflow);
    } else {
      popup.attr('data-sp-overflow', true);
    }
    popup.attr('data-sp-scrollWidth', window.innerWidth - document.documentElement.clientWidth);
  };

  var _getOptions = function(popup) {
    var result = {};
    if( popup.attr('data-sp-btnClass') ) result.btnClass = popup.attr('data-sp-btnClass');
    if( popup.attr('data-sp-time') ) result.time = parseInt(popup.attr('data-sp-time'));
    if( popup.attr('data-sp-overflow') ) {
      if( popup.attr('data-sp-overflow') === 'true' ) result.overflow = true;
      if( popup.attr('data-sp-overflow') === 'false' ) result.overflow = false;
    }
    if( popup.attr('data-sp-scrollWidth') ) result.scrollWidth = popup.attr('data-sp-scrollWidth');
    return result;
  };

  var _closePopup = function(popup) {
    var options = _getOptions(popup);
    popup.removeClass('visible');
    setTimeout(function () {
      popup.removeClass('display');
      if(options.overflow) {
        $('html').css({
          'padding-right': 0,
          'overflow': 'auto'
        });
      }
    }, options.time);
  }

  var _openPopup = function(popup) {
    var options = _getOptions(popup);
    popup.addClass('display');
    setTimeout(function () {
      popup.addClass('visible');
    }, 1);
    if(options.overflow) {
      $('html').css({
        'padding-right': options.scrollWidth,
        'overflow': 'hidden'
      });
    }
  }

  var methods = {
    init: function(option) {
      var $popup = this;
      if($popup.length) {
        _setOptions($popup, option);
        var options = _getOptions($popup);
  
        if( !options.btnClass.length ) return;
        $(document).on('click', '.'+options.btnClass, function () {
          if ($popup.hasClass('display')) _closePopup($popup);
          if (!$popup.hasClass('display')) _openPopup($popup);
        });
      }
    },

    open: function() {
      _openPopup(this);
    },

    close: function() {
      _closePopup(this);
    },

    toggle: function() {
      var $popup = this;
      if ($popup.hasClass('display')) {
        _closePopup($popup);
      } else {
        _openPopup($popup);
      }
    }
  };

  $.fn.switchPopup = function(method) {
    if ( methods[method] ) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ( typeof method === 'object' || !method ) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Метод с именем ' +  method + ' не существует для jQuery.switchPopup');
    } 
  };
})(jQuery);
