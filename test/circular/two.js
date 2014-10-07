

var one = APP.circular.one ;

module.exports = function( recursive )
{
	//console.log( '[two]' , APP.circular ) ;
	//if ( ! recursive ) { return 'two' + one( true ) ; }
	if ( ! recursive ) { return 'two' + APP.circular.one( true ) ; }
	return 'two' ;
} ;

