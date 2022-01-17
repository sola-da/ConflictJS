/*******************************************************************************
 * Copyright (c) 2013 Samsung Information Systems America, Inc.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Manu Sridharan - initial API and implementation
 *******************************************************************************/

/*jslint node: true */
/*global describe it */
var assert = require("assert");
var proxy = require("../rewriting-proxy");

var parse5 = require('parse5');

// constants used by several tests
var empty_doc = "<html><head></head><body></body></html>";

// parse and pretty-print the given HTML
function normalise(html) {
    var document = parse5.parse(html, {locationInfo: false});
    return parse5.serialize(document);
}

// utility function for writing tests
function test_rewrite(input, expected, rewriter, header, headerURLs) {
    expected = normalise(expected);
    var actual = proxy.rewriteHTML(input, "http://example.com",
        rewriter || function (x) {
            return x;
        }, header, headerURLs);
    assert.equal(actual, expected);
}

describe('rewriting-proxy', function () {
    describe('#rewriteHTML()', function () {
        it('should do nothing', function () {
            test_rewrite(empty_doc, empty_doc);
        });
        it('should insert header script', function () {
            var header = "<script>alert(\"hi\");</script>";
            var expected = "<html><head><script>alert(\"hi\");</script></head><body></body></html>";
            test_rewrite(empty_doc, expected, null, header);
        });
        it('should not rewrite header script', function () {
            var header = "<script>alert(\"hi\");</script>";
            var expected = "<html><head><script>alert(\"hi\");</script></head><body></body></html>";
            test_rewrite(empty_doc, expected, function () {
                return "bar";
            }, header);
        });
        it('should encode attribute values properly', function () {
            var input = "<html><head></head><body><button onclick=\"foo()\">Hello</button></body></html>";
            var rewriter = function (src) {
                return "if (x < y) " + src;
            };
            var expected = "<html><head></head><body><button onclick=\"if (x &lt; y) foo()\">Hello</button></body></html>";
            test_rewrite(input, expected, rewriter);
        });
        it('should be robust to crashing instrumenting function', function () {
            var input = "<html><head></head><body><button onclick=\"foo()\">Hello</button></body></html>";
            var rewriter = function (src) {
                throw "I crashed";
            };
            test_rewrite(input, input, rewriter);
        });
        it('should handle textarea properly', function () {
            var input = "<html><head></head><body><textarea>for (i = 0; i < p; i++) {}</textarea></body></html>";
            test_rewrite(input, input);
        });

        it('should rewrite script tags without attributes', function () {
            var input = "<html><head></head><script>foo</script><body></body></html>";
            var expected = "<html><head></head><script>bar</script><body></body></html>";
            var rewriter = function () {
                return "bar";
            }
            test_rewrite(input, expected, rewriter);
        });
        it('should not rewrite empty scripts', function () {
            var input = "<html><head></head><script></script><body></body></html>";
            var rewriter = function () {
                return "bar";
            }
            test_rewrite(input, input, rewriter);
        });
        it('should rewrite script tags without type attribute', function () {
            var input = "<html><head></head><script foo=\"bar\">foo</script><body></body></html>";
            var expected = "<html><head></head><script foo=\"bar\">bar</script><body></body></html>";
            var rewriter = function () {
                return "bar";
            }
            test_rewrite(input, expected, rewriter);
        });
        it('should rewrite script tags with type javascript', function () {
            var input = "<html><head></head><script type=\"javascript\">foo</script><body></body></html>";
            var expected = "<html><head></head><script type=\"javascript\">bar</script><body></body></html>";
            var rewriter = function () {
                return "bar";
            }
            test_rewrite(input, expected, rewriter);
        });
        it('should rewrite script tags with type text/javascript', function () {
            var input = "<html><head></head><script type=\"text/javascript\">foo</script><body></body></html>";
            var expected = "<html><head></head><script type=\"text/javascript\">bar</script><body></body></html>";
            var rewriter = function () {
                return "bar";
            }
            test_rewrite(input, expected, rewriter);
        });
        it('should rewrite script tags with type text/JAVAscript', function () {
            var input = "<html><head></head><script type=\"text/JAVAscript\">foo</script><body></body></html>";
            var expected = "<html><head></head><script type=\"text/JAVAscript\">bar</script><body></body></html>";
            var rewriter = function () {
                return "bar";
            }
            test_rewrite(input, expected, rewriter);
        });
        it('should not rewrite script tags with type vbscript', function () {
            var input = "<html><head></head><script type=\"vbscript\">foo</script><body></body></html>";
            var expected = input;
            var rewriter = function () {
                return "bar";
            }
            test_rewrite(input, expected, rewriter);
        });
        it('should not rewrite external scripts', function () {
            var input = "<html><head></head><script src=\"foo.js\"></script><body></body></html>";
            var rewriter_called = false;
            var rewriter = function (src) {
                rewriter_called = true;
                return src;
            }
            var actual = proxy.rewriteHTML(input, "http://foo.com", rewriter, null);
            assert.equal(rewriter_called, false);
        });
        it('should rewrite event handler attributes', function () {
            var input = "<html><head></head><body onload=\"foo\"></body></html>";
            var expected = "<html><head></head><body onload=\"bar\"></body></html>";
            var rewriter = function () {
                return "bar";
            };
            test_rewrite(input, expected, rewriter);
        });
        it('should rewrite javascript: URLs', function () {
            var input = "<html><head></head><body><a href=\"javascript:foo\"></a></body></html>";
            var expected = "<html><head></head><body><a href=\"javascript:bar\"></a></body></html>";
            var rewriter = function () {
                return "bar";
            };
            test_rewrite(input, expected, rewriter);
        });
        it('should insert header URLs', function () {
            var header = null;
            var headerURLs = ["foo/baz.js", "fizz/bizz.js"];
            var expected = "<html><head><script src=\"foo/baz.js\"></script><script src=\"fizz/bizz.js\"></script></head><body></body></html>";
            test_rewrite(empty_doc, expected, null, header, headerURLs);
        });
        it('should not encode header HTML', function () {
            var headerHTML = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><script type="text/javascript"> var x="hello";</script>';
            var expected = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><script type="text/javascript"> var x="hello";</script></head><body></body></html>';
            test_rewrite(empty_doc, expected, null, headerHTML);

        });
    });
});
