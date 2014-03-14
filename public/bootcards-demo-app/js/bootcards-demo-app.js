/* toggle between the chart and data */

function toggleChartData() {

	var $ev = $(event.target)
	var $chart = $ev.parents('.bootcards-chart');

	if ($chart.length>0) {

		$chart.fadeOut( 'fast', function()  {
			$chart
				.siblings('.bootcards-table')
					.fadeIn('fast')

		});

	} else {
		
		var $data = $ev.parents('.bootcards-table');
		$data.fadeOut( 'fast', function()  {
			$data
				.siblings('.bootcards-chart')
					.fadeIn('fast')

		});

	}
			
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