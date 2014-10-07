

var two = APP.two ;

module.exports = function( recursive )
{
	if ( ! recursive ) { return 'one' + two() ; }
	return 'one' ;
}

