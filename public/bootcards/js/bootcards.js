var bootcards = bootcards || {};

bootcards._isXS = null;

/*
 * Get the Bootstrap enviroment we're in.

 * Found at http://stackoverflow.com/questions/14441456/how-to-detect-which-device-view-youre-on-using-twitter-bootstrap-api/15150381#15150381
 * Function writen by Raphael_ (http://stackoverflow.com/users/1661358/raphael)
 */
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
            return envs[i];
        }
    };
}

$(document).ready( function() {

    //enable the slide in menu
    $('#slideInMenu').offcanvas({
        toggle : false
    });
    $('.offcanvas-toggle').on('click', function() {
        $('#slideInMenu').offcanvas('toggle');
    })
   
});

bootcards.isXS = function() {

    if (this._isXS === null ) {
      
        this._isXS = (this.findBootstrapEnvironment() == "ExtraSmall");

    }

    return this._isXS;
}