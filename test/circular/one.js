

var two = APP.circular.two ;

module.exports = function( recursive )
{
	//console.log( '[one]' , APP.circular ) ;
	//if ( ! recursive ) { return 'one' + two( true ) ; }
	if ( ! recursive ) { return 'one' + APP.circular.two( true ) ; }
	return 'one' ;
} ;

