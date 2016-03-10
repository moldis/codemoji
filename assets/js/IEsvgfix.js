;(function (window, $) {
  function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
  }

  if (detectIE()) {
  // if (true) {
    function fixSvgDimensions () {
      // $('[data-svg]').each(function() {
      $('svg').parent().each(function() {
        var $svg = $('svg', this)
        var $wrapper = $(this)

        var svgWidth = $svg.attr('width')
        var svgHeight = $svg.attr('height')

        console.info($wrapper.attr('class'), $svg, $wrapper)
        console.info(!!svgWidth || !!svgHeight)

        if (svgWidth && svgHeight) {
          svgWidth = parseInt(svgWidth, 10)
          svgHeight = parseInt(svgHeight, 10)

          var wrapperWidth = parseInt($wrapper.css("width"), 10)
          var wrapperHeight = parseInt($wrapper.css("height"), 10)

          console.log(wrapperWidth, wrapperHeight)

          $svg.attr('height', '100%')
          $svg.attr('width', '100%')

          var fixWidth = $wrapper.attr('iefix-width') !== undefined
          var fixHeight = $wrapper.attr('iefix-height') !== undefined

          if (!fixWidth && !fixHeight)
            fixHeight = true

          console.log(fixWidth, fixHeight)
          console.log(svgWidth, svgHeight)

          if (fixHeight) {
            $wrapper.css('height', wrapperWidth * svgHeight / svgWidth)
          } else if (fixWidth) {
            $wrapper.css('width', wrapperHeight * svgWidth / svgHeight)
          }
        }
      })
    }
    $(document).ready(function () { fixSvgDimensions() })
    $(window).resize(function () { fixSvgDimensions() })
  }
}(window, window.jQuery));
