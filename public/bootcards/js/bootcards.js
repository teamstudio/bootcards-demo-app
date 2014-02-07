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

//pjax on all a's that have the data-pjax attribute, the attribute's value is the pjax target container
$(document)
	.pjax('a[data-pjax]')
	.on('submit', 'form[data-pjax]', function(event) {
  		$.pjax.submit(event);
	})
	.on('pjax:start', function() {
		//called before initiating  a pjax content update

	})
	.on('pjax:end', function() {
		//called after a pjax content update

		//enable all links for pjax again (including those that were just inserted)
		//var $a = $('a[data-pjax]');
		//$a.pjax();

	});

