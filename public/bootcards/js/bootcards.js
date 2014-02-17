$(document).ready(function() {
	
			 loadCSS = function(href) {
			     var cssLink = $("<link rel='stylesheet' type='text/css' href='/bootcards/css/"+href+"'>");
			     $("head").append(cssLink); 
			 };		
			 
			 if (navigator.userAgent.match(/Android/i)) {
				 loadCSS('bootcards-android.css');
			 }
			 else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {		
				 loadCSS('bootcards-ios.css');
			 }
			 else {
				 loadCSS('bootcards-desktop.css');
			 }
		});	


var bootcards = bootcards || {};

function findBootstrapEnvironment() {
    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
    var envValues = ["xs", "sm", "md", "lg"];

    $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envValues.length - 1; i >= 0; i--) {
        var envVal = envValues[i];

        $el.addClass('hidden-'+envVal);
        if ($el.is(':hidden')) {
            $el.remove();
            return envs[i]
        }
    };
}

function animateLeft($src, $tgt){
    var $parent = $src.parent();
    var width = $parent.width();
    var srcWidth = $src.width();
    
    //$src.css({position: 'absolute'});
    //$tgt.hide().appendTo($parent).css({left: width, position: 'absolute'});

    $src.css({position: 'absolute'});
    $tgt.hide().appendTo($parent).css({left: width, position: 'absolute'});
    
    $src.animate({left : -width}, 500, function(){
        $src.hide();
        $src.css({left: null, position: null});
    });
    $tgt.show().animate({left: 0}, 500, function(){
        $tgt.css({left: null, position: null});
    });
}

//pjax on all a's that have the data-pjax attribute, the attribute's value is the pjax target container
$(document)
	.pjax('a[data-pjax]')
	.on('submit', 'form[data-pjax]', function(event) {
  		$.pjax.submit(event);
	})
	.on('pjax:start', function(event) {
		//called before initiating  a pjax content update

		$(event.relatedTarget)
			.addClass('active')
			.siblings('.active')
				.removeClass('active');

		



	})
	.on('pjax:complete', function(event) {
		//called after a pjax content update

		//check the position of the 'cards' column:
		//scroll to the top if needed
		var cards = $(".cards");
		cards.animate({scrollTop:0}, '500', 'easeOutExpo'); 
		
		if ( findBootstrapEnvironment() == "ExtraSmall" ) {

			$slideOut = $(event.relatedTarget)
				.parent()
					.parent();

			$slideIn = $("#contactDetails").hide();

			animateLeft($slideOut, $slideIn);

    



  /*  $("#btnAnimate").click(function(){
        animateLeft($first, $second);
        var tmp = $first;
        $first = $second;
        $second = tmp;
    });*/


			
/*
			var width = $(window).width();

			$container
				.animate({left : -width}, 500, function(){
					$container.hide()
				});
			$("#contactDetails")
				.css({left: width}).show().animate({left: 0}, 500);
*/

		}
		



	});

