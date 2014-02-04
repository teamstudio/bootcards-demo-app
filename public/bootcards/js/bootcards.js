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