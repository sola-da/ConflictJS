rewriting-proxy
===============

Simple proxy library for rewriting JavaScript on-the-fly.

Installation
------------

    npm install rewriting-proxy

Usage
-----

From `proxy-example.js`:

	var proxy = require("rewriting-proxy");

    var options = {
        rewriter: function (src, metadata) {
            console.log("instrumenting " + metadata.url);
            return src;		
        },
        rewriteOptions: {
            onNodeVisited: function (node) {
                // Tag every element in the HTML with its source location
                if (node.tagName) {
                    var location = node.__location;
                    node.attrs.push({ name: "data-loc", value: location.line + ":" + location.col })
                }
            },
            locationInfo: true
        },
        headerHTML: "<script>alert(\"hi\");</script>",
        port: 8080
    };
    
    proxy.start(options);
	
The `start(options)` function starts the proxy server on `localhost`.  Possible options are:

* `rewriter`: A function that takes JavaScript code as its first parameter and returns the instrumented version of the code.  Any response with a MIME type suggesting JavaScript content is passed to `rewriter`. The metadata object passed as the second parameter includes properties:
    * `type`: the type of the script, either `'script'` for inline scripts or script files, `'event-handler'` for event
      handlers, or `'javascript-url'` for JavaScript URLs.
    * `inline`: For scripts of type `'script'`, indicates whether the script was inline.
    * `url`: A URL for the script; these are auto-generated for inline scripts, event handlers, etc.
* `rewriteOptions`: An object that allows instrumenting the HTML. The object includes properties:
    * `onNodeVisited`: A function that is called with a HTML node when the
      entire subtree rooted at the node has been visited.
      The function return value is ignored; instead the function
      should mutate the subtree rooted at the node argument.
    * `locationInfo`: A boolean that is parsed to the parse5 HTML parser,
       indicating whether node locations should be made available.
       (Disabled by default for performance.)
* `headerHTML`: HTML string to be injected at the beginning of any
requested HTML file.
* `headerURLs`: an Array of script URLs.  These URLs will be loaded
  via `<script>` tags at the beginning of any HTML file. 
* `port`: The port on which the proxy server should listen, default `8080`.

The library also exposes a `rewriteHTML(html, url, rewriter,
headerHTML, headerURLs, options)` function that rewrites the inline scripts (and HTML)
in a given `html` string with URL `url`, using the `rewriter`
function, `headerHTML` string and `headerURLs` array as described above.

To see a real-world use of the library, look at [jalangi_proxy.js](https://github.com/SRA-SiliconValley/jalangi/blob/master/src/js/commands/jalangi_proxy.js) from the [Jalangi framework](https://github.com/SRA-SiliconValley/jalangi).

Example
-------
Input:

    <!DOCTYPE html>
    <html>
      <head>
        <title>Proxy test</title>
      </head>
      <body>
        <h1>Proxy test</h1>
      </body>
    </html>

Output using `proxy-example.js` (modulo indentation):

    <!DOCTYPE html>
    <html data-loc="2:1">
      <head data-loc="3:3">
        <script>alert("hi");</script>
        <title data-loc="4:5">Proxy test</title>
      </head>
      <body data-loc="6:3">
        <h1 data-loc="7:5">Proxy test</h1>
      </body>
    </html>

Limitations
-----------

* Can't rewrite scripts requested via HTTPS.
* Can't rewrite inline scripts inserted by other scripts, e.g.:

	    var x = "<script>" + ... + "</script>";
	    node.innerHTML = x;

License
-------

This software is distributed under the [Eclipse Public License](http://www.eclipse.org/legal/epl-v10.html).
