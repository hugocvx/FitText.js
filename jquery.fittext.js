/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY,
          callback : function{}
         }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this), 
          wlength = $this.text().length || 1,
          size = Math.min(
                    $this.width() / wlength / compressor, 
                    $this.innerHeight() / compressor, 
                    parseFloat(settings.maxFontSize)
            );
      

      // Resizer() resizes items based on the object width divided by 
      // total character found in the element and divided again with the total paragraph line
      // or using object height divided by paragraph line
      var resizer = function () {
        
        $this.css('font-size', Math.max(size,parseFloat(settings.minFontSize)));
        
        callback() ;
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window)
        .on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
