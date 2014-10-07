[appBox] Loading module: /home/cedric/inside/github/appbox/test/core/hello.js
[appBox] Loading module: /home/cedric/inside/github/appbox/test/core/bonjour.js
[appBox] Loading module: /home/cedric/inside/github/appbox/test/circular/one.js
[appBox] Loading module: /home/cedric/inside/github/appbox/test/circular/two.js
[appBox] Lazy-loading module: /home/cedric/inside/github/appbox/test/core/hello.js
[appBox] Lazy-loading module: /home/cedric/inside/github/appbox/test/core/bonjour.js
[appBox] Lazy-loading module: /home/cedric/inside/github/appbox/test/circular/one.js
[appBox] Lazy-loading module: /home/cedric/inside/github/appbox/test/circular/two.js
# TOC
   - [Loading all module from the map file](#loading-all-module-from-the-map-file)
<a name=""></a>
 
<a name="loading-all-module-from-the-map-file"></a>
# Loading all module from the map file
with full-loading.

```js
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
expect( APP.circular.one() ).to.be( 'onetwo' ) ;
```

with lazy-loading.

```js
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
expect( APP.core.bonjour() ).to.be( 'Bonjour !' ) ;
expect( APP.circular.one() ).to.be( 'onetwo' ) ;
expect( APP.circular.one() ).to.be( 'onetwo' ) ;
expect( APP.circular.two() ).to.be( 'twoone' ) ;

// Ensure the module is now loaded
descriptor = Object.getOwnPropertyDescriptor( APP.core , 'hello' ) ;
expect( descriptor.value ).to.be.an( Object ) ;
expect( descriptor.get ).to.be( undefined ) ;
```

