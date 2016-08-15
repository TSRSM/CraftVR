var myRotation = {};
myRotation.myx = 0;
myRotation.myy = 0;
myRotation.myz = 0;

var my360img = 'https://dl.dropboxusercontent.com/u/45973806/_Project/RD026_Aframe/360low2.jpg';
var myPanel1 = 'https://raw.githubusercontent.com/kabiroberai/CraftVR/master/Website/img/CraftVR.png?token=AFrCzI1jtsQ4rSanR1gI0AchQSHfSRV7ks5XuwFXwA%3D%3D';

jQuery.getScript("https://aframe.io/releases/0.2.0/aframe.min.js", function(data, status, jqxhr) {

	/*
		do something now that the script is loaded and code has been executed
	*/
  $('#myAframe').html( "\
        <a-scene>\
          <a-sky id='my360' src='"+my360img+"' rotation='0 0 0'></a-sky>\
          <a-curvedimage id='panel1' src='"+myPanel1+"' radius='20' theta-length='10' height='4' rotation='0 0 0' scale='1 1 1' ></a-curvedimage>\
      </a-scene>");

  TweenMax.to(myRotation,600,{myx:0, myy:1440, myz:0, onUpdate:updateHandie});

  function updateHandie()
  {

  }

});

/*DRAG*/
(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);

$('#drag').drags();
/*
function confirm_position(){

}*/
