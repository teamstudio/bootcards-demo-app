var bootcards = bootcards || {};

bootcards.findBootstrapEnvironment = function() {
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

bootcards.bootcardsanimateLeft = function($src, $tgt){
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

		//scroll to the target element (so it doesn't render outside the viewport
		var column = $(event.target).closest(".cards");

		if (column) {

			var top = $(event.target).position().top;

			if (top <= 60) {
				top = 0;	//scroll to the top if the target is a few pixels below the top
			}

			column.animate({scrollTop:top}, '500', 'easeOutExpo'); 
		}

		if ( bootcards.findBootstrapEnvironment() == "ExtraSmall" ) {

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

