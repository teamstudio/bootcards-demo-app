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



