/*
	The Cedric's Swiss Knife (CSK) - CSK AppBox lib
	
	The MIT License (MIT)
	
	Copyright (c) 2014 Cédric Ronvel 
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

/*
	TODO:
		* A map.json generator
*/



// Load modules
var fs = require( 'fs' ) ;
var path = require( 'path' ) ;



var appBox = {} ;
module.exports = appBox ;



appBox.loadMap = function loadMap( box , mapPath , options )
{
	// Check arguments
	if ( typeof mapPath !== 'string' || ! mapPath.length )
	{
		throw new Error( '[appBox] load() : argument #1 should be a non-empty string.' ) ;
	}
	
	if ( ! options || typeof options !== 'object' ) { options = {} ; }
	
	var rootPath = options.rootPath || path.dirname( fs.realpathSync( mapPath ) ) ;
	var map = JSON.parse( fs.readFileSync( mapPath ).toString() ) ;
	
	console.log( 'loadMap()' , map ) ;
	
	return appBox.load( box , map , rootPath , options ) ;
} ;



appBox.load = function load( box , map , rootPath , options )
{
	// Check arguments
	if ( typeof box === 'string' )
	{
		global[ box ] = {} ;
		box = global[ box ] ;
	}
	
	if ( ! box || typeof box !== 'object' )
	{
		throw new Error( '[appBox] load() : argument #0 should be an object.' ) ;
	}
	
	if ( ! map || typeof map !== 'object' )
	{
		throw new Error( '[appBox] load() : argument #1 should be an object.' ) ;
	}
	
	if ( typeof rootPath !== 'string' || ! rootPath.length )
	{
		throw new Error( '[appBox] load() : argument #2 should be a non-empty string.' ) ;
	}
	
	if ( rootPath[ rootPath.length - 1 ] !== '/' ) { rootPath += '/' ; }
	
	if ( ! options || typeof options !== 'object' ) { options = {} ; }
	
	
	var path , required , i , key , keys = Object.keys( map ) ;
	
	for ( i = 0 ; i < keys.length ; i ++ )
	{
		key = keys[ i ] ;
		
		if ( typeof map[ key ] === 'object' )
		{
			// Recursive
			box[ key ] = {} ;
			appBox.load( box[ key ] , map[ key ] , rootPath , options ) ;
		}
		else if ( typeof map[ key ] === 'string' )
		{
			path = rootPath + map[ key ] ;
			
			if ( options.lazy )
			{
				// Create a closure scope preserving current key and path value
				( function( innerKey , innerPath ) {
					Object.defineProperty( box , innerKey , {
						configurable: true ,
						enumerable: true ,
						get: function() {
							if ( options.verbose ) { console.log( '[appBox] Lazy-loading module:' , innerPath ) ; }
							required = require( innerPath ) ;
							Object.defineProperty( box , innerKey , {
								configurable: false ,
								enumerable: true ,
								writable: false ,
								value: required
							} ) ;
							return required ;
						}
					} ) ;
				} )( key , path ) ;
			}
			else
			{
				if ( options.verbose ) { console.log( '[appBox] Loading module:' , path ) ; }
				required = require( path ) ;
				Object.defineProperty( box , key , { value: required , enumerable: true } ) ;
			}
		}
	}
} ;



