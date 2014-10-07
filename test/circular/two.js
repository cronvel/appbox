

var one = APP.one ;

module.exports = function( recursive )
{
	if ( ! recursive ) { return 'two' + one() ; }
	return 'two' ;
}

