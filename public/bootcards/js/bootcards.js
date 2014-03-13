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
bootcards.crossFade = function(fadeOut, fadeIn) {

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
	this.crossFade(
		$(".bootcards-cards"),
		$(".bootcards-list")
	)
}

//pjax on all a's that have the data-pjax attribute (the attribute's value is the pjax target container)
$(document).ready( function() {

	var isXS = bootcards.findBootstrapEnvironment() == "ExtraSmall";
	
	$(document)
	.pjax('a[data-pjax]')
	.on('submit', 'form[data-pjax]', function(event) {
		//use pjax to submit forms
  		$.pjax.submit(event);
	})
	.on('pjax:beforeSend', function(event) {

		//console.log('beforeSend');

	})
	.on('pjax:start', function(event) {
		//called before initiating  a pjax content update: add an active class

		var $tgt = $(event.relatedTarget);

		$tgt
			.addClass('active')
			.siblings('.active')
				.removeClass('active');

	})
	.on('pjax:popstate', function(event) {
		//code triggered when using the back button to navigate to a cached page

		if (isXS) {
		
			var $tgt = $(event.target);
			var tgtId = $tgt.attr('id');

			

			if (tgtId == 'main') {

				//var cards = $(".bootcards-cards");
				//var list = $(".bootcards-list");
				//bootcards.crossFade( cards, list);

			}
		}
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
		var cards_column = $tgt.closest('.bootcards-cards');

		//update app title to reflect current menu option
		var $rel = $(event.relatedTarget);
		var $title = $rel.attr('data-title');

		if ($title) {
			$('.navbar-brand').text($title);
		}

		if ( isXS ) {
			//for small screens: replace the list by the details

			var tgtId = $tgt.attr('id');

			//get the list
			var list = $(event.relatedTarget).closest('.bootcards-list');

			if ( list.length>0 ) {
				bootcards.crossFade( list, cards_column );
			}

			

			if ( tgtId == 'main') {
				
				$('.btn-menu').removeClass('hidden');
				$('.btn-back').addClass('hidden');

			} else if (tgtId == 'listDetails') {
				
				$('.btn-menu').addClass('hidden');
				$('.btn-back').removeClass('hidden');

			}
			
		}

		//scroll to the target element (so it doesn't render outside the viewport
		if (cards_column.length>0) {
			cards_column.animate({scrollTop:0}, '500', 'easeOutExpo'); 
		}

	});
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

