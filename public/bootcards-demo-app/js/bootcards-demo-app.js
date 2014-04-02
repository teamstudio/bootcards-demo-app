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
		var tgtUrl = $(this).attr('href');
		e.preventDefault();
		var tgtUrl = $(this).attr('href');
		//$(pjaxTarget).fadeOut('fast', function() {

			$.pjax( {
				container : pjaxTarget,
				url : tgtUrl
			})

		//})
	});

}

/*setup publish/ subscribe mechanism for changing main menu option */
bootcards.topics = {};
 
jQuery.Topic = function( id ) {
  var callbacks, method,
    topic = id && bootcards.topics[ id ];
 
  if ( !topic ) {
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };
    if ( id ) {
      bootcards.topics[ id ] = topic;
    }
  }
  return topic;
};

//pjax on all a's that have the data-pjax attribute (the attribute's value is the pjax target container)
$(document).ready( function() {

	//publish event when changing main menu option
	$("a[data-title]").on("click", function() {
		$.Topic( "navigateTo" ).publish( $(this).data("title") );
	});

    //destroy modals on close (to reload the contents when using the remote property)
    $('body').on('hidden.bs.modal', '.modal', function () {  	
  		$(this).removeData('bs.modal');
	});

	var pjaxTarget = (bootcards.isXS() ? '#list' : '#listDetails');

	if (bootcards.isXS() ) {

		//on smartphones, we only use the list column
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
	.on('pjax:end', function(event) {

		var $tgt = $(event.target);
		
		//$tgt.fadeIn('fast', function() {
		//});

		if ( bootcards.isXS() ) {

			var $tgt = $(event.target);

			//small screens: change class on container elements (list>card vv)
			var tgtId = $tgt.attr('id');

			if ( tgtId == 'main') {

				$('#list')
					.removeClass('bootcards-cards')
					.addClass('bootcards-list');
				
				//show the back button
				$('.btn-menu').removeClass('hidden');
				$('.btn-back').addClass('hidden');

				//get the panel 
				var $main = $("#main");
				var $panel = $("#main > .panel");
				if ($panel.length>0) {

					var row = $('<div class="row"></div>');
					var container = $('<div class="col-sm-5 bootcards-list" id="list"></div>')
						.appendTo(row);

					$panel.appendTo(container);

					row.appendTo($main);
				}

			} else if (tgtId == 'list') {
				
				$('#list')
					.addClass('bootcards-cards')
					.removeClass('bootcards-list');

				//show the menu button
				$('.btn-menu').addClass('hidden');
				$('.btn-back').removeClass('hidden');

			}
			
		}
		
		bootcards.addPJaxHandlers(pjaxTarget);

	})
	.on('pjax:complete', function(event) {
		//called after a pjax content update
		
		var $tgt = $(event.target);

		//hide the offcanvas slider
		$("#slideInMenu").offcanvas('hide');

		//check for any modals to close
		var modal = $(event.relatedTarget).closest('.modal');
		if (modal.length) {
			modal.modal('hide');
		}

		var cards_column = $tgt.closest('.bootcards-cards');

		//scroll to the target element (so it doesn't render outside the viewport
		if (cards_column.length>0) {
			cards_column.animate({scrollTop:0}, '500', 'easeOutExpo'); 
		}

	});
});

//show a confirmation dialog before NOT deleting an item: this is a demp app after all...
bootcards.confirmDelete = function(type) {

	if ( confirm('Are you sure you want to delete this '  + type + '?') ) {
		var modal = $(event.target).closest('.modal');
		if (modal.length) {
			modal.modal('hide');
		}
	}
}

//enable FastClick
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

//functions to perform if the main menu option has changed
$.Topic( "navigateTo" ).subscribe( function(value) {
	
	//change header title
	$('.navbar-brand').text(value);

	//change active menu option in all navigation menus
	$("a[data-title='" + value + "']").each( function() {

		var $this = $(this);
		var $li = $this.parent('li');

		//add active class to either a parent LI or current A
		($li.length>0 ? $li : $this)
			.addClass('active')
			.siblings('.active')
				.removeClass('active');
	});

} );

//check for rubberbanding
bootcards.disableRubberBanding = function() {
	//console.log("apply it");
   document.body.addEventListener('touchstart', function() {
        document.body.addEventListener('touchmove', function moveListener(e) {
            document.body.removeEventListener('touchmove', moveListener);

            var el = e.target;

            do {

                var h = parseInt(window.getComputedStyle(el, null).height, 10);
                var sH = el.scrollHeight;

                //console.log(el);
                //console.log(h + ' - ' + sH + (h<sH));

                if (h < sH) {
                   //console.log("g");
                    return;
                }
            } while (el != document.body && el.parentElement != document.body && (el = el.parentElement));

            //console.log(" pd");
            e.preventDefault();
        });
    });
/*
    var standaloneClass = navigator.standalone ? 'standalone' : 'no-standalone';
    document.body.classList.add(standaloneClass);

    if (navigator.userAgent.indexOf('iPhone OS 6') > -1) {
        document.body.classList.add('ios6');
        document.body.scrollIntoView();
    }*/
}
