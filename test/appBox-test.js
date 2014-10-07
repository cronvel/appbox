/*
	The Cedric's Swiss Knife (CSK) - CSK AppBox test suite
	
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

/* jshint unused:false */
/* global describe, it, before, after */


var appBox = require( '../lib/appBox.js' ) ;
var expect = require( 'expect.js' ) ;

// Change directory if necessary: sample files should be loaded accordingly
//if ( process.cwd() !== __dirname ) { process.chdir( __dirname ) ; }





			/* Tests */



describe( "Loading all module from the map file" , function() {
	
	it( "without lazy-loading" , function() {
		
		delete global.APP ;
		appBox.loadMap( 'APP' , './map1.json' , { verbose: true , lazy: false } ) ;
		
		// Ensure the module is already loaded
		var descriptor = Object.getOwnPropertyDescriptor( APP.core , 'hello' ) ;
		expect( descriptor.value ).to.be.an( Object ) ;
		expect( descriptor.get ).to.be( undefined ) ;
		
		expect( APP.core.hello.hello() ).to.be( 'Hello!' ) ;
		expect( APP.core.hello.world() ).to.be( 'World!' ) ;
		expect( APP.core.hello.helloWorld() ).to.be( 'Hello world!' ) ;
		expect( APP.core.bonjour() ).to.be( 'Bonjour !' ) ;
	} ) ;
	
	it( "with lazy-loading" , function() {
		
		delete global.APP ;
		appBox.loadMap( 'APP' , './map1.json' , { verbose: true , lazy: true } ) ;
		
		// Ensure the module is *NOT* loaded
		var descriptor = Object.getOwnPropertyDescriptor( APP.core , 'hello' ) ;
		expect( descriptor.value ).to.be( undefined ) ;
		expect( descriptor.get ).to.be.an( Function ) ;
		
		expect( APP.core.hello.hello() ).to.be( 'Hello!' ) ;
		expect( APP.core.hello.world() ).to.be( 'World!' ) ;
		expect( APP.core.hello.helloWorld() ).to.be( 'Hello world!' ) ;
		expect( APP.core.bonjour() ).to.be( 'Bonjour !' ) ;
		expect( APP.circular.one() ).to.be( 'onetwo' ) ;
		
		// Ensure the module is now loaded
		var descriptor = Object.getOwnPropertyDescriptor( APP.core , 'hello' ) ;
		expect( descriptor.value ).to.be.an( Object ) ;
		expect( descriptor.get ).to.be( undefined ) ;
	} ) ;
} ) ;

