var bootcards = bootcards || {};

//check the screen size
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

//replace one element with another using a fade effect
bootcards.fade = function(fadeOut, fadeIn) {
	fadeOut.fadeOut(250, function() {
		fadeOut.hide();
		fadeIn
			.hide()
			.removeClass("hidden-xs")
			.fadeIn(250)
	});
}

//back to the list of cards
bootcards.backToList = function() {
	this.fade(
		$(".cards"),
		$(".list")
	)
}

//pjax on all a's that have the data-pjax attribute (the attribute's value is the pjax target container)
$(document)
	.pjax('a[data-pjax]')
	.on('submit', 'form[data-pjax]', function(event) {
		//use pjax to submit forms
  		$.pjax.submit(event);
	})
	.on('pjax:start', function(event) {
		//called before initiating  a pjax content update: add an active class

		$(event.relatedTarget)
			.addClass('active')
			.siblings('.active')
				.removeClass('active');


	})
	.on('pjax:complete', function(event) {
		//called after a pjax content update

		//hide the offcanvas slider
		$(".offcanvas").offcanvas('hide');
		$(".navbar-collapse.in").collapse('hide');

		//check for a modal to close
		var modal = $(event.relatedTarget).closest('.modal');
		if (modal.length) {
			modal.modal('hide');
		}


		var $tgt = $(event.target);
		var cards_column = $tgt.closest('.cards');

		if ( bootcards.findBootstrapEnvironment() == "ExtraSmall" ) {
			//for small screens: replace the list by the details

			var list = $(event.relatedTarget).closest('.list');

			if ( list.length ) {
				bootcards.fade( list, cards_column );
			}
			
		}

		//scroll to the target element (so it doesn't render outside the viewport
		if (cards_column) {

			var top = $tgt.position().top;

			if (top <= 60) {
				top = 0;	//scroll to the top if the target is a few pixels below the top
			}

			cards_column.animate({scrollTop:top}, '500', 'easeOutExpo'); 
		}

	});

bootcards.confirm = function(type, to) {

	if ( confirm('Are you sure you want to delete this '  + type + '?') ) {
		var modal = $(event.relatedTarget).closest('.modal');
		if (modal.length) {
			modal.modal('hide');
		}
	}

}

bootcards.confirmDelete = function(type) {

	if ( confirm('Are you sure you want to delete this '  + type + '?') ) {
		var modal = $(event.target).closest('.modal');
		if (modal.length) {
			modal.modal('hide');
		}
	}

}

$(document).ready( function() {
	//enable the slide in menu
    $('.offcanvas').offcanvas({
    	toggle : false
    });
    $('.offcanvas-toggle').on('click', function() {
    	$('.offcanvas').offcanvas('toggle');
    })

    //destroy modals on close (to reload the contents when using the remote property)
    $('body').on('hidden.bs.modal', '.modal', function () {  	
  		$(this).removeData('bs.modal');
	});
   
});

//enable fastclick
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

