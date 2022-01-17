/*
 Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
 Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
 Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
 Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
 Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
 Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
 Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
 Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
 Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
 Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
 Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function (global) {

    'use strict';

    var isArray,
        json,
        renumber,
        hexadecimal,
        quotes,
        escapeless,
        parentheses,
        semicolons,
        safeConcatenation,
        directive,
        extra,
        parse,
        FORMAT_MINIFY,
        FORMAT_DEFAULTS;

    var Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',
        ComprehensionExpression: 'ComprehensionExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExportBatchSpecifier: 'ExportBatchSpecifier',
        ExportDeclaration: 'ExportDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportSpecifier: 'ImportSpecifier',
        ImportDeclaration: 'ImportDeclaration',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MethodDefinition: 'MethodDefinition',
        ModuleDeclaration: 'ModuleDeclaration',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    var Precedence = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        BitwiseOR: 5,
        BitwiseXOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        TaggedTemplate: 17,
        Member: 18,
        Primary: 19
    };

    var BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            format: {
                indent: {
                    style: '    ',
                    base: 0
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false
            },
            directive: false,
            raw: true,
            verbatim: null
        };
    }

//-------------------------------------------------===------------------------------------------------------
//                                            Lexical utils
//-------------------------------------------------===------------------------------------------------------

//Const
    var NON_ASCII_WHITESPACES = [
        0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005,
        0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000,
        0xFEFF
    ];

//Regular expressions
    var NON_ASCII_IDENTIFIER_CHARACTERS_REGEXP = new RegExp(
        '[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376' +
        '\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-' +
        '\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA' +
        '\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-' +
        '\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-' +
        '\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-' +
        '\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-' +
        '\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38' +
        '\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83' +
        '\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9' +
        '\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-' +
        '\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-' +
        '\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E' +
        '\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-' +
        '\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-' +
        '\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-' +
        '\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE' +
        '\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44' +
        '\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-' +
        '\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A' +
        '\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-' +
        '\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9' +
        '\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84' +
        '\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-' +
        '\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5' +
        '\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-' +
        '\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-' +
        '\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD' +
        '\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B' +
        '\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E' +
        '\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-' +
        '\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-' +
        '\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-' +
        '\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F' +
        '\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115' +
        '\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188' +
        '\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-' +
        '\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-' +
        '\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A' +
        '\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5' +
        '\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697' +
        '\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873' +
        '\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-' +
        '\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-' +
        '\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC' +
        '\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-' +
        '\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D' +
        '\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74' +
        '\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-' +
        '\uFFD7\uFFDA-\uFFDC]'
    );


//Methods
    function isIdentifierCh(cp) {
        if (cp < 0x80) {
            return cp >= 97 && cp <= 122 ||      // a..z
                   cp >= 65 && cp <= 90 ||       // A..Z
                   cp >= 48 && cp <= 57 ||       // 0..9
                   cp === 36 || cp === 95 ||     // $ (dollar) and _ (underscore)
                   cp === 92;                    // \ (backslash)
        }

        var ch = String.fromCharCode(cp);

        return NON_ASCII_IDENTIFIER_CHARACTERS_REGEXP.test(ch);
    }

    function isLineTerminator(cp) {
        return cp === 0x0A || cp === 0x0D || cp === 0x2028 || cp === 0x2029;
    }

    function isWhitespace(cp) {
        return cp === 0x20 || cp === 0x09 || isLineTerminator(cp) || cp === 0x0B || cp === 0x0C || cp === 0xA0 ||
               (cp >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(cp) >= 0);
    }

    function isDecimalDigit(cp) {
        return cp >= 48 && cp <= 57;
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }


    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    function generateNumber(value) {
        var result, point, temp, exponent, pos;

        if (value === 1 / 0) {
            return json ? 'null' : renumber ? '1e400' : '1e+400';
        }

        result = '' + value;
        if (!renumber || result.length < 3) {
            return result;
        }

        point = result.indexOf('.');
        //NOTE: 0x30 == '0'
        if (!json && result.charCodeAt(0) === 0x30 && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;

        //NOTE: 0x30 == '0'
        while (temp.charCodeAt(temp.length + pos - 1) === 0x30) {
            --pos;
        }
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
            temp += 'e' + exponent;
        }
        if ((temp.length < result.length ||
             (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length
                                                                            < result.length)) &&
            +temp === value) {
            result = temp;
        }

        return result;
    }

// Generate valid RegExp expression.
// This function is based on https://github.com/Constellation/iv Engine

    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & ~1) === 0x2028) {
            return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
        } else if (ch === 10 || ch === 13) {  // \n, \r
            return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
        }
        return String.fromCharCode(ch);
    }

    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

        result = reg.toString();

        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) {
                return result;
            }

            flags = match[1];
            result = '';

            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);

                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) {  // ]
                            characterInBrack = false;
                        }
                    } else {
                        if (ch === 47) {  // /
                            result += '\\';
                        } else if (ch === 91) {  // [
                            characterInBrack = true;
                        }
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92;  // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }

            return '/' + result + '/' + flags;
        }

        return result;
    }

    function escapeAllowedCharacter(code, next) {
        var hex, result = '\\';

        switch (code) {
            case 0x08:          // \b
                result += 'b';
                break;
            case 0x0C:          // \f
                result += 'f';
                break;
            case 0x09:          // \t
                result += 't';
                break;
            default:
                hex = code.toString(16).toUpperCase();
                if (json || code > 0xFF) {
                    result += 'u' + '0000'.slice(hex.length) + hex;
                }

                else if (code === 0x0000 && !isDecimalDigit(next)) {
                    result += '0';
                }

                else if (code === 0x000B) {     // \v
                    result += 'x0B';
                }

                else {
                    result += 'x' + '00'.slice(hex.length) + hex;
                }
                break;
        }

        return result;
    }

    function escapeDisallowedCharacter(code) {
        var result = '\\';
        switch (code) {
            case 0x5C       // \
            :
                result += '\\';
                break;
            case 0x0A       // \n
            :
                result += 'n';
                break;
            case 0x0D       // \r
            :
                result += 'r';
                break;
            case 0x2028:
                result += 'u2028';
                break;
            case 0x2029:
                result += 'u2029';
                break;
        }

        return result;
    }

    function escapeDirective(str) {
        var i, iz, code, quote;

        quote = quotes === 'double' ? '"' : '\'';
        for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27) {            // '
                quote = '"';
                break;
            } else if (code === 0x22) {     // "
                quote = '\'';
                break;
            } else if (code === 0x5C) {     // \
                ++i;
            }
        }

        return quote + str + quote;
    }

    function escapeString(str) {
        var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
        //TODO http://jsperf.com/character-counting/8
        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27) {           // '
                ++singleQuotes;
            } else if (code === 0x22) { // "
                ++doubleQuotes;
            } else if (code === 0x2F && json) { // /
                result += '\\';
            } else if (isLineTerminator(code) || code === 0x5C) { // \
                result += escapeDisallowedCharacter(code);
                continue;
            } else if ((json && code < 0x20) ||                                     // SP
                       !(json || escapeless || (code >= 0x20 && code <= 0x7E))) {   // SP, ~
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }

        single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
        quote = single ? '\'' : '"';

        if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
        }

        str = result;
        result = quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if ((code === 0x27 && single) || (code === 0x22 && !single)) {    // ', "
                result += '\\';
            }
            result += String.fromCharCode(code);
        }

        return result + quote;
    }


    function join(l, r) {
        if (!l.length)
            return r;

        if (!r.length)
            return l;

        var lCp = l.charCodeAt(l.length - 1),
            rCp = r.charCodeAt(0);

        if (isIdentifierCh(lCp) && isIdentifierCh(rCp) ||
            lCp === rCp && (lCp === 0x2B || lCp === 0x2D) ||   // + +, - -
            lCp === 0x2F && rCp === 0x69) {                    // /re/ instanceof foo
            return l + _.space + r;
        }

        else if (isWhitespace(lCp) || isWhitespace(rCp))
            return l + r;

        return l + _.optSpace + r;
    }

    function shiftIndent() {
        var prevIndent = _.indent;

        _.indent += _.indentUnit;
        return prevIndent;
    }

    function adoptionPrefix($stmt) {
        if ($stmt.type === Syntax.BlockStatement)
            return _.optSpace;

        if ($stmt.type === Syntax.EmptyStatement)
            return '';

        return _.newline + _.indent + _.indentUnit;
    }

    function adoptionSuffix($stmt) {
        if ($stmt.type === Syntax.BlockStatement)
            return _.optSpace;

        return _.newline + _.indent;
    }

//Subentities generators
    function generateVerbatim($expr, flags, ctxPrecedence) {
        var verbatim = $expr[extra.verbatim],
            strVerbatim = typeof verbatim === 'string',
            precedence = !strVerbatim && verbatim.precedence !== void 0 ? verbatim.precedence : Precedence.Sequence,
            parenthesize = precedence < ctxPrecedence,
            content = strVerbatim ? verbatim : verbatim.content,
            chunks = content.split(/\r\n|\n/),
            chunkCount = chunks.length;

        if (parenthesize)
            _.js += '(';

        _.js += chunks[0];

        for (var i = 1; i < chunkCount; i++)
            _.js += _.newline + _.indent + chunks[i];

        if (parenthesize)
            _.js += ')';
    }

    function generateFunctionParams($node) {
        var $params = $node.params,
            $rest = $node.rest,
            $defaults = $node.defaults,
            paramCount = $params.length,
            lastParamIdx = paramCount - 1,
            hasDefaults = !!$defaults,
            arrowFuncWithSingleParam = $node.type === Syntax.ArrowFunctionExpression && !$rest &&
                                       (!hasDefaults || $defaults.length === 0) &&
                                       paramCount === 1 &&
                                       $params[0].type === Syntax.Identifier;

        //NOTE: arg => { } case
        if (arrowFuncWithSingleParam)
            _.js += $params[0].name;

        else {
            _.js += '(';

            for (var i = 0; i < paramCount; ++i) {
                var $param = $params[i];

                if (hasDefaults && $defaults[i]) {
                    var $fakeAssign = {
                        left: $param,
                        right: $defaults[i],
                        operator: '='
                    };

                    ExprGen.AssignmentExpression($fakeAssign, E_TTT, Precedence.Assignment);
                }

                else {
                    if ($params[i].type === Syntax.Identifier)
                        _.js += $param.name;

                    else
                        ExprGen[$param.type]($param, E_TTT, Precedence.Assignment);
                }

                if (i !== lastParamIdx)
                    _.js += ',' + _.optSpace;
            }

            if ($rest) {
                if (paramCount)
                    _.js += ',' + _.optSpace;

                _.js += '...' + $rest.name;
            }

            _.js += ')';
        }
    }

    function generateFunctionBody($node) {
        var $body = $node.body;

        generateFunctionParams($node);

        if ($node.type === Syntax.ArrowFunctionExpression)
            _.js += _.optSpace + '=>';

        if ($node.expression) {
            _.js += _.optSpace;

            var exprJs = exprToJs($body, E_TTT, Precedence.Assignment);

            if (exprJs.charAt(0) === '{')
                exprJs = '(' + exprJs + ')';

            _.js += exprJs;
        }

        else {
            _.js += adoptionPrefix($body);
            StmtGen[$body.type]($body, S_TTFF);
        }
    }


    function canUseRawLiteral($expr) {
        if ($expr.hasOwnProperty('raw')) {
            try {
                var raw = parse($expr.raw).body[0].expression;

                return raw.type === Syntax.Literal && raw.value === $expr.value;
            } catch (e) {
                //NOTE: not use raw property
            }
        }

        return false;
    }


//-------------------------------------------------===------------------------------------------------------
//                                           Generator flags
//-------------------------------------------------===------------------------------------------------------

//Flags
    var F_ALLOW_IN = 1,
        F_ALLOW_CALL = 1 << 1,
        F_ALLOW_UNPARATH_NEW = 1 << 2,
        F_FUNC_BODY = 1 << 3,
        F_DIRECTIVE_CTX = 1 << 4,
        F_SEMICOLON_OPT = 1 << 5;


//Expression flag sets
//NOTE: Flag order:
// F_ALLOW_IN
// F_ALLOW_CALL
// F_ALLOW_UNPARATH_NEW
    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
        E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TFF = F_ALLOW_IN,
        E_FFT = F_ALLOW_UNPARATH_NEW,
        E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;


//Statement flag sets
//NOTE: Flag order:
// F_ALLOW_IN
// F_FUNC_BODY
// F_DIRECTIVE_CTX
// F_SEMICOLON_OPT
    var S_TFFF = F_ALLOW_IN,
        S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
        S_FFFF = 0x00,
        S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
        S_TTFF = F_ALLOW_IN | F_FUNC_BODY;

//-------------------------------------------------===-------------------------------------------------------
//                                             Expressions
//-------------------------------------------------===-------------------------------------------------------

//Regular expressions
    var FLOATING_OR_OCTAL_REGEXP = /[.eExX]|^0[0-9]+/,
        LAST_DECIMAL_DIGIT_REGEXP = /[0-9]$/;


//Common expression generators
    function generateLogicalOrBinaryExpression($expr, flags, ctxPrecedence) {
        var op = $expr.operator,
            precedence = BinaryPrecedence[$expr.operator],
            parenthesize = precedence < ctxPrecedence,
            allowIn = flags & F_ALLOW_IN || parenthesize,
            operandFlags = allowIn ? E_TTT : E_FTT,
            exprJs = exprToJs($expr.left, operandFlags, precedence);

        parenthesize |= op === 'in' && !allowIn;

        if (parenthesize)
            _.js += '(';

        // 0x2F = '/'
        if (exprJs.charCodeAt(exprJs.length - 1) === 0x2F && isIdentifierCh(op.charCodeAt(0)))
            exprJs = exprJs + _.space + op;

        else
            exprJs = join(exprJs, op);

        precedence++;

        var rightJs = exprToJs($expr.right, operandFlags, precedence);

        //NOTE: If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
        if (op === '/' && rightJs.charAt(0) === '/' || op.slice(-1) === '<' && rightJs.slice(0, 3) === '!--')
            exprJs += _.space + rightJs;

        else
            exprJs = join(exprJs, rightJs);

        _.js += exprJs;

        if (parenthesize)
            _.js += ')';
    }

    function generateArrayPatternOrExpression($expr) {
        var $elems = $expr.elements,
            elemCount = $elems.length;

        if (elemCount) {
            var lastElemIdx = elemCount - 1,
                multiline = elemCount > 1,
                prevIndent = shiftIndent(),
                itemPrefix = _.newline + _.indent;

            _.js += '[';

            for (var i = 0; i < elemCount; i++) {
                var $elem = $elems[i];

                if (multiline)
                    _.js += itemPrefix;

                if ($elem)
                    ExprGen[$elem.type]($elem, E_TTT, Precedence.Assignment);

                if (i !== lastElemIdx || !$elem)
                    _.js += ',';
            }

            _.indent = prevIndent;

            if (multiline)
                _.js += _.newline + _.indent;

            _.js += ']';
        }

        else
            _.js += '[]';
    }

    function generateImportOrExportSpecifier($expr) {
        _.js += $expr.id.name;

        if ($expr.name)
            _.js += _.space + 'as' + _.space + $expr.name.name;
    }

    function generateGeneratorOrComprehensionExpression($expr) {
        //NOTE: GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
        var $blocks = $expr.blocks,
            $filter = $expr.filter,
            isGenerator = $expr.type === Syntax.GeneratorExpression,
            exprJs = isGenerator ? '(' : '[',
            bodyJs = exprToJs($expr.body, E_TTT, Precedence.Assignment);

        if ($blocks) {
            var prevIndent = shiftIndent(),
                blockCount = $blocks.length;

            for (var i = 0; i < blockCount; ++i) {
                var blockJs = exprToJs($blocks[i], E_TTT, Precedence.Sequence);

                exprJs = i > 0 ? join(exprJs, blockJs) : (exprJs + blockJs);
            }

            _.indent = prevIndent;
        }

        if ($filter) {
            var filterJs = exprToJs($filter, E_TTT, Precedence.Sequence);

            exprJs = join(exprJs, 'if' + _.optSpace);
            exprJs = join(exprJs, '(' + filterJs + ')');
        }

        exprJs = join(exprJs, bodyJs);
        exprJs += isGenerator ? ')' : ']';

        _.js += exprJs;
    }


//Expression raw generator dictionary
    var ExprRawGen = {
        SequenceExpression: function generateSequenceExpression($expr, flags, ctxPrecedence) {
            var $children = $expr.expressions,
                childrenCount = $children.length,
                lastChildIdx = childrenCount - 1,
                parenthesize = Precedence.Sequence < ctxPrecedence,
                allowIn = flags & F_ALLOW_IN || parenthesize,
                exprFlags = allowIn ? E_TTT : E_FTT;

            if (parenthesize)
                _.js += '(';

            for (var i = 0; i < childrenCount; i++) {
                var $child = $children[i];

                ExprGen[$child.type]($child, exprFlags, Precedence.Assignment);

                if (i !== lastChildIdx)
                    _.js += ',' + _.optSpace;
            }

            if (parenthesize)
                _.js += ')';
        },

        AssignmentExpression: function generateAssignmentExpression($expr, flags, ctxPrecedence) {
            var $left = $expr.left,
                $right = $expr.right,
                parenthesize = Precedence.Assignment < ctxPrecedence,
                allowIn = flags & F_ALLOW_IN || parenthesize,
                operandFlags = allowIn ? E_TTT : E_FFT;

            if (parenthesize)
                _.js += '(';

            ExprGen[$left.type]($left, operandFlags, Precedence.Call);
            _.js += _.optSpace + $expr.operator + _.optSpace;
            ExprGen[$right.type]($right, operandFlags, Precedence.Assignment);

            if (parenthesize)
                _.js += ')';
        },

        ArrowFunctionExpression: function generateArrowFunctionExpression($expr, flags, ctxPrecedence) {
            var parenthesize = Precedence.ArrowFunction < ctxPrecedence;

            if (parenthesize)
                _.js += '(';

            generateFunctionBody($expr);

            if (parenthesize)
                _.js += ')';
        },

        ConditionalExpression: function generateConditionalExpression($expr, flags, ctxPrecedence) {
            var $test = $expr.test,
                $conseq = $expr.consequent,
                $alt = $expr.alternate,
                parenthesize = Precedence.Conditional < ctxPrecedence,
                allowIn = flags & F_ALLOW_IN || parenthesize,
                descFlags = allowIn ? E_TTT : E_FFT;

            if (parenthesize)
                _.js += '(';

            ExprGen[$test.type]($test, descFlags, Precedence.LogicalOR);
            _.js += _.optSpace + '?' + _.optSpace;
            ExprGen[$conseq.type]($conseq, descFlags, Precedence.Assignment);
            _.js += _.optSpace + ':' + _.optSpace;
            ExprGen[$alt.type]($alt, descFlags, Precedence.Assignment);

            if (parenthesize)
                _.js += ')';
        },

        LogicalExpression: generateLogicalOrBinaryExpression,

        BinaryExpression: generateLogicalOrBinaryExpression,

        CallExpression: function generateCallExpression($expr, flags, ctxPrecedence) {
            var $callee = $expr.callee,
                $args = $expr['arguments'],
                argCount = $args.length,
                lastArgIdx = argCount - 1,
                parenthesize = ~flags & F_ALLOW_CALL || Precedence.Call < ctxPrecedence;

            if (parenthesize)
                _.js += '(';

            ExprGen[$callee.type]($callee, E_TTF, Precedence.Call);
            _.js += '(';

            for (var i = 0; i < argCount; ++i) {
                var $arg = $args[i];

                ExprGen[$arg.type]($arg, E_TTT, Precedence.Assignment);

                if (i !== lastArgIdx)
                    _.js += ',' + _.optSpace;
            }

            _.js += ')';

            if (parenthesize)
                _.js += ')';
        },

        NewExpression: function generateNewExpression($expr, flags, ctxPrecedence) {
            var $args = $expr['arguments'],
                parenthesize = Precedence.New < ctxPrecedence,
                argCount = $args.length,
                lastArgIdx = argCount - 1,
                withCall = ~flags & F_ALLOW_UNPARATH_NEW || parentheses || argCount > 0,
                calleeFlags = withCall ? E_TFF : E_TFT,
                calleeJs = exprToJs($expr.callee, calleeFlags, Precedence.New);

            if (parenthesize)
                _.js += '(';

            _.js += join('new', calleeJs);

            if (withCall) {
                _.js += '(';

                for (var i = 0; i < argCount; ++i) {
                    var $arg = $args[i];

                    ExprGen[$arg.type]($arg, E_TTT, Precedence.Assignment);

                    if (i !== lastArgIdx)
                        _.js += ',' + _.optSpace;
                }

                _.js += ')';
            }

            if (parenthesize)
                _.js += ')';
        },

        MemberExpression: function generateMemberExpression($expr, flags, ctxPrecedence) {
            var $obj = $expr.object,
                $prop = $expr.property,
                parenthesize = Precedence.Member < ctxPrecedence,
                descFlags = flags & F_ALLOW_CALL ? E_TTF : E_TFF,
                isNumObj = !$expr.computed && $obj.type === Syntax.Literal && typeof $obj.value === 'number';

            if (parenthesize)
                _.js += '(';

            if (isNumObj) {
                //NOTE: When the following conditions are all true:
                //   1. No floating point
                //   2. Don't have exponents
                //   3. The last character is a decimal digit
                //   4. Not hexadecimal OR octal number literal
                // then we should add a floating point.

                var numJs = exprToJs($obj, descFlags, Precedence.Call),
                    withPoint = LAST_DECIMAL_DIGIT_REGEXP.test(numJs) && !FLOATING_OR_OCTAL_REGEXP.test(numJs);

                _.js += withPoint ? (numJs + '.') : numJs;
            }

            else
                ExprGen[$obj.type]($obj, descFlags, Precedence.Call);

            if ($expr.computed) {
                _.js += '[';
                ExprGen[$prop.type]($prop, descFlags, Precedence.Sequence);
                _.js += ']';
            }

            else
                _.js += '.' + $prop.name;

            if (parenthesize)
                _.js += ')';
        },

        UnaryExpression: function generateUnaryExpression($expr, flags, ctxPrecedence) {
            var parenthesize = Precedence.Unary < ctxPrecedence,
                op = $expr.operator,
                argJs = exprToJs($expr.argument, E_TTT, Precedence.Unary);

            if (parenthesize)
                _.js += '(';

            //NOTE: delete, void, typeof
            // get `typeof []`, not `typeof[]`
            if (_.optSpace === '' || op.length > 2)
                _.js += join(op, argJs);

            else {
                _.js += op;

                //NOTE: Prevent inserting spaces between operator and argument if it is unnecessary
                // like, `!cond`
                var leftCp = op.charCodeAt(op.length - 1),
                    rightCp = argJs.charCodeAt(0);

                // 0x2B = '+', 0x2D =  '-'
                if (leftCp === rightCp && (leftCp === 0x2B || leftCp === 0x2D) ||
                    isIdentifierCh(leftCp) && isIdentifierCh(rightCp)) {
                    _.js += _.space;
                }

                _.js += argJs;
            }

            if (parenthesize)
                _.js += ')';
        },

        YieldExpression: function generateYieldExpression($expr, flags, ctxPrecedence) {
            var $arg = $expr.argument,
                js = $expr.delegate ? 'yield*' : 'yield',
                parenthesize = Precedence.Yield < ctxPrecedence;

            if (parenthesize)
                _.js += '(';

            if ($arg) {
                var argJs = exprToJs($arg, E_TTT, Precedence.Assignment);

                js = join(js, argJs);
            }

            _.js += js;

            if (parenthesize)
                _.js += ')';
        },

        UpdateExpression: function generateUpdateExpression($expr, flags, ctxPrecedence) {
            var $arg = $expr.argument,
                $op = $expr.operator,
                prefix = $expr.prefix,
                precedence = prefix ? Precedence.Unary : Precedence.Postfix,
                parenthesize = precedence < ctxPrecedence;

            if (parenthesize)
                _.js += '(';

            if (prefix) {
                _.js += $op;
                ExprGen[$arg.type]($arg, E_TTT, Precedence.Postfix);

            }

            else {
                ExprGen[$arg.type]($arg, E_TTT, Precedence.Postfix);
                _.js += $op;
            }

            if (parenthesize)
                _.js += ')';
        },

        FunctionExpression: function generateFunctionExpression($expr) {
            var isGenerator = !!$expr.generator;

            _.js += isGenerator ? 'function*' : 'function';

            if ($expr.id) {
                _.js += isGenerator ? _.optSpace : _.space;
                _.js += $expr.id.name;
            }
            else
                _.js += _.optSpace;

            generateFunctionBody($expr);
        },

        ExportBatchSpecifier: function generateExportBatchSpecifier() {
            _.js += '*';
        },

        ArrayPattern: generateArrayPatternOrExpression,

        ArrayExpression: generateArrayPatternOrExpression,

        ClassExpression: function generateClassExpression($expr) {
            var $id = $expr.id,
                $super = $expr.superClass,
                $body = $expr.body,
                exprJs = 'class';

            if ($id) {
                var idJs = exprToJs($id, E_TTT);

                exprJs = join(exprJs, idJs);
            }

            if ($super) {
                var superJs = exprToJs($super, E_TTT, Precedence.Assignment);

                superJs = join('extends', superJs);
                exprJs = join(exprJs, superJs);
            }

            _.js += exprJs + _.optSpace;
            StmtGen[$body.type]($body, S_TFFT);
        },

        MethodDefinition: function generateMethodDefinition($expr) {
            var exprJs = $expr['static'] ? 'static' + _.optSpace : '',
                keyJs = exprToJs($expr.key, E_TTT, Precedence.Sequence);

            if ($expr.computed)
                keyJs = '[' + keyJs + ']';

            if ($expr.kind === 'get' || $expr.kind === 'set') {
                keyJs = join($expr.kind, keyJs);
                _.js += join(exprJs, keyJs);
            }

            else {
                if ($expr.value.generator)
                    _.js += exprJs + '*' + keyJs;

                else
                    _.js += join(exprJs, keyJs);
            }

            generateFunctionBody($expr.value);
        },

        Property: function generateProperty($expr) {
            var $val = $expr.value,
                $kind = $expr.kind,
                keyJs = exprToJs($expr.key, E_TTT, Precedence.Sequence);

            if ($expr.computed)
                keyJs = '[' + keyJs + ']';

            if ($kind === 'get' || $kind === 'set') {
                _.js += $kind + _.space + keyJs;
                generateFunctionBody($val);
            }

            else {
                if ($expr.shorthand)
                    _.js += keyJs;

                else if ($expr.method) {
                    _.js += $val.generator ? ('*' + keyJs) : keyJs;
                    generateFunctionBody($val)
                }

                else {
                    _.js += keyJs + ':' + _.optSpace;
                    ExprGen[$val.type]($val, E_TTT, Precedence.Assignment);
                }
            }
        },

        ObjectExpression: function generateObjectExpression($expr) {
            var $props = $expr.properties,
                propCount = $props.length;

            if (propCount) {
                var lastPropIdx = propCount - 1,
                    prevIndent = shiftIndent();

                _.js += '{';

                for (var i = 0; i < propCount; i++) {
                    var $prop = $props[i],
                        propType = $prop.type || Syntax.Property;

                    _.js += _.newline + _.indent;
                    ExprGen[propType]($prop, E_TTT, Precedence.Sequence);

                    if (i !== lastPropIdx)
                        _.js += ',';
                }

                _.indent = prevIndent;
                _.js += _.newline + _.indent + '}';
            }

            else
                _.js += '{}';
        },

        ObjectPattern: function generateObjectPattern($expr) {
            var $props = $expr.properties,
                propCount = $props.length;

            if (propCount) {
                var lastPropIdx = propCount - 1,
                    multiline = false;

                if (propCount === 1)
                    multiline = $props[0].value.type !== Syntax.Identifier;

                else {
                    for (var i = 0; i < propCount; i++) {
                        if (!$props[i].shorthand) {
                            multiline = true;
                            break;
                        }
                    }
                }

                _.js += multiline ? ('{' + _.newline) : '{';

                var prevIndent = shiftIndent(),
                    propSuffix = ',' + (multiline ? _.newline : _.optSpace);

                for (var i = 0; i < propCount; i++) {
                    var $prop = $props[i];

                    if (multiline)
                        _.js += _.indent;

                    ExprGen[$prop.type]($prop, E_TTT, Precedence.Sequence);

                    if (i !== lastPropIdx)
                        _.js += propSuffix;
                }

                _.indent = prevIndent;
                _.js += multiline ? (_.newline + _.indent + '}') : '}';
            }
            else
                _.js += '{}';
        },

        ThisExpression: function generateThisExpression() {
            _.js += 'this';
        },

        Identifier: function generateIdentifier($expr) {
            _.js += $expr.name;
        },

        ImportSpecifier: generateImportOrExportSpecifier,

        ExportSpecifier: generateImportOrExportSpecifier,

        Literal: function generateLiteral($expr) {
            if (parse && extra.raw && canUseRawLiteral($expr))
                _.js += $expr.raw;

            else if ($expr.value === null)
                _.js += 'null';

            else {
                var valueType = typeof $expr.value;

                if (valueType === 'string')
                    _.js += escapeString($expr.value);

                else if (valueType === 'number')
                    _.js += generateNumber($expr.value);

                else if (valueType === 'boolean')
                    _.js += $expr.value ? 'true' : 'false';

                else
                    _.js += generateRegExp($expr.value);
            }
        },

        GeneratorExpression: generateGeneratorOrComprehensionExpression,

        ComprehensionExpression: generateGeneratorOrComprehensionExpression,

        ComprehensionBlock: function generateComprehensionBlock($expr) {
            var $left = $expr.left,
                leftJs = void 0,
                rightJs = exprToJs($expr.right, E_TTT, Precedence.Sequence);

            if ($left.type === Syntax.VariableDeclaration)
                leftJs = $left.kind + _.space + stmtToJs($left.declarations[0], S_FFFF);

            else
                leftJs = exprToJs($left, E_TTT, Precedence.Call);

            leftJs = join(leftJs, $expr.of ? 'of' : 'in');

            _.js += 'for' + _.optSpace + '(' + join(leftJs, rightJs) + ')';
        },

        SpreadElement: function generateSpreadElement($expr) {
            var $arg = $expr.argument;

            _.js += '...';
            ExprGen[$arg.type]($arg, E_TTT, Precedence.Assignment);
        },

        TaggedTemplateExpression: function generateTaggedTemplateExpression($expr, flags, ctxPrecedence) {
            var $tag = $expr.tag,
                $quasi = $expr.quasi,
                parenthesize = Precedence.TaggedTemplate < ctxPrecedence,
                tagFlags = flags & F_ALLOW_CALL ? E_TTF : E_TFF;

            if (parenthesize)
                _.js += '(';

            ExprGen[$tag.type]($tag, tagFlags, Precedence.Call);
            ExprGen[$quasi.type]($quasi, E_FFT, Precedence.Primary);

            if (parenthesize)
                _.js += ')';
        },

        TemplateElement: function generateTemplateElement($expr) {
            //NOTE: Don't use "cooked". Since tagged template can use raw template
            // representation. So if we do so, it breaks the script semantics.
            _.js += $expr.value.raw;
        },

        TemplateLiteral: function generateTemplateLiteral($expr) {
            var $quasis = $expr.quasis,
                $childExprs = $expr.expressions,
                quasiCount = $quasis.length,
                lastQuasiIdx = quasiCount - 1;

            _.js += '`';

            for (var i = 0; i < quasiCount; ++i) {
                var $quasi = $quasis[i];

                ExprGen[$quasi.type]($quasi, E_TTT, Precedence.Primary);

                if (i !== lastQuasiIdx) {
                    var $childExpr = $childExprs[i];

                    _.js += '${' + _.optSpace;
                    ExprGen[$childExpr.type]($childExpr, E_TTT, Precedence.Sequence);
                    _.js += _.optSpace + '}';
                }
            }

            _.js += '`';
        }
    };


//-------------------------------------------------===------------------------------------------------------
//                                              Statements
//-------------------------------------------------===------------------------------------------------------


//Regular expressions
    var EXPR_STMT_UNALLOWED_EXPR_REGEXP = /^{|^class(?:\s|{)|^function(?:\s|\*|\()/;


//Common statement generators
    function generateTryStatementHandlers(stmtJs, $finalizer, handlers) {
        var handlerCount = handlers.length,
            lastHandlerIdx = handlerCount - 1;

        for (var i = 0; i < handlerCount; ++i) {
            var handlerJs = stmtToJs(handlers[i], S_TFFF);

            stmtJs = join(stmtJs, handlerJs);

            if ($finalizer || i !== lastHandlerIdx)
                stmtJs += adoptionSuffix(handlers[i].body);
        }

        return stmtJs;
    }

    function generateForStatementIterator($op, $stmt, flags) {
        var $body = $stmt.body,
            $left = $stmt.left,
            bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
            prevIndent1 = shiftIndent(),
            stmtJs = 'for' + _.optSpace + '(';

        if ($left.type === Syntax.VariableDeclaration) {
            var prevIndent2 = shiftIndent();

            stmtJs += $left.kind + _.space + stmtToJs($left.declarations[0], S_FFFF);
            _.indent = prevIndent2;
        }

        else
            stmtJs += exprToJs($left, E_TTT, Precedence.Call);

        stmtJs = join(stmtJs, $op);

        var rightJs = exprToJs($stmt.right, E_TTT, Precedence.Sequence);

        stmtJs = join(stmtJs, rightJs) + ')';

        _.indent = prevIndent1;

        _.js += stmtJs + adoptionPrefix($body);
        StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
    }


//Statement generator dictionary
    var StmtRawGen = {
        BlockStatement: function generateBlockStatement($stmt, flags) {
            var $body = $stmt.body,
                len = $body.length,
                lastIdx = len - 1,
                itemsFlags = flags & F_FUNC_BODY ? S_TFTF : S_TFFF,
                prevIndent = shiftIndent();

            _.js += '{' + _.newline;

            for (var i = 0; i < len; i++) {
                var $item = $body[i],
                    itemFlags = itemsFlags;

                if (i === lastIdx)
                    itemFlags |= F_SEMICOLON_OPT;

                _.js += _.indent;
                StmtGen[$item.type]($item, itemFlags);
                _.js += _.newline;
            }

            _.indent = prevIndent;
            _.js += _.indent + '}';
        },

        BreakStatement: function generateBreakStatement($stmt, flags) {
            if ($stmt.label)
                _.js += 'break ' + $stmt.label.name;

            else
                _.js += 'break';

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        ContinueStatement: function generateContinueStatement($stmt, flags) {
            if ($stmt.label)
                _.js += 'continue ' + $stmt.label.name;

            else
                _.js += 'continue';

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        ClassBody: function generateClassBody($stmt) {
            var $body = $stmt.body,
                itemCount = $body.length,
                lastItemIdx = itemCount - 1,
                prevIndent = shiftIndent();

            _.js += '{' + _.newline;

            for (var i = 0; i < itemCount; i++) {
                var $item = $body[i],
                    itemType = $item.type || Syntax.Property;

                _.js += _.indent;
                ExprGen[itemType]($item, E_TTT, Precedence.Sequence);

                if (i !== lastItemIdx)
                    _.js += _.newline;
            }

            _.indent = prevIndent;
            _.js += _.newline + _.indent + '}';
        },

        ClassDeclaration: function generateClassDeclaration($stmt) {
            var $body = $stmt.body,
                $super = $stmt.superClass,
                js = 'class ' + $stmt.id.name;

            if ($super) {
                var superJs = exprToJs($super, E_TTT, Precedence.Assignment);

                js += _.space + join('extends', superJs);
            }

            _.js += js + _.optSpace;
            StmtGen[$body.type]($body, S_TFFT);
        },

        DirectiveStatement: function generateDirectiveStatement($stmt, flags) {
            if (extra.raw && $stmt.raw)
                _.js += $stmt.raw;

            else
                _.js += escapeDirective($stmt.directive);

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        DoWhileStatement: function generateDoWhileStatement($stmt, flags) {
            var $body = $stmt.body,
                $test = $stmt.test,
                bodyJs = adoptionPrefix($body) +
                         stmtToJs($body, S_TFFF) +
                         adoptionSuffix($body);

            //NOTE: Because `do 42 while (cond)` is Syntax Error. We need semicolon.
            var stmtJs = join('do', bodyJs);

            _.js += join(stmtJs, 'while' + _.optSpace + '(');
            ExprGen[$test.type]($test, E_TTT, Precedence.Sequence);
            _.js += ')';

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        CatchClause: function generateCatchClause($stmt) {
            var $param = $stmt.param,
                $guard = $stmt.guard,
                $body = $stmt.body,
                prevIndent = shiftIndent();

            _.js += 'catch' + _.optSpace + '(';
            ExprGen[$param.type]($param, E_TTT, Precedence.Sequence);

            if ($guard) {
                _.js += ' if ';
                ExprGen[$guard.type]($guard, E_TTT, Precedence.Sequence);
            }

            _.indent = prevIndent;
            _.js += ')' + adoptionPrefix($body);
            StmtGen[$body.type]($body, S_TFFF);
        },

        DebuggerStatement: function generateDebuggerStatement($stmt, flags) {
            _.js += 'debugger';

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        EmptyStatement: function generateEmptyStatement() {
            _.js += ';';
        },

        ExportDeclaration: function generateExportDeclaration($stmt, flags) {
            var $specs = $stmt.specifiers,
                $decl = $stmt.declaration,
                withSemicolon = semicolons || ~flags & F_SEMICOLON_OPT;

            // export default AssignmentExpression[In] ;
            if ($stmt['default']) {
                var declJs = exprToJs($decl, E_TTT, Precedence.Assignment);

                _.js += join('export default', declJs);

                if (withSemicolon)
                    _.js += ';';
            }

            // export * FromClause ;
            // export ExportClause[NoReference] FromClause ;
            // export ExportClause ;
            else if ($specs) {
                var stmtJs = 'export';

                if ($specs.length === 0)
                    stmtJs += _.optSpace + '{' + _.optSpace + '}';

                else if ($specs[0].type === Syntax.ExportBatchSpecifier) {
                    var specJs = exprToJs($specs[0], E_TTT, Precedence.Sequence);

                    stmtJs = join(stmtJs, specJs);
                }

                else {
                    var prevIndent = shiftIndent(),
                        specCount = $specs.length,
                        lastSpecIdx = specCount - 1;

                    stmtJs += _.optSpace + '{';

                    for (var i = 0; i < specCount; ++i) {
                        stmtJs += _.newline + _.indent;
                        stmtJs += exprToJs($specs[i], E_TTT, Precedence.Sequence);

                        if (i !== lastSpecIdx)
                            stmtJs += ',';
                    }

                    _.indent = prevIndent;
                    stmtJs += _.newline + _.indent + '}';
                }

                if ($stmt.source) {
                    _.js += join(stmtJs, 'from' + _.optSpace);
                    ExprGen.Literal($stmt.source);
                }

                else
                    _.js += stmtJs;

                if (withSemicolon)
                    _.js += ';';
            }

            // export VariableStatement
            // export Declaration[Default]
            else if ($decl) {
                var declJs = stmtToJs($decl, withSemicolon ? S_TFFF : S_TFFT);

                _.js += join('export', declJs);
            }
        },

        ExpressionStatement: function generateExpressionStatement($stmt, flags) {
            var $expr = $stmt.expression,
                exprJs = exprToJs($expr, E_TTT, Precedence.Sequence),
                parenthesize = EXPR_STMT_UNALLOWED_EXPR_REGEXP.test(exprJs) ||
                               (directive &&
                                flags & F_DIRECTIVE_CTX &&
                                $expr.type === Syntax.Literal &&
                                typeof $expr.value === 'string');

            //NOTE: '{', 'function', 'class' are not allowed in expression statement.
            // Therefore, they should be parenthesized.
            if (parenthesize)
                _.js += '(' + exprJs + ')';

            else
                _.js += exprJs;

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        ImportDeclaration: function generateImportDeclaration($stmt, flags) {
            var $specs = $stmt.specifiers,
                stmtJs = 'import',
                specCount = $specs.length;

            //NOTE: If no ImportClause is present,
            // this should be `import ModuleSpecifier` so skip `from`
            // ModuleSpecifier is StringLiteral.
            if (specCount) {
                var hasBinding = !!$specs[0]['default'],
                    firstNamedIdx = hasBinding ? 1 : 0,
                    lastSpecIdx = specCount - 1;

                // ImportedBinding
                if (hasBinding)
                    stmtJs = join(stmtJs, $specs[0].id.name);

                // NamedImports
                if (firstNamedIdx < specCount) {
                    if (hasBinding)
                        stmtJs += ',';

                    stmtJs += _.optSpace + '{';

                    // import { ... } from "...";
                    if (firstNamedIdx === lastSpecIdx)
                        stmtJs += _.optSpace + exprToJs($specs[firstNamedIdx], E_TTT, Precedence.Sequence) + _.optSpace;

                    else {
                        var prevIndent = shiftIndent();

                        // import {
                        //    ...,
                        //    ...,
                        // } from "...";
                        for (var i = firstNamedIdx; i < specCount; i++) {
                            stmtJs += _.newline + _.indent + exprToJs($specs[i], E_TTT, Precedence.Sequence);

                            if (i !== lastSpecIdx)
                                stmtJs += ',';
                        }

                        _.indent = prevIndent;
                        stmtJs += _.newline + _.indent;
                    }

                    stmtJs += '}' + _.optSpace;
                }

                stmtJs = join(stmtJs, 'from')
            }

            _.js += stmtJs + _.optSpace;
            ExprGen.Literal($stmt.source);

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        VariableDeclarator: function generateVariableDeclarator($stmt, flags) {
            var $id = $stmt.id,
                $init = $stmt.init,
                descFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;

            if ($init) {
                ExprGen[$id.type]($id, descFlags, Precedence.Assignment);
                _.js += _.optSpace + '=' + _.optSpace;
                ExprGen[$init.type]($init, descFlags, Precedence.Assignment);
            }

            else {
                if ($id.type === Syntax.Identifier)
                    _.js += $id.name;

                else
                    ExprGen[$id.type]($id, descFlags, Precedence.Assignment);
            }
        },

        VariableDeclaration: function generateVariableDeclaration($stmt, flags) {
            var $decls = $stmt.declarations,
                len = $decls.length,
                prevIndent = len > 1 ? shiftIndent() : _.indent,
                declFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF;

            _.js += $stmt.kind;

            for (var i = 0; i < len; i++) {
                var $decl = $decls[i];

                _.js += i === 0 ? _.space : (',' + _.optSpace);
                StmtGen[$decl.type]($decl, declFlags);
            }

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';

            _.indent = prevIndent;
        },

        ThrowStatement: function generateThrowStatement($stmt, flags) {
            var argJs = exprToJs($stmt.argument, E_TTT, Precedence.Sequence);

            _.js += join('throw', argJs);

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        TryStatement: function generateTryStatement($stmt) {
            var $block = $stmt.block,
                $finalizer = $stmt.finalizer,
                stmtJs = 'try' +
                         adoptionPrefix($block) +
                         stmtToJs($block, S_TFFF) +
                         adoptionSuffix($block);

            var $handlers = $stmt.handlers || $stmt.guardedHandlers;

            if ($handlers)
                stmtJs = generateTryStatementHandlers(stmtJs, $finalizer, $handlers);

            if ($stmt.handler) {
                $handlers = isArray($stmt.handler) ? $stmt.handler : [$stmt.handler];
                stmtJs = generateTryStatementHandlers(stmtJs, $finalizer, $handlers);
            }

            if ($finalizer) {
                stmtJs = join(stmtJs, 'finally' + adoptionPrefix($finalizer));
                stmtJs += stmtToJs($finalizer, S_TFFF);
            }

            _.js += stmtJs;
        },

        SwitchStatement: function generateSwitchStatement($stmt) {
            var $cases = $stmt.cases,
                $discr = $stmt.discriminant,
                prevIndent = shiftIndent();

            _.js += 'switch' + _.optSpace + '(';
            ExprGen[$discr.type]($discr, E_TTT, Precedence.Sequence);
            _.js += ')' + _.optSpace + '{' + _.newline;
            _.indent = prevIndent;

            if ($cases) {
                var caseCount = $cases.length,
                    lastCaseIdx = caseCount - 1;

                for (var i = 0; i < caseCount; i++) {
                    var $case = $cases[i];

                    _.js += _.indent;
                    StmtGen[$case.type]($case, i === lastCaseIdx ? S_TFFT : S_TFFF);
                    _.js += _.newline;
                }
            }

            _.js += _.indent + '}';
        },

        SwitchCase: function generateSwitchCase($stmt, flags) {
            var $conseqs = $stmt.consequent,
                $firstConseq = $conseqs[0],
                $test = $stmt.test,
                i = 0,
                conseqSemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                conseqCount = $conseqs.length,
                lastConseqIdx = conseqCount - 1,
                prevIndent = shiftIndent();

            if ($test) {
                var testJs = exprToJs($test, E_TTT, Precedence.Sequence);

                _.js += join('case', testJs) + ':';
            }

            else
                _.js += 'default:';


            if (conseqCount && $firstConseq.type === Syntax.BlockStatement) {
                i++;
                _.js += adoptionPrefix($firstConseq);
                StmtGen[$firstConseq.type]($firstConseq, S_TFFF);
            }

            for (; i < conseqCount; i++) {
                var $conseq = $conseqs[i],
                    semicolonOptional = i === lastConseqIdx && conseqSemicolonOptional;

                _.js += _.newline + _.indent;
                StmtGen[$conseq.type]($conseq, semicolonOptional ? S_TFFT : S_TFFF);
            }

            _.indent = prevIndent;
        },

        IfStatement: function generateIfStatement($stmt, flags) {
            var $alt = $stmt.alternate,
                $conseq = $stmt.consequent,
                $test = $stmt.test,
                prevIndent = shiftIndent(),
                semicolonOptional = !semicolons && flags & F_SEMICOLON_OPT;

            _.js += 'if' + _.optSpace + '(';
            ExprGen[$test.type]($test, E_TTT, Precedence.Sequence);
            _.js += ')';
            _.indent = prevIndent;
            _.js += adoptionPrefix($conseq);

            if ($alt) {
                var conseq = stmtToJs($conseq, S_TFFF) + adoptionSuffix($conseq),
                    alt = stmtToJs($alt, semicolonOptional ? S_TFFT : S_TFFF);

                if ($alt.type === Syntax.IfStatement)
                    alt = 'else ' + alt;

                else
                    alt = join('else', adoptionPrefix($alt) + alt);

                _.js += join(conseq, alt);
            }

            else
                StmtGen[$conseq.type]($conseq, semicolonOptional ? S_TFFT : S_TFFF);
        },

        ForStatement: function generateForStatement($stmt, flags) {
            var $init = $stmt.init,
                $test = $stmt.test,
                $body = $stmt.body,
                $update = $stmt.update,
                bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                prevIndent = shiftIndent();

            _.js += 'for' + _.optSpace + '(';

            if ($init) {
                if ($init.type === Syntax.VariableDeclaration)
                    StmtGen[$init.type]($init, S_FFFF);

                else {
                    ExprGen[$init.type]($init, E_FTT, Precedence.Sequence);
                    _.js += ';';
                }
            }

            else
                _.js += ';';

            if ($test) {
                _.js += _.optSpace;
                ExprGen[$test.type]($test, E_TTT, Precedence.Sequence);
            }

            _.js += ';';

            if ($update) {
                _.js += _.optSpace;
                ExprGen[$update.type]($update, E_TTT, Precedence.Sequence);
            }

            _.js += ')';
            _.indent = prevIndent;
            _.js += adoptionPrefix($body);
            StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
        },

        ForInStatement: function generateForInStatement($stmt, flags) {
            generateForStatementIterator('in', $stmt, flags);
        },

        ForOfStatement: function generateForOfStatement($stmt, flags) {
            generateForStatementIterator('of', $stmt, flags);
        },

        LabeledStatement: function generateLabeledStatement($stmt, flags) {
            var $body = $stmt.body,
                bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                prevIndent = _.indent;

            _.js += $stmt.label.name + ':' + adoptionPrefix($body);

            if ($body.type !== Syntax.BlockStatement)
                prevIndent = shiftIndent();

            StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
            _.indent = prevIndent;
        },

        ModuleDeclaration: function generateModuleDeclaration($stmt, flags) {
            _.js += 'module' + _.space + $stmt.id.name + _.space + 'from' + _.optSpace;

            ExprGen.Literal($stmt.source);

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        Program: function generateProgram($stmt) {
            var $body = $stmt.body,
                len = $body.length,
                lastIdx = len - 1;

            if (safeConcatenation && len > 0)
                _.js += '\n';

            for (var i = 0; i < len; i++) {
                var $item = $body[i],
                    itemFlags = S_TFTF;

                if (!safeConcatenation && i === lastIdx)
                    itemFlags |= F_SEMICOLON_OPT;

                _.js += _.indent;
                StmtGen[$item.type]($item, itemFlags);

                if (i !== lastIdx)
                    _.js += _.newline;
            }
        },

        FunctionDeclaration: function generateFunctionDeclaration($stmt) {
            var isGenerator = !!$stmt.generator;

            _.js += isGenerator ? ('function*' + _.optSpace) : ('function' + _.space );
            _.js += $stmt.id.name;
            generateFunctionBody($stmt);
        },

        ReturnStatement: function generateReturnStatement($stmt, flags) {
            var $arg = $stmt.argument;

            if ($arg) {
                var argJs = exprToJs($arg, E_TTT, Precedence.Sequence);

                _.js += join('return', argJs);
            }

            else
                _.js += 'return';

            if (semicolons || ~flags & F_SEMICOLON_OPT)
                _.js += ';';
        },

        WhileStatement: function generateWhileStatement($stmt, flags) {
            var $body = $stmt.body,
                $test = $stmt.test,
                bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                prevIndent = shiftIndent();

            _.js += 'while' + _.optSpace + '(';
            ExprGen[$test.type]($test, E_TTT, Precedence.Sequence);
            _.js += ')';
            _.indent = prevIndent;

            _.js += adoptionPrefix($body);
            StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
        },

        WithStatement: function generateWithStatement($stmt, flags) {
            var $body = $stmt.body,
                $obj = $stmt.object,
                bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                prevIndent = shiftIndent();

            _.js += 'with' + _.optSpace + '(';
            ExprGen[$obj.type]($obj, E_TTT, Precedence.Sequence);
            _.js += ')';
            _.indent = prevIndent;
            _.js += adoptionPrefix($body);
            StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
        }
    };

    function generateStatement($stmt, option) {
        StmtGen[$stmt.type]($stmt, option);
    }

//CodeGen
//-----------------------------------------------------------------------------------
    function exprToJs($expr, flags, ctxPrecedence) {
        var savedJs = _.js;
        _.js = '';

        ExprGen[$expr.type]($expr, flags, ctxPrecedence);

        var src = _.js;
        _.js = savedJs;

        return src;
    }

    function stmtToJs($stmt, flags) {
        var savedJs = _.js;
        _.js = '';

        StmtGen[$stmt.type]($stmt, flags);

        var src = _.js;
        _.js = savedJs;

        return src;
    }

    function run($node) {
        _.js = '';

        if (StmtGen[$node.type])
            StmtGen[$node.type]($node, S_TFFF);

        else
            ExprGen[$node.type]($node, E_TTF, Precedence.Sequence);

        return _.js;
    }

    function wrapExprGen(gen) {
        return function ($expr, flags, ctxPrecedence) {
            if (extra.verbatim && $expr.hasOwnProperty(extra.verbatim))
                generateVerbatim($expr, flags, ctxPrecedence);

            else
                gen($expr, flags);
        }
    }

    function createExprGenWithExtras() {
        var gens = {};

        for (var key in ExprRawGen) {
            if (ExprRawGen.hasOwnProperty(key))
                gens[key] = wrapExprGen(ExprRawGen[key]);
        }

        return gens;
    }


//Strings
    var _ = {
        js: '',
        newline: '\n',
        optSpace: ' ',
        space: ' ',
        indentUnit: '    ',
        indent: ''
    };


//Generators
    var ExprGen = void 0,
        StmtGen = StmtRawGen;


    function generate($node, options) {
        var defaultOptions = getDefaultOptions(), result, pair;

        if (options != null) {
            //NOTE: Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
            }
            if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions, options);
            _.indentUnit = options.format.indent.style;
            if (typeof options.base === 'string') {
                _.indent = options.base;
            } else {
                _.indent = stringRepeat(_.indentUnit, options.format.indent.base);
            }
        } else {
            options = defaultOptions;
            _.indentUnit = options.format.indent.style;
            _.indent = stringRepeat(_.indentUnit, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;

        _.newline = options.format.newline;
        _.optSpace = options.format.space;

        if (options.format.compact)
            _.newline = _.optSpace = _.indentUnit = _.indent = '';

        _.space = _.optSpace ? _.optSpace : ' ';
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        extra = options;

        if (extra.verbatim)
            ExprGen = createExprGenWithExtras();

        else
            ExprGen = ExprRawGen;

        return run($node);
    }

    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };

    var esotope = {
        generate: generate,
        Precedence: updateDeeply({}, Precedence),
        browser: false,
        FORMAT_MINIFY: FORMAT_MINIFY,
        FORMAT_DEFAULTS: getDefaultOptions().format
    };

    //Node
    if (typeof module !== 'undefined' && module.exports)
        module.exports = esotope;

    //RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        esotope.browser = true;

        define([], function () {
            return esotope;
        });
    }

    else {
        esotope.browser = true;
        global.esotope = esotope;
    }

})(this);
