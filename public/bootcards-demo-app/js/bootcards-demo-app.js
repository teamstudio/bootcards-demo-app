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

/* add click handlers to links to force a pjax load */
bootcards.addPJaxHandlers = function(pjaxTarget) {
	//add pjax click handler to links
	$('a.pjax').on('click', function(e) {
		e.preventDefault();
		var tgtUrl = $(this).attr('href');
		$(pjaxTarget).fadeOut(200, function() {

			$.pjax( {
				container : pjaxTarget,
				url : tgtUrl
			})

		})
	});

}


//pjax on all a's that have the data-pjax attribute (the attribute's value is the pjax target container)
$(document).ready( function() {

    //destroy modals on close (to reload the contents when using the remote property)
    $('body').on('hidden.bs.modal', '.modal', function () {  	
  		$(this).removeData('bs.modal');
	});

	var isXS = (bootcards.findBootstrapEnvironment() == "ExtraSmall");

	var pjaxTarget = (isXS ? '#list' : '#listDetails');

	//on smartphones, we only use the list column
	if (isXS) {
		$('#listDetails').remove();

		//restrict footer to only 4 items
		var $footer = $(".navbar-fixed-bottom .btn-group");
		if ($footer.length>0) {
			var $links = $('a', $footer);
		
			if ($links.length > 4) {
				$links.each( function(idx) {
					if (idx >= 4) { this.remove(); }
				});
			}
		}

	}
	
	bootcards.addPJaxHandlers(pjaxTarget);

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
	.on('pjax:end', function() {

		
		$(pjaxTarget).fadeIn(200, function() {
		});

		bootcards.addPJaxHandlers(pjaxTarget);

	})

	.on('pjax:complete', function(event) {
		//called after a pjax content update
		
		var $tgt = $(event.target);

		if ( isXS ) {

			var tgtId = $tgt.attr('id');

			if ( tgtId == 'main') {

				$('#list')
					.removeClass('bootcards-cards')
					.addClass('bootcards-list');
				
				//show the back button
				$('.btn-menu').removeClass('hidden');
				$('.btn-back').addClass('hidden');

			} else if (tgtId == 'list') {
				
				$('#list')
					.addClass('bootcards-cards')
					.removeClass('bootcards-list');

				//show the menu button
				$('.btn-menu').addClass('hidden');
				$('.btn-back').removeClass('hidden');

			}
			
		}

		//hide the offcanvas slider
		$(".offcanvas").offcanvas('hide');
		$(".navbar-collapse.in").collapse('hide');

		//check for any modals to close
		var modal = $(event.relatedTarget).closest('.modal');
		if (modal.length) {
			modal.modal('hide');
		}

		//update app title to reflect current menu option
		var $rel = $(event.relatedTarget);
		var $title = $rel.attr('data-title');

		if ($title) {
			$('.navbar-brand').text($title);
		}

		var cards_column = $tgt.closest('.bootcards-cards');

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
