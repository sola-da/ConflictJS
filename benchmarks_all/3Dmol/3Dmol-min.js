(function (q, ga) {
  "object" === typeof module && "object" === typeof module.exports
    ? (module.exports = q.document
        ? ga(q, !0)
        : function (q) {
            if (!q.document)
              throw Error("jQuery requires a window with a document");
            return ga(q);
          })
    : ga(q);
})("undefined" !== typeof window ? window : this, function (q, ga) {
  function Da(a) {
    var b = "length" in a && a.length,
      c = d.type(a);
    return "function" === c || d.isWindow(a)
      ? !1
      : 1 === a.nodeType && b
      ? !0
      : "array" === c ||
        0 === b ||
        ("number" === typeof b && 0 < b && b - 1 in a);
  }
  function Ea(a, b, c) {
    if (d.isFunction(b))
      return d.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c;
      });
    if (b.nodeType)
      return d.grep(a, function (a) {
        return (a === b) !== c;
      });
    if ("string" === typeof b) {
      if (Zb.test(b)) return d.filter(b, a, c);
      b = d.filter(b, a);
    }
    return d.grep(a, function (a) {
      return 0 <= d.inArray(a, b) !== c;
    });
  }
  function Ya(a, b) {
    do a = a[b];
    while (a && 1 !== a.nodeType);
    return a;
  }
  function $b(a) {
    var b = (Za[a] = {});
    d.each(a.match(K) || [], function (a, d) {
      b[d] = !0;
    });
    return b;
  }
  function $a() {
    n.addEventListener
      ? (n.removeEventListener("DOMContentLoaded", D, !1),
        q.removeEventListener("load", D, !1))
      : (n.detachEvent("onreadystatechange", D), q.detachEvent("onload", D));
  }
  function D() {
    if (
      n.addEventListener ||
      "load" === event.type ||
      "complete" === n.readyState
    )
      $a(), d.ready();
  }
  function ab(a, b, c) {
    if (void 0 === c && 1 === a.nodeType)
      if (
        ((c = "data-" + b.replace(ac, "-$1").toLowerCase()),
        (c = a.getAttribute(c)),
        "string" === typeof c)
      ) {
        try {
          c =
            "true" === c
              ? !0
              : "false" === c
              ? !1
              : "null" === c
              ? null
              : +c + "" === c
              ? +c
              : bc.test(c)
              ? d.parseJSON(c)
              : c;
        } catch (e) {}
        d.data(a, b, c);
      } else c = void 0;
    return c;
  }
  function Fa(a) {
    for (var b in a)
      if (("data" !== b || !d.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
    return !0;
  }
  function bb(a, b, c, e) {
    if (d.acceptData(a)) {
      var f = d.expando,
        g = a.nodeType,
        h = g ? d.cache : a,
        k = g ? a[f] : a[f] && f;
      if (
        (k && h[k] && (e || h[k].data)) ||
        void 0 !== c ||
        "string" !== typeof b
      ) {
        k || (k = g ? (a[f] = R.pop() || d.guid++) : f);
        h[k] || (h[k] = g ? {} : { toJSON: d.noop });
        if ("object" === typeof b || "function" === typeof b)
          e ? (h[k] = d.extend(h[k], b)) : (h[k].data = d.extend(h[k].data, b));
        a = h[k];
        e || (a.data || (a.data = {}), (a = a.data));
        void 0 !== c && (a[d.camelCase(b)] = c);
        "string" === typeof b
          ? ((c = a[b]), null == c && (c = a[d.camelCase(b)]))
          : (c = a);
        return c;
      }
    }
  }
  function cb(a, b, c) {
    if (d.acceptData(a)) {
      var e,
        f,
        g = a.nodeType,
        h = g ? d.cache : a,
        k = g ? a[d.expando] : d.expando;
      if (h[k]) {
        if (b && (e = c ? h[k] : h[k].data)) {
          d.isArray(b)
            ? (b = b.concat(d.map(b, d.camelCase)))
            : b in e
            ? (b = [b])
            : ((b = d.camelCase(b)), (b = b in e ? [b] : b.split(" ")));
          for (f = b.length; f--; ) delete e[b[f]];
          if (c ? !Fa(e) : !d.isEmptyObject(e)) return;
        }
        if (!c && (delete h[k].data, !Fa(h[k]))) return;
        g
          ? d.cleanData([a], !0)
          : p.deleteExpando || h != h.window
          ? delete h[k]
          : (h[k] = null);
      }
    }
  }
  function V() {
    return !0;
  }
  function W() {
    return !1;
  }
  function db() {
    try {
      return n.activeElement;
    } catch (a) {}
  }
  function eb(a) {
    var b = fb.split("|");
    a = a.createDocumentFragment();
    if (a.createElement) for (; b.length; ) a.createElement(b.pop());
    return a;
  }
  function w(a, b) {
    var c,
      e,
      f = 0,
      g =
        "undefined" !== typeof a.getElementsByTagName
          ? a.getElementsByTagName(b || "*")
          : "undefined" !== typeof a.querySelectorAll
          ? a.querySelectorAll(b || "*")
          : void 0;
    if (!g)
      for (g = [], c = a.childNodes || a; null != (e = c[f]); f++)
        !b || d.nodeName(e, b) ? g.push(e) : d.merge(g, w(e, b));
    return void 0 === b || (b && d.nodeName(a, b)) ? d.merge([a], g) : g;
  }
  function cc(a) {
    Ga.test(a.type) && (a.defaultChecked = a.checked);
  }
  function gb(a, b) {
    return d.nodeName(a, "table") &&
      d.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr")
      ? a.getElementsByTagName("tbody")[0] ||
          a.appendChild(a.ownerDocument.createElement("tbody"))
      : a;
  }
  function hb(a) {
    a.type = (null !== d.find.attr(a, "type")) + "/" + a.type;
    return a;
  }
  function ib(a) {
    var b = dc.exec(a.type);
    b ? (a.type = b[1]) : a.removeAttribute("type");
    return a;
  }
  function Ha(a, b) {
    for (var c, e = 0; null != (c = a[e]); e++)
      d._data(c, "globalEval", !b || d._data(b[e], "globalEval"));
  }
  function jb(a, b) {
    if (1 === b.nodeType && d.hasData(a)) {
      var c, e, f;
      e = d._data(a);
      var g = d._data(b, e),
        h = e.events;
      if (h)
        for (c in (delete g.handle, (g.events = {}), h))
          for (e = 0, f = h[c].length; e < f; e++) d.event.add(b, c, h[c][e]);
      g.data && (g.data = d.extend({}, g.data));
    }
  }
  function kb(a, b) {
    var c,
      e = d(b.createElement(a)).appendTo(b.body),
      f =
        q.getDefaultComputedStyle && (c = q.getDefaultComputedStyle(e[0]))
          ? c.display
          : d.css(e[0], "display");
    e.detach();
    return f;
  }
  function pa(a) {
    var b = n,
      c = lb[a];
    c ||
      ((c = kb(a, b)),
      ("none" !== c && c) ||
        ((ha = (
          ha || d("<iframe frameborder='0' width='0' height='0'/>")
        ).appendTo(b.documentElement)),
        (b = (ha[0].contentWindow || ha[0].contentDocument).document),
        b.write(),
        b.close(),
        (c = kb(a, b)),
        ha.detach()),
      (lb[a] = c));
    return c;
  }
  function mb(a, b) {
    return {
      get: function () {
        var c = a();
        if (null != c)
          if (c) delete this.get;
          else return (this.get = b).apply(this, arguments);
      },
    };
  }
  function nb(a, b) {
    if (b in a) return b;
    for (
      var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, f = ob.length;
      f--;

    )
      if (((b = ob[f] + c), b in a)) return b;
    return d;
  }
  function pb(a, b) {
    for (var c, e, f, g = [], h = 0, k = a.length; h < k; h++)
      (e = a[h]),
        e.style &&
          ((g[h] = d._data(e, "olddisplay")),
          (c = e.style.display),
          b
            ? (g[h] || "none" !== c || (e.style.display = ""),
              "" === e.style.display &&
                ia(e) &&
                (g[h] = d._data(e, "olddisplay", pa(e.nodeName))))
            : ((f = ia(e)),
              ((c && "none" !== c) || !f) &&
                d._data(e, "olddisplay", f ? c : d.css(e, "display"))));
    for (h = 0; h < k; h++)
      (e = a[h]),
        !e.style ||
          (b && "none" !== e.style.display && "" !== e.style.display) ||
          (e.style.display = b ? g[h] || "" : "none");
    return a;
  }
  function qb(a, b, c) {
    return (a = ec.exec(b)) ? Math.max(0, a[1] - (c || 0)) + (a[2] || "px") : b;
  }
  function rb(a, b, c, e, f) {
    b = c === (e ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
    for (var g = 0; 4 > b; b += 2)
      "margin" === c && (g += d.css(a, c + M[b], !0, f)),
        e
          ? ("content" === c && (g -= d.css(a, "padding" + M[b], !0, f)),
            "margin" !== c && (g -= d.css(a, "border" + M[b] + "Width", !0, f)))
          : ((g += d.css(a, "padding" + M[b], !0, f)),
            "padding" !== c &&
              (g += d.css(a, "border" + M[b] + "Width", !0, f)));
    return g;
  }
  function sb(a, b, c) {
    var e = !0,
      f = "width" === b ? a.offsetWidth : a.offsetHeight,
      g = X(a),
      h = p.boxSizing && "border-box" === d.css(a, "boxSizing", !1, g);
    if (0 >= f || null == f) {
      f = F(a, b, g);
      if (0 > f || null == f) f = a.style[b];
      if (qa.test(f)) return f;
      e = h && (p.boxSizingReliable() || f === a.style[b]);
      f = parseFloat(f) || 0;
    }
    return f + rb(a, b, c || (h ? "border" : "content"), e, g) + "px";
  }
  function B(a, b, c, d, f) {
    return new B.prototype.init(a, b, c, d, f);
  }
  function tb() {
    setTimeout(function () {
      Y = void 0;
    });
    return (Y = d.now());
  }
  function ra(a, b) {
    var c,
      d = { height: a },
      f = 0;
    for (b = b ? 1 : 0; 4 > f; f += 2 - b)
      (c = M[f]), (d["margin" + c] = d["padding" + c] = a);
    b && (d.opacity = d.width = a);
    return d;
  }
  function ub(a, b, c) {
    for (
      var d, f = (ja[b] || []).concat(ja["*"]), g = 0, h = f.length;
      g < h;
      g++
    )
      if ((d = f[g].call(c, b, a))) return d;
  }
  function fc(a, b) {
    var c, e, f, g, h;
    for (c in a)
      if (
        ((e = d.camelCase(c)),
        (f = b[e]),
        (g = a[c]),
        d.isArray(g) && ((f = g[1]), (g = a[c] = g[0])),
        c !== e && ((a[e] = g), delete a[c]),
        (h = d.cssHooks[e]) && "expand" in h)
      )
        for (c in ((g = h.expand(g)), delete a[e], g))
          c in a || ((a[c] = g[c]), (b[c] = f));
      else b[e] = f;
  }
  function vb(a, b, c) {
    var e,
      f = 0,
      g = ca.length,
      h = d.Deferred().always(function () {
        delete k.elem;
      }),
      k = function () {
        if (e) return !1;
        for (
          var b = Y || tb(),
            b = Math.max(0, l.startTime + l.duration - b),
            c = 1 - (b / l.duration || 0),
            d = 0,
            f = l.tweens.length;
          d < f;
          d++
        )
          l.tweens[d].run(c);
        h.notifyWith(a, [l, c, b]);
        if (1 > c && f) return b;
        h.resolveWith(a, [l]);
        return !1;
      },
      l = h.promise({
        elem: a,
        props: d.extend({}, b),
        opts: d.extend(!0, { specialEasing: {} }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: Y || tb(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var e = d.Tween(
            a,
            l.opts,
            b,
            c,
            l.opts.specialEasing[b] || l.opts.easing
          );
          l.tweens.push(e);
          return e;
        },
        stop: function (b) {
          var c = 0,
            d = b ? l.tweens.length : 0;
          if (e) return this;
          for (e = !0; c < d; c++) l.tweens[c].run(1);
          b ? h.resolveWith(a, [l, b]) : h.rejectWith(a, [l, b]);
          return this;
        },
      });
    c = l.props;
    for (fc(c, l.opts.specialEasing); f < g; f++)
      if ((b = ca[f].call(l, a, c, l.opts))) return b;
    d.map(c, ub, l);
    d.isFunction(l.opts.start) && l.opts.start.call(a, l);
    d.fx.timer(d.extend(k, { elem: a, anim: l, queue: l.opts.queue }));
    return l
      .progress(l.opts.progress)
      .done(l.opts.done, l.opts.complete)
      .fail(l.opts.fail)
      .always(l.opts.always);
  }
  function wb(a) {
    return function (b, c) {
      "string" !== typeof b && ((c = b), (b = "*"));
      var e,
        f = 0,
        g = b.toLowerCase().match(K) || [];
      if (d.isFunction(c))
        for (; (e = g[f++]); )
          "+" === e.charAt(0)
            ? ((e = e.slice(1) || "*"), (a[e] = a[e] || []).unshift(c))
            : (a[e] = a[e] || []).push(c);
    };
  }
  function xb(a, b, c, e) {
    function f(k) {
      var l;
      g[k] = !0;
      d.each(a[k] || [], function (a, d) {
        var k = d(b, c, e);
        if ("string" === typeof k && !h && !g[k])
          return b.dataTypes.unshift(k), f(k), !1;
        if (h) return !(l = k);
      });
      return l;
    }
    var g = {},
      h = a === Ia;
    return f(b.dataTypes[0]) || (!g["*"] && f("*"));
  }
  function Ja(a, b) {
    var c,
      e,
      f = d.ajaxSettings.flatOptions || {};
    for (e in b) void 0 !== b[e] && ((f[e] ? a : c || (c = {}))[e] = b[e]);
    c && d.extend(!0, a, c);
    return a;
  }
  function Ka(a, b, c, e) {
    var f;
    if (d.isArray(b))
      d.each(b, function (b, d) {
        c || gc.test(a)
          ? e(a, d)
          : Ka(a + "[" + ("object" === typeof d ? b : "") + "]", d, c, e);
      });
    else if (c || "object" !== d.type(b)) e(a, b);
    else for (f in b) Ka(a + "[" + f + "]", b[f], c, e);
  }
  function yb() {
    try {
      return new q.XMLHttpRequest();
    } catch (a) {}
  }
  function zb(a) {
    return d.isWindow(a)
      ? a
      : 9 === a.nodeType
      ? a.defaultView || a.parentWindow
      : !1;
  }
  var R = [],
    N = R.slice,
    Ab = R.concat,
    La = R.push,
    Bb = R.indexOf,
    sa = {},
    hc = sa.toString,
    S = sa.hasOwnProperty,
    p = {},
    d = function (a, b) {
      return new d.fn.init(a, b);
    },
    ic = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    jc = /^-ms-/,
    kc = /-([\da-z])/gi,
    lc = function (a, b) {
      return b.toUpperCase();
    };
  d.fn = d.prototype = {
    jquery: "1.11.3",
    constructor: d,
    selector: "",
    length: 0,
    toArray: function () {
      return N.call(this);
    },
    get: function (a) {
      return null != a
        ? 0 > a
          ? this[a + this.length]
          : this[a]
        : N.call(this);
    },
    pushStack: function (a) {
      a = d.merge(this.constructor(), a);
      a.prevObject = this;
      a.context = this.context;
      return a;
    },
    each: function (a, b) {
      return d.each(this, a, b);
    },
    map: function (a) {
      return this.pushStack(
        d.map(this, function (b, c) {
          return a.call(b, c, b);
        })
      );
    },
    slice: function () {
      return this.pushStack(N.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (a) {
      var b = this.length;
      a = +a + (0 > a ? b : 0);
      return this.pushStack(0 <= a && a < b ? [this[a]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: La,
    sort: R.sort,
    splice: R.splice,
  };
  d.extend = d.fn.extend = function () {
    var a,
      b,
      c,
      e,
      f,
      g = arguments[0] || {},
      h = 1,
      k = arguments.length,
      l = !1;
    "boolean" === typeof g && ((l = g), (g = arguments[h] || {}), h++);
    "object" === typeof g || d.isFunction(g) || (g = {});
    h === k && ((g = this), h--);
    for (; h < k; h++)
      if (null != (f = arguments[h]))
        for (e in f)
          (a = g[e]),
            (c = f[e]),
            g !== c &&
              (l && c && (d.isPlainObject(c) || (b = d.isArray(c)))
                ? (b
                    ? ((b = !1), (a = a && d.isArray(a) ? a : []))
                    : (a = a && d.isPlainObject(a) ? a : {}),
                  (g[e] = d.extend(l, a, c)))
                : void 0 !== c && (g[e] = c));
    return g;
  };
  d.extend({
    expando: "jQuery" + ("1.11.3" + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function (a) {
      throw Error(a);
    },
    noop: function () {},
    isFunction: function (a) {
      return "function" === d.type(a);
    },
    isArray:
      Array.isArray ||
      function (a) {
        return "array" === d.type(a);
      },
    isWindow: function (a) {
      return null != a && a == a.window;
    },
    isNumeric: function (a) {
      return !d.isArray(a) && 0 <= a - parseFloat(a) + 1;
    },
    isEmptyObject: function (a) {
      for (var b in a) return !1;
      return !0;
    },
    isPlainObject: function (a) {
      var b;
      if (!a || "object" !== d.type(a) || a.nodeType || d.isWindow(a))
        return !1;
      try {
        if (
          a.constructor &&
          !S.call(a, "constructor") &&
          !S.call(a.constructor.prototype, "isPrototypeOf")
        )
          return !1;
      } catch (c) {
        return !1;
      }
      if (p.ownLast) for (b in a) return S.call(a, b);
      for (b in a);
      return void 0 === b || S.call(a, b);
    },
    type: function (a) {
      return null == a
        ? a + ""
        : "object" === typeof a || "function" === typeof a
        ? sa[hc.call(a)] || "object"
        : typeof a;
    },
    globalEval: function (a) {
      a &&
        d.trim(a) &&
        (
          q.execScript ||
          function (a) {
            q.eval.call(q, a);
          }
        )(a);
    },
    camelCase: function (a) {
      return a.replace(jc, "ms-").replace(kc, lc);
    },
    nodeName: function (a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
    },
    each: function (a, b, c) {
      var d,
        f = 0,
        g = a.length;
      d = Da(a);
      if (c)
        if (d) for (; f < g && ((d = b.apply(a[f], c)), !1 !== d); f++);
        else
          for (f in a) {
            if (((d = b.apply(a[f], c)), !1 === d)) break;
          }
      else if (d) for (; f < g && ((d = b.call(a[f], f, a[f])), !1 !== d); f++);
      else for (f in a) if (((d = b.call(a[f], f, a[f])), !1 === d)) break;
      return a;
    },
    trim: function (a) {
      return null == a ? "" : (a + "").replace(ic, "");
    },
    makeArray: function (a, b) {
      var c = b || [];
      null != a &&
        (Da(Object(a))
          ? d.merge(c, "string" === typeof a ? [a] : a)
          : La.call(c, a));
      return c;
    },
    inArray: function (a, b, c) {
      var d;
      if (b) {
        if (Bb) return Bb.call(b, a, c);
        d = b.length;
        for (c = c ? (0 > c ? Math.max(0, d + c) : c) : 0; c < d; c++)
          if (c in b && b[c] === a) return c;
      }
      return -1;
    },
    merge: function (a, b) {
      for (var c = +b.length, d = 0, f = a.length; d < c; ) a[f++] = b[d++];
      if (c !== c) for (; void 0 !== b[d]; ) a[f++] = b[d++];
      a.length = f;
      return a;
    },
    grep: function (a, b, c) {
      for (var d = [], f = 0, g = a.length, h = !c; f < g; f++)
        (c = !b(a[f], f)), c !== h && d.push(a[f]);
      return d;
    },
    map: function (a, b, c) {
      var d,
        f = 0,
        g = a.length,
        h = [];
      if (Da(a)) for (; f < g; f++) (d = b(a[f], f, c)), null != d && h.push(d);
      else for (f in a) (d = b(a[f], f, c)), null != d && h.push(d);
      return Ab.apply([], h);
    },
    guid: 1,
    proxy: function (a, b) {
      var c, e;
      "string" === typeof b && ((e = a[b]), (b = a), (a = e));
      if (d.isFunction(a))
        return (
          (c = N.call(arguments, 2)),
          (e = function () {
            return a.apply(b || this, c.concat(N.call(arguments)));
          }),
          (e.guid = a.guid = a.guid || d.guid++),
          e
        );
    },
    now: function () {
      return +new Date();
    },
    support: p,
  });
  d.each(
    "Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function (a, b) {
      sa["[object " + b + "]"] = b.toLowerCase();
    }
  );
  var fa = (function (a) {
    function b(a, b, c, d) {
      var e, f, g, h, k;
      (b ? b.ownerDocument || b : E) !== C && la(b);
      b = b || C;
      c = c || [];
      h = b.nodeType;
      if ("string" !== typeof a || !a || (1 !== h && 9 !== h && 11 !== h))
        return c;
      if (!d && T) {
        if (11 !== h && (e = ra.exec(a)))
          if ((g = e[1]))
            if (9 === h)
              if ((f = b.getElementById(g)) && f.parentNode) {
                if (f.id === g) return c.push(f), c;
              } else return c;
            else {
              if (
                b.ownerDocument &&
                (f = b.ownerDocument.getElementById(g)) &&
                L(b, f) &&
                f.id === g
              )
                return c.push(f), c;
            }
          else {
            if (e[2]) return da.apply(c, b.getElementsByTagName(a)), c;
            if ((g = e[3]) && u.getElementsByClassName)
              return da.apply(c, b.getElementsByClassName(g)), c;
          }
        if (u.qsa && (!A || !A.test(a))) {
          f = e = x;
          g = b;
          k = 1 !== h && a;
          if (1 === h && "object" !== b.nodeName.toLowerCase()) {
            h = ua(a);
            (e = b.getAttribute("id"))
              ? (f = e.replace(sa, "\\$&"))
              : b.setAttribute("id", f);
            f = "[id='" + f + "'] ";
            for (g = h.length; g--; ) h[g] = f + p(h[g]);
            g = (ca.test(a) && t(b.parentNode)) || b;
            k = h.join(",");
          }
          if (k)
            try {
              return da.apply(c, g.querySelectorAll(k)), c;
            } catch (l) {
            } finally {
              e || b.removeAttribute("id");
            }
        }
      }
      return Db(a.replace(O, "$1"), b, c, d);
    }
    function c() {
      function a(c, d) {
        b.push(c + " ") > s.cacheLength && delete a[b.shift()];
        return (a[c + " "] = d);
      }
      var b = [];
      return a;
    }
    function d(a) {
      a[x] = !0;
      return a;
    }
    function f(a) {
      var b = C.createElement("div");
      try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b);
      }
    }
    function g(a, b) {
      for (var c = a.split("|"), d = a.length; d--; ) s.attrHandle[c[d]] = b;
    }
    function h(a, b) {
      var c = b && a,
        d =
          c &&
          1 === a.nodeType &&
          1 === b.nodeType &&
          (~b.sourceIndex || -2147483648) - (~a.sourceIndex || -2147483648);
      if (d) return d;
      if (c) for (; (c = c.nextSibling); ) if (c === b) return -1;
      return a ? 1 : -1;
    }
    function k(a) {
      return function (b) {
        return "input" === b.nodeName.toLowerCase() && b.type === a;
      };
    }
    function l(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a;
      };
    }
    function r(a) {
      return d(function (b) {
        b = +b;
        return d(function (c, d) {
          for (var e, f = a([], c.length, b), g = f.length; g--; )
            c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
        });
      });
    }
    function t(a) {
      return a && "undefined" !== typeof a.getElementsByTagName && a;
    }
    function m() {}
    function p(a) {
      for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
      return d;
    }
    function n(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = R++;
      return b.first
        ? function (b, c, f) {
            for (; (b = b[d]); ) if (1 === b.nodeType || e) return a(b, c, f);
          }
        : function (b, c, g) {
            var h,
              k,
              Ma = [I, f];
            if (g)
              for (; (b = b[d]); ) {
                if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
              }
            else
              for (; (b = b[d]); )
                if (1 === b.nodeType || e) {
                  k = b[x] || (b[x] = {});
                  if ((h = k[d]) && h[0] === I && h[1] === f)
                    return (Ma[2] = h[2]);
                  k[d] = Ma;
                  if ((Ma[2] = a(b, c, g))) return !0;
                }
          };
    }
    function q(a) {
      return 1 < a.length
        ? function (b, c, d) {
            for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
            return !0;
          }
        : a[0];
    }
    function w(a, b, c, d, e) {
      for (var f, g = [], h = 0, k = a.length, l = null != b; h < k; h++)
        if ((f = a[h])) if (!c || c(f, d, e)) g.push(f), l && b.push(h);
      return g;
    }
    function Na(a, c, f, g, h, k) {
      g && !g[x] && (g = Na(g));
      h && !h[x] && (h = Na(h, k));
      return d(function (d, e, k, l) {
        var m,
          r,
          t = [],
          p = [],
          s = e.length,
          z;
        if (!(z = d)) {
          z = c || "*";
          for (
            var n = k.nodeType ? [k] : k, Cb = [], q = 0, y = n.length;
            q < y;
            q++
          )
            b(z, n[q], Cb);
          z = Cb;
        }
        z = !a || (!d && c) ? z : w(z, t, a, k, l);
        n = f ? (h || (d ? a : s || g) ? [] : e) : z;
        f && f(z, n, k, l);
        if (g)
          for (m = w(n, p), g(m, [], k, l), k = m.length; k--; )
            if ((r = m[k])) n[p[k]] = !(z[p[k]] = r);
        if (d) {
          if (h || a) {
            if (h) {
              m = [];
              for (k = n.length; k--; ) (r = n[k]) && m.push((z[k] = r));
              h(null, (n = []), m, l);
            }
            for (k = n.length; k--; )
              (r = n[k]) &&
                -1 < (m = h ? ma(d, r) : t[k]) &&
                (d[m] = !(e[m] = r));
          }
        } else (n = w(n === e ? n.splice(s, n.length) : n)), h ? h(null, e, n, l) : da.apply(e, n);
      });
    }
    function B(a) {
      var b,
        c,
        d,
        e = a.length,
        f = s.relative[a[0].type];
      c = f || s.relative[" "];
      for (
        var g = f ? 1 : 0,
          h = n(
            function (a) {
              return a === b;
            },
            c,
            !0
          ),
          k = n(
            function (a) {
              return -1 < ma(b, a);
            },
            c,
            !0
          ),
          l = [
            function (a, c, d) {
              a =
                (!f && (d || c !== D)) ||
                ((b = c).nodeType ? h(a, c, d) : k(a, c, d));
              b = null;
              return a;
            },
          ];
        g < e;
        g++
      )
        if ((c = s.relative[a[g].type])) l = [n(q(l), c)];
        else {
          c = s.filter[a[g].type].apply(null, a[g].matches);
          if (c[x]) {
            for (d = ++g; d < e && !s.relative[a[d].type]; d++);
            return Na(
              1 < g && q(l),
              1 < g &&
                p(
                  a
                    .slice(0, g - 1)
                    .concat({ value: " " === a[g - 2].type ? "*" : "" })
                ).replace(O, "$1"),
              c,
              g < d && B(a.slice(g, d)),
              d < e && B((a = a.slice(d))),
              d < e && p(a)
            );
          }
          l.push(c);
        }
      return q(l);
    }
    function H(a, c) {
      var f = 0 < c.length,
        g = 0 < a.length,
        h = function (d, e, h, k, l) {
          var m,
            r,
            t,
            p = 0,
            n = "0",
            z = d && [],
            ka = [],
            q = D,
            y = d || (g && s.find.TAG("*", l)),
            va = (I += null == q ? 1 : Math.random() || 0.1),
            v = y.length;
          for (l && (D = e !== C && e); n !== v && null != (m = y[n]); n++) {
            if (g && m) {
              for (r = 0; (t = a[r++]); )
                if (t(m, e, h)) {
                  k.push(m);
                  break;
                }
              l && (I = va);
            }
            f && ((m = !t && m) && p--, d && z.push(m));
          }
          p += n;
          if (f && n !== p) {
            for (r = 0; (t = c[r++]); ) t(z, ka, e, h);
            if (d) {
              if (0 < p) for (; n--; ) z[n] || ka[n] || (ka[n] = aa.call(k));
              ka = w(ka);
            }
            da.apply(k, ka);
            l && !d && 0 < ka.length && 1 < p + c.length && b.uniqueSort(k);
          }
          l && ((I = va), (D = q));
          return z;
        };
      return f ? d(h) : h;
    }
    var J,
      u,
      s,
      K,
      va,
      ua,
      Oa,
      Db,
      D,
      ea,
      ta,
      la,
      C,
      G,
      T,
      A,
      v,
      ya,
      L,
      x = "sizzle" + 1 * new Date(),
      E = a.document,
      I = 0,
      R = 0,
      N = c(),
      P = c(),
      Q = c(),
      M = function (a, b) {
        a === b && (ta = !0);
        return 0;
      },
      X = {}.hasOwnProperty,
      F = [],
      aa = F.pop,
      ba = F.push,
      da = F.push,
      U = F.slice,
      ma = function (a, b) {
        for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
        return -1;
      },
      W = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"),
      Y =
        "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        W +
        "))|)[\\x20\\t\\r\\n\\f]*\\]",
      S =
        ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        Y +
        ")*)|.*)\\)|)",
      fa = /[\x20\t\r\n\f]+/g,
      O = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
      ga = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
      ha = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
      ia = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g,
      ja = new RegExp(S),
      na = new RegExp("^" + W + "$"),
      V = {
        ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
        CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
        TAG: new RegExp(
          "^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"
        ),
        ATTR: new RegExp("^" + Y),
        PSEUDO: new RegExp("^" + S),
        CHILD:
          /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
        bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
        needsContext:
          /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
      },
      pa = /^(?:input|select|textarea|button)$/i,
      qa = /^h\d$/i,
      wa = /^[^{]+\{\s*\[native \w/,
      ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ca = /[+~]/,
      sa = /'|\\/g,
      Z = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/gi,
      $ = function (a, b, c) {
        a = "0x" + b - 65536;
        return a !== a || c
          ? b
          : 0 > a
          ? String.fromCharCode(a + 65536)
          : String.fromCharCode((a >> 10) | 55296, (a & 1023) | 56320);
      },
      oa = function () {
        la();
      };
    try {
      da.apply((F = U.call(E.childNodes)), E.childNodes),
        F[E.childNodes.length].nodeType;
    } catch (xa) {
      da = {
        apply: F.length
          ? function (a, b) {
              ba.apply(a, U.call(b));
            }
          : function (a, b) {
              for (var c = a.length, d = 0; (a[c++] = b[d++]); );
              a.length = c - 1;
            },
      };
    }
    u = b.support = {};
    va = b.isXML = function (a) {
      return (a = a && (a.ownerDocument || a).documentElement)
        ? "HTML" !== a.nodeName
        : !1;
    };
    la = b.setDocument = function (a) {
      var b = a ? a.ownerDocument || a : E;
      if (b === C || 9 !== b.nodeType || !b.documentElement) return C;
      C = b;
      G = b.documentElement;
      (a = b.defaultView) &&
        a !== a.top &&
        (a.addEventListener
          ? a.addEventListener("unload", oa, !1)
          : a.attachEvent && a.attachEvent("onunload", oa));
      T = !va(b);
      u.attributes = f(function (a) {
        a.className = "i";
        return !a.getAttribute("className");
      });
      u.getElementsByTagName = f(function (a) {
        a.appendChild(b.createComment(""));
        return !a.getElementsByTagName("*").length;
      });
      u.getElementsByClassName = wa.test(b.getElementsByClassName);
      u.getById = f(function (a) {
        G.appendChild(a).id = x;
        return !b.getElementsByName || !b.getElementsByName(x).length;
      });
      u.getById
        ? ((s.find.ID = function (a, b) {
            if ("undefined" !== typeof b.getElementById && T) {
              var c = b.getElementById(a);
              return c && c.parentNode ? [c] : [];
            }
          }),
          (s.filter.ID = function (a) {
            var b = a.replace(Z, $);
            return function (a) {
              return a.getAttribute("id") === b;
            };
          }))
        : (delete s.find.ID,
          (s.filter.ID = function (a) {
            var b = a.replace(Z, $);
            return function (a) {
              return (
                (a =
                  "undefined" !== typeof a.getAttributeNode &&
                  a.getAttributeNode("id")) && a.value === b
              );
            };
          }));
      s.find.TAG = u.getElementsByTagName
        ? function (a, b) {
            if ("undefined" !== typeof b.getElementsByTagName)
              return b.getElementsByTagName(a);
            if (u.qsa) return b.querySelectorAll(a);
          }
        : function (a, b) {
            var c,
              d = [],
              e = 0,
              f = b.getElementsByTagName(a);
            if ("*" === a) {
              for (; (c = f[e++]); ) 1 === c.nodeType && d.push(c);
              return d;
            }
            return f;
          };
      s.find.CLASS =
        u.getElementsByClassName &&
        function (a, b) {
          if (T) return b.getElementsByClassName(a);
        };
      v = [];
      A = [];
      if ((u.qsa = wa.test(b.querySelectorAll)))
        f(function (a) {
          G.appendChild(a).innerHTML =
            "<a id='" +
            x +
            "'></a><select id='" +
            x +
            "-\f]' msallowcapture=''><option selected=''></option></select>";
          a.querySelectorAll("[msallowcapture^='']").length &&
            A.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
          a.querySelectorAll("[selected]").length ||
            A.push(
              "\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)"
            );
          a.querySelectorAll("[id~=" + x + "-]").length || A.push("~=");
          a.querySelectorAll(":checked").length || A.push(":checked");
          a.querySelectorAll("a#" + x + "+*").length || A.push(".#.+[+~]");
        }),
          f(function (a) {
            var c = b.createElement("input");
            c.setAttribute("type", "hidden");
            a.appendChild(c).setAttribute("name", "D");
            a.querySelectorAll("[name=d]").length &&
              A.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
            a.querySelectorAll(":enabled").length ||
              A.push(":enabled", ":disabled");
            a.querySelectorAll("*,:x");
            A.push(",.*:");
          });
      (u.matchesSelector = wa.test(
        (ya =
          G.matches ||
          G.webkitMatchesSelector ||
          G.mozMatchesSelector ||
          G.oMatchesSelector ||
          G.msMatchesSelector)
      )) &&
        f(function (a) {
          u.disconnectedMatch = ya.call(a, "div");
          ya.call(a, "[s!='']:x");
          v.push("!=", S);
        });
      A = A.length && new RegExp(A.join("|"));
      v = v.length && new RegExp(v.join("|"));
      L =
        (a = wa.test(G.compareDocumentPosition)) || wa.test(G.contains)
          ? function (a, b) {
              var c = 9 === a.nodeType ? a.documentElement : a,
                d = b && b.parentNode;
              return (
                a === d ||
                !!(
                  d &&
                  1 === d.nodeType &&
                  (c.contains
                    ? c.contains(d)
                    : a.compareDocumentPosition &&
                      a.compareDocumentPosition(d) & 16)
                )
              );
            }
          : function (a, b) {
              if (b) for (; (b = b.parentNode); ) if (b === a) return !0;
              return !1;
            };
      M = a
        ? function (a, c) {
            if (a === c) return (ta = !0), 0;
            var d = !a.compareDocumentPosition - !c.compareDocumentPosition;
            if (d) return d;
            d =
              (a.ownerDocument || a) === (c.ownerDocument || c)
                ? a.compareDocumentPosition(c)
                : 1;
            return d & 1 ||
              (!u.sortDetached && c.compareDocumentPosition(a) === d)
              ? a === b || (a.ownerDocument === E && L(E, a))
                ? -1
                : c === b || (c.ownerDocument === E && L(E, c))
                ? 1
                : ea
                ? ma(ea, a) - ma(ea, c)
                : 0
              : d & 4
              ? -1
              : 1;
          }
        : function (a, c) {
            if (a === c) return (ta = !0), 0;
            var d,
              e = 0;
            d = a.parentNode;
            var f = c.parentNode,
              g = [a],
              k = [c];
            if (!d || !f)
              return a === b
                ? -1
                : c === b
                ? 1
                : d
                ? -1
                : f
                ? 1
                : ea
                ? ma(ea, a) - ma(ea, c)
                : 0;
            if (d === f) return h(a, c);
            for (d = a; (d = d.parentNode); ) g.unshift(d);
            for (d = c; (d = d.parentNode); ) k.unshift(d);
            for (; g[e] === k[e]; ) e++;
            return e ? h(g[e], k[e]) : g[e] === E ? -1 : k[e] === E ? 1 : 0;
          };
      return b;
    };
    b.matches = function (a, c) {
      return b(a, null, null, c);
    };
    b.matchesSelector = function (a, c) {
      (a.ownerDocument || a) !== C && la(a);
      c = c.replace(ia, "='$1']");
      if (!(!u.matchesSelector || !T || (v && v.test(c)) || (A && A.test(c))))
        try {
          var d = ya.call(a, c);
          if (
            d ||
            u.disconnectedMatch ||
            (a.document && 11 !== a.document.nodeType)
          )
            return d;
        } catch (e) {}
      return 0 < b(c, C, null, [a]).length;
    };
    b.contains = function (a, b) {
      (a.ownerDocument || a) !== C && la(a);
      return L(a, b);
    };
    b.attr = function (a, b) {
      (a.ownerDocument || a) !== C && la(a);
      var c = s.attrHandle[b.toLowerCase()],
        c = c && X.call(s.attrHandle, b.toLowerCase()) ? c(a, b, !T) : void 0;
      return void 0 !== c
        ? c
        : u.attributes || !T
        ? a.getAttribute(b)
        : (c = a.getAttributeNode(b)) && c.specified
        ? c.value
        : null;
    };
    b.error = function (a) {
      throw Error("Syntax error, unrecognized expression: " + a);
    };
    b.uniqueSort = function (a) {
      var b,
        c = [],
        d = 0,
        e = 0;
      ta = !u.detectDuplicates;
      ea = !u.sortStable && a.slice(0);
      a.sort(M);
      if (ta) {
        for (; (b = a[e++]); ) b === a[e] && (d = c.push(e));
        for (; d--; ) a.splice(c[d], 1);
      }
      ea = null;
      return a;
    };
    K = b.getText = function (a) {
      var b,
        c = "",
        d = 0;
      b = a.nodeType;
      if (!b) for (; (b = a[d++]); ) c += K(b);
      else if (1 === b || 9 === b || 11 === b) {
        if ("string" === typeof a.textContent) return a.textContent;
        for (a = a.firstChild; a; a = a.nextSibling) c += K(a);
      } else if (3 === b || 4 === b) return a.nodeValue;
      return c;
    };
    s = b.selectors = {
      cacheLength: 50,
      createPseudo: d,
      match: V,
      attrHandle: {},
      find: {},
      relative: {
        ">": { dir: "parentNode", first: !0 },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: !0 },
        "~": { dir: "previousSibling" },
      },
      preFilter: {
        ATTR: function (a) {
          a[1] = a[1].replace(Z, $);
          a[3] = (a[3] || a[4] || a[5] || "").replace(Z, $);
          "~=" === a[2] && (a[3] = " " + a[3] + " ");
          return a.slice(0, 4);
        },
        CHILD: function (a) {
          a[1] = a[1].toLowerCase();
          "nth" === a[1].slice(0, 3)
            ? (a[3] || b.error(a[0]),
              (a[4] = +(a[4]
                ? a[5] + (a[6] || 1)
                : 2 * ("even" === a[3] || "odd" === a[3]))),
              (a[5] = +(a[7] + a[8] || "odd" === a[3])))
            : a[3] && b.error(a[0]);
          return a;
        },
        PSEUDO: function (a) {
          var b,
            c = !a[6] && a[2];
          if (V.CHILD.test(a[0])) return null;
          a[3]
            ? (a[2] = a[4] || a[5] || "")
            : c &&
              ja.test(c) &&
              (b = ua(c, !0)) &&
              (b = c.indexOf(")", c.length - b) - c.length) &&
              ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b)));
          return a.slice(0, 3);
        },
      },
      filter: {
        TAG: function (a) {
          var b = a.replace(Z, $).toLowerCase();
          return "*" === a
            ? function () {
                return !0;
              }
            : function (a) {
                return a.nodeName && a.nodeName.toLowerCase() === b;
              };
        },
        CLASS: function (a) {
          var b = N[a + " "];
          return (
            b ||
            ((b = new RegExp(
              "(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)"
            )) &&
              N(a, function (a) {
                return b.test(
                  ("string" === typeof a.className && a.className) ||
                    ("undefined" !== typeof a.getAttribute &&
                      a.getAttribute("class")) ||
                    ""
                );
              }))
          );
        },
        ATTR: function (a, c, d) {
          return function (e) {
            e = b.attr(e, a);
            if (null == e) return "!=" === c;
            if (!c) return !0;
            e += "";
            return "=" === c
              ? e === d
              : "!=" === c
              ? e !== d
              : "^=" === c
              ? d && 0 === e.indexOf(d)
              : "*=" === c
              ? d && -1 < e.indexOf(d)
              : "$=" === c
              ? d && e.slice(-d.length) === d
              : "~=" === c
              ? -1 < (" " + e.replace(fa, " ") + " ").indexOf(d)
              : "|=" === c
              ? e === d || e.slice(0, d.length + 1) === d + "-"
              : !1;
          };
        },
        CHILD: function (a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;
          return 1 === d && 0 === e
            ? function (a) {
                return !!a.parentNode;
              }
            : function (b, c, k) {
                var l, m, r, t, p;
                c = f !== g ? "nextSibling" : "previousSibling";
                var n = b.parentNode,
                  z = h && b.nodeName.toLowerCase();
                k = !k && !h;
                if (n) {
                  if (f) {
                    for (; c; ) {
                      for (m = b; (m = m[c]); )
                        if (
                          h ? m.nodeName.toLowerCase() === z : 1 === m.nodeType
                        )
                          return !1;
                      p = c = "only" === a && !p && "nextSibling";
                    }
                    return !0;
                  }
                  p = [g ? n.firstChild : n.lastChild];
                  if (g && k)
                    for (
                      k = n[x] || (n[x] = {}),
                        l = k[a] || [],
                        t = l[0] === I && l[1],
                        r = l[0] === I && l[2],
                        m = t && n.childNodes[t];
                      (m = (++t && m && m[c]) || (r = t = 0) || p.pop());

                    ) {
                      if (1 === m.nodeType && ++r && m === b) {
                        k[a] = [I, t, r];
                        break;
                      }
                    }
                  else if (k && (l = (b[x] || (b[x] = {}))[a]) && l[0] === I)
                    r = l[1];
                  else
                    for (
                      ;
                      (m = (++t && m && m[c]) || (r = t = 0) || p.pop()) &&
                      ((h
                        ? m.nodeName.toLowerCase() !== z
                        : 1 !== m.nodeType) ||
                        !++r ||
                        (k && ((m[x] || (m[x] = {}))[a] = [I, r]), m !== b));

                    );
                  r -= e;
                  return r === d || (0 === r % d && 0 <= r / d);
                }
              };
        },
        PSEUDO: function (a, c) {
          var f,
            g =
              s.pseudos[a] ||
              s.setFilters[a.toLowerCase()] ||
              b.error("unsupported pseudo: " + a);
          return g[x]
            ? g(c)
            : 1 < g.length
            ? ((f = [a, a, "", c]),
              s.setFilters.hasOwnProperty(a.toLowerCase())
                ? d(function (a, b) {
                    for (var d, e = g(a, c), f = e.length; f--; )
                      (d = ma(a, e[f])), (a[d] = !(b[d] = e[f]));
                  })
                : function (a) {
                    return g(a, 0, f);
                  })
            : g;
        },
      },
      pseudos: {
        not: d(function (a) {
          var b = [],
            c = [],
            f = Oa(a.replace(O, "$1"));
          return f[x]
            ? d(function (a, b, c, d) {
                d = f(a, null, d, []);
                for (var e = a.length; e--; )
                  if ((c = d[e])) a[e] = !(b[e] = c);
              })
            : function (a, d, e) {
                b[0] = a;
                f(b, null, e, c);
                b[0] = null;
                return !c.pop();
              };
        }),
        has: d(function (a) {
          return function (c) {
            return 0 < b(a, c).length;
          };
        }),
        contains: d(function (a) {
          a = a.replace(Z, $);
          return function (b) {
            return -1 < (b.textContent || b.innerText || K(b)).indexOf(a);
          };
        }),
        lang: d(function (a) {
          na.test(a || "") || b.error("unsupported lang: " + a);
          a = a.replace(Z, $).toLowerCase();
          return function (b) {
            var c;
            do
              if (
                (c = T
                  ? b.lang
                  : b.getAttribute("xml:lang") || b.getAttribute("lang"))
              )
                return (
                  (c = c.toLowerCase()), c === a || 0 === c.indexOf(a + "-")
                );
            while ((b = b.parentNode) && 1 === b.nodeType);
            return !1;
          };
        }),
        target: function (b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id;
        },
        root: function (a) {
          return a === G;
        },
        focus: function (a) {
          return (
            a === C.activeElement &&
            (!C.hasFocus || C.hasFocus()) &&
            !!(a.type || a.href || ~a.tabIndex)
          );
        },
        enabled: function (a) {
          return !1 === a.disabled;
        },
        disabled: function (a) {
          return !0 === a.disabled;
        },
        checked: function (a) {
          var b = a.nodeName.toLowerCase();
          return (
            ("input" === b && !!a.checked) || ("option" === b && !!a.selected)
          );
        },
        selected: function (a) {
          a.parentNode && a.parentNode.selectedIndex;
          return !0 === a.selected;
        },
        empty: function (a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            if (6 > a.nodeType) return !1;
          return !0;
        },
        parent: function (a) {
          return !s.pseudos.empty(a);
        },
        header: function (a) {
          return qa.test(a.nodeName);
        },
        input: function (a) {
          return pa.test(a.nodeName);
        },
        button: function (a) {
          var b = a.nodeName.toLowerCase();
          return ("input" === b && "button" === a.type) || "button" === b;
        },
        text: function (a) {
          var b;
          return (
            "input" === a.nodeName.toLowerCase() &&
            "text" === a.type &&
            (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
          );
        },
        first: r(function () {
          return [0];
        }),
        last: r(function (a, b) {
          return [b - 1];
        }),
        eq: r(function (a, b, c) {
          return [0 > c ? c + b : c];
        }),
        even: r(function (a, b) {
          for (var c = 0; c < b; c += 2) a.push(c);
          return a;
        }),
        odd: r(function (a, b) {
          for (var c = 1; c < b; c += 2) a.push(c);
          return a;
        }),
        lt: r(function (a, b, c) {
          for (b = 0 > c ? c + b : c; 0 <= --b; ) a.push(b);
          return a;
        }),
        gt: r(function (a, b, c) {
          for (c = 0 > c ? c + b : c; ++c < b; ) a.push(c);
          return a;
        }),
      },
    };
    s.pseudos.nth = s.pseudos.eq;
    for (J in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
      s.pseudos[J] = k(J);
    for (J in { submit: !0, reset: !0 }) s.pseudos[J] = l(J);
    m.prototype = s.filters = s.pseudos;
    s.setFilters = new m();
    ua = b.tokenize = function (a, c) {
      var d, e, f, g, h, k, l;
      if ((h = P[a + " "])) return c ? 0 : h.slice(0);
      h = a;
      k = [];
      for (l = s.preFilter; h; ) {
        if (!d || (e = ga.exec(h)))
          e && (h = h.slice(e[0].length) || h), k.push((f = []));
        d = !1;
        if ((e = ha.exec(h)))
          (d = e.shift()),
            f.push({ value: d, type: e[0].replace(O, " ") }),
            (h = h.slice(d.length));
        for (g in s.filter)
          !(e = V[g].exec(h)) ||
            (l[g] && !(e = l[g](e))) ||
            ((d = e.shift()),
            f.push({ value: d, type: g, matches: e }),
            (h = h.slice(d.length)));
        if (!d) break;
      }
      return c ? h.length : h ? b.error(a) : P(a, k).slice(0);
    };
    Oa = b.compile = function (a, b) {
      var c,
        d = [],
        e = [],
        f = Q[a + " "];
      if (!f) {
        b || (b = ua(a));
        for (c = b.length; c--; ) (f = B(b[c])), f[x] ? d.push(f) : e.push(f);
        f = Q(a, H(e, d));
        f.selector = a;
      }
      return f;
    };
    Db = b.select = function (a, b, c, d) {
      var e,
        f,
        g,
        h,
        k = "function" === typeof a && a,
        l = !d && ua((a = k.selector || a));
      c = c || [];
      if (1 === l.length) {
        f = l[0] = l[0].slice(0);
        if (
          2 < f.length &&
          "ID" === (g = f[0]).type &&
          u.getById &&
          9 === b.nodeType &&
          T &&
          s.relative[f[1].type]
        ) {
          b = (s.find.ID(g.matches[0].replace(Z, $), b) || [])[0];
          if (!b) return c;
          k && (b = b.parentNode);
          a = a.slice(f.shift().value.length);
        }
        for (e = V.needsContext.test(a) ? 0 : f.length; e--; ) {
          g = f[e];
          if (s.relative[(h = g.type)]) break;
          if ((h = s.find[h]))
            if (
              (d = h(
                g.matches[0].replace(Z, $),
                (ca.test(f[0].type) && t(b.parentNode)) || b
              ))
            ) {
              f.splice(e, 1);
              a = d.length && p(f);
              if (!a) return da.apply(c, d), c;
              break;
            }
        }
      }
      (k || Oa(a, l))(d, b, !T, c, (ca.test(a) && t(b.parentNode)) || b);
      return c;
    };
    u.sortStable = x.split("").sort(M).join("") === x;
    u.detectDuplicates = !!ta;
    la();
    u.sortDetached = f(function (a) {
      return a.compareDocumentPosition(C.createElement("div")) & 1;
    });
    f(function (a) {
      a.innerHTML = "<a href='#'></a>";
      return "#" === a.firstChild.getAttribute("href");
    }) ||
      g("type|href|height|width", function (a, b, c) {
        if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
      });
    (u.attributes &&
      f(function (a) {
        a.innerHTML = "<input/>";
        a.firstChild.setAttribute("value", "");
        return "" === a.firstChild.getAttribute("value");
      })) ||
      g("value", function (a, b, c) {
        if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue;
      });
    f(function (a) {
      return null == a.getAttribute("disabled");
    }) ||
      g(
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        function (a, b, c) {
          var d;
          if (!c)
            return !0 === a[b]
              ? b.toLowerCase()
              : (d = a.getAttributeNode(b)) && d.specified
              ? d.value
              : null;
        }
      );
    return b;
  })(q);
  d.find = fa;
  d.expr = fa.selectors;
  d.expr[":"] = d.expr.pseudos;
  d.unique = fa.uniqueSort;
  d.text = fa.getText;
  d.isXMLDoc = fa.isXML;
  d.contains = fa.contains;
  var Eb = d.expr.match.needsContext,
    Fb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    Zb = /^.[^:#\[\.,]*$/;
  d.filter = function (a, b, c) {
    var e = b[0];
    c && (a = ":not(" + a + ")");
    return 1 === b.length && 1 === e.nodeType
      ? d.find.matchesSelector(e, a)
        ? [e]
        : []
      : d.find.matches(
          a,
          d.grep(b, function (a) {
            return 1 === a.nodeType;
          })
        );
  };
  d.fn.extend({
    find: function (a) {
      var b,
        c = [],
        e = this,
        f = e.length;
      if ("string" !== typeof a)
        return this.pushStack(
          d(a).filter(function () {
            for (b = 0; b < f; b++) if (d.contains(e[b], this)) return !0;
          })
        );
      for (b = 0; b < f; b++) d.find(a, e[b], c);
      c = this.pushStack(1 < f ? d.unique(c) : c);
      c.selector = this.selector ? this.selector + " " + a : a;
      return c;
    },
    filter: function (a) {
      return this.pushStack(Ea(this, a || [], !1));
    },
    not: function (a) {
      return this.pushStack(Ea(this, a || [], !0));
    },
    is: function (a) {
      return !!Ea(
        this,
        "string" === typeof a && Eb.test(a) ? d(a) : a || [],
        !1
      ).length;
    },
  });
  var na,
    n = q.document,
    mc = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  (d.fn.init = function (a, b) {
    var c, e;
    if (!a) return this;
    if ("string" === typeof a) {
      c =
        "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length
          ? [null, a, null]
          : mc.exec(a);
      if (!c || (!c[1] && b))
        return !b || b.jquery ? (b || na).find(a) : this.constructor(b).find(a);
      if (c[1]) {
        if (
          ((b = b instanceof d ? b[0] : b),
          d.merge(
            this,
            d.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : n, !0)
          ),
          Fb.test(c[1]) && d.isPlainObject(b))
        )
          for (c in b)
            if (d.isFunction(this[c])) this[c](b[c]);
            else this.attr(c, b[c]);
      } else {
        if ((e = n.getElementById(c[2])) && e.parentNode) {
          if (e.id !== c[2]) return na.find(a);
          this.length = 1;
          this[0] = e;
        }
        this.context = n;
        this.selector = a;
      }
      return this;
    }
    if (a.nodeType)
      return (this.context = this[0] = a), (this.length = 1), this;
    if (d.isFunction(a))
      return "undefined" !== typeof na.ready ? na.ready(a) : a(d);
    void 0 !== a.selector &&
      ((this.selector = a.selector), (this.context = a.context));
    return d.makeArray(a, this);
  }).prototype = d.fn;
  na = d(n);
  var nc = /^(?:parents|prev(?:Until|All))/,
    oc = { children: !0, contents: !0, next: !0, prev: !0 };
  d.extend({
    dir: function (a, b, c) {
      var e = [];
      for (
        a = a[b];
        a &&
        9 !== a.nodeType &&
        (void 0 === c || 1 !== a.nodeType || !d(a).is(c));

      )
        1 === a.nodeType && e.push(a), (a = a[b]);
      return e;
    },
    sibling: function (a, b) {
      for (var c = []; a; a = a.nextSibling)
        1 === a.nodeType && a !== b && c.push(a);
      return c;
    },
  });
  d.fn.extend({
    has: function (a) {
      var b,
        c = d(a, this),
        e = c.length;
      return this.filter(function () {
        for (b = 0; b < e; b++) if (d.contains(this, c[b])) return !0;
      });
    },
    closest: function (a, b) {
      for (
        var c,
          e = 0,
          f = this.length,
          g = [],
          h = Eb.test(a) || "string" !== typeof a ? d(a, b || this.context) : 0;
        e < f;
        e++
      )
        for (c = this[e]; c && c !== b; c = c.parentNode)
          if (
            11 > c.nodeType &&
            (h
              ? -1 < h.index(c)
              : 1 === c.nodeType && d.find.matchesSelector(c, a))
          ) {
            g.push(c);
            break;
          }
      return this.pushStack(1 < g.length ? d.unique(g) : g);
    },
    index: function (a) {
      return a
        ? "string" === typeof a
          ? d.inArray(this[0], d(a))
          : d.inArray(a.jquery ? a[0] : a, this)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (a, b) {
      return this.pushStack(d.unique(d.merge(this.get(), d(a, b))));
    },
    addBack: function (a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    },
  });
  d.each(
    {
      parent: function (a) {
        return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
      },
      parents: function (a) {
        return d.dir(a, "parentNode");
      },
      parentsUntil: function (a, b, c) {
        return d.dir(a, "parentNode", c);
      },
      next: function (a) {
        return Ya(a, "nextSibling");
      },
      prev: function (a) {
        return Ya(a, "previousSibling");
      },
      nextAll: function (a) {
        return d.dir(a, "nextSibling");
      },
      prevAll: function (a) {
        return d.dir(a, "previousSibling");
      },
      nextUntil: function (a, b, c) {
        return d.dir(a, "nextSibling", c);
      },
      prevUntil: function (a, b, c) {
        return d.dir(a, "previousSibling", c);
      },
      siblings: function (a) {
        return d.sibling((a.parentNode || {}).firstChild, a);
      },
      children: function (a) {
        return d.sibling(a.firstChild);
      },
      contents: function (a) {
        return d.nodeName(a, "iframe")
          ? a.contentDocument || a.contentWindow.document
          : d.merge([], a.childNodes);
      },
    },
    function (a, b) {
      d.fn[a] = function (c, e) {
        var f = d.map(this, b, c);
        "Until" !== a.slice(-5) && (e = c);
        e && "string" === typeof e && (f = d.filter(e, f));
        1 < this.length &&
          (oc[a] || (f = d.unique(f)), nc.test(a) && (f = f.reverse()));
        return this.pushStack(f);
      };
    }
  );
  var K = /\S+/g,
    Za = {};
  d.Callbacks = function (a) {
    a = "string" === typeof a ? Za[a] || $b(a) : d.extend({}, a);
    var b,
      c,
      e,
      f,
      g,
      h,
      k = [],
      l = !a.once && [],
      r = function (d) {
        c = a.memory && d;
        e = !0;
        g = h || 0;
        h = 0;
        f = k.length;
        for (b = !0; k && g < f; g++)
          if (!1 === k[g].apply(d[0], d[1]) && a.stopOnFalse) {
            c = !1;
            break;
          }
        b = !1;
        k && (l ? l.length && r(l.shift()) : c ? (k = []) : t.disable());
      },
      t = {
        add: function () {
          if (k) {
            var e = k.length;
            (function y(b) {
              d.each(b, function (b, c) {
                var e = d.type(c);
                "function" === e
                  ? (a.unique && t.has(c)) || k.push(c)
                  : c && c.length && "string" !== e && y(c);
              });
            })(arguments);
            b ? (f = k.length) : c && ((h = e), r(c));
          }
          return this;
        },
        remove: function () {
          k &&
            d.each(arguments, function (a, c) {
              for (var e; -1 < (e = d.inArray(c, k, e)); )
                k.splice(e, 1), b && (e <= f && f--, e <= g && g--);
            });
          return this;
        },
        has: function (a) {
          return a ? -1 < d.inArray(a, k) : !(!k || !k.length);
        },
        empty: function () {
          k = [];
          f = 0;
          return this;
        },
        disable: function () {
          k = l = c = void 0;
          return this;
        },
        disabled: function () {
          return !k;
        },
        lock: function () {
          l = void 0;
          c || t.disable();
          return this;
        },
        locked: function () {
          return !l;
        },
        fireWith: function (a, c) {
          !k ||
            (e && !l) ||
            ((c = c || []),
            (c = [a, c.slice ? c.slice() : c]),
            b ? l.push(c) : r(c));
          return this;
        },
        fire: function () {
          t.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!e;
        },
      };
    return t;
  };
  d.extend({
    Deferred: function (a) {
      var b = [
          ["resolve", "done", d.Callbacks("once memory"), "resolved"],
          ["reject", "fail", d.Callbacks("once memory"), "rejected"],
          ["notify", "progress", d.Callbacks("memory")],
        ],
        c = "pending",
        e = {
          state: function () {
            return c;
          },
          always: function () {
            f.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var a = arguments;
            return d
              .Deferred(function (c) {
                d.each(b, function (b, l) {
                  var r = d.isFunction(a[b]) && a[b];
                  f[l[1]](function () {
                    var a = r && r.apply(this, arguments);
                    if (a && d.isFunction(a.promise))
                      a.promise()
                        .done(c.resolve)
                        .fail(c.reject)
                        .progress(c.notify);
                    else
                      c[l[0] + "With"](
                        this === e ? c.promise() : this,
                        r ? [a] : arguments
                      );
                  });
                });
                a = null;
              })
              .promise();
          },
          promise: function (a) {
            return null != a ? d.extend(a, e) : e;
          },
        },
        f = {};
      e.pipe = e.then;
      d.each(b, function (a, d) {
        var k = d[2],
          l = d[3];
        e[d[1]] = k.add;
        l &&
          k.add(
            function () {
              c = l;
            },
            b[a ^ 1][2].disable,
            b[2][2].lock
          );
        f[d[0]] = function () {
          f[d[0] + "With"](this === f ? e : this, arguments);
          return this;
        };
        f[d[0] + "With"] = k.fireWith;
      });
      e.promise(f);
      a && a.call(f, f);
      return f;
    },
    when: function (a) {
      var b = 0,
        c = N.call(arguments),
        e = c.length,
        f = 1 !== e || (a && d.isFunction(a.promise)) ? e : 0,
        g = 1 === f ? a : d.Deferred(),
        h = function (a, b, c) {
          return function (d) {
            b[a] = this;
            c[a] = 1 < arguments.length ? N.call(arguments) : d;
            c === k ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
          };
        },
        k,
        l,
        r;
      if (1 < e)
        for (k = Array(e), l = Array(e), r = Array(e); b < e; b++)
          c[b] && d.isFunction(c[b].promise)
            ? c[b]
                .promise()
                .done(h(b, r, c))
                .fail(g.reject)
                .progress(h(b, l, k))
            : --f;
      f || g.resolveWith(r, c);
      return g.promise();
    },
  });
  var oa;
  d.fn.ready = function (a) {
    d.ready.promise().done(a);
    return this;
  };
  d.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (a) {
      a ? d.readyWait++ : d.ready(!0);
    },
    ready: function (a) {
      if (!0 === a ? !--d.readyWait : !d.isReady) {
        if (!n.body) return setTimeout(d.ready);
        d.isReady = !0;
        (!0 !== a && 0 < --d.readyWait) ||
          (oa.resolveWith(n, [d]),
          d.fn.triggerHandler &&
            (d(n).triggerHandler("ready"), d(n).off("ready")));
      }
    },
  });
  d.ready.promise = function (a) {
    if (!oa)
      if (((oa = d.Deferred()), "complete" === n.readyState))
        setTimeout(d.ready);
      else if (n.addEventListener)
        n.addEventListener("DOMContentLoaded", D, !1),
          q.addEventListener("load", D, !1);
      else {
        n.attachEvent("onreadystatechange", D);
        q.attachEvent("onload", D);
        var b = !1;
        try {
          b = null == q.frameElement && n.documentElement;
        } catch (c) {}
        b &&
          b.doScroll &&
          (function f() {
            if (!d.isReady) {
              try {
                b.doScroll("left");
              } catch (a) {
                return setTimeout(f, 50);
              }
              $a();
              d.ready();
            }
          })();
      }
    return oa.promise(a);
  };
  for (var pc in d(p)) break;
  p.ownLast = "0" !== pc;
  p.inlineBlockNeedsLayout = !1;
  d(function () {
    var a, b, c;
    (b = n.getElementsByTagName("body")[0]) &&
      b.style &&
      ((a = n.createElement("div")),
      (c = n.createElement("div")),
      (c.style.cssText =
        "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
      b.appendChild(c).appendChild(a),
      "undefined" !== typeof a.style.zoom &&
        ((a.style.cssText =
          "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
        (p.inlineBlockNeedsLayout = a = 3 === a.offsetWidth)) &&
        (b.style.zoom = 1),
      b.removeChild(c));
  });
  (function () {
    var a = n.createElement("div");
    if (null == p.deleteExpando) {
      p.deleteExpando = !0;
      try {
        delete a.test;
      } catch (b) {
        p.deleteExpando = !1;
      }
    }
  })();
  d.acceptData = function (a) {
    var b = d.noData[(a.nodeName + " ").toLowerCase()],
      c = +a.nodeType || 1;
    return 1 !== c && 9 !== c
      ? !1
      : !b || (!0 !== b && a.getAttribute("classid") === b);
  };
  var bc = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    ac = /([A-Z])/g;
  d.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    },
    hasData: function (a) {
      a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando];
      return !!a && !Fa(a);
    },
    data: function (a, b, c) {
      return bb(a, b, c);
    },
    removeData: function (a, b) {
      return cb(a, b);
    },
    _data: function (a, b, c) {
      return bb(a, b, c, !0);
    },
    _removeData: function (a, b) {
      return cb(a, b, !0);
    },
  });
  d.fn.extend({
    data: function (a, b) {
      var c,
        e,
        f,
        g = this[0],
        h = g && g.attributes;
      if (void 0 === a) {
        if (
          this.length &&
          ((f = d.data(g)), 1 === g.nodeType && !d._data(g, "parsedAttrs"))
        ) {
          for (c = h.length; c--; )
            h[c] &&
              ((e = h[c].name),
              0 === e.indexOf("data-") &&
                ((e = d.camelCase(e.slice(5))), ab(g, e, f[e])));
          d._data(g, "parsedAttrs", !0);
        }
        return f;
      }
      return "object" === typeof a
        ? this.each(function () {
            d.data(this, a);
          })
        : 1 < arguments.length
        ? this.each(function () {
            d.data(this, a, b);
          })
        : g
        ? ab(g, a, d.data(g, a))
        : void 0;
    },
    removeData: function (a) {
      return this.each(function () {
        d.removeData(this, a);
      });
    },
  });
  d.extend({
    queue: function (a, b, c) {
      var e;
      if (a)
        return (
          (b = (b || "fx") + "queue"),
          (e = d._data(a, b)),
          c &&
            (!e || d.isArray(c)
              ? (e = d._data(a, b, d.makeArray(c)))
              : e.push(c)),
          e || []
        );
    },
    dequeue: function (a, b) {
      b = b || "fx";
      var c = d.queue(a, b),
        e = c.length,
        f = c.shift(),
        g = d._queueHooks(a, b),
        h = function () {
          d.dequeue(a, b);
        };
      "inprogress" === f && ((f = c.shift()), e--);
      f &&
        ("fx" === b && c.unshift("inprogress"), delete g.stop, f.call(a, h, g));
      !e && g && g.empty.fire();
    },
    _queueHooks: function (a, b) {
      var c = b + "queueHooks";
      return (
        d._data(a, c) ||
        d._data(a, c, {
          empty: d.Callbacks("once memory").add(function () {
            d._removeData(a, b + "queue");
            d._removeData(a, c);
          }),
        })
      );
    },
  });
  d.fn.extend({
    queue: function (a, b) {
      var c = 2;
      "string" !== typeof a && ((b = a), (a = "fx"), c--);
      return arguments.length < c
        ? d.queue(this[0], a)
        : void 0 === b
        ? this
        : this.each(function () {
            var c = d.queue(this, a, b);
            d._queueHooks(this, a);
            "fx" === a && "inprogress" !== c[0] && d.dequeue(this, a);
          });
    },
    dequeue: function (a) {
      return this.each(function () {
        d.dequeue(this, a);
      });
    },
    clearQueue: function (a) {
      return this.queue(a || "fx", []);
    },
    promise: function (a, b) {
      var c,
        e = 1,
        f = d.Deferred(),
        g = this,
        h = this.length,
        k = function () {
          --e || f.resolveWith(g, [g]);
        };
      "string" !== typeof a && ((b = a), (a = void 0));
      for (a = a || "fx"; h--; )
        (c = d._data(g[h], a + "queueHooks")) &&
          c.empty &&
          (e++, c.empty.add(k));
      k();
      return f.promise(b);
    },
  });
  var xa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    M = ["Top", "Right", "Bottom", "Left"],
    ia = function (a, b) {
      a = b || a;
      return "none" === d.css(a, "display") || !d.contains(a.ownerDocument, a);
    },
    aa = (d.access = function (a, b, c, e, f, g, h) {
      var k = 0,
        l = a.length,
        r = null == c;
      if ("object" === d.type(c))
        for (k in ((f = !0), c)) d.access(a, b, k, c[k], !0, g, h);
      else if (
        void 0 !== e &&
        ((f = !0),
        d.isFunction(e) || (h = !0),
        r &&
          (h
            ? (b.call(a, e), (b = null))
            : ((r = b),
              (b = function (a, b, c) {
                return r.call(d(a), c);
              }))),
        b)
      )
        for (; k < l; k++) b(a[k], c, h ? e : e.call(a[k], k, b(a[k], c)));
      return f ? a : r ? b.call(a) : l ? b(a[0], c) : g;
    }),
    Ga = /^(?:checkbox|radio)$/i;
  (function () {
    var a = n.createElement("input"),
      b = n.createElement("div"),
      c = n.createDocumentFragment();
    b.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    p.leadingWhitespace = 3 === b.firstChild.nodeType;
    p.tbody = !b.getElementsByTagName("tbody").length;
    p.htmlSerialize = !!b.getElementsByTagName("link").length;
    p.html5Clone =
      "<:nav></:nav>" !== n.createElement("nav").cloneNode(!0).outerHTML;
    a.type = "checkbox";
    a.checked = !0;
    c.appendChild(a);
    p.appendChecked = a.checked;
    b.innerHTML = "<textarea>x</textarea>";
    p.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
    c.appendChild(b);
    b.innerHTML = "<input type='radio' checked='checked' name='t'/>";
    p.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked;
    p.noCloneEvent = !0;
    b.attachEvent &&
      (b.attachEvent("onclick", function () {
        p.noCloneEvent = !1;
      }),
      b.cloneNode(!0).click());
    if (null == p.deleteExpando) {
      p.deleteExpando = !0;
      try {
        delete b.test;
      } catch (d) {
        p.deleteExpando = !1;
      }
    }
  })();
  (function () {
    var a,
      b,
      c = n.createElement("div");
    for (a in { submit: !0, change: !0, focusin: !0 })
      (b = "on" + a),
        (p[a + "Bubbles"] = b in q) ||
          (c.setAttribute(b, "t"),
          (p[a + "Bubbles"] = !1 === c.attributes[b].expando));
  })();
  var Pa = /^(?:input|select|textarea)$/i,
    qc = /^key/,
    rc = /^(?:mouse|pointer|contextmenu)|click/,
    Gb = /^(?:focusinfocus|focusoutblur)$/,
    Hb = /^([^.]*)(?:\.(.+)|)$/;
  d.event = {
    global: {},
    add: function (a, b, c, e, f) {
      var g, h, k, l, r, p, m, n, q;
      if ((k = d._data(a))) {
        c.handler && ((l = c), (c = l.handler), (f = l.selector));
        c.guid || (c.guid = d.guid++);
        (h = k.events) || (h = k.events = {});
        (r = k.handle) ||
          ((r = k.handle =
            function (a) {
              return "undefined" === typeof d ||
                (a && d.event.triggered === a.type)
                ? void 0
                : d.event.dispatch.apply(r.elem, arguments);
            }),
          (r.elem = a));
        b = (b || "").match(K) || [""];
        for (k = b.length; k--; )
          (g = Hb.exec(b[k]) || []),
            (n = p = g[1]),
            (q = (g[2] || "").split(".").sort()),
            n &&
              ((g = d.event.special[n] || {}),
              (n = (f ? g.delegateType : g.bindType) || n),
              (g = d.event.special[n] || {}),
              (p = d.extend(
                {
                  type: n,
                  origType: p,
                  data: e,
                  handler: c,
                  guid: c.guid,
                  selector: f,
                  needsContext: f && d.expr.match.needsContext.test(f),
                  namespace: q.join("."),
                },
                l
              )),
              (m = h[n]) ||
                ((m = h[n] = []),
                (m.delegateCount = 0),
                (g.setup && !1 !== g.setup.call(a, e, q, r)) ||
                  (a.addEventListener
                    ? a.addEventListener(n, r, !1)
                    : a.attachEvent && a.attachEvent("on" + n, r))),
              g.add &&
                (g.add.call(a, p), p.handler.guid || (p.handler.guid = c.guid)),
              f ? m.splice(m.delegateCount++, 0, p) : m.push(p),
              (d.event.global[n] = !0));
        a = null;
      }
    },
    remove: function (a, b, c, e, f) {
      var g,
        h,
        k,
        l,
        r,
        n,
        m,
        p,
        q,
        w,
        B,
        F = d.hasData(a) && d._data(a);
      if (F && (n = F.events)) {
        b = (b || "").match(K) || [""];
        for (r = b.length; r--; )
          if (
            ((k = Hb.exec(b[r]) || []),
            (q = B = k[1]),
            (w = (k[2] || "").split(".").sort()),
            q)
          ) {
            m = d.event.special[q] || {};
            q = (e ? m.delegateType : m.bindType) || q;
            p = n[q] || [];
            k =
              k[2] &&
              new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)");
            for (l = g = p.length; g--; )
              (h = p[g]),
                (!f && B !== h.origType) ||
                  (c && c.guid !== h.guid) ||
                  (k && !k.test(h.namespace)) ||
                  (e && e !== h.selector && ("**" !== e || !h.selector)) ||
                  (p.splice(g, 1),
                  h.selector && p.delegateCount--,
                  m.remove && m.remove.call(a, h));
            l &&
              !p.length &&
              ((m.teardown && !1 !== m.teardown.call(a, w, F.handle)) ||
                d.removeEvent(a, q, F.handle),
              delete n[q]);
          } else for (q in n) d.event.remove(a, q + b[r], c, e, !0);
        d.isEmptyObject(n) && (delete F.handle, d._removeData(a, "events"));
      }
    },
    trigger: function (a, b, c, e) {
      var f,
        g,
        h,
        k,
        l,
        r,
        p = [c || n],
        m = S.call(a, "type") ? a.type : a;
      l = S.call(a, "namespace") ? a.namespace.split(".") : [];
      h = f = c = c || n;
      if (
        3 !== c.nodeType &&
        8 !== c.nodeType &&
        !Gb.test(m + d.event.triggered) &&
        (0 <= m.indexOf(".") && ((l = m.split(".")), (m = l.shift()), l.sort()),
        (g = 0 > m.indexOf(":") && "on" + m),
        (a = a[d.expando] ? a : new d.Event(m, "object" === typeof a && a)),
        (a.isTrigger = e ? 2 : 3),
        (a.namespace = l.join(".")),
        (a.namespace_re = a.namespace
          ? new RegExp("(^|\\.)" + l.join("\\.(?:.*\\.|)") + "(\\.|$)")
          : null),
        (a.result = void 0),
        a.target || (a.target = c),
        (b = null == b ? [a] : d.makeArray(b, [a])),
        (l = d.event.special[m] || {}),
        e || !l.trigger || !1 !== l.trigger.apply(c, b))
      ) {
        if (!e && !l.noBubble && !d.isWindow(c)) {
          k = l.delegateType || m;
          Gb.test(k + m) || (h = h.parentNode);
          for (; h; h = h.parentNode) p.push(h), (f = h);
          f === (c.ownerDocument || n) &&
            p.push(f.defaultView || f.parentWindow || q);
        }
        for (r = 0; (h = p[r++]) && !a.isPropagationStopped(); )
          (a.type = 1 < r ? k : l.bindType || m),
            (f =
              (d._data(h, "events") || {})[a.type] && d._data(h, "handle")) &&
              f.apply(h, b),
            (f = g && h[g]) &&
              f.apply &&
              d.acceptData(h) &&
              ((a.result = f.apply(h, b)),
              !1 === a.result && a.preventDefault());
        a.type = m;
        if (
          !(
            e ||
            a.isDefaultPrevented() ||
            (l._default && !1 !== l._default.apply(p.pop(), b))
          ) &&
          d.acceptData(c) &&
          g &&
          c[m] &&
          !d.isWindow(c)
        ) {
          (f = c[g]) && (c[g] = null);
          d.event.triggered = m;
          try {
            c[m]();
          } catch (z) {}
          d.event.triggered = void 0;
          f && (c[g] = f);
        }
        return a.result;
      }
    },
    dispatch: function (a) {
      a = d.event.fix(a);
      var b,
        c,
        e,
        f,
        g = [],
        h = N.call(arguments);
      b = (d._data(this, "events") || {})[a.type] || [];
      var k = d.event.special[a.type] || {};
      h[0] = a;
      a.delegateTarget = this;
      if (!k.preDispatch || !1 !== k.preDispatch.call(this, a)) {
        g = d.event.handlers.call(this, a, b);
        for (b = 0; (e = g[b++]) && !a.isPropagationStopped(); )
          for (
            a.currentTarget = e.elem, f = 0;
            (c = e.handlers[f++]) && !a.isImmediatePropagationStopped();

          )
            if (!a.namespace_re || a.namespace_re.test(c.namespace))
              (a.handleObj = c),
                (a.data = c.data),
                (c = (
                  (d.event.special[c.origType] || {}).handle || c.handler
                ).apply(e.elem, h)),
                void 0 !== c &&
                  !1 === (a.result = c) &&
                  (a.preventDefault(), a.stopPropagation());
        k.postDispatch && k.postDispatch.call(this, a);
        return a.result;
      }
    },
    handlers: function (a, b) {
      var c,
        e,
        f,
        g,
        h = [],
        k = b.delegateCount,
        l = a.target;
      if (k && l.nodeType && (!a.button || "click" !== a.type))
        for (; l != this; l = l.parentNode || this)
          if (1 === l.nodeType && (!0 !== l.disabled || "click" !== a.type)) {
            f = [];
            for (g = 0; g < k; g++)
              (e = b[g]),
                (c = e.selector + " "),
                void 0 === f[c] &&
                  (f[c] = e.needsContext
                    ? 0 <= d(c, this).index(l)
                    : d.find(c, this, null, [l]).length),
                f[c] && f.push(e);
            f.length && h.push({ elem: l, handlers: f });
          }
      k < b.length && h.push({ elem: this, handlers: b.slice(k) });
      return h;
    },
    fix: function (a) {
      if (a[d.expando]) return a;
      var b, c, e;
      b = a.type;
      var f = a,
        g = this.fixHooks[b];
      g ||
        (this.fixHooks[b] = g =
          rc.test(b) ? this.mouseHooks : qc.test(b) ? this.keyHooks : {});
      e = g.props ? this.props.concat(g.props) : this.props;
      a = new d.Event(f);
      for (b = e.length; b--; ) (c = e[b]), (a[c] = f[c]);
      a.target || (a.target = f.srcElement || n);
      3 === a.target.nodeType && (a.target = a.target.parentNode);
      a.metaKey = !!a.metaKey;
      return g.filter ? g.filter(a, f) : a;
    },
    props:
      "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: ["char", "charCode", "key", "keyCode"],
      filter: function (a, b) {
        null == a.which &&
          (a.which = null != b.charCode ? b.charCode : b.keyCode);
        return a;
      },
    },
    mouseHooks: {
      props:
        "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
      filter: function (a, b) {
        var c,
          d,
          f = b.button,
          g = b.fromElement;
        null == a.pageX &&
          null != b.clientX &&
          ((c = a.target.ownerDocument || n),
          (d = c.documentElement),
          (c = c.body),
          (a.pageX =
            b.clientX +
            ((d && d.scrollLeft) || (c && c.scrollLeft) || 0) -
            ((d && d.clientLeft) || (c && c.clientLeft) || 0)),
          (a.pageY =
            b.clientY +
            ((d && d.scrollTop) || (c && c.scrollTop) || 0) -
            ((d && d.clientTop) || (c && c.clientTop) || 0)));
        !a.relatedTarget &&
          g &&
          (a.relatedTarget = g === a.target ? b.toElement : g);
        a.which ||
          void 0 === f ||
          (a.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0);
        return a;
      },
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== db() && this.focus)
            try {
              return this.focus(), !1;
            } catch (a) {}
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          if (this === db() && this.blur) return this.blur(), !1;
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          if (
            d.nodeName(this, "input") &&
            "checkbox" === this.type &&
            this.click
          )
            return this.click(), !1;
        },
        _default: function (a) {
          return d.nodeName(a.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result &&
            a.originalEvent &&
            (a.originalEvent.returnValue = a.result);
        },
      },
    },
    simulate: function (a, b, c, e) {
      a = d.extend(new d.Event(), c, {
        type: a,
        isSimulated: !0,
        originalEvent: {},
      });
      e ? d.event.trigger(a, null, b) : d.event.dispatch.call(b, a);
      a.isDefaultPrevented() && c.preventDefault();
    },
  };
  d.removeEvent = n.removeEventListener
    ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
      }
    : function (a, b, c) {
        b = "on" + b;
        a.detachEvent &&
          ("undefined" === typeof a[b] && (a[b] = null), a.detachEvent(b, c));
      };
  d.Event = function (a, b) {
    if (!(this instanceof d.Event)) return new d.Event(a, b);
    a && a.type
      ? ((this.originalEvent = a),
        (this.type = a.type),
        (this.isDefaultPrevented =
          a.defaultPrevented ||
          (void 0 === a.defaultPrevented && !1 === a.returnValue)
            ? V
            : W))
      : (this.type = a);
    b && d.extend(this, b);
    this.timeStamp = (a && a.timeStamp) || d.now();
    this[d.expando] = !0;
  };
  d.Event.prototype = {
    isDefaultPrevented: W,
    isPropagationStopped: W,
    isImmediatePropagationStopped: W,
    preventDefault: function () {
      var a = this.originalEvent;
      this.isDefaultPrevented = V;
      a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
    },
    stopPropagation: function () {
      var a = this.originalEvent;
      this.isPropagationStopped = V;
      a && (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
    },
    stopImmediatePropagation: function () {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = V;
      a && a.stopImmediatePropagation && a.stopImmediatePropagation();
      this.stopPropagation();
    },
  };
  d.each(
    {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout",
    },
    function (a, b) {
      d.event.special[a] = {
        delegateType: b,
        bindType: b,
        handle: function (a) {
          var e,
            f = a.relatedTarget,
            g = a.handleObj;
          if (!f || (f !== this && !d.contains(this, f)))
            (a.type = g.origType),
              (e = g.handler.apply(this, arguments)),
              (a.type = b);
          return e;
        },
      };
    }
  );
  p.submitBubbles ||
    (d.event.special.submit = {
      setup: function () {
        if (d.nodeName(this, "form")) return !1;
        d.event.add(this, "click._submit keypress._submit", function (a) {
          a = a.target;
          (a =
            d.nodeName(a, "input") || d.nodeName(a, "button")
              ? a.form
              : void 0) &&
            !d._data(a, "submitBubbles") &&
            (d.event.add(a, "submit._submit", function (a) {
              a._submit_bubble = !0;
            }),
            d._data(a, "submitBubbles", !0));
        });
      },
      postDispatch: function (a) {
        a._submit_bubble &&
          (delete a._submit_bubble,
          this.parentNode &&
            !a.isTrigger &&
            d.event.simulate("submit", this.parentNode, a, !0));
      },
      teardown: function () {
        if (d.nodeName(this, "form")) return !1;
        d.event.remove(this, "._submit");
      },
    });
  p.changeBubbles ||
    (d.event.special.change = {
      setup: function () {
        if (Pa.test(this.nodeName)) {
          if ("checkbox" === this.type || "radio" === this.type)
            d.event.add(this, "propertychange._change", function (a) {
              "checked" === a.originalEvent.propertyName &&
                (this._just_changed = !0);
            }),
              d.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1);
                d.event.simulate("change", this, a, !0);
              });
          return !1;
        }
        d.event.add(this, "beforeactivate._change", function (a) {
          a = a.target;
          Pa.test(a.nodeName) &&
            !d._data(a, "changeBubbles") &&
            (d.event.add(a, "change._change", function (a) {
              !this.parentNode ||
                a.isSimulated ||
                a.isTrigger ||
                d.event.simulate("change", this.parentNode, a, !0);
            }),
            d._data(a, "changeBubbles", !0));
        });
      },
      handle: function (a) {
        var b = a.target;
        if (
          this !== b ||
          a.isSimulated ||
          a.isTrigger ||
          ("radio" !== b.type && "checkbox" !== b.type)
        )
          return a.handleObj.handler.apply(this, arguments);
      },
      teardown: function () {
        d.event.remove(this, "._change");
        return !Pa.test(this.nodeName);
      },
    });
  p.focusinBubbles ||
    d.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
      var c = function (a) {
        d.event.simulate(b, a.target, d.event.fix(a), !0);
      };
      d.event.special[b] = {
        setup: function () {
          var e = this.ownerDocument || this,
            f = d._data(e, b);
          f || e.addEventListener(a, c, !0);
          d._data(e, b, (f || 0) + 1);
        },
        teardown: function () {
          var e = this.ownerDocument || this,
            f = d._data(e, b) - 1;
          f
            ? d._data(e, b, f)
            : (e.removeEventListener(a, c, !0), d._removeData(e, b));
        },
      };
    });
  d.fn.extend({
    on: function (a, b, c, e, f) {
      var g, h;
      if ("object" === typeof a) {
        "string" !== typeof b && ((c = c || b), (b = void 0));
        for (g in a) this.on(g, b, c, a[g], f);
        return this;
      }
      null == c && null == e
        ? ((e = b), (c = b = void 0))
        : null == e &&
          ("string" === typeof b
            ? ((e = c), (c = void 0))
            : ((e = c), (c = b), (b = void 0)));
      if (!1 === e) e = W;
      else if (!e) return this;
      1 === f &&
        ((h = e),
        (e = function (a) {
          d().off(a);
          return h.apply(this, arguments);
        }),
        (e.guid = h.guid || (h.guid = d.guid++)));
      return this.each(function () {
        d.event.add(this, a, e, c, b);
      });
    },
    one: function (a, b, c, d) {
      return this.on(a, b, c, d, 1);
    },
    off: function (a, b, c) {
      var e;
      if (a && a.preventDefault && a.handleObj)
        return (
          (e = a.handleObj),
          d(a.delegateTarget).off(
            e.namespace ? e.origType + "." + e.namespace : e.origType,
            e.selector,
            e.handler
          ),
          this
        );
      if ("object" === typeof a) {
        for (e in a) this.off(e, b, a[e]);
        return this;
      }
      if (!1 === b || "function" === typeof b) (c = b), (b = void 0);
      !1 === c && (c = W);
      return this.each(function () {
        d.event.remove(this, a, c, b);
      });
    },
    trigger: function (a, b) {
      return this.each(function () {
        d.event.trigger(a, b, this);
      });
    },
    triggerHandler: function (a, b) {
      var c = this[0];
      if (c) return d.event.trigger(a, b, c, !0);
    },
  });
  var fb =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    sc = / jQuery\d+="(?:null|\d+)"/g,
    Ib = new RegExp("<(?:" + fb + ")[\\s/>]", "i"),
    Qa = /^\s+/,
    Jb =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Kb = /<([\w:]+)/,
    Lb = /<tbody/i,
    tc = /<|&#?\w+;/,
    uc = /<(?:script|style|link)/i,
    vc = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Mb = /^$|\/(?:java|ecma)script/i,
    dc = /^true\/(.*)/,
    wc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    H = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: p.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    },
    Ra = eb(n).appendChild(n.createElement("div"));
  H.optgroup = H.option;
  H.tbody = H.tfoot = H.colgroup = H.caption = H.thead;
  H.th = H.td;
  d.extend({
    clone: function (a, b, c) {
      var e,
        f,
        g,
        h,
        k,
        l = d.contains(a.ownerDocument, a);
      p.html5Clone || d.isXMLDoc(a) || !Ib.test("<" + a.nodeName + ">")
        ? (g = a.cloneNode(!0))
        : ((Ra.innerHTML = a.outerHTML), Ra.removeChild((g = Ra.firstChild)));
      if (
        !(
          (p.noCloneEvent && p.noCloneChecked) ||
          (1 !== a.nodeType && 11 !== a.nodeType) ||
          d.isXMLDoc(a)
        )
      )
        for (e = w(g), k = w(a), h = 0; null != (f = k[h]); ++h)
          if (e[h]) {
            var r = e[h],
              n = void 0,
              m = void 0,
              q = void 0;
            if (1 === r.nodeType) {
              n = r.nodeName.toLowerCase();
              if (!p.noCloneEvent && r[d.expando]) {
                q = d._data(r);
                for (m in q.events) d.removeEvent(r, m, q.handle);
                r.removeAttribute(d.expando);
              }
              if ("script" === n && r.text !== f.text)
                (hb(r).text = f.text), ib(r);
              else if ("object" === n)
                r.parentNode && (r.outerHTML = f.outerHTML),
                  p.html5Clone &&
                    f.innerHTML &&
                    !d.trim(r.innerHTML) &&
                    (r.innerHTML = f.innerHTML);
              else if ("input" === n && Ga.test(f.type))
                (r.defaultChecked = r.checked = f.checked),
                  r.value !== f.value && (r.value = f.value);
              else if ("option" === n)
                r.defaultSelected = r.selected = f.defaultSelected;
              else if ("input" === n || "textarea" === n)
                r.defaultValue = f.defaultValue;
            }
          }
      if (b)
        if (c)
          for (k = k || w(a), e = e || w(g), h = 0; null != (f = k[h]); h++)
            jb(f, e[h]);
        else jb(a, g);
      e = w(g, "script");
      0 < e.length && Ha(e, !l && w(a, "script"));
      return g;
    },
    buildFragment: function (a, b, c, e) {
      for (
        var f, g, h, k, l, r, n = a.length, m = eb(b), q = [], y = 0;
        y < n;
        y++
      )
        if ((g = a[y]) || 0 === g)
          if ("object" === d.type(g)) d.merge(q, g.nodeType ? [g] : g);
          else if (tc.test(g)) {
            h = h || m.appendChild(b.createElement("div"));
            k = (Kb.exec(g) || ["", ""])[1].toLowerCase();
            r = H[k] || H._default;
            h.innerHTML = r[1] + g.replace(Jb, "<$1></$2>") + r[2];
            for (f = r[0]; f--; ) h = h.lastChild;
            !p.leadingWhitespace &&
              Qa.test(g) &&
              q.push(b.createTextNode(Qa.exec(g)[0]));
            if (!p.tbody)
              for (
                f =
                  (g =
                    "table" !== k || Lb.test(g)
                      ? "<table>" !== r[1] || Lb.test(g)
                        ? 0
                        : h
                      : h.firstChild) && g.childNodes.length;
                f--;

              )
                d.nodeName((l = g.childNodes[f]), "tbody") &&
                  !l.childNodes.length &&
                  g.removeChild(l);
            d.merge(q, h.childNodes);
            for (h.textContent = ""; h.firstChild; )
              h.removeChild(h.firstChild);
            h = m.lastChild;
          } else q.push(b.createTextNode(g));
      h && m.removeChild(h);
      p.appendChecked || d.grep(w(q, "input"), cc);
      for (y = 0; (g = q[y++]); )
        if (!e || -1 === d.inArray(g, e))
          if (
            ((a = d.contains(g.ownerDocument, g)),
            (h = w(m.appendChild(g), "script")),
            a && Ha(h),
            c)
          )
            for (f = 0; (g = h[f++]); ) Mb.test(g.type || "") && c.push(g);
      return m;
    },
    cleanData: function (a, b) {
      for (
        var c,
          e,
          f,
          g,
          h = 0,
          k = d.expando,
          l = d.cache,
          r = p.deleteExpando,
          n = d.event.special;
        null != (c = a[h]);
        h++
      )
        if (b || d.acceptData(c))
          if ((g = (f = c[k]) && l[f])) {
            if (g.events)
              for (e in g.events)
                n[e] ? d.event.remove(c, e) : d.removeEvent(c, e, g.handle);
            l[f] &&
              (delete l[f],
              r
                ? delete c[k]
                : "undefined" !== typeof c.removeAttribute
                ? c.removeAttribute(k)
                : (c[k] = null),
              R.push(f));
          }
    },
  });
  d.fn.extend({
    text: function (a) {
      return aa(
        this,
        function (a) {
          return void 0 === a
            ? d.text(this)
            : this.empty().append(
                ((this[0] && this[0].ownerDocument) || n).createTextNode(a)
              );
        },
        null,
        a,
        arguments.length
      );
    },
    append: function () {
      return this.domManip(arguments, function (a) {
        (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) ||
          gb(this, a).appendChild(a);
      });
    },
    prepend: function () {
      return this.domManip(arguments, function (a) {
        if (
          1 === this.nodeType ||
          11 === this.nodeType ||
          9 === this.nodeType
        ) {
          var b = gb(this, a);
          b.insertBefore(a, b.firstChild);
        }
      });
    },
    before: function () {
      return this.domManip(arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    },
    after: function () {
      return this.domManip(arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    },
    remove: function (a, b) {
      for (
        var c, e = a ? d.filter(a, this) : this, f = 0;
        null != (c = e[f]);
        f++
      )
        b || 1 !== c.nodeType || d.cleanData(w(c)),
          c.parentNode &&
            (b && d.contains(c.ownerDocument, c) && Ha(w(c, "script")),
            c.parentNode.removeChild(c));
      return this;
    },
    empty: function () {
      for (var a, b = 0; null != (a = this[b]); b++) {
        for (1 === a.nodeType && d.cleanData(w(a, !1)); a.firstChild; )
          a.removeChild(a.firstChild);
        a.options && d.nodeName(a, "select") && (a.options.length = 0);
      }
      return this;
    },
    clone: function (a, b) {
      a = null == a ? !1 : a;
      b = null == b ? a : b;
      return this.map(function () {
        return d.clone(this, a, b);
      });
    },
    html: function (a) {
      return aa(
        this,
        function (a) {
          var c = this[0] || {},
            e = 0,
            f = this.length;
          if (void 0 === a)
            return 1 === c.nodeType ? c.innerHTML.replace(sc, "") : void 0;
          if (
            !(
              "string" !== typeof a ||
              uc.test(a) ||
              (!p.htmlSerialize && Ib.test(a)) ||
              (!p.leadingWhitespace && Qa.test(a)) ||
              H[(Kb.exec(a) || ["", ""])[1].toLowerCase()]
            )
          ) {
            a = a.replace(Jb, "<$1></$2>");
            try {
              for (; e < f; e++)
                (c = this[e] || {}),
                  1 === c.nodeType &&
                    (d.cleanData(w(c, !1)), (c.innerHTML = a));
              c = 0;
            } catch (g) {}
          }
          c && this.empty().append(a);
        },
        null,
        a,
        arguments.length
      );
    },
    replaceWith: function () {
      var a = arguments[0];
      this.domManip(arguments, function (b) {
        a = this.parentNode;
        d.cleanData(w(this));
        a && a.replaceChild(b, this);
      });
      return a && (a.length || a.nodeType) ? this : this.remove();
    },
    detach: function (a) {
      return this.remove(a, !0);
    },
    domManip: function (a, b) {
      a = Ab.apply([], a);
      var c,
        e,
        f,
        g,
        h = 0,
        k = this.length,
        l = this,
        r = k - 1,
        n = a[0],
        m = d.isFunction(n);
      if (m || (1 < k && "string" === typeof n && !p.checkClone && vc.test(n)))
        return this.each(function (c) {
          var d = l.eq(c);
          m && (a[0] = n.call(this, c, d.html()));
          d.domManip(a, b);
        });
      if (
        k &&
        ((g = d.buildFragment(a, this[0].ownerDocument, !1, this)),
        (c = g.firstChild),
        1 === g.childNodes.length && (g = c),
        c)
      ) {
        f = d.map(w(g, "script"), hb);
        for (e = f.length; h < k; h++)
          (c = g),
            h !== r &&
              ((c = d.clone(c, !0, !0)), e && d.merge(f, w(c, "script"))),
            b.call(this[h], c, h);
        if (e)
          for (
            g = f[f.length - 1].ownerDocument, d.map(f, ib), h = 0;
            h < e;
            h++
          )
            (c = f[h]),
              Mb.test(c.type || "") &&
                !d._data(c, "globalEval") &&
                d.contains(g, c) &&
                (c.src
                  ? d._evalUrl && d._evalUrl(c.src)
                  : d.globalEval(
                      (c.text || c.textContent || c.innerHTML || "").replace(
                        wc,
                        ""
                      )
                    ));
        g = c = null;
      }
      return this;
    },
  });
  d.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith",
    },
    function (a, b) {
      d.fn[a] = function (a) {
        for (var e = 0, f = [], g = d(a), h = g.length - 1; e <= h; e++)
          (a = e === h ? this : this.clone(!0)),
            d(g[e])[b](a),
            La.apply(f, a.get());
        return this.pushStack(f);
      };
    }
  );
  var ha,
    lb = {};
  (function () {
    var a;
    p.shrinkWrapBlocks = function () {
      if (null != a) return a;
      a = !1;
      var b, c, d;
      if ((c = n.getElementsByTagName("body")[0]) && c.style)
        return (
          (b = n.createElement("div")),
          (d = n.createElement("div")),
          (d.style.cssText =
            "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
          c.appendChild(d).appendChild(b),
          "undefined" !== typeof b.style.zoom &&
            ((b.style.cssText =
              "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
            (b.appendChild(n.createElement("div")).style.width = "5px"),
            (a = 3 !== b.offsetWidth)),
          c.removeChild(d),
          a
        );
    };
  })();
  var Nb = /^margin/,
    qa = new RegExp("^(" + xa + ")(?!px)[a-z%]+$", "i"),
    X,
    F,
    xc = /^(top|right|bottom|left)$/;
  q.getComputedStyle
    ? ((X = function (a) {
        return a.ownerDocument.defaultView.opener
          ? a.ownerDocument.defaultView.getComputedStyle(a, null)
          : q.getComputedStyle(a, null);
      }),
      (F = function (a, b, c) {
        var e,
          f,
          g = a.style;
        f = (c = c || X(a)) ? c.getPropertyValue(b) || c[b] : void 0;
        c &&
          ("" !== f || d.contains(a.ownerDocument, a) || (f = d.style(a, b)),
          qa.test(f) &&
            Nb.test(b) &&
            ((a = g.width),
            (b = g.minWidth),
            (e = g.maxWidth),
            (g.minWidth = g.maxWidth = g.width = f),
            (f = c.width),
            (g.width = a),
            (g.minWidth = b),
            (g.maxWidth = e)));
        return void 0 === f ? f : f + "";
      }))
    : n.documentElement.currentStyle &&
      ((X = function (a) {
        return a.currentStyle;
      }),
      (F = function (a, b, c) {
        var d,
          f,
          g,
          h = a.style;
        g = (c = c || X(a)) ? c[b] : void 0;
        null == g && h && h[b] && (g = h[b]);
        if (qa.test(g) && !xc.test(b)) {
          c = h.left;
          if ((f = (d = a.runtimeStyle) && d.left))
            d.left = a.currentStyle.left;
          h.left = "fontSize" === b ? "1em" : g;
          g = h.pixelLeft + "px";
          h.left = c;
          f && (d.left = f);
        }
        return void 0 === g ? g : g + "" || "auto";
      }));
  (function () {
    function a() {
      var a, b, c, d;
      if ((b = n.getElementsByTagName("body")[0]) && b.style) {
        a = n.createElement("div");
        c = n.createElement("div");
        c.style.cssText =
          "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        b.appendChild(c).appendChild(a);
        a.style.cssText =
          "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
        e = f = !1;
        h = !0;
        q.getComputedStyle &&
          ((e = "1%" !== (q.getComputedStyle(a, null) || {}).top),
          (f =
            "4px" === (q.getComputedStyle(a, null) || { width: "4px" }).width),
          (d = a.appendChild(n.createElement("div"))),
          (d.style.cssText = a.style.cssText =
            "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
          (d.style.marginRight = d.style.width = "0"),
          (a.style.width = "1px"),
          (h = !parseFloat((q.getComputedStyle(d, null) || {}).marginRight)),
          a.removeChild(d));
        a.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
        d = a.getElementsByTagName("td");
        d[0].style.cssText = "margin:0;border:0;padding:0;display:none";
        if ((g = 0 === d[0].offsetHeight))
          (d[0].style.display = ""),
            (d[1].style.display = "none"),
            (g = 0 === d[0].offsetHeight);
        b.removeChild(c);
      }
    }
    var b, c, e, f, g, h;
    b = n.createElement("div");
    b.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    if ((c = (c = b.getElementsByTagName("a")[0]) && c.style))
      (c.cssText = "float:left;opacity:.5"),
        (p.opacity = "0.5" === c.opacity),
        (p.cssFloat = !!c.cssFloat),
        (b.style.backgroundClip = "content-box"),
        (b.cloneNode(!0).style.backgroundClip = ""),
        (p.clearCloneStyle = "content-box" === b.style.backgroundClip),
        (p.boxSizing =
          "" === c.boxSizing ||
          "" === c.MozBoxSizing ||
          "" === c.WebkitBoxSizing),
        d.extend(p, {
          reliableHiddenOffsets: function () {
            null == g && a();
            return g;
          },
          boxSizingReliable: function () {
            null == f && a();
            return f;
          },
          pixelPosition: function () {
            null == e && a();
            return e;
          },
          reliableMarginRight: function () {
            null == h && a();
            return h;
          },
        });
  })();
  d.swap = function (a, b, c, d) {
    var f,
      g = {};
    for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
    c = c.apply(a, d || []);
    for (f in b) a.style[f] = g[f];
    return c;
  };
  var Sa = /alpha\([^)]*\)/i,
    yc = /opacity\s*=\s*([^)]*)/,
    zc = /^(none|table(?!-c[ea]).+)/,
    ec = new RegExp("^(" + xa + ")(.*)$", "i"),
    Ac = new RegExp("^([+-])=(" + xa + ")", "i"),
    Bc = { position: "absolute", visibility: "hidden", display: "block" },
    Ob = { letterSpacing: "0", fontWeight: "400" },
    ob = ["Webkit", "O", "Moz", "ms"];
  d.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = F(a, "opacity");
            return "" === c ? "1" : c;
          }
        },
      },
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: { float: p.cssFloat ? "cssFloat" : "styleFloat" },
    style: function (a, b, c, e) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var f,
          g,
          h,
          k = d.camelCase(b),
          l = a.style;
        b = d.cssProps[k] || (d.cssProps[k] = nb(l, k));
        h = d.cssHooks[b] || d.cssHooks[k];
        if (void 0 !== c) {
          if (
            ((g = typeof c),
            "string" === g &&
              (f = Ac.exec(c)) &&
              ((c = (f[1] + 1) * f[2] + parseFloat(d.css(a, b))),
              (g = "number")),
            null != c &&
              c === c &&
              ("number" !== g || d.cssNumber[k] || (c += "px"),
              p.clearCloneStyle ||
                "" !== c ||
                0 !== b.indexOf("background") ||
                (l[b] = "inherit"),
              !(h && "set" in h) || void 0 !== (c = h.set(a, c, e))))
          )
            try {
              l[b] = c;
            } catch (n) {}
        } else
          return h && "get" in h && void 0 !== (f = h.get(a, !1, e)) ? f : l[b];
      }
    },
    css: function (a, b, c, e) {
      var f, g;
      g = d.camelCase(b);
      b = d.cssProps[g] || (d.cssProps[g] = nb(a.style, g));
      (g = d.cssHooks[b] || d.cssHooks[g]) &&
        "get" in g &&
        (f = g.get(a, !0, c));
      void 0 === f && (f = F(a, b, e));
      "normal" === f && b in Ob && (f = Ob[b]);
      return "" === c || c
        ? ((a = parseFloat(f)), !0 === c || d.isNumeric(a) ? a || 0 : f)
        : f;
    },
  });
  d.each(["height", "width"], function (a, b) {
    d.cssHooks[b] = {
      get: function (a, e, f) {
        if (e)
          return zc.test(d.css(a, "display")) && 0 === a.offsetWidth
            ? d.swap(a, Bc, function () {
                return sb(a, b, f);
              })
            : sb(a, b, f);
      },
      set: function (a, e, f) {
        var g = f && X(a);
        return qb(
          a,
          e,
          f
            ? rb(
                a,
                b,
                f,
                p.boxSizing && "border-box" === d.css(a, "boxSizing", !1, g),
                g
              )
            : 0
        );
      },
    };
  });
  p.opacity ||
    (d.cssHooks.opacity = {
      get: function (a, b) {
        return yc.test(
          (b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || ""
        )
          ? 0.01 * parseFloat(RegExp.$1) + ""
          : b
          ? "1"
          : "";
      },
      set: function (a, b) {
        var c = a.style,
          e = a.currentStyle,
          f = d.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
          g = (e && e.filter) || c.filter || "";
        c.zoom = 1;
        if (
          (1 <= b || "" === b) &&
          "" === d.trim(g.replace(Sa, "")) &&
          c.removeAttribute &&
          (c.removeAttribute("filter"), "" === b || (e && !e.filter))
        )
          return;
        c.filter = Sa.test(g) ? g.replace(Sa, f) : g + " " + f;
      },
    });
  d.cssHooks.marginRight = mb(p.reliableMarginRight, function (a, b) {
    if (b) return d.swap(a, { display: "inline-block" }, F, [a, "marginRight"]);
  });
  d.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
    d.cssHooks[a + b] = {
      expand: function (c) {
        var d = 0,
          f = {};
        for (c = "string" === typeof c ? c.split(" ") : [c]; 4 > d; d++)
          f[a + M[d] + b] = c[d] || c[d - 2] || c[0];
        return f;
      },
    };
    Nb.test(a) || (d.cssHooks[a + b].set = qb);
  });
  d.fn.extend({
    css: function (a, b) {
      return aa(
        this,
        function (a, b, f) {
          var g,
            h = {},
            k = 0;
          if (d.isArray(b)) {
            f = X(a);
            for (g = b.length; k < g; k++) h[b[k]] = d.css(a, b[k], !1, f);
            return h;
          }
          return void 0 !== f ? d.style(a, b, f) : d.css(a, b);
        },
        a,
        b,
        1 < arguments.length
      );
    },
    show: function () {
      return pb(this, !0);
    },
    hide: function () {
      return pb(this);
    },
    toggle: function (a) {
      return "boolean" === typeof a
        ? a
          ? this.show()
          : this.hide()
        : this.each(function () {
            ia(this) ? d(this).show() : d(this).hide();
          });
    },
  });
  d.Tween = B;
  B.prototype = {
    constructor: B,
    init: function (a, b, c, e, f, g) {
      this.elem = a;
      this.prop = c;
      this.easing = f || "swing";
      this.options = b;
      this.start = this.now = this.cur();
      this.end = e;
      this.unit = g || (d.cssNumber[c] ? "" : "px");
    },
    cur: function () {
      var a = B.propHooks[this.prop];
      return a && a.get ? a.get(this) : B.propHooks._default.get(this);
    },
    run: function (a) {
      var b,
        c = B.propHooks[this.prop];
      this.pos = this.options.duration
        ? (b = d.easing[this.easing](
            a,
            this.options.duration * a,
            0,
            1,
            this.options.duration
          ))
        : (b = a);
      this.now = (this.end - this.start) * b + this.start;
      this.options.step && this.options.step.call(this.elem, this.now, this);
      c && c.set ? c.set(this) : B.propHooks._default.set(this);
      return this;
    },
  };
  B.prototype.init.prototype = B.prototype;
  B.propHooks = {
    _default: {
      get: function (a) {
        return null == a.elem[a.prop] ||
          (a.elem.style && null != a.elem.style[a.prop])
          ? (a = d.css(a.elem, a.prop, "")) && "auto" !== a
            ? a
            : 0
          : a.elem[a.prop];
      },
      set: function (a) {
        if (d.fx.step[a.prop]) d.fx.step[a.prop](a);
        else
          a.elem.style &&
          (null != a.elem.style[d.cssProps[a.prop]] || d.cssHooks[a.prop])
            ? d.style(a.elem, a.prop, a.now + a.unit)
            : (a.elem[a.prop] = a.now);
      },
    },
  };
  B.propHooks.scrollTop = B.propHooks.scrollLeft = {
    set: function (a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    },
  };
  d.easing = {
    linear: function (a) {
      return a;
    },
    swing: function (a) {
      return 0.5 - Math.cos(a * Math.PI) / 2;
    },
  };
  d.fx = B.prototype.init;
  d.fx.step = {};
  var Y,
    za,
    Cc = /^(?:toggle|show|hide)$/,
    Pb = new RegExp("^(?:([+-])=|)(" + xa + ")([a-z%]*)$", "i"),
    Dc = /queueHooks$/,
    ca = [
      function (a, b, c) {
        var e,
          f,
          g,
          h,
          k,
          l,
          n = this,
          q = {},
          m = a.style,
          z = a.nodeType && ia(a),
          y = d._data(a, "fxshow");
        c.queue ||
          ((h = d._queueHooks(a, "fx")),
          null == h.unqueued &&
            ((h.unqueued = 0),
            (k = h.empty.fire),
            (h.empty.fire = function () {
              h.unqueued || k();
            })),
          h.unqueued++,
          n.always(function () {
            n.always(function () {
              h.unqueued--;
              d.queue(a, "fx").length || h.empty.fire();
            });
          }));
        1 === a.nodeType &&
          ("height" in b || "width" in b) &&
          ((c.overflow = [m.overflow, m.overflowX, m.overflowY]),
          (l = d.css(a, "display")),
          (f = "none" === l ? d._data(a, "olddisplay") || pa(a.nodeName) : l),
          "inline" === f &&
            "none" === d.css(a, "float") &&
            (p.inlineBlockNeedsLayout && "inline" !== pa(a.nodeName)
              ? (m.zoom = 1)
              : (m.display = "inline-block")));
        c.overflow &&
          ((m.overflow = "hidden"),
          p.shrinkWrapBlocks() ||
            n.always(function () {
              m.overflow = c.overflow[0];
              m.overflowX = c.overflow[1];
              m.overflowY = c.overflow[2];
            }));
        for (e in b)
          if (((f = b[e]), Cc.exec(f))) {
            delete b[e];
            g = g || "toggle" === f;
            if (f === (z ? "hide" : "show"))
              if ("show" === f && y && void 0 !== y[e]) z = !0;
              else continue;
            q[e] = (y && y[e]) || d.style(a, e);
          } else l = void 0;
        if (d.isEmptyObject(q))
          "inline" === ("none" === l ? pa(a.nodeName) : l) && (m.display = l);
        else
          for (e in (y
            ? "hidden" in y && (z = y.hidden)
            : (y = d._data(a, "fxshow", {})),
          g && (y.hidden = !z),
          z
            ? d(a).show()
            : n.done(function () {
                d(a).hide();
              }),
          n.done(function () {
            var b;
            d._removeData(a, "fxshow");
            for (b in q) d.style(a, b, q[b]);
          }),
          q))
            (b = ub(z ? y[e] : 0, e, n)),
              e in y ||
                ((y[e] = b.start),
                z &&
                  ((b.end = b.start),
                  (b.start = "width" === e || "height" === e ? 1 : 0)));
      },
    ],
    ja = {
      "*": [
        function (a, b) {
          var c = this.createTween(a, b),
            e = c.cur(),
            f = Pb.exec(b),
            g = (f && f[3]) || (d.cssNumber[a] ? "" : "px"),
            h =
              (d.cssNumber[a] || ("px" !== g && +e)) &&
              Pb.exec(d.css(c.elem, a)),
            k = 1,
            l = 20;
          if (h && h[3] !== g) {
            g = g || h[3];
            f = f || [];
            h = +e || 1;
            do (k = k || ".5"), (h /= k), d.style(c.elem, a, h + g);
            while (k !== (k = c.cur() / e) && 1 !== k && --l);
          }
          f &&
            ((h = c.start = +h || +e || 0),
            (c.unit = g),
            (c.end = f[1] ? h + (f[1] + 1) * f[2] : +f[2]));
          return c;
        },
      ],
    };
  d.Animation = d.extend(vb, {
    tweener: function (a, b) {
      d.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.split(" "));
      for (var c, e = 0, f = a.length; e < f; e++)
        (c = a[e]), (ja[c] = ja[c] || []), ja[c].unshift(b);
    },
    prefilter: function (a, b) {
      b ? ca.unshift(a) : ca.push(a);
    },
  });
  d.speed = function (a, b, c) {
    var e =
      a && "object" === typeof a
        ? d.extend({}, a)
        : {
            complete: c || (!c && b) || (d.isFunction(a) && a),
            duration: a,
            easing: (c && b) || (b && !d.isFunction(b) && b),
          };
    e.duration = d.fx.off
      ? 0
      : "number" === typeof e.duration
      ? e.duration
      : e.duration in d.fx.speeds
      ? d.fx.speeds[e.duration]
      : d.fx.speeds._default;
    if (null == e.queue || !0 === e.queue) e.queue = "fx";
    e.old = e.complete;
    e.complete = function () {
      d.isFunction(e.old) && e.old.call(this);
      e.queue && d.dequeue(this, e.queue);
    };
    return e;
  };
  d.fn.extend({
    fadeTo: function (a, b, c, d) {
      return this.filter(ia)
        .css("opacity", 0)
        .show()
        .end()
        .animate({ opacity: b }, a, c, d);
    },
    animate: function (a, b, c, e) {
      var f = d.isEmptyObject(a),
        g = d.speed(b, c, e);
      b = function () {
        var b = vb(this, d.extend({}, a), g);
        (f || d._data(this, "finish")) && b.stop(!0);
      };
      b.finish = b;
      return f || !1 === g.queue ? this.each(b) : this.queue(g.queue, b);
    },
    stop: function (a, b, c) {
      var e = function (a) {
        var b = a.stop;
        delete a.stop;
        b(c);
      };
      "string" !== typeof a && ((c = b), (b = a), (a = void 0));
      b && !1 !== a && this.queue(a || "fx", []);
      return this.each(function () {
        var b = !0,
          g = null != a && a + "queueHooks",
          h = d.timers,
          k = d._data(this);
        if (g) k[g] && k[g].stop && e(k[g]);
        else for (g in k) k[g] && k[g].stop && Dc.test(g) && e(k[g]);
        for (g = h.length; g--; )
          h[g].elem !== this ||
            (null != a && h[g].queue !== a) ||
            (h[g].anim.stop(c), (b = !1), h.splice(g, 1));
        (!b && c) || d.dequeue(this, a);
      });
    },
    finish: function (a) {
      !1 !== a && (a = a || "fx");
      return this.each(function () {
        var b,
          c = d._data(this),
          e = c[a + "queue"];
        b = c[a + "queueHooks"];
        var f = d.timers,
          g = e ? e.length : 0;
        c.finish = !0;
        d.queue(this, a, []);
        b && b.stop && b.stop.call(this, !0);
        for (b = f.length; b--; )
          f[b].elem === this &&
            f[b].queue === a &&
            (f[b].anim.stop(!0), f.splice(b, 1));
        for (b = 0; b < g; b++) e[b] && e[b].finish && e[b].finish.call(this);
        delete c.finish;
      });
    },
  });
  d.each(["toggle", "show", "hide"], function (a, b) {
    var c = d.fn[b];
    d.fn[b] = function (a, d, g) {
      return null == a || "boolean" === typeof a
        ? c.apply(this, arguments)
        : this.animate(ra(b, !0), a, d, g);
    };
  });
  d.each(
    {
      slideDown: ra("show"),
      slideUp: ra("hide"),
      slideToggle: ra("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" },
    },
    function (a, b) {
      d.fn[a] = function (a, d, f) {
        return this.animate(b, a, d, f);
      };
    }
  );
  d.timers = [];
  d.fx.tick = function () {
    var a,
      b = d.timers,
      c = 0;
    for (Y = d.now(); c < b.length; c++)
      (a = b[c]), a() || b[c] !== a || b.splice(c--, 1);
    b.length || d.fx.stop();
    Y = void 0;
  };
  d.fx.timer = function (a) {
    d.timers.push(a);
    a() ? d.fx.start() : d.timers.pop();
  };
  d.fx.interval = 13;
  d.fx.start = function () {
    za || (za = setInterval(d.fx.tick, d.fx.interval));
  };
  d.fx.stop = function () {
    clearInterval(za);
    za = null;
  };
  d.fx.speeds = { slow: 600, fast: 200, _default: 400 };
  d.fn.delay = function (a, b) {
    a = d.fx ? d.fx.speeds[a] || a : a;
    return this.queue(b || "fx", function (b, d) {
      var f = setTimeout(b, a);
      d.stop = function () {
        clearTimeout(f);
      };
    });
  };
  (function () {
    var a, b, c, d, f;
    b = n.createElement("div");
    b.setAttribute("className", "t");
    b.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    d = b.getElementsByTagName("a")[0];
    c = n.createElement("select");
    f = c.appendChild(n.createElement("option"));
    a = b.getElementsByTagName("input")[0];
    d.style.cssText = "top:1px";
    p.getSetAttribute = "t" !== b.className;
    p.style = /top/.test(d.getAttribute("style"));
    p.hrefNormalized = "/a" === d.getAttribute("href");
    p.checkOn = !!a.value;
    p.optSelected = f.selected;
    p.enctype = !!n.createElement("form").enctype;
    c.disabled = !0;
    p.optDisabled = !f.disabled;
    a = n.createElement("input");
    a.setAttribute("value", "");
    p.input = "" === a.getAttribute("value");
    a.value = "t";
    a.setAttribute("type", "radio");
    p.radioValue = "t" === a.value;
  })();
  var Ec = /\r/g;
  d.fn.extend({
    val: function (a) {
      var b,
        c,
        e,
        f = this[0];
      if (arguments.length)
        return (
          (e = d.isFunction(a)),
          this.each(function (c) {
            1 === this.nodeType &&
              ((c = e ? a.call(this, c, d(this).val()) : a),
              null == c
                ? (c = "")
                : "number" === typeof c
                ? (c += "")
                : d.isArray(c) &&
                  (c = d.map(c, function (a) {
                    return null == a ? "" : a + "";
                  })),
              (b =
                d.valHooks[this.type] ||
                d.valHooks[this.nodeName.toLowerCase()]),
              (b && "set" in b && void 0 !== b.set(this, c, "value")) ||
                (this.value = c));
          })
        );
      if (f) {
        if (
          (b = d.valHooks[f.type] || d.valHooks[f.nodeName.toLowerCase()]) &&
          "get" in b &&
          void 0 !== (c = b.get(f, "value"))
        )
          return c;
        c = f.value;
        return "string" === typeof c ? c.replace(Ec, "") : null == c ? "" : c;
      }
    },
  });
  d.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = d.find.attr(a, "value");
          return null != b ? b : d.trim(d.text(a));
        },
      },
      select: {
        get: function (a) {
          for (
            var b,
              c = a.options,
              e = a.selectedIndex,
              f = (a = "select-one" === a.type || 0 > e) ? null : [],
              g = a ? e + 1 : c.length,
              h = 0 > e ? g : a ? e : 0;
            h < g;
            h++
          )
            if (
              ((b = c[h]),
              !(
                (!b.selected && h !== e) ||
                (p.optDisabled
                  ? b.disabled
                  : null !== b.getAttribute("disabled")) ||
                (b.parentNode.disabled && d.nodeName(b.parentNode, "optgroup"))
              ))
            ) {
              b = d(b).val();
              if (a) return b;
              f.push(b);
            }
          return f;
        },
        set: function (a, b) {
          for (var c, e, f = a.options, g = d.makeArray(b), h = f.length; h--; )
            if (((e = f[h]), 0 <= d.inArray(d.valHooks.option.get(e), g)))
              try {
                e.selected = c = !0;
              } catch (k) {
                e.scrollHeight;
              }
            else e.selected = !1;
          c || (a.selectedIndex = -1);
          return f;
        },
      },
    },
  });
  d.each(["radio", "checkbox"], function () {
    d.valHooks[this] = {
      set: function (a, b) {
        if (d.isArray(b)) return (a.checked = 0 <= d.inArray(d(a).val(), b));
      },
    };
    p.checkOn ||
      (d.valHooks[this].get = function (a) {
        return null === a.getAttribute("value") ? "on" : a.value;
      });
  });
  var O,
    Qb,
    P = d.expr.attrHandle,
    Ta = /^(?:checked|selected)$/i,
    ba = p.getSetAttribute,
    Aa = p.input;
  d.fn.extend({
    attr: function (a, b) {
      return aa(this, d.attr, a, b, 1 < arguments.length);
    },
    removeAttr: function (a) {
      return this.each(function () {
        d.removeAttr(this, a);
      });
    },
  });
  d.extend({
    attr: function (a, b, c) {
      var e,
        f,
        g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g) {
        if ("undefined" === typeof a.getAttribute) return d.prop(a, b, c);
        (1 === g && d.isXMLDoc(a)) ||
          ((b = b.toLowerCase()),
          (e = d.attrHooks[b] || (d.expr.match.bool.test(b) ? Qb : O)));
        if (void 0 !== c)
          if (null === c) d.removeAttr(a, b);
          else {
            if (e && "set" in e && void 0 !== (f = e.set(a, c, b))) return f;
            a.setAttribute(b, c + "");
            return c;
          }
        else {
          if (e && "get" in e && null !== (f = e.get(a, b))) return f;
          f = d.find.attr(a, b);
          return null == f ? void 0 : f;
        }
      }
    },
    removeAttr: function (a, b) {
      var c,
        e,
        f = 0,
        g = b && b.match(K);
      if (g && 1 === a.nodeType)
        for (; (c = g[f++]); )
          (e = d.propFix[c] || c),
            d.expr.match.bool.test(c)
              ? (Aa && ba) || !Ta.test(c)
                ? (a[e] = !1)
                : (a[d.camelCase("default-" + c)] = a[e] = !1)
              : d.attr(a, c, ""),
            a.removeAttribute(ba ? c : e);
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (!p.radioValue && "radio" === b && d.nodeName(a, "input")) {
            var c = a.value;
            a.setAttribute("type", b);
            c && (a.value = c);
            return b;
          }
        },
      },
    },
  });
  Qb = {
    set: function (a, b, c) {
      !1 === b
        ? d.removeAttr(a, c)
        : (Aa && ba) || !Ta.test(c)
        ? a.setAttribute((!ba && d.propFix[c]) || c, c)
        : (a[d.camelCase("default-" + c)] = a[c] = !0);
      return c;
    },
  };
  d.each(d.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = P[b] || d.find.attr;
    P[b] =
      (Aa && ba) || !Ta.test(b)
        ? function (a, b, d) {
            var h, k;
            d ||
              ((k = P[b]),
              (P[b] = h),
              (h = null != c(a, b, d) ? b.toLowerCase() : null),
              (P[b] = k));
            return h;
          }
        : function (a, b, c) {
            if (!c)
              return a[d.camelCase("default-" + b)] ? b.toLowerCase() : null;
          };
  });
  (Aa && ba) ||
    (d.attrHooks.value = {
      set: function (a, b, c) {
        if (d.nodeName(a, "input")) a.defaultValue = b;
        else return O && O.set(a, b, c);
      },
    });
  ba ||
    ((O = {
      set: function (a, b, c) {
        var d = a.getAttributeNode(c);
        d || a.setAttributeNode((d = a.ownerDocument.createAttribute(c)));
        d.value = b += "";
        if ("value" === c || b === a.getAttribute(c)) return b;
      },
    }),
    (P.id =
      P.name =
      P.coords =
        function (a, b, c) {
          var d;
          if (!c)
            return (d = a.getAttributeNode(b)) && "" !== d.value
              ? d.value
              : null;
        }),
    (d.valHooks.button = {
      get: function (a, b) {
        var c = a.getAttributeNode(b);
        if (c && c.specified) return c.value;
      },
      set: O.set,
    }),
    (d.attrHooks.contenteditable = {
      set: function (a, b, c) {
        O.set(a, "" === b ? !1 : b, c);
      },
    }),
    d.each(["width", "height"], function (a, b) {
      d.attrHooks[b] = {
        set: function (a, d) {
          if ("" === d) return a.setAttribute(b, "auto"), d;
        },
      };
    }));
  p.style ||
    (d.attrHooks.style = {
      get: function (a) {
        return a.style.cssText || void 0;
      },
      set: function (a, b) {
        return (a.style.cssText = b + "");
      },
    });
  var Fc = /^(?:input|select|textarea|button|object)$/i,
    Gc = /^(?:a|area)$/i;
  d.fn.extend({
    prop: function (a, b) {
      return aa(this, d.prop, a, b, 1 < arguments.length);
    },
    removeProp: function (a) {
      a = d.propFix[a] || a;
      return this.each(function () {
        try {
          (this[a] = void 0), delete this[a];
        } catch (b) {}
      });
    },
  });
  d.extend({
    propFix: { for: "htmlFor", class: "className" },
    prop: function (a, b, c) {
      var e, f, g;
      g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g) {
        if ((g = 1 !== g || !d.isXMLDoc(a)))
          (b = d.propFix[b] || b), (f = d.propHooks[b]);
        return void 0 !== c
          ? f && "set" in f && void 0 !== (e = f.set(a, c, b))
            ? e
            : (a[b] = c)
          : f && "get" in f && null !== (e = f.get(a, b))
          ? e
          : a[b];
      }
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var b = d.find.attr(a, "tabindex");
          return b
            ? parseInt(b, 10)
            : Fc.test(a.nodeName) || (Gc.test(a.nodeName) && a.href)
            ? 0
            : -1;
        },
      },
    },
  });
  p.hrefNormalized ||
    d.each(["href", "src"], function (a, b) {
      d.propHooks[b] = {
        get: function (a) {
          return a.getAttribute(b, 4);
        },
      };
    });
  p.optSelected ||
    (d.propHooks.selected = {
      get: function (a) {
        if ((a = a.parentNode))
          a.selectedIndex, a.parentNode && a.parentNode.selectedIndex;
        return null;
      },
    });
  d.each(
    "tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(
      " "
    ),
    function () {
      d.propFix[this.toLowerCase()] = this;
    }
  );
  p.enctype || (d.propFix.enctype = "encoding");
  var Ua = /[\t\r\n\f]/g;
  d.fn.extend({
    addClass: function (a) {
      var b,
        c,
        e,
        f,
        g,
        h = 0,
        k = this.length;
      b = "string" === typeof a && a;
      if (d.isFunction(a))
        return this.each(function (b) {
          d(this).addClass(a.call(this, b, this.className));
        });
      if (b)
        for (b = (a || "").match(K) || []; h < k; h++)
          if (
            ((c = this[h]),
            (e =
              1 === c.nodeType &&
              (c.className ? (" " + c.className + " ").replace(Ua, " ") : " ")))
          ) {
            for (g = 0; (f = b[g++]); )
              0 > e.indexOf(" " + f + " ") && (e += f + " ");
            e = d.trim(e);
            c.className !== e && (c.className = e);
          }
      return this;
    },
    removeClass: function (a) {
      var b,
        c,
        e,
        f,
        g,
        h = 0,
        k = this.length;
      b = 0 === arguments.length || ("string" === typeof a && a);
      if (d.isFunction(a))
        return this.each(function (b) {
          d(this).removeClass(a.call(this, b, this.className));
        });
      if (b)
        for (b = (a || "").match(K) || []; h < k; h++)
          if (
            ((c = this[h]),
            (e =
              1 === c.nodeType &&
              (c.className ? (" " + c.className + " ").replace(Ua, " ") : "")))
          ) {
            for (g = 0; (f = b[g++]); )
              for (; 0 <= e.indexOf(" " + f + " "); )
                e = e.replace(" " + f + " ", " ");
            e = a ? d.trim(e) : "";
            c.className !== e && (c.className = e);
          }
      return this;
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return "boolean" === typeof b && "string" === c
        ? b
          ? this.addClass(a)
          : this.removeClass(a)
        : d.isFunction(a)
        ? this.each(function (c) {
            d(this).toggleClass(a.call(this, c, this.className, b), b);
          })
        : this.each(function () {
            if ("string" === c)
              for (
                var b, f = 0, g = d(this), h = a.match(K) || [];
                (b = h[f++]);

              )
                g.hasClass(b) ? g.removeClass(b) : g.addClass(b);
            else if ("undefined" === c || "boolean" === c)
              this.className && d._data(this, "__className__", this.className),
                (this.className =
                  this.className || !1 === a
                    ? ""
                    : d._data(this, "__className__") || "");
          });
    },
    hasClass: function (a) {
      a = " " + a + " ";
      for (var b = 0, c = this.length; b < c; b++)
        if (
          1 === this[b].nodeType &&
          0 <= (" " + this[b].className + " ").replace(Ua, " ").indexOf(a)
        )
          return !0;
      return !1;
    },
  });
  d.each(
    "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
      " "
    ),
    function (a, b) {
      d.fn[b] = function (a, d) {
        return 0 < arguments.length ? this.on(b, null, a, d) : this.trigger(b);
      };
    }
  );
  d.fn.extend({
    hover: function (a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    },
    bind: function (a, b, c) {
      return this.on(a, null, b, c);
    },
    unbind: function (a, b) {
      return this.off(a, null, b);
    },
    delegate: function (a, b, c, d) {
      return this.on(b, a, c, d);
    },
    undelegate: function (a, b, c) {
      return 1 === arguments.length
        ? this.off(a, "**")
        : this.off(b, a || "**", c);
    },
  });
  var Va = d.now(),
    Wa = /\?/,
    Hc =
      /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  d.parseJSON = function (a) {
    if (q.JSON && q.JSON.parse) return q.JSON.parse(a + "");
    var b,
      c = null,
      e = d.trim(a + "");
    return e &&
      !d.trim(
        e.replace(Hc, function (a, d, e, k) {
          b && d && (c = 0);
          if (0 === c) return a;
          b = e || d;
          c += !k - !e;
          return "";
        })
      )
      ? Function("return " + e)()
      : d.error("Invalid JSON: " + a);
  };
  d.parseXML = function (a) {
    var b, c;
    if (!a || "string" !== typeof a) return null;
    try {
      q.DOMParser
        ? ((c = new DOMParser()), (b = c.parseFromString(a, "text/xml")))
        : ((b = new ActiveXObject("Microsoft.XMLDOM")),
          (b.async = "false"),
          b.loadXML(a));
    } catch (e) {
      b = void 0;
    }
    (b && b.documentElement && !b.getElementsByTagName("parsererror").length) ||
      d.error("Invalid XML: " + a);
    return b;
  };
  var U,
    Q,
    Ic = /#.*$/,
    Rb = /([?&])_=[^&]*/,
    Jc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Kc = /^(?:GET|HEAD)$/,
    Lc = /^\/\//,
    Sb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Tb = {},
    Ia = {},
    Ub = "*/".concat("*");
  try {
    Q = location.href;
  } catch (Sc) {
    (Q = n.createElement("a")), (Q.href = ""), (Q = Q.href);
  }
  U = Sb.exec(Q.toLowerCase()) || [];
  d.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Q,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
        U[1]
      ),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Ub,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
      },
      contents: { xml: /xml/, html: /html/, json: /json/ },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON",
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": d.parseJSON,
        "text xml": d.parseXML,
      },
      flatOptions: { url: !0, context: !0 },
    },
    ajaxSetup: function (a, b) {
      return b ? Ja(Ja(a, d.ajaxSettings), b) : Ja(d.ajaxSettings, a);
    },
    ajaxPrefilter: wb(Tb),
    ajaxTransport: wb(Ia),
    ajax: function (a, b) {
      function c(a, b, c, e) {
        var f, p, t, u;
        u = b;
        if (2 !== J) {
          J = 2;
          k && clearTimeout(k);
          n = void 0;
          h = e || "";
          s.readyState = 0 < a ? 4 : 0;
          e = (200 <= a && 300 > a) || 304 === a;
          if (c) {
            t = m;
            for (
              var C = s, G, H, A, v, D = t.contents, L = t.dataTypes;
              "*" === L[0];

            )
              L.shift(),
                void 0 === H &&
                  (H = t.mimeType || C.getResponseHeader("Content-Type"));
            if (H)
              for (v in D)
                if (D[v] && D[v].test(H)) {
                  L.unshift(v);
                  break;
                }
            if (L[0] in c) A = L[0];
            else {
              for (v in c) {
                if (!L[0] || t.converters[v + " " + L[0]]) {
                  A = v;
                  break;
                }
                G || (G = v);
              }
              A = A || G;
            }
            A ? (A !== L[0] && L.unshift(A), (t = c[A])) : (t = void 0);
          }
          a: {
            c = m;
            G = t;
            H = s;
            A = e;
            var x,
              E,
              I,
              C = {},
              D = c.dataTypes.slice();
            if (D[1])
              for (E in c.converters) C[E.toLowerCase()] = c.converters[E];
            for (v = D.shift(); v; )
              if (
                (c.responseFields[v] && (H[c.responseFields[v]] = G),
                !I && A && c.dataFilter && (G = c.dataFilter(G, c.dataType)),
                (I = v),
                (v = D.shift()))
              )
                if ("*" === v) v = I;
                else if ("*" !== I && I !== v) {
                  E = C[I + " " + v] || C["* " + v];
                  if (!E)
                    for (x in C)
                      if (
                        ((t = x.split(" ")),
                        t[1] === v && (E = C[I + " " + t[0]] || C["* " + t[0]]))
                      ) {
                        !0 === E
                          ? (E = C[x])
                          : !0 !== C[x] && ((v = t[0]), D.unshift(t[1]));
                        break;
                      }
                  if (!0 !== E)
                    if (E && c["throws"]) G = E(G);
                    else
                      try {
                        G = E(G);
                      } catch (K) {
                        t = {
                          state: "parsererror",
                          error: E ? K : "No conversion from " + I + " to " + v,
                        };
                        break a;
                      }
                }
            t = { state: "success", data: G };
          }
          if (e)
            m.ifModified &&
              ((u = s.getResponseHeader("Last-Modified")) &&
                (d.lastModified[g] = u),
              (u = s.getResponseHeader("etag")) && (d.etag[g] = u)),
              204 === a || "HEAD" === m.type
                ? (u = "nocontent")
                : 304 === a
                ? (u = "notmodified")
                : ((u = t.state), (f = t.data), (p = t.error), (e = !p));
          else if (((p = u), a || !u)) (u = "error"), 0 > a && (a = 0);
          s.status = a;
          s.statusText = (b || u) + "";
          e ? w.resolveWith(q, [f, u, s]) : w.rejectWith(q, [s, u, p]);
          s.statusCode(B);
          B = void 0;
          l && y.trigger(e ? "ajaxSuccess" : "ajaxError", [s, m, e ? f : p]);
          F.fireWith(q, [s, u]);
          l &&
            (y.trigger("ajaxComplete", [s, m]),
            --d.active || d.event.trigger("ajaxStop"));
        }
      }
      "object" === typeof a && ((b = a), (a = void 0));
      b = b || {};
      var e,
        f,
        g,
        h,
        k,
        l,
        n,
        p,
        m = d.ajaxSetup({}, b),
        q = m.context || m,
        y = m.context && (q.nodeType || q.jquery) ? d(q) : d.event,
        w = d.Deferred(),
        F = d.Callbacks("once memory"),
        B = m.statusCode || {},
        H = {},
        D = {},
        J = 0,
        u = "canceled",
        s = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === J) {
              if (!p)
                for (p = {}; (b = Jc.exec(h)); ) p[b[1].toLowerCase()] = b[2];
              b = p[a.toLowerCase()];
            }
            return null == b ? null : b;
          },
          getAllResponseHeaders: function () {
            return 2 === J ? h : null;
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            J || ((a = D[c] = D[c] || a), (H[a] = b));
            return this;
          },
          overrideMimeType: function (a) {
            J || (m.mimeType = a);
            return this;
          },
          statusCode: function (a) {
            var b;
            if (a)
              if (2 > J) for (b in a) B[b] = [B[b], a[b]];
              else s.always(a[s.status]);
            return this;
          },
          abort: function (a) {
            a = a || u;
            n && n.abort(a);
            c(0, a);
            return this;
          },
        };
      w.promise(s).complete = F.add;
      s.success = s.done;
      s.error = s.fail;
      m.url = ((a || m.url || Q) + "").replace(Ic, "").replace(Lc, U[1] + "//");
      m.type = b.method || b.type || m.method || m.type;
      m.dataTypes = d
        .trim(m.dataType || "*")
        .toLowerCase()
        .match(K) || [""];
      null == m.crossDomain &&
        ((e = Sb.exec(m.url.toLowerCase())),
        (m.crossDomain = !(
          !e ||
          (e[1] === U[1] &&
            e[2] === U[2] &&
            (e[3] || ("http:" === e[1] ? "80" : "443")) ===
              (U[3] || ("http:" === U[1] ? "80" : "443")))
        )));
      m.data &&
        m.processData &&
        "string" !== typeof m.data &&
        (m.data = d.param(m.data, m.traditional));
      xb(Tb, m, b, s);
      if (2 === J) return s;
      (l = d.event && m.global) &&
        0 === d.active++ &&
        d.event.trigger("ajaxStart");
      m.type = m.type.toUpperCase();
      m.hasContent = !Kc.test(m.type);
      g = m.url;
      m.hasContent ||
        (m.data &&
          ((g = m.url += (Wa.test(g) ? "&" : "?") + m.data), delete m.data),
        !1 === m.cache &&
          (m.url = Rb.test(g)
            ? g.replace(Rb, "$1_=" + Va++)
            : g + (Wa.test(g) ? "&" : "?") + "_=" + Va++));
      m.ifModified &&
        (d.lastModified[g] &&
          s.setRequestHeader("If-Modified-Since", d.lastModified[g]),
        d.etag[g] && s.setRequestHeader("If-None-Match", d.etag[g]));
      ((m.data && m.hasContent && !1 !== m.contentType) || b.contentType) &&
        s.setRequestHeader("Content-Type", m.contentType);
      s.setRequestHeader(
        "Accept",
        m.dataTypes[0] && m.accepts[m.dataTypes[0]]
          ? m.accepts[m.dataTypes[0]] +
              ("*" !== m.dataTypes[0] ? ", " + Ub + "; q=0.01" : "")
          : m.accepts["*"]
      );
      for (f in m.headers) s.setRequestHeader(f, m.headers[f]);
      if (m.beforeSend && (!1 === m.beforeSend.call(q, s, m) || 2 === J))
        return s.abort();
      u = "abort";
      for (f in { success: 1, error: 1, complete: 1 }) s[f](m[f]);
      if ((n = xb(Ia, m, b, s))) {
        s.readyState = 1;
        l && y.trigger("ajaxSend", [s, m]);
        m.async &&
          0 < m.timeout &&
          (k = setTimeout(function () {
            s.abort("timeout");
          }, m.timeout));
        try {
          (J = 1), n.send(H, c);
        } catch (M) {
          if (2 > J) c(-1, M);
          else throw M;
        }
      } else c(-1, "No Transport");
      return s;
    },
    getJSON: function (a, b, c) {
      return d.get(a, b, c, "json");
    },
    getScript: function (a, b) {
      return d.get(a, void 0, b, "script");
    },
  });
  d.each(["get", "post"], function (a, b) {
    d[b] = function (a, e, f, g) {
      d.isFunction(e) && ((g = g || f), (f = e), (e = void 0));
      return d.ajax({ url: a, type: b, dataType: g, data: e, success: f });
    };
  });
  d._evalUrl = function (a) {
    return d.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      throws: !0,
    });
  };
  d.fn.extend({
    wrapAll: function (a) {
      if (d.isFunction(a))
        return this.each(function (b) {
          d(this).wrapAll(a.call(this, b));
        });
      if (this[0]) {
        var b = d(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]);
        b.map(function () {
          for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; )
            a = a.firstChild;
          return a;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (a) {
      return d.isFunction(a)
        ? this.each(function (b) {
            d(this).wrapInner(a.call(this, b));
          })
        : this.each(function () {
            var b = d(this),
              c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a);
          });
    },
    wrap: function (a) {
      var b = d.isFunction(a);
      return this.each(function (c) {
        d(this).wrapAll(b ? a.call(this, c) : a);
      });
    },
    unwrap: function () {
      return this.parent()
        .each(function () {
          d.nodeName(this, "body") || d(this).replaceWith(this.childNodes);
        })
        .end();
    },
  });
  d.expr.filters.hidden = function (a) {
    return (
      (0 >= a.offsetWidth && 0 >= a.offsetHeight) ||
      (!p.reliableHiddenOffsets() &&
        "none" === ((a.style && a.style.display) || d.css(a, "display")))
    );
  };
  d.expr.filters.visible = function (a) {
    return !d.expr.filters.hidden(a);
  };
  var Mc = /%20/g,
    gc = /\[\]$/,
    Vb = /\r?\n/g,
    Nc = /^(?:submit|button|image|reset|file)$/i,
    Oc = /^(?:input|select|textarea|keygen)/i;
  d.param = function (a, b) {
    var c,
      e = [],
      f = function (a, b) {
        b = d.isFunction(b) ? b() : null == b ? "" : b;
        e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
      };
    void 0 === b && (b = d.ajaxSettings && d.ajaxSettings.traditional);
    if (d.isArray(a) || (a.jquery && !d.isPlainObject(a)))
      d.each(a, function () {
        f(this.name, this.value);
      });
    else for (c in a) Ka(c, a[c], b, f);
    return e.join("&").replace(Mc, "+");
  };
  d.fn.extend({
    serialize: function () {
      return d.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var a = d.prop(this, "elements");
        return a ? d.makeArray(a) : this;
      })
        .filter(function () {
          var a = this.type;
          return (
            this.name &&
            !d(this).is(":disabled") &&
            Oc.test(this.nodeName) &&
            !Nc.test(a) &&
            (this.checked || !Ga.test(a))
          );
        })
        .map(function (a, b) {
          var c = d(this).val();
          return null == c
            ? null
            : d.isArray(c)
            ? d.map(c, function (a) {
                return { name: b.name, value: a.replace(Vb, "\r\n") };
              })
            : { name: b.name, value: c.replace(Vb, "\r\n") };
        })
        .get();
    },
  });
  d.ajaxSettings.xhr =
    void 0 !== q.ActiveXObject
      ? function () {
          var a;
          if (
            !(a =
              !this.isLocal &&
              /^(get|post|head|put|delete|options)$/i.test(this.type) &&
              yb())
          )
            a: {
              try {
                a = new q.ActiveXObject("Microsoft.XMLHTTP");
                break a;
              } catch (b) {}
              a = void 0;
            }
          return a;
        }
      : yb;
  var Pc = 0,
    Ba = {},
    Ca = d.ajaxSettings.xhr();
  q.attachEvent &&
    q.attachEvent("onunload", function () {
      for (var a in Ba) Ba[a](void 0, !0);
    });
  p.cors = !!Ca && "withCredentials" in Ca;
  (Ca = p.ajax = !!Ca) &&
    d.ajaxTransport(function (a) {
      if (!a.crossDomain || p.cors) {
        var b;
        return {
          send: function (c, e) {
            var f,
              g = a.xhr(),
              h = ++Pc;
            g.open(a.type, a.url, a.async, a.username, a.password);
            if (a.xhrFields) for (f in a.xhrFields) g[f] = a.xhrFields[f];
            a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType);
            a.crossDomain ||
              c["X-Requested-With"] ||
              (c["X-Requested-With"] = "XMLHttpRequest");
            for (f in c) void 0 !== c[f] && g.setRequestHeader(f, c[f] + "");
            g.send((a.hasContent && a.data) || null);
            b = function (c, f) {
              var n, p, m;
              if (b && (f || 4 === g.readyState))
                if (
                  (delete Ba[h],
                  (b = void 0),
                  (g.onreadystatechange = d.noop),
                  f)
                )
                  4 !== g.readyState && g.abort();
                else {
                  m = {};
                  n = g.status;
                  "string" === typeof g.responseText &&
                    (m.text = g.responseText);
                  try {
                    p = g.statusText;
                  } catch (q) {
                    p = "";
                  }
                  n || !a.isLocal || a.crossDomain
                    ? 1223 === n && (n = 204)
                    : (n = m.text ? 200 : 404);
                }
              m && e(n, p, m, g.getAllResponseHeaders());
            };
            a.async
              ? 4 === g.readyState
                ? setTimeout(b)
                : (g.onreadystatechange = Ba[h] = b)
              : b();
          },
          abort: function () {
            b && b(void 0, !0);
          },
        };
      }
    });
  d.ajaxSetup({
    accepts: {
      script:
        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
    },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      "text script": function (a) {
        d.globalEval(a);
        return a;
      },
    },
  });
  d.ajaxPrefilter("script", function (a) {
    void 0 === a.cache && (a.cache = !1);
    a.crossDomain && ((a.type = "GET"), (a.global = !1));
  });
  d.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var b,
        c = n.head || d("head")[0] || n.documentElement;
      return {
        send: function (d, f) {
          b = n.createElement("script");
          b.async = !0;
          a.scriptCharset && (b.charset = a.scriptCharset);
          b.src = a.url;
          b.onload = b.onreadystatechange = function (a, c) {
            if (c || !b.readyState || /loaded|complete/.test(b.readyState))
              (b.onload = b.onreadystatechange = null),
                b.parentNode && b.parentNode.removeChild(b),
                (b = null),
                c || f(200, "success");
          };
          c.insertBefore(b, c.firstChild);
        },
        abort: function () {
          if (b) b.onload(void 0, !0);
        },
      };
    }
  });
  var Wb = [],
    Xa = /(=)\?(?=&|$)|\?\?/;
  d.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var a = Wb.pop() || d.expando + "_" + Va++;
      this[a] = !0;
      return a;
    },
  });
  d.ajaxPrefilter("json jsonp", function (a, b, c) {
    var e,
      f,
      g,
      h =
        !1 !== a.jsonp &&
        (Xa.test(a.url)
          ? "url"
          : "string" === typeof a.data &&
            !(a.contentType || "").indexOf(
              "application/x-www-form-urlencoded"
            ) &&
            Xa.test(a.data) &&
            "data");
    if (h || "jsonp" === a.dataTypes[0])
      return (
        (e = a.jsonpCallback =
          d.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback),
        h
          ? (a[h] = a[h].replace(Xa, "$1" + e))
          : !1 !== a.jsonp &&
            (a.url += (Wa.test(a.url) ? "&" : "?") + a.jsonp + "=" + e),
        (a.converters["script json"] = function () {
          g || d.error(e + " was not called");
          return g[0];
        }),
        (a.dataTypes[0] = "json"),
        (f = q[e]),
        (q[e] = function () {
          g = arguments;
        }),
        c.always(function () {
          q[e] = f;
          a[e] && ((a.jsonpCallback = b.jsonpCallback), Wb.push(e));
          g && d.isFunction(f) && f(g[0]);
          g = f = void 0;
        }),
        "script"
      );
  });
  d.parseHTML = function (a, b, c) {
    if (!a || "string" !== typeof a) return null;
    "boolean" === typeof b && ((c = b), (b = !1));
    b = b || n;
    var e = Fb.exec(a);
    c = !c && [];
    if (e) return [b.createElement(e[1])];
    e = d.buildFragment([a], b, c);
    c && c.length && d(c).remove();
    return d.merge([], e.childNodes);
  };
  var Xb = d.fn.load;
  d.fn.load = function (a, b, c) {
    if ("string" !== typeof a && Xb) return Xb.apply(this, arguments);
    var e,
      f,
      g,
      h = this,
      k = a.indexOf(" ");
    0 <= k && ((e = d.trim(a.slice(k, a.length))), (a = a.slice(0, k)));
    d.isFunction(b)
      ? ((c = b), (b = void 0))
      : b && "object" === typeof b && (g = "POST");
    0 < h.length &&
      d
        .ajax({ url: a, type: g, dataType: "html", data: b })
        .done(function (a) {
          f = arguments;
          h.html(e ? d("<div>").append(d.parseHTML(a)).find(e) : a);
        })
        .complete(
          c &&
            function (a, b) {
              h.each(c, f || [a.responseText, b, a]);
            }
        );
    return this;
  };
  d.each(
    "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
    function (a, b) {
      d.fn[b] = function (a) {
        return this.on(b, a);
      };
    }
  );
  d.expr.filters.animated = function (a) {
    return d.grep(d.timers, function (b) {
      return a === b.elem;
    }).length;
  };
  var Yb = q.document.documentElement;
  d.offset = {
    setOffset: function (a, b, c) {
      var e,
        f,
        g,
        h = d.css(a, "position"),
        k = d(a),
        l = {};
      "static" === h && (a.style.position = "relative");
      g = k.offset();
      f = d.css(a, "top");
      e = d.css(a, "left");
      ("absolute" === h || "fixed" === h) && -1 < d.inArray("auto", [f, e])
        ? ((e = k.position()), (f = e.top), (e = e.left))
        : ((f = parseFloat(f) || 0), (e = parseFloat(e) || 0));
      d.isFunction(b) && (b = b.call(a, c, g));
      null != b.top && (l.top = b.top - g.top + f);
      null != b.left && (l.left = b.left - g.left + e);
      "using" in b ? b.using.call(a, l) : k.css(l);
    },
  };
  d.fn.extend({
    offset: function (a) {
      if (arguments.length)
        return void 0 === a
          ? this
          : this.each(function (b) {
              d.offset.setOffset(this, a, b);
            });
      var b,
        c,
        e = { top: 0, left: 0 },
        f = (c = this[0]) && c.ownerDocument;
      if (f) {
        b = f.documentElement;
        if (!d.contains(b, c)) return e;
        "undefined" !== typeof c.getBoundingClientRect &&
          (e = c.getBoundingClientRect());
        c = zb(f);
        return {
          top: e.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
          left: e.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0),
        };
      }
    },
    position: function () {
      if (this[0]) {
        var a,
          b,
          c = { top: 0, left: 0 },
          e = this[0];
        "fixed" === d.css(e, "position")
          ? (b = e.getBoundingClientRect())
          : ((a = this.offsetParent()),
            (b = this.offset()),
            d.nodeName(a[0], "html") || (c = a.offset()),
            (c.top += d.css(a[0], "borderTopWidth", !0)),
            (c.left += d.css(a[0], "borderLeftWidth", !0)));
        return {
          top: b.top - c.top - d.css(e, "marginTop", !0),
          left: b.left - c.left - d.css(e, "marginLeft", !0),
        };
      }
    },
    offsetParent: function () {
      return this.map(function () {
        for (
          var a = this.offsetParent || Yb;
          a && !d.nodeName(a, "html") && "static" === d.css(a, "position");

        )
          a = a.offsetParent;
        return a || Yb;
      });
    },
  });
  d.each(
    { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
    function (a, b) {
      var c = /Y/.test(b);
      d.fn[a] = function (e) {
        return aa(
          this,
          function (a, e, h) {
            var k = zb(a);
            if (void 0 === h)
              return k ? (b in k ? k[b] : k.document.documentElement[e]) : a[e];
            k
              ? k.scrollTo(c ? d(k).scrollLeft() : h, c ? h : d(k).scrollTop())
              : (a[e] = h);
          },
          a,
          e,
          arguments.length,
          null
        );
      };
    }
  );
  d.each(["top", "left"], function (a, b) {
    d.cssHooks[b] = mb(p.pixelPosition, function (a, e) {
      if (e) return (e = F(a, b)), qa.test(e) ? d(a).position()[b] + "px" : e;
    });
  });
  d.each({ Height: "height", Width: "width" }, function (a, b) {
    d.each(
      { padding: "inner" + a, content: b, "": "outer" + a },
      function (c, e) {
        d.fn[e] = function (e, g) {
          var h = arguments.length && (c || "boolean" !== typeof e),
            k = c || (!0 === e || !0 === g ? "margin" : "border");
          return aa(
            this,
            function (b, c, e) {
              return d.isWindow(b)
                ? b.document.documentElement["client" + a]
                : 9 === b.nodeType
                ? ((c = b.documentElement),
                  Math.max(
                    b.body["scroll" + a],
                    c["scroll" + a],
                    b.body["offset" + a],
                    c["offset" + a],
                    c["client" + a]
                  ))
                : void 0 === e
                ? d.css(b, c, k)
                : d.style(b, c, e, k);
            },
            b,
            h ? e : void 0,
            h,
            null
          );
        };
      }
    );
  });
  d.fn.size = function () {
    return this.length;
  };
  d.fn.andSelf = d.fn.addBack;
  "function" === typeof define &&
    define.amd &&
    define("jquery", [], function () {
      return d;
    });
  var Qc = q.jQuery,
    Rc = q.$;
  d.noConflict = function (a) {
    q.$ === d && (q.$ = Rc);
    a && q.jQuery === d && (q.jQuery = Qc);
    return d;
  };
  "undefined" === typeof ga && (q.jQuery = q.$ = d);
  return d;
});
!(function (y, v) {
  "object" == typeof exports && "undefined" != typeof module
    ? v(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], v)
    : v((y.MMTF = y.MMTF || {}));
})(this, function (y) {
  function v(b) {
    function g(a) {
      for (var b = {}, c = 0; a > c; c++) {
        var d = f();
        b[d] = f();
      }
      return b;
    }
    function c(c) {
      var d = b.subarray(a, a + c);
      return (a += c), d;
    }
    function k(c) {
      var d = b.subarray(a, a + c);
      a += c;
      if (65535 < c) {
        c = [];
        for (var e = 0; e < d.length; e += 65535)
          c.push(String.fromCharCode.apply(null, d.subarray(e, e + 65535)));
        return c.join("");
      }
      return String.fromCharCode.apply(null, d);
    }
    function d(a) {
      for (var b = Array(a), c = 0; a > c; c++) b[c] = f();
      return b;
    }
    function f() {
      var f,
        h,
        l,
        m = b[a];
      if (0 === (128 & m)) return a++, m;
      if (128 === (240 & m)) return (h = 15 & m), a++, g(h);
      if (144 === (240 & m)) return (h = 15 & m), a++, d(h);
      if (160 === (224 & m)) return (h = 31 & m), a++, k(h);
      if (224 === (224 & m)) return (f = e.getInt8(a)), a++, f;
      switch (m) {
        case 192:
          return a++, null;
        case 194:
          return a++, !1;
        case 195:
          return a++, !0;
        case 196:
          return (h = e.getUint8(a + 1)), (a += 2), c(h);
        case 197:
          return (h = e.getUint16(a + 1)), (a += 3), c(h);
        case 198:
          return (h = e.getUint32(a + 1)), (a += 5), c(h);
        case 199:
          return (
            (h = e.getUint8(a + 1)),
            (l = e.getUint8(a + 2)),
            (a += 3),
            [l, c(h)]
          );
        case 200:
          return (
            (h = e.getUint16(a + 1)),
            (l = e.getUint8(a + 3)),
            (a += 4),
            [l, c(h)]
          );
        case 201:
          return (
            (h = e.getUint32(a + 1)),
            (l = e.getUint8(a + 5)),
            (a += 6),
            [l, c(h)]
          );
        case 202:
          return (f = e.getFloat32(a + 1)), (a += 5), f;
        case 203:
          return (f = e.getFloat64(a + 1)), (a += 9), f;
        case 204:
          return (f = b[a + 1]), (a += 2), f;
        case 205:
          return (f = e.getUint16(a + 1)), (a += 3), f;
        case 206:
          return (f = e.getUint32(a + 1)), (a += 5), f;
        case 207:
          return (a += 9), 0;
        case 208:
          return (f = e.getInt8(a + 1)), (a += 2), f;
        case 209:
          return (f = e.getInt16(a + 1)), (a += 3), f;
        case 210:
          return (f = e.getInt32(a + 1)), (a += 5), f;
        case 211:
          return (a += 9), 0;
        case 212:
          return (l = e.getUint8(a + 1)), (a += 2), [l, c(1)];
        case 213:
          return (l = e.getUint8(a + 1)), (a += 2), [l, c(2)];
        case 214:
          return (l = e.getUint8(a + 1)), (a += 2), [l, c(4)];
        case 215:
          return (l = e.getUint8(a + 1)), (a += 2), [l, c(8)];
        case 216:
          return (l = e.getUint8(a + 1)), (a += 2), [l, c(16)];
        case 217:
          return (h = e.getUint8(a + 1)), (a += 2), k(h);
        case 218:
          return (h = e.getUint16(a + 1)), (a += 3), k(h);
        case 219:
          return (h = e.getUint32(a + 1)), (a += 5), k(h);
        case 220:
          return (h = e.getUint16(a + 1)), (a += 3), d(h);
        case 221:
          return (h = e.getUint32(a + 1)), (a += 5), d(h);
        case 222:
          return (h = e.getUint16(a + 1)), (a += 3), g(h);
        case 223:
          return (h = e.getUint32(a + 1)), (a += 5), g(h);
      }
      throw Error("Unknown type 0x" + m.toString(16));
    }
    var a = 0,
      e = new DataView(b.buffer);
    return f();
  }
  function A(b) {
    return new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
  }
  function H(b) {
    return new Int8Array(b.buffer, b.byteOffset, b.byteLength);
  }
  function n(b, g) {
    var c, k, d;
    d = (b.byteOffset, b.byteLength);
    g || (g = new Int32Array(d / 4));
    k = c = 0;
    for (d /= 4; d > c; ++c, k += 4)
      g[c] =
        (b[k] << 24) ^ (b[k + 1] << 16) ^ (b[k + 2] << 8) ^ (b[k + 3] << 0);
    return g;
  }
  function w(b, g, c) {
    var k = b.length;
    g = 1 / g;
    c || (c = new Float32Array(k));
    for (var d = 0; k > d; ++d) c[d] = b[d] * g;
    return c;
  }
  function u(b, g) {
    var c, k;
    if (!g) {
      var d = 0;
      c = 0;
      for (k = b.length; k > c; c += 2) d += b[c + 1];
      g = new b.constructor(d);
    }
    c = d = 0;
    for (k = b.length; k > c; c += 2)
      for (var f = b[c], a = b[c + 1], e = 0; a > e; ++e) (g[d] = f), (d += 1);
    return g;
  }
  function B(b) {
    for (var g = 1, c = b.length; c > g; ++g) b[g] += b[g - 1];
    return b;
  }
  function z(b, g, c, k) {
    var d = b.length / 4 / 2 + g.length / 2;
    k || (k = new Float32Array(d));
    d = new Int32Array(k.buffer, k.byteOffset, k.byteLength / 4);
    b = n(b);
    var f = void 0,
      a,
      e,
      r;
    r = (g.byteOffset, g.byteLength);
    f || (f = new Int16Array(r / 2));
    e = a = 0;
    for (r /= 2; r > a; ++a, e += 2) f[a] = (g[e] << 8) ^ (g[e + 1] << 0);
    g = f;
    f = b.length / 2 + g.length;
    d || (d = new Int32Array(f));
    e = a = f = 0;
    for (r = b.length; r > e; e += 2) {
      var h = b[e + 1];
      d[f] = b[e];
      0 !== e && (d[f] += d[f - 1]);
      for (var f = f + 1, l = 0; h > l; ++l)
        (d[f] = d[f - 1] + g[a]), (f += 1), (a += 1);
    }
    return w(d, c, k);
  }
  function I(b, g, c) {
    var k = c
      ? new Int32Array(c.buffer, c.byteOffset, c.byteLength / 4)
      : void 0;
    b = u(n(b), k);
    return w(b, g, c);
  }
  function J(b, g) {
    function c(a) {
      return k ? -1 === k.indexOf(a) : !0;
    }
    g = g || {};
    var k = g.ignoreFields,
      d = (b.numBonds || 0, b.numAtoms || 0),
      f = b.groupTypeList.length / 4,
      a = {
        numGroups: f,
        numChains: b.chainIdList.length / 4,
        numModels: b.chainsPerModel.length,
      };
    "mmtfVersion mmtfProducer unitCell spaceGroup structureId title depositionDate releaseDate experimentalMethods resolution rFree rWork bioAssemblyList entityList groupList numBonds numAtoms groupsPerChain chainsPerModel"
      .split(" ")
      .forEach(function (c) {
        void 0 !== b[c] && (a[c] = b[c]);
      });
    b.bondAtomList && c("bondAtomList") && (a.bondAtomList = n(b.bondAtomList));
    b.bondOrderList &&
      c("bondOrderList") &&
      (a.bondOrderList = A(b.bondOrderList));
    a.xCoordList = z(b.xCoordBig, b.xCoordSmall, 1e3);
    a.yCoordList = z(b.yCoordBig, b.yCoordSmall, 1e3);
    a.zCoordList = z(b.zCoordBig, b.zCoordSmall, 1e3);
    b.bFactorBig &&
      b.bFactorSmall &&
      c("bFactorList") &&
      (a.bFactorList = z(b.bFactorBig, b.bFactorSmall, 100));
    b.atomIdList && c("atomIdList") && (a.atomIdList = B(u(n(b.atomIdList))));
    b.altLocList &&
      c("altLocList") &&
      (a.altLocList = u(n(b.altLocList), new Uint8Array(d)));
    b.occupancyList &&
      c("occupancyList") &&
      (a.occupancyList = I(b.occupancyList, 100));
    a.groupIdList = B(u(n(b.groupIdList)));
    a.groupTypeList = n(b.groupTypeList);
    b.secStructList &&
      c("secStructList") &&
      (a.secStructList = H(b.secStructList));
    b.insCodeList &&
      c("insCodeList") &&
      (a.insCodeList = u(n(b.insCodeList), new Uint8Array(f)));
    b.sequenceIndexList &&
      c("sequenceIndexList") &&
      (a.sequenceIndexList = B(u(n(b.sequenceIndexList))));
    a.chainIdList = A(b.chainIdList);
    return (
      b.chainNameList &&
        c("chainNameList") &&
        (a.chainNameList = A(b.chainNameList)),
      a
    );
  }
  function G(b) {
    return String.fromCharCode.apply(null, b).replace(/\0/g, "");
  }
  y.decode = function (b, g) {
    b instanceof ArrayBuffer && (b = new Uint8Array(b));
    var c;
    return (c = b instanceof Uint8Array ? v(b) : b), J(c, g);
  };
  y.traverse = function (b, g) {
    var c,
      k,
      d,
      f,
      a = g.onModel,
      e = g.onChain,
      r = g.onGroup,
      h = g.onAtom,
      l = g.onBond,
      m = 0,
      s = 0,
      t = 0,
      p = 0,
      n = b.chainNameList,
      u = b.secStructList,
      y = b.insCodeList,
      v = b.sequenceIndexList,
      z = b.bFactorList,
      A = b.altLocList,
      B = b.occupancyList,
      F = b.bondAtomList,
      w = b.bondOrderList;
    if (
      (b.chainsPerModel.forEach(function (g) {
        a && a({ chainCount: g, modelIndex: m });
        for (c = 0; g > c; ++c) {
          var w = b.groupsPerChain[s];
          if (e) {
            var q = G(b.chainIdList.subarray(4 * s, 4 * s + 4)),
              C = null;
            n && (C = G(n.subarray(4 * s, 4 * s + 4)));
            e({
              groupCount: w,
              chainIndex: s,
              modelIndex: m,
              chainId: q,
              chainName: C,
            });
          }
          for (k = 0; w > k; ++k) {
            q = b.groupList[b.groupTypeList[t]];
            C = q.atomNameList.length;
            if (r) {
              var x = null;
              u && (x = u[t]);
              var D = null;
              b.insCodeList && (D = String.fromCharCode(y[t]));
              var E = null;
              v && (E = v[t]);
              r({
                atomCount: C,
                groupIndex: t,
                chainIndex: s,
                modelIndex: m,
                groupId: b.groupIdList[t],
                groupType: b.groupTypeList[t],
                groupName: q.groupName,
                singleLetterCode: q.singleLetterCode,
                chemCompType: q.chemCompType,
                secStruct: x,
                insCode: D,
                sequenceIndex: E,
              });
            }
            if (l)
              for (
                x = q.bondAtomList, d = 0, f = q.bondOrderList.length;
                f > d;
                ++d
              )
                l({
                  atomIndex1: p + x[2 * d],
                  atomIndex2: p + x[2 * d + 1],
                  bondOrder: q.bondOrderList[d],
                });
            for (d = 0; C > d; ++d)
              h &&
                ((x = null),
                z && (x = z[p]),
                (D = null),
                A && (D = String.fromCharCode(A[p])),
                (E = null),
                B && (E = B[p]),
                h({
                  atomIndex: p,
                  groupIndex: t,
                  chainIndex: s,
                  modelIndex: m,
                  atomId: b.atomIdList[p],
                  element: q.elementList[d],
                  atomName: q.atomNameList[d],
                  atomCharge: q.atomChargeList[d],
                  xCoord: b.xCoordList[p],
                  yCoord: b.yCoordList[p],
                  zCoord: b.zCoordList[p],
                  bFactor: x,
                  altLoc: D,
                  occupancy: E,
                })),
                (p += 1);
            t += 1;
          }
          s += 1;
        }
        m += 1;
      }),
      l && F)
    )
      for (d = 0, f = F.length; f > d; d += 2)
        l({
          atomIndex1: F[d],
          atomIndex2: F[d + 1],
          bondOrder: w ? w[d / 2] : null,
        });
  };
});
(function (P) {
  "object" === typeof exports && "undefined" !== typeof module
    ? (module.exports = P())
    : "function" === typeof define && define.amd
    ? define([], P)
    : (("undefined" !== typeof window
        ? window
        : "undefined" !== typeof global
        ? global
        : "undefined" !== typeof self
        ? self
        : this
      ).pako = P());
})(function () {
  return (function p(u, c, F) {
    function x(g, m) {
      if (!c[g]) {
        if (!u[g]) {
          var h = "function" == typeof require && require;
          if (!m && h) return h(g, !0);
          if (f) return f(g, !0);
          h = Error("Cannot find module '" + g + "'");
          throw ((h.code = "MODULE_NOT_FOUND"), h);
        }
        h = c[g] = { exports: {} };
        u[g][0].call(
          h.exports,
          function (h) {
            var f = u[g][1][h];
            return x(f ? f : h);
          },
          h,
          h.exports,
          p,
          u,
          c,
          F
        );
      }
      return c[g].exports;
    }
    for (
      var f = "function" == typeof require && require, h = 0;
      h < F.length;
      h++
    )
      x(F[h]);
    return x;
  })(
    {
      1: [
        function (p, u, c) {
          p =
            "undefined" !== typeof Uint8Array &&
            "undefined" !== typeof Uint16Array &&
            "undefined" !== typeof Int32Array;
          c.assign = function (f) {
            for (var h = Array.prototype.slice.call(arguments, 1); h.length; ) {
              var g = h.shift();
              if (g) {
                if ("object" !== typeof g)
                  throw new TypeError(g + "must be non-object");
                for (var m in g) g.hasOwnProperty(m) && (f[m] = g[m]);
              }
            }
            return f;
          };
          c.shrinkBuf = function (f, h) {
            if (f.length === h) return f;
            if (f.subarray) return f.subarray(0, h);
            f.length = h;
            return f;
          };
          var F = {
              arraySet: function (f, h, g, m, c) {
                if (h.subarray && f.subarray) f.set(h.subarray(g, g + m), c);
                else for (var B = 0; B < m; B++) f[c + B] = h[g + B];
              },
              flattenChunks: function (f) {
                var h, g, m, c, B;
                h = m = 0;
                for (g = f.length; h < g; h++) m += f[h].length;
                B = new Uint8Array(m);
                h = m = 0;
                for (g = f.length; h < g; h++)
                  (c = f[h]), B.set(c, m), (m += c.length);
                return B;
              },
            },
            x = {
              arraySet: function (f, h, g, m, c) {
                for (var B = 0; B < m; B++) f[c + B] = h[g + B];
              },
              flattenChunks: function (f) {
                return [].concat.apply([], f);
              },
            };
          c.setTyped = function (f) {
            f
              ? ((c.Buf8 = Uint8Array),
                (c.Buf16 = Uint16Array),
                (c.Buf32 = Int32Array),
                c.assign(c, F))
              : ((c.Buf8 = Array),
                (c.Buf16 = Array),
                (c.Buf32 = Array),
                c.assign(c, x));
          };
          c.setTyped(p);
        },
        {},
      ],
      2: [
        function (p, u, c) {
          function F(g, m) {
            if (65537 > m && ((g.subarray && h) || (!g.subarray && f)))
              return String.fromCharCode.apply(null, x.shrinkBuf(g, m));
            for (var E = "", c = 0; c < m; c++) E += String.fromCharCode(g[c]);
            return E;
          }
          var x = p("./common"),
            f = !0,
            h = !0;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (g) {
            f = !1;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (m) {
            h = !1;
          }
          var y = new x.Buf8(256);
          for (p = 0; 256 > p; p++)
            y[p] =
              252 <= p
                ? 6
                : 248 <= p
                ? 5
                : 240 <= p
                ? 4
                : 224 <= p
                ? 3
                : 192 <= p
                ? 2
                : 1;
          y[254] = y[254] = 1;
          c.string2buf = function (h) {
            var g,
              f,
              m,
              t,
              C,
              c = h.length,
              b = 0;
            for (t = 0; t < c; t++)
              (f = h.charCodeAt(t)),
                55296 === (f & 64512) &&
                  t + 1 < c &&
                  ((m = h.charCodeAt(t + 1)),
                  56320 === (m & 64512) &&
                    ((f = 65536 + ((f - 55296) << 10) + (m - 56320)), t++)),
                (b += 128 > f ? 1 : 2048 > f ? 2 : 65536 > f ? 3 : 4);
            g = new x.Buf8(b);
            for (t = C = 0; C < b; t++)
              (f = h.charCodeAt(t)),
                55296 === (f & 64512) &&
                  t + 1 < c &&
                  ((m = h.charCodeAt(t + 1)),
                  56320 === (m & 64512) &&
                    ((f = 65536 + ((f - 55296) << 10) + (m - 56320)), t++)),
                128 > f
                  ? (g[C++] = f)
                  : (2048 > f
                      ? (g[C++] = 192 | (f >>> 6))
                      : (65536 > f
                          ? (g[C++] = 224 | (f >>> 12))
                          : ((g[C++] = 240 | (f >>> 18)),
                            (g[C++] = 128 | ((f >>> 12) & 63))),
                        (g[C++] = 128 | ((f >>> 6) & 63))),
                    (g[C++] = 128 | (f & 63)));
            return g;
          };
          c.buf2binstring = function (f) {
            return F(f, f.length);
          };
          c.binstring2buf = function (f) {
            for (var g = new x.Buf8(f.length), h = 0, m = g.length; h < m; h++)
              g[h] = f.charCodeAt(h);
            return g;
          };
          c.buf2string = function (f, g) {
            var h,
              m,
              t,
              c,
              s = g || f.length,
              b = Array(2 * s);
            for (h = m = 0; h < s; )
              if (((t = f[h++]), 128 > t)) b[m++] = t;
              else if (((c = y[t]), 4 < c)) (b[m++] = 65533), (h += c - 1);
              else {
                for (t &= 2 === c ? 31 : 3 === c ? 15 : 7; 1 < c && h < s; )
                  (t = (t << 6) | (f[h++] & 63)), c--;
                1 < c
                  ? (b[m++] = 65533)
                  : 65536 > t
                  ? (b[m++] = t)
                  : ((t -= 65536),
                    (b[m++] = 55296 | ((t >> 10) & 1023)),
                    (b[m++] = 56320 | (t & 1023)));
              }
            return F(b, m);
          };
          c.utf8border = function (f, h) {
            var g;
            h = h || f.length;
            h > f.length && (h = f.length);
            for (g = h - 1; 0 <= g && 128 === (f[g] & 192); ) g--;
            return 0 > g || 0 === g ? h : g + y[f[g]] > h ? g : h;
          };
        },
        { "./common": 1 },
      ],
      3: [
        function (p, u, c) {
          u.exports = function (c, p, f, h) {
            var g = (c & 65535) | 0;
            c = ((c >>> 16) & 65535) | 0;
            for (var m = 0; 0 !== f; ) {
              m = 2e3 < f ? 2e3 : f;
              f -= m;
              do (g = (g + p[h++]) | 0), (c = (c + g) | 0);
              while (--m);
              g %= 65521;
              c %= 65521;
            }
            return g | (c << 16) | 0;
          };
        },
        {},
      ],
      4: [
        function (p, u, c) {
          u.exports = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8,
          };
        },
        {},
      ],
      5: [
        function (p, u, c) {
          var F = (function () {
            for (var c, f = [], h = 0; 256 > h; h++) {
              c = h;
              for (var g = 0; 8 > g; g++)
                c = c & 1 ? 3988292384 ^ (c >>> 1) : c >>> 1;
              f[h] = c;
            }
            return f;
          })();
          u.exports = function (c, f, h, g) {
            h = g + h;
            for (c ^= -1; g < h; g++) c = (c >>> 8) ^ F[(c ^ f[g]) & 255];
            return c ^ -1;
          };
        },
        {},
      ],
      6: [
        function (p, u, c) {
          u.exports = function () {
            this.os = this.xflags = this.time = this.text = 0;
            this.extra = null;
            this.extra_len = 0;
            this.comment = this.name = "";
            this.hcrc = 0;
            this.done = !1;
          };
        },
        {},
      ],
      7: [
        function (p, u, c) {
          u.exports = function (c, p) {
            var f,
              h,
              g,
              m,
              y,
              B,
              u,
              E,
              M,
              t,
              C,
              s,
              b,
              D,
              a,
              K,
              L,
              v,
              q,
              k,
              n,
              d,
              e,
              A;
            f = c.state;
            h = c.next_in;
            e = c.input;
            g = h + (c.avail_in - 5);
            m = c.next_out;
            A = c.output;
            y = m - (p - c.avail_out);
            B = m + (c.avail_out - 257);
            u = f.dmax;
            E = f.wsize;
            M = f.whave;
            t = f.wnext;
            C = f.window;
            s = f.hold;
            b = f.bits;
            D = f.lencode;
            a = f.distcode;
            K = (1 << f.lenbits) - 1;
            L = (1 << f.distbits) - 1;
            a: do
              b: for (
                15 > b &&
                  ((s += e[h++] << b), (b += 8), (s += e[h++] << b), (b += 8)),
                  v = D[s & K];
                ;

              ) {
                q = v >>> 24;
                s >>>= q;
                b -= q;
                q = (v >>> 16) & 255;
                if (0 === q) A[m++] = v & 65535;
                else if (q & 16) {
                  k = v & 65535;
                  if ((q &= 15))
                    b < q && ((s += e[h++] << b), (b += 8)),
                      (k += s & ((1 << q) - 1)),
                      (s >>>= q),
                      (b -= q);
                  15 > b &&
                    ((s += e[h++] << b),
                    (b += 8),
                    (s += e[h++] << b),
                    (b += 8));
                  v = a[s & L];
                  c: for (;;) {
                    q = v >>> 24;
                    s >>>= q;
                    b -= q;
                    q = (v >>> 16) & 255;
                    if (q & 16) {
                      v &= 65535;
                      q &= 15;
                      b < q &&
                        ((s += e[h++] << b),
                        (b += 8),
                        b < q && ((s += e[h++] << b), (b += 8)));
                      v += s & ((1 << q) - 1);
                      if (v > u) {
                        c.msg = "invalid distance too far back";
                        f.mode = 30;
                        break a;
                      }
                      s >>>= q;
                      b -= q;
                      q = m - y;
                      if (v > q) {
                        q = v - q;
                        if (q > M && f.sane) {
                          c.msg = "invalid distance too far back";
                          f.mode = 30;
                          break a;
                        }
                        n = 0;
                        d = C;
                        if (0 === t) {
                          if (((n += E - q), q < k)) {
                            k -= q;
                            do A[m++] = C[n++];
                            while (--q);
                            n = m - v;
                            d = A;
                          }
                        } else if (t < q) {
                          if (((n += E + t - q), (q -= t), q < k)) {
                            k -= q;
                            do A[m++] = C[n++];
                            while (--q);
                            n = 0;
                            if (t < k) {
                              q = t;
                              k -= q;
                              do A[m++] = C[n++];
                              while (--q);
                              n = m - v;
                              d = A;
                            }
                          }
                        } else if (((n += t - q), q < k)) {
                          k -= q;
                          do A[m++] = C[n++];
                          while (--q);
                          n = m - v;
                          d = A;
                        }
                        for (; 2 < k; )
                          (A[m++] = d[n++]),
                            (A[m++] = d[n++]),
                            (A[m++] = d[n++]),
                            (k -= 3);
                        k && ((A[m++] = d[n++]), 1 < k && (A[m++] = d[n++]));
                      } else {
                        n = m - v;
                        do
                          (A[m++] = A[n++]),
                            (A[m++] = A[n++]),
                            (A[m++] = A[n++]),
                            (k -= 3);
                        while (2 < k);
                        k && ((A[m++] = A[n++]), 1 < k && (A[m++] = A[n++]));
                      }
                    } else if (0 === (q & 64)) {
                      v = a[(v & 65535) + (s & ((1 << q) - 1))];
                      continue c;
                    } else {
                      c.msg = "invalid distance code";
                      f.mode = 30;
                      break a;
                    }
                    break;
                  }
                } else if (0 === (q & 64)) {
                  v = D[(v & 65535) + (s & ((1 << q) - 1))];
                  continue b;
                } else {
                  q & 32
                    ? (f.mode = 12)
                    : ((c.msg = "invalid literal/length code"), (f.mode = 30));
                  break a;
                }
                break;
              }
            while (h < g && m < B);
            k = b >> 3;
            h -= k;
            b -= k << 3;
            c.next_in = h;
            c.next_out = m;
            c.avail_in = h < g ? 5 + (g - h) : 5 - (h - g);
            c.avail_out = m < B ? 257 + (B - m) : 257 - (m - B);
            f.hold = s & ((1 << b) - 1);
            f.bits = b;
          };
        },
        {},
      ],
      8: [
        function (p, u, c) {
          function F(b) {
            return (
              ((b >>> 24) & 255) +
              ((b >>> 8) & 65280) +
              ((b & 65280) << 8) +
              ((b & 255) << 24)
            );
          }
          function x() {
            this.mode = 0;
            this.last = !1;
            this.wrap = 0;
            this.havedict = !1;
            this.total = this.check = this.dmax = this.flags = 0;
            this.head = null;
            this.wnext = this.whave = this.wsize = this.wbits = 0;
            this.window = null;
            this.extra = this.offset = this.length = this.bits = this.hold = 0;
            this.distcode = this.lencode = null;
            this.have =
              this.ndist =
              this.nlen =
              this.ncode =
              this.distbits =
              this.lenbits =
                0;
            this.next = null;
            this.lens = new y.Buf16(320);
            this.work = new y.Buf16(288);
            this.distdyn = this.lendyn = null;
            this.was = this.back = this.sane = 0;
          }
          function f(b) {
            var c;
            if (!b || !b.state) return -2;
            c = b.state;
            b.total_in = b.total_out = c.total = 0;
            b.msg = "";
            c.wrap && (b.adler = c.wrap & 1);
            c.mode = 1;
            c.last = 0;
            c.havedict = 0;
            c.dmax = 32768;
            c.head = null;
            c.hold = 0;
            c.bits = 0;
            c.lencode = c.lendyn = new y.Buf32(852);
            c.distcode = c.distdyn = new y.Buf32(592);
            c.sane = 1;
            c.back = -1;
            return 0;
          }
          function h(b) {
            var c;
            if (!b || !b.state) return -2;
            c = b.state;
            c.wsize = 0;
            c.whave = 0;
            c.wnext = 0;
            return f(b);
          }
          function g(b, c) {
            var a, f;
            if (!b || !b.state) return -2;
            f = b.state;
            0 > c
              ? ((a = 0), (c = -c))
              : ((a = (c >> 4) + 1), 48 > c && (c &= 15));
            if (c && (8 > c || 15 < c)) return -2;
            null !== f.window && f.wbits !== c && (f.window = null);
            f.wrap = a;
            f.wbits = c;
            return h(b);
          }
          function m(b, c) {
            var a;
            if (!b) return -2;
            a = new x();
            b.state = a;
            a.window = null;
            a = g(b, c);
            0 !== a && (b.state = null);
            return a;
          }
          var y = p("../utils/common"),
            B = p("./adler32"),
            I = p("./crc32"),
            E = p("./inffast"),
            M = p("./inftrees"),
            t = !0,
            C,
            s;
          c.inflateReset = h;
          c.inflateReset2 = g;
          c.inflateResetKeep = f;
          c.inflateInit = function (b) {
            return m(b, 15);
          };
          c.inflateInit2 = m;
          c.inflate = function (b, c) {
            var a, f, h, g, m, k, n, d, e, p, z, l, r, u;
            l = 0;
            var w,
              G,
              x,
              N,
              J,
              H = new y.Buf8(4),
              R = [
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1,
                15,
              ];
            if (!b || !b.state || !b.output || (!b.input && 0 !== b.avail_in))
              return -2;
            a = b.state;
            12 === a.mode && (a.mode = 13);
            m = b.next_out;
            h = b.output;
            n = b.avail_out;
            g = b.next_in;
            f = b.input;
            k = b.avail_in;
            d = a.hold;
            e = a.bits;
            p = k;
            z = n;
            J = 0;
            a: for (;;)
              switch (a.mode) {
                case 1:
                  if (0 === a.wrap) {
                    a.mode = 13;
                    break;
                  }
                  for (; 16 > e; ) {
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  if (a.wrap & 2 && 35615 === d) {
                    a.check = 0;
                    H[0] = d & 255;
                    H[1] = (d >>> 8) & 255;
                    a.check = I(a.check, H, 2, 0);
                    e = d = 0;
                    a.mode = 2;
                    break;
                  }
                  a.flags = 0;
                  a.head && (a.head.done = !1);
                  if (!(a.wrap & 1) || (((d & 255) << 8) + (d >> 8)) % 31) {
                    b.msg = "incorrect header check";
                    a.mode = 30;
                    break;
                  }
                  if (8 !== (d & 15)) {
                    b.msg = "unknown compression method";
                    a.mode = 30;
                    break;
                  }
                  d >>>= 4;
                  e -= 4;
                  r = (d & 15) + 8;
                  if (0 === a.wbits) a.wbits = r;
                  else if (r > a.wbits) {
                    b.msg = "invalid window size";
                    a.mode = 30;
                    break;
                  }
                  a.dmax = 1 << r;
                  b.adler = a.check = 1;
                  a.mode = d & 512 ? 10 : 12;
                  e = d = 0;
                  break;
                case 2:
                  for (; 16 > e; ) {
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  a.flags = d;
                  if (8 !== (a.flags & 255)) {
                    b.msg = "unknown compression method";
                    a.mode = 30;
                    break;
                  }
                  if (a.flags & 57344) {
                    b.msg = "unknown header flags set";
                    a.mode = 30;
                    break;
                  }
                  a.head && (a.head.text = (d >> 8) & 1);
                  a.flags & 512 &&
                    ((H[0] = d & 255),
                    (H[1] = (d >>> 8) & 255),
                    (a.check = I(a.check, H, 2, 0)));
                  e = d = 0;
                  a.mode = 3;
                case 3:
                  for (; 32 > e; ) {
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  a.head && (a.head.time = d);
                  a.flags & 512 &&
                    ((H[0] = d & 255),
                    (H[1] = (d >>> 8) & 255),
                    (H[2] = (d >>> 16) & 255),
                    (H[3] = (d >>> 24) & 255),
                    (a.check = I(a.check, H, 4, 0)));
                  e = d = 0;
                  a.mode = 4;
                case 4:
                  for (; 16 > e; ) {
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  a.head && ((a.head.xflags = d & 255), (a.head.os = d >> 8));
                  a.flags & 512 &&
                    ((H[0] = d & 255),
                    (H[1] = (d >>> 8) & 255),
                    (a.check = I(a.check, H, 2, 0)));
                  e = d = 0;
                  a.mode = 5;
                case 5:
                  if (a.flags & 1024) {
                    for (; 16 > e; ) {
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    a.length = d;
                    a.head && (a.head.extra_len = d);
                    a.flags & 512 &&
                      ((H[0] = d & 255),
                      (H[1] = (d >>> 8) & 255),
                      (a.check = I(a.check, H, 2, 0)));
                    e = d = 0;
                  } else a.head && (a.head.extra = null);
                  a.mode = 6;
                case 6:
                  if (
                    a.flags & 1024 &&
                    ((l = a.length),
                    l > k && (l = k),
                    l &&
                      (a.head &&
                        ((r = a.head.extra_len - a.length),
                        a.head.extra ||
                          (a.head.extra = Array(a.head.extra_len)),
                        y.arraySet(a.head.extra, f, g, l, r)),
                      a.flags & 512 && (a.check = I(a.check, f, l, g)),
                      (k -= l),
                      (g += l),
                      (a.length -= l)),
                    a.length)
                  )
                    break a;
                  a.length = 0;
                  a.mode = 7;
                case 7:
                  if (a.flags & 2048) {
                    if (0 === k) break a;
                    l = 0;
                    do
                      (r = f[g + l++]),
                        a.head &&
                          r &&
                          65536 > a.length &&
                          (a.head.name += String.fromCharCode(r));
                    while (r && l < k);
                    a.flags & 512 && (a.check = I(a.check, f, l, g));
                    k -= l;
                    g += l;
                    if (r) break a;
                  } else a.head && (a.head.name = null);
                  a.length = 0;
                  a.mode = 8;
                case 8:
                  if (a.flags & 4096) {
                    if (0 === k) break a;
                    l = 0;
                    do
                      (r = f[g + l++]),
                        a.head &&
                          r &&
                          65536 > a.length &&
                          (a.head.comment += String.fromCharCode(r));
                    while (r && l < k);
                    a.flags & 512 && (a.check = I(a.check, f, l, g));
                    k -= l;
                    g += l;
                    if (r) break a;
                  } else a.head && (a.head.comment = null);
                  a.mode = 9;
                case 9:
                  if (a.flags & 512) {
                    for (; 16 > e; ) {
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    if (d !== (a.check & 65535)) {
                      b.msg = "header crc mismatch";
                      a.mode = 30;
                      break;
                    }
                    e = d = 0;
                  }
                  a.head &&
                    ((a.head.hcrc = (a.flags >> 9) & 1), (a.head.done = !0));
                  b.adler = a.check = 0;
                  a.mode = 12;
                  break;
                case 10:
                  for (; 32 > e; ) {
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  b.adler = a.check = F(d);
                  e = d = 0;
                  a.mode = 11;
                case 11:
                  if (0 === a.havedict)
                    return (
                      (b.next_out = m),
                      (b.avail_out = n),
                      (b.next_in = g),
                      (b.avail_in = k),
                      (a.hold = d),
                      (a.bits = e),
                      2
                    );
                  b.adler = a.check = 1;
                  a.mode = 12;
                case 12:
                  if (5 === c || 6 === c) break a;
                case 13:
                  if (a.last) {
                    d >>>= e & 7;
                    e -= e & 7;
                    a.mode = 27;
                    break;
                  }
                  for (; 3 > e; ) {
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  a.last = d & 1;
                  d >>>= 1;
                  e -= 1;
                  switch (d & 3) {
                    case 0:
                      a.mode = 14;
                      break;
                    case 1:
                      l = a;
                      if (t) {
                        r = void 0;
                        C = new y.Buf32(512);
                        s = new y.Buf32(32);
                        for (r = 0; 144 > r; ) l.lens[r++] = 8;
                        for (; 256 > r; ) l.lens[r++] = 9;
                        for (; 280 > r; ) l.lens[r++] = 7;
                        for (; 288 > r; ) l.lens[r++] = 8;
                        M(1, l.lens, 0, 288, C, 0, l.work, { bits: 9 });
                        for (r = 0; 32 > r; ) l.lens[r++] = 5;
                        M(2, l.lens, 0, 32, s, 0, l.work, { bits: 5 });
                        t = !1;
                      }
                      l.lencode = C;
                      l.lenbits = 9;
                      l.distcode = s;
                      l.distbits = 5;
                      a.mode = 20;
                      if (6 === c) {
                        d >>>= 2;
                        e -= 2;
                        break a;
                      }
                      break;
                    case 2:
                      a.mode = 17;
                      break;
                    case 3:
                      (b.msg = "invalid block type"), (a.mode = 30);
                  }
                  d >>>= 2;
                  e -= 2;
                  break;
                case 14:
                  d >>>= e & 7;
                  for (e -= e & 7; 32 > e; ) {
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  if ((d & 65535) !== ((d >>> 16) ^ 65535)) {
                    b.msg = "invalid stored block lengths";
                    a.mode = 30;
                    break;
                  }
                  a.length = d & 65535;
                  e = d = 0;
                  a.mode = 15;
                  if (6 === c) break a;
                case 15:
                  a.mode = 16;
                case 16:
                  if ((l = a.length)) {
                    l > k && (l = k);
                    l > n && (l = n);
                    if (0 === l) break a;
                    y.arraySet(h, f, g, l, m);
                    k -= l;
                    g += l;
                    n -= l;
                    m += l;
                    a.length -= l;
                    break;
                  }
                  a.mode = 12;
                  break;
                case 17:
                  for (; 14 > e; ) {
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  a.nlen = (d & 31) + 257;
                  d >>>= 5;
                  e -= 5;
                  a.ndist = (d & 31) + 1;
                  d >>>= 5;
                  e -= 5;
                  a.ncode = (d & 15) + 4;
                  d >>>= 4;
                  e -= 4;
                  if (286 < a.nlen || 30 < a.ndist) {
                    b.msg = "too many length or distance symbols";
                    a.mode = 30;
                    break;
                  }
                  a.have = 0;
                  a.mode = 18;
                case 18:
                  for (; a.have < a.ncode; ) {
                    for (; 3 > e; ) {
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    a.lens[R[a.have++]] = d & 7;
                    d >>>= 3;
                    e -= 3;
                  }
                  for (; 19 > a.have; ) a.lens[R[a.have++]] = 0;
                  a.lencode = a.lendyn;
                  a.lenbits = 7;
                  l = { bits: a.lenbits };
                  J = M(0, a.lens, 0, 19, a.lencode, 0, a.work, l);
                  a.lenbits = l.bits;
                  if (J) {
                    b.msg = "invalid code lengths set";
                    a.mode = 30;
                    break;
                  }
                  a.have = 0;
                  a.mode = 19;
                case 19:
                  for (; a.have < a.nlen + a.ndist; ) {
                    for (;;) {
                      l = a.lencode[d & ((1 << a.lenbits) - 1)];
                      w = l >>> 24;
                      G = (l >>> 16) & 255;
                      x = l & 65535;
                      if (w <= e) break;
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    if (16 > x) (d >>>= w), (e -= w), (a.lens[a.have++] = x);
                    else {
                      if (16 === x) {
                        for (l = w + 2; e < l; ) {
                          if (0 === k) break a;
                          k--;
                          d += f[g++] << e;
                          e += 8;
                        }
                        d >>>= w;
                        e -= w;
                        if (0 === a.have) {
                          b.msg = "invalid bit length repeat";
                          a.mode = 30;
                          break;
                        }
                        r = a.lens[a.have - 1];
                        l = 3 + (d & 3);
                        d >>>= 2;
                        e -= 2;
                      } else if (17 === x) {
                        for (l = w + 3; e < l; ) {
                          if (0 === k) break a;
                          k--;
                          d += f[g++] << e;
                          e += 8;
                        }
                        d >>>= w;
                        e -= w;
                        r = 0;
                        l = 3 + (d & 7);
                        d >>>= 3;
                        e -= 3;
                      } else {
                        for (l = w + 7; e < l; ) {
                          if (0 === k) break a;
                          k--;
                          d += f[g++] << e;
                          e += 8;
                        }
                        d >>>= w;
                        e -= w;
                        r = 0;
                        l = 11 + (d & 127);
                        d >>>= 7;
                        e -= 7;
                      }
                      if (a.have + l > a.nlen + a.ndist) {
                        b.msg = "invalid bit length repeat";
                        a.mode = 30;
                        break;
                      }
                      for (; l--; ) a.lens[a.have++] = r;
                    }
                  }
                  if (30 === a.mode) break;
                  if (0 === a.lens[256]) {
                    b.msg = "invalid code -- missing end-of-block";
                    a.mode = 30;
                    break;
                  }
                  a.lenbits = 9;
                  l = { bits: a.lenbits };
                  J = M(1, a.lens, 0, a.nlen, a.lencode, 0, a.work, l);
                  a.lenbits = l.bits;
                  if (J) {
                    b.msg = "invalid literal/lengths set";
                    a.mode = 30;
                    break;
                  }
                  a.distbits = 6;
                  a.distcode = a.distdyn;
                  l = { bits: a.distbits };
                  J = M(2, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, l);
                  a.distbits = l.bits;
                  if (J) {
                    b.msg = "invalid distances set";
                    a.mode = 30;
                    break;
                  }
                  a.mode = 20;
                  if (6 === c) break a;
                case 20:
                  a.mode = 21;
                case 21:
                  if (6 <= k && 258 <= n) {
                    b.next_out = m;
                    b.avail_out = n;
                    b.next_in = g;
                    b.avail_in = k;
                    a.hold = d;
                    a.bits = e;
                    E(b, z);
                    m = b.next_out;
                    h = b.output;
                    n = b.avail_out;
                    g = b.next_in;
                    f = b.input;
                    k = b.avail_in;
                    d = a.hold;
                    e = a.bits;
                    12 === a.mode && (a.back = -1);
                    break;
                  }
                  for (a.back = 0; ; ) {
                    l = a.lencode[d & ((1 << a.lenbits) - 1)];
                    w = l >>> 24;
                    G = (l >>> 16) & 255;
                    x = l & 65535;
                    if (w <= e) break;
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  if (G && 0 === (G & 240)) {
                    r = w;
                    u = G;
                    for (N = x; ; ) {
                      l = a.lencode[N + ((d & ((1 << (r + u)) - 1)) >> r)];
                      w = l >>> 24;
                      G = (l >>> 16) & 255;
                      x = l & 65535;
                      if (r + w <= e) break;
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    d >>>= r;
                    e -= r;
                    a.back += r;
                  }
                  d >>>= w;
                  e -= w;
                  a.back += w;
                  a.length = x;
                  if (0 === G) {
                    a.mode = 26;
                    break;
                  }
                  if (G & 32) {
                    a.back = -1;
                    a.mode = 12;
                    break;
                  }
                  if (G & 64) {
                    b.msg = "invalid literal/length code";
                    a.mode = 30;
                    break;
                  }
                  a.extra = G & 15;
                  a.mode = 22;
                case 22:
                  if (a.extra) {
                    for (l = a.extra; e < l; ) {
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    a.length += d & ((1 << a.extra) - 1);
                    d >>>= a.extra;
                    e -= a.extra;
                    a.back += a.extra;
                  }
                  a.was = a.length;
                  a.mode = 23;
                case 23:
                  for (;;) {
                    l = a.distcode[d & ((1 << a.distbits) - 1)];
                    w = l >>> 24;
                    G = (l >>> 16) & 255;
                    x = l & 65535;
                    if (w <= e) break;
                    if (0 === k) break a;
                    k--;
                    d += f[g++] << e;
                    e += 8;
                  }
                  if (0 === (G & 240)) {
                    r = w;
                    u = G;
                    for (N = x; ; ) {
                      l = a.distcode[N + ((d & ((1 << (r + u)) - 1)) >> r)];
                      w = l >>> 24;
                      G = (l >>> 16) & 255;
                      x = l & 65535;
                      if (r + w <= e) break;
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    d >>>= r;
                    e -= r;
                    a.back += r;
                  }
                  d >>>= w;
                  e -= w;
                  a.back += w;
                  if (G & 64) {
                    b.msg = "invalid distance code";
                    a.mode = 30;
                    break;
                  }
                  a.offset = x;
                  a.extra = G & 15;
                  a.mode = 24;
                case 24:
                  if (a.extra) {
                    for (l = a.extra; e < l; ) {
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    a.offset += d & ((1 << a.extra) - 1);
                    d >>>= a.extra;
                    e -= a.extra;
                    a.back += a.extra;
                  }
                  if (a.offset > a.dmax) {
                    b.msg = "invalid distance too far back";
                    a.mode = 30;
                    break;
                  }
                  a.mode = 25;
                case 25:
                  if (0 === n) break a;
                  l = z - n;
                  if (a.offset > l) {
                    l = a.offset - l;
                    if (l > a.whave && a.sane) {
                      b.msg = "invalid distance too far back";
                      a.mode = 30;
                      break;
                    }
                    l > a.wnext
                      ? ((l -= a.wnext), (r = a.wsize - l))
                      : (r = a.wnext - l);
                    l > a.length && (l = a.length);
                    u = a.window;
                  } else (u = h), (r = m - a.offset), (l = a.length);
                  l > n && (l = n);
                  n -= l;
                  a.length -= l;
                  do h[m++] = u[r++];
                  while (--l);
                  0 === a.length && (a.mode = 21);
                  break;
                case 26:
                  if (0 === n) break a;
                  h[m++] = a.length;
                  n--;
                  a.mode = 21;
                  break;
                case 27:
                  if (a.wrap) {
                    for (; 32 > e; ) {
                      if (0 === k) break a;
                      k--;
                      d |= f[g++] << e;
                      e += 8;
                    }
                    z -= n;
                    b.total_out += z;
                    a.total += z;
                    z &&
                      (b.adler = a.check =
                        a.flags
                          ? I(a.check, h, z, m - z)
                          : B(a.check, h, z, m - z));
                    z = n;
                    if ((a.flags ? d : F(d)) !== a.check) {
                      b.msg = "incorrect data check";
                      a.mode = 30;
                      break;
                    }
                    e = d = 0;
                  }
                  a.mode = 28;
                case 28:
                  if (a.wrap && a.flags) {
                    for (; 32 > e; ) {
                      if (0 === k) break a;
                      k--;
                      d += f[g++] << e;
                      e += 8;
                    }
                    if (d !== (a.total & 4294967295)) {
                      b.msg = "incorrect length check";
                      a.mode = 30;
                      break;
                    }
                    e = d = 0;
                  }
                  a.mode = 29;
                case 29:
                  J = 1;
                  break a;
                case 30:
                  J = -3;
                  break a;
                case 31:
                  return -4;
                default:
                  return -2;
              }
            b.next_out = m;
            b.avail_out = n;
            b.next_in = g;
            b.avail_in = k;
            a.hold = d;
            a.bits = e;
            if (
              a.wsize ||
              (z !== b.avail_out && 30 > a.mode && (27 > a.mode || 4 !== c))
            )
              (f = b.output),
                (g = b.next_out),
                (m = z - b.avail_out),
                (n = b.state),
                null === n.window &&
                  ((n.wsize = 1 << n.wbits),
                  (n.wnext = 0),
                  (n.whave = 0),
                  (n.window = new y.Buf8(n.wsize))),
                m >= n.wsize
                  ? (y.arraySet(n.window, f, g - n.wsize, n.wsize, 0),
                    (n.wnext = 0),
                    (n.whave = n.wsize))
                  : ((k = n.wsize - n.wnext),
                    k > m && (k = m),
                    y.arraySet(n.window, f, g - m, k, n.wnext),
                    (m -= k)
                      ? (y.arraySet(n.window, f, g - m, m, 0),
                        (n.wnext = m),
                        (n.whave = n.wsize))
                      : ((n.wnext += k),
                        n.wnext === n.wsize && (n.wnext = 0),
                        n.whave < n.wsize && (n.whave += k)));
            p -= b.avail_in;
            z -= b.avail_out;
            b.total_in += p;
            b.total_out += z;
            a.total += z;
            a.wrap &&
              z &&
              (b.adler = a.check =
                a.flags
                  ? I(a.check, h, z, b.next_out - z)
                  : B(a.check, h, z, b.next_out - z));
            b.data_type =
              a.bits +
              (a.last ? 64 : 0) +
              (12 === a.mode ? 128 : 0) +
              (20 === a.mode || 15 === a.mode ? 256 : 0);
            ((0 === p && 0 === z) || 4 === c) && 0 === J && (J = -5);
            return J;
          };
          c.inflateEnd = function (b) {
            if (!b || !b.state) return -2;
            var c = b.state;
            c.window && (c.window = null);
            b.state = null;
            return 0;
          };
          c.inflateGetHeader = function (b, c) {
            var a;
            if (!b || !b.state) return -2;
            a = b.state;
            if (0 === (a.wrap & 2)) return -2;
            a.head = c;
            c.done = !1;
            return 0;
          };
          c.inflateInfo = "pako inflate (from Nodeca project)";
        },
        {
          "../utils/common": 1,
          "./adler32": 3,
          "./crc32": 5,
          "./inffast": 7,
          "./inftrees": 9,
        },
      ],
      9: [
        function (p, u, c) {
          var F = p("../utils/common"),
            x = [
              3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43,
              51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
            ],
            f = [
              16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
              19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
            ],
            h = [
              1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257,
              385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289,
              16385, 24577, 0, 0,
            ],
            g = [
              16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
              23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
            ];
          u.exports = function (c, p, u, I, E, M, t, C) {
            for (
              var s = C.bits,
                b = 0,
                D = 0,
                a = 0,
                K = 0,
                L = 0,
                v = 0,
                q = 0,
                k = 0,
                n = 0,
                d = 0,
                e,
                A,
                z = null,
                l = 0,
                r,
                O = new F.Buf16(16),
                v = new F.Buf16(16),
                w = null,
                G = 0,
                Q,
                N,
                J,
                b = 0;
              15 >= b;
              b++
            )
              O[b] = 0;
            for (D = 0; D < I; D++) O[p[u + D]]++;
            L = s;
            for (K = 15; 1 <= K && 0 === O[K]; K--);
            L > K && (L = K);
            if (0 === K)
              return (E[M++] = 20971520), (E[M++] = 20971520), (C.bits = 1), 0;
            for (a = 1; a < K && 0 === O[a]; a++);
            L < a && (L = a);
            for (b = k = 1; 15 >= b; b++)
              if (((k <<= 1), (k -= O[b]), 0 > k)) return -1;
            if (0 < k && (0 === c || 1 !== K)) return -1;
            v[1] = 0;
            for (b = 1; 15 > b; b++) v[b + 1] = v[b] + O[b];
            for (D = 0; D < I; D++) 0 !== p[u + D] && (t[v[p[u + D]]++] = D);
            0 === c
              ? ((z = w = t), (r = 19))
              : 1 === c
              ? ((z = x), (l -= 257), (w = f), (G -= 257), (r = 256))
              : ((z = h), (w = g), (r = -1));
            D = d = 0;
            b = a;
            s = M;
            v = L;
            q = 0;
            A = -1;
            n = 1 << L;
            I = n - 1;
            if ((1 === c && 852 < n) || (2 === c && 592 < n)) return 1;
            for (var H = 0; ; ) {
              H++;
              Q = b - q;
              t[D] < r
                ? ((N = 0), (J = t[D]))
                : t[D] > r
                ? ((N = w[G + t[D]]), (J = z[l + t[D]]))
                : ((N = 96), (J = 0));
              k = 1 << (b - q);
              a = e = 1 << v;
              do
                (e -= k), (E[s + (d >> q) + e] = (Q << 24) | (N << 16) | J | 0);
              while (0 !== e);
              for (k = 1 << (b - 1); d & k; ) k >>= 1;
              0 !== k ? ((d &= k - 1), (d += k)) : (d = 0);
              D++;
              if (0 === --O[b]) {
                if (b === K) break;
                b = p[u + t[D]];
              }
              if (b > L && (d & I) !== A) {
                0 === q && (q = L);
                s += a;
                v = b - q;
                for (k = 1 << v; v + q < K; ) {
                  k -= O[v + q];
                  if (0 >= k) break;
                  v++;
                  k <<= 1;
                }
                n += 1 << v;
                if ((1 === c && 852 < n) || (2 === c && 592 < n)) return 1;
                A = d & I;
                E[A] = (L << 24) | (v << 16) | (s - M) | 0;
              }
            }
            0 !== d && (E[s + d] = ((b - q) << 24) | 4194304);
            C.bits = L;
            return 0;
          };
        },
        { "../utils/common": 1 },
      ],
      10: [
        function (p, u, c) {
          u.exports = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version",
          };
        },
        {},
      ],
      11: [
        function (p, u, c) {
          u.exports = function () {
            this.input = null;
            this.total_in = this.avail_in = this.next_in = 0;
            this.output = null;
            this.total_out = this.avail_out = this.next_out = 0;
            this.msg = "";
            this.state = null;
            this.data_type = 2;
            this.adler = 0;
          };
        },
        {},
      ],
      "/lib/inflate.js": [
        function (p, u, c) {
          function F(c, f) {
            var g = new E(f);
            g.push(c, !0);
            if (g.err) throw g.msg;
            return g.result;
          }
          var x = p("./zlib/inflate.js"),
            f = p("./utils/common"),
            h = p("./utils/strings"),
            g = p("./zlib/constants"),
            m = p("./zlib/messages"),
            y = p("./zlib/zstream"),
            B = p("./zlib/gzheader"),
            I = Object.prototype.toString,
            E = function (c) {
              var h = (this.options = f.assign(
                { chunkSize: 16384, windowBits: 0, to: "" },
                c || {}
              ));
              h.raw &&
                0 <= h.windowBits &&
                16 > h.windowBits &&
                ((h.windowBits = -h.windowBits),
                0 === h.windowBits && (h.windowBits = -15));
              !(0 <= h.windowBits && 16 > h.windowBits) ||
                (c && c.windowBits) ||
                (h.windowBits += 32);
              15 < h.windowBits &&
                48 > h.windowBits &&
                0 === (h.windowBits & 15) &&
                (h.windowBits |= 15);
              this.err = 0;
              this.msg = "";
              this.ended = !1;
              this.chunks = [];
              this.strm = new y();
              this.strm.avail_out = 0;
              c = x.inflateInit2(this.strm, h.windowBits);
              if (c !== g.Z_OK) throw Error(m[c]);
              this.header = new B();
              x.inflateGetHeader(this.strm, this.header);
            };
          E.prototype.push = function (c, m) {
            var p = this.strm,
              s = this.options.chunkSize,
              b,
              u,
              a,
              y,
              B;
            if (this.ended) return !1;
            u = m === ~~m ? m : !0 === m ? g.Z_FINISH : g.Z_NO_FLUSH;
            "string" === typeof c
              ? (p.input = h.binstring2buf(c))
              : "[object ArrayBuffer]" === I.call(c)
              ? (p.input = new Uint8Array(c))
              : (p.input = c);
            p.next_in = 0;
            p.avail_in = p.input.length;
            do {
              0 === p.avail_out &&
                ((p.output = new f.Buf8(s)),
                (p.next_out = 0),
                (p.avail_out = s));
              b = x.inflate(p, g.Z_NO_FLUSH);
              if (b !== g.Z_STREAM_END && b !== g.Z_OK)
                return this.onEnd(b), (this.ended = !0), !1;
              if (
                p.next_out &&
                (0 === p.avail_out ||
                  b === g.Z_STREAM_END ||
                  (0 === p.avail_in &&
                    (u === g.Z_FINISH || u === g.Z_SYNC_FLUSH)))
              )
                if ("string" === this.options.to)
                  (a = h.utf8border(p.output, p.next_out)),
                    (y = p.next_out - a),
                    (B = h.buf2string(p.output, a)),
                    (p.next_out = y),
                    (p.avail_out = s - y),
                    y && f.arraySet(p.output, p.output, a, y, 0),
                    this.onData(B);
                else this.onData(f.shrinkBuf(p.output, p.next_out));
            } while (0 < p.avail_in && b !== g.Z_STREAM_END);
            b === g.Z_STREAM_END && (u = g.Z_FINISH);
            if (u === g.Z_FINISH)
              return (
                (b = x.inflateEnd(this.strm)),
                this.onEnd(b),
                (this.ended = !0),
                b === g.Z_OK
              );
            u === g.Z_SYNC_FLUSH && (this.onEnd(g.Z_OK), (p.avail_out = 0));
            return !0;
          };
          E.prototype.onData = function (c) {
            this.chunks.push(c);
          };
          E.prototype.onEnd = function (c) {
            c === g.Z_OK &&
              (this.result =
                "string" === this.options.to
                  ? this.chunks.join("")
                  : f.flattenChunks(this.chunks));
            this.chunks = [];
            this.err = c;
            this.msg = this.strm.msg;
          };
          c.Inflate = E;
          c.inflate = F;
          c.inflateRaw = function (c, f) {
            f = f || {};
            f.raw = !0;
            return F(c, f);
          };
          c.ungzip = F;
        },
        {
          "./utils/common": 1,
          "./utils/strings": 2,
          "./zlib/constants": 4,
          "./zlib/gzheader": 6,
          "./zlib/inflate.js": 8,
          "./zlib/messages": 10,
          "./zlib/zstream": 11,
        },
      ],
    },
    {},
    []
  )("/lib/inflate.js");
});
$3Dmol = (function (b) {
  return b.$3Dmol || {};
})(window);
"https:" != document.location.protocol &&
  $.get("http://3dmol.csb.pitt.edu/track/report.cgi");
String.prototype.startsWith ||
  (String.prototype.startsWith = function (b) {
    return 0 === this.lastIndexOf(b, 0);
  });
String.prototype.endsWith ||
  (String.prototype.endsWith = function (b) {
    return -1 !== this.indexOf(b, this.length - b.length);
  });
$.ajaxTransport("+binary", function (b, c, d) {
  if (
    window.FormData &&
    ((b.dataType && "binary" == b.dataType) ||
      (b.data &&
        ((window.ArrayBuffer && b.data instanceof ArrayBuffer) ||
          (window.Blob && b.data instanceof Blob))))
  )
    return {
      send: function (c, d) {
        var A = new XMLHttpRequest(),
          y = b.url,
          z = b.type,
          f = b.async || !0,
          h = b.responseType || "blob",
          l = b.data || null,
          m = b.username || null,
          w = b.password || null;
        A.addEventListener("load", function () {
          var c = {};
          c[b.dataType] = A.response;
          d(A.status, A.statusText, c, A.getAllResponseHeaders());
        });
        A.open(z, y, f, m, w);
        for (var e in c) A.setRequestHeader(e, c[e]);
        A.responseType = h;
        A.send(l);
      },
      abort: function () {
        d.abort();
      },
    };
});
$3Dmol.createViewer = function (b, c) {
  "string" === $.type(b) && (b = $("#" + b));
  if (b) {
    c = c || {};
    try {
      return new $3Dmol.GLViewer(b, c);
    } catch (d) {
      throw "error creating viewer: " + d;
    }
  }
};
$3Dmol.viewers = {};
$3Dmol.download = function (b, c, d, p) {
  var t = "",
    A = "",
    y = c.addModel();
  if ("mmtf:" === b.substr(0, 5)) {
    A = d && d.pdbUri ? d.pdbUri : "http://mmtf.rcsb.org/full/";
    b = b.substr(5).toUpperCase();
    var z;
    $.ajax({
      url: A + b + ".mmtf",
      type: "GET",
      dataType: "binary",
      responseType: "arraybuffer",
      processData: !1,
    })
      .done(function (b, h, l) {
        y.addMolData(b, "mmtf");
        c.zoomTo();
        c.render();
        p && p(y);
      })
      .fail(function (b, c) {
        console.log(c);
      });
  } else {
    if ("pdb:" === b.substr(0, 4)) {
      A = d && d.pdbUri ? d.pdbUri : "http://www.rcsb.org/pdb/files/";
      t = d && d.format ? d.format : "pdb";
      b = b.substr(4).toUpperCase();
      if (!b.match(/^[1-9][A-Za-z0-9]{3}$/)) {
        alert("Wrong PDB ID");
        return;
      }
      z = d && d.format ? A + b + "." + d.format : A + b + ".pdb";
    } else if ("cid:" == b.substr(0, 4)) {
      t = "sdf";
      b = b.substr(4);
      if (!b.match(/^[0-9]+$/)) {
        alert("Wrong Compound ID");
        return;
      }
      z =
        "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" +
        b +
        "/SDF?record_type=3d";
    }
    $.get(z, function (b) {
      y.addMolData(b, t, d);
      c.zoomTo();
      c.render();
      p && p(y);
    });
  }
  return y;
};
$3Dmol.SurfaceType = { VDW: 1, MS: 2, SAS: 3, SES: 4 };
$3Dmol.mergeGeos = function (b, c) {
  var d = c.geometry;
  void 0 !== d && b.geometryGroups.push(d.geometryGroups[0]);
};
$3Dmol.multiLineString = function (b) {
  return b
    .toString()
    .replace(/^[^\/]+\/\*!?/, "")
    .replace(/\*\/[^\/]+$/, "");
};
$3Dmol.syncSurface = !1;
if (
  0 <= window.navigator.userAgent.indexOf("MSIE ") ||
  0 <= window.navigator.userAgent.indexOf("Trident/")
)
  $3Dmol.syncSurface = !0;
$3Dmol.specStringToObject = function (b) {
  if ("object" === typeof b || "undefined" === typeof b || null == b) return b;
  b = b.replace(/%7E/, "~");
  var c = function (b) {
      return $.isNumeric(b)
        ? Math.floor(parseFloat(b)) == parseInt(b)
          ? parseFloat(b)
          : 0 <= b.indexOf(".")
          ? parseFloat(b)
          : parseInt(b)
        : "true" === b
        ? !0
        : "false" === b
        ? !1
        : b;
    },
    d = {};
  if ("all" === b) return d;
  b = b.split(";");
  for (var p = 0; p < b.length; p++) {
    var t = b[p].split(":"),
      A = t[0],
      y = {};
    if ((t = t[1]))
      if (((t = t.replace(/~/g, "=")), -1 !== t.indexOf("=")))
        for (var t = t.split(","), z = 0; z < t.length; z++) {
          var f = t[z].split("=", 2);
          y[f[0]] = c(f[1]);
        }
      else y = -1 !== t.indexOf(",") ? t.split(",") : c(t);
    d[A] = y;
  }
  return d;
};
$3Dmol.getExtent = function (b, c) {
  var d,
    p,
    t,
    A,
    y,
    z,
    f,
    h,
    l,
    m,
    w = !c;
  d = p = t = 9999;
  A = y = z = -9999;
  f = h = l = m = 0;
  if (0 === b.length)
    return [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  for (var e = 0; e < b.length; e++) {
    var G = b[e];
    if (
      "undefined" !== typeof G &&
      isFinite(G.x) &&
      isFinite(G.y) &&
      isFinite(G.z) &&
      (m++,
      (f += G.x),
      (h += G.y),
      (l += G.z),
      (d = d < G.x ? d : G.x),
      (p = p < G.y ? p : G.y),
      (t = t < G.z ? t : G.z),
      (A = A > G.x ? A : G.x),
      (y = y > G.y ? y : G.y),
      (z = z > G.z ? z : G.z),
      G.symmetries && w)
    )
      for (var g = 0; g < G.symmetries.length; g++)
        m++,
          (f += G.symmetries[g].x),
          (h += G.symmetries[g].y),
          (l += G.symmetries[g].z),
          (d = d < G.symmetries[g].x ? d : G.symmetries[g].x),
          (p = p < G.symmetries[g].y ? p : G.symmetries[g].y),
          (t = t < G.symmetries[g].z ? t : G.symmetries[g].z),
          (A = A > G.symmetries[g].x ? A : G.symmetries[g].x),
          (y = y > G.symmetries[g].y ? y : G.symmetries[g].y),
          (z = z > G.symmetries[g].z ? z : G.symmetries[g].z);
  }
  return [
    [d, p, t],
    [A, y, z],
    [f / m, h / m, l / m],
  ];
};
$3Dmol.getAtomProperty = function (b, c) {
  var d = null;
  b.properties && "undefined" != typeof b.properties[c]
    ? (d = b.properties[c])
    : "undefined" != typeof b[c] && (d = b[c]);
  return d;
};
$3Dmol.getPropertyRange = function (b, c) {
  for (
    var d = Number.POSITIVE_INFINITY,
      p = Number.NEGATIVE_INFINITY,
      t = 0,
      A = b.length;
    t < A;
    t++
  ) {
    var y = $3Dmol.getAtomProperty(b[t], c);
    null != y && (y < d && (d = y), y > p && (p = y));
  }
  isFinite(d) || isFinite(p)
    ? isFinite(d)
      ? isFinite(p) || (p = d)
      : (d = p)
    : (d = p = 0);
  return [d, p];
};
"function" === typeof define && define.amd && define("$3Dmol", $3Dmol);
var $3Dmol = $3Dmol || {};
$3Dmol.Math = {
  clamp: function (b, c, d) {
    return Math.min(Math.max(b, c), d);
  },
  degToRad: (function () {
    var b = Math.PI / 180;
    return function (c) {
      return c * b;
    };
  })(),
};
$3Dmol.Quaternion = function (b, c, d, p) {
  this.x = b || 0;
  this.y = c || 0;
  this.z = d || 0;
  this.w = void 0 !== p ? p : 1;
};
$3Dmol.Quaternion.prototype = {
  constructor: $3Dmol.Quaternion,
  set: function (b, c, d, p) {
    this.x = b;
    this.y = c;
    this.z = d;
    this.w = p;
    return this;
  },
  copy: function (b) {
    this.x = b.x;
    this.y = b.y;
    this.z = b.z;
    this.w = b.w;
    return this;
  },
  conjugate: function () {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  },
  inverse: function () {
    return this.conjugate().normalize();
  },
  length: function () {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  normalize: function () {
    var b = this.length();
    0 === b
      ? ((this.z = this.y = this.x = 0), (this.w = 1))
      : ((b = 1 / b),
        (this.x *= b),
        (this.y *= b),
        (this.z *= b),
        (this.w *= b));
    return this;
  },
  multiply: function (b) {
    return this.multiplyQuaternions(this, b);
  },
  multiplyQuaternions: function (b, c) {
    var d = b.x,
      p = b.y,
      t = b.z,
      A = b.w,
      y = c.x,
      z = c.y,
      f = c.z,
      h = c.w;
    this.x = d * h + A * y + p * f - t * z;
    this.y = p * h + A * z + t * y - d * f;
    this.z = t * h + A * f + d * z - p * y;
    this.w = A * h - d * y - p * z - t * f;
  },
};
$3Dmol.Vector2 = function (b, c) {
  this.x = b || 0;
  this.y = c || 0;
};
$3Dmol.Vector2.prototype = {
  constructor: $3Dmol.Vector2,
  set: function (b, c) {
    this.x = b;
    this.y = c;
    return this;
  },
  subVectors: function (b, c) {
    this.x = b.x - c.x;
    this.y = b.y - c.y;
    return this;
  },
  copy: function (b) {
    this.x = b.x;
    this.y = b.y;
    return this;
  },
  clone: function () {
    return new $3Dmol.Vector2(this.x, this.y);
  },
};
$3Dmol.Vector3 = function (b, c, d) {
  this.x = b || 0;
  this.y = c || 0;
  this.z = d || 0;
};
$3Dmol.Vector3.prototype = {
  constructor: $3Dmol.Vector3,
  set: function (b, c, d) {
    this.x = b;
    this.y = c;
    this.z = d;
    return this;
  },
  copy: function (b) {
    this.x = b.x;
    this.y = b.y;
    this.z = b.z;
    return this;
  },
  add: function (b) {
    this.x += b.x;
    this.y += b.y;
    this.z += b.z;
    return this;
  },
  addVectors: function (b, c) {
    this.x = b.x + c.x;
    this.y = b.y + c.y;
    this.z = b.z + c.z;
    return this;
  },
  sub: function (b) {
    this.x -= b.x;
    this.y -= b.y;
    this.z -= b.z;
    return this;
  },
  subVectors: function (b, c) {
    this.x = b.x - c.x;
    this.y = b.y - c.y;
    this.z = b.z - c.z;
    return this;
  },
  multiplyScalar: function (b) {
    this.x *= b;
    this.y *= b;
    this.z *= b;
    return this;
  },
  divideScalar: function (b) {
    0 !== b
      ? ((this.x /= b), (this.y /= b), (this.z /= b))
      : (this.z = this.y = this.x = 0);
    return this;
  },
  max: function (b) {
    this.x = Math.max(this.x, b.x);
    this.y = Math.max(this.y, b.y);
    this.z = Math.max(this.z, b.z);
    return this;
  },
  min: function (b) {
    this.x = Math.min(this.x, b.x);
    this.y = Math.min(this.y, b.y);
    this.z = Math.min(this.z, b.z);
    return this;
  },
  distanceTo: function (b) {
    return Math.sqrt(this.distanceToSquared(b));
  },
  distanceToSquared: function (b) {
    var c = this.x - b.x,
      d = this.y - b.y;
    b = this.z - b.z;
    return c * c + d * d + b * b;
  },
  applyMatrix4: function (b) {
    var c = this.x,
      d = this.y,
      p = this.z;
    b = b.elements;
    this.x = b[0] * c + b[4] * d + b[8] * p + b[12];
    this.y = b[1] * c + b[5] * d + b[9] * p + b[13];
    this.z = b[2] * c + b[6] * d + b[10] * p + b[14];
    return this;
  },
  applyProjection: function (b) {
    var c = this.x,
      d = this.y,
      p = this.z;
    b = b.elements;
    var t = b[3] * c + b[7] * d + b[11] * p + b[15];
    this.x = (b[0] * c + b[4] * d + b[8] * p + b[12]) / t;
    this.y = (b[1] * c + b[5] * d + b[9] * p + b[13]) / t;
    this.z = (b[2] * c + b[6] * d + b[10] * p + b[14]) / t;
    return this;
  },
  applyQuaternion: function (b) {
    var c = this.x,
      d = this.y,
      p = this.z,
      t = b.x,
      A = b.y,
      y = b.z,
      z,
      f,
      h;
    z = 2 * (d * y - p * A);
    f = 2 * (p * t - c * y);
    h = 2 * (c * A - d * t);
    this.x = c + b.w * z + (f * y - h * A);
    this.y = d + b.w * f + (h * t - z * y);
    this.z = p + b.w * h + (z * A - f * t);
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (b) {
    return this.x * b.x + this.y * b.y + this.z * b.z;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  cross: function (b) {
    var c = this.x,
      d = this.y,
      p = this.z;
    this.x = d * b.z - p * b.y;
    this.y = p * b.x - c * b.z;
    this.z = c * b.y - d * b.x;
    return this;
  },
  crossVectors: function (b, c) {
    this.x = b.y * c.z - b.z * c.y;
    this.y = b.z * c.x - b.x * c.z;
    this.z = b.x * c.y - b.y * c.x;
    return this;
  },
  getPositionFromMatrix: function (b) {
    this.x = b.elements[12];
    this.y = b.elements[13];
    this.z = b.elements[14];
    return this;
  },
  setEulerFromRotationMatrix: function (b, c) {
    var d = b.elements,
      p = d[0],
      t = d[4],
      A = d[8],
      y = d[5],
      z = d[9],
      f = d[6],
      d = d[10];
    void 0 === c || "XYZ" === c
      ? ((this.y = Math.asin($3Dmol.Math.clamp(A, -1, 1))),
        0.99999 > Math.abs(A)
          ? ((this.x = Math.atan2(-z, d)), (this.z = Math.atan2(-t, p)))
          : ((this.x = Math.atan2(f, y)), (this.z = 0)))
      : console.error(
          "Error with vector's setEulerFromRotationMatrix: Unknown order: " + c
        );
    return this;
  },
  rotateAboutVector: function (b, c) {
    b.normalize();
    var d = Math.cos(c),
      p = Math.sin(c),
      t = this.clone().multiplyScalar(d),
      p = b.clone().cross(this).multiplyScalar(p),
      d = b
        .clone()
        .multiplyScalar(b.clone().dot(this))
        .multiplyScalar(1 - d),
      t = t.add(p).add(d);
    this.x = t.x;
    this.y = t.y;
    this.z = t.z;
    return this;
  },
  clone: function () {
    return new $3Dmol.Vector3(this.x, this.y, this.z);
  },
};
$3Dmol.Matrix3 = function (b, c, d, p, t, A, y, z, f) {
  this.elements = new Float32Array(9);
  this.set(
    void 0 !== b ? b : 1,
    c || 0,
    d || 0,
    p || 0,
    void 0 !== t ? t : 1,
    A || 0,
    y || 0,
    z || 0,
    void 0 !== f ? f : 1
  );
};
$3Dmol.Matrix3.prototype = {
  constructor: $3Dmol.Matrix3,
  set: function (b, c, d, p, t, A, y, z, f) {
    var h = this.elements;
    h[0] = b;
    h[3] = c;
    h[6] = d;
    h[1] = p;
    h[4] = t;
    h[7] = A;
    h[2] = y;
    h[5] = z;
    h[8] = f;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this;
  },
  copy: function (b) {
    b = b.elements;
    this.set(b[0], b[3], b[6], b[1], b[4], b[7], b[2], b[5], b[8]);
  },
  multiplyScalar: function (b) {
    var c = this.elements;
    c[0] *= b;
    c[3] *= b;
    c[6] *= b;
    c[1] *= b;
    c[4] *= b;
    c[7] *= b;
    c[2] *= b;
    c[5] *= b;
    c[8] *= b;
    return this;
  },
  getInverse: function (b, c) {
    var d = b.elements,
      p = this.elements;
    p[0] = d[10] * d[5] - d[6] * d[9];
    p[1] = -d[10] * d[1] + d[2] * d[9];
    p[2] = d[6] * d[1] - d[2] * d[5];
    p[3] = -d[10] * d[4] + d[6] * d[8];
    p[4] = d[10] * d[0] - d[2] * d[8];
    p[5] = -d[6] * d[0] + d[2] * d[4];
    p[6] = d[9] * d[4] - d[5] * d[8];
    p[7] = -d[9] * d[0] + d[1] * d[8];
    p[8] = d[5] * d[0] - d[1] * d[4];
    d = d[0] * p[0] + d[1] * p[3] + d[2] * p[6];
    if (0 === d) {
      if (c)
        throw Error(
          "Matrix3.getInverse(): can't invert matrix, determinant is 0"
        );
      console.warn(
        "Matrix3.getInverse(): can't invert matrix, determinant is 0"
      );
      this.identity();
      return this;
    }
    this.multiplyScalar(1 / d);
    return this;
  },
  getDeterminant: function () {
    var b = this.elements;
    return (
      b[0] * b[4] * b[8] +
      b[1] * b[5] * b[6] +
      b[2] * b[3] * b[7] -
      b[2] * b[4] * b[6] -
      b[1] * b[3] * b[8] -
      b[0] * b[5] * b[7]
    );
  },
  transpose: function () {
    var b,
      c = this.elements;
    b = c[1];
    c[1] = c[3];
    c[3] = b;
    b = c[2];
    c[2] = c[6];
    c[6] = b;
    b = c[5];
    c[5] = c[7];
    c[7] = b;
    return this;
  },
  clone: function () {
    var b = this.elements;
    return new $3Dmol.Matrix3(
      b[0],
      b[3],
      b[6],
      b[1],
      b[4],
      b[7],
      b[2],
      b[5],
      b[8]
    );
  },
};
$3Dmol.Matrix4 = function (b, c, d, p, t, A, y, z, f, h, l, m, w, e, G, g) {
  if ("undefined" === typeof c && "undefined" !== typeof b)
    this.elements = new Float32Array(b);
  else {
    var s = (this.elements = new Float32Array(16));
    s[0] = void 0 !== b ? b : 1;
    s[4] = c || 0;
    s[8] = d || 0;
    s[12] = p || 0;
    s[1] = t || 0;
    s[5] = void 0 !== A ? A : 1;
    s[9] = y || 0;
    s[13] = z || 0;
    s[2] = f || 0;
    s[6] = h || 0;
    s[10] = void 0 !== l ? l : 1;
    s[14] = m || 0;
    s[3] = w || 0;
    s[7] = e || 0;
    s[11] = G || 0;
    s[15] = void 0 !== g ? g : 1;
  }
};
$3Dmol.Matrix4.prototype = {
  constructor: $3Dmol.Matrix4,
  set: function (b, c, d, p, t, A, y, z, f, h, l, m, w, e, G, g) {
    var s = this.elements;
    s[0] = b;
    s[4] = c;
    s[8] = d;
    s[12] = p;
    s[1] = t;
    s[5] = A;
    s[9] = y;
    s[13] = z;
    s[2] = f;
    s[6] = h;
    s[10] = l;
    s[14] = m;
    s[3] = w;
    s[7] = e;
    s[11] = G;
    s[15] = g;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  copy: function (b) {
    b = b.elements;
    this.set(
      b[0],
      b[4],
      b[8],
      b[12],
      b[1],
      b[5],
      b[9],
      b[13],
      b[2],
      b[6],
      b[10],
      b[14],
      b[3],
      b[7],
      b[11],
      b[15]
    );
    return this;
  },
  matrix3FromTopLeft: function () {
    var b = this.elements;
    return new $3Dmol.Matrix3(
      b[0],
      b[4],
      b[8],
      b[1],
      b[5],
      b[9],
      b[2],
      b[6],
      b[10]
    );
  },
  setRotationFromEuler: function (b, c) {
    var d = this.elements,
      p = b.x,
      t = b.y,
      A = b.z,
      y = Math.cos(p),
      p = Math.sin(p),
      z = Math.cos(t),
      t = Math.sin(t),
      f = Math.cos(A),
      A = Math.sin(A);
    if (void 0 === c || "XYZ" === c) {
      var h = y * f,
        l = y * A,
        m = p * f,
        w = p * A;
      d[0] = z * f;
      d[4] = -z * A;
      d[8] = t;
      d[1] = l + m * t;
      d[5] = h - w * t;
      d[9] = -p * z;
      d[2] = w - h * t;
      d[6] = m + l * t;
      d[10] = y * z;
    } else
      console.error("Error with matrix4 setRotationFromEuler. Order: " + c);
    return this;
  },
  setRotationFromQuaternion: function (b) {
    var c = this.elements,
      d = b.x,
      p = b.y,
      t = b.z,
      A = b.w,
      y = d + d,
      z = p + p,
      f = t + t;
    b = d * y;
    var h = d * z,
      d = d * f,
      l = p * z,
      p = p * f,
      t = t * f,
      y = A * y,
      z = A * z,
      A = A * f;
    c[0] = 1 - (l + t);
    c[4] = h - A;
    c[8] = d + z;
    c[1] = h + A;
    c[5] = 1 - (b + t);
    c[9] = p - y;
    c[2] = d - z;
    c[6] = p + y;
    c[10] = 1 - (b + l);
    return this;
  },
  lookAt: (function () {
    var b = new $3Dmol.Vector3(),
      c = new $3Dmol.Vector3(),
      d = new $3Dmol.Vector3();
    return function (p, t, A) {
      var y = this.elements;
      d.subVectors(p, t).normalize();
      0 === d.length() && (d.z = 1);
      b.crossVectors(A, d).normalize();
      0 === b.length() && ((d.x += 1e-4), b.crossVectors(A, d).normalize());
      c.crossVectors(d, b);
      y[0] = b.x;
      y[4] = c.x;
      y[8] = d.x;
      y[1] = b.y;
      y[5] = c.y;
      y[9] = d.y;
      y[2] = b.z;
      y[6] = c.z;
      y[10] = d.z;
      return this;
    };
  })(),
  multiplyMatrices: function (b, c) {
    var d = b.elements,
      p = c.elements,
      t = this.elements,
      A = d[0],
      y = d[4],
      z = d[8],
      f = d[12],
      h = d[1],
      l = d[5],
      m = d[9],
      w = d[13],
      e = d[2],
      G = d[6],
      g = d[10],
      s = d[14],
      u = d[3],
      x = d[7],
      q = d[11],
      d = d[15],
      N = p[0],
      I = p[4],
      D = p[8],
      C = p[12],
      B = p[1],
      F = p[5],
      J = p[9],
      L = p[13],
      K = p[2],
      H = p[6],
      M = p[10],
      O = p[14],
      R = p[3],
      V = p[7],
      P = p[11],
      p = p[15];
    t[0] = A * N + y * B + z * K + f * R;
    t[4] = A * I + y * F + z * H + f * V;
    t[8] = A * D + y * J + z * M + f * P;
    t[12] = A * C + y * L + z * O + f * p;
    t[1] = h * N + l * B + m * K + w * R;
    t[5] = h * I + l * F + m * H + w * V;
    t[9] = h * D + l * J + m * M + w * P;
    t[13] = h * C + l * L + m * O + w * p;
    t[2] = e * N + G * B + g * K + s * R;
    t[6] = e * I + G * F + g * H + s * V;
    t[10] = e * D + G * J + g * M + s * P;
    t[14] = e * C + G * L + g * O + s * p;
    t[3] = u * N + x * B + q * K + d * R;
    t[7] = u * I + x * F + q * H + d * V;
    t[11] = u * D + x * J + q * M + d * P;
    t[15] = u * C + x * L + q * O + d * p;
    return this;
  },
  multiplyScalar: function (b) {
    var c = this.elements;
    c[0] *= b;
    c[4] *= b;
    c[8] *= b;
    c[12] *= b;
    c[1] *= b;
    c[5] *= b;
    c[9] *= b;
    c[13] *= b;
    c[2] *= b;
    c[6] *= b;
    c[10] *= b;
    c[14] *= b;
    c[3] *= b;
    c[7] *= b;
    c[11] *= b;
    c[15] *= b;
    return this;
  },
  makeTranslation: function (b, c, d) {
    this.set(1, 0, 0, b, 0, 1, 0, c, 0, 0, 1, d, 0, 0, 0, 1);
    return this;
  },
  transpose: function () {
    var b = this.elements,
      c;
    c = b[1];
    b[1] = b[4];
    b[4] = c;
    c = b[2];
    b[2] = b[8];
    b[8] = c;
    c = b[6];
    b[6] = b[9];
    b[9] = c;
    c = b[3];
    b[3] = b[12];
    b[12] = c;
    c = b[7];
    b[7] = b[13];
    b[13] = c;
    c = b[11];
    b[11] = b[14];
    b[14] = c;
    return this;
  },
  getPosition: (function () {
    var b = new $3Dmol.Vector3();
    return function () {
      console.warn(
        "DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead."
      );
      var c = this.elements;
      return b.set(c[12], c[13], c[14]);
    };
  })(),
  setPosition: function (b) {
    var c = this.elements;
    c[12] = b.x;
    c[13] = b.y;
    c[14] = b.z;
    return this;
  },
  getInverse: function (b, c) {
    var d = this.elements,
      p = b.elements,
      t = p[0],
      A = p[4],
      y = p[8],
      z = p[12],
      f = p[1],
      h = p[5],
      l = p[9],
      m = p[13],
      w = p[2],
      e = p[6],
      G = p[10],
      g = p[14],
      s = p[3],
      u = p[7],
      x = p[11],
      q = p[15];
    d[0] =
      l * g * u - m * G * u + m * e * x - h * g * x - l * e * q + h * G * q;
    d[4] =
      z * G * u - y * g * u - z * e * x + A * g * x + y * e * q - A * G * q;
    d[8] =
      y * m * u - z * l * u + z * h * x - A * m * x - y * h * q + A * l * q;
    d[12] =
      z * l * e - y * m * e - z * h * G + A * m * G + y * h * g - A * l * g;
    d[1] =
      m * G * s - l * g * s - m * w * x + f * g * x + l * w * q - f * G * q;
    d[5] =
      y * g * s - z * G * s + z * w * x - t * g * x - y * w * q + t * G * q;
    d[9] =
      z * l * s - y * m * s - z * f * x + t * m * x + y * f * q - t * l * q;
    d[13] =
      y * m * w - z * l * w + z * f * G - t * m * G - y * f * g + t * l * g;
    d[2] =
      h * g * s - m * e * s + m * w * u - f * g * u - h * w * q + f * e * q;
    d[6] =
      z * e * s - A * g * s - z * w * u + t * g * u + A * w * q - t * e * q;
    d[10] =
      A * m * s - z * h * s + z * f * u - t * m * u - A * f * q + t * h * q;
    d[14] =
      z * h * w - A * m * w - z * f * e + t * m * e + A * f * g - t * h * g;
    d[3] =
      l * e * s - h * G * s - l * w * u + f * G * u + h * w * x - f * e * x;
    d[7] =
      A * G * s - y * e * s + y * w * u - t * G * u - A * w * x + t * e * x;
    d[11] =
      y * h * s - A * l * s - y * f * u + t * l * u + A * f * x - t * h * x;
    d[15] =
      A * l * w - y * h * w + y * f * e - t * l * e - A * f * G + t * h * G;
    d = p[0] * d[0] + p[1] * d[4] + p[2] * d[8] + p[3] * d[12];
    if (0 === d) {
      if (c)
        throw Error(
          "Matrix4.getInverse(): can't invert matrix, determinant is 0"
        );
      console.warn(
        "Matrix4.getInverse(): can't invert matrix, determinant is 0"
      );
      this.identity();
      return this;
    }
    this.multiplyScalar(1 / d);
    return this;
  },
  isReflected: function () {
    return 0 > this.matrix3FromTopLeft().getDeterminant();
  },
  compose: (function () {
    var b = new $3Dmol.Matrix4(),
      c = new $3Dmol.Matrix4();
    return function (d, p, t) {
      var A = this.elements;
      b.identity();
      b.setRotationFromQuaternion(p);
      c.makeScale(t.x, t.y, t.z);
      this.multiplyMatrices(b, c);
      A[12] = d.x;
      A[13] = d.y;
      A[14] = d.z;
      return this;
    };
  })(),
  decompose: (function () {
    var b = new $3Dmol.Vector3(),
      c = new $3Dmol.Vector3(),
      d = new $3Dmol.Vector3(),
      p = new $3Dmol.Matrix4();
    return function (t, A, y) {
      var z = this.elements;
      b.set(z[0], z[1], z[2]);
      c.set(z[4], z[5], z[6]);
      d.set(z[8], z[9], z[10]);
      t = t instanceof $3Dmol.Vector3 ? t : new $3Dmol.Vector3();
      A = A instanceof $3Dmol.Quaternion ? A : new $3Dmol.Quaternion();
      y = y instanceof $3Dmol.Vector3 ? y : new $3Dmol.Vector3();
      y.x = b.length();
      y.y = c.length();
      y.z = d.length();
      t.x = z[12];
      t.y = z[13];
      t.z = z[14];
      p.copy(this);
      p.elements[0] /= y.x;
      p.elements[1] /= y.x;
      p.elements[2] /= y.x;
      p.elements[4] /= y.y;
      p.elements[5] /= y.y;
      p.elements[6] /= y.y;
      p.elements[8] /= y.z;
      p.elements[9] /= y.z;
      p.elements[10] /= y.z;
      A.setFromRotationMatrix(p);
      return [t, A, y];
    };
  })(),
  scale: function (b) {
    var c = this.elements,
      d = b.x,
      p = b.y;
    b = b.z;
    c[0] *= d;
    c[4] *= p;
    c[8] *= b;
    c[1] *= d;
    c[5] *= p;
    c[9] *= b;
    c[2] *= d;
    c[6] *= p;
    c[10] *= b;
    c[3] *= d;
    c[7] *= p;
    c[11] *= b;
    return this;
  },
  getMaxScaleOnAxis: function () {
    var b = this.elements;
    return Math.sqrt(
      Math.max(
        b[0] * b[0] + b[1] * b[1] + b[2] * b[2],
        Math.max(
          b[4] * b[4] + b[5] * b[5] + b[6] * b[6],
          b[8] * b[8] + b[9] * b[9] + b[10] * b[10]
        )
      )
    );
  },
  makeFrustum: function (b, c, d, p, t, A) {
    var y = this.elements;
    y[0] = (2 * t) / (c - b);
    y[4] = 0;
    y[8] = (c + b) / (c - b);
    y[12] = 0;
    y[1] = 0;
    y[5] = (2 * t) / (p - d);
    y[9] = (p + d) / (p - d);
    y[13] = 0;
    y[2] = 0;
    y[6] = 0;
    y[10] = -(A + t) / (A - t);
    y[14] = (-2 * A * t) / (A - t);
    y[3] = 0;
    y[7] = 0;
    y[11] = -1;
    y[15] = 0;
    return this;
  },
  makePerspective: function (b, c, d, p) {
    b = d * Math.tan($3Dmol.Math.degToRad(0.5 * b));
    var t = -b;
    return this.makeFrustum(t * c, b * c, t, b, d, p);
  },
  makeOrthographic: function (b, c, d, p, t, A) {
    var y = this.elements,
      z = 1 / (c - b),
      f = 1 / (d - p),
      h = 1 / (A - t);
    y[0] = 2 * z;
    y[4] = 0;
    y[8] = 0;
    y[12] = -((c + b) * z);
    y[1] = 0;
    y[5] = 2 * f;
    y[9] = 0;
    y[13] = -((d + p) * f);
    y[2] = 0;
    y[6] = 0;
    y[10] = -2 * h;
    y[14] = -((A + t) * h);
    y[3] = 0;
    y[7] = 0;
    y[11] = 0;
    y[15] = 1;
    return this;
  },
  isEqual: function (b) {
    b = b.elements;
    var c = this.elements;
    return c[0] == b[0] &&
      c[4] == b[4] &&
      c[8] == b[8] &&
      c[12] == b[12] &&
      c[1] == b[1] &&
      c[5] == b[5] &&
      c[9] == b[9] &&
      c[13] == b[13] &&
      c[2] == b[2] &&
      c[6] == b[6] &&
      c[10] == b[10] &&
      c[14] == b[14] &&
      c[3] == b[3] &&
      c[7] == b[7] &&
      c[11] == b[11] &&
      c[15] == b[15]
      ? !0
      : !1;
  },
  clone: function () {
    var b = this.elements;
    return new $3Dmol.Matrix4(
      b[0],
      b[4],
      b[8],
      b[12],
      b[1],
      b[5],
      b[9],
      b[13],
      b[2],
      b[6],
      b[10],
      b[14],
      b[3],
      b[7],
      b[11],
      b[15]
    );
  },
  isIdentity: function () {
    var b = this.elements;
    return 1 == b[0] &&
      0 == b[4] &&
      0 == b[8] &&
      0 == b[12] &&
      0 == b[1] &&
      1 == b[5] &&
      0 == b[9] &&
      0 == b[13] &&
      0 == b[2] &&
      0 == b[6] &&
      1 == b[10] &&
      0 == b[14] &&
      0 == b[3] &&
      0 == b[7] &&
      0 == b[11] &&
      1 == b[15]
      ? !0
      : !1;
  },
};
$3Dmol.Ray = function (b, c) {
  this.origin = void 0 !== b ? b : new $3Dmol.Vector3();
  this.direction = void 0 !== c ? c : new $3Dmol.Vector3();
};
$3Dmol.Ray.prototype = {
  constructor: $3Dmol.Ray,
  set: function (b, c) {
    this.origin.copy(b);
    this.direction.copy(c);
    return this;
  },
  copy: function (b) {
    this.origin.copy(b.origin);
    this.direction.copy(b.direction);
    return this;
  },
  at: function (b, c) {
    return (c || new $3Dmol.Vector3())
      .copy(this.direction)
      .multiplyScalar(b)
      .add(this.origin);
  },
  recast: (function () {
    var b = new $3Dmol.Vector3();
    return function (c) {
      this.origin.copy(this.at(c, b));
      return this;
    };
  })(),
  closestPointToPoint: function (b, c) {
    var d = c || new $3Dmol.Vector3();
    d.subVectors(b, this.origin);
    var p = d.dot(this.direction);
    return d.copy(this.direction).multiplyScalar(p).add(this.origin);
  },
  distanceToPoint: (function (b) {
    var c = new $3Dmol.Vector3();
    return function (b) {
      var p = c.subVectors(b, this.origin).dot(this.direction);
      c.copy(this.direction).multiplyScalar(p).add(this.origin);
      return c.distanceTo(b);
    };
  })(),
  isIntersectionCylinder: function () {},
  isIntersectionSphere: function (b) {
    return this.distanceToPoint(b.center) <= b.radius;
  },
  isIntersectionPlane: function (b) {
    return 0 !== b.normal.dot(this.direction) ||
      0 === b.distanceToPoint(this.origin)
      ? !0
      : !1;
  },
  distanceToPlane: function (b) {
    var c = b.normal.dot(this.direction);
    if (0 === c) {
      if (0 === b.distanceToPoint(this.origin)) return 0;
    } else return -(this.origin.dot(b.normal) + b.constant) / c;
  },
  intersectPlane: function (b, c) {
    var d = this.distanceToPlane(b);
    return void 0 === d ? void 0 : this.at(d, c);
  },
  applyMatrix4: function (b) {
    this.direction.add(this.origin).applyMatrix4(b);
    this.origin.applyMatrix4(b);
    this.direction.sub(this.origin);
    return this;
  },
  equals: function (b) {
    return b.origin.equals(this.origin) && b.direction.equals(this.direction);
  },
  clone: function () {
    return new $3Dmol.Ray().copy(this);
  },
};
$3Dmol.Sphere = function (b, c) {
  this.center = void 0 !== b ? b : new $3Dmol.Vector3();
  this.radius = void 0 !== c ? c : 0;
};
$3Dmol.Sphere.prototype = {
  constructor: $3Dmol.Sphere,
  set: function (b, c) {
    this.center.copy(b);
    this.radius = c;
    return this;
  },
  copy: function (b) {
    this.center.copy(b.center);
    this.radius = b.radius;
    return this;
  },
  applyMatrix4: function (b) {
    this.center.applyMatrix4(b);
    this.radius *= b.getMaxScaleOnAxis();
    return this;
  },
  translate: function (b) {
    this.center.add(b);
    return this;
  },
  equals: function (b) {
    return b.center.equals(this.center) && b.radius === this.radius;
  },
  clone: function () {
    return new $3Dmol.Sphere().copy(this);
  },
};
$3Dmol.Cylinder = function (b, c, d) {
  this.c1 = void 0 !== b ? b : new $3Dmol.Vector3();
  this.c2 = void 0 !== c ? c : new $3Dmol.Vector3();
  this.direction = new $3Dmol.Vector3()
    .subVectors(this.c2, this.c1)
    .normalize();
  this.radius = void 0 !== d ? d : 0;
};
$3Dmol.Cylinder.prototype = {
  constructor: $3Dmol.Cylinder,
  copy: function (b) {
    this.c1.copy(b.c1);
    this.c2.copy(b.c2);
    this.direction.copy(b.direction);
    this.radius = b.radius;
    return this;
  },
  lengthSq: (function () {
    var b = new $3Dmol.Vector3();
    return function () {
      return b.subVectors(this.c2, this.c1).lengthSq();
    };
  })(),
  applyMatrix4: function (b) {
    this.direction.add(this.c1).applyMatrix4(b);
    this.c1.applyMatrix4(b);
    this.c2.applyMatrix4(b);
    this.direction.sub(this.c1).normalize();
    this.radius *= b.getMaxScaleOnAxis();
    return this;
  },
};
$3Dmol.Triangle = function (b, c, d) {
  this.a = void 0 !== b ? b : new $3Dmol.Vector3();
  this.b = void 0 !== c ? c : new $3Dmol.Vector3();
  this.c = void 0 !== d ? d : new $3Dmol.Vector3();
};
$3Dmol.Triangle.prototype = {
  constructor: $3Dmol.Triangle,
  copy: function (b) {
    this.a.copy(b.a);
    this.b.copy(b.b);
    this.c.copy(b.c);
    return this;
  },
  applyMatrix4: function (b) {
    this.a.applyMatrix4(b);
    this.b.applyMatrix4(b);
    this.c.applyMatrix4(b);
    return this;
  },
  getNormal: (function () {
    var b = new $3Dmol.Vector3();
    return function () {
      var c = this.a.clone();
      c.sub(this.b);
      b.subVectors(this.c, this.b);
      c.cross(b);
      c.normalize();
      return c;
    };
  })(),
};
$3Dmol.EventDispatcher = function () {
  var b = {};
  this.addEventListener = function (c, d) {
    void 0 === b[c] && (b[c] = []);
    -1 === b[c].indexOf(d) && b[c].push(d);
  };
  this.removeEventListener = function (c, d) {
    var p = b[c].indexOf(d);
    -1 !== p && b[c].splice(p, 1);
  };
  this.dispatchEvent = function (c) {
    var d = b[c.type];
    if (void 0 !== d) {
      c.target = this;
      for (var p = 0, t = d.length; p < t; p++) d[p].call(this, c);
    }
  };
};
$3Dmol.Color = function (b) {
  return 1 < arguments.length
    ? ((this.r = arguments[0] || 0),
      (this.g = arguments[1] || 0),
      (this.b = arguments[2] || 0),
      this)
    : this.set(b);
};
$3Dmol.Color.prototype = {
  constructor: $3Dmol.Color,
  r: 0,
  g: 0,
  b: 0,
  set: function (b) {
    if (b instanceof $3Dmol.Color) return b.clone();
    "number" === typeof b
      ? this.setHex(b)
      : "object" === typeof b &&
        "r" in b &&
        "g" in b &&
        "b" in b &&
        ((this.r = b.r), (this.g = b.g), (this.b = b.b));
  },
  setHex: function (b) {
    b = Math.floor(b);
    this.r = ((b >> 16) & 255) / 255;
    this.g = ((b >> 8) & 255) / 255;
    this.b = (b & 255) / 255;
    return this;
  },
  getHex: function () {
    var b = Math.round(255 * this.r),
      c = Math.round(255 * this.g),
      d = Math.round(255 * this.b);
    return (b << 16) | (c << 8) | d;
  },
  clone: function () {
    return new $3Dmol.Color(this.r, this.g, this.b);
  },
  copy: function (b) {
    this.r = b.r;
    this.g = b.g;
    this.b = b.b;
    return this;
  },
  scaled: function () {
    var b = {};
    b.r = Math.round(255 * this.r);
    b.g = Math.round(255 * this.g);
    b.b = Math.round(255 * this.b);
    b.a = 1;
    return b;
  },
};
$3Dmol.Object3D = function () {
  this.id = $3Dmol.Object3DIDCount++;
  this.name = "";
  this.parent = void 0;
  this.children = [];
  this.position = new $3Dmol.Vector3();
  this.rotation = new $3Dmol.Vector3();
  this.matrix = new $3Dmol.Matrix4();
  this.matrixWorld = new $3Dmol.Matrix4();
  this.quaternion = new $3Dmol.Quaternion();
  this.eulerOrder = "XYZ";
  this.up = new $3Dmol.Vector3(0, 1, 0);
  this.scale = new $3Dmol.Vector3(1, 1, 1);
  this.rotationAutoUpdate =
    this.matrixWorldNeedsUpdate =
    this.matrixAutoUpdate =
      !0;
  this.useQuaternion = !1;
  this.visible = !0;
};
$3Dmol.Object3D.prototype = {
  constructor: $3Dmol.Object3D,
  lookAt: function (b) {
    this.matrix.lookAt(b, this.position, this.up);
    this.rotationAutoUpdate &&
      (!0 === this.useQuaternion
        ? this.quaternion.copy(this.matrix.decompose()[1])
        : this.rotation.setEulerFromRotationMatrix(
            this.matrix,
            this.eulerOrder
          ));
  },
  add: function (b) {
    if (b === this) console.error("Can't add $3Dmol.Object3D to itself");
    else {
      b.parent = this;
      this.children.push(b);
      for (var c = this; void 0 !== c.parent; ) c = c.parent;
      void 0 !== c && c instanceof $3Dmol.Scene && c.__addObject(b);
    }
  },
  remove: function (b) {
    var c = this.children.indexOf(b);
    if (-1 !== c) {
      b.parent = void 0;
      this.children.splice(c, 1);
      for (c = this; void 0 !== c.parent; ) c = c.parent;
      void 0 !== c && c instanceof $3Dmol.Scene && c.__removeObject(b);
    }
  },
  updateMatrix: function () {
    this.matrix.setPosition(this.position);
    !1 === this.useQuaternion
      ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder)
      : this.matrix.setRotationFromQuaternion(this.quaternion);
    (1 === this.scale.x && 1 === this.scale.y && 1 === this.scale.z) ||
      this.matrix.scale(this.scale);
    this.matrixWorldNeedsUpdate = !0;
  },
  updateMatrixWorld: function (b) {
    !0 === this.matrixAutoUpdate && this.updateMatrix();
    if (!0 === this.matrixWorldNeedsUpdate || !0 === b)
      void 0 === this.parent
        ? this.matrixWorld.copy(this.matrix)
        : this.matrixWorld.multiplyMatrices(
            this.parent.matrixWorld,
            this.matrix
          );
    this.matrixWorldNeedsUpdate = !1;
    for (b = 0; b < this.children.length; b++)
      this.children[b].updateMatrixWorld(!0);
  },
  clone: function (b) {
    void 0 === b && (b = new $3Dmol.Object3D());
    b.name = this.name;
    b.up.copy(this.up);
    b.position.copy(this.position);
    b.rotation.copy(this.rotation);
    b.eulerOrder = this.eulerOrder;
    b.scale.copy(this.scale);
    b.rotationAutoUpdate = this.rotationAutoUpdate;
    b.matrix.copy(this.matrix);
    b.matrixWorld.copy(this.matrixWorld);
    b.quaternion.copy(this.quaternion);
    b.matrixAutoUpdate = this.matrixAutoUpdate;
    b.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
    b.useQuaternion = this.useQuaternion;
    b.visible = this.visible;
    for (var c = 0; c < this.children.length; c++)
      b.add(this.children[c].clone());
    return b;
  },
  setVisible: function (b) {
    this.visible = b;
    for (var c = 0; c < this.children.length; c++)
      this.children[c].setVisible(b);
  },
};
$3Dmol.Object3DIDCount = 0;
$3Dmol.Geometry = (function () {
  var b = function (b) {
    this.id = b || 0;
    this.lineArray =
      this.radiusArray =
      this.faceArray =
      this.normalArray =
      this.colorArray =
      this.vertexArray =
        null;
    this.lineidx = this.faceidx = this.vertices = 0;
  };
  b.prototype.getNumVertices = function () {
    return this.vertices;
  };
  b.prototype.getVertices = function () {
    return this.vertexArray;
  };
  b.prototype.getCentroid = function () {
    for (var b = new $3Dmol.Vector3(), c, d, y, z = 0; z < this.vertices; ++z)
      (c = 3 * z),
        (d = this.vertexArray[c]),
        (y = this.vertexArray[c + 1]),
        (c = this.vertexArray[c + 2]),
        (b.x += d),
        (b.y += y),
        (b.z += c);
    b.divideScalar(this.vertices);
    return b;
  };
  b.prototype.setNormals = function () {
    var b = this.faceArray,
      c = this.vertexArray,
      d = this.normalArray;
    if (this.vertices && this.faceidx)
      for (var y, z, f, h, l, m, w = 0; w < b.length / 3; ++w)
        (y = 3 * b[3 * w]),
          (z = 3 * b[3 * w + 1]),
          (f = 3 * b[3 * w + 2]),
          (h = new $3Dmol.Vector3(c[y], c[y + 1], c[y + 2])),
          (l = new $3Dmol.Vector3(c[z], c[z + 1], c[z + 2])),
          (m = new $3Dmol.Vector3(c[f], c[f + 1], c[f + 2])),
          h.subVectors(h, l),
          m.subVectors(m, l),
          m.cross(h),
          (h = m),
          h.normalize(),
          (d[y] += h.x),
          (d[z] += h.x),
          (d[f] += h.x),
          (d[y + 1] += h.y),
          (d[z + 1] += h.y),
          (d[f + 1] += h.y),
          (d[y + 2] += h.z),
          (d[z + 2] += h.z),
          (d[f + 2] += h.z);
  };
  b.prototype.setLineIndices = function () {
    if (this.faceidx) {
      var b = this.faceArray,
        c = (this.lineArray = new Uint16Array(2 * this.faceidx));
      this.lineidx = 2 * this.faceidx;
      for (var d, y = 0; y < this.faceidx / 3; ++y) {
        d = 3 * y;
        lineoffset = 2 * d;
        var z = b[d],
          f = b[d + 1];
        d = b[d + 2];
        c[lineoffset] = z;
        c[lineoffset + 1] = f;
        c[lineoffset + 2] = z;
        c[lineoffset + 3] = d;
        c[lineoffset + 4] = f;
        c[lineoffset + 5] = d;
      }
    }
  };
  b.prototype.truncateArrayBuffers = function (b, c) {
    b = !0 === b ? !0 : !1;
    var d = this.colorArray,
      y = this.normalArray,
      z = this.faceArray,
      f = this.lineArray,
      h = this.radiusArray;
    this.vertexArray = this.vertexArray.subarray(0, 3 * this.vertices);
    this.colorArray = d.subarray(0, 3 * this.vertices);
    b
      ? ((this.normalArray = y.subarray(0, 3 * this.vertices)),
        (this.faceArray = z.subarray(0, this.faceidx)),
        (this.lineArray =
          0 < this.lineidx ? f.subarray(0, this.lineidx) : new Uint16Array()))
      : ((this.normalArray = new Float32Array()),
        (this.faceArray = new Uint16Array()),
        (this.lineArray = new Uint16Array()));
    h && (this.radiusArray = h.subarray(0, this.vertices));
    c &&
      (this.normalArray &&
        (this.normalArray = new Float32Array(this.normalArray)),
      this.faceArray && (this.faceArray = new Uint16Array(this.faceArray)),
      this.lineArray && (this.lineArray = new Uint16Array(this.lineArray)),
      this.vertexArray &&
        (this.vertexArray = new Float32Array(this.vertexArray)),
      this.colorArray && (this.colorArray = new Float32Array(this.colorArray)),
      this.radiusArray &&
        (this.radiusArray = new Float32Array(this.radiusArray)));
    this.__inittedArrays = !0;
  };
  var c = function (c) {
      var d = new b(c.geometryGroups.length);
      c.geometryGroups.push(d);
      c.groups = c.geometryGroups.length;
      d.vertexArray = new Float32Array(196605);
      d.colorArray = new Float32Array(196605);
      c.mesh &&
        ((d.normalArray = new Float32Array(196605)),
        (d.faceArray = new Uint16Array(393210)),
        (d.lineArray = new Uint16Array(393210)));
      c.radii && (d.radiusArray = new Float32Array(65535));
      d.useOffset = c.offset;
      return d;
    },
    d = function (b, c, d) {
      $3Dmol.EventDispatcher.call(this);
      this.id = $3Dmol.GeometryIDCount++;
      this.name = "";
      this.hasTangents = !1;
      this.dynamic = !0;
      this.mesh = !0 === b ? !0 : !1;
      this.radii = c || !1;
      this.offset = d || !1;
      this.buffersNeedUpdate =
        this.colorsNeedUpdate =
        this.normalsNeedUpdate =
        this.elementsNeedUpdate =
        this.verticesNeedUpdate =
          !1;
      this.geometryGroups = [];
      this.groups = 0;
    };
  d.prototype = {
    constructor: d,
    updateGeoGroup: function (b) {
      var d = 0 < this.groups ? this.geometryGroups[this.groups - 1] : null;
      if (!d || d.vertices + (b || 0) > d.vertexArray.length / 3) d = c(this);
      return d;
    },
    addGeoGroup: function () {
      return c(this);
    },
    setUpNormals: function (b) {
      b = b || !1;
      for (var c = 0; c < this.groups; c++)
        this.geometryGroups[c].setNormals(b);
    },
    setUpWireframe: function () {
      for (var b = 0; b < this.groups; b++)
        this.geometryGroups[b].setLineIndices();
    },
    initTypedArrays: function () {
      for (var b = 0; b < this.groups; b++) {
        var c = this.geometryGroups[b];
        !0 !== c.__inittedArrays && c.truncateArrayBuffers(this.mesh, !1);
      }
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  };
  return d;
})();
Object.defineProperty($3Dmol.Geometry.prototype, "vertices", {
  get: function () {
    for (var b = 0, c = 0; c < this.groups; c++)
      b += this.geometryGroups[c].vertices;
    return b;
  },
});
$3Dmol.GeometryIDCount = 0;
$3Dmol.Raycaster = (function () {
  var b = function (b, c, l, f) {
      this.ray = new $3Dmol.Ray(b, c);
      0 < this.ray.direction.lengthSq() && this.ray.direction.normalize();
      this.near = f || 0;
      this.far = l || Infinity;
    },
    c = new $3Dmol.Sphere(),
    d = new $3Dmol.Cylinder(),
    p = new $3Dmol.Triangle(),
    t = new $3Dmol.Vector3(),
    A = new $3Dmol.Vector3(),
    y = new $3Dmol.Vector3(),
    z = new $3Dmol.Vector3();
  new $3Dmol.Ray();
  new $3Dmol.Vector3();
  var f = new $3Dmol.Vector3();
  new $3Dmol.Matrix4();
  var h = function (b, c) {
      return b.distance - c.distance;
    },
    l = function (b) {
      return Math.min(Math.max(b, -1), 1);
    };
  b.prototype.precision = 1e-4;
  b.prototype.linePrecision = 0.2;
  b.prototype.set = function (b, c) {
    this.ray.set(b, c);
  };
  b.prototype.intersectObjects = function (b, w) {
    for (var e = [], G = 0, g = w.length; G < g; G++)
      a: {
        var s = b,
          u = w[G],
          x = e;
        f.getPositionFromMatrix(s.matrixWorld);
        if (!0 === u.clickable && void 0 !== u.intersectionShape) {
          var q = u.intersectionShape,
            N = this.linePrecision,
            N = N * s.matrixWorld.getMaxScaleOnAxis(),
            N = N * N;
          if (
            void 0 !== u.boundingSphere &&
            u.boundingSphere instanceof $3Dmol.Sphere &&
            (c.copy(u.boundingSphere),
            c.applyMatrix4(s.matrixWorld),
            !this.ray.isIntersectionSphere(c))
          )
            break a;
          for (
            var I = void 0,
              D = void 0,
              C = void 0,
              B = void 0,
              F = (C = void 0),
              J = void 0,
              L = void 0,
              K = void 0,
              H = void 0,
              M = (H = F = B = void 0),
              I = 0,
              D = q.triangle.length;
            I < D;
            I++
          )
            q.triangle[I] instanceof $3Dmol.Triangle &&
              (p.copy(q.triangle[I]),
              p.applyMatrix4(s.matrixWorld),
              (C = p.getNormal()),
              (B = this.ray.direction.dot(C)),
              0 <= B ||
                (t.subVectors(p.a, this.ray.origin),
                (J = C.dot(t) / B),
                0 > J ||
                  (A.copy(this.ray.direction)
                    .multiplyScalar(J)
                    .add(this.ray.origin),
                  A.sub(p.a),
                  y.copy(p.b).sub(p.a),
                  z.copy(p.c).sub(p.a),
                  (B = y.dot(z)),
                  (C = y.lengthSq()),
                  (F = z.lengthSq()),
                  (F = (C * A.dot(z) - B * A.dot(y)) / (C * F - B * B)),
                  0 > F ||
                    1 < F ||
                    ((B = (A.dot(y) - F * B) / C),
                    0 > B ||
                      1 < B ||
                      1 < B + F ||
                      x.push({ clickable: u, distance: J })))));
          I = 0;
          for (D = q.cylinder.length; I < D; I++)
            q.cylinder[I] instanceof $3Dmol.Cylinder &&
              (d.copy(q.cylinder[I]),
              d.applyMatrix4(s.matrixWorld),
              t.subVectors(d.c1, this.ray.origin),
              (C = t.dot(d.direction)),
              (F = t.dot(this.ray.direction)),
              (B = l(this.ray.direction.dot(d.direction))),
              (K = 1 - B * B),
              0 !== K &&
                ((H = (B * F - C) / K),
                (M = (F - B * C) / K),
                A.copy(d.direction).multiplyScalar(H).add(d.c1),
                y
                  .copy(this.ray.direction)
                  .multiplyScalar(M)
                  .add(this.ray.origin),
                (L = z.subVectors(A, y).lengthSq()),
                (H = d.radius * d.radius),
                L <= H &&
                  ((H =
                    (B * C - F) * (B * C - F) - K * (t.lengthSq() - C * C - H)),
                  (F =
                    0 >= H
                      ? (J = Math.sqrt(L))
                      : (J = (F - B * C - Math.sqrt(H)) / K)),
                  (B = B * F - C),
                  0 > B ||
                    B * B > d.lengthSq() ||
                    0 > F ||
                    x.push({ clickable: u, distance: J }))));
          I = 0;
          for (D = q.line.length; I < D; I += 2)
            A.copy(q.line[I]),
              A.applyMatrix4(s.matrixWorld),
              y.copy(q.line[I + 1]),
              y.applyMatrix4(s.matrixWorld),
              z.subVectors(y, A),
              (J = z.lengthSq()),
              z.normalize(),
              t.subVectors(A, this.ray.origin),
              (lineProj = t.dot(z)),
              (F = t.dot(this.ray.direction)),
              (B = l(this.ray.direction.dot(z))),
              (K = 1 - B * B),
              0 !== K &&
                ((H = (B * F - lineProj) / K),
                (M = (F - B * lineProj) / K),
                A.add(z.multiplyScalar(H)),
                y
                  .copy(this.ray.direction)
                  .multiplyScalar(M)
                  .add(this.ray.origin),
                (L = z.subVectors(y, A).lengthSq()),
                L < N && H * H < J && x.push({ clickable: u, distance: M }));
          I = 0;
          for (D = q.sphere.length; I < D; I++)
            if (
              q.sphere[I] instanceof $3Dmol.Sphere &&
              (c.copy(q.sphere[I]),
              c.applyMatrix4(s.matrixWorld),
              this.ray.isIntersectionSphere(c))
            ) {
              A.subVectors(c.center, this.ray.origin);
              s = A.dot(this.ray.direction);
              H = s * s - (A.lengthSq() - c.radius * c.radius);
              if (0 > s) break a;
              J = 0 >= H ? s : s - Math.sqrt(H);
              x.push({ clickable: u, distance: J });
              break a;
            }
        }
      }
    e.sort(h);
    return e;
  };
  return b;
})();
$3Dmol.Projector = function () {
  new $3Dmol.Matrix4();
  var b = new $3Dmol.Matrix4();
  this.projectVector = function (c, d) {
    d.matrixWorldInverse.getInverse(d.matrixWorld);
    b.multiplyMatrices(d.projectionMatrix, d.matrixWorldInverse);
    return c.applyProjection(b);
  };
  this.unprojectVector = function (c, d) {
    d.projectionMatrixInverse.getInverse(d.projectionMatrix);
    b.multiplyMatrices(d.matrixWorld, d.projectionMatrixInverse);
    return c.applyProjection(b);
  };
};
$3Dmol.Camera = function (b, c, d, p, t) {
  $3Dmol.Object3D.call(this);
  this.fov = void 0 !== b ? b : 50;
  this.aspect = void 0 !== c ? c : 1;
  this.near = void 0 !== d ? d : 0.1;
  this.far = void 0 !== p ? p : 2e3;
  this.projectionMatrix = new $3Dmol.Matrix4();
  this.projectionMatrixInverse = new $3Dmol.Matrix4();
  this.matrixWorldInverse = new $3Dmol.Matrix4();
  this.right = this.position.z * Math.tan((Math.PI / 180) * b);
  this.left = -this.right;
  this.top = this.right / this.aspect;
  this.bottom = -this.top;
  this.ortho = !!t;
  this.updateProjectionMatrix();
};
$3Dmol.Camera.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Camera.prototype.lookAt = function (b) {
  this.matrix.lookAt(this.position, b, this.up);
  this.rotationAutoUpdate &&
    (!1 === this.useQuaternion
      ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder)
      : this.quaternion.copy(this.matrix.decompose()[1]));
};
$3Dmol.Camera.prototype.updateProjectionMatrix = function () {
  this.ortho
    ? this.projectionMatrix.makeOrthographic(
        this.left,
        this.right,
        this.top,
        this.bottom,
        this.near,
        this.far
      )
    : this.projectionMatrix.makePerspective(
        this.fov,
        this.aspect,
        this.near,
        this.far
      );
  this.projectionMatrixInverse.getInverse(this.projectionMatrix);
};
$3Dmol.SpritePlugin = function () {
  function b(b, c) {
    return b.z !== c.z ? c.z - b.z : c.id - b.id;
  }
  var c, d, p, t, A, y, z, f, h, l;
  this.init = function (b) {
    c = b.context;
    d = b;
    p = b.getPrecision();
    t = new Float32Array(16);
    A = new Uint16Array(6);
    b = 0;
    t[b++] = -1;
    t[b++] = -1;
    t[b++] = 0;
    t[b++] = 0;
    t[b++] = 1;
    t[b++] = -1;
    t[b++] = 1;
    t[b++] = 0;
    t[b++] = 1;
    t[b++] = 1;
    t[b++] = 1;
    t[b++] = 1;
    t[b++] = -1;
    t[b++] = 1;
    t[b++] = 0;
    t[b++] = 1;
    b = 0;
    A[b++] = 0;
    A[b++] = 1;
    A[b++] = 2;
    A[b++] = 0;
    A[b++] = 2;
    A[b++] = 3;
    y = c.createBuffer();
    z = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, y);
    c.bufferData(c.ARRAY_BUFFER, t, c.STATIC_DRAW);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, z);
    c.bufferData(c.ELEMENT_ARRAY_BUFFER, A, c.STATIC_DRAW);
    b = $3Dmol.ShaderLib.sprite;
    var w = p,
      e = c.createProgram(),
      G = c.createShader(c.FRAGMENT_SHADER),
      g = c.createShader(c.VERTEX_SHADER),
      w = "precision " + w + " float;\n";
    c.shaderSource(G, w + b.fragmentShader);
    c.shaderSource(g, w + b.vertexShader);
    c.compileShader(G);
    c.compileShader(g);
    c.getShaderParameter(G, c.COMPILE_STATUS) &&
    c.getShaderParameter(g, c.COMPILE_STATUS)
      ? (c.attachShader(e, G),
        c.attachShader(e, g),
        c.linkProgram(e),
        c.getProgramParameter(e, c.LINK_STATUS) ||
          console.error("Could not initialize shader"),
        (b = e))
      : (console.error(c.getShaderInfoLog(G)),
        console.error("could not initialize shader"),
        (b = null));
    f = b;
    h = {};
    l = {};
    h.position = c.getAttribLocation(f, "position");
    h.uv = c.getAttribLocation(f, "uv");
    l.uvOffset = c.getUniformLocation(f, "uvOffset");
    l.uvScale = c.getUniformLocation(f, "uvScale");
    l.rotation = c.getUniformLocation(f, "rotation");
    l.scale = c.getUniformLocation(f, "scale");
    l.alignment = c.getUniformLocation(f, "alignment");
    l.color = c.getUniformLocation(f, "color");
    l.map = c.getUniformLocation(f, "map");
    l.opacity = c.getUniformLocation(f, "opacity");
    l.useScreenCoordinates = c.getUniformLocation(f, "useScreenCoordinates");
    l.screenPosition = c.getUniformLocation(f, "screenPosition");
    l.modelViewMatrix = c.getUniformLocation(f, "modelViewMatrix");
    l.projectionMatrix = c.getUniformLocation(f, "projectionMatrix");
    l.fogType = c.getUniformLocation(f, "fogType");
    l.fogDensity = c.getUniformLocation(f, "fogDensity");
    l.fogNear = c.getUniformLocation(f, "fogNear");
    l.fogFar = c.getUniformLocation(f, "fogFar");
    l.fogColor = c.getUniformLocation(f, "fogColor");
    l.alphaTest = c.getUniformLocation(f, "alphaTest");
  };
  this.render = function (m, w, e, G) {
    var g = m.__webglSprites,
      s = g.length;
    if (s) {
      var u = h,
        x = l,
        q = 0.5 * e,
        t = 0.5 * G;
      c.useProgram(f);
      c.enableVertexAttribArray(u.position);
      c.enableVertexAttribArray(u.uv);
      c.disable(c.CULL_FACE);
      c.enable(c.BLEND);
      c.bindBuffer(c.ARRAY_BUFFER, y);
      c.vertexAttribPointer(u.position, 2, c.FLOAT, !1, 16, 0);
      c.vertexAttribPointer(u.uv, 2, c.FLOAT, !1, 16, 8);
      c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, z);
      c.uniformMatrix4fv(x.projectionMatrix, !1, w.projectionMatrix.elements);
      c.activeTexture(c.TEXTURE0);
      c.uniform1i(x.map, 0);
      var p = (u = 0);
      (u = m.fog)
        ? (c.uniform3f(x.fogColor, u.color.r, u.color.g, u.color.b),
          c.uniform1f(x.fogNear, u.near),
          c.uniform1f(x.fogFar, u.far),
          c.uniform1i(x.fogType, 1),
          (p = u = 1))
        : (c.uniform1i(x.fogType, 0), (p = u = 0));
      var D,
        C,
        B,
        F = [];
      for (D = 0; D < s; D++)
        (C = g[D]),
          (B = C.material),
          C.visible &&
            0 !== B.opacity &&
            (B.useScreenCoordinates
              ? (C.z = -C.position.z)
              : (C._modelViewMatrix.multiplyMatrices(
                  w.matrixWorldInverse,
                  C.matrixWorld
                ),
                (C.z = -C._modelViewMatrix.elements[14])));
      g.sort(b);
      for (D = 0; D < s; D++)
        (C = g[D]),
          (B = C.material),
          C.visible &&
            0 !== B.opacity &&
            B.map &&
            B.map.image &&
            B.map.image.width &&
            (c.uniform1f(x.alphaTest, B.alphaTest),
            (w = B.map.image.height),
            (F[0] = (B.map.image.width * d.devicePixelRatio) / e),
            (F[1] = (w * d.devicePixelRatio) / G),
            !0 === B.useScreenCoordinates
              ? (c.uniform1i(x.useScreenCoordinates, 1),
                c.uniform3f(
                  x.screenPosition,
                  (C.position.x * d.devicePixelRatio - q) / q,
                  (t - C.position.y * d.devicePixelRatio) / t,
                  Math.max(0, Math.min(1, C.position.z))
                ))
              : (c.uniform1i(x.useScreenCoordinates, 0),
                c.uniformMatrix4fv(
                  x.modelViewMatrix,
                  !1,
                  C._modelViewMatrix.elements
                )),
            (w = m.fog && B.fog ? p : 0),
            u !== w && (c.uniform1i(x.fogType, w), (u = w)),
            (w = 1 / (B.scaleByViewport ? G : 1)),
            (F[0] = F[0] * w * C.scale.x),
            (F[1] = F[1] * w * C.scale.y),
            c.uniform2f(x.uvScale, B.uvScale.x, B.uvScale.y),
            c.uniform2f(x.uvOffset, B.uvOffset.x, B.uvOffset.y),
            c.uniform2f(x.alignment, B.alignment.x, B.alignment.y),
            c.uniform1f(x.opacity, B.opacity),
            c.uniform3f(x.color, B.color.r, B.color.g, B.color.b),
            c.uniform1f(x.rotation, C.rotation),
            c.uniform2fv(x.scale, F),
            d.setDepthTest(B.depthTest),
            d.setDepthWrite(B.depthWrite),
            d.setTexture(B.map, 0),
            c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0));
      c.enable(c.CULL_FACE);
    }
  };
};
$3Dmol.Light = function (b, c) {
  $3Dmol.Object3D.call(this);
  this.color = new $3Dmol.Color(b);
  this.position = new $3Dmol.Vector3(0, 1, 0);
  this.target = new $3Dmol.Object3D();
  this.intensity = void 0 !== c ? c : 1;
  this.onlyShadow = this.castShadow = !1;
};
$3Dmol.Light.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Material = function () {
  $3Dmol.EventDispatcher.call(this);
  this.id = $3Dmol.MaterialIdCount++;
  this.name = "";
  this.side = $3Dmol.FrontSide;
  this.opacity = 1;
  this.transparent = !1;
  this.stencilTest = this.depthWrite = this.depthTest = !0;
  this.polygonOffset = !1;
  this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
  this.needsUpdate = this.visible = !0;
};
$3Dmol.Material.prototype.setValues = function (b) {
  if (void 0 !== b)
    for (var c in b) {
      var d = b[c];
      if (void 0 === d)
        console.warn("$3Dmol.Material: '" + c + "' parameter is undefined.");
      else if (c in this) {
        var p = this[c];
        p instanceof $3Dmol.Color && d instanceof $3Dmol.Color
          ? p.copy(d)
          : p instanceof $3Dmol.Color
          ? p.set(d)
          : p instanceof $3Dmol.Vector3 && d instanceof $3Dmol.Vector3
          ? p.copy(d)
          : (this[c] = d);
      }
    }
};
$3Dmol.Material.prototype.clone = function (b) {
  void 0 === b && (b = new $3Dmol.Material());
  b.name = this.name;
  b.side = this.side;
  b.opacity = this.opacity;
  b.transparent = this.transparent;
  b.depthTest = this.depthTest;
  b.depthWrite = this.depthWrite;
  b.stencilTest = this.stencilTest;
  b.polygonOffset = this.polygonOffset;
  b.polygonOffsetFactor = this.polygonOffsetFactor;
  b.polygonOffsetUnits = this.polygonOffsetUnits;
  b.alphaTest = this.alphaTest;
  b.overdraw = this.overdraw;
  b.visible = this.visible;
  return b;
};
$3Dmol.Material.prototype.dispose = function () {
  this.dispatchEvent({ type: "dispose" });
};
$3Dmol.MaterialIdCount = 0;
$3Dmol.LineBasicMaterial = function (b) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.linewidth = 1;
  this.linejoin = this.linecap = "round";
  this.vertexColors = !1;
  this.fog = !0;
  this.shaderID = "basic";
  this.setValues(b);
};
$3Dmol.LineBasicMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.LineBasicMaterial.prototype.clone = function () {
  var b = new $3Dmol.LineBasicMaterial();
  $3Dmol.Material.prototype.clone.call(this, b);
  b.color.copy(this.color);
  return b;
};
$3Dmol.MeshLambertMaterial = function (b) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.ambient = new $3Dmol.Color(1048575);
  this.emissive = new $3Dmol.Color(0);
  this.wrapAround = !1;
  this.wrapRGB = new $3Dmol.Vector3(1, 1, 1);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.shading = $3Dmol.SmoothShading;
  this.shaderID = "lambert";
  this.vertexColors = $3Dmol.NoColors;
  this.skinning = !1;
  this.setValues(b);
};
$3Dmol.MeshLambertMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.MeshLambertMaterial.prototype.clone = function (b) {
  "undefined" === typeof b && (b = new $3Dmol.MeshLambertMaterial());
  $3Dmol.Material.prototype.clone.call(this, b);
  b.color.copy(this.color);
  b.ambient.copy(this.ambient);
  b.emissive.copy(this.emissive);
  b.wrapAround = this.wrapAround;
  b.wrapRGB.copy(this.wrapRGB);
  b.map = this.map;
  b.lightMap = this.lightMap;
  b.specularMap = this.specularMap;
  b.envMap = this.envMap;
  b.combine = this.combine;
  b.reflectivity = this.reflectivity;
  b.refractionRatio = this.refractionRatio;
  b.fog = this.fog;
  b.shading = this.shading;
  b.shaderID = this.shaderID;
  b.vertexColors = this.vertexColors;
  b.skinning = this.skinning;
  b.morphTargets = this.morphTargets;
  b.morphNormals = this.morphNormals;
  return b;
};
$3Dmol.MeshDoubleLambertMaterial = function (b) {
  $3Dmol.MeshLambertMaterial.call(this, b);
  this.shaderID = "lambertdouble";
  this.side = $3Dmol.DoubleSide;
};
$3Dmol.MeshDoubleLambertMaterial.prototype = Object.create(
  $3Dmol.MeshLambertMaterial.prototype
);
$3Dmol.MeshDoubleLambertMaterial.prototype.clone = function () {
  var b = new $3Dmol.MeshDoubleLambertMaterial();
  $3Dmol.MeshLambertMaterial.prototype.clone.call(this, b);
  return b;
};
$3Dmol.MeshOutlineMaterial = function (b) {
  $3Dmol.Material.call(this);
  b = b || {};
  this.fog = !0;
  this.shaderID = "outline";
  this.wireframe = !1;
  this.outlineColor = b.color || new $3Dmol.Color(0, 0, 0);
  this.outlineWidth = b.width || 0.1;
  this.outlinePushback = b.pushback || 1;
};
$3Dmol.MeshOutlineMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.MeshOutlineMaterial.prototype.clone = function (b) {
  "undefined" === typeof b && (b = new $3Dmol.MeshOutlineMaterial());
  $3Dmol.Material.prototype.clone.call(this, b);
  b.fog = this.fog;
  b.shaderID = this.shaderID;
  b.wireframe = this.wireframe;
  return b;
};
$3Dmol.ImposterMaterial = function (b) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.ambient = new $3Dmol.Color(1048575);
  this.emissive = new $3Dmol.Color(0);
  this.imposter = !0;
  this.wrapAround = !1;
  this.wrapRGB = new $3Dmol.Vector3(1, 1, 1);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.shading = $3Dmol.SmoothShading;
  this.shaderID = null;
  this.vertexColors = $3Dmol.NoColors;
  this.skinning = !1;
  this.setValues(b);
};
$3Dmol.ImposterMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.ImposterMaterial.prototype.clone = function () {
  var b = new $3Dmol.ImposterMaterial();
  $3Dmol.Material.prototype.clone.call(this, b);
  b.color.copy(this.color);
  b.ambient.copy(this.ambient);
  b.emissive.copy(this.emissive);
  b.wrapAround = this.wrapAround;
  b.wrapRGB.copy(this.wrapRGB);
  b.map = this.map;
  b.lightMap = this.lightMap;
  b.specularMap = this.specularMap;
  b.envMap = this.envMap;
  b.combine = this.combine;
  b.reflectivity = this.reflectivity;
  b.refractionRatio = this.refractionRatio;
  b.fog = this.fog;
  b.shading = this.shading;
  b.shaderID = this.shaderID;
  b.vertexColors = this.vertexColors;
  b.skinning = this.skinning;
  b.morphTargets = this.morphTargets;
  b.morphNormals = this.morphNormals;
  return b;
};
$3Dmol.SphereImposterMaterial = function (b) {
  $3Dmol.ImposterMaterial.call(this);
  this.shaderID = "sphereimposter";
  this.setValues(b);
};
$3Dmol.SphereImposterMaterial.prototype = Object.create(
  $3Dmol.ImposterMaterial.prototype
);
$3Dmol.SphereImposterMaterial.prototype.clone = function () {
  var b = new $3Dmol.SphereImposterMaterial();
  $3Dmol.ImposterMaterial.prototype.clone.call(this, b);
  return b;
};
$3Dmol.SphereImposterOutlineMaterial = function (b) {
  $3Dmol.ImposterMaterial.call(this);
  this.shaderID = "sphereimposteroutline";
  this.outlineColor = b.color || new $3Dmol.Color(0, 0, 0);
  this.outlineWidth = b.width || 0.1;
  this.outlinePushback = b.pushback || 1;
  this.setValues(b);
};
$3Dmol.SphereImposterOutlineMaterial.prototype = Object.create(
  $3Dmol.ImposterMaterial.prototype
);
$3Dmol.SphereImposterOutlineMaterial.prototype.clone = function () {
  var b = new $3Dmol.SphereImposterOutlineMaterial();
  $3Dmol.ImposterMaterial.prototype.clone.call(this, b);
  b.outlineColor = this.outlineColor;
  b.outlineWidth = this.outlineWidth;
  b.outlinePushback = this.outlinePushback;
  return b;
};
$3Dmol.StickImposterMaterial = function (b) {
  $3Dmol.ImposterMaterial.call(this);
  this.shaderID = "stickimposter";
  this.setValues(b);
};
$3Dmol.StickImposterMaterial.prototype = Object.create(
  $3Dmol.ImposterMaterial.prototype
);
$3Dmol.StickImposterMaterial.prototype.clone = function () {
  var b = new $3Dmol.StickImposterOutlineMaterial();
  $3Dmol.ImposterMaterial.prototype.clone.call(this, b);
  return b;
};
$3Dmol.StickImposterOutlineMaterial = function (b) {
  $3Dmol.ImposterMaterial.call(this);
  this.shaderID = "stickimposteroutline";
  this.outlineColor = b.color || new $3Dmol.Color(0, 0, 0);
  this.outlineWidth = b.width || 0.1;
  this.outlinePushback = b.pushback || 1;
  this.setValues(b);
};
$3Dmol.StickImposterOutlineMaterial.prototype = Object.create(
  $3Dmol.ImposterMaterial.prototype
);
$3Dmol.StickImposterOutlineMaterial.prototype.clone = function () {
  var b = new $3Dmol.StickImposterOutlineMaterial();
  $3Dmol.ImposterMaterial.prototype.clone.call(this, b);
  b.outlineColor = this.outlineColor;
  b.outlineWidth = this.outlineWidth;
  b.outlinePushback = this.outlinePushback;
  return b;
};
$3Dmol.InstancedMaterial = function (b) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.ambient = new $3Dmol.Color(1048575);
  this.emissive = new $3Dmol.Color(0);
  this.wrapAround = !1;
  this.wrapRGB = new $3Dmol.Vector3(1, 1, 1);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.shading = $3Dmol.SmoothShading;
  this.shaderID = "instanced";
  this.vertexColors = $3Dmol.NoColors;
  this.skinning = !1;
  this.sphere = null;
  this.setValues(b);
};
$3Dmol.InstancedMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.InstancedMaterial.prototype.clone = function () {
  var b = new $3Dmol.InstancedMaterial();
  $3Dmol.Material.prototype.clone.call(this, b);
  b.color.copy(this.color);
  b.ambient.copy(this.ambient);
  b.emissive.copy(this.emissive);
  b.wrapAround = this.wrapAround;
  b.wrapRGB.copy(this.wrapRGB);
  b.map = this.map;
  b.lightMap = this.lightMap;
  b.specularMap = this.specularMap;
  b.envMap = this.envMap;
  b.combine = this.combine;
  b.reflectivity = this.reflectivity;
  b.refractionRatio = this.refractionRatio;
  b.fog = this.fog;
  b.shading = this.shading;
  b.shaderID = this.shaderID;
  b.vertexColors = this.vertexColors;
  b.skinning = this.skinning;
  b.morphTargets = this.morphTargets;
  b.morphNormals = this.morphNormals;
  b.sphere = this.sphere;
  return b;
};
$3Dmol.SpriteMaterial = function (b) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.map = new $3Dmol.Texture();
  this.useScreenCoordinates = !0;
  this.depthTest = !this.useScreenCoordinates;
  this.sizeAttenuation = !this.useScreenCoordinates;
  this.scaleByViewPort = !this.sizeAttenuation;
  this.alignment = $3Dmol.SpriteAlignment.center.clone();
  this.fog = !1;
  this.uvOffset = new $3Dmol.Vector2(0, 0);
  this.uvScale = new $3Dmol.Vector2(1, 1);
  this.setValues(b);
  b = b || {};
  void 0 === b.depthTest && (this.depthTest = !this.useScreenCoordinates);
  void 0 === b.sizeAttenuation &&
    (this.sizeAttenuation = !this.useScreenCoordinates);
  void 0 === b.scaleByViewPort &&
    (this.scaleByViewPort = !this.sizeAttenuation);
};
$3Dmol.SpriteMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.SpriteMaterial.prototype.clone = function () {
  var b = new $3Dmol.SpriteMaterial();
  $3Dmol.Material.prototype.clone.call(this, b);
  b.color.copy(this.color);
  b.map = this.map;
  b.useScreenCoordinates = useScreenCoordinates;
  b.sizeAttenuation = this.sizeAttenuation;
  b.scaleByViewport = this.scaleByViewPort;
  b.alignment.copy(this.alignment);
  b.uvOffset.copy(this.uvOffset);
  return b;
};
$3Dmol.SpriteAlignment = {};
$3Dmol.SpriteAlignment.topLeft = new $3Dmol.Vector2(1, -1);
$3Dmol.SpriteAlignment.topCenter = new $3Dmol.Vector2(0, -1);
$3Dmol.SpriteAlignment.topRight = new $3Dmol.Vector2(-1, -1);
$3Dmol.SpriteAlignment.centerLeft = new $3Dmol.Vector2(1, 0);
$3Dmol.SpriteAlignment.center = new $3Dmol.Vector2(0, 0);
$3Dmol.SpriteAlignment.centerRight = new $3Dmol.Vector2(-1, 0);
$3Dmol.SpriteAlignment.bottomLeft = new $3Dmol.Vector2(1, 1);
$3Dmol.SpriteAlignment.bottomCenter = new $3Dmol.Vector2(0, 1);
$3Dmol.SpriteAlignment.bottomRight = new $3Dmol.Vector2(-1, 1);
$3Dmol.Texture = function (b) {
  $3Dmol.EventDispatcher.call(this);
  this.id = $3Dmol.TextureIdCount++;
  this.name = "";
  this.image = b;
  this.mipmaps = [];
  this.mapping = new $3Dmol.UVMapping();
  this.wrapT = this.wrapS = $3Dmol.ClampToEdgeWrapping;
  this.magFilter = $3Dmol.LinearFilter;
  this.minFilter = $3Dmol.LinearMipMapLinearFilter;
  this.anisotropy = 1;
  this.format = $3Dmol.RGBAFormat;
  this.type = $3Dmol.UnsignedByteType;
  this.offset = new $3Dmol.Vector2(0, 0);
  this.repeat = new $3Dmol.Vector2(1, 1);
  this.generateMipmaps = !0;
  this.premultiplyAlpha = !1;
  this.flipY = !0;
  this.unpackAlignment = 4;
  this.needsUpdate = !1;
  this.onUpdate = null;
};
$3Dmol.Texture.prototype = {
  constructor: $3Dmol.Texture,
  clone: function (b) {
    void 0 === b && (b = new $3Dmol.Texture());
    b.image = this.image;
    b.mipmaps = this.mipmaps.slice(0);
    b.mapping = this.mapping;
    b.wrapS = this.wrapS;
    b.wrapT = this.wrapT;
    b.magFilter = this.magFilter;
    b.minFilter = this.minFilter;
    b.anisotropy = this.anisotropy;
    b.format = this.format;
    b.type = this.type;
    b.offset.copy(this.offset);
    b.repeat.copy(this.repeat);
    b.generateMipmaps = this.generateMipmaps;
    b.premultiplyAlpha = this.premultiplyAlpha;
    b.flipY = this.flipY;
    b.unpackAlignment = this.unpackAlignment;
    return b;
  },
  dispose: function () {
    this.dispatchEvent({ type: "dispose" });
  },
};
$3Dmol.TextureIdCount = 0;
$3Dmol.FrontSide = 0;
$3Dmol.BackSide = 1;
$3Dmol.DoubleSide = 2;
$3Dmol.NoShading = 0;
$3Dmol.FlatShading = 1;
$3Dmol.SmoothShading = 2;
$3Dmol.NoColors = 0;
$3Dmol.FaceColors = 1;
$3Dmol.VertexColors = 2;
$3Dmol.MultiplyOperation = 0;
$3Dmol.MixOperation = 1;
$3Dmol.AddOperation = 2;
$3Dmol.UVMapping = function () {};
$3Dmol.ClampToEdgeWrapping = 1001;
$3Dmol.LinearFilter = 1006;
$3Dmol.LinearMipMapLinearFilter = 1008;
$3Dmol.UnsignedByteType = 1009;
$3Dmol.RGBAFormat = 1021;
$3Dmol.Line = function (b, c, d) {
  $3Dmol.Object3D.call(this);
  this.geometry = b;
  this.material =
    void 0 !== c
      ? c
      : new $3Dmol.LineBasicMaterial({ color: 16777215 * Math.random() });
  this.type = void 0 !== d ? d : $3Dmol.LineStrip;
};
$3Dmol.LineStrip = 0;
$3Dmol.LinePieces = 1;
$3Dmol.Line.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Line.prototype.clone = function (b) {
  void 0 === b &&
    (b = new $3Dmol.Line(this.geometry, this.material, this.type));
  $3Dmol.Object3D.prototype.clone.call(this, b);
  return b;
};
$3Dmol.Mesh = function (b, c) {
  $3Dmol.Object3D.call(this);
  this.geometry = b;
  this.material =
    void 0 !== c
      ? c
      : new $3Dmol.MeshBasicMaterial({
          color: 16777215 * Math.random(),
          wireframe: !0,
        });
};
$3Dmol.Mesh.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Mesh.prototype.clone = function (b) {
  void 0 === b && (b = new $3Dmol.Mesh(this.geometry, this.material));
  $3Dmol.Object3D.prototype.clone.call(this, b);
  return b;
};
$3Dmol.Sprite = function (b) {
  $3Dmol.Object3D.call(this);
  this.material = void 0 !== b ? b : new $3Dmol.SpriteMaterial();
  this.rotation3d = this.rotation;
  this.rotation = 0;
};
$3Dmol.Sprite.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Sprite.prototype.updateMatrix = function () {
  this.matrix.setPosition(this.position);
  this.rotation3d.set(0, 0, this.rotation);
  this.matrix.setRotationFromEuler(this.rotation3d);
  (1 === this.scale.x && 1 === this.scale.y) || this.matrix.scale(this.scale);
  this.matrixWorldNeedsUpdate = !0;
};
$3Dmol.Sprite.prototype.clone = function (b) {
  void 0 === b && (b = new $3Dmol.Sprite(this.material));
  $3Dmol.Object3D.prototype.clone.call(this, b);
  return b;
};
$3Dmol.Renderer = function (b) {
  function c(b) {
    V[b] || (E.enableVertexAttribArray(b), (V[b] = !0));
  }
  function d(b, c) {
    var l;
    "fragment" === b
      ? (l = E.createShader(E.FRAGMENT_SHADER))
      : "vertex" === b && (l = E.createShader(E.VERTEX_SHADER));
    E.shaderSource(l, c);
    E.compileShader(l);
    return E.getShaderParameter(l, E.COMPILE_STATUS)
      ? l
      : (console.error(E.getShaderInfoLog(l)),
        console.error("could not initialize shader"),
        null);
  }
  function p(b, c, l, f, e, h, d, m) {
    var y, w, q;
    c ? ((w = b.length - 1), (m = c = -1)) : ((w = 0), (c = b.length), (m = 1));
    for (var z = w; z !== c; z += m)
      if (
        ((y = b[z]), y.render && ((w = y.object), (q = y.buffer), (y = y[l])))
      ) {
        d && s.setBlending(!0);
        s.setDepthTest(y.depthTest);
        s.setDepthWrite(y.depthWrite);
        var L = y.polygonOffset;
        null !== L &&
          (L
            ? E.enable(E.POLYGON_OFFSET_FILL)
            : E.disable(E.POLYGON_OFFSET_FILL));
        L = w._modelViewMatrix.isReflected();
        s.setMaterialFaces(y, L);
        s.renderBuffer(f, e, h, y, q, w);
        g &&
          ("sphereimposter" == y.shaderID
            ? s.renderBuffer(f, e, h, _outlineSphereImposterMaterial, q, w)
            : "stickimposter" == y.shaderID
            ? s.renderBuffer(f, e, h, _outlineStickImposterMaterial, q, w)
            : y.wireframe ||
              "basic" === y.shaderID ||
              0 === y.opacity ||
              s.renderBuffer(f, e, h, g, q, w));
      }
  }
  function t(b) {
    return 0 === (b & (b - 1));
  }
  function A(b) {
    return b === $3Dmol.UnsignedByteType
      ? E.UNSIGNED_BYTE
      : b === $3Dmol.RGBAFormat
      ? E.RGBA
      : 0;
  }
  b = b || {};
  var y = void 0 !== b.canvas ? b.canvas : document.createElement("canvas"),
    z = void 0 !== b.precision ? b.precision : "highp",
    f = void 0 !== b.alpha ? b.alpha : !0,
    h = void 0 !== b.premultipliedAlpha ? b.premultipliedAlpha : !0,
    l = void 0 !== b.antialias ? b.antialias : !1,
    m = void 0 !== b.stencil ? b.stencil : !0,
    w = void 0 !== b.preserveDrawingBuffer ? b.preserveDrawingBuffer : !1,
    e =
      void 0 !== b.clearColor
        ? new $3Dmol.Color(b.clearColor)
        : new $3Dmol.Color(0),
    G = void 0 !== b.clearAlpha ? b.clearAlpha : 0,
    g = void 0 !== b.outline ? new $3Dmol.MeshOutlineMaterial(b.outline) : null;
  this.domElement = y;
  this.context = null;
  this.devicePixelRatio =
    void 0 !== b.devicePixelRatio
      ? b.devicePixelRatio
      : void 0 !== self.devicePixelRatio
      ? self.devicePixelRatio
      : 1;
  this.autoUpdateScene =
    this.autoUpdateObjects =
    this.sortObjects =
    this.autoClearStencil =
    this.autoClearDepth =
    this.autoClearColor =
    this.autoClear =
      !0;
  this.renderPluginsPost = [];
  this.info = {
    memory: { programs: 0, geometries: 0, textures: 0 },
    render: { calls: 0, vertices: 0, faces: 0, points: 0 },
  };
  var s = this,
    u = [],
    x = 0,
    q = null,
    N = -1,
    I = null,
    D = null,
    C = 0,
    B = -1,
    F = -1,
    J = -1,
    L = -1,
    K = null,
    H = 0,
    M = 0,
    O = 0,
    R = 0,
    V = {},
    P = new $3Dmol.Matrix4(),
    S = new $3Dmol.Vector3(),
    Q = new $3Dmol.Vector3(),
    da = !0,
    Y = [],
    ba = [],
    E;
  try {
    if (
      !(E = y.getContext("experimental-webgl", {
        alpha: f,
        premultipliedAlpha: h,
        antialias: l,
        stencil: m,
        preserveDrawingBuffer: w,
      })) &&
      !(E = y.getContext("webgl", {
        alpha: f,
        premultipliedAlpha: h,
        antialias: l,
        stencil: m,
        preserveDrawingBuffer: w,
      }))
    )
      throw "Error creating WebGL context.";
  } catch (aa) {
    console.error(aa);
  }
  E.clearColor(0, 0, 0, 1);
  E.clearDepth(1);
  E.clearStencil(0);
  E.enable(E.DEPTH_TEST);
  E.depthFunc(E.LEQUAL);
  E.frontFace(E.CCW);
  E.cullFace(E.BACK);
  E.enable(E.CULL_FACE);
  E.enable(E.BLEND);
  E.blendEquation(E.FUNC_ADD);
  E.blendFunc(E.SRC_ALPHA, E.ONE_MINUS_SRC_ALPHA);
  E.clearColor(e.r, e.g, e.b, G);
  this.context = E;
  var T = E.getExtension("ANGLE_instanced_arrays"),
    Z = E.getExtension("EXT_frag_depth");
  this.supportedExtensions = function () {
    return { supportsAIA: Boolean(T), supportsImposters: Boolean(Z) };
  };
  this.getContext = function () {
    return E;
  };
  this.getPrecision = function () {
    return z;
  };
  this.setClearColorHex = function (b, c) {
    e.setHex(b);
    G = c;
    E.clearColor(e.r, e.g, e.b, G);
  };
  this.enableOutline = function (b) {
    g = new $3Dmol.MeshOutlineMaterial(b);
    _outlineSphereImposterMaterial = new $3Dmol.SphereImposterOutlineMaterial(
      b
    );
    _outlineStickImposterMaterial = new $3Dmol.StickImposterOutlineMaterial(b);
  };
  this.disableOutline = function () {
    _outlineStickImposterMaterial = _outlineSphereImposterMaterial = g = null;
  };
  this.setSize = function (b, c) {
    H = y.width = b * this.devicePixelRatio;
    M = y.height = c * this.devicePixelRatio;
    y.style.width = b + "px";
    y.style.height = c + "px";
    E.viewport(0, 0, E.drawingBufferWidth, E.drawingBufferHeight);
  };
  this.clear = function (b, c, l) {
    var f = 0;
    if (void 0 === b || b) f |= E.COLOR_BUFFER_BIT;
    if (void 0 === c || c) f |= E.DEPTH_BUFFER_BIT;
    if (void 0 === l || l) f |= E.STENCIL_BUFFER_BIT;
    E.clear(f);
  };
  this.clearTarget = function (b, c, l) {
    this.clear(b, c, l);
  };
  this.setMaterialFaces = function (b, c) {
    var l = b.side === $3Dmol.DoubleSide,
      f = b.side === $3Dmol.BackSide,
      f = c ? !f : f;
    B !== l && (l ? E.disable(E.CULL_FACE) : E.enable(E.CULL_FACE), (B = l));
    F !== f && (f ? E.frontFace(E.CW) : E.frontFace(E.CCW), (F = f));
  };
  this.setDepthTest = function (b) {
    J !== b && (b ? E.enable(E.DEPTH_TEST) : E.disable(E.DEPTH_TEST), (J = b));
  };
  this.setDepthWrite = function (b) {
    L !== b && (E.depthMask(b), (L = b));
  };
  this.setBlending = function (b) {
    b
      ? (E.enable(E.BLEND),
        E.blendEquationSeparate(E.FUNC_ADD, E.FUNC_ADD),
        E.blendFuncSeparate(
          E.SRC_ALPHA,
          E.ONE_MINUS_SRC_ALPHA,
          E.ONE,
          E.ONE_MINUS_SRC_ALPHA
        ))
      : E.disable(E.BLEND);
  };
  this.addPostPlugin = function (b) {
    b.init(this);
    this.renderPluginsPost.push(b);
  };
  var W = function (b) {
      b = b.target;
      b.removeEventListener("dispose", W);
      b.__webglInit = void 0;
      void 0 !== b.__webglVertexBuffer && E.deleteBuffer(b.__webglVertexBuffer);
      void 0 !== b.__webglColorBuffer && E.deleteBuffer(b.__webglColorBuffer);
      if (void 0 !== b.geometryGroups)
        for (var c = 0, l = b.groups; c < l; c++) {
          var f = b.geometryGroups[c];
          void 0 !== f.__webglVertexBuffer &&
            E.deleteBuffer(f.__webglVertexBuffer);
          void 0 !== f.__webglColorBuffer &&
            E.deleteBuffer(f.__webglColorBuffer);
          void 0 !== f.__webglNormalBuffer &&
            E.deleteBuffer(f.__webglNormalBuffer);
          void 0 !== f.__webglFaceBuffer && E.deleteBuffer(f.__webglFaceBuffer);
          void 0 !== f.__webglLineBuffer && E.deleteBuffer(f.__webglLineBuffer);
        }
      s.info.memory.geometries--;
    },
    U = function (b) {
      b = b.target;
      b.removeEventListener("dispose", U);
      b.image && b.image.__webglTextureCube
        ? E.deleteTexture(b.image.__webglTextureCube)
        : b.__webglInit &&
          ((b.__webglInit = !1), E.deleteTexture(b.__webglTexture));
      s.info.memory.textures--;
    },
    X = function (b) {
      b = b.target;
      b.removeEventListener("dispose", X);
      ga(b);
    },
    ga = function (b) {
      var c = b.program;
      if (void 0 !== c) {
        b.program = void 0;
        var l,
          f,
          e = !1;
        b = 0;
        for (l = u.length; b < l; b++)
          if (((f = u[b]), f.program === c)) {
            f.usedTimes--;
            0 === f.usedTimes && (e = !0);
            break;
          }
        if (!0 === e) {
          e = [];
          b = 0;
          for (l = u.length; b < l; b++)
            (f = u[b]), f.program !== c && e.push(f);
          u = e;
          E.deleteProgram(c);
          s.info.memory.programs--;
        }
      }
    };
  this.initMaterial = function (b, c, l, f) {
    b.addEventListener("dispose", X);
    if ((c = b.shaderID))
      (c = $3Dmol.ShaderLib[c]),
        (b.vertexShader = c.vertexShader),
        (b.fragmentShader = c.fragmentShader),
        (b.uniforms = $3Dmol.ShaderUtils.clone(c.uniforms));
    var e;
    a: {
      var h = b.fragmentShader;
      f = b.vertexShader;
      l = b.uniforms;
      var g = { wireframe: b.wireframe, fragdepth: b.imposter },
        y,
        m;
      c = [];
      c.push(h);
      c.push(f);
      for (y in g) c.push(y), c.push(g[y]);
      c = c.join();
      y = 0;
      for (m = u.length; y < m; y++) {
        var w = u[y];
        if (w.code === c) {
          w.usedTimes++;
          e = w.program;
          break a;
        }
      }
      y = E.createProgram();
      w = "precision " + z + " float;";
      m = "" + w;
      g = [
        g.fragdepth ? "#extension GL_EXT_frag_depth: enable" : "",
        g.wireframe ? "#define WIREFRAME 1" : "",
        w,
      ].join("\n");
      h = d("fragment", g + h);
      f = d("vertex", m + f);
      E.attachShader(y, f);
      E.attachShader(y, h);
      E.linkProgram(y);
      E.getProgramParameter(y, E.LINK_STATUS) ||
        console.error("Could not initialize shader");
      y.uniforms = {};
      y.attributes = {};
      f = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix"];
      for (e in l) f.push(e);
      for (e = 0; e < f.length; e++)
        (l = f[e]), (y.uniforms[l] = E.getUniformLocation(y, l));
      f = "position normal color lineDistance offset radius".split(" ");
      for (e = 0; e < f.length; e++)
        (l = f[e]), (y.attributes[l] = E.getAttribLocation(y, l));
      y.id = x++;
      u.push({ program: y, code: c, usedTimes: 1 });
      s.info.memory.programs = u.length;
      e = y;
    }
    b.program = e;
  };
  this.renderBuffer = function (b, l, f, e, h, y) {
    if (e.visible) {
      var g;
      e.needsUpdate &&
        (e.program && ga(e), s.initMaterial(e, l, f, y), (e.needsUpdate = !1));
      var d = !1,
        m = e.program,
        w = m.uniforms;
      g = e.uniforms;
      m != q && (E.useProgram(m), (q = m), (d = !0));
      e.id != N && ((N = e.id), (d = !0));
      b != D && ((D = b), (d = !0));
      E.uniformMatrix4fv(w.projectionMatrix, !1, b.projectionMatrix.elements);
      E.uniformMatrix4fv(w.modelViewMatrix, !1, y._modelViewMatrix.elements);
      E.uniformMatrix3fv(w.normalMatrix, !1, y._normalMatrix.elements);
      if (d) {
        g.fogColor.value = f.color;
        g.fogNear.value = f.near;
        g.fogFar.value = f.far;
        if (
          e.shaderID.startsWith("lambert") ||
          "instanced" === e.shaderID ||
          e.shaderID.endsWith("imposter")
        ) {
          E.uniformMatrix4fv(w.viewMatrix, !1, b.matrixWorldInverse.elements);
          if (da) {
            var z,
              L,
              x = 0,
              u = 0,
              H = 0;
            b = 0;
            for (f = l.length; b < f; b++)
              if (
                ((d = l[b]),
                (z = d.color),
                (L = d.intensity),
                d instanceof $3Dmol.Light &&
                  (x++,
                  Q.getPositionFromMatrix(d.matrixWorld),
                  S.getPositionFromMatrix(d.target.matrixWorld),
                  Q.sub(S),
                  Q.normalize(),
                  0 !== Q.x || 0 !== Q.y || 0 !== Q.z))
              )
                (ba[H] = Q.x),
                  (ba[H + 1] = Q.y),
                  (ba[H + 2] = Q.z),
                  (Y[H] = z.r * L),
                  (Y[H + 1] = z.g * L),
                  (Y[H + 2] = z.b * L),
                  (H += 3),
                  u++;
            da = !1;
          }
          g.directionalLightColor.value = Y;
          g.directionalLightDirection.value = ba;
        } else
          e.shaderID.endsWith("outline")
            ? ((g.outlineColor.value = e.outlineColor),
              (g.outlineWidth.value = e.outlineWidth),
              (g.outlinePushback.value = e.outlinePushback))
            : "sphereimposter" === e.shaderID &&
              (E.uniformMatrix4fv(
                w.viewMatrix,
                !1,
                b.matrixWorldInverse.elements
              ),
              E.uniformMatrix3fv(w.normalMatrix, !1, y._normalMatrix.elements),
              (g.directionalLightColor.value = Y),
              (g.directionalLightDirection.value = ba));
        g.opacity.value = e.opacity;
        for (var F in g)
          w[F] &&
            ((l = g[F].type),
            (b = g[F].value),
            (f = w[F]),
            "f" === l
              ? E.uniform1f(f, b)
              : "fv" === l
              ? E.uniform3fv(f, b)
              : "c" === l
              ? E.uniform3f(f, b.r, b.g, b.b)
              : "f4" === l && E.uniform4f(f, b[0], b[1], b[2], b[3]));
      }
      g = m.attributes;
      w = !1;
      m = 16777215 * h.id + 2 * m.id + (e.wireframe ? 1 : 0);
      m !== I && ((I = m), (w = !0));
      if (w) {
        for (var M in V) V[M] && (E.disableVertexAttribArray(M), (V[M] = !1));
        0 <= g.position &&
          (E.bindBuffer(E.ARRAY_BUFFER, h.__webglVertexBuffer),
          c(g.position),
          E.vertexAttribPointer(g.position, 3, E.FLOAT, !1, 0, 0));
        0 <= g.color &&
          (E.bindBuffer(E.ARRAY_BUFFER, h.__webglColorBuffer),
          c(g.color),
          E.vertexAttribPointer(g.color, 3, E.FLOAT, !1, 0, 0));
        0 <= g.normal &&
          (E.bindBuffer(E.ARRAY_BUFFER, h.__webglNormalBuffer),
          c(g.normal),
          E.vertexAttribPointer(g.normal, 3, E.FLOAT, !1, 0, 0));
        0 <= g.offset &&
          (E.bindBuffer(E.ARRAY_BUFFER, h.__webglOffsetBuffer),
          c(g.offset),
          E.vertexAttribPointer(g.offset, 3, E.FLOAT, !1, 0, 0));
        0 <= g.radius &&
          (E.bindBuffer(E.ARRAY_BUFFER, h.__webglRadiusBuffer),
          c(g.radius),
          E.vertexAttribPointer(g.radius, 1, E.FLOAT, !1, 0, 0));
      }
      var G;
      y instanceof $3Dmol.Mesh
        ? ("instanced" === e.shaderID
            ? ((G = e.sphere.geometryGroups[0]),
              w &&
                (E.bindBuffer(E.ARRAY_BUFFER, h.__webglVertexBuffer),
                E.bufferData(E.ARRAY_BUFFER, G.vertexArray, E.STATIC_DRAW),
                E.bindBuffer(E.ARRAY_BUFFER, h.__webglNormalBuffer),
                E.bufferData(E.ARRAY_BUFFER, G.normalArray, E.STATIC_DRAW),
                E.bindBuffer(E.ELEMENT_ARRAY_BUFFER, h.__webglFaceBuffer),
                E.bufferData(
                  E.ELEMENT_ARRAY_BUFFER,
                  G.faceArray,
                  E.STATIC_DRAW
                )),
              (G = G.faceidx),
              T.vertexAttribDivisorANGLE(g.offset, 1),
              T.vertexAttribDivisorANGLE(g.radius, 1),
              T.vertexAttribDivisorANGLE(g.color, 1),
              T.drawElementsInstancedANGLE(
                E.TRIANGLES,
                G,
                E.UNSIGNED_SHORT,
                0,
                h.radiusArray.length
              ),
              T.vertexAttribDivisorANGLE(g.offset, 0),
              T.vertexAttribDivisorANGLE(g.radius, 0),
              T.vertexAttribDivisorANGLE(g.color, 0))
            : e.wireframe
            ? ((y = h.lineidx),
              (e = e.wireframeLinewidth),
              e !== K && (E.lineWidth(e), (K = e)),
              w && E.bindBuffer(E.ELEMENT_ARRAY_BUFFER, h.__webglLineBuffer),
              E.drawElements(E.LINES, y, E.UNSIGNED_SHORT, 0))
            : ((G = h.faceidx),
              w && E.bindBuffer(E.ELEMENT_ARRAY_BUFFER, h.__webglFaceBuffer),
              E.drawElements(E.TRIANGLES, G, E.UNSIGNED_SHORT, 0)),
          s.info.render.calls++,
          (s.info.render.vertices += G),
          (s.info.render.faces += G / 3))
        : y instanceof $3Dmol.Line &&
          ((y = h.vertices),
          (h = e.linewidth),
          h !== K && (E.lineWidth(h), (K = h)),
          E.drawArrays(E.LINES, 0, y),
          s.info.render.calls++);
    }
  };
  this.render = function (b, c, l) {
    if (!1 === c instanceof $3Dmol.Camera)
      console.error(
        "$3Dmol.Renderer.render: camera is not an instance of $3Dmol.Camera."
      );
    else {
      var f,
        e,
        g,
        h,
        y = b.__lights,
        w = b.fog;
      N = -1;
      da = !0;
      this.autoUpdateScene && b.updateMatrixWorld();
      void 0 === c.parent && c.updateMatrixWorld();
      c.matrixWorldInverse.getInverse(c.matrixWorld);
      P.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse);
      this.autoUpdateObjects && this.initWebGLObjects(b);
      s.info.render.calls = 0;
      s.info.render.vertices = 0;
      s.info.render.faces = 0;
      s.info.render.points = 0;
      O = H;
      R = M;
      (this.autoClear || l) &&
        this.clear(
          this.autoClearColor,
          this.autoClearDepth,
          this.autoClearStencil
        );
      h = b.__webglObjects;
      l = 0;
      for (f = h.length; l < f; l++)
        if (((e = h[l]), (g = e.object), (e.render = !1), g.visible)) {
          g._modelViewMatrix.multiplyMatrices(
            c.matrixWorldInverse,
            g.matrixWorld
          );
          g._normalMatrix.getInverse(g._modelViewMatrix);
          g._normalMatrix.transpose();
          g = e;
          var d = g.object.material;
          d.transparent
            ? ((g.opaque = null),
              (g.transparent = d),
              d.wireframe || ((d = d.clone()), (d.opacity = 0), (g.blank = d)))
            : ((g.opaque = d), (g.transparent = null));
          e.render = !0;
        }
      this.setBlending(!1);
      p(b.__webglObjects, !0, "opaque", c, y, w, !1, null);
      p(b.__webglObjects, !0, "blank", c, y, w, !0, null);
      p(b.__webglObjects, !1, "transparent", c, y, w, !0, null);
      y = this.renderPluginsPost;
      I = -1;
      D = q = null;
      F = N = B = J = L = -1;
      if (y.length)
        for (w = 0, l = y.length; w < l; w++)
          (da = !0),
            y[w].render(b, c, O, R),
            (I = -1),
            (D = q = null),
            (F = N = B = J = L = -1);
      this.setDepthTest(!0);
      this.setDepthWrite(!0);
    }
  };
  this.initWebGLObjects = function (b) {
    b.__webglObjects ||
      ((b.__webglObjects = []),
      (b.__webglObjectsImmediate = []),
      (b.__webglSprites = []),
      (b.__webglFlares = []));
    if (b.__objectsAdded.length) {
      for (; b.__objectsAdded.length; ) {
        var c = b.__objectsAdded[0],
          l = b,
          f = void 0,
          e = void 0,
          g = void 0,
          h = void 0;
        if (
          !c.__webglInit &&
          ((c.__webglInit = !0),
          (c._modelViewMatrix = new $3Dmol.Matrix4()),
          (c._normalMatrix = new $3Dmol.Matrix3()),
          void 0 !== c.geometry &&
            void 0 === c.geometry.__webglInit &&
            ((c.geometry.__webglInit = !0),
            c.geometry.addEventListener("dispose", W)),
          c instanceof $3Dmol.Mesh || c instanceof $3Dmol.Line)
        )
          for (g = c.geometry, f = 0, e = g.geometryGroups.length; f < e; f++)
            (h = g.geometryGroups[f]),
              (h.id = C++),
              h.__webglVertexBuffer ||
                (c instanceof $3Dmol.Mesh
                  ? (h.radiusArray &&
                      (h.__webglRadiusBuffer = E.createBuffer()),
                    h.useOffset && (h.__webglOffsetBuffer = E.createBuffer()),
                    (h.__webglVertexBuffer = E.createBuffer()),
                    (h.__webglNormalBuffer = E.createBuffer()),
                    (h.__webglColorBuffer = E.createBuffer()),
                    (h.__webglFaceBuffer = E.createBuffer()),
                    (h.__webglLineBuffer = E.createBuffer()),
                    s.info.memory.geometries++,
                    (g.elementsNeedUpdate = !0),
                    (g.normalsNeedUpdate = !0))
                  : c instanceof $3Dmol.Line &&
                    ((h.__webglVertexBuffer = E.createBuffer()),
                    (h.__webglColorBuffer = E.createBuffer()),
                    s.info.memory.geometries++),
                (g.verticesNeedUpdate = !0),
                (g.colorsNeedUpdate = !0));
        if (!c.__webglActive) {
          if (c instanceof $3Dmol.Mesh || c instanceof $3Dmol.Line)
            for (g = c.geometry, f = 0, e = g.geometryGroups.length; f < e; f++)
              (h = g.geometryGroups[f]),
                l.__webglObjects.push({
                  buffer: h,
                  object: c,
                  opaque: null,
                  transparent: null,
                });
          else c instanceof $3Dmol.Sprite && l.__webglSprites.push(c);
          c.__webglActive = !0;
        }
        b.__objectsAdded.splice(0, 1);
      }
      I = -1;
    }
    for (; b.__objectsRemoved.length; ) {
      c = b.__objectsRemoved[0];
      l = b;
      if (c instanceof $3Dmol.Mesh || c instanceof $3Dmol.Line)
        for (l = l.__webglObjects, f = c, e = l.length - 1; 0 <= e; --e)
          l[e].object === f && l.splice(e, 1);
      else if (c instanceof $3Dmol.Sprite)
        for (l = l.__webglSprites, f = c, e = l.length - 1; 0 <= e; --e)
          l[e] === f && l.splice(e, 1);
      c.__webglActive = !1;
      b.__objectsRemoved.splice(0, 1);
    }
    c = 0;
    for (l = b.__webglObjects.length; c < l; c++)
      if (
        ((e = b.__webglObjects[c].object),
        (f = e.geometry),
        (h = void 0),
        e instanceof $3Dmol.Mesh || e instanceof $3Dmol.Line)
      ) {
        e = 0;
        for (g = f.geometryGroups.length; e < g; e++)
          if (
            ((h = f.geometryGroups[e]),
            f.verticesNeedUpdate ||
              f.elementsNeedUpdate ||
              f.colorsNeedUpdate ||
              f.normalsNeedUpdate)
          ) {
            var y = E.STATIC_DRAW,
              d = h.vertexArray,
              w = h.colorArray;
            void 0 !== h.__webglOffsetBuffer
              ? E.bindBuffer(E.ARRAY_BUFFER, h.__webglOffsetBuffer)
              : E.bindBuffer(E.ARRAY_BUFFER, h.__webglVertexBuffer);
            E.bufferData(E.ARRAY_BUFFER, d, y);
            E.bindBuffer(E.ARRAY_BUFFER, h.__webglColorBuffer);
            E.bufferData(E.ARRAY_BUFFER, w, y);
            h.normalArray &&
              void 0 !== h.__webglNormalBuffer &&
              ((d = h.normalArray),
              E.bindBuffer(E.ARRAY_BUFFER, h.__webglNormalBuffer),
              E.bufferData(E.ARRAY_BUFFER, d, y));
            h.radiusArray &&
              void 0 !== h.__webglRadiusBuffer &&
              (E.bindBuffer(E.ARRAY_BUFFER, h.__webglRadiusBuffer),
              E.bufferData(E.ARRAY_BUFFER, h.radiusArray, y));
            h.faceArray &&
              void 0 !== h.__webglFaceBuffer &&
              ((d = h.faceArray),
              E.bindBuffer(E.ELEMENT_ARRAY_BUFFER, h.__webglFaceBuffer),
              E.bufferData(E.ELEMENT_ARRAY_BUFFER, d, y));
            h.lineArray &&
              void 0 !== h.__webglLineBuffer &&
              ((d = h.lineArray),
              E.bindBuffer(E.ELEMENT_ARRAY_BUFFER, h.__webglLineBuffer),
              E.bufferData(E.ELEMENT_ARRAY_BUFFER, d, y));
          }
        f.verticesNeedUpdate = !1;
        f.elementsNeedUpdate = !1;
        f.normalsNeedUpdate = !1;
        f.colorsNeedUpdate = !1;
        f.buffersNeedUpdate = !1;
      }
  };
  this.setTexture = function (b, c) {
    if (b.needsUpdate) {
      b.__webglInit ||
        ((b.__webglInit = !0),
        b.addEventListener("dispose", U),
        (b.__webglTexture = E.createTexture()),
        s.info.memory.textures++);
      E.activeTexture(E.TEXTURE0 + c);
      E.bindTexture(E.TEXTURE_2D, b.__webglTexture);
      E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL, b.flipY);
      E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL, b.premultiplyAlpha);
      E.pixelStorei(E.UNPACK_ALIGNMENT, b.unpackAlignment);
      var l = b.image,
        l = t(l.width) && t(l.height),
        f = A(b.format),
        e = A(b.type),
        h = E.TEXTURE_2D;
      l
        ? (E.texParameteri(h, E.TEXTURE_WRAP_S, A(b.wrapS)),
          E.texParameteri(h, E.TEXTURE_WRAP_T, A(b.wrapT)),
          E.texParameteri(h, E.TEXTURE_MAG_FILTER, A(b.magFilter)),
          E.texParameteri(h, E.TEXTURE_MIN_FILTER, A(b.minFilter)))
        : (E.texParameteri(h, E.TEXTURE_WRAP_S, E.CLAMP_TO_EDGE),
          E.texParameteri(h, E.TEXTURE_WRAP_T, E.CLAMP_TO_EDGE),
          E.texParameteri(h, E.TEXTURE_MAG_FILTER, E.LINEAR),
          E.texParameteri(h, E.TEXTURE_MIN_FILTER, E.LINEAR));
      var g = b.mipmaps;
      if (0 < g.length && l) {
        for (var y = 0, d = g.length; y < d; y++)
          (h = g[y]), E.texImage2D(E.TEXTURE_2D, y, f, f, e, h);
        b.generateMipmaps = !1;
      } else E.texImage2D(E.TEXTURE_2D, 0, f, f, e, b.image);
      b.generateMipmaps && l && E.generateMipmap(E.TEXTURE_2D);
      b.needsUpdate = !1;
      if (b.onUpdate) b.onUpdate();
    } else
      E.activeTexture(E.TEXTURE0 + c),
        E.bindTexture(E.TEXTURE_2D, b.__webglTexture);
  };
  this.addPostPlugin(new $3Dmol.SpritePlugin());
};
$3Dmol.Scene = function () {
  $3Dmol.Object3D.call(this);
  this.overrideMaterial = this.fog = null;
  this.matrixAutoUpdate = !1;
  this.__objects = [];
  this.__lights = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = [];
};
$3Dmol.Scene.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Scene.prototype.__addObject = function (b) {
  b instanceof $3Dmol.Light
    ? (-1 === this.__lights.indexOf(b) && this.__lights.push(b),
      b.target && void 0 === b.target.parent && this.add(b.target))
    : -1 === this.__objects.indexOf(b) &&
      (this.__objects.push(b),
      this.__objectsAdded.push(b),
      -1 !== this.__objectsRemoved.indexOf(b) &&
        this.__objectsRemoved.splice(c, 1));
  for (var c = 0; c < b.children.length; c++) this.__addObject(b.children[c]);
};
$3Dmol.Scene.prototype.__removeObject = function (b) {
  var c;
  b instanceof $3Dmol.Light
    ? ((c = this.__lights.indexOf(b)), -1 !== c && this.__lights.splice(c, 1))
    : ((c = this.__objects.indexOf(b)),
      -1 !== c &&
        (this.__objects.splice(c, 1),
        this.__objectsRemoved.push(b),
        -1 !== this.__objectsAdded.indexOf(b) &&
          this.__objectsAdded.splice(c, 1)));
  for (c = 0; c < b.children.length; c++) this.__removeObject(b.children[c]);
};
$3Dmol.Fog = function (b, c, d) {
  this.name = "";
  this.color = new $3Dmol.Color(b);
  this.near = void 0 !== c ? c : 1;
  this.far = void 0 !== d ? d : 1e3;
};
$3Dmol.Fog.prototype.clone = function () {
  return new $3Dmol.Fog(this.color.getHex(), this.near, this.far);
};
$3Dmol.ShaderUtils = {
  clone: function (b) {
    var c,
      d = {};
    for (c in b) {
      d[c] = {};
      d[c].type = b[c].type;
      var p = b[c].value;
      p instanceof $3Dmol.Color
        ? (d[c].value = p.clone())
        : "number" === typeof p
        ? (d[c].value = p)
        : p instanceof Array
        ? (d[c].value = [])
        : console.error(
            "Error copying shader uniforms from ShaderLib: unknown type for uniform"
          );
    }
    return d;
  },
  stickimposterFragmentShader:
    "uniform float opacity;\nuniform mat4 projectionMatrix;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec3 vLight;\nvarying vec3 vColor;\nvarying vec3 cposition;\nvarying vec3 p1;\nvarying vec3 p2;\nvarying float r;\nvoid main() {\n    vec3 color = abs(vColor);\n    vec3 pos = cposition;\n    vec3 p = pos;\n    vec3 v = normalize(pos);\n    vec3 pa = p1;\n    vec3 va = normalize(p2-p1);\n    vec3 tmp1 = v-(dot(v,va)*va);\n    vec3 deltap = p-pa;\n    float A = dot(tmp1,tmp1);\n    if(A == 0.0) discard;\n    vec3 tmp2 = deltap-(dot(deltap,va)*va);\n    float B = 2.0*dot(tmp1, tmp2);\n    float C = dot(tmp2,tmp2)-r*r;\n    float det = (B*B) - (4.0*A*C);\n    if(det < 0.0) discard;\n    float sqrtDet = sqrt(det);\n    float posT = (-B+sqrtDet)/(2.0*A);\n    float negT = (-B-sqrtDet)/(2.0*A);\n    float intersectionT = min(posT,negT);\n    vec3 qi = p+v*intersectionT;\n    float dotp1 = dot(va,qi-p1);\n    float dotp2 = dot(va,qi-p2);\n    vec3 norm;\n    if( dotp1 < 0.0 || dotp2 > 0.0) {\n       vec3 cp;\n       if( dotp1 < 0.0) {        cp = p1;\n       } else {\n          cp = p2;\n       }\n       vec3 diff = p-cp;\n       A = dot(v,v);\n       B = dot(diff,v)*2.0;\n       C = dot(diff,diff)-r*r;\n       det = (B*B) - (4.0*C);\n       if(det < 0.0) discard;\n       sqrtDet = sqrt(det);\n       posT = (-B+sqrtDet)/(2.0);\n       negT = (-B-sqrtDet)/(2.0);\n       float t = min(posT,negT);\n       qi = p+v*t;\n       norm = normalize(qi-cp);\n    } else {\n       norm = normalize(qi-(dotp1*va + p1));\n    }\n    vec4 clipPos = projectionMatrix * vec4(qi, 1.0);\n    float ndcDepth = clipPos.z / clipPos.w;\n    float depth = ((gl_DepthRange.diff * ndcDepth) + gl_DepthRange.near + gl_DepthRange.far) / 2.0;\n    gl_FragDepthEXT = depth;",
};
$3Dmol.ShaderLib = {
  basic: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform float opacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec3 vColor;\nvoid main() {\n    gl_FragColor = vec4( vColor, opacity );\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nattribute vec3 position;\nattribute vec3 color;\nvarying vec3 vColor;\nvoid main() {\n    vColor = color;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
    },
  },
  sphereimposter: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform float opacity;\nuniform mat4 projectionMatrix;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nuniform float uDepth;\nuniform vec3 directionalLightColor[ 1 ];\nvarying vec3 vColor;\nvarying vec2 mapping;\nvarying float rval;\nvarying vec3 vLight;\nvarying vec3 center;\nvoid main() {\n    float lensqr = dot(mapping,mapping);\n    float rsqr = rval*rval;\n    if(lensqr > rsqr)\n       discard;\n    float z = sqrt(rsqr-lensqr);\n    vec3 cameraPos = center+ vec3(mapping.x,mapping.y,z);\n    vec4 clipPos = projectionMatrix * vec4(cameraPos, 1.0);\n    float ndcDepth = clipPos.z / clipPos.w;\n    gl_FragDepthEXT = ((gl_DepthRange.diff * ndcDepth) + gl_DepthRange.near + gl_DepthRange.far) / 2.0;\n    vec3 norm = normalize(vec3(mapping.x,mapping.y,z));\n    float dotProduct = dot( norm, vLight );\n    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n    vec3 vLight = directionalLightColor[ 0 ] * directionalLightWeighting;\n    gl_FragColor = vec4(vLight*vColor, opacity*opacity );\n    float fogFactor = smoothstep( fogNear, fogFar, gl_FragDepthEXT/gl_FragCoord.w );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 directionalLightColor[ 1 ];\nuniform vec3 directionalLightDirection[ 1 ];\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvarying vec2 mapping;\nvarying vec3 vColor;\nvarying float rval;\nvarying vec3 vLight;\nvarying vec3 center;\nvoid main() {\n    vColor = color;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    center = mvPosition.xyz;\n    vec4 projPosition = projectionMatrix * mvPosition;\n    vec4 adjust = projectionMatrix* vec4(normal,0.0); adjust.z = 0.0; adjust.w = 0.0;\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );\n    vLight = normalize( lDirection.xyz );\n    mapping = normal.xy;\n    rval = abs(normal.x);\n    gl_Position = projPosition+adjust;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      directionalLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] },
    },
  },
  lambert: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform float opacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec3 vLightFront;\nvarying vec3 vColor;\nvoid main() {\n    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );\n    #ifndef WIREFRAME\n    gl_FragColor.xyz *= vLightFront;\n    #endif\n    gl_FragColor = gl_FragColor * vec4( vColor, opacity );\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 directionalLightColor[ 1 ];\nuniform vec3 directionalLightDirection[ 1 ];\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvarying vec3 vColor;\nvarying vec3 vLightFront;\nvoid main() {\n    vColor = color;\n    vec3 objectNormal = normal;\n    vec3 transformedNormal = normalMatrix * objectNormal;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vLightFront = vec3( 0.0 );\n    transformedNormal = normalize( transformedNormal );\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );\n    vec3 dirVector = normalize( lDirection.xyz );\n    float dotProduct = dot( transformedNormal, dirVector );\n    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;\n    gl_Position = projectionMatrix * mvPosition;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      directionalLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] },
    },
  },
  instanced: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform float opacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec3 vLightFront;\nvarying vec3 vColor;\nvoid main() {\n    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );\n    #ifndef WIREFRAME\n    gl_FragColor.xyz *= vLightFront;\n    #endif\n    gl_FragColor = gl_FragColor * vec4( vColor, opacity );\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 directionalLightColor[ 1 ];\nuniform vec3 directionalLightDirection[ 1 ];\nattribute vec3 offset;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nattribute float radius;\nvarying vec3 vColor;\nvarying vec3 vLightFront;\nvoid main() {\n    vColor = color;\n    vec3 objectNormal = normal;\n    vec3 transformedNormal = normalMatrix * objectNormal;\n    vec4 mvPosition = modelViewMatrix * vec4( position * radius + offset, 1.0 );\n    vLightFront = vec3( 0.0 );\n    transformedNormal = normalize( transformedNormal );\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );\n    vec3 dirVector = normalize( lDirection.xyz );\n    float dotProduct = dot( transformedNormal, dirVector );\n    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;\n    gl_Position = projectionMatrix * mvPosition;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      directionalLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] },
    },
  },
  outline: {
    fragmentShader:
      "uniform float opacity;\nuniform vec3 outlineColor;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvoid main() {\n    gl_FragColor = vec4( outlineColor, 1 );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float outlineWidth;\nuniform float outlinePushback;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvoid main() {\n    vec4 norm = modelViewMatrix*vec4(normalize(normal),0.0);\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    mvPosition.xy += norm.xy*outlineWidth;\n    gl_Position = projectionMatrix * mvPosition;\n    mvPosition.z -= outlinePushback;\n    vec4 pushpos = projectionMatrix*mvPosition;\n    gl_Position.z = gl_Position.w*pushpos.z/pushpos.w;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      outlineColor: { type: "c", value: new $3Dmol.Color(0, 0, 0) },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      outlineWidth: { type: "f", value: 0.1 },
      outlinePushback: { type: "f", value: 1 },
    },
  },
  sphereimposteroutline: {
    fragmentShader:
      "uniform float opacity;\nuniform vec3 outlineColor;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nuniform mat4 projectionMatrix;\nvarying vec2 mapping;\nvarying float rval;\nvarying vec3 center;\nuniform float outlinePushback;\nvoid main() {\n    float lensqr = dot(mapping,mapping);\n    float rsqr = rval*rval;\n    if(lensqr > rsqr)\n       discard;\n    float z = sqrt(rsqr-lensqr);\n    vec3 cameraPos = center+ vec3(mapping.x,mapping.y,z-outlinePushback);\n    vec4 clipPos = projectionMatrix * vec4(cameraPos, 1.0);\n    float ndcDepth = clipPos.z / clipPos.w;\n    gl_FragDepthEXT = ((gl_DepthRange.diff * ndcDepth) + gl_DepthRange.near + gl_DepthRange.far) / 2.0;\n    gl_FragColor = vec4(outlineColor, 1 );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float outlineWidth;\nuniform float outlinePushback;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvarying vec2 mapping;\nvarying float rval;\nvarying vec3 center;\nvoid main() {\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    center = mvPosition.xyz;\n    vec4 projPosition = projectionMatrix * mvPosition;\n    vec2 norm = normal.xy + vec2(sign(normal.x)*outlineWidth,sign(normal.y)*outlineWidth);\n    vec4 adjust = projectionMatrix* vec4(norm,normal.z,0.0); adjust.z = 0.0; adjust.w = 0.0;\n    mapping = norm.xy;\n    rval = abs(norm.x);\n    gl_Position = projPosition+adjust;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      outlineColor: { type: "c", value: new $3Dmol.Color(0, 0, 0) },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      outlineWidth: { type: "f", value: 0.1 },
      outlinePushback: { type: "f", value: 1 },
    },
  },
  stickimposter: {
    fragmentShader: [
      $3Dmol.ShaderUtils.stickimposterFragmentShader,
      "    float dotProduct = dot( norm, vLight );\n    vec3 light = vec3( max( dotProduct, 0.0 ) );\n    gl_FragColor = vec4(light*color, opacity*opacity );\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    ].join("\n"),
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 directionalLightColor[ 1 ];\nuniform vec3 directionalLightDirection[ 1 ];\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nattribute float radius;\nvarying vec3 vColor;\nvarying vec3 vLight;\nvarying vec3 cposition;\nvarying vec3 p1;\nvarying vec3 p2;\nvarying float r;\nvoid main() {\n    vColor = color; vColor.z = abs(vColor.z);\n    r = abs(radius);\n    vec4 to = modelViewMatrix*vec4(normal, 1.0);\n    vec4 pt = modelViewMatrix*vec4(position, 1.0);\n    vec4 mvPosition = pt;\n    p1 = pt.xyz; p2 = to.xyz;\n    vec3 norm = to.xyz-pt.xyz;\n    float mult = 1.1;\n    if(length(p1) > length(p2)) {\n       mvPosition = to;\n    }\n    vec3 n = normalize(mvPosition.xyz);\n    if(color.z >= 0.0) {\n       vec3 pnorm = normalize(p1);\n       float t = dot(mvPosition.xyz-p1,n)/dot(pnorm,n);\n       mvPosition.xyz = p1+t*pnorm;\n    } else {\n       vec3 pnorm = normalize(p2);\n       float t = dot(mvPosition.xyz-p2,n)/dot(pnorm,n);\n       mvPosition.xyz = p2+t*pnorm;\n       mult *= -1.0;\n    }\n    vec3 cr = normalize(cross(mvPosition.xyz,norm))*radius;\n    vec3 doublecr = normalize(cross(mvPosition.xyz,cr))*radius;\n    mvPosition.xy +=  mult*(cr + doublecr).xy;\n    cposition = mvPosition.xyz;\n    gl_Position = projectionMatrix * mvPosition;\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );\n    vLight = normalize( lDirection.xyz )*directionalLightColor[0];\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      directionalLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] },
    },
  },
  stickimposteroutline: {
    fragmentShader:
      $3Dmol.ShaderUtils.stickimposterFragmentShader +
      "gl_FragColor = vec4(color,1.0);}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 directionalLightColor[ 1 ];\nuniform vec3 directionalLightDirection[ 1 ];\nuniform vec3 outlineColor;\nuniform float outlineWidth;\nuniform float outlinePushback;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nattribute float radius;\nvarying vec3 vColor;\nvarying vec3 vLight;\nvarying vec3 cposition;\nvarying vec3 p1;\nvarying vec3 p2;\nvarying float r;\nvoid main() {\n    vColor = outlineColor;\n    float rad = radius+sign(radius)*outlineWidth;\n    r = abs(rad);\n    vec4 to = modelViewMatrix*vec4(normal, 1.0);\n    vec4 pt = modelViewMatrix*vec4(position, 1.0);\n    to.xyz += normalize(to.xyz)*outlinePushback;\n    pt.xyz += normalize(pt.xyz)*outlinePushback;\n    vec4 mvPosition = pt;\n    p1 = pt.xyz; p2 = to.xyz;\n    vec3 norm = to.xyz-pt.xyz;\n    float mult = 1.1;\n    if(length(p1) > length(p2)) {\n       mvPosition = to;\n    }\n    vec3 n = normalize(mvPosition.xyz);\n    if(color.z >= 0.0) {\n       vec3 pnorm = normalize(p1);\n       float t = dot(mvPosition.xyz-p1,n)/dot(pnorm,n);\n       mvPosition.xyz = p1+t*pnorm;\n    } else {\n       vec3 pnorm = normalize(p2);\n       float t = dot(mvPosition.xyz-p2,n)/dot(pnorm,n);\n       mvPosition.xyz = p2+t*pnorm;\n       mult *= -1.0;\n    }\n    vec3 cr = normalize(cross(mvPosition.xyz,norm))*rad;\n    vec3 doublecr = normalize(cross(mvPosition.xyz,cr))*rad;\n    mvPosition.xy +=  mult*(cr + doublecr).xy;\n    cposition = mvPosition.xyz;\n    gl_Position = projectionMatrix * mvPosition;\n    vLight = vec3(1.0,1.0,1.0);\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      outlineColor: { type: "c", value: new $3Dmol.Color(0, 0, 0) },
      outlineWidth: { type: "f", value: 0.1 },
      outlinePushback: { type: "f", value: 1 },
    },
  },
  lambertdouble: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform float opacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec3 vLightFront;\nvarying vec3 vLightBack;\nvarying vec3 vColor;\nvoid main() {\n    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );\n    #ifndef WIREFRAME\n    if ( gl_FrontFacing )\n       gl_FragColor.xyz *= vLightFront;\n    else\n       gl_FragColor.xyz *= vLightBack;\n    #endif\n    gl_FragColor = gl_FragColor * vec4( vColor, opacity );\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 directionalLightColor[ 1 ];\nuniform vec3 directionalLightDirection[ 1 ];\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvarying vec3 vColor;\nvarying vec3 vLightFront;\nvarying vec3 vLightBack;\nvoid main() {\n    vColor = color;\n    vec3 objectNormal = normal;\n    vec3 transformedNormal = normalMatrix * objectNormal;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vLightFront = vec3( 0.0 );\n    vLightBack = vec3( 0.0 );\n    transformedNormal = normalize( transformedNormal );\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );\n    vec3 dirVector = normalize( lDirection.xyz );\n    float dotProduct = dot( transformedNormal, dirVector );\n    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n    vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;\n    vLightBack += directionalLightColor[ 0 ] * directionalLightWeightingBack;\n    gl_Position = projectionMatrix * mvPosition;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      directionalLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] },
    },
  },
  sprite: {
    fragmentShader:
      "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\n    vec4 texture = texture2D(map, vUV);\n    if (texture.a < alphaTest) discard;\n    gl_FragColor = vec4(color * texture.xyz, texture.a * opacity);\n    if (fogType > 0) {\n        float depth = gl_FragCoord.z / gl_FragCoord.w;\n        float fogFactor = 0.0;\n        if (fogType == 1) {\n            fogFactor = smoothstep(fogNear, fogFar, depth);\n        }\n        else {\n            const float LOG2 = 1.442695;\n            float fogFactor = exp2(- fogDensity * fogDensity * depth * depth * LOG2);\n            fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);\n        }\n        gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);\n    }\n}",
    vertexShader:
      "uniform int useScreenCoordinates;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\n    vUV = uvOffset + uv * uvScale;\n    vec2 alignedPosition = position + alignment;\n    vec2 rotatedPosition;\n    rotatedPosition.x = ( cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y ) * scale.x;\n    rotatedPosition.y = ( sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y ) * scale.y;\n    vec4 finalPosition;\n    if(useScreenCoordinates != 0) {\n        finalPosition = vec4(screenPosition.xy + rotatedPosition, screenPosition.z, 1.0);\n    }\n    else {\n        finalPosition = projectionMatrix * modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0); finalPosition /= finalPosition.w;\n        finalPosition.xy += rotatedPosition; \n    }\n    gl_Position = finalPosition;\n}",
    uniforms: {},
  },
};
"undefined" === typeof console && (console = { log: function () {} });
$3Dmol.ProteinSurface = function () {
  var b = 0,
    c = 0,
    d = 0,
    p = 2,
    t = 0,
    A = 0,
    y = 0,
    z = 0,
    f = null,
    h = null,
    l = null,
    m = 0,
    w = 0,
    e = 0,
    G = 0,
    g = 0,
    s = 0,
    u = {
      H: 1.2,
      Li: 1.82,
      Na: 2.27,
      K: 2.75,
      C: 1.7,
      N: 1.55,
      O: 1.52,
      F: 1.47,
      P: 1.8,
      S: 1.8,
      CL: 1.75,
      BR: 1.85,
      SE: 1.9,
      ZN: 1.39,
      CU: 1.4,
      NI: 1.63,
      X: 2,
    },
    x = function (b) {
      return b.elem && "undefined" != typeof u[b.elem] ? b.elem : "X";
    },
    q = {},
    N = {},
    I,
    D,
    C = [
      new Int32Array([1, 0, 0]),
      new Int32Array([-1, 0, 0]),
      new Int32Array([0, 1, 0]),
      new Int32Array([0, -1, 0]),
      new Int32Array([0, 0, 1]),
      new Int32Array([0, 0, -1]),
      new Int32Array([1, 1, 0]),
      new Int32Array([1, -1, 0]),
      new Int32Array([-1, 1, 0]),
      new Int32Array([-1, -1, 0]),
      new Int32Array([1, 0, 1]),
      new Int32Array([1, 0, -1]),
      new Int32Array([-1, 0, 1]),
      new Int32Array([-1, 0, -1]),
      new Int32Array([0, 1, 1]),
      new Int32Array([0, 1, -1]),
      new Int32Array([0, -1, 1]),
      new Int32Array([0, -1, -1]),
      new Int32Array([1, 1, 1]),
      new Int32Array([1, 1, -1]),
      new Int32Array([1, -1, 1]),
      new Int32Array([-1, 1, 1]),
      new Int32Array([1, -1, -1]),
      new Int32Array([-1, -1, 1]),
      new Int32Array([-1, 1, -1]),
      new Int32Array([-1, -1, -1]),
    ];
  this.getFacesAndVertices = function (e) {
    var g = {},
      y,
      w;
    y = 0;
    for (w = e.length; y < w; y++) g[e[y]] = !0;
    e = D;
    y = 0;
    for (w = e.length; y < w; y++)
      (e[y].x = e[y].x / p - b),
        (e[y].y = e[y].y / p - c),
        (e[y].z = e[y].z / p - d);
    var m = [];
    y = 0;
    for (w = I.length; y < w; y += 3) {
      var q = I[y],
        z = I[y + 1],
        x = I[y + 2],
        s = e[z].atomid,
        u = e[x].atomid,
        G = e[q].atomid;
      s < G && (G = s);
      u < G && (G = u);
      g[G] &&
        q !== z &&
        z !== x &&
        q !== x &&
        (m.push(q), m.push(z), m.push(x));
    }
    l = h = f = null;
    return { vertices: e, faces: m };
  };
  this.initparm = function (q, x, L) {
    1e6 < L && (p = 1);
    L = (1 / p) * 5.5;
    m = q[0][0];
    G = q[1][0];
    w = q[0][1];
    g = q[1][1];
    e = q[0][2];
    s = q[1][2];
    x
      ? ((m -= 1.4 + L),
        (w -= 1.4 + L),
        (e -= 1.4 + L),
        (G += 1.4 + L),
        (g += 1.4 + L),
        (s += 1.4 + L))
      : ((m -= L), (w -= L), (e -= L), (G += L), (g += L), (s += L));
    m = Math.floor(m * p) / p;
    w = Math.floor(w * p) / p;
    e = Math.floor(e * p) / p;
    G = Math.ceil(G * p) / p;
    g = Math.ceil(g * p) / p;
    s = Math.ceil(s * p) / p;
    b = -m;
    c = -w;
    d = -e;
    y = Math.ceil(p * (G - m)) + 1;
    A = Math.ceil(p * (g - w)) + 1;
    t = Math.ceil(p * (s - e)) + 1;
    this.boundingatom(x);
    z = 1.4 * p;
    f = new Uint8Array(y * A * t);
    h = new Float64Array(y * A * t);
    l = new Int32Array(y * A * t);
  };
  this.boundingatom = function (b) {
    var c = [],
      l,
      f;
    flagradius = b;
    for (var e in u)
      if (u.hasOwnProperty(e))
        for (
          f = u[e],
            c[e] = b ? (f + 1.4) * p + 0.5 : f * p + 0.5,
            f = c[e] * c[e],
            N[e] = Math.floor(c[e]) + 1,
            q[e] = new Int32Array(N[e] * N[e]),
            j = indx = 0;
          j < N[e];
          j++
        )
          for (k = 0; k < N[e]; k++)
            (l = j * j + k * k),
              l > f
                ? (q[e][indx] = -1)
                : ((l = Math.sqrt(f - l)), (q[e][indx] = Math.floor(l))),
              indx++;
  };
  this.fillvoxels = function (b, c) {
    var e, g;
    e = 0;
    for (g = f.length; e < g; e++) (f[e] = 0), (h[e] = -1), (l[e] = -1);
    for (e in c) (g = b[c[e]]), void 0 !== g && this.fillAtom(g, b);
    e = 0;
    for (g = f.length; e < g; e++) f[e] & 1 && (f[e] |= 2);
  };
  this.fillAtom = function (e, h) {
    var g, w, m, z, s, u, G, B, D, C, I, Y, ba, E, aa, T, Z;
    g = Math.floor(0.5 + p * (e.x + b));
    w = Math.floor(0.5 + p * (e.y + c));
    m = Math.floor(0.5 + p * (e.z + d));
    var W = x(e),
      U = 0,
      X = A * t;
    C = 0;
    for (Z = N[W]; C < Z; C++)
      for (I = 0; I < Z; I++) {
        if (-1 != q[W][U])
          for (E = -1; 2 > E; E++)
            for (aa = -1; 2 > aa; aa++)
              for (T = -1; 2 > T; T++)
                if (0 !== E && 0 !== aa && 0 !== T)
                  for (G = E * C, D = T * I, Y = 0; Y <= q[W][U]; Y++)
                    (B = Y * aa),
                      (z = g + G),
                      (s = w + B),
                      (ba = m + D),
                      0 > z ||
                        0 > s ||
                        0 > ba ||
                        z >= y ||
                        s >= A ||
                        ba >= t ||
                        ((ba = z * X + s * t + ba),
                        f[ba] & 1
                          ? ((u = h[l[ba]]),
                            u.serial != e.serial &&
                              ((z = g + G - Math.floor(0.5 + p * (u.x + b))),
                              (s = w + B - Math.floor(0.5 + p * (u.y + c))),
                              (u = m + D - Math.floor(0.5 + p * (u.z + d))),
                              G * G + B * B + D * D < z * z + s * s + u * u &&
                                (l[ba] = e.serial)))
                          : ((f[ba] |= 1), (l[ba] = e.serial)));
        U++;
      }
  };
  this.fillvoxelswaals = function (b, c) {
    var l, e;
    l = 0;
    for (e = f.length; l < e; l++) f[l] &= -3;
    for (l in c) (e = b[c[l]]), void 0 !== e && this.fillAtomWaals(e, b);
  };
  this.fillAtomWaals = function (e, h) {
    var g,
      w,
      m,
      z,
      s,
      u,
      G = 0,
      B,
      D,
      C,
      I,
      Y,
      ba,
      E,
      aa,
      T,
      Z,
      W;
    g = Math.floor(0.5 + p * (e.x + b));
    w = Math.floor(0.5 + p * (e.y + c));
    m = Math.floor(0.5 + p * (e.z + d));
    var U = x(e),
      X = A * t;
    Y = 0;
    for (W = N[U]; Y < W; Y++)
      for (ba = 0; ba < W; ba++) {
        if (-1 != q[U][G])
          for (aa = -1; 2 > aa; aa++)
            for (T = -1; 2 > T; T++)
              for (Z = -1; 2 > Z; Z++)
                if (0 !== aa && 0 !== T && 0 !== Z)
                  for (B = aa * Y, C = Z * ba, E = 0; E <= q[U][G]; E++)
                    (D = E * T),
                      (z = g + B),
                      (s = w + D),
                      (I = m + C),
                      0 > z ||
                        0 > s ||
                        0 > I ||
                        z >= y ||
                        s >= A ||
                        I >= t ||
                        ((I = z * X + s * t + I),
                        f[I] & 2
                          ? ((u = h[l[I]]),
                            u.serial != e.serial &&
                              ((z = g + B - Math.floor(0.5 + p * (u.x + b))),
                              (s = w + D - Math.floor(0.5 + p * (u.y + c))),
                              (u = m + C - Math.floor(0.5 + p * (u.z + d))),
                              B * B + D * D + C * C < z * z + s * s + u * u &&
                                (l[I] = e.serial)))
                          : ((f[I] |= 2), (l[I] = e.serial)));
        G++;
      }
  };
  this.buildboundary = function () {
    var b = A * t;
    for (i = 0; i < y; i++)
      for (j = 0; j < t; j++)
        for (k = 0; k < A; k++) {
          var c = i * b + k * t + j;
          if (f[c] & 1)
            for (var l = 0; 26 > l; ) {
              var e = i + C[l][0],
                h = j + C[l][2],
                g = k + C[l][1];
              if (
                -1 < e &&
                e < y &&
                -1 < g &&
                g < A &&
                -1 < h &&
                h < t &&
                !(f[e * b + g * t + h] & 1)
              ) {
                f[c] |= 4;
                break;
              } else l++;
            }
        }
  };
  var B = function (b, c, l) {
    var e = new Int32Array(b * c * l * 3);
    this.set = function (b, f, h, g) {
      b = 3 * ((b * c + f) * l + h);
      e[b] = g.ix;
      e[b + 1] = g.iy;
      e[b + 2] = g.iz;
    };
    this.get = function (b, f, h) {
      b = 3 * ((b * c + f) * l + h);
      return { ix: e[b], iy: e[b + 1], iz: e[b + 2] };
    };
  };
  this.fastdistancemap = function () {
    var b,
      c,
      l,
      e = new B(y, A, t),
      g = A * t,
      w = z * z,
      d = [];
    l = [];
    var m;
    for (b = 0; b < y; b++)
      for (c = 0; c < A; c++)
        for (l = 0; l < t; l++)
          if (((m = b * g + c * t + l), (f[m] &= -3), f[m] & 1 && f[m] & 4)) {
            var q = { ix: b, iy: c, iz: l };
            e.set(b, c, l, q);
            d.push(q);
            h[m] = 0;
            f[m] |= 2;
            f[m] &= -5;
          }
    do
      for (l = this.fastoneshell(d, e), d = [], b = 0, c = l.length; b < c; b++)
        (m = g * l[b].ix + t * l[b].iy + l[b].iz),
          (f[m] &= -5),
          h[m] <= 1.0404 * w &&
            d.push({ ix: l[b].ix, iy: l[b].iy, iz: l[b].iz });
    while (0 !== d.length);
    b = p - 0.5;
    0 > b && (b = 0);
    w -= 0.5 / (0.1 + b);
    for (b = 0; b < y; b++)
      for (c = 0; c < A; c++)
        for (l = 0; l < t; l++)
          (m = b * g + c * t + l),
            (f[m] &= -5),
            f[m] & 1 && (!(f[m] & 2) || (f[m] & 2 && h[m] >= w)) && (f[m] |= 4);
  };
  this.fastoneshell = function (b, c) {
    var l,
      e,
      g,
      m,
      w,
      d,
      q,
      z,
      x,
      s,
      u,
      G = [];
    if (0 === b.length) return G;
    tnv = { ix: -1, iy: -1, iz: -1 };
    var B = A * t;
    q = 0;
    for (x = b.length; q < x; q++)
      for (
        l = b[q].ix, e = b[q].iy, g = b[q].iz, s = c.get(l, e, g), z = 0;
        6 > z;
        z++
      )
        (tnv.ix = l + C[z][0]),
          (tnv.iy = e + C[z][1]),
          (tnv.iz = g + C[z][2]),
          tnv.ix < y &&
            -1 < tnv.ix &&
            tnv.iy < A &&
            -1 < tnv.iy &&
            tnv.iz < t &&
            -1 < tnv.iz &&
            ((u = tnv.ix * B + t * tnv.iy + tnv.iz),
            f[u] & 1 && !(f[u] & 2)
              ? (c.set(tnv.ix, tnv.iy, g + C[z][2], s),
                (m = tnv.ix - s.ix),
                (w = tnv.iy - s.iy),
                (d = tnv.iz - s.iz),
                (m = m * m + w * w + d * d),
                (h[u] = m),
                (f[u] |= 2),
                (f[u] |= 4),
                G.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz }))
              : f[u] & 1 &&
                f[u] & 2 &&
                ((m = tnv.ix - s.ix),
                (w = tnv.iy - s.iy),
                (d = tnv.iz - s.iz),
                (m = m * m + w * w + d * d),
                m < h[u] &&
                  (c.set(tnv.ix, tnv.iy, tnv.iz, s),
                  (h[u] = m),
                  f[u] & 4 ||
                    ((f[u] |= 4),
                    G.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz })))));
    q = 0;
    for (x = b.length; q < x; q++)
      for (
        l = b[q].ix, e = b[q].iy, g = b[q].iz, s = c.get(l, e, g), z = 6;
        18 > z;
        z++
      )
        (tnv.ix = l + C[z][0]),
          (tnv.iy = e + C[z][1]),
          (tnv.iz = g + C[z][2]),
          tnv.ix < y &&
            -1 < tnv.ix &&
            tnv.iy < A &&
            -1 < tnv.iy &&
            tnv.iz < t &&
            -1 < tnv.iz &&
            ((u = tnv.ix * B + t * tnv.iy + tnv.iz),
            f[u] & 1 && !(f[u] & 2)
              ? (c.set(tnv.ix, tnv.iy, g + C[z][2], s),
                (m = tnv.ix - s.ix),
                (w = tnv.iy - s.iy),
                (d = tnv.iz - s.iz),
                (m = m * m + w * w + d * d),
                (h[u] = m),
                (f[u] |= 2),
                (f[u] |= 4),
                G.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz }))
              : f[u] & 1 &&
                f[u] & 2 &&
                ((m = tnv.ix - s.ix),
                (w = tnv.iy - s.iy),
                (d = tnv.iz - s.iz),
                (m = m * m + w * w + d * d),
                m < h[u] &&
                  (c.set(tnv.ix, tnv.iy, tnv.iz, s),
                  (h[u] = m),
                  f[u] & 4 ||
                    ((f[u] |= 4),
                    G.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz })))));
    q = 0;
    for (x = b.length; q < x; q++)
      for (
        l = b[q].ix, e = b[q].iy, g = b[q].iz, s = c.get(l, e, g), z = 18;
        26 > z;
        z++
      )
        (tnv.ix = l + C[z][0]),
          (tnv.iy = e + C[z][1]),
          (tnv.iz = g + C[z][2]),
          tnv.ix < y &&
            -1 < tnv.ix &&
            tnv.iy < A &&
            -1 < tnv.iy &&
            tnv.iz < t &&
            -1 < tnv.iz &&
            ((u = tnv.ix * B + t * tnv.iy + tnv.iz),
            f[u] & 1 && !(f[u] & 2)
              ? (c.set(tnv.ix, tnv.iy, g + C[z][2], s),
                (m = tnv.ix - s.ix),
                (w = tnv.iy - s.iy),
                (d = tnv.iz - s.iz),
                (m = m * m + w * w + d * d),
                (h[u] = m),
                (f[u] |= 2),
                (f[u] |= 4),
                G.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz }))
              : f[u] & 1 &&
                f[u] & 2 &&
                ((m = tnv.ix - s.ix),
                (w = tnv.iy - s.iy),
                (d = tnv.iz - s.iz),
                (m = m * m + w * w + d * d),
                m < h[u] &&
                  (c.set(tnv.ix, tnv.iy, tnv.iz, s),
                  (h[u] = m),
                  f[u] & 4 ||
                    ((f[u] |= 4),
                    G.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz })))));
    return G;
  };
  this.marchingcubeinit = function (b) {
    for (var c = 0, l = f.length; c < l; c++)
      1 == b
        ? (f[c] &= -5)
        : 4 == b
        ? ((f[c] &= -3), f[c] & 4 && (f[c] |= 2), (f[c] &= -5))
        : 2 == b
        ? f[c] & 4 && f[c] & 2
          ? (f[c] &= -5)
          : f[c] & 4 && !(f[c] & 2) && (f[c] |= 2)
        : 3 == b && (f[c] &= -5);
  };
  this.marchingcube = function (b) {
    this.marchingcubeinit(b);
    D = [];
    I = [];
    $3Dmol.MarchingCube.march(f, D, I, { smooth: 1, nX: y, nY: A, nZ: t });
    b = A * t;
    for (var c = 0, e = D.length; c < e; c++)
      D[c].atomid = l[D[c].x * b + t * D[c].y + D[c].z];
    $3Dmol.MarchingCube.laplacianSmooth(1, D, I);
  };
};
$(document).ready(function () {
  void 0 !== $(".viewer_3Dmoljs")[0] && ($3Dmol.autoinit = !0);
  if ($3Dmol.autoinit) {
    $3Dmol.viewers = {};
    var b = 0;
    $(".viewer_3Dmoljs").each(function () {
      var c = $(this),
        d = null;
      "static" == c.css("position") && c.css("position", "relative");
      var p =
          "function" === typeof window[c.data("callback")]
            ? window[c.data("callback")]
            : null,
        t = null;
      c.data("pdb")
        ? ((d = "http://www.rcsb.org/pdb/files/" + c.data("pdb") + ".pdb"),
          (t = "pdb"))
        : c.data("cid")
        ? ((t = "sdf"),
          (d =
            "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" +
            c.data("cid") +
            "/SDF?record_type=3d"))
        : c.data("href") && (d = c.data("href"));
      var A = $3Dmol.CC.color(c.data("backgroundcolor")),
        y = { line: {} };
      c.data("style") && (y = $3Dmol.specStringToObject(c.data("style")));
      var z = {};
      c.data("select") && (z = $3Dmol.specStringToObject(c.data("select")));
      var f = [],
        h = [],
        l = [],
        m = c.data(),
        w = /style(.+)/,
        e = /surface(.*)/,
        G = /labelres(.*)/,
        g = [],
        s;
      for (s in m) m.hasOwnProperty(s) && g.push(s);
      g.sort();
      for (var u = 0; u < g.length; u++) {
        s = g[u];
        var x = w.exec(s);
        if (x) {
          var x = "select" + x[1],
            x = $3Dmol.specStringToObject(m[x]),
            q = $3Dmol.specStringToObject(m[s]);
          f.push([x, q]);
        }
        if ((x = e.exec(s)))
          (x = "select" + x[1]),
            (x = $3Dmol.specStringToObject(m[x])),
            (q = $3Dmol.specStringToObject(m[s])),
            h.push([x, q]);
        if ((x = G.exec(s)))
          (x = "select" + x[1]),
            (x = $3Dmol.specStringToObject(m[x])),
            (q = $3Dmol.specStringToObject(m[s])),
            l.push([x, q]);
      }
      var N = function (b) {
          b.setStyle(z, y);
          for (var c = 0; c < f.length; c++) {
            var e = f[c][0] || {},
              g = f[c][1] || { line: {} };
            b.setStyle(e, g);
          }
          for (c = 0; c < h.length; c++)
            (e = h[c][0] || {}),
              (g = h[c][1] || {}),
              b.addSurface($3Dmol.SurfaceType.VDW, g, e, e);
          for (c = 0; c < l.length; c++)
            (e = l[c][0] || {}), (g = l[c][1] || {}), b.addResLabels(e, g);
          b.zoomTo();
          b.render();
        },
        I = null;
      try {
        (I = $3Dmol.viewers[this.id || b++] =
          $3Dmol.createViewer(c, {
            defaultcolors: $3Dmol.rasmolElementColors,
          })),
          I.setBackgroundColor(A);
      } catch (D) {
        window.location = "http://get.webgl.org";
      }
      d
        ? ((t = c.data("type") || c.data("datatype") || t) ||
            (t = d.substr(d.lastIndexOf(".") + 1)),
          $.get(
            d,
            function (b) {
              I.addModel(b, t);
              N(I);
              p && p(I);
            },
            "text"
          ))
        : (c.data("element") &&
            ((d = $("#" + c.data("element")).val() || ""),
            (t = c.data("type") || c.data("datatype")),
            t ||
              (console.log(
                "Warning: No type specified for embedded viewer with moldata from " +
                  c.data("element") +
                  "\n assuming type 'pdb'"
              ),
              (t = "pdb")),
            I.addModel(d, t)),
          N(I),
          p && p(I));
    });
  }
});
(function () {
  $3Dmol.elementColors.greenCarbon.C = 65280;
  $3Dmol.elementColors.cyanCarbon.C = 65535;
  $3Dmol.elementColors.magentaCarbon.C = 16711935;
  $3Dmol.elementColors.yellowCarbon.C = 16776960;
  $3Dmol.elementColors.whiteCarbon.C = 16777215;
  $3Dmol.elementColors.orangeCarbon.C = 16737792;
  $3Dmol.elementColors.purpleCarbon.C = 8388736;
  $3Dmol.elementColors.blueCarbon.C = 255;
});
$3Dmol.CC = {
  cache: { 0: new $3Dmol.Color(0) },
  color: function color_(c) {
    if (!c) return this.cache[0];
    if ("undefined" !== typeof this.cache[c]) return this.cache[c];
    if (c && c.constructor === Array) return c.map(color_, this);
    c = this.getHex(c);
    if ("number" === typeof c) {
      var d = new $3Dmol.Color(c);
      return (this.cache[c] = d);
    }
    return c;
  },
  colorTab: {
    white: 16777215,
    silver: 12632256,
    gray: 8421504,
    grey: 8421504,
    black: 0,
    red: 16711680,
    maroon: 8388608,
    yellow: 16776960,
    orange: 16737792,
    olive: 8421376,
    lime: 65280,
    green: 32768,
    aqua: 65535,
    cyan: 65535,
    teal: 32896,
    blue: 255,
    navy: 128,
    fuchsia: 16711935,
    magenta: 16711935,
    purple: 8388736,
  },
  getHex: function (b) {
    return isNaN(parseInt(b))
      ? "string" === typeof b
        ? this.colorTab[b.trim().toLowerCase()] || 0
        : b
      : parseInt(b);
  },
};
$3Dmol.CC = $3Dmol.CC;
$3Dmol.CC.color = $3Dmol.CC.color;
$3Dmol.getColorFromStyle = function (b, c) {
  var d = b.color;
  "undefined" != typeof c.color && "spectrum" != c.color && (d = c.color);
  if ("undefined" != typeof c.colorscheme)
    if ("undefined" != typeof $3Dmol.elementColors[c.colorscheme]) {
      var p = $3Dmol.elementColors[c.colorscheme];
      "undefined" != typeof p[b.elem] && (d = p[b.elem]);
    } else if ("undefined" != typeof c.colorscheme[b.elem])
      d = c.colorscheme[b.elem];
    else if (
      "undefined" != typeof c.colorscheme.prop &&
      "undefined" != typeof c.colorscheme.gradient
    ) {
      var t = c.colorscheme.prop,
        p = c.colorscheme.gradient,
        A = p.range() || [-1, 1],
        t = $3Dmol.getAtomProperty(b, t);
      null != t && (d = p.valueToHex(t, A));
    } else
      "undefined" != typeof c.colorscheme.prop &&
        "undefined" != typeof c.colorscheme.map &&
        ((t = c.colorscheme.prop),
        (t = $3Dmol.getAtomProperty(b, t)),
        "undefined" != typeof c.colorscheme.map[t] &&
          (d = c.colorscheme.map[t]));
  else "undefined" != typeof c.colorfunc && (d = c.colorfunc(b));
  return $3Dmol.CC.color(d);
};
$3Dmol.ssColors = $3Dmol.ssColors || {};
$3Dmol.ssColors.pyMOL = { h: 16711680, s: 16776960, c: 65280 };
$3Dmol.ssColors.Jmol = { h: 16711808, s: 16762880, c: 16777215 };
$3Dmol.elementColors = $3Dmol.elementColors || {};
$3Dmol.elementColors.defaultColor = 16716947;
$3Dmol.elementColors.Jmol = {
  H: 16777215,
  He: 14286847,
  HE: 14286847,
  Li: 13402367,
  LI: 13402367,
  B: 16758197,
  C: 9474192,
  N: 3166456,
  O: 16715021,
  F: 9494608,
  Na: 11230450,
  NA: 11230450,
  Mg: 9109248,
  MG: 9109248,
  Al: 12560038,
  AL: 12560038,
  Si: 1578e4,
  SI: 1578e4,
  P: 16744448,
  S: 16777008,
  Cl: 2093087,
  CL: 2093087,
  Ca: 4062976,
  CA: 4062976,
  Ti: 12567239,
  TI: 12567239,
  Cr: 9083335,
  CR: 9083335,
  Mn: 10255047,
  MN: 10255047,
  Fe: 14706227,
  FE: 14706227,
  Ni: 5296208,
  NI: 5296208,
  Cu: 13140019,
  CU: 13140019,
  Zn: 8224944,
  ZN: 8224944,
  Br: 10889513,
  BR: 10889513,
  Ag: 12632256,
  AG: 12632256,
  I: 9699476,
  Ba: 51456,
  BA: 51456,
  Au: 16765219,
  AU: 16765219,
};
$3Dmol.elementColors.rasmol = {
  H: 16777215,
  He: 16761035,
  HE: 16761035,
  Li: 11674146,
  LI: 11674146,
  B: 65280,
  C: 13158600,
  N: 9408511,
  O: 15728640,
  F: 14329120,
  Na: 255,
  NA: 255,
  Mg: 2263842,
  MG: 2263842,
  Al: 8421520,
  AL: 8421520,
  Si: 14329120,
  SI: 14329120,
  P: 16753920,
  S: 16762930,
  Cl: 65280,
  CL: 65280,
  Ca: 8421520,
  CA: 8421520,
  Ti: 8421520,
  TI: 8421520,
  Cr: 8421520,
  CR: 8421520,
  Mn: 8421520,
  MN: 8421520,
  Fe: 16753920,
  FE: 16753920,
  Ni: 10824234,
  NI: 10824234,
  Cu: 10824234,
  CU: 10824234,
  Zn: 10824234,
  ZN: 10824234,
  Br: 10824234,
  BR: 10824234,
  Ag: 8421520,
  AG: 8421520,
  I: 10494192,
  Ba: 16753920,
  BA: 16753920,
  Au: 14329120,
  AU: 14329120,
};
$3Dmol.elementColors.defaultColors = $3Dmol.elementColors.rasmol;
$3Dmol.elementColors.greenCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.greenCarbon.C = 65280;
$3Dmol.elementColors.cyanCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.cyanCarbon.C = 65535;
$3Dmol.elementColors.magentaCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.magentaCarbon.C = 16711935;
$3Dmol.elementColors.yellowCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.yellowCarbon.C = 16776960;
$3Dmol.elementColors.whiteCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.whiteCarbon.C = 16777215;
$3Dmol.elementColors.orangeCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.orangeCarbon.C = 16737792;
$3Dmol.elementColors.purpleCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.purpleCarbon.C = 8388736;
$3Dmol.elementColors.blueCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.blueCarbon.C = 255;
$3Dmol = $3Dmol || {};
$3Dmol.drawCartoon = (function () {
  var b = function (b, c) {
      var f = [],
        h = b,
        h = [];
      h.push(b[0]);
      var l, m, w, e, d, g;
      l = 1;
      for (m = b.length - 1; l < m; l++)
        (e = b[l]),
          (d = b[l + 1]),
          e.smoothen
            ? h.push(
                new $3Dmol.Vector3(
                  (e.x + d.x) / 2,
                  (e.y + d.y) / 2,
                  (e.z + d.z) / 2
                )
              )
            : h.push(e);
      h.push(b[b.length - 1]);
      l = -1;
      for (m = h.length; l <= m - 3; l++)
        if (
          ((w = h[-1 === l ? 0 : l]),
          (e = h[l + 1]),
          (d = h[l + 2]),
          (g = h[l === m - 3 ? m - 1 : l + 3]),
          (w = new $3Dmol.Vector3().subVectors(d, w).multiplyScalar(0.5)),
          (g = new $3Dmol.Vector3().subVectors(g, e).multiplyScalar(0.5)),
          !d.skip)
        )
          for (var s = 0; s < c; s++) {
            var u = (1 / c) * s,
              u = new $3Dmol.Vector3(
                e.x +
                  u * w.x +
                  u * u * (-3 * e.x + 3 * d.x - 2 * w.x - g.x) +
                  u * u * u * (2 * e.x - 2 * d.x + w.x + g.x),
                e.y +
                  u * w.y +
                  u * u * (-3 * e.y + 3 * d.y - 2 * w.y - g.y) +
                  u * u * u * (2 * e.y - 2 * d.y + w.y + g.y),
                e.z +
                  u * w.z +
                  u * u * (-3 * e.z + 3 * d.z - 2 * w.z - g.z) +
                  u * u * u * (2 * e.z - 2 * d.z + w.z + g.z)
              ),
              x = Math.floor((f.length + 2) / c);
            void 0 !== b[x] && void 0 !== b[x].atom && (u.atom = b[x].atom);
            f.push(u);
          }
      f.push(h[h.length - 1]);
      return f;
    },
    c = function (b, c, f, h, l, m) {
      l = new $3Dmol.Geometry(!0);
      for (var d, e, G, g, s = 0, u = c.length; s < u; s++) {
        g = Math.round((s * (h.length - 1)) / u);
        G = $3Dmol.CC.color(h[g]);
        geoGroup = l.updateGeoGroup(2);
        var x = geoGroup.vertexArray,
          q = geoGroup.colorArray;
        g = geoGroup.faceArray;
        d = geoGroup.vertices;
        e = 3 * d;
        x[e] = c[s].x;
        x[e + 1] = c[s].y;
        x[e + 2] = c[s].z;
        x[e + 3] = f[s].x;
        x[e + 4] = f[s].y;
        x[e + 5] = f[s].z;
        for (x = 0; 6 > x; ++x)
          (q[e + 3 * x] = G.r),
            (q[e + 1 + 3 * x] = G.g),
            (q[e + 2 + 3 * x] = G.b);
        0 < s &&
          ((d = [d, d + 1, d - 1, d - 2]),
          (e = geoGroup.faceidx),
          (g[e] = d[0]),
          (g[e + 1] = d[1]),
          (g[e + 2] = d[3]),
          (g[e + 3] = d[1]),
          (g[e + 4] = d[2]),
          (g[e + 5] = d[3]),
          (geoGroup.faceidx += 6));
        geoGroup.vertices += 2;
      }
      l.initTypedArrays();
      l.setUpNormals();
      c = new $3Dmol.MeshDoubleLambertMaterial();
      "number" === typeof m &&
        0 <= m &&
        1 > m &&
        ((c.transparent = !0), (c.opacity = m));
      c.vertexColors = $3Dmol.FaceColors;
      m = new $3Dmol.Mesh(l, c);
      b.add(m);
    },
    d = function (c, d, f, h, l) {
      0 !== d.length &&
        ((l = void 0 === l ? 5 : l),
        (h = new $3Dmol.Geometry()),
        b(d, l),
        (d = new $3Dmol.LineBasicMaterial({ linewidth: f })),
        (d.vertexColors = !0),
        (d = new $3Dmol.Line(h, d)),
        (d.type = $3Dmol.LineStrip),
        c.add(d));
    },
    p = function (d, z, f, h, l, m, w) {
      (w && "default" !== w) || (w = "rectangle");
      if ("edged" === w) {
        if (!(2 > z.length)) {
          var e, G;
          e = z[0];
          G = z[z.length - 1];
          z = h || axisDIV;
          e = b(e, z);
          G = b(G, z);
          if (l) {
            z = new $3Dmol.Geometry(!0);
            var g = [],
              s,
              u,
              x,
              q,
              t,
              p = [
                [0, 2, -6, -8],
                [-4, -2, 6, 4],
                [7, -1, -5, 3],
                [-3, 5, 1, -7],
              ],
              D,
              C,
              B,
              A,
              J,
              L,
              K,
              H;
            J = 0;
            for (L = e.length; J < L; J++) {
              C = Math.round((J * (f.length - 1)) / L);
              C = $3Dmol.CC.color(f[C]);
              g.push((u = e[J]));
              g.push(u);
              g.push((x = G[J]));
              g.push(x);
              J < L - 1 &&
                ((s = e[J + 1].clone().sub(e[J])),
                (s = G[J].clone()
                  .sub(e[J])
                  .cross(s)
                  .normalize()
                  .multiplyScalar(l)));
              g.push((q = e[J].clone().add(s)));
              g.push(q);
              g.push((t = G[J].clone().add(s)));
              g.push(t);
              void 0 !== u.atom && (B = u.atom);
              w = z.updateGeoGroup(8);
              K = w.vertexArray;
              H = w.colorArray;
              var M = w.faceArray;
              h = w.vertices;
              D = 3 * h;
              K[D] = u.x;
              K[D + 1] = u.y;
              K[D + 2] = u.z;
              K[D + 3] = u.x;
              K[D + 4] = u.y;
              K[D + 5] = u.z;
              K[D + 6] = x.x;
              K[D + 7] = x.y;
              K[D + 8] = x.z;
              K[D + 9] = x.x;
              K[D + 10] = x.y;
              K[D + 11] = x.z;
              K[D + 12] = q.x;
              K[D + 13] = q.y;
              K[D + 14] = q.z;
              K[D + 15] = q.x;
              K[D + 16] = q.y;
              K[D + 17] = q.z;
              K[D + 18] = t.x;
              K[D + 19] = t.y;
              K[D + 20] = t.z;
              K[D + 21] = t.x;
              K[D + 22] = t.y;
              K[D + 23] = t.z;
              for (K = 0; 8 > K; ++K)
                (H[D + 3 * K] = C.r),
                  (H[D + 1 + 3 * K] = C.g),
                  (H[D + 2 + 3 * K] = C.b);
              if (0 < J)
                for (
                  D = void 0 !== A && void 0 !== B && A.serial !== B.serial,
                    K = 0;
                  4 > K;
                  K++
                )
                  if (
                    ((H = [h + p[K][0], h + p[K][1], h + p[K][2], h + p[K][3]]),
                    (x = w.faceidx),
                    (M[x] = H[0]),
                    (M[x + 1] = H[1]),
                    (M[x + 2] = H[3]),
                    (M[x + 3] = H[1]),
                    (M[x + 4] = H[2]),
                    (M[x + 5] = H[3]),
                    (w.faceidx += 6),
                    B.clickable || A.clickable)
                  ) {
                    t = g[H[3]].clone();
                    x = g[H[0]].clone();
                    var O = g[H[2]].clone();
                    q = g[H[1]].clone();
                    t.atom = g[H[3]].atom || null;
                    O.atom = g[H[2]].atom || null;
                    x.atom = g[H[0]].atom || null;
                    q.atom = g[H[1]].atom || null;
                    if (D) {
                      var R = t.clone().add(x).multiplyScalar(0.5),
                        V = O.clone().add(q).multiplyScalar(0.5),
                        P = t.clone().add(q).multiplyScalar(0.5);
                      0 === K % 2
                        ? (A.clickable &&
                            ((H = new $3Dmol.Triangle(R, P, t)),
                            (u = new $3Dmol.Triangle(V, O, P)),
                            (t = new $3Dmol.Triangle(P, O, t)),
                            A.intersectionShape.triangle.push(H),
                            A.intersectionShape.triangle.push(u),
                            A.intersectionShape.triangle.push(t)),
                          B.clickable &&
                            ((H = new $3Dmol.Triangle(x, q, P)),
                            (u = new $3Dmol.Triangle(q, V, P)),
                            (t = new $3Dmol.Triangle(x, P, R)),
                            B.intersectionShape.triangle.push(H),
                            B.intersectionShape.triangle.push(u),
                            B.intersectionShape.triangle.push(t)))
                        : (B.clickable &&
                            ((H = new $3Dmol.Triangle(R, P, t)),
                            (u = new $3Dmol.Triangle(V, O, P)),
                            (t = new $3Dmol.Triangle(P, O, t)),
                            B.intersectionShape.triangle.push(H),
                            B.intersectionShape.triangle.push(u),
                            B.intersectionShape.triangle.push(t)),
                          A.clickable &&
                            ((H = new $3Dmol.Triangle(x, q, P)),
                            (u = new $3Dmol.Triangle(q, V, P)),
                            (t = new $3Dmol.Triangle(x, P, R)),
                            A.intersectionShape.triangle.push(H),
                            A.intersectionShape.triangle.push(u),
                            A.intersectionShape.triangle.push(t)));
                    } else
                      B.clickable &&
                        ((H = new $3Dmol.Triangle(x, q, t)),
                        (u = new $3Dmol.Triangle(q, O, t)),
                        B.intersectionShape.triangle.push(H),
                        B.intersectionShape.triangle.push(u));
                  }
              w.vertices += 8;
              A = B;
            }
            f = g.length - 8;
            w = z.updateGeoGroup(8);
            K = w.vertexArray;
            H = w.colorArray;
            M = w.faceArray;
            h = w.vertices;
            D = 3 * h;
            x = w.faceidx;
            for (J = 0; 4 > J; J++)
              g.push(g[2 * J]),
                g.push(g[f + 2 * J]),
                (l = g[2 * J]),
                (B = g[f + 2 * J]),
                (K[D + 6 * J] = l.x),
                (K[D + 1 + 6 * J] = l.y),
                (K[D + 2 + 6 * J] = l.z),
                (K[D + 3 + 6 * J] = B.x),
                (K[D + 4 + 6 * J] = B.y),
                (K[D + 5 + 6 * J] = B.z),
                (H[D + 6 * J] = C.r),
                (H[D + 1 + 6 * J] = C.g),
                (H[D + 2 + 6 * J] = C.b),
                (H[D + 3 + 6 * J] = C.r),
                (H[D + 4 + 6 * J] = C.g),
                (H[D + 5 + 6 * J] = C.b);
            H = [h, h + 2, h + 6, h + 4];
            u = [h + 1, h + 5, h + 7, h + 3];
            M[x] = H[0];
            M[x + 1] = H[1];
            M[x + 2] = H[3];
            M[x + 3] = H[1];
            M[x + 4] = H[2];
            M[x + 5] = H[3];
            M[x + 6] = u[0];
            M[x + 7] = u[1];
            M[x + 8] = u[3];
            M[x + 9] = u[1];
            M[x + 10] = u[2];
            M[x + 11] = u[3];
            w.faceidx += 12;
            w.vertices += 8;
            z.initTypedArrays();
            z.setUpNormals();
            f = new $3Dmol.MeshDoubleLambertMaterial();
            f.vertexColors = $3Dmol.FaceColors;
            "number" === typeof m &&
              0 <= m &&
              1 > m &&
              ((f.transparent = !0), (f.opacity = m));
            m = new $3Dmol.Mesh(z, f);
            d.add(m);
          } else c(d, e, G, f, z, m);
        }
      } else if ("rectangle" === w || "oval" === w || "parabola" === w)
        if (((C = w), (B = z.length), !(2 > B || 2 > z[0].length))) {
          h = h || axisDIV;
          for (A = 0; A < B; A++) z[A] = b(z[A], h);
          s = z[0].length;
          if (l) {
            h = new $3Dmol.Geometry(!0);
            w = [];
            M = [];
            p = [];
            for (D = 0; D < B; D++)
              w.push(
                0.25 + (1.5 * Math.sqrt((B - 1) * D - Math.pow(D, 2))) / (B - 1)
              ),
                M.push(0.5),
                p.push(2 * (Math.pow(D / B, 2) - D / B) + 0.6);
            L = [];
            for (D = 0; D < 2 * B - 1; D++)
              L[D] = [D, D + 1, D + 1 - 2 * B, D - 2 * B];
            L[2 * B - 1] = [D, D + 1 - 2 * B, D + 1 - 4 * B, D - 2 * B];
            K = h.updateGeoGroup(2 * B * s);
            for (A = 0; A < s; A++) {
              D = Math.round((A * (f.length - 1)) / s);
              x = $3Dmol.CC.color(f[D]);
              H = g;
              u = J;
              g = [];
              J = [];
              q = [];
              void 0 !== z[0][A].atom &&
                ((G = z[0][A].atom),
                "oval" === C
                  ? (e = w)
                  : "rectangle" === C
                  ? (e = M)
                  : "parabola" === C && (e = p));
              e || (e = M);
              for (D = 0; D < B; D++)
                (t =
                  A < s - 1
                    ? z[D][A + 1].clone().sub(z[D][A])
                    : z[D][A - 1].clone().sub(z[D][A]).negate()),
                  (O =
                    D < B - 1
                      ? z[D + 1][A].clone().sub(z[D][A])
                      : z[D - 1][A].clone().sub(z[D][A]).negate()),
                  (q[D] = O.cross(t)
                    .normalize()
                    .multiplyScalar(l * e[D]));
              for (D = 0; D < B; D++)
                g[D] = z[D][A].clone().add(q[D].clone().negate());
              for (D = 0; D < B; D++) J[D] = z[D][A].clone().add(q[D]);
              R = K.vertexArray;
              V = K.colorArray;
              t = K.faceArray;
              q = K.vertices;
              O = 3 * q;
              for (D = 0; D < B; D++)
                (R[O + 3 * D + 0] = g[D].x),
                  (R[O + 3 * D + 1] = g[D].y),
                  (R[O + 3 * D + 2] = g[D].z);
              for (D = 0; D < B; D++)
                (R[O + 3 * D + 0 + 3 * B] = J[B - 1 - D].x),
                  (R[O + 3 * D + 1 + 3 * B] = J[B - 1 - D].y),
                  (R[O + 3 * D + 2 + 3 * B] = J[B - 1 - D].z);
              for (D = 0; D < 2 * B; ++D)
                (V[O + 3 * D + 0] = x.r),
                  (V[O + 3 * D + 1] = x.g),
                  (V[O + 3 * D + 2] = x.b);
              if (0 < A) {
                for (D = 0; D < 2 * B; D++)
                  (O = [q + L[D][0], q + L[D][1], q + L[D][2], q + L[D][3]]),
                    (x = K.faceidx),
                    (t[x] = O[0]),
                    (t[x + 1] = O[1]),
                    (t[x + 2] = O[3]),
                    (t[x + 3] = O[1]),
                    (t[x + 4] = O[2]),
                    (t[x + 5] = O[3]),
                    (K.faceidx += 6);
                if (G.clickable)
                  for (D in ((x = []),
                  x.push(new $3Dmol.Triangle(H[0], g[0], g[B - 1])),
                  x.push(new $3Dmol.Triangle(H[0], g[B - 1], H[B - 1])),
                  x.push(new $3Dmol.Triangle(H[B - 1], g[B - 1], J[B - 1])),
                  x.push(new $3Dmol.Triangle(H[B - 1], J[B - 1], u[B - 1])),
                  x.push(new $3Dmol.Triangle(J[0], u[0], u[B - 1])),
                  x.push(new $3Dmol.Triangle(J[B - 1], J[0], u[B - 1])),
                  x.push(new $3Dmol.Triangle(g[0], H[0], u[0])),
                  x.push(new $3Dmol.Triangle(J[0], g[0], u[0])),
                  x))
                    G.intersectionShape.triangle.push(x[D]);
              }
              K.vertices += 2 * B;
            }
            t = K.faceArray;
            q = K.vertices;
            for (A = 0; A < B - 1; A++)
              (O = [A, A + 1, 2 * B - 2 - A, 2 * B - 1 - A]),
                (x = K.faceidx),
                (t[x] = O[0]),
                (t[x + 1] = O[1]),
                (t[x + 2] = O[3]),
                (t[x + 3] = O[1]),
                (t[x + 4] = O[2]),
                (t[x + 5] = O[3]),
                (K.faceidx += 6);
            for (A = 0; A < B - 1; A++)
              (O = [q - 1 - A, q - 2 - A, q - 2 * B + A + 1, q - 2 * B + A]),
                (x = K.faceidx),
                (t[x] = O[0]),
                (t[x + 1] = O[1]),
                (t[x + 2] = O[3]),
                (t[x + 3] = O[1]),
                (t[x + 4] = O[2]),
                (t[x + 5] = O[3]),
                (K.faceidx += 6);
            h.initTypedArrays();
            h.setUpNormals();
            f = new $3Dmol.MeshDoubleLambertMaterial();
            f.vertexColors = $3Dmol.FaceColors;
            "number" === typeof m &&
              0 <= m &&
              1 > m &&
              ((f.transparent = !0), (f.opacity = m));
            m = new $3Dmol.Mesh(h, f);
            d.add(m);
          } else c(d, z[0], z[B - 1], f, h, m);
        }
    },
    t = function (b, c) {
      if (b && c && b.chain === c.chain) {
        if (
          b.reschain === c.reschain &&
          (b.resi === c.resi || b.resi === c.resi - 1)
        )
          return !0;
        if (b.resi < c.resi) {
          var f = new $3Dmol.Vector3(b.x, b.y, b.z),
            h = new $3Dmol.Vector3(c.x, c.y, c.z);
          if (16 > f.distanceToSquared(h)) return !0;
        }
      }
      return !1;
    },
    A = function (b, c, f, h, l, d, w, e, t) {
      var g,
        s = {
          ALA: 5,
          ARG: 11,
          ASN: 8,
          ASP: 8,
          CYS: 6,
          GLN: 9,
          GLU: 9,
          GLY: 4,
          HIS: 10,
          ILE: 8,
          LEU: 8,
          LYS: 9,
          MET: 8,
          PHE: 11,
          PRO: 7,
          SER: 6,
          THR: 7,
          TRP: 14,
          TYR: 12,
          VAL: 7,
        };
      if (h && l && w) {
        var u = l.sub(h);
        u.normalize();
        e = (e = e[parseInt(t) + s[w.resn]])
          ? new $3Dmol.Vector3(e.x, e.y, e.z)
          : new $3Dmol.Vector3(0, 0, 0);
        e.sub(h);
        "arrow start" === w.ss &&
          ((l = e.clone().multiplyScalar(0.3).cross(l)),
          h.add(l),
          (l = e.clone().cross(u).normalize()),
          u.rotateAboutVector(l, 0.43));
        w.style.cartoon.ribbon
          ? (l = w.style.cartoon.thickness || 0.4)
          : w.style.cartoon.width
          ? (l = w.style.cartoon.width)
          : "c" === w.ss
          ? (l = "P" === w.atom ? 0.8 : 0.5)
          : "arrow start" === w.ss
          ? ((l = 1.3), (g = !0))
          : (l =
              "arrow end" === w.ss
                ? 0.5
                : ("h" === w.ss && w.style.cartoon.tubes) ||
                  "tube start" === w.ss
                ? 0.5
                : 1.3);
        null != d && 0 > u.dot(d) && u.negate();
        u.multiplyScalar(l);
        for (d = 0; d < c; d++)
          (l = -1 + (2 * d) / (c - 1)),
            (l = new $3Dmol.Vector3(
              h.x + l * u.x,
              h.y + l * u.y,
              h.z + l * u.z
            )),
            (l.atom = w),
            f && "s" === w.ss && (l.smoothen = !0),
            b[d].push(l);
        if (g)
          for (u.multiplyScalar(2), d = 0; d < c; d++)
            (l = -1 + (2 * d) / (c - 1)),
              (l = new $3Dmol.Vector3(
                h.x + l * u.x,
                h.y + l * u.y,
                h.z + l * u.z
              )),
              (l.atom = w),
              (l.smoothen = !1),
              (l.skip = !0),
              b[d].push(l);
        c = parseFloat(w.style.cartoon.opacity) || 1;
        b.opacity
          ? b.opacity != c &&
            (console.log(
              "Warning: a cartoon-style chain's opacity is ambiguous"
            ),
            (b.opacity = 1))
          : (b.opacity = c);
        c = w.style.cartoon.style || "default";
        b.style
          ? b.style != c &&
            (console.log(
              "Warning: a cartoon chain's strand-style is ambiguous"
            ),
            (b.style = "default"))
          : (b.style = c);
        if ("arrow start" === w.ss || "arrow end" === w.ss) w.ss = "s";
        return g;
      }
    };
  return function (b, c, f, h) {
    h = parseInt(5 * parseFloat(h)) || 5;
    var l = (fill = !0),
      m = (doNotSmoothen = !1),
      w = (num = h);
    h = div = h;
    w = w || 5;
    h = h || 5;
    var e = "CA O P OP2 O2P O5' O3' C5' C2' O5* O3* C5* C2* N1 N3".split(" "),
      G = ["DA", "DG", "A", "G"],
      g = ["DT", "DC", "U", "C", "T"],
      s = G.concat(g),
      u,
      x,
      q,
      N,
      I,
      D,
      C,
      B,
      F,
      J,
      L,
      K,
      H,
      M,
      O,
      R,
      V,
      P = null,
      S = [],
      Q = [];
    for (B = 0; B < w; B++) Q[B] = [];
    var da = (F = !1);
    B = 0;
    for (B in c)
      if (((N = c[B]), "C" === N.elem && "CA" === N.atom)) {
        var Y = t(q, N);
        Y && "s" === N.ss
          ? (F = !0)
          : F &&
            (q &&
              x &&
              q.style.cartoon.arrows &&
              x.style.cartoon.arrows &&
              ((q.ss = "arrow end"), (x.ss = "arrow start")),
            (F = !1));
        Y && "h" === q.ss
          ? (!da && N.style.cartoon.tubes && (N.ss = "tube start"), (da = !0))
          : da &&
            "tube start" !== q.ss &&
            (x && x.style.cartoon.tubes && (x.ss = "tube end"), (da = !1));
        x = q;
        q = N;
      }
    q = void 0;
    for (B in c)
      if (((N = c[B]), void 0 !== N && -1 !== $.inArray(N.atom, e)))
        if (
          ((F = -1 != $.inArray(N.resn.trim(), s)),
          (x = N.style.cartoon),
          "trace" === x.style)
        ) {
          if (
            (P || (P = new $3Dmol.Geometry(!0)),
            ("C" === N.elem && "CA" === N.atom) || (F && "P" === N.atom))
          )
            (D =
              f && "spectrum" === x.color
                ? f.valueToHex(N.resi, f.range())
                : $3Dmol.getColorFromStyle(N, x).getHex()),
              S.push(D),
              (C = $.isNumeric(x.thickness) ? x.thickness : 0.4),
              t(q, N) &&
                (D == I
                  ? ((I = $3Dmol.CC.color(D)),
                    $3Dmol.GLDraw.drawCylinder(P, q, N, C, I, 2, 2))
                  : ((x = new $3Dmol.Vector3()
                      .addVectors(q, N)
                      .multiplyScalar(0.5)),
                    (I = $3Dmol.CC.color(I)),
                    (F = $3Dmol.CC.color(D)),
                    $3Dmol.GLDraw.drawCylinder(P, q, x, C, I, 2, 0),
                    $3Dmol.GLDraw.drawCylinder(P, x, N, C, F, 0, 2))),
              q &&
              P &&
              ((q.style.cartoon && "trace" != q.style.cartoon.style) ||
                q.chain != N.chain)
                ? ((q = new $3Dmol.MeshDoubleLambertMaterial()),
                  (q.vertexColors = $3Dmol.FaceColors),
                  "number" === typeof P.opacity &&
                    0 <= P.opacity &&
                    1 > P.opacity &&
                    ((q.transparent = !0),
                    (q.opacity = P.opacity),
                    delete P.opacity),
                  (P = new $3Dmol.Mesh(P, q)),
                  b.add(P),
                  (P = null))
                : q &&
                  (P.opacity && q.style.cartoon.opacity
                    ? P.opacity != q.style.cartoon.opacity &&
                      (console.log(
                        "Warning: a trace-style chain's opacity is ambiguous"
                      ),
                      (P.opacity = 1))
                    : (P.opacity = parseFloat(q.style.cartoon.opacity) || 1)),
              (q = N),
              (I = D);
        } else {
          u || (u = new $3Dmol.Geometry(!0));
          if (
            (N && "C" === N.elem && "CA" === N.atom) ||
            (F && ("P" === N.atom || 0 == N.atom.indexOf("O5")))
          ) {
            if (V)
              if ("tube end" === N.ss)
                (V = !1),
                  (F = new $3Dmol.Vector3(N.x, N.y, N.z)),
                  $3Dmol.GLDraw.drawCylinder(
                    u,
                    R,
                    F,
                    2,
                    $3Dmol.CC.color(I),
                    1,
                    1
                  ),
                  (N.ss = "h");
              else continue;
            if (
              q &&
              (!t(q, N) ||
                q.style.cartoon.style !== N.style.cartoon.style ||
                "tube start" === q.ss)
            ) {
              "tube start" === q.ss &&
                ((V = !0),
                (R = new $3Dmol.Vector3(q.x, q.y, q.z)),
                (q.ss = "h"));
              O &&
                ((F = H
                  ? new $3Dmol.Vector3().addVectors(q, H).multiplyScalar(0.5)
                  : new $3Dmol.Vector3(q.x, q.y, q.z)),
                $3Dmol.GLDraw.drawCylinder(
                  u,
                  F,
                  O,
                  0.4,
                  $3Dmol.CC.color(O.color),
                  0,
                  2
                ),
                (F = A(Q, w, !m, H, M, K, q, c, B)),
                S.push(D),
                F && S.push(D),
                (O = null));
              for (B = 0; !C && B < w; B++) d(b, Q[B], 1, S, h, Q.opacity);
              l && 0 < Q[0].length && p(b, Q, S, h, C, Q.opacity, Q.style);
              null != u &&
                0 < u.vertices &&
                ((B = new $3Dmol.MeshDoubleLambertMaterial()),
                (B.vertexColors = $3Dmol.FaceColors),
                "number" === typeof Q.opacity &&
                  0 <= Q.opacity &&
                  1 > Q.opacity &&
                  ((B.transparent = !0), (B.opacity = Q.opacity)),
                (u = new $3Dmol.Mesh(u, B)),
                b.add(u),
                (u = null));
              Q = [];
              for (B = 0; B < w; B++) Q[B] = [];
              S = [];
            }
            if (void 0 === q || q.rescode != N.rescode || q.resi != N.resi)
              O &&
                ((F = new $3Dmol.Vector3()
                  .addVectors(q, N)
                  .multiplyScalar(0.5)),
                (D = F.clone().sub(O).multiplyScalar(0.02)),
                F.add(D),
                $3Dmol.GLDraw.drawCylinder(
                  u,
                  F,
                  O,
                  0.4,
                  $3Dmol.CC.color(O.color),
                  0,
                  2
                ),
                (O = null)),
                (D =
                  f && "spectrum" === x.color
                    ? f.valueToHex(N.resi, f.range())
                    : $3Dmol.getColorFromStyle(N, x).getHex()),
                S.push(D),
                (C = $.isNumeric(x.thickness) ? x.thickness : 0.4),
                (q = N),
                (J = new $3Dmol.Vector3(q.x, q.y, q.z)),
                (J.resi = q.resi),
                (I = D);
            !0 !== N.clickable ||
              (void 0 !== N.intersectionShape &&
                void 0 !== N.intersectionShape.triangle) ||
              (N.intersectionShape = {
                sphere: null,
                cylinder: [],
                line: [],
                triangle: [],
              });
          } else if (
            (q && "C" === q.elem && "CA" === q.atom && "O" === N.atom) ||
            (F && "P" === q.atom && ("OP2" === N.atom || "O2P" === N.atom)) ||
            (F && 0 == q.atom.indexOf("O5") && 0 == N.atom.indexOf("C5"))
          ) {
            if (
              ((L = new $3Dmol.Vector3(N.x, N.y, N.z)),
              (L.resi = N.resi),
              "OP2" === N.atom || "O2P" === N.atom)
            )
              M = new $3Dmol.Vector3(N.x, N.y, N.z);
          } else if (F && 0 == N.atom.indexOf("O3"))
            H = new $3Dmol.Vector3(N.x, N.y, N.z);
          else if (
            ("N1" === N.atom && -1 != $.inArray(N.resn.trim(), G)) ||
            ("N3" === N.atom && -1 != $.inArray(N.resn.trim(), g))
          )
            (O = new $3Dmol.Vector3(N.x, N.y, N.z)),
              (O.color = $3Dmol.getColorFromStyle(N, x).getHex());
          L &&
            J &&
            L.resi === J.resi &&
            ((F = A(Q, w, !m, J, L, K, q, c, B)),
            (K = L),
            (L = J = null),
            S.push(D),
            F && S.push(D));
        }
    O &&
      ((F = H
        ? new $3Dmol.Vector3().addVectors(q, H).multiplyScalar(0.5)
        : new $3Dmol.Vector3(q.x, q.y, q.z)),
      $3Dmol.GLDraw.drawCylinder(u, F, O, 0.4, $3Dmol.CC.color(O.color), 0, 2),
      (F = A(Q, w, !m, H, M, K, q, c, B)),
      S.push(D),
      F && S.push(D));
    for (B = 0; !C && B < w; B++) d(b, Q[B], 1, S, h, Q.opacity);
    l && 0 < Q[0].length && p(b, Q, S, h, C, Q.opacity, Q.style);
    null != u &&
      0 < u.vertices &&
      ((B = new $3Dmol.MeshDoubleLambertMaterial()),
      (B.vertexColors = $3Dmol.FaceColors),
      "number" === typeof Q.opacity &&
        0 <= Q.opacity &&
        1 > Q.opacity &&
        ((B.transparent = !0), (B.opacity = Q.opacity)),
      (u = new $3Dmol.Mesh(u, B)),
      b.add(u));
    null != P &&
      0 < P.vertices &&
      ((q = new $3Dmol.MeshDoubleLambertMaterial()),
      (q.vertexColors = $3Dmol.FaceColors),
      "number" === typeof P.opacity &&
        0 <= P.opacity &&
        1 > P.opacity &&
        ((q.transparent = !0), (q.opacity = P.opacity), delete P.opacity),
      (P = new $3Dmol.Mesh(P, q)),
      b.add(P));
  };
})();
$3Dmol = $3Dmol || {};
$3Dmol.GLDraw = (function () {
  var b = {},
    c = (function () {
      var b = new $3Dmol.Vector3();
      return function (c) {
        b.set(c[0], c[1], c[2]);
        var f = b.x,
          h = b.y,
          l = b.z,
          d = Math.sqrt(f * f + h * h);
        1e-4 > d ? ((c = 0), (d = 1)) : ((c = -f / d), (d = h / d));
        h = -c * f + d * h;
        f = Math.sqrt(h * h + l * l);
        1e-4 > f ? ((l = 0), (h = 1)) : ((l /= f), (h /= f));
        f = new Float32Array(9);
        f[0] = d;
        f[1] = c;
        f[2] = 0;
        f[3] = -c * h;
        f[4] = d * h;
        f[5] = l;
        f[6] = c * l;
        f[7] = -d * l;
        f[8] = h;
        return f;
      };
    })(),
    d = (function () {
      var b = [],
        c = Math.pow(2, 4),
        f,
        d = Math.pow(2, 2),
        l = c / d,
        m;
      b[0] = new $3Dmol.Vector3(-1, 0, 0);
      b[l] = new $3Dmol.Vector3(0, 0, 1);
      b[2 * l] = new $3Dmol.Vector3(1, 0, 0);
      b[3 * l] = new $3Dmol.Vector3(0, 0, -1);
      for (f = 3; 4 >= f; f++) {
        d = Math.pow(2, f - 1);
        l = c / d;
        for (m = 0; m < d - 1; m++)
          b[l / 2 + m * l] = b[m * l]
            .clone()
            .add(b[(m + 1) * l])
            .normalize();
        m = d - 1;
        b[l / 2 + m * l] = b[m * l].clone().add(b[0]).normalize();
      }
      return b;
    })(),
    p = {
      cache: { false: {}, true: {} },
      getVerticesForRadius: function (b, c) {
        if (void 0 !== this.cache[c][b]) return this.cache[c][b];
        new $3Dmol.Vector3(0, 1, 0);
        for (var f = d.length, h = [], l = [], m, w = 0; w < f; w++)
          h.push(d[w].clone().multiplyScalar(b)),
            h.push(d[w].clone().multiplyScalar(b)),
            (m = d[w].clone().normalize()),
            l.push(m),
            l.push(m);
        var w = [],
          e = 2 * Math.PI,
          t = Math.PI,
          g,
          s,
          u = !1,
          x = !1;
        for (s = 0; 10 >= s; s++) {
          var u = 0 === s || 10 === s ? !0 : !1,
            x = 5 === s ? !0 : !1,
            q = [],
            p = [];
          for (g = 0; g <= f; g++)
            if (x) {
              var A = g < f ? 2 * g : 0;
              p.push(A + 1);
              q.push(A);
            } else {
              m = g / f;
              var D = s / 10;
              u && 0 !== g
                ? u && q.push(h.length - 1)
                : g < f
                ? ((A = new $3Dmol.Vector3()),
                  (A.x = -b * Math.cos(0 + m * e) * Math.sin(0 + D * t)),
                  (A.y = c ? 0 : b * Math.cos(0 + D * t)),
                  (A.z = b * Math.sin(0 + m * e) * Math.sin(0 + D * t)),
                  1e-5 > Math.abs(A.x) && (A.x = 0),
                  1e-5 > Math.abs(A.y) && (A.y = 0),
                  1e-5 > Math.abs(A.z) && (A.z = 0),
                  (m = c
                    ? new $3Dmol.Vector3(0, Math.cos(0 + D * t), 0)
                    : new $3Dmol.Vector3(A.x, A.y, A.z)),
                  m.normalize(),
                  h.push(A),
                  l.push(m),
                  q.push(h.length - 1))
                : q.push(h.length - f);
            }
          x && w.push(p);
          w.push(q);
        }
        f = { vertices: h, normals: l, verticesRows: w, w: f, h: 10 };
        return (this.cache[c][b] = f);
      },
    },
    t = 0;
  b.drawCylinder = function (b, d, f, h, l, m, w) {
    if (d && f) {
      t++;
      var e = m || w,
        G = !1;
      1 == m && 1 == w && (G = !0);
      l = l || { r: 0, g: 0, b: 0 };
      var g = [f.x, f.y, f.z];
      g[0] -= d.x;
      g[1] -= d.y;
      g[2] -= d.z;
      var g = c(g),
        s = p.getVerticesForRadius(h, G);
      h = s.w;
      var G = s.h,
        u = e ? G * h + 2 : 2 * h;
      b = b.updateGeoGroup(u);
      var x = s.vertices,
        q = s.normals,
        s = s.verticesRows,
        A = s[G / 2],
        I = s[G / 2 + 1],
        D = b.vertices,
        C,
        B,
        F,
        J,
        L,
        K,
        H = b.vertexArray,
        M = b.normalArray,
        O = b.colorArray,
        R = b.faceArray;
      for (F = 0; F < h; ++F)
        (B = 2 * F),
          (J = g[0] * x[B].x + g[3] * x[B].y + g[6] * x[B].z),
          (L = g[1] * x[B].x + g[4] * x[B].y + g[7] * x[B].z),
          (K = g[5] * x[B].y + g[8] * x[B].z),
          (C = 3 * (D + B)),
          (B = b.faceidx),
          (H[C] = J + d.x),
          (H[C + 1] = L + d.y),
          (H[C + 2] = K + d.z),
          (H[C + 3] = J + f.x),
          (H[C + 4] = L + f.y),
          (H[C + 5] = K + f.z),
          (M[C] = J),
          (M[C + 3] = J),
          (M[C + 1] = L),
          (M[C + 4] = L),
          (M[C + 2] = K),
          (M[C + 5] = K),
          (O[C] = l.r),
          (O[C + 3] = l.r),
          (O[C + 1] = l.g),
          (O[C + 4] = l.g),
          (O[C + 2] = l.b),
          (O[C + 5] = l.b),
          (R[B] = I[F] + D),
          (R[B + 1] = I[F + 1] + D),
          (R[B + 2] = A[F] + D),
          (R[B + 3] = A[F] + D),
          (R[B + 4] = I[F + 1] + D),
          (R[B + 5] = A[F + 1] + D),
          (b.faceidx += 6);
      if (e) {
        m = m ? G + 1 : G / 2 + 1;
        var V, P, S, Q, da, Y, ba, E, aa, T, Z, W, U;
        for (L = w ? 0 : G / 2; L < m; L++)
          if (L !== G / 2) {
            var X = L <= G / 2 ? f : d;
            for (J = 0; J < h; J++)
              (B = b.faceidx),
                (w = s[L][J + 1]),
                (F = 3 * (w + D)),
                (e = s[L][J]),
                (K = 3 * (e + D)),
                (A = s[L + 1][J]),
                (C = 3 * (A + D)),
                (I = s[L + 1][J + 1]),
                (U = 3 * (I + D)),
                (V = g[0] * x[w].x + g[3] * x[w].y + g[6] * x[w].z),
                (P = g[0] * x[e].x + g[3] * x[e].y + g[6] * x[e].z),
                (S = g[0] * x[A].x + g[3] * x[A].y + g[6] * x[A].z),
                (Q = g[0] * x[I].x + g[3] * x[I].y + g[6] * x[I].z),
                (da = g[1] * x[w].x + g[4] * x[w].y + g[7] * x[w].z),
                (Y = g[1] * x[e].x + g[4] * x[e].y + g[7] * x[e].z),
                (ba = g[1] * x[A].x + g[4] * x[A].y + g[7] * x[A].z),
                (E = g[1] * x[I].x + g[4] * x[I].y + g[7] * x[I].z),
                (aa = g[5] * x[w].y + g[8] * x[w].z),
                (T = g[5] * x[e].y + g[8] * x[e].z),
                (Z = g[5] * x[A].y + g[8] * x[A].z),
                (W = g[5] * x[I].y + g[8] * x[I].z),
                (H[F] = V + X.x),
                (H[K] = P + X.x),
                (H[C] = S + X.x),
                (H[U] = Q + X.x),
                (H[F + 1] = da + X.y),
                (H[K + 1] = Y + X.y),
                (H[C + 1] = ba + X.y),
                (H[U + 1] = E + X.y),
                (H[F + 2] = aa + X.z),
                (H[K + 2] = T + X.z),
                (H[C + 2] = Z + X.z),
                (H[U + 2] = W + X.z),
                (O[F] = l.r),
                (O[K] = l.r),
                (O[C] = l.r),
                (O[U] = l.r),
                (O[F + 1] = l.g),
                (O[K + 1] = l.g),
                (O[C + 1] = l.g),
                (O[U + 1] = l.g),
                (O[F + 2] = l.b),
                (O[K + 2] = l.b),
                (O[C + 2] = l.b),
                (O[U + 2] = l.b),
                (V = g[0] * q[w].x + g[3] * q[w].y + g[6] * q[w].z),
                (P = g[0] * q[e].x + g[3] * q[e].y + g[6] * q[e].z),
                (S = g[0] * q[A].x + g[3] * q[A].y + g[6] * q[A].z),
                (Q = g[0] * q[I].x + g[3] * q[I].y + g[6] * q[I].z),
                (da = g[1] * q[w].x + g[4] * q[w].y + g[7] * q[w].z),
                (Y = g[1] * q[e].x + g[4] * q[e].y + g[7] * q[e].z),
                (ba = g[1] * q[A].x + g[4] * q[A].y + g[7] * q[A].z),
                (E = g[1] * q[I].x + g[4] * q[I].y + g[7] * q[I].z),
                (aa = g[5] * q[w].y + g[8] * q[w].z),
                (T = g[5] * q[e].y + g[8] * q[e].z),
                (Z = g[5] * q[A].y + g[8] * q[A].z),
                (W = g[5] * q[I].y + g[8] * q[I].z),
                0 === L
                  ? ((M[F] = V),
                    (M[C] = S),
                    (M[U] = Q),
                    (M[F + 1] = da),
                    (M[C + 1] = ba),
                    (M[U + 1] = E),
                    (M[F + 2] = aa),
                    (M[C + 2] = Z),
                    (M[U + 2] = W),
                    (R[B] = w + D),
                    (R[B + 1] = A + D),
                    (R[B + 2] = I + D),
                    (b.faceidx += 3))
                  : L === m - 1
                  ? ((M[F] = V),
                    (M[K] = P),
                    (M[C] = S),
                    (M[F + 1] = da),
                    (M[K + 1] = Y),
                    (M[C + 1] = ba),
                    (M[F + 2] = aa),
                    (M[K + 2] = T),
                    (M[C + 2] = Z),
                    (R[B] = w + D),
                    (R[B + 1] = e + D),
                    (R[B + 2] = A + D),
                    (b.faceidx += 3))
                  : ((M[F] = V),
                    (M[K] = P),
                    (M[U] = Q),
                    (M[F + 1] = da),
                    (M[K + 1] = Y),
                    (M[U + 1] = E),
                    (M[F + 2] = aa),
                    (M[K + 2] = T),
                    (M[U + 2] = W),
                    (M[K] = P),
                    (M[C] = S),
                    (M[U] = Q),
                    (M[K + 1] = Y),
                    (M[C + 1] = ba),
                    (M[U + 1] = E),
                    (M[K + 2] = T),
                    (M[C + 2] = Z),
                    (M[U + 2] = W),
                    (R[B] = w + D),
                    (R[B + 1] = e + D),
                    (R[B + 2] = I + D),
                    (R[B + 3] = e + D),
                    (R[B + 4] = A + D),
                    (R[B + 5] = I + D),
                    (b.faceidx += 6));
          }
      }
      b.vertices += u;
    }
  };
  b.drawCone = function (b, z, f, h, l) {
    if (z && f) {
      l = l || { r: 0, g: 0, b: 0 };
      var m = [f.x, f.y, f.z];
      m.x -= z.x;
      m.y -= z.y;
      m.z -= z.z;
      var w = c(m),
        e = d.length;
      b = b.updateGeoGroup(e + 2);
      var t = b.vertices,
        g,
        s,
        u,
        x = b.vertexArray,
        q = b.normalArray,
        A = b.colorArray,
        p = b.faceArray;
      g = 3 * t;
      m = new $3Dmol.Vector3(m[0], m[1], m[2]).normalize();
      x[g] = z.x;
      x[g + 1] = z.y;
      x[g + 2] = z.z;
      q[g] = -m.x;
      q[g + 1] = -m.y;
      q[g + 2] = -m.z;
      A[g] = l.r;
      A[g + 1] = l.g;
      A[g + 2] = l.b;
      x[g + 3] = f.x;
      x[g + 4] = f.y;
      x[g + 5] = f.z;
      q[g + 3] = m.x;
      q[g + 4] = m.y;
      q[g + 5] = m.z;
      A[g + 3] = l.r;
      A[g + 4] = l.g;
      A[g + 5] = l.b;
      g += 6;
      for (f = 0; f < e; ++f)
        (u = d[f].clone()),
          u.multiplyScalar(h),
          (m = w[0] * u.x + w[3] * u.y + w[6] * u.z),
          (s = w[1] * u.x + w[4] * u.y + w[7] * u.z),
          (u = w[5] * u.y + w[8] * u.z),
          (x[g] = m + z.x),
          (x[g + 1] = s + z.y),
          (x[g + 2] = u + z.z),
          (q[g] = m),
          (q[g + 1] = s),
          (q[g + 2] = u),
          (A[g] = l.r),
          (A[g + 1] = l.g),
          (A[g + 2] = l.b),
          (g += 3);
      b.vertices += e + 2;
      z = b.faceidx;
      for (f = 0; f < e; f++)
        (h = t + 2 + f),
          (l = t + 2 + ((f + 1) % e)),
          (p[z] = h),
          (p[z + 1] = l),
          (p[z + 2] = t),
          (z += 3),
          (p[z] = h),
          (p[z + 1] = l),
          (p[z + 2] = t + 1),
          (z += 3);
      b.faceidx += 6 * e;
    }
  };
  var A = {
    cache: {},
    getVerticesForRadius: function (b) {
      if ("undefined" !== typeof this.cache[b]) return this.cache[b];
      var c = { vertices: [], verticesRows: [], normals: [] },
        f = 16,
        d = 10;
      1 > b && ((f = 10), (d = 8));
      var l = 2 * Math.PI,
        m = Math.PI,
        w,
        e;
      for (e = 0; e <= d; e++) {
        var t = [];
        for (w = 0; w <= f; w++) {
          var g = w / f,
            s = e / d,
            u = {};
          u.x = -b * Math.cos(0 + g * l) * Math.sin(0 + s * m);
          u.y = b * Math.cos(0 + s * m);
          u.z = b * Math.sin(0 + g * l) * Math.sin(0 + s * m);
          g = new $3Dmol.Vector3(u.x, u.y, u.z);
          g.normalize();
          c.vertices.push(u);
          c.normals.push(g);
          t.push(c.vertices.length - 1);
        }
        c.verticesRows.push(t);
      }
      return (this.cache[b] = c);
    },
  };
  b.drawSphere = function (b, c, f, d) {
    new $3Dmol.Vector3(c.x, c.y, c.z);
    var l = A.getVerticesForRadius(f),
      m = l.vertices,
      w = l.normals;
    b = b.updateGeoGroup(m.length);
    for (
      var e = b.vertices,
        t = b.vertexArray,
        g = b.colorArray,
        s = b.faceArray,
        u = b.lineArray,
        x = b.normalArray,
        q = 0,
        p = m.length;
      q < p;
      ++q
    ) {
      var I = 3 * (e + q),
        D = m[q];
      t[I] = D.x + c.x;
      t[I + 1] = D.y + c.y;
      t[I + 2] = D.z + c.z;
      g[I] = d.r;
      g[I + 1] = d.g;
      g[I + 2] = d.b;
    }
    b.vertices += m.length;
    l = l.verticesRows;
    t = l.length - 1;
    for (d = 0; d < t; d++)
      for (g = l[d].length - 1, c = 0; c < g; c++) {
        var q = b.faceidx,
          p = b.lineidx,
          I = l[d][c + 1] + e,
          D = 3 * I,
          C = l[d][c] + e,
          B = 3 * C,
          F = l[d + 1][c] + e,
          J = 3 * F,
          L = l[d + 1][c + 1] + e,
          K = 3 * L,
          H = w[I - e],
          M = w[C - e],
          O = w[F - e],
          R = w[L - e];
        Math.abs(m[I - e].y) === f
          ? ((x[D] = H.x),
            (x[J] = O.x),
            (x[K] = R.x),
            (x[D + 1] = H.y),
            (x[J + 1] = O.y),
            (x[K + 1] = R.y),
            (x[D + 2] = H.z),
            (x[J + 2] = O.z),
            (x[K + 2] = R.z),
            (s[q] = I),
            (s[q + 1] = F),
            (s[q + 2] = L),
            (u[p] = I),
            (u[p + 1] = F),
            (u[p + 2] = I),
            (u[p + 3] = L),
            (u[p + 4] = F),
            (u[p + 5] = L),
            (b.faceidx += 3),
            (b.lineidx += 6))
          : Math.abs(m[F - e].y) === f
          ? ((x[D] = H.x),
            (x[B] = M.x),
            (x[J] = O.x),
            (x[D + 1] = H.y),
            (x[B + 1] = M.y),
            (x[J + 1] = O.y),
            (x[D + 2] = H.z),
            (x[B + 2] = M.z),
            (x[J + 2] = O.z),
            (s[q] = I),
            (s[q + 1] = C),
            (s[q + 2] = F),
            (u[p] = I),
            (u[p + 1] = C),
            (u[p + 2] = I),
            (u[p + 3] = F),
            (u[p + 4] = C),
            (u[p + 5] = F),
            (b.faceidx += 3),
            (b.lineidx += 6))
          : ((x[D] = H.x),
            (x[B] = M.x),
            (x[K] = R.x),
            (x[D + 1] = H.y),
            (x[B + 1] = M.y),
            (x[K + 1] = R.y),
            (x[D + 2] = H.z),
            (x[B + 2] = M.z),
            (x[K + 2] = R.z),
            (x[B] = M.x),
            (x[J] = O.x),
            (x[K] = R.x),
            (x[B + 1] = M.y),
            (x[J + 1] = O.y),
            (x[K + 1] = R.y),
            (x[B + 2] = M.z),
            (x[J + 2] = O.z),
            (x[K + 2] = R.z),
            (s[q] = I),
            (s[q + 1] = C),
            (s[q + 2] = L),
            (s[q + 3] = C),
            (s[q + 4] = F),
            (s[q + 5] = L),
            (u[p] = I),
            (u[p + 1] = C),
            (u[p + 2] = I),
            (u[p + 3] = L),
            (u[p + 4] = C),
            (u[p + 5] = F),
            (u[p + 6] = F),
            (u[p + 7] = L),
            (b.faceidx += 6),
            (b.lineidx += 8));
      }
  };
  return b;
})();
$3Dmol = $3Dmol || {};
$3Dmol.GLModel = (function () {
  function b(b, y) {
    var z = [],
      f = [],
      h = !1,
      l = null,
      m = null,
      w = null,
      e = {},
      G = new $3Dmol.Matrix4(),
      g,
      s = $3Dmol.elementColors.defaultColor,
      u = y ? y : $3Dmol.elementColors.defaultColors,
      x = function (b, c) {
        var l = 1.5;
        "undefined" != typeof c.radius
          ? (l = c.radius)
          : d[b.elem] && (l = d[b.elem]);
        "undefined" != typeof c.scale && (l *= c.scale);
        return l;
      },
      q = function (b, c, l) {
        var e = new $3Dmol.Vector3(b.x, b.y, b.z),
          f = new $3Dmol.Vector3(c.x, c.y, c.z).clone(),
          d = null;
        f.sub(e);
        1 === b.bonds.length
          ? 1 === c.bonds.length
            ? ((d = f.clone()), 1e-4 < Math.abs(d.x) ? (d.y += 1) : (d.x += 1))
            : ((l = (l + 1) % c.bonds.length),
              (b = c.bonds[l]),
              (b = z[b]),
              (b = new $3Dmol.Vector3(b.x, b.y, b.z)),
              (b = b.clone()),
              b.sub(e),
              (d = b.clone()),
              d.cross(f))
          : ((l = (l + 1) % b.bonds.length),
            (b = b.bonds[l]),
            (b = z[b]),
            (b = new $3Dmol.Vector3(b.x, b.y, b.z)),
            (b = b.clone()),
            b.sub(e),
            (d = b.clone()),
            d.cross(f));
        0.01 > d.lengthSq() &&
          ((d = f.clone()), 1e-4 < Math.abs(d.x) ? (d.y += 1) : (d.x += 1));
        d.cross(f);
        d.normalize();
        return d;
      },
      N = function (b, c, l, e, f, d) {
        b[l] = e.x;
        b[l + 1] = e.y;
        b[l + 2] = e.z;
        c[l] = d.r;
        c[l + 1] = d.g;
        c[l + 2] = d.b;
        b[l + 3] = f.x;
        b[l + 4] = f.y;
        b[l + 5] = f.z;
        c[l + 3] = d.r;
        c[l + 4] = d.g;
        c[l + 5] = d.b;
      },
      I = function (b, c) {
        if (b.style.sphere) {
          var l = b.style.sphere;
          if (!l.hidden) {
            var e = $3Dmol.getColorFromStyle(b, l),
              l = x(b, l);
            if (!0 === b.clickable && void 0 !== b.intersectionShape) {
              var f = new $3Dmol.Vector3(b.x, b.y, b.z);
              b.intersectionShape.sphere.push(new $3Dmol.Sphere(f, l));
            }
            $3Dmol.GLDraw.drawSphere(c, b, l, e);
          }
        }
      },
      D = function (b, c) {
        if (b.style.sphere) {
          var l = b.style.sphere;
          if (!l.hidden) {
            var e = x(b, l),
              l = $3Dmol.getColorFromStyle(b, l),
              f = c.updateGeoGroup(1),
              d = f.vertices,
              g = 3 * d,
              h = f.vertexArray,
              m = f.colorArray,
              w = f.radiusArray;
            h[g] = b.x;
            h[g + 1] = b.y;
            h[g + 2] = b.z;
            m = f.colorArray;
            m[g] = l.r;
            m[g + 1] = l.g;
            m[g + 2] = l.b;
            w[d] = e;
            f.vertices += 1;
          }
        }
      },
      C = function (b, c, l, e) {
        b = b.updateGeoGroup(4);
        for (
          var f = b.vertices,
            d = 3 * f,
            g = b.vertexArray,
            h = b.colorArray,
            m = 0;
          4 > m;
          m++
        )
          (g[d + 3 * m] = c.x),
            (g[d + 3 * m + 1] = c.y),
            (g[d + 3 * m + 2] = c.z);
        c = b.normalArray;
        h = b.colorArray;
        for (m = 0; 4 > m; m++)
          (h[d + 3 * m] = e.r),
            (h[d + 3 * m + 1] = e.g),
            (h[d + 3 * m + 2] = e.b);
        c[d + 0] = -l;
        c[d + 1] = l;
        c[d + 2] = 0;
        c[d + 3] = -l;
        c[d + 4] = -l;
        c[d + 5] = 0;
        c[d + 6] = l;
        c[d + 7] = -l;
        c[d + 8] = 0;
        c[d + 9] = l;
        c[d + 10] = l;
        c[d + 11] = 0;
        b.vertices += 4;
        l = b.faceArray;
        e = b.faceidx;
        l[e + 0] = f;
        l[e + 1] = f + 1;
        l[e + 2] = f + 2;
        l[e + 3] = f + 2;
        l[e + 4] = f + 3;
        l[e + 5] = f;
        b.faceidx += 6;
      },
      B = function (b, c) {
        if (b.style.sphere) {
          var l = b.style.sphere;
          if (!l.hidden) {
            var e = x(b, l),
              l = $3Dmol.getColorFromStyle(b, l);
            C(c, b, e, l);
          }
        }
      },
      F = function (b, c, l, e, f, d, g) {
        b = b.updateGeoGroup(4);
        d = b.vertices;
        g = b.vertexArray;
        var h = b.colorArray,
          m = b.radiusArray,
          w = b.normalArray,
          q = f.r,
          u = f.g;
        f = f.b;
        for (var s = 3 * d, x = 0; 4 > x; x++) {
          g[s] = c.x;
          w[s] = l.x;
          h[s] = q;
          s++;
          g[s] = c.y;
          w[s] = l.y;
          h[s] = u;
          s++;
          g[s] = c.z;
          w[s] = l.z;
          if (2 > x) h[s] = f;
          else {
            var t = s,
              y = -f;
            0 == y && (y = -1e-4);
            h[t] = y;
          }
          s++;
        }
        b.vertices += 4;
        m[d] = -e;
        m[d + 1] = e;
        m[d + 2] = -e;
        m[d + 3] = e;
        c = b.faceArray;
        l = b.faceidx;
        c[l + 0] = d;
        c[l + 1] = d + 1;
        c[l + 2] = d + 2;
        c[l + 3] = d + 2;
        c[l + 4] = d + 3;
        c[l + 5] = d;
        b.faceidx += 6;
      };
    this.getCrystData = function () {
      return e.cryst ? e.cryst : null;
    };
    this.getSymmetries = function () {
      "undefined" == typeof e.symmetries && (e.symmetries = [G]);
      return e.symmetries;
    };
    this.setSymmetries = function (b) {
      e.symmetries = "undefined" == typeof b ? [G] : b;
    };
    this.getID = function () {
      return b;
    };
    this.getFrames = function () {
      return f;
    };
    this.setFrame = function (b) {
      0 != f.length &&
        ((z = 0 <= b && b < f.length ? f[b] : f[f.length - 1]), (l = null));
    };
    this.addFrame = function (b) {
      f.push(b);
    };
    this.vibrate = function (b, c) {
      var l = [];
      c = c || 1;
      b = b || 10;
      for (var e = 0; e < z.length; e++) {
        var d = new $3Dmol.Vector3(z[e].dx, z[e].dy, z[e].dz);
        l.push(d);
      }
      b--;
      for (e = 1; e <= b; e++) {
        l = [];
        for (d = 0; d < z.length; d++) {
          var g = new $3Dmol.Vector3(z[d].dx, z[d].dy, z[d].dz),
            h = new $3Dmol.Vector3(z[d].x, z[d].y, z[d].z);
          g.sub(h);
          g.multiplyScalar((e * c) / b);
          h.add(g);
          var g = {},
            m;
          for (m in z[d]) g[m] = z[d][m];
          g.x = h.x;
          g.y = h.y;
          g.z = h.z;
          l.push(g);
        }
        f.push(l);
      }
      f.unshift(z);
    };
    this.setAtomDefaults = function (l) {
      for (var e = 0; e < l.length; e++) {
        var d = l[e];
        d &&
          ((d.style = d.style || c),
          (d.color = d.color || u[d.elem] || s),
          (d.model = b),
          d.clickable &&
            (d.intersectionShape = {
              sphere: [],
              cylinder: [],
              line: [],
              triangle: [],
            }));
      }
    };
    this.addMolData = function (c, l, d) {
      d = d || {};
      c = $3Dmol.GLModel.parseMolData(c, l, d);
      g = !d.duplicateAssemblyAtoms;
      (l = c.modelData) && (e = Array.isArray(l) ? l[0] : l);
      if (0 == f.length) {
        for (l = 0; l < c.length; l++) 0 != c[l].length && f.push(c[l]);
        f[0] && (z = f[0]);
      } else if (d.frames) for (l = 0; l < c.length; l++) f.push(c[l]);
      else for (l = 0; l < c.length; l++) this.addAtoms(c[l]);
      for (l = 0; l < f.length; l++) this.setAtomDefaults(f[l], b);
      d.vibrate &&
        d.vibrate.frames &&
        d.vibrate.amplitude &&
        this.vibrate(d.vibrate.frames, d.vibrate.amplitude);
    };
    this.setDontDuplicateAtoms = function (b) {
      g = b;
    };
    this.setModelData = function (b) {
      e = b;
    };
    this.atomIsSelected = function (b, c) {
      if ("undefined" === typeof c) return !0;
      var l = !!c.invert,
        e = !0,
        d;
      for (d in c)
        if ("predicate" === d) {
          if (!c.predicate(b)) {
            e = !1;
            break;
          }
        } else if ("properties" == d && b[d])
          for (var f in c.properties) {
            if ("undefined" === typeof b.properties[f]) {
              e = !1;
              break;
            }
            if (b.properties[f] != c.properties[f]) {
              e = !1;
              break;
            }
          }
        else if (
          c.hasOwnProperty(d) &&
          "props" != d &&
          "invert" != d &&
          "model" != d &&
          "byres" != d &&
          "expand" != d &&
          "within" != d
        ) {
          if ("undefined" === typeof b[d]) {
            e = !1;
            break;
          }
          var g = !1;
          if ("bonds" === d) {
            if (((g = c[d]), g != b.bonds.length)) {
              e = !1;
              break;
            }
          } else if ($.isArray(c[d])) {
            for (var h = c[d], m = 0; m < h.length; m++)
              if (b[d] == h[m]) {
                g = !0;
                break;
              }
            if (!g) {
              e = !1;
              break;
            }
          } else if (((g = c[d]), b[d] != g)) {
            e = !1;
            break;
          }
        }
      return l ? !e : e;
    };
    this.selectedAtoms = function (b, c) {
      var l = [];
      b = b || {};
      c || (c = z);
      for (var e = c.length, d = 0; d < e; d++) {
        var f = c[d];
        f && this.atomIsSelected(f, b) && l.push(f);
      }
      if (b.hasOwnProperty("expand")) {
        var g;
        var h = parseFloat(b.expand);
        if (0 >= h) g = l;
        else {
          d = $3Dmol.getExtent(l);
          e = [[], [], []];
          for (f = 0; 3 > f; f++)
            (e[0][f] = d[0][f] - h),
              (e[1][f] = d[1][f] + h),
              (e[2][f] = d[2][f]);
          h = [];
          for (f = 0; f < z.length; f++) {
            g = z[f].x;
            var m = z[f].y,
              w = z[f].z;
            g >= e[0][0] &&
              g <= e[1][0] &&
              m >= e[0][1] &&
              m <= e[1][1] &&
              w >= e[0][2] &&
              w <= e[1][2] &&
              ((g >= d[0][0] &&
                g <= d[1][0] &&
                m >= d[0][1] &&
                m <= d[1][1] &&
                w >= d[0][2] &&
                w <= d[1][2]) ||
                h.push(z[f]));
          }
          g = h;
        }
        m = l.length;
        for (d = 0; d < g.length; d++)
          for (e = 0; e < m; e++)
            (f = J(g[d], l[e])),
              (h = Math.pow(b.expand, 2)),
              f < h && 0 < f && l.push(g[d]);
      }
      if (
        b.hasOwnProperty("within") &&
        b.within.hasOwnProperty("sel") &&
        b.within.hasOwnProperty("distance")
      ) {
        g = this.selectedAtoms(b.within.sel, z);
        m = [];
        for (d = 0; d < g.length; d++)
          for (e = 0; e < l.length; e++)
            (f = J(g[d], l[e])),
              (h = Math.pow(parseFloat(b.within.distance), 2)),
              f < h && 0 < f && m.push(l[e]);
        l = m;
      }
      if (b.hasOwnProperty("byres"))
        for (h = {}, g = [], m = [], d = 0; d < l.length; d++) {
          var f = l[d],
            w = f.chain,
            q = f.resi;
          void 0 === h[w] && (h[w] = {});
          if (f.hasOwnProperty("resi") && void 0 === h[w][q])
            for (h[w][q] = !0, m.push(f); 0 < m.length; )
              if (
                ((f = m.pop()),
                (w = f.chain),
                (q = f.resi),
                void 0 === g[f.index])
              )
                for (g[f.index] = !0, e = 0; e < f.bonds.length; e++) {
                  var s = z[f.bonds[e]];
                  void 0 === g[s.index] &&
                    s.hasOwnProperty("resi") &&
                    s.chain == w &&
                    s.resi == q &&
                    (m.push(s), l.push(s));
                }
        }
      return l;
    };
    var J = function (b, c) {
      var l = c.y - b.y,
        e = c.z - b.z;
      return Math.pow(c.x - b.x, 2) + Math.pow(l, 2) + Math.pow(e, 2);
    };
    this.addAtoms = function (e) {
      l = null;
      var d = z.length,
        f = [],
        g;
      for (g = 0; g < e.length; g++)
        "undefined" == typeof e[g].index && (e[g].index = g),
          "undefined" == typeof e[g].serial && (e[g].serial = g),
          (f[e[g].index] = d + g);
      for (g = 0; g < e.length; g++) {
        var d = e[g],
          h = f[d.index],
          m = $.extend(!1, {}, d);
        m.index = h;
        m.bonds = [];
        m.bondOrder = [];
        m.model = b;
        m.style = m.style || c;
        "undefined" == typeof m.color && (m.color = u[m.elem] || s);
        for (var h = d.bonds ? d.bonds.length : 0, w = 0; w < h; w++) {
          var q = f[d.bonds[w]];
          "undefined" != typeof q &&
            (m.bonds.push(q),
            m.bondOrder.push(d.bondOrder ? d.bondOrder[w] : 1));
        }
        z.push(m);
      }
    };
    this.removeAtoms = function (b) {
      l = null;
      var c = [],
        e;
      for (e = 0; e < b.length; e++) c[b[e].index] = !0;
      b = [];
      for (e = 0; e < z.length; e++) {
        var d = z[e];
        c[d.index] || b.push(d);
      }
      z = [];
      this.addAtoms(b);
    };
    this.setStyle = function (b, c, e) {
      "undefined" === typeof c &&
        "undefined" == typeof e &&
        ((c = b), (b = {}));
      for (var d in b)
        -1 === p.indexOf(d) && console.log("Unknown selector " + d);
      for (d in c) -1 === t.indexOf(d) && console.log("Unknown style " + d);
      var g = !1,
        h = function (l) {
          for (var f = m.selectedAtoms(b, l), h = 0; h < l.length; h++)
            l[h] && (l[h].capDrawn = !1);
          for (h = 0; h < f.length; h++)
            for (d in ((g = !0),
            f[h].clickable &&
              (f[h].intersectionShape = {
                sphere: [],
                cylinder: [],
                line: [],
                triangle: [],
              }),
            e || (f[h].style = {}),
            c))
              if (c.hasOwnProperty(d)) {
                f[h].style[d] = f[h].style[d] || {};
                for (var w in c[d]) f[h].style[d][w] = c[d][w];
              }
        },
        m = this;
      h(z);
      for (var w = 0; w < f.length; w++) h(f[w]);
      g && (l = null);
    };
    this.setClickable = function (b, c, e) {
      for (var d in b)
        -1 === p.indexOf(d) && console.log("Unknown selector " + d);
      c = !!c;
      if (e && "function" != typeof e)
        console.log("Callback is not a function");
      else {
        d = this.selectedAtoms(b, z);
        var f = d.length;
        for (b = 0; b < f; b++)
          (d[b].intersectionShape = {
            sphere: [],
            cylinder: [],
            line: [],
            triangle: [],
          }),
            (d[b].clickable = c),
            e && (d[b].callback = e);
        0 < f && (l = null);
      }
    };
    this.setColorByElement = function (b, c) {
      var d;
      if ((d = null !== l))
        (d = w), (d = c && d ? JSON.stringify(c) == JSON.stringify(d) : c == d);
      if (!d) {
        w = c;
        var e = this.selectedAtoms(b, e);
        0 < e.length && (l = null);
        for (d = 0; d < e.length; d++) {
          var f = e[d];
          "undefined" !== typeof c[f.elem] && (f.color = c[f.elem]);
        }
      }
    };
    this.setColorByProperty = function (b, c, d, e) {
      var f = this.selectedAtoms(b, f);
      w = null;
      0 < f.length && (l = null);
      var g;
      e || (e = d.range());
      e || (e = $3Dmol.getPropertyRange(f, c));
      for (b = 0; b < f.length; b++)
        (g = f[b]),
          null != $3Dmol.getAtomProperty(g, c) &&
            (g.color = d.valueToHex(parseFloat(g.properties[c]), [e[0], e[1]]));
    };
    this.setColorByFunction = function (b, c) {
      var d = this.selectedAtoms(b, d);
      w = null;
      0 < d.length && (l = null);
      for (i = 0; i < d.length; i++) (a = d[i]), (a.color = c(a));
    };
    this.toCDObject = function (b) {
      var c = { a: [], b: [] };
      b && (c.s = []);
      for (var l = 0; l < z.length; l++) {
        var d = {},
          e = z[l];
        d.x = e.x;
        d.y = e.y;
        d.z = e.z;
        "C" != e.elem && (d.l = e.elem);
        if (b) {
          for (
            var f = 0;
            f < c.s.length &&
            JSON.stringify(e.style) !== JSON.stringify(c.s[f]);

          )
            f++;
          f === c.s.length && c.s.push(e.style);
          0 !== f && (d.s = f);
        }
        c.a.push(d);
        for (d = 0; d < e.bonds.length; d++) {
          var f = l,
            g = e.bonds[d];
          f >= g ||
            ((f = { b: f, e: g }),
            (g = e.bondOrder[d]),
            1 != g && (f.o = g),
            c.b.push(f));
        }
      }
      return c;
    };
    this.globj = function (b, c) {
      if (null === l) {
        var d = z,
          f = c,
          f = f || {},
          w = new $3Dmol.Object3D(),
          s = [],
          u = {},
          t = {},
          y = I,
          A = null,
          p = null;
        f.supportsImposters
          ? ((y = B),
            (A = new $3Dmol.Geometry(!0)),
            (A.imposter = !0),
            (p = new $3Dmol.Geometry(!0, !0)),
            (p.imposter = !0),
            (p.sphereGeometry = A),
            (p.drawnCaps = {}))
          : (f.supportsAIA
              ? ((y = D),
                (A = new $3Dmol.Geometry(!1, !0, !0)),
                (A.instanced = !0))
              : (A = new $3Dmol.Geometry(!0)),
            (p = new $3Dmol.Geometry(!0)));
        var G,
          J,
          E,
          aa,
          T = {},
          Z = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
        G = 0;
        for (E = d.length; G < E; G++) {
          var W = d[G];
          if (W && W.style) {
            W.clickable &&
              void 0 === W.intersectionShape &&
              (W.intersectionShape = {
                sphere: [],
                cylinder: [],
                line: [],
                triangle: [],
              });
            aa = { line: void 0, cross: void 0, stick: void 0, sphere: void 0 };
            for (J in aa)
              (aa[J] = W.style[J]
                ? W.style[J].opacity
                  ? parseFloat(W.style[J].opacity)
                  : 1
                : void 0),
                T[J]
                  ? void 0 != aa[J] &&
                    T[J] != aa[J] &&
                    (console.log("Warning: " + J + " opacity is ambiguous"),
                    (T[J] = 1))
                  : (T[J] = aa[J]);
            y(W, A);
            var U = W,
              X = t;
            if (U.style.cross) {
              var ga = U.style.cross;
              if (!ga.hidden) {
                var Ea = ga.linewidth || 1;
                X[Ea] || (X[Ea] = new $3Dmol.Geometry());
                var Na = X[Ea].updateGeoGroup(6),
                  Fa = x(U, ga),
                  Ga = [
                    [Fa, 0, 0],
                    [-Fa, 0, 0],
                    [0, Fa, 0],
                    [0, -Fa, 0],
                    [0, 0, Fa],
                    [0, 0, -Fa],
                  ],
                  Ta = U.clickable;
                Ta &&
                  void 0 === U.intersectionShape &&
                  (U.intersectionShape = {
                    sphere: [],
                    cylinder: [],
                    line: [],
                  });
                for (
                  var Oa = $3Dmol.getColorFromStyle(U, ga),
                    Pa = Na.vertexArray,
                    ab = Na.colorArray,
                    Ba = 0;
                  6 > Ba;
                  Ba++
                ) {
                  var Ha = 3 * Na.vertices;
                  Na.vertices++;
                  Pa[Ha] = U.x + Ga[Ba][0];
                  Pa[Ha + 1] = U.y + Ga[Ba][1];
                  Pa[Ha + 2] = U.z + Ga[Ba][2];
                  ab[Ha] = Oa.r;
                  ab[Ha + 1] = Oa.g;
                  ab[Ha + 2] = Oa.b;
                  if (Ta) {
                    var Qa = new $3Dmol.Vector3(
                      Ga[Ba][0],
                      Ga[Ba][1],
                      Ga[Ba][2]
                    );
                    Qa.multiplyScalar(0.1);
                    Qa.set(Qa.x + U.x, Qa.y + U.y, Qa.z + U.z);
                    U.intersectionShape.line.push(Qa);
                  }
                }
              }
            }
            var fa = W,
              zb = d,
              kb = u;
            if (fa.style.line) {
              var rb = fa.style.line;
              if (!rb.hidden) {
                var lb = rb.linewidth || 1;
                kb[lb] || (kb[lb] = new $3Dmol.Geometry());
                for (
                  var ua = kb[lb].updateGeoGroup(6 * fa.bonds.length),
                    ka = ua.vertexArray,
                    la = ua.colorArray,
                    Ia = 0;
                  Ia < fa.bonds.length;
                  Ia++
                ) {
                  var Ra = zb[fa.bonds[Ia]];
                  if (Ra.style.line && !(fa.serial >= Ra.serial)) {
                    var Ca = new $3Dmol.Vector3(fa.x, fa.y, fa.z),
                      Ua = new $3Dmol.Vector3(Ra.x, Ra.y, Ra.z),
                      gb = Ca.clone().add(Ua).multiplyScalar(0.5),
                      sb = !1;
                    fa.clickable &&
                      (void 0 === fa.intersectionShape &&
                        (fa.intersectionShape = {
                          sphere: [],
                          cylinder: [],
                          line: [],
                          triangle: [],
                        }),
                      fa.intersectionShape.line.push(Ca),
                      fa.intersectionShape.line.push(Ua));
                    var qa = $3Dmol.getColorFromStyle(fa, fa.style.line),
                      Ja = $3Dmol.getColorFromStyle(Ra, Ra.style.line);
                    if (fa.bondStyles && fa.bondStyles[Ia]) {
                      var Sa = fa.bondStyles[Ia];
                      if (!Sa.iswire) continue;
                      Sa.radius && (bondR = Sa.radius);
                      Sa.singleBond && (sb = !0);
                      "undefined" != typeof Sa.color1 &&
                        (qa = $3Dmol.CC.color(Sa.color1));
                      "undefined" != typeof Sa.color2 &&
                        (Ja = $3Dmol.CC.color(Sa.color2));
                    }
                    var ma = 3 * ua.vertices;
                    if (1 < fa.bondOrder[Ia] && 4 > fa.bondOrder[Ia] && !sb) {
                      var Xa = q(fa, Ra, Ia),
                        Da = Ua.clone();
                      Da.sub(Ca);
                      if (2 == fa.bondOrder[Ia])
                        if (
                          (Xa.multiplyScalar(0.1),
                          (p1a = Ca.clone()),
                          p1a.add(Xa),
                          (p1b = Ca.clone()),
                          p1b.sub(Xa),
                          (p2a = p1a.clone()),
                          p2a.add(Da),
                          (p2b = p1b.clone()),
                          p2b.add(Da),
                          qa == Ja)
                        )
                          (ua.vertices += 4),
                            N(ka, la, ma, p1a, p2a, qa),
                            N(ka, la, ma + 6, p1b, p2b, qa);
                        else {
                          ua.vertices += 8;
                          Da.multiplyScalar(0.5);
                          var Va = p1a.clone();
                          Va.add(Da);
                          var Wa = p1b.clone();
                          Wa.add(Da);
                          N(ka, la, ma, p1a, Va, qa);
                          N(ka, la, ma + 6, Va, p2a, Ja);
                          N(ka, la, ma + 12, p1b, Wa, qa);
                          N(ka, la, ma + 18, Wa, p2b, Ja);
                        }
                      else
                        3 == fa.bondOrder[Ia] &&
                          (Xa.multiplyScalar(0.1),
                          (p1a = Ca.clone()),
                          p1a.add(Xa),
                          (p1b = Ca.clone()),
                          p1b.sub(Xa),
                          (p2a = p1a.clone()),
                          p2a.add(Da),
                          (p2b = p1b.clone()),
                          p2b.add(Da),
                          qa == Ja
                            ? ((ua.vertices += 6),
                              N(ka, la, ma, Ca, Ua, qa),
                              N(ka, la, ma + 6, p1a, p2a, qa),
                              N(ka, la, ma + 12, p1b, p2b, qa))
                            : ((ua.vertices += 12),
                              Da.multiplyScalar(0.5),
                              (Va = p1a.clone()),
                              Va.add(Da),
                              (Wa = p1b.clone()),
                              Wa.add(Da),
                              N(ka, la, ma, Ca, gb, qa),
                              N(ka, la, ma + 6, gb, Ua, Ja),
                              N(ka, la, ma + 12, p1a, Va, qa),
                              N(ka, la, ma + 18, Va, p2a, Ja),
                              N(ka, la, ma + 24, p1b, Wa, qa),
                              N(ka, la, ma + 30, Wa, p2b, Ja)));
                    } else
                      qa == Ja
                        ? ((ua.vertices += 2), N(ka, la, ma, Ca, Ua, qa))
                        : ((ua.vertices += 4),
                          N(ka, la, ma, Ca, gb, qa),
                          N(ka, la, ma + 6, gb, Ua, Ja));
                  }
                }
              }
            }
            var ca = W,
              Ab = d,
              ia = p;
            if (ca.style.stick) {
              var Ya = ca.style.stick;
              if (!Ya.hidden) {
                var bb = Ya.radius || 0.25,
                  va = bb,
                  tb = Ya.singleBonds || !1,
                  cb = 0,
                  db = 0,
                  na = $3Dmol.getColorFromStyle(ca, Ya),
                  oa = void 0,
                  ya = void 0;
                !ca.capDrawn && 4 > ca.bonds.length && (cb = 2);
                var ja = $3Dmol.GLDraw.drawCylinder;
                ia.imposter && (ja = F);
                for (var pa = 0; pa < ca.bonds.length; pa++) {
                  var ha = Ab[ca.bonds[pa]];
                  if (ca.serial < ha.serial) {
                    var ub = ha.style;
                    if (ub.stick) {
                      var Ka = $3Dmol.getColorFromStyle(ha, ub.stick),
                        va = bb,
                        eb = tb;
                      if (ca.bondStyles && ca.bondStyles[pa]) {
                        var za = ca.bondStyles[pa];
                        if (za.iswire) continue;
                        za.radius && (va = za.radius);
                        za.singleBond && (eb = !0);
                        "undefined" != typeof za.color1 &&
                          (na = $3Dmol.CC.color(za.color1));
                        "undefined" != typeof za.color2 &&
                          (Ka = $3Dmol.CC.color(za.color2));
                      }
                      var ra = new $3Dmol.Vector3(ca.x, ca.y, ca.z),
                        Aa = new $3Dmol.Vector3(ha.x, ha.y, ha.z);
                      if (1 === ca.bondOrder[pa] || eb) {
                        if (
                          (!ha.capDrawn && 4 > ha.bonds.length && (db = 2),
                          na != Ka
                            ? ((oa = new $3Dmol.Vector3()
                                .addVectors(ra, Aa)
                                .multiplyScalar(0.5)),
                              ja(ia, ra, oa, va, na, cb, 0),
                              ja(ia, oa, Aa, va, Ka, 0, db))
                            : ja(ia, ra, Aa, va, na, cb, db),
                          ca.clickable || ha.clickable)
                        ) {
                          oa = new $3Dmol.Vector3()
                            .addVectors(ra, Aa)
                            .multiplyScalar(0.5);
                          if (ca.clickable) {
                            var Bb = new $3Dmol.Cylinder(ra, oa, va),
                              Cb = new $3Dmol.Sphere(ra, va);
                            ca.intersectionShape.cylinder.push(Bb);
                            ca.intersectionShape.sphere.push(Cb);
                          }
                          if (ha.clickable) {
                            var Db = new $3Dmol.Cylinder(Aa, oa, va),
                              Eb = new $3Dmol.Sphere(Aa, va);
                            ha.intersectionShape.cylinder.push(Db);
                            ha.intersectionShape.sphere.push(Eb);
                          }
                        }
                      } else if (1 < ca.bondOrder[pa]) {
                        var Ma = 0;
                        mtoCap = 0;
                        va != bb && (mtoCap = Ma = 2);
                        var Za = Aa.clone(),
                          La = null;
                        Za.sub(ra);
                        var ea,
                          sa,
                          ta,
                          wa,
                          xa,
                          La = q(ca, ha, pa);
                        if (2 == ca.bondOrder[pa]) {
                          if (
                            ((ea = va / 2.5),
                            (La = q(ca, ha, pa)),
                            La.multiplyScalar(1.5 * ea),
                            (sa = ra.clone()),
                            sa.add(La),
                            (ta = ra.clone()),
                            ta.sub(La),
                            (wa = sa.clone()),
                            wa.add(Za),
                            (xa = ta.clone()),
                            xa.add(Za),
                            na != Ka
                              ? ((oa = new $3Dmol.Vector3()
                                  .addVectors(sa, wa)
                                  .multiplyScalar(0.5)),
                                (ya = new $3Dmol.Vector3()
                                  .addVectors(ta, xa)
                                  .multiplyScalar(0.5)),
                                ja(ia, sa, oa, ea, na, Ma, 0),
                                ja(ia, oa, wa, ea, Ka, 0, mtoCap),
                                ja(ia, ta, ya, ea, na, Ma, 0),
                                ja(ia, ya, xa, ea, Ka, 0, mtoCap))
                              : (ja(ia, sa, wa, ea, na, Ma, mtoCap),
                                ja(ia, ta, xa, ea, na, Ma, mtoCap)),
                            ca.clickable || ha.clickable)
                          )
                            (oa = new $3Dmol.Vector3()
                              .addVectors(sa, wa)
                              .multiplyScalar(0.5)),
                              (ya = new $3Dmol.Vector3()
                                .addVectors(ta, xa)
                                .multiplyScalar(0.5)),
                              ca.clickable &&
                                ((cylinder1a = new $3Dmol.Cylinder(sa, oa, ea)),
                                (cylinder1b = new $3Dmol.Cylinder(ta, ya, ea)),
                                ca.intersectionShape.cylinder.push(cylinder1a),
                                ca.intersectionShape.cylinder.push(cylinder1b)),
                              ha.clickable &&
                                ((cylinder2a = new $3Dmol.Cylinder(wa, oa, ea)),
                                (cylinder2b = new $3Dmol.Cylinder(xa, ya, ea)),
                                ha.intersectionShape.cylinder.push(cylinder2a),
                                ha.intersectionShape.cylinder.push(cylinder2b));
                        } else
                          3 == ca.bondOrder[pa] &&
                            ((ea = va / 4),
                            La.cross(Za),
                            La.normalize(),
                            La.multiplyScalar(3 * ea),
                            (sa = ra.clone()),
                            sa.add(La),
                            (ta = ra.clone()),
                            ta.sub(La),
                            (wa = sa.clone()),
                            wa.add(Za),
                            (xa = ta.clone()),
                            xa.add(Za),
                            na != Ka
                              ? ((oa = new $3Dmol.Vector3()
                                  .addVectors(sa, wa)
                                  .multiplyScalar(0.5)),
                                (ya = new $3Dmol.Vector3()
                                  .addVectors(ta, xa)
                                  .multiplyScalar(0.5)),
                                (mp3 = new $3Dmol.Vector3()
                                  .addVectors(ra, Aa)
                                  .multiplyScalar(0.5)),
                                ja(ia, sa, oa, ea, na, Ma, 0),
                                ja(ia, oa, wa, ea, Ka, 0, mtoCap),
                                ja(ia, ra, mp3, ea, na, cb, 0),
                                ja(ia, mp3, Aa, ea, Ka, 0, db),
                                ja(ia, ta, ya, ea, na, Ma, 0),
                                ja(ia, ya, xa, ea, Ka, 0, mtoCap))
                              : (ja(ia, sa, wa, ea, na, Ma, mtoCap),
                                ja(ia, ra, Aa, ea, na, cb, db),
                                ja(ia, ta, xa, ea, na, Ma, mtoCap)),
                            ca.clickable || ha.clickable) &&
                            ((oa = new $3Dmol.Vector3()
                              .addVectors(sa, wa)
                              .multiplyScalar(0.5)),
                            (ya = new $3Dmol.Vector3()
                              .addVectors(ta, xa)
                              .multiplyScalar(0.5)),
                            (mp3 = new $3Dmol.Vector3()
                              .addVectors(ra, Aa)
                              .multiplyScalar(0.5)),
                            ca.clickable &&
                              ((cylinder1a = new $3Dmol.Cylinder(
                                sa.clone(),
                                oa.clone(),
                                ea
                              )),
                              (cylinder1b = new $3Dmol.Cylinder(
                                ta.clone(),
                                ya.clone(),
                                ea
                              )),
                              (cylinder1c = new $3Dmol.Cylinder(
                                ra.clone(),
                                mp3.clone(),
                                ea
                              )),
                              ca.intersectionShape.cylinder.push(cylinder1a),
                              ca.intersectionShape.cylinder.push(cylinder1b),
                              ca.intersectionShape.cylinder.push(cylinder1c)),
                            ha.clickable &&
                              ((cylinder2a = new $3Dmol.Cylinder(
                                wa.clone(),
                                oa.clone(),
                                ea
                              )),
                              (cylinder2b = new $3Dmol.Cylinder(
                                xa.clone(),
                                ya.clone(),
                                ea
                              )),
                              (cylinder2c = new $3Dmol.Cylinder(
                                Aa.clone(),
                                mp3.clone(),
                                ea
                              )),
                              ha.intersectionShape.cylinder.push(cylinder2a),
                              ha.intersectionShape.cylinder.push(cylinder2b),
                              ha.intersectionShape.cylinder.push(cylinder2c)));
                      }
                    }
                  }
                }
                for (
                  var mb = !1, nb = 0, vb = !1, pa = 0;
                  pa < ca.bonds.length;
                  pa++
                )
                  (eb = tb),
                    ca.bondStyles &&
                      ca.bondStyles[pa] &&
                      ((za = ca.bondStyles[pa]),
                      za.singleBond && (eb = !0),
                      za.radius && za.radius != bb && (vb = !0)),
                    (eb || 1 == ca.bondOrder[pa]) && nb++;
                vb
                  ? 0 < nb && (mb = !0)
                  : 0 == nb && 0 < ca.bonds.length && (mb = !0);
                mb &&
                  ((va = bb),
                  ia.imposter
                    ? C(ia.sphereGeometry, ca, va, na)
                    : $3Dmol.GLDraw.drawSphere(ia, ca, va, na));
              }
            }
            "undefined" === typeof W.style.cartoon ||
              W.style.cartoon.hidden ||
              ("spectrum" !== W.style.cartoon.color ||
                "number" !== typeof W.resi ||
                W.hetflag ||
                (W.resi < Z[0] && (Z[0] = W.resi),
                W.resi > Z[1] && (Z[1] = W.resi)),
              s.push(W));
          }
        }
        if (0 < s.length) {
          var wb = null;
          Z[0] < Z[1] && (wb = new $3Dmol.Gradient.Sinebow(Z[0], Z[1]));
          $3Dmol.drawCartoon(w, s, wb);
        }
        if (A && 0 < A.vertices) {
          A.initTypedArrays();
          var $a = null;
          if (A.imposter)
            $a = new $3Dmol.SphereImposterMaterial({
              ambient: 0,
              vertexColors: !0,
              reflectivity: 0,
            });
          else if (A.instanced) {
            var fb = new $3Dmol.Geometry(!0);
            $3Dmol.GLDraw.drawSphere(
              fb,
              { x: 0, y: 0, z: 0 },
              1,
              new $3Dmol.Color(0.5, 0.5, 0.5)
            );
            fb.initTypedArrays();
            $a = new $3Dmol.InstancedMaterial({
              sphereMaterial: new $3Dmol.MeshLambertMaterial({
                ambient: 0,
                vertexColors: !0,
                reflectivity: 0,
              }),
              sphere: fb,
            });
          } else
            $a = new $3Dmol.MeshLambertMaterial({
              ambient: 0,
              vertexColors: !0,
              reflectivity: 0,
            });
          1 > T.sphere &&
            0 <= T.sphere &&
            (($a.transparent = !0), ($a.opacity = T.sphere));
          fb = new $3Dmol.Mesh(A, $a);
          w.add(fb);
        }
        if (0 < p.vertices) {
          if (p.imposter) {
            var Fb = new $3Dmol.StickImposterMaterial({
              ambient: 0,
              vertexColors: !0,
              reflectivity: 0,
            });
            p.initTypedArrays();
            var xb = new $3Dmol.Mesh(p, Fb);
          } else {
            var hb = new $3Dmol.MeshLambertMaterial({
              vertexColors: !0,
              ambient: 0,
              reflectivity: 0,
            });
            1 > T.stick &&
              0 <= T.stick &&
              ((hb.transparent = !0), (hb.opacity = T.stick));
            p.initTypedArrays();
            hb.wireframe && p.setUpWireframe();
            xb = new $3Dmol.Mesh(p, hb);
          }
          w.add(xb);
        }
        for (G in u)
          if (u.hasOwnProperty(G)) {
            var ob = G,
              pb = new $3Dmol.LineBasicMaterial({
                linewidth: ob,
                vertexColors: !0,
              });
            1 > T.line &&
              0 <= T.line &&
              ((pb.transparent = !0), (pb.opacity = T.line));
            u[G].initTypedArrays();
            var Gb = new $3Dmol.Line(u[G], pb, $3Dmol.LinePieces);
            w.add(Gb);
          }
        for (G in t)
          if (t.hasOwnProperty(G)) {
            var ob = G,
              qb = new $3Dmol.LineBasicMaterial({
                linewidth: ob,
                vertexColors: !0,
              });
            1 > T.cross &&
              0 <= T.cross &&
              ((qb.transparent = !0), (qb.opacity = T.cross));
            t[G].initTypedArrays();
            var Hb = new $3Dmol.Line(t[G], qb, $3Dmol.LinePieces);
            w.add(Hb);
          }
        if (g && e.symmetries && 0 < e.symmetries.length) {
          var yb = new $3Dmol.Object3D(),
            ib;
          for (ib = 0; ib < e.symmetries.length; ib++) {
            var jb = new $3Dmol.Object3D(),
              jb = w.clone();
            jb.matrix.copy(e.symmetries[ib]);
            jb.matrixAutoUpdate = !1;
            yb.add(jb);
          }
          l = yb;
        } else l = w;
        m && (b.remove(m), (m = null));
        m = l.clone();
        h && (m.setVisible(!1), l.setVisible(!1));
        b.add(m);
      }
    };
    this.removegl = function (b) {
      m &&
        (void 0 !== m.geometry && m.geometry.dispose(),
        void 0 !== m.material && m.material.dispose(),
        b.remove(m),
        (m = null));
      l = null;
    };
    this.hide = function () {
      h = !0;
      m && m.setVisible(!1);
      l && l.setVisible(!1);
    };
    this.show = function () {
      h = !1;
      m && m.setVisible(!0);
      l && l.setVisible(!0);
    };
    this.addResLabels = function (b, c, l) {
      var d = this.selectedAtoms(b, d);
      b = {};
      for (var e = 0; e < d.length; e++) {
        var f = d[e],
          g = f.chain,
          h = f.resn + "" + f.resi;
        b[g] || (b[g] = {});
        b[g][h] || (b[g][h] = []);
        b[g][h].push(f);
      }
      l = $.extend(!0, {}, l);
      for (g in b)
        if (b.hasOwnProperty(g)) {
          var m = b[g];
          for (h in m)
            if (m.hasOwnProperty(h)) {
              for (
                var d = m[h], w = new $3Dmol.Vector3(0, 0, 0), e = 0;
                e < d.length;
                e++
              )
                (f = d[e]), (w.x += f.x), (w.y += f.y), (w.z += f.z);
              w.divideScalar(d.length);
              l.position = w;
              c.addLabel(h, l);
            }
        }
    };
  }
  var c = { line: {} },
    d = {
      H: 1.2,
      Li: 1.82,
      LI: 1.82,
      Na: 2.27,
      NA: 2.27,
      K: 2.75,
      C: 1.7,
      N: 1.55,
      O: 1.52,
      F: 1.47,
      P: 1.8,
      S: 1.8,
      CL: 1.75,
      Cl: 1.75,
      BR: 1.85,
      Br: 1.85,
      SE: 1.9,
      Se: 1.9,
      ZN: 1.39,
      Zn: 1.39,
      CU: 1.4,
      Cu: 1.4,
      NI: 1.63,
      Ni: 1.63,
    },
    p =
      "resn x y z color surfaceColor elem hetflag chain resi icode rescode serial atom bonds ss singleBonds bondOrder properties b pdbline clickable callback invert"
        .split(" ")
        .concat("model bonds predicate invert byres expand within".split(" ")),
    t = ["line", "cross", "stick", "sphere", "cartoon"];
  b.parseMolData = function (b, c, d) {
    c = c || "";
    if (!b) return [];
    if (/\.gz$/.test(c)) {
      c = c.replace(/\.gz$/, "");
      try {
        b = pako.inflate(b, { to: "string" });
      } catch (f) {
        console.log(f);
      }
    }
    "undefined" == typeof $3Dmol.Parsers[c] &&
      ((c = c.split(".").pop()),
      "undefined" == typeof $3Dmol.Parsers[c] &&
        (console.log("Unknown format: " + c),
        (c = b.match(/^@<TRIPOS>MOLECULE/gm)
          ? "mol2"
          : b.match(/^HETATM/gm) || b.match(/^ATOM/gm)
          ? "pdb"
          : b.match(/^.*\n.*\n.\s*(\d+)\s+(\d+)/gm)
          ? "sdf"
          : "xyz"),
        console.log("Best guess: " + c)));
    return (0, $3Dmol.Parsers[c])(b, d);
  };
  b.setAtomDefaults = function (b, d) {
    for (var t = 0; t < b.length; t++) {
      var f = b[t];
      f &&
        ((f.style = f.style || c),
        (f.color = f.color || ElementColors[f.elem] || defaultColor),
        (f.model = d),
        f.clickable &&
          (f.intersectionShape = {
            sphere: [],
            cylinder: [],
            line: [],
            triangle: [],
          }));
    }
  };
  return b;
})();
$3Dmol.GLShape = (function () {
  function b(b) {
    b = b || {};
    $3Dmol.ShapeIDCount++;
    this.boundingSphere = new $3Dmol.Sphere();
    this.intersectionShape = {
      sphere: [],
      cylinder: [],
      line: [],
      triangle: [],
    };
    p(this, b);
    var A = [],
      y = null,
      z = null,
      f = new $3Dmol.Geometry(!0),
      h = new $3Dmol.Geometry(!0);
    this.updateStyle = function (c) {
      for (var d in c) b[d] = c[d];
      p(this, b);
    };
    this.addCustom = function (b) {
      b.vertexArr = b.vertexArr || [];
      b.faceArr = b.faceArr || [];
      b.normalArr = b.normalArr || [];
      c(this, f, b);
    };
    this.addSphere = function (b) {
      b.center = b.center || { x: 0, y: 0, z: 0 };
      b.radius = b.radius ? $3Dmol.Math.clamp(b.radius, 0, Infinity) : 1.5;
      b.color = $3Dmol.CC.color(b.color);
      this.intersectionShape.sphere.push(new $3Dmol.Sphere(b.center, b.radius));
      $3Dmol.GLDraw.drawSphere(f, b.center, b.radius, b.color);
      A.push({
        centroid: new $3Dmol.Vector3(b.center.x, b.center.y, b.center.z),
      });
      b = f.updateGeoGroup(0);
      d(this.boundingSphere, A, b.vertexArray);
    };
    this.addCylinder = function (b) {
      b.start = b.start || {};
      b.end = b.end || {};
      var c = new $3Dmol.Vector3(
          b.start.x || 0,
          b.start.y || 0,
          b.start.z || 0
        ),
        h = new $3Dmol.Vector3(b.end.x, b.end.y || 0, b.end.z || 0);
      "undefined" == typeof h.x && (h.x = 3);
      var e = b.radius || 0.1,
        t = $3Dmol.CC.color(b.color);
      this.intersectionShape.cylinder.push(new $3Dmol.Cylinder(c, h, e));
      $3Dmol.GLDraw.drawCylinder(f, c, h, e, t, b.fromCap, b.toCap);
      b = new $3Dmol.Vector3();
      A.push({ centroid: b.addVectors(c, h).multiplyScalar(0.5) });
      c = f.updateGeoGroup(0);
      d(this.boundingSphere, A, c.vertexArray);
    };
    this.addLine = function (b) {
      b.start = b.start || {};
      b.end = b.end || {};
      var c = new $3Dmol.Vector3(
          b.start.x || 0,
          b.start.y || 0,
          b.start.z || 0
        ),
        d = new $3Dmol.Vector3(b.end.x, b.end.y || 0, b.end.z || 0);
      "undefined" == typeof d.x && (d.x = 3);
      b = f.updateGeoGroup(2);
      var e = b.vertices,
        h = 3 * e,
        g = b.vertexArray;
      g[h] = c.x;
      g[h + 1] = c.y;
      g[h + 2] = c.z;
      g[h + 3] = d.x;
      g[h + 4] = d.y;
      g[h + 5] = d.z;
      b.vertices += 2;
      c = b.lineArray;
      d = b.lineidx;
      c[d] = e;
      c[d + 1] = e + 1;
      b.lineidx += 2;
    };
    this.addArrow = function (b) {
      b.start = b.start || {};
      b.end = b.end || {};
      b.start = new $3Dmol.Vector3(
        b.start.x || 0,
        b.start.y || 0,
        b.start.z || 0
      );
      if (b.dir instanceof $3Dmol.Vector3 && b.length instanceof number) {
        var c = b.dir.clone().multiplyScalar(b.length).add(start);
        b.end = c;
      } else
        (b.end = new $3Dmol.Vector3(b.end.x, b.end.y || 0, b.end.z || 0)),
          "undefined" == typeof b.end.x && (b.end.x = 3);
      b.radius = b.radius || 0.1;
      b.radiusRatio = b.radiusRatio || 1.618034;
      b.mid = 0 < b.mid && 1 > b.mid ? b.mid : 0.618034;
      var h = b.start,
        e = b.end,
        t = b.radius,
        g = b.radiusRatio,
        s = b.mid;
      if (h && e) {
        var c = f.updateGeoGroup(51),
          u = e.clone();
        u.sub(h).multiplyScalar(s);
        var x = h.clone().add(u),
          s = u.clone().negate();
        this.intersectionShape.cylinder.push(
          new $3Dmol.Cylinder(h.clone(), x.clone(), t)
        );
        this.intersectionShape.sphere.push(new $3Dmol.Sphere(h.clone(), t));
        var q = [];
        q[0] = u.clone();
        1e-4 < Math.abs(q[0].x) ? (q[0].y += 1) : (q[0].x += 1);
        q[0].cross(u);
        q[0].normalize();
        q[0] = q[0];
        q[4] = q[0].clone();
        q[4].crossVectors(q[0], u);
        q[4].normalize();
        q[8] = q[0].clone().negate();
        q[12] = q[4].clone().negate();
        q[2] = q[0].clone().add(q[4]).normalize();
        q[6] = q[4].clone().add(q[8]).normalize();
        q[10] = q[8].clone().add(q[12]).normalize();
        q[14] = q[12].clone().add(q[0]).normalize();
        q[1] = q[0].clone().add(q[2]).normalize();
        q[3] = q[2].clone().add(q[4]).normalize();
        q[5] = q[4].clone().add(q[6]).normalize();
        q[7] = q[6].clone().add(q[8]).normalize();
        q[9] = q[8].clone().add(q[10]).normalize();
        q[11] = q[10].clone().add(q[12]).normalize();
        q[13] = q[12].clone().add(q[14]).normalize();
        q[15] = q[14].clone().add(q[0]).normalize();
        var y = c.vertices,
          p = c.vertexArray,
          z = c.faceArray,
          C = c.normalArray,
          B = c.lineArray,
          F,
          J,
          L;
        J = 0;
        for (L = q.length; J < L; ++J) {
          F = 3 * (y + 3 * J);
          var K = q[J].clone().multiplyScalar(t).add(h),
            H = q[J].clone().multiplyScalar(t).add(x),
            M = q[J].clone()
              .multiplyScalar(t * g)
              .add(x);
          p[F] = K.x;
          p[F + 1] = K.y;
          p[F + 2] = K.z;
          p[F + 3] = H.x;
          p[F + 4] = H.y;
          p[F + 5] = H.z;
          p[F + 6] = M.x;
          p[F + 7] = M.y;
          p[F + 8] = M.z;
          0 < J &&
            ((F = new $3Dmol.Vector3(p[F - 3], p[F - 2], p[F - 1])),
            (K = e.clone()),
            (H = x.clone()),
            (M = new $3Dmol.Vector3(M.x, M.y, M.z)),
            this.intersectionShape.triangle.push(new $3Dmol.Triangle(M, K, F)),
            this.intersectionShape.triangle.push(
              new $3Dmol.Triangle(F.clone(), H, M.clone())
            ));
        }
        c.vertices += 48;
        F = 3 * c.vertices;
        p[F] = h.x;
        p[F + 1] = h.y;
        p[F + 2] = h.z;
        p[F + 3] = x.x;
        p[F + 4] = x.y;
        p[F + 5] = x.z;
        p[F + 6] = e.x;
        p[F + 7] = e.y;
        p[F + 8] = e.z;
        c.vertices += 3;
        var O,
          R,
          V,
          P,
          S,
          Q,
          da,
          Y,
          ba = c.vertices - 3,
          E = c.vertices - 2,
          aa = c.vertices - 1,
          T = 3 * ba,
          Z = 3 * E,
          W = 3 * aa;
        J = 0;
        for (L = q.length - 1; J < L; ++J)
          (O = y + 3 * J),
            (h = c.faceidx),
            (e = c.lineidx),
            (t = O),
            (F = 3 * t),
            (g = O + 1),
            (K = 3 * g),
            (x = O + 2),
            (H = 3 * x),
            (p = O + 4),
            (R = 3 * p),
            (M = O + 5),
            (V = 3 * M),
            (O += 3),
            (P = 3 * O),
            (S = Q = q[J]),
            (da = Y = q[J + 1]),
            (C[F] = S.x),
            (C[K] = Q.x),
            (C[P] = Y.x),
            (C[F + 1] = S.y),
            (C[K + 1] = Q.y),
            (C[P + 1] = Y.y),
            (C[F + 2] = S.z),
            (C[K + 2] = Q.z),
            (C[P + 2] = Y.z),
            (C[K] = Q.x),
            (C[R] = da.x),
            (C[P] = Y.x),
            (C[K + 1] = Q.y),
            (C[R + 1] = da.y),
            (C[P + 1] = Y.y),
            (C[K + 2] = Q.z),
            (C[R + 2] = da.z),
            (C[P + 2] = Y.z),
            (C[H] = Q.x),
            (C[V] = da.x),
            (C[H + 1] = Q.y),
            (C[V + 1] = da.y),
            (C[H + 2] = Q.z),
            (C[V + 2] = da.z),
            (z[h] = t),
            (z[h + 1] = g),
            (z[h + 2] = O),
            (z[h + 3] = g),
            (z[h + 4] = p),
            (z[h + 5] = O),
            (z[h + 6] = t),
            (z[h + 7] = O),
            (z[h + 8] = ba),
            (z[h + 9] = x),
            (z[h + 10] = E),
            (z[h + 11] = M),
            (z[h + 12] = x),
            (z[h + 13] = aa),
            (z[h + 14] = M),
            (B[e] = t),
            (B[e + 1] = g),
            (B[e + 2] = t),
            (B[e + 3] = O),
            (B[e + 4] = p),
            (B[e + 5] = O),
            (B[e + 6] = t),
            (B[e + 7] = O),
            (B[e + 8] = x),
            (B[e + 9] = g),
            (B[e + 10] = x),
            (B[e + 11] = M),
            (B[e + 12] = p),
            (B[e + 13] = M),
            (B[e + 14] = x),
            (B[e + 15] = aa),
            (B[e + 16] = x),
            (B[e + 17] = M),
            (B[e + 18] = aa),
            (B[e + 19] = M),
            (c.faceidx += 15),
            (c.lineidx += 20);
        y = [y + 45, y + 46, y + 1, y, y + 47, y + 2];
        h = c.faceidx;
        e = c.lineidx;
        t = y[0];
        F = 3 * t;
        g = y[1];
        K = 3 * g;
        x = y[4];
        H = 3 * x;
        p = y[2];
        R = 3 * p;
        M = y[5];
        V = 3 * M;
        O = y[3];
        P = 3 * O;
        S = Q = q[15];
        da = Y = q[0];
        C[F] = S.x;
        C[K] = Q.x;
        C[P] = Y.x;
        C[F + 1] = S.y;
        C[K + 1] = Q.y;
        C[P + 1] = Y.y;
        C[F + 2] = S.z;
        C[K + 2] = Q.z;
        C[P + 2] = Y.z;
        C[K] = Q.x;
        C[R] = da.x;
        C[P] = Y.x;
        C[K + 1] = Q.y;
        C[R + 1] = da.y;
        C[P + 1] = Y.y;
        C[K + 2] = Q.z;
        C[R + 2] = da.z;
        C[P + 2] = Y.z;
        C[H] = Q.x;
        C[V] = da.x;
        C[H + 1] = Q.y;
        C[V + 1] = da.y;
        C[H + 2] = Q.z;
        C[V + 2] = da.z;
        u.normalize();
        s.normalize();
        C[T] = s.x;
        C[Z] = C[W] = u.x;
        C[T + 1] = s.y;
        C[Z + 1] = C[W + 1] = u.y;
        C[T + 2] = s.z;
        C[Z + 2] = C[W + 2] = u.z;
        z[h] = t;
        z[h + 1] = g;
        z[h + 2] = O;
        z[h + 3] = g;
        z[h + 4] = p;
        z[h + 5] = O;
        z[h + 6] = t;
        z[h + 7] = O;
        z[h + 8] = ba;
        z[h + 9] = x;
        z[h + 10] = E;
        z[h + 11] = M;
        z[h + 12] = x;
        z[h + 13] = aa;
        z[h + 14] = M;
        B[e] = t;
        B[e + 1] = g;
        B[e + 2] = t;
        B[e + 3] = O;
        B[e + 4] = p;
        B[e + 5] = O;
        B[e + 6] = t;
        B[e + 7] = O;
        B[e + 8] = x;
        B[e + 9] = g;
        B[e + 10] = x;
        B[e + 11] = M;
        B[e + 12] = p;
        B[e + 13] = M;
        B[e + 14] = x;
        B[e + 15] = aa;
        B[e + 16] = x;
        B[e + 17] = M;
        B[e + 18] = aa;
        B[e + 19] = M;
        c.faceidx += 15;
        c.lineidx += 20;
      }
      c = new $3Dmol.Vector3();
      A.push({ centroid: c.addVectors(b.start, b.end).multiplyScalar(0.5) });
      b = f.updateGeoGroup(0);
      d(this.boundingSphere, A, b.vertexArray);
    };
    this.addIsosurface = function (b, d) {
      var h =
          void 0 !== d.isoval && "number" === typeof d.isoval ? d.isoval : 0,
        e = d.voxel ? !0 : !1,
        t = void 0 === d.smoothness ? 1 : d.smoothness,
        g = b.size.x,
        s = b.size.y,
        u = b.size.z,
        x = new Int16Array(g * s * u),
        q = b.data,
        p,
        z;
      p = 0;
      for (z = x.length; p < z; ++p) x[p] = -1;
      x = new Uint8Array(g * s * u);
      p = 0;
      for (z = q.length; p < z; ++p)
        0 < (0 <= h ? q[p] - h : h - q[p]) && (x[p] |= 2);
      h = [];
      p = [];
      $3Dmol.MarchingCube.march(x, h, p, {
        fulltable: !0,
        voxel: e,
        unitCube: b.unit,
        origin: b.origin,
        matrix: b.matrix,
        nX: g,
        nY: s,
        nZ: u,
      });
      !e && 0 < t && $3Dmol.MarchingCube.laplacianSmooth(t, h, p);
      c(this, f, {
        vertexArr: h,
        faceArr: p,
        normalArr: [],
        clickable: d.clickable,
      });
      this.updateStyle(d);
      p = new $3Dmol.Vector3(b.origin.x, b.origin.y, b.origin.z);
      g = new $3Dmol.Vector3(
        b.size.x * b.unit.x,
        b.size.y * b.unit.y,
        b.size.z * b.unit.z
      );
      e = new $3Dmol.Vector3(0, 0, 0);
      t = p.clone();
      g = p.clone().add(g);
      for (p = 0; p < h.length; p++) e.add(h[p]), t.max(h[p]), g.min(h[p]);
      e.divideScalar(h.length);
      p = e.distanceTo(g);
      h = e.distanceTo(t);
      this.boundingSphere.center = e;
      this.boundingSphere.radius = Math.max(p, h);
    };
    this.addVolumetricData = function (b, c, d) {
      b = new $3Dmol.VolumeData(b, c);
      this.addIsosurface(b, d);
    };
    this.globj = function (b) {
      z && (b.remove(z), (z = null));
      if (!this.hidden) {
        var c = f.updateGeoGroup(0);
        0 < c.vertices && c.truncateArrayBuffers(!0, !0);
        f.initTypedArrays();
        if ("undefined" != typeof this.color) {
          (c = this.color) || $3Dmol.CC.color(c);
          f.colorsNeedUpdate = !0;
          var d, e, p;
          c.constructor !== Array && ((d = c.r), (e = c.g), (p = c.b));
          for (var g in f.geometryGroups)
            for (
              var s = f.geometryGroups[g],
                u = s.colorArray,
                x = 0,
                s = s.vertices;
              x < s;
              ++x
            )
              c.constructor === Array &&
                ((p = c[x]), (d = p.r), (e = p.g), (p = p.b)),
                (u[3 * x] = d),
                (u[3 * x + 1] = e),
                (u[3 * x + 2] = p);
        }
        y = new $3Dmol.Object3D();
        d = null;
        d =
          this.side == $3Dmol.DoubleSide
            ? new $3Dmol.MeshDoubleLambertMaterial({
                wireframe: this.wireframe,
                side: this.side,
                transparent: 1 > this.opacity ? !0 : !1,
                opacity: this.opacity,
                wireframeLinewidth: this.linewidth,
              })
            : new $3Dmol.MeshLambertMaterial({
                wireframe: this.wireframe,
                side: this.side,
                transparent: 1 > this.opacity ? !0 : !1,
                opacity: this.opacity,
                wireframeLinewidth: this.linewidth,
              });
        d = new $3Dmol.Mesh(f, d);
        y.add(d);
        d = new $3Dmol.LineBasicMaterial({
          linewidth: this.linewidth,
          color: this.color,
        });
        d = new $3Dmol.Line(h, d, $3Dmol.LinePieces);
        y.add(d);
        z = y.clone();
        b.add(z);
      }
    };
    this.removegl = function (b) {
      z &&
        (void 0 !== z.geometry && z.geometry.dispose(),
        void 0 !== z.material && z.material.dispose(),
        b.remove(z),
        (z = null));
      y = null;
    };
  }
  var c = function (b, c, p) {
      var z = p.faceArr;
      (0 !== p.vertexArr.length && 0 !== z.length) ||
        console.warn(
          "Error adding custom shape component: No vertices and/or face indices supplied!"
        );
      z = p.color;
      "undefined" == typeof z && (z = b.color);
      for (
        var z = $3Dmol.CC.color(z),
          f = $3Dmol.splitMesh(p),
          h = 0,
          l = f.length;
        h < l;
        h++
      ) {
        var m = b,
          w = c,
          e = f[h],
          G = f[h].colorArr ? f[h].colorArr : z,
          g = p.clickable,
          s = w.addGeoGroup(),
          u = e.vertexArr,
          x = e.normalArr,
          e = e.faceArr;
        s.vertices = u.length;
        s.faceidx = e.length;
        var q = void 0,
          N = void 0,
          I = void 0,
          D = void 0,
          C = (N = void 0),
          B = void 0,
          F = s.vertexArray,
          I = s.colorArray;
        if (G.constructor !== Array)
          var J = G.r,
            L = G.g,
            D = G.b;
        C = 0;
        for (B = s.vertices; C < B; ++C)
          (q = 3 * C),
            (N = u[C]),
            (F[q] = N.x),
            (F[q + 1] = N.y),
            (F[q + 2] = N.z),
            G.constructor === Array &&
              ((N = G[C]), (J = N.r), (L = N.g), (D = N.b)),
            (I[q] = J),
            (I[q + 1] = L),
            (I[q + 2] = D);
        if (g)
          for (C = 0, B = s.faceidx / 3; C < B; ++C) {
            var q = 3 * C,
              I = e[q],
              D = e[q + 1],
              N = e[q + 2],
              q = new $3Dmol.Vector3(),
              G = new $3Dmol.Vector3(),
              K = new $3Dmol.Vector3();
            m.intersectionShape.triangle.push(
              new $3Dmol.Triangle(q.copy(u[I]), G.copy(u[D]), K.copy(u[N]))
            );
          }
        if (g) {
          C = new $3Dmol.Vector3(0, 0, 0);
          for (L = B = 0; L < w.geometryGroups.length; L++)
            C.add(w.geometryGroups[L].getCentroid()), B++;
          C.divideScalar(B);
          d(m.boundingSphere, { centroid: C }, F);
        }
        s.faceArray = new Uint16Array(e);
        s.truncateArrayBuffers(!0, !0);
        if (x.length < s.vertices) s.setNormals();
        else
          for (
            m = s.normalArray = new Float32Array(3 * s.vertices),
              w = void 0,
              C = 0,
              B = s.vertices;
            C < B;
            ++C
          )
            (q = 3 * C),
              (w = x[C]),
              (m[q] = w.x),
              (m[q + 1] = w.y),
              (m[q + 2] = w.z);
        s.setLineIndices();
        s.lineidx = s.lineArray.length;
      }
    },
    d = function (b, c, d) {
      b.center.set(0, 0, 0);
      var p, f;
      if (0 < c.length) {
        p = 0;
        for (f = c.length; p < f; ++p) b.center.add(c[p].centroid);
        b.center.divideScalar(c.length);
      }
      c = b.radius * b.radius;
      p = 0;
      for (f = d.length / 3; p < f; p++) {
        var h = b.center.distanceToSquared({
          x: d[3 * p],
          y: d[3 * p + 1],
          z: d[3 * p + 2],
        });
        c = Math.max(c, h);
      }
      b.radius = Math.sqrt(c);
    },
    p = function (b, c) {
      "undefined" != typeof c.color &&
        ((b.color = c.color || new $3Dmol.Color()),
        c.color instanceof $3Dmol.Color ||
          (b.color = $3Dmol.CC.color(c.color)));
      b.wireframe = c.wireframe ? !0 : !1;
      b.opacity = c.alpha ? $3Dmol.Math.clamp(c.alpha, 0, 1) : 1;
      "undefined" != typeof c.opacity &&
        (b.opacity = $3Dmol.Math.clamp(c.opacity, 0, 1));
      b.side = void 0 !== c.side ? c.side : $3Dmol.DoubleSide;
      b.linewidth = "undefined" == typeof c.linewidth ? 1 : c.linewidth;
      b.clickable = c.clickable ? !0 : !1;
      b.callback = "function" === typeof c.callback ? c.callback : null;
      b.hidden = c.hidden;
    };
  Object.defineProperty(b.prototype, "position", {
    get: function () {
      return this.boundingSphere.center;
    },
  });
  Object.defineProperty(b.prototype, "x", {
    get: function () {
      return this.boundingSphere.center.x;
    },
  });
  Object.defineProperty(b.prototype, "y", {
    get: function () {
      return this.boundingSphere.center.y;
    },
  });
  Object.defineProperty(b.prototype, "z", {
    get: function () {
      return this.boundingSphere.center.z;
    },
  });
  return b;
})();
$3Dmol.ShapeIDCount = 0;
$3Dmol.splitMesh = function (b) {
  if (64e3 > b.vertexArr.length) return [b];
  var c = [{ vertexArr: [], normalArr: [], faceArr: [] }];
  b.colorArr && (c.colorArr = []);
  for (
    var d = [], p = [], t = 0, A = b.faceArr, y = 0, z = A.length;
    y < z;
    y += 3
  ) {
    for (var f = c[t], h = 0; 3 > h; h++) {
      var l = A[y + h];
      d[l] !== t &&
        ((d[l] = t),
        (p[l] = f.vertexArr.length),
        f.vertexArr.push(b.vertexArr[l]),
        b.normalArr && b.normalArr[l] && f.normalArr.push(b.normalArr[l]),
        b.colorArr && b.colorArr[l] && f.colorArr.push(b.colorArr[l]));
      f.faceArr.push(p[l]);
    }
    64e3 <= f.vertexArr.length &&
      (c.push({ vertexArr: [], normalArr: [], faceArr: [] }),
      b.colorArr && (c.colorArr = []),
      t++);
  }
  return c;
};
$3Dmol.GLViewer = (function () {
  return function (b, c) {
    function d(b) {
      var c = [];
      "undefined" === typeof b && (b = {});
      var d = [],
        f;
      if ("undefined" === typeof b.model)
        for (f = 0; f < e.length; f++) e[f] && d.push(e[f]);
      else (d = b.model), $.isArray(d) || (d = [d]);
      for (f = 0; f < d.length; f++) c = c.concat(d[f].selectedAtoms(b));
      return c;
    }
    function p(b, c, d, f) {
      var l = [];
      if ("undefined" === typeof c.model)
        for (h = 0; h < e.length; h++) e[h] && l.push(e[h]);
      else (l = c.model), $.isArray(l) || (l = [l]);
      for (var h = 0; h < l.length; h++) if (l[h]) l[h][b](c, d, f);
    }
    function t(b) {
      var c = new $3Dmol.MeshLambertMaterial();
      c.vertexColors = $3Dmol.VertexColors;
      for (var d in b)
        "color" !== d && "map" !== d && b.hasOwnProperty(d) && (c[d] = b[d]);
      void 0 !== b.opacity && (c.transparent = 1 === b.opacity ? !1 : !0);
      return c;
    }
    c = c || {};
    var A = c.callback,
      y = c.defaultcolors;
    y || (y = $3Dmol.elementColors.defaultColors);
    var z = c.nomouse,
      f = 0;
    void 0 != typeof c.backgroundColor &&
      (f = $3Dmol.CC.color(c.backgroundColor).getHex());
    var h = 0;
    void 0 != typeof c.camerax && (h = parseFloat(c.camerax));
    var l = this,
      m = b,
      w = null,
      e = [],
      G = {},
      g = [],
      s = [],
      u = [],
      x = m.width(),
      q = m.height(),
      N = x / q,
      I = [],
      D = new $3Dmol.Renderer({
        antialias: !0,
        preserveDrawingBuffer: !0,
        premultipliedAlpha: !1,
      });
    D.domElement.style.width = "100%";
    D.domElement.style.height = "100%";
    D.domElement.style.padding = "0";
    D.domElement.style.position = "absolute";
    D.domElement.style.top = "0px";
    D.domElement.style.left = "0px";
    D.domElement.style.zIndex = "0";
    var C = new $3Dmol.Camera(20, N, 1, 800, c.orthographic);
    C.position = new $3Dmol.Vector3(h, 0, 150);
    var B = new $3Dmol.Vector3();
    C.lookAt(B);
    var F = new $3Dmol.Raycaster(
        new $3Dmol.Vector3(0, 0, 0),
        new $3Dmol.Vector3(0, 0, 0)
      ),
      J = new $3Dmol.Projector(),
      L = new $3Dmol.Vector3(0, 0, 0),
      K = null,
      H = null,
      M = null,
      O = -50,
      R = 50,
      V = new $3Dmol.Quaternion(0, 0, 0, 1),
      P = new $3Dmol.Quaternion(0, 0, 0, 1),
      S = !1,
      Q = !1,
      da = 0,
      Y = 0,
      ba = 0,
      E = 0,
      aa = 0,
      T = 0,
      Z = 0,
      W = function () {
        var b = 0;
        for (i in G) G.hasOwnProperty(i) && i > b && (b = i);
        return b + 1;
      },
      U = function () {
        var b = C.position.z - H.position.z;
        1 > b && (b = 1);
        C.near = b + O;
        1 > C.near && (C.near = 1);
        C.far = b + R;
        C.near + 1 > C.far && (C.far = C.near + 1);
        C.fov = 20;
        C.right = b * Math.tan((Math.PI / 180) * 20);
        C.left = -C.right;
        C.top = C.right / N;
        C.bottom = -C.top;
        C.updateProjectionMatrix();
        K.fog.near = C.near + 0.4 * (C.far - C.near);
        K.fog.far = C.far;
      },
      X = function (b) {
        if (K && (U(), D.render(K, C), !b && 0 < I.length)) {
          b = l.getView();
          for (var c = 0; c < I.length; c++) I[c].setView(b, !0);
        }
      };
    (function () {
      K = new $3Dmol.Scene();
      K.fog = new $3Dmol.Fog(f, 100, 200);
      M = new $3Dmol.Object3D();
      H = new $3Dmol.Object3D();
      H.useQuaternion = !0;
      H.quaternion = new $3Dmol.Quaternion(0, 0, 0, 1);
      H.add(M);
      K.add(H);
      var b = new $3Dmol.Light(16777215);
      b.position = new $3Dmol.Vector3(0.2, 0.2, 1).normalize();
      b.intensity = 1;
      K.add(b);
    })();
    D.setClearColorHex(f, 1);
    K.fog.color = $3Dmol.CC.color(f);
    var ga = function (b) {
        var c =
          b.originalEvent.targetTouches[0].pageX -
          b.originalEvent.targetTouches[1].pageX;
        b =
          b.originalEvent.targetTouches[0].pageY -
          b.originalEvent.targetTouches[1].pageY;
        return Math.sqrt(c * c + b * b);
      },
      Ea = function (b) {
        var c = b.pageX,
          d = b.pageY;
        b.originalEvent.targetTouches && b.originalEvent.targetTouches[0]
          ? ((c = b.originalEvent.targetTouches[0].pageX),
            (d = b.originalEvent.targetTouches[0].pageY))
          : b.originalEvent.changedTouches &&
            b.originalEvent.changedTouches[0] &&
            ((c = b.originalEvent.changedTouches[0].pageX),
            (d = b.originalEvent.changedTouches[0].pageY));
        return [c, d];
      };
    $("body").bind("mouseup touchend", function (b) {
      if (Q && K) {
        var c = Ea(b),
          d = c[0],
          c = c[1];
        if (d == da && c == Y) {
          var e = $("canvas", m).offset(),
            d = ((d - e.left) / x) * 2 - 1,
            c = 2 * -((c - e.top) / q) + 1;
          0 != u.length &&
            (L.set(d, c, -1),
            J.unprojectVector(L, C),
            L.sub(C.position).normalize(),
            F.set(C.position, L),
            (d = []),
            (d = F.intersectObjects(M, u)),
            d.length &&
              ((d = d[0].clickable),
              void 0 !== d.callback &&
                "function" === typeof d.callback &&
                d.callback(d, l, b, m)));
        }
      }
      Q = !1;
    });
    var Na = (this._handleMouseDown = function (b) {
        b.preventDefault();
        if (K) {
          var c = Ea(b),
            d = c[0],
            c = c[1];
          void 0 !== d &&
            ((Q = !0),
            (mouseButton = b.which),
            (da = d),
            (Y = c),
            (ba = 0),
            b.originalEvent.targetTouches &&
              2 == b.originalEvent.targetTouches.length &&
              (ba = ga(b)),
            (V = H.quaternion),
            (aa = H.position.z),
            (E = M.position.clone()),
            (T = O),
            (Z = R));
        }
      }),
      Fa = (this._handleMouseScroll = function (b) {
        b.preventDefault();
        if (K) {
          var c = 0.85 * (150 - H.position.z),
            d = 1;
          b.originalEvent.ctrlKey && (d = -1);
          b.originalEvent.detail
            ? (H.position.z += (d * c * b.originalEvent.detail) / 10)
            : b.originalEvent.wheelDelta &&
              (H.position.z -= (d * c * b.originalEvent.wheelDelta) / 400);
          150 < H.position.z && (H.position.z = 149.85);
          X();
        }
      }),
      Ga = (this._handleMouseMove = function (b) {
        x = m.width();
        q = m.height();
        b.preventDefault();
        if (K && Q) {
          var c = 0,
            d = Ea(b),
            e = d[0],
            d = d[1];
          if (void 0 !== e) {
            var f = (e - da) / x,
              l = (d - Y) / q;
            0 != ba &&
            b.originalEvent.targetTouches &&
            2 == b.originalEvent.targetTouches.length
              ? ((l = ga(b)),
                (c = 2),
                (l = (2 * (l - ba)) / (x + q)),
                console.log("pinch " + ba + " dy " + l))
              : b.originalEvent.targetTouches &&
                3 == b.originalEvent.targetTouches.length &&
                (c = 1);
            var h = Math.sqrt(f * f + l * l);
            3 == c || (3 == mouseButton && b.ctrlKey)
              ? ((O = T + 100 * f), (R = Z + 100 * l))
              : 2 == c || 3 == mouseButton || b.shiftKey
              ? ((b = 0.85 * (150 - H.position.z)),
                80 > b && (b = 80),
                (H.position.z = aa + l * b),
                150 < H.position.z && (H.position.z = 149.85))
              : 1 == c || 2 == mouseButton || b.ctrlKey
              ? ((b = (e - da) / x),
                (c = (d - Y) / q),
                (e = H.quaternion),
                (d = new $3Dmol.Vector3(0, 0, H.position.z)),
                J.projectVector(d, C),
                (d.x += 2 * b),
                (d.y -= 2 * c),
                J.unprojectVector(d, C),
                (d.z = 0),
                d.applyQuaternion(e),
                M.position.addVectors(E, d))
              : (0 !== c && 1 != mouseButton) ||
                0 === h ||
                ((b = Math.sin(h * Math.PI) / h),
                (P.x = Math.cos(h * Math.PI)),
                (P.y = 0),
                (P.z = b * f),
                (P.w = -b * l),
                (H.quaternion = new $3Dmol.Quaternion(1, 0, 0, 0)),
                H.quaternion.multiply(P),
                H.quaternion.multiply(V));
            X();
          }
        }
      }),
      Ta = function (b) {
        m = b;
        x = m.width();
        q = m.height();
        N = x / q;
        D.setSize(x, q);
        m.append(D.domElement);
        w = $(D.domElement);
        z ||
          (w.bind("mousedown touchstart", Na),
          w.bind("DOMMouseScroll mousewheel", Fa),
          w.bind("mousemove touchmove", Ga),
          w.bind("contextmenu", function (b) {
            b.preventDefault();
          }));
      };
    Ta(m);
    this.setContainer = function (b) {
      "string" === $.type(b) && (b = $("#" + b));
      b || (b = m);
      Ta(b);
      return this;
    };
    this.setBackgroundColor = function (b, c) {
      if ("undefined" == typeof c) c = 1;
      else if (0 > c || 1 < c) c = 1;
      var d = $3Dmol.CC.color(b);
      K.fog.color = d;
      f = d.getHex();
      D.setClearColorHex(d.getHex(), c);
      X();
      return this;
    };
    this.setProjection = function (b) {
      C.ortho = "orthographic" === b;
      U();
    };
    this.setViewStyle = function (b) {
      if ("outline" === b.style) {
        var c = {};
        b.color && (c.color = $3Dmol.CC.color(b.color));
        b.width && (c.width = b.width);
        D.enableOutline(c);
      } else D.disableOutline();
      return this;
    };
    c.style && this.setViewStyle(c);
    this.setWidth = function (b) {
      x = b || x;
      D.setSize(x, q);
      return this;
    };
    this.setHeight = function (b) {
      q = b || q;
      D.setSize(x, q);
      return this;
    };
    this.resize = function () {
      x = m.width();
      q = m.height();
      N = x / q;
      D.setSize(x, q);
      C.aspect = N;
      C.updateProjectionMatrix();
      X();
      return this;
    };
    $(window).resize(this.resize);
    this.getModel = function (b) {
      b = b || e.length - 1;
      return e[b];
    };
    this.rotate = function (b, c) {
      "undefined" === typeof c && (c = "y");
      var d = 0,
        e = 0,
        f = 0,
        l = (Math.PI * b) / 180,
        h = Math.sin(l / 2),
        l = Math.cos(l / 2);
      "x" == c && (d = h);
      "y" == c && (e = h);
      "z" == c && (f = h);
      d = new $3Dmol.Quaternion(d, e, f, l).normalize();
      H.quaternion.multiply(d);
      X();
      return this;
    };
    this.getView = function () {
      if (!M) return [0, 0, 0, 0, 0, 0, 0, 1];
      var b = M.position,
        c = H.quaternion;
      return [b.x, b.y, b.z, H.position.z, c.x, c.y, c.z, c.w];
    };
    this.setView = function (b, c) {
      if (void 0 === b || !(b instanceof Array || 8 !== b.length) || !M || !H)
        return this;
      M.position.x = b[0];
      M.position.y = b[1];
      M.position.z = b[2];
      H.position.z = b[3];
      H.quaternion.x = b[4];
      H.quaternion.y = b[5];
      H.quaternion.z = b[6];
      H.quaternion.w = b[7];
      "undefined" != typeof b[8] &&
        ((H.position.x = b[8]), (H.position.y = b[9]));
      X(c);
      return this;
    };
    this.render = function () {
      u.splice(0, u.length);
      var b, c;
      b = 0;
      for (c = e.length; b < c; b++) {
        var d = e[b];
        d &&
          ((d = d.selectedAtoms({ clickable: !0 })),
          Array.prototype.push.apply(u, d));
      }
      b = 0;
      for (c = g.length; b < c; b++) (d = g[b]) && d.clickable && u.push(d);
      b = this.getView();
      d = D.supportedExtensions();
      for (c = 0; c < e.length; c++) e[c] && e[c].globj(M, d);
      for (c = 0; c < g.length; c++) g[c] && g[c].globj(M, d);
      for (c in G)
        if (G.hasOwnProperty(c))
          for (var f = G[c], d = 0; d < f.length; d++)
            if (f.hasOwnProperty(d)) {
              var l = f[d].geo;
              if (!f[d].finished) {
                l.verticesNeedUpdate = !0;
                l.elementsNeedUpdate = !0;
                l.normalsNeedUpdate = !0;
                l.colorsNeedUpdate = !0;
                l.buffersNeedUpdate = !0;
                l.boundingSphere = null;
                f[d].done && (f[d].finished = !0);
                f[d].lastGL && M.remove(f[d].lastGL);
                var h = null,
                  h =
                    f[d].mat instanceof $3Dmol.LineBasicMaterial
                      ? new $3Dmol.Line(l, f[d].mat)
                      : new $3Dmol.Mesh(l, f[d].mat);
                h.visible =
                  f[d].mat.transparent && 0 == f[d].mat.opacity ? !1 : !0;
                if (
                  1 < f[d].symmetries.length ||
                  (1 == f[d].symmetries.length &&
                    !f[d].symmetries[d].isIdentity())
                ) {
                  for (
                    var m = new $3Dmol.Object3D(), l = 0;
                    l < f[d].symmetries.length;
                    l++
                  ) {
                    var q = h.clone();
                    q.matrix = f[d].symmetries[l];
                    q.matrixAutoUpdate = !1;
                    m.add(q);
                  }
                  f[d].lastGL = m;
                  M.add(m);
                } else (f[d].lastGL = h), M.add(h);
              }
            }
      this.setView(b);
      return this;
    };
    this.selectedAtoms = function (b) {
      return d(b);
    };
    this.pdbData = function (b) {
      b = d(b);
      for (var c = "", e = 0, f = b.length; e < f; ++e)
        c += b[e].pdbline + "\n";
      return c;
    };
    this.zoom = function (b) {
      H.position.z = 150 - (150 - H.position.z) / (b || 2);
      X();
      return this;
    };
    this.translate = function (b, c) {
      var d = b / x,
        e = c / q,
        f = new $3Dmol.Vector3(0, 0, -150);
      J.projectVector(f, C);
      f.x -= d;
      f.y -= e;
      J.unprojectVector(f, C);
      f.z = 0;
      B.add(f);
      C.lookAt(B);
      X();
      return this;
    };
    this.zoomTo = function (b) {
      var c;
      b = b || {};
      var e = d(b),
        f = $3Dmol.getExtent(e);
      $.isEmptyObject(b)
        ? ($.each(g, function (b, c) {
            if (c && c.boundingSphere && c.boundingSphere.center)
              var d = c.boundingSphere.center;
            var f = c.boundingSphere.radius;
            0 < f
              ? (e.push(new $3Dmol.Vector3(d.x + f, d.y, d.z)),
                e.push(new $3Dmol.Vector3(d.x - f, d.y, d.z)),
                e.push(new $3Dmol.Vector3(d.x, d.y + f, d.z)),
                e.push(new $3Dmol.Vector3(d.x, d.y - f, d.z)),
                e.push(new $3Dmol.Vector3(d.x, d.y, d.z + f)),
                e.push(new $3Dmol.Vector3(d.x, d.y, d.z - f)))
              : e.push(d);
          }),
          (f = $3Dmol.getExtent(e)),
          (b = e),
          (c = f))
        : ((b = d({})), (c = $3Dmol.getExtent(b)));
      b = new $3Dmol.Vector3(f[2][0], f[2][1], f[2][2]);
      M.position = b.clone().multiplyScalar(-1);
      var l = c[1][0] - c[0][0],
        h = c[1][1] - c[0][1];
      c = c[1][2] - c[0][2];
      l = Math.sqrt(l * l + h * h + c * c);
      5 > l && (l = 5);
      O = -l / 1.9;
      R = l / 2;
      l = f[1][0] - f[0][0];
      h = f[1][1] - f[0][1];
      c = f[1][2] - f[0][2];
      l = Math.sqrt(l * l + h * h + c * c);
      5 > l && (l = 5);
      f = 25;
      for (l = 0; l < e.length; l++)
        e[l] && ((h = b.distanceToSquared(e[l])), h > f && (f = h));
      l = 2 * Math.sqrt(f);
      H.position.z = -(
        (0.5 * l) / Math.tan(((Math.PI / 180) * C.fov) / 2) -
        150
      );
      X();
      return this;
    };
    this.setSlab = function (b, c) {
      O = b;
      R = c;
    };
    this.getSlab = function (b) {
      return { near: O, far: R };
    };
    this.addLabel = function (b, c) {
      var d = new $3Dmol.Label(b, c);
      d.setContext();
      M.add(d.sprite);
      s.push(d);
      X();
      return d;
    };
    this.addResLabels = function (b, c) {
      p("addResLabels", b, this, c);
      return this;
    };
    this.removeLabel = function (b) {
      for (var c = 0; c < s.length; c++)
        if (s[c] == b) {
          s.splice(c, 1);
          b.dispose();
          M.remove(b.sprite);
          break;
        }
      return this;
    };
    this.removeAllLabels = function () {
      for (var b = 0; b < s.length; b++) M.remove(s[b].sprite);
      s.splice(0, s.length);
      return this;
    };
    this.setLabelStyle = function (b, c) {
      M.remove(b.sprite);
      b.dispose();
      b.stylespec = c;
      b.setContext();
      M.add(b.sprite);
      X();
      return b;
    };
    this.setLabelText = function (b, c) {
      M.remove(b.sprite);
      b.dispose();
      b.text = c;
      b.setContext();
      M.add(b.sprite);
      X();
      return b;
    };
    this.addShape = function (b) {
      b = b || {};
      b = new $3Dmol.GLShape(b);
      b.shapePosition = g.length;
      g.push(b);
      return b;
    };
    this.removeShape = function (b) {
      if (!b) return this;
      b.removegl(M);
      for (
        delete g[b.shapePosition];
        0 < g.length && "undefined" === typeof g[g.length - 1];

      )
        g.pop();
      return this;
    };
    this.removeAllShapes = function () {
      for (var b = 0; b < g.length; b++) g[b].removegl(M);
      g.splice(0, g.length);
      return this;
    };
    this.addSphere = function (b) {
      b = b || {};
      var c = new $3Dmol.GLShape(b);
      c.shapePosition = g.length;
      c.addSphere(b);
      g.push(c);
      return c;
    };
    this.addArrow = function (b) {
      b = b || {};
      var c = new $3Dmol.GLShape(b);
      c.shapePosition = g.length;
      c.addArrow(b);
      g.push(c);
      return c;
    };
    this.addCylinder = function (b) {
      b = b || {};
      var c = new $3Dmol.GLShape(b);
      c.shapePosition = g.length;
      c.addCylinder(b);
      g.push(c);
      return c;
    };
    this.addLine = function (b) {
      b = b || {};
      b.wireframe = !0;
      var c = new $3Dmol.GLShape(b);
      c.shapePosition = g.length;
      if (b.dashed) {
        b.dashLength = b.dashLength || 0.5;
        b.gapLength = b.gapLength || 0.5;
        b.start = b.start || {};
        b.end = b.end || {};
        var d = new $3Dmol.Vector3(
            b.start.x || 0,
            b.start.y || 0,
            b.start.z || 0
          ),
          e = new $3Dmol.Vector3(b.end.x, b.end.y || 0, b.end.z || 0),
          f = new $3Dmol.Vector3(),
          l = new $3Dmol.Vector3(),
          h = new $3Dmol.Vector3(),
          m,
          q,
          s = d.clone(),
          w = 0;
        f.subVectors(e, d);
        m = f.length();
        f.normalize();
        l = f.clone();
        h = f.clone();
        l.multiplyScalar(b.dashLength);
        h.multiplyScalar(b.gapLength);
        f = l.length();
        for (q = h.length(); w < m; ) {
          if (w + f > m) {
            b.start = d;
            b.end = e;
            c.addLine(b);
            break;
          }
          s.addVectors(d, l);
          b.start = d;
          b.end = s;
          c.addLine(b);
          d = s.clone();
          w += f;
          s.addVectors(d, h);
          d = s.clone();
          w += q;
        }
      } else c.addLine(b);
      g.push(c);
      return c;
    };
    this.addUnitCell = function (b) {
      var c = new $3Dmol.GLShape({ wireframe: !0 });
      c.shapePosition = g.length;
      var d = b.getCrystData();
      if (d) {
        b = d.a;
        var e = d.b,
          f = d.c,
          l = d.alpha,
          h = d.beta,
          d = d.gamma,
          l = (l * Math.PI) / 180,
          h = (h * Math.PI) / 180,
          d = (d * Math.PI) / 180,
          m;
        m = Math.cos(h);
        l = (Math.cos(l) - Math.cos(h) * Math.cos(d)) / Math.sin(d);
        h = Math.sqrt(Math.max(0, 1 - m * m - l * l));
        b = new $3Dmol.Matrix4(
          b,
          e * Math.cos(d),
          f * m,
          0,
          0,
          e * Math.sin(d),
          f * l,
          0,
          0,
          0,
          f * h,
          0,
          0,
          0,
          0,
          1
        );
        e = [
          new $3Dmol.Vector3(0, 0, 0),
          new $3Dmol.Vector3(1, 0, 0),
          new $3Dmol.Vector3(0, 1, 0),
          new $3Dmol.Vector3(0, 0, 1),
          new $3Dmol.Vector3(1, 1, 0),
          new $3Dmol.Vector3(0, 1, 1),
          new $3Dmol.Vector3(1, 0, 1),
          new $3Dmol.Vector3(1, 1, 1),
        ];
        for (f = 0; f < e.length; f++) e[f] = e[f].applyMatrix4(b);
        c.addLine({ start: e[0], end: e[1] });
        c.addLine({ start: e[0], end: e[2] });
        c.addLine({ start: e[1], end: e[4] });
        c.addLine({ start: e[2], end: e[4] });
        c.addLine({ start: e[0], end: e[3] });
        c.addLine({ start: e[3], end: e[5] });
        c.addLine({ start: e[2], end: e[5] });
        c.addLine({ start: e[1], end: e[6] });
        c.addLine({ start: e[4], end: e[7] });
        c.addLine({ start: e[6], end: e[7] });
        c.addLine({ start: e[3], end: e[6] });
        c.addLine({ start: e[5], end: e[7] });
      }
      g.push(c);
      return c;
    };
    this.addCustom = function (b) {
      b = b || {};
      var c = new $3Dmol.GLShape(b);
      c.shapePosition = g.length;
      c.addCustom(b);
      g.push(c);
      return c;
    };
    this.addVolumetricData = function (b, c, d) {
      d = d || {};
      var e = new $3Dmol.GLShape(d);
      e.shapePosition = g.length;
      e.addVolumetricData(b, c, d);
      g.push(e);
      return e;
    };
    this.addIsosurface = function (b, c) {
      c = c || {};
      var d = new $3Dmol.GLShape(c);
      d.shapePosition = g.length;
      d.addIsosurface(b, c);
      g.push(d);
      return d;
    };
    this.setFrame = function (b) {
      for (var c = 0; c < e.length; c++) e[c].setFrame(b);
      return this;
    };
    this.getFrames = function () {
      for (var b = 0, c = 0; c < e.length; c++)
        e[c].getFrames().length > b && (b = e[c].getFrames().length);
      return b;
    };
    this.animate = function (b) {
      S = !0;
      var c = 100,
        d = "forward",
        e = 0;
      b = b || {};
      b.interval && (c = b.interval);
      b.loop && (d = b.loop);
      b.reps && (e = b.reps);
      var f = this.getFrames(),
        l = this,
        h = 0,
        g = 1,
        m = 0,
        q = f * e,
        s = setInterval(function () {
          var b = d;
          "forward" == b
            ? (l.setFrame(h), (h = (h + g) % f))
            : "backward" == b
            ? (l.setFrame(f - 1 - h), (h = (h + g) % f))
            : (l.setFrame(h), (h += g), (g *= 0 == h % (f - 1) ? -1 : 1));
          l.render();
          (++m != q && l.isAnimated()) || clearInterval(s);
        }, c);
      return this;
    };
    this.stopAnimate = function () {
      S = !1;
      return this;
    };
    this.isAnimated = function () {
      return S;
    };
    this.addModel = function (b, c, d) {
      var f = new $3Dmol.GLModel(e.length, y);
      f.addMolData(b, c, d);
      e.push(f);
      return f;
    };
    this.addModels = function (b, c, d) {
      d = d || {};
      d.multimodel = !0;
      d.frames = !0;
      b = $3Dmol.GLModel.parseMolData(b, c, d);
      for (c = 0; c < b.length; c++) {
        var f = new $3Dmol.GLModel(e.length, y);
        f.setAtomDefaults(b[c]);
        f.addFrame(b[c]);
        f.setFrame(0);
        f.setModelData(b.modelData[c]);
        f.setDontDuplicateAtoms(!d.duplicateAssemblyAtoms);
        e.push(f);
      }
      return e;
    };
    this.addModelsAsFrames = function (b, c, d) {
      d = d || {};
      d.multimodel = !0;
      d.frames = !0;
      var f = new $3Dmol.GLModel(e.length, y);
      f.addMolData(b, c, d);
      e.push(f);
      return f;
    };
    this.addAsOneMolecule = function (b, c, d) {
      d = d || {};
      d.multimodel = !0;
      d.onemol = !0;
      var f = new $3Dmol.GLModel(e.length, y);
      f.addMolData(b, c, d);
      e.push(f);
      return f;
    };
    this.removeModel = function (b) {
      if (b) {
        b.removegl(M);
        for (
          delete e[b.getID()];
          0 < e.length && "undefined" === typeof e[e.length - 1];

        )
          e.pop();
        return this;
      }
    };
    this.removeAllModels = function () {
      for (var b = 0; b < e.length; b++) e[b].removegl(M);
      e.splice(0, e.length);
      return this;
    };
    this.exportJSON = function (b, c) {
      var d = {};
      d.m =
        void 0 === c
          ? e.map(function (c) {
              return c.toCDObject(b);
            })
          : [model[c].toCDObject()];
      return JSON.stringify(d);
    };
    this.createModelFrom = function (b, c) {
      for (var d = new $3Dmol.GLModel(e.length, y), f = 0; f < e.length; f++)
        if (e[f]) {
          var l = e[f].selectedAtoms(b);
          d.addAtoms(l);
          c && e[f].removeAtoms(l);
        }
      e.push(d);
      return d;
    };
    this.setStyle = function (b, c) {
      "undefined" === typeof c && ((c = b), (b = {}));
      p("setStyle", b, c, !1);
      return this;
    };
    this.addStyle = function (b, c) {
      "undefined" === typeof c && ((c = b), (b = {}));
      p("setStyle", b, c, !0);
      return this;
    };
    this.setClickable = function (b, c, d) {
      p("setClickable", b, c, d);
      return this;
    };
    this.setColorByProperty = function (b, c, d) {
      p("setColorByProperty", b, c, d);
      return this;
    };
    this.setColorByElement = function (b, c) {
      p("setColorByElement", b, c);
      return this;
    };
    var Oa = function (b, c) {
        for (var d = [], e = 0; e < b.length; e++) {
          var f = b[e];
          "undefined" != typeof f &&
            (f.x < c[0][0] ||
              f.x > c[1][0] ||
              f.y < c[0][1] ||
              f.y > c[1][1] ||
              f.z < c[0][2] ||
              f.z > c[1][2] ||
              d.push(e));
        }
        return d;
      },
      Pa = function (b) {
        return (b[1][0] - b[0][0]) * (b[1][1] - b[0][1]) * (b[1][2] - b[0][2]);
      },
      ab = function (b, c, d) {
        var e = [],
          f = function (b) {
            var c = [];
            c[0] = [b[0][0], b[0][1], b[0][2]];
            c[1] = [b[1][0], b[1][1], b[1][2]];
            return c;
          },
          l = function (b) {
            if (64e3 > Pa(b)) return [b];
            var c = b[1][0] - b[0][0],
              d = b[1][1] - b[0][1],
              e = b[1][2] - b[0][2],
              d = c > d && c > e ? 0 : d > c && d > e ? 1 : 2,
              e = f(b),
              c = f(b);
            b = (b[1][d] - b[0][d]) / 2 + b[0][d];
            e[1][d] = b;
            c[0][d] = b;
            b = l(e);
            c = l(c);
            return b.concat(c);
          };
        b = l(b);
        for (var h = 0, g = b.length; h < g; h++) {
          var m = f(b[h]);
          m[0][0] -= 6;
          m[0][1] -= 6;
          m[0][2] -= 6;
          m[1][0] += 6;
          m[1][1] += 6;
          m[1][2] += 6;
          var m = Oa(c, m),
            q = Oa(d, b[h]);
          e.push({ extent: b[h], atoms: m, toshow: q });
        }
        return e;
      },
      Ba = function (b, c, d) {
        for (
          var e = new $3Dmol.Geometry(!0),
            f = e.updateGeoGroup(0),
            l = [],
            h = 0,
            g = b.length;
          h < g;
          h++
        ) {
          var m = b[h];
          m &&
            ("undefined" != typeof m.surfaceColor
              ? (l[h] = m.surfaceColor)
              : m.color && (l[h] = $3Dmol.CC.color(m.color)));
        }
        var q = f.vertexArray,
          m = c.vertices,
          h,
          g;
        h = 0;
        for (g = m.length; h < g; h++)
          (b = 3 * f.vertices),
            (q[b] = m[h].x),
            (q[b + 1] = m[h].y),
            (q[b + 2] = m[h].z),
            f.vertices++;
        q = f.colorArray;
        if (d.voldata && d.volscheme) {
          var l = d.volscheme,
            s = d.voldata,
            w = l.range() || [-1, 1];
          h = 0;
          for (g = m.length; h < g; h++) {
            b = s.getVal(m[h].x, m[h].y, m[h].z);
            var u = $3Dmol.CC.color(l.valueToHex(b, w));
            b = 3 * h;
            q[b] = u.r;
            q[b + 1] = u.g;
            q[b + 2] = u.b;
          }
        } else if (0 < l.length)
          for (h = 0, g = m.length; h < g; h++)
            (s = m[h].atomid),
              (b = 3 * h),
              (q[b] = l[s].r),
              (q[b + 1] = l[s].g),
              (q[b + 2] = l[s].b);
        c = c.faces;
        f.faceidx = c.length;
        e.initTypedArrays();
        var m = f.vertexArray,
          q = f.normalArray,
          p;
        h = 0;
        for (g = c.length; h < g; h += 3)
          (l = c[h + 1]),
            (s = c[h + 2]),
            (b = 3 * c[h]),
            (l *= 3),
            (s *= 3),
            (w = new $3Dmol.Vector3(m[b], m[b + 1], m[b + 2])),
            (u = new $3Dmol.Vector3(m[l], m[l + 1], m[l + 2])),
            (p = new $3Dmol.Vector3(m[s], m[s + 1], m[s + 2])),
            p.subVectors(p, u),
            w.subVectors(w, u),
            p.cross(w),
            (w = p),
            w.normalize(),
            (q[b] += w.x),
            (q[l] += w.x),
            (q[s] += w.x),
            (q[b + 1] += w.y),
            (q[l + 1] += w.y),
            (q[s + 1] += w.y),
            (q[b + 2] += w.z),
            (q[l + 2] += w.z),
            (q[s + 2] += w.z);
        f.faceArray = new Uint16Array(c);
        d = new $3Dmol.Mesh(e, d);
        d.doubleSided = !0;
        return d;
      };
    this.addMesh = function (b) {
      b = { geo: b.geometry, mat: b.material, done: !0, finished: !1 };
      var c = W();
      G[c] = b;
      return c;
    };
    var Ha = function (b) {
      var c = [];
      $.each(b, function (b, d) {
        c[b] = $.extend({}, d);
      });
      return c;
    };
    this.addSurface = function (b, c, f, h, g) {
      var m = null,
        q = null;
      f = Ha(d(f));
      var m = h ? Ha(d(h)) : f,
        s = !1;
      for (h = 0; h < e.length; h++)
        if (e[h]) {
          var w = e[h].getSymmetries();
          if (1 < w.length || (1 == w.length && !w[0].isIdentity())) {
            s = !0;
            break;
          }
        }
      var u = function (f, e, h) {
        q = g ? Ha(d(g)) : h;
        var m,
          s = $3Dmol.getExtent(h, !0),
          w,
          u;
        c.map &&
          c.map.prop &&
          ((w = c.map.prop),
          (u = c.map.scheme || c.map.gradient || new $3Dmol.Gradient.RWB()),
          (m = u.range()) || (m = $3Dmol.getPropertyRange(h, w)),
          (c.colorscheme = { prop: w, gradient: u }));
        w = 0;
        for (u = e.length; w < u; w++)
          (m = e[w]), (m.surfaceColor = $3Dmol.getColorFromStyle(m, c));
        var x = Pa(s),
          t = ab(s, e, h);
        if (q && q.length && 0 < q.length) {
          var z = $3Dmol.getExtent(q, !0);
          t.sort(function (b, c) {
            var d = function (b, c) {
                var d = b.extent,
                  f = d[1][1] - d[0][1],
                  e = d[1][2] - d[0][2],
                  d = d[1][0] - d[0][0] - c[2][0],
                  f = f - c[2][1],
                  e = e - c[2][2];
                return d * d + f * f + e * e;
              },
              f = d(b, z),
              d = d(c, z);
            return f - d;
          });
        }
        var y = [];
        w = 0;
        for (u = e.length; w < u; w++)
          (m = e[w]),
            (y[w] = { x: m.x, y: m.y, z: m.z, serial: w, elem: m.elem });
        if ($3Dmol.syncSurface)
          setTimeout(
            function Ya(c) {
              if (!(c >= t.length)) {
                var d;
                d = b;
                var h = t[c].extent,
                  g = t[c].atoms,
                  m = t[c].toshow,
                  q = new $3Dmol.ProteinSurface();
                q.initparm(h, 1 === d ? !1 : !0, x);
                q.fillvoxels(y, g);
                q.buildboundary();
                d == $3Dmol.SurfaceType.SES &&
                  (q.fastdistancemap(),
                  q.boundingatom(!1),
                  q.fillvoxelswaals(y, g));
                q.marchingcube(d);
                d = q.getFacesAndVertices(m);
                d = Ba(e, d, p);
                $3Dmol.mergeGeos(f.geo, d);
                l.render();
                setTimeout(Ya, 1, c + 1);
              }
            },
            1,
            0
          );
        else {
          h = [];
          0 > b && (b = 0);
          w = 0;
          for (u = 4; w < u; w++)
            (s = new Worker($3Dmol.SurfaceWorker)),
              h.push(s),
              s.postMessage({ type: -1, atoms: y, volume: x });
          var B = 0,
            s = function (b) {
              b = $3Dmol.splitMesh({
                vertexArr: b.data.vertices,
                faceArr: b.data.faces,
              });
              for (var c = 0, d = b.length; c < d; c++) {
                var h = Ba(
                  e,
                  { vertices: b[c].vertexArr, faces: b[c].faceArr },
                  p
                );
                $3Dmol.mergeGeos(f.geo, h);
                l.render();
              }
              B++;
              B == t.length && (f.done = !0);
            };
          u = function (b) {
            console.log(b.message + " (" + b.filename + ":" + b.lineno + ")");
          };
          for (w = 0; w < t.length; w++)
            (m = h[w % h.length]),
              (m.onmessage = s),
              (m.onerror = u),
              m.postMessage({
                type: b,
                expandedExtent: t[w].extent,
                extendedAtoms: t[w].atoms,
                atomsToShow: t[w].toshow,
              });
        }
      };
      c = c || {};
      var p = t(c),
        w = [];
      if (s) {
        var s = {},
          x = {};
        for (h = 0; h < e.length; h++) (s[h] = []), (x[h] = []);
        for (h = 0; h < m.length; h++) s[m[h].model].push(m[h]);
        for (h = 0; h < f.length; h++) x[f[h].model].push(f[h]);
        for (h = 0; h < e.length; h++)
          w.push({
            geo: new $3Dmol.Geometry(!0),
            mat: p,
            done: !1,
            finished: !1,
            symmetries: e[h].getSymmetries(),
          }),
            u(w[h], s[h], x[h]);
      } else
        w.push({
          geo: new $3Dmol.Geometry(!0),
          mat: p,
          done: !1,
          finished: !1,
          symmetries: [new $3Dmol.Matrix4()],
        }),
          u(w[w.length - 1], m, f);
      m = W();
      G[m] = w;
      return m;
    };
    this.setSurfaceMaterialStyle = function (b, c) {
      if (G[b]) {
        surfArr = G[b];
        for (var d = 0; d < surfArr.length; d++)
          (surfArr[d].mat = t(c)),
            (surfArr[d].mat.side = $3Dmol.FrontSide),
            (surfArr[d].finished = !1);
      }
      return this;
    };
    this.removeSurface = function (b) {
      for (var c = G[b], d = 0; d < c.length; d++)
        c[d] &&
          c[d].lastGL &&
          (void 0 !== c[d].geo && c[d].geo.dispose(),
          void 0 !== c[d].mat && c[d].mat.dispose(),
          M.remove(c[d].lastGL));
      delete G[b];
      X();
      return this;
    };
    this.removeAllSurfaces = function () {
      for (n in G)
        if (G.hasOwnProperty(n)) {
          for (var b = G[n], c = 0; c < b.length; c++)
            b[c] &&
              b[c].lastGL &&
              (void 0 !== b[c].geo && b[c].geo.dispose(),
              void 0 !== b[c].mat && b[c].mat.dispose(),
              M.remove(b[c].lastGL));
          delete G[n];
        }
      X();
      return this;
    };
    this.jmolMoveTo = function () {
      var b = M.position,
        b = "center { " + -b.x + " " + -b.y + " " + -b.z + " }; ",
        c = H.quaternion;
      return (b +=
        "moveto .5 quaternion { " +
        c.x +
        " " +
        c.y +
        " " +
        c.z +
        " " +
        c.w +
        " };");
    };
    this.clear = function () {
      this.removeAllSurfaces();
      this.removeAllModels();
      this.removeAllLabels();
      this.removeAllShapes();
      X();
      return this;
    };
    this.mapAtomProperties = function (b, c) {
      c = c || {};
      var f = d(c);
      if ("function" == typeof b)
        for (var l = 0, h = f.length; l < h; l++) {
          var g = f[l];
          b(g);
        }
      else
        for (l = 0, h = f.length; l < h; l++)
          for (var g = f[l], m = 0, q = b.length; m < q; m++) {
            var w = b[m];
            if (w.props)
              for (var s in w.props)
                if (w.props.hasOwnProperty(s)) {
                  var u;
                  a: {
                    u = g;
                    var p = w;
                    "undefined" === typeof p && (p = {});
                    var x = [],
                      t = void 0;
                    if ("undefined" === typeof p.model)
                      for (t = 0; t < e.length; t++) e[t] && x.push(e[t]);
                    else (x = p.model), $.isArray(x) || (x = [x]);
                    for (t = 0; t < x.length; t++)
                      if (x[t].atomIsSelected(u, p)) {
                        u = !0;
                        break a;
                      }
                    u = !1;
                  }
                  u &&
                    (g.properties || (g.properties = {}),
                    (g.properties[s] = w.props[s]));
                }
          }
      return this;
    };
    this.linkViewer = function (b) {
      I.push(b);
      return this;
    };
    try {
      "function" === typeof A && A(this);
    } catch (Qa) {
      console.log("error with glviewer callback: " + Qa);
    }
  };
})();
$3Dmol.glmolViewer = $3Dmol.GLViewer;
$3Dmol = $3Dmol || {};
$3Dmol.Gradient = function (b, c) {};
$3Dmol.Gradient.valueToHex = function (b, c) {};
$3Dmol.Gradient.range = function () {};
$3Dmol.Gradient.RWB = function (b, c, d) {
  var p = 1;
  "undefined" == typeof c &&
    $.isArray(b) &&
    2 <= b.length &&
    ((c = b[1]), (b = b[0]));
  c < b && ((p = -1), (b *= -1), (c *= -1));
  this.valueToHex = function (t, A) {
    var y, z;
    t *= p;
    A ? ((y = A[0]), (z = A[1])) : ((y = b), (z = c));
    if (void 0 === t) return 16777215;
    t < y && (t = y);
    t > z && (t = z);
    var f = (z + y) / 2;
    "undefined" != typeof d && (f = d);
    t <= f
      ? ((y = Math.floor(255 * Math.sqrt((t - y) / (f - y)))),
        (y = 16711680 + 256 * y + y))
      : ((y = Math.floor(255 * Math.sqrt(1 - (t - f) / (z - f)))),
        (y = 65536 * y + 256 * y + 255));
    return y;
  };
  this.range = function () {
    return "undefined" != typeof b && "undefined" != typeof c ? [b, c] : null;
  };
};
$3Dmol.Gradient.ROYGB = function (b, c) {
  var d = 1;
  "undefined" == typeof c &&
    $.isArray(b) &&
    2 <= b.length &&
    ((c = b[1]), (b = b[0]));
  c < b && ((d = -1), (b *= -1), (c *= -1));
  this.valueToHex = function (p, t) {
    var A, y;
    p *= d;
    t ? ((A = t[0]), (y = t[1])) : ((A = b), (y = c));
    if ("undefined" == typeof p) return 16777215;
    p < A && (p = A);
    p > y && (p = y);
    var z = (A + y) / 2,
      f = (A + z) / 2,
      h = (z + y) / 2;
    p < f
      ? ((A = Math.floor(255 * Math.sqrt((p - A) / (f - A)))),
        (A = 256 * A + 16711680))
      : p < z
      ? ((A = Math.floor(255 * Math.sqrt(1 - (p - f) / (z - f)))),
        (A = 65536 * A + 65280))
      : p < h
      ? ((A = Math.floor(255 * Math.sqrt((p - z) / (h - z)))),
        (A = 65280 + 1 * A))
      : ((A = Math.floor(255 * Math.sqrt(1 - (p - h) / (y - h)))),
        (A = 256 * A + 255));
    return A;
  };
  this.range = function () {
    return "undefined" != typeof b && "undefined" != typeof c ? [b, c] : null;
  };
};
$3Dmol.Gradient.Sinebow = function (b, c) {
  var d = 1;
  "undefined" == typeof c &&
    $.isArray(b) &&
    2 <= b.length &&
    ((c = b[1]), (b = b[0]));
  c < b && ((d = -1), (b *= -1), (c *= -1));
  this.valueToHex = function (p, t) {
    var A, y;
    p *= d;
    t ? ((A = t[0]), (y = t[1])) : ((A = b), (y = c));
    if ("undefined" == typeof p) return 16777215;
    p < A && (p = A);
    p > y && (p = y);
    var z = (((p - A) / (y - A)) * 5) / 6 + 0.5;
    A = Math.sin(Math.PI * z);
    A *= 255 * A;
    y = Math.sin(Math.PI * (z + 1 / 3));
    y *= 255 * y;
    z = Math.sin(Math.PI * (z + 2 / 3));
    return (
      65536 * Math.floor(A) + 256 * Math.floor(255 * z * z) + 1 * Math.floor(y)
    );
  };
  this.range = function () {
    return "undefined" != typeof b && "undefined" != typeof c ? [b, c] : null;
  };
};
$3Dmol.LabelCount = 0;
$3Dmol.Label = function (b, c) {
  this.id = $3Dmol.LabelCount++;
  this.stylespec = c || {};
  this.canvas = document.createElement("canvas");
  this.canvas.width = 134;
  this.canvas.height = 35;
  this.context = this.canvas.getContext("2d");
  this.sprite = new $3Dmol.Sprite();
  this.text = b;
};
$3Dmol.Label.prototype = {
  constructor: $3Dmol.Label,
  getStyle: function () {
    return this.stylespec;
  },
  setContext: (function () {
    var b = function (b, d, p) {
      "undefined" != typeof b &&
        (p =
          b instanceof $3Dmol.Color ? b.scaled() : $3Dmol.CC.color(b).scaled());
      "undefined" != typeof d && (p.a = parseFloat(d));
      return p;
    };
    return function () {
      var c = this.stylespec,
        d = "undefined" == typeof c.useScreen ? !1 : c.useScreen,
        p = c.showBackground;
      if ("0" === p || "false" === p) p = !1;
      "undefined" == typeof p && (p = !0);
      var t = c.font ? c.font : "sans-serif",
        A = parseInt(c.fontSize) ? parseInt(c.fontSize) : 18,
        y = b(c.fontColor, c.fontOpacity, { r: 255, g: 255, b: 255, a: 1 }),
        z = c.padding ? c.padding : 4,
        f = c.borderThickness ? c.borderThickness : 0,
        h = b(c.backgroundColor, c.backgroundOpacity, {
          r: 0,
          g: 0,
          b: 0,
          a: 1,
        }),
        l = b(c.borderColor, c.borderOpacity, h),
        m = c.position ? c.position : { x: -10, y: 1, z: 1 },
        w = void 0 !== c.inFront ? c.inFront : !0;
      if ("false" === w || "0" === w) w = !1;
      var e = c.alignment || $3Dmol.SpriteAlignment.topLeft,
        G = "";
      c.bold && (G = "bold ");
      this.context.font = G + A + "px  " + t;
      var g = this.context.measureText(this.text).width;
      p || (f = 0);
      var s = g + 2.5 * f + 2 * z,
        u = 1.25 * A + 2 * f + 2 * z;
      if (c.backgroundImage) {
        var G = c.backgroundImage,
          x = c.backgroundWidth ? c.backgroundWidth : G.width,
          q = c.backgroundHeight ? c.backgroundHeight : G.height;
        x > s && (s = x);
        q > u && (u = q);
      }
      this.canvas.width = s;
      this.canvas.height = u;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      G = "";
      c.bold && (G = "bold ");
      this.context.font = G + A + "px  " + t;
      this.context.fillStyle =
        "rgba(" + h.r + "," + h.g + "," + h.b + "," + h.a + ")";
      this.context.strokeStyle =
        "rgba(" + l.r + "," + l.g + "," + l.b + "," + l.a + ")";
      this.context.lineWidth = f;
      p &&
        ((p = this.context),
        (h = t = f),
        (s -= 2 * f),
        (u -= 2 * f),
        (l = 0 < f),
        p.beginPath(),
        p.moveTo(t + 6, h),
        p.lineTo(t + s - 6, h),
        p.quadraticCurveTo(t + s, h, t + s, h + 6),
        p.lineTo(t + s, h + u - 6),
        p.quadraticCurveTo(t + s, h + u, t + s - 6, h + u),
        p.lineTo(t + 6, h + u),
        p.quadraticCurveTo(t, h + u, t, h + u - 6),
        p.lineTo(t, h + 6),
        p.quadraticCurveTo(t, h, t + 6, h),
        p.closePath(),
        p.fill(),
        l && p.stroke());
      c.backgroundImage &&
        ((G = c.backgroundImage),
        (x = c.backgroundWidth ? c.backgroundWidth : G.width),
        (q = c.backgroundHeight ? c.backgroundHeight : G.height),
        this.context.drawImage(G, 0, 0, x, q));
      this.context.fillStyle =
        "rgba(" + y.r + "," + y.g + "," + y.b + "," + y.a + ")";
      this.context.fillText(this.text, f + z, A + f + z, g);
      c = new $3Dmol.Texture(this.canvas);
      c.needsUpdate = !0;
      this.sprite.material = new $3Dmol.SpriteMaterial({
        map: c,
        useScreenCoordinates: d,
        alignment: e,
        depthTest: !w,
      });
      this.sprite.scale.set(1, 1, 1);
      this.sprite.position.set(m.x, m.y, m.z);
    };
  })(),
  dispose: function () {
    void 0 !== this.sprite.material.map && this.sprite.material.map.dispose();
    void 0 !== this.sprite.material && this.sprite.material.dispose();
  },
};
$3Dmol = $3Dmol || {};
$3Dmol.MarchingCubeInitializer = function () {
  var b = {
      march: function (b, y, z, f) {
        var h = !!f.fulltable,
          l =
            f.hasOwnProperty("origin") && f.origin.hasOwnProperty("x")
              ? f.origin
              : { x: 0, y: 0, z: 0 },
          m = !!f.voxel,
          w = f.matrix,
          e = f.nX || 0,
          G = f.nY || 0,
          g = f.nZ || 0,
          s = f.scale || 1,
          u = null,
          u = f.unitCube ? f.unitCube : { x: s, y: s, z: s },
          x = new Int32Array(e * G * g);
        f = 0;
        for (s = x.length; f < s; ++f) x[f] = -1;
        var s = function (b, c, d, f, e, h) {
            var q = { x: 0, y: 0, z: 0 },
              s = e;
            f & (1 << e) || !(f & (1 << h)) || (s = h);
            s & 1 && d++;
            s & 2 && c++;
            s & 4 && b++;
            w
              ? ((q = new $3Dmol.Vector3(b, c, d)),
                (q = q.applyMatrix4(w)),
                (q = { x: q.x, y: q.y, z: q.z }))
              : ((q.x = l.x + u.x * b),
                (q.y = l.y + u.y * c),
                (q.z = l.z + u.z * d));
            b = (G * b + c) * g + d;
            if (m) return y.push(q), y.length - 1;
            0 > x[b] && ((x[b] = y.length), y.push(q));
            return x[b];
          },
          q = new Int32Array(12),
          N = h ? p : c,
          h = h ? t : d;
        for (f = 0; f < e - 1; ++f)
          for (var I = 0; I < G - 1; ++I)
            for (var D = 0; D < g - 1; ++D) {
              for (var C = 0, B = 0; 8 > B; ++B)
                C |=
                  !!(
                    b[
                      (G * (f + ((B & 4) >> 2)) + I + ((B & 2) >> 1)) * g +
                        D +
                        (B & 1)
                    ] & 2
                  ) << B;
              if (0 !== C && 255 !== C) {
                var F = N[C];
                if (0 !== F)
                  for (
                    B = h[C],
                      F & 1 && (q[0] = s(f, I, D, C, 0, 1)),
                      F & 2 && (q[1] = s(f, I, D, C, 1, 3)),
                      F & 4 && (q[2] = s(f, I, D, C, 3, 2)),
                      F & 8 && (q[3] = s(f, I, D, C, 2, 0)),
                      F & 16 && (q[4] = s(f, I, D, C, 4, 5)),
                      F & 32 && (q[5] = s(f, I, D, C, 5, 7)),
                      F & 64 && (q[6] = s(f, I, D, C, 7, 6)),
                      F & 128 && (q[7] = s(f, I, D, C, 6, 4)),
                      F & 256 && (q[8] = s(f, I, D, C, 0, 4)),
                      F & 512 && (q[9] = s(f, I, D, C, 1, 5)),
                      F & 1024 && (q[10] = s(f, I, D, C, 3, 7)),
                      F & 2048 && (q[11] = s(f, I, D, C, 2, 6)),
                      C = 0;
                    C < B.length;
                    C += 3
                  ) {
                    var F = q[B[C]],
                      J = q[B[C + 1]],
                      L = q[B[C + 2]];
                    m &&
                      3 <= C &&
                      (y.push(y[F]),
                      (F = y.length - 1),
                      y.push(y[J]),
                      (J = y.length - 1),
                      y.push(y[L]),
                      (L = y.length - 1));
                    z.push(F);
                    z.push(J);
                    z.push(L);
                  }
              }
            }
      },
      laplacianSmooth: function (b, c, d) {
        var f = Array(c.length),
          h,
          l,
          m,
          w;
        h = 0;
        for (l = c.length; h < l; h++) f[h] = { x: 0, y: 0, z: 0 };
        var e = Array(20),
          p;
        for (h = 0; 20 > h; h++) e[h] = Array(c.length);
        h = 0;
        for (l = c.length; h < l; h++) e[0][h] = 0;
        h = 0;
        for (l = d.length / 3; h < l; h++) {
          var g = 3 * h,
            s = 3 * h + 1,
            u = 3 * h + 2;
          p = !0;
          m = 0;
          for (w = e[0][d[g]]; m < w; m++)
            if (d[s] == e[m + 1][d[g]]) {
              p = !1;
              break;
            }
          p && (e[0][d[g]]++, (e[e[0][d[g]]][d[g]] = d[s]));
          p = !0;
          m = 0;
          for (w = e[0][d[g]]; m < w; m++)
            if (d[u] == e[m + 1][d[g]]) {
              p = !1;
              break;
            }
          p && (e[0][d[g]]++, (e[e[0][d[g]]][d[g]] = d[u]));
          p = !0;
          m = 0;
          for (w = e[0][d[s]]; m < w; m++)
            if (d[g] == e[m + 1][d[s]]) {
              p = !1;
              break;
            }
          p && (e[0][d[s]]++, (e[e[0][d[s]]][d[s]] = d[g]));
          p = !0;
          m = 0;
          for (w = e[0][d[s]]; m < w; m++)
            if (d[u] == e[m + 1][d[s]]) {
              p = !1;
              break;
            }
          p && (e[0][d[s]]++, (e[e[0][d[s]]][d[s]] = d[u]));
          p = !0;
          for (m = 0; m < e[0][d[u]]; m++)
            if (d[g] == e[m + 1][d[u]]) {
              p = !1;
              break;
            }
          p && (e[0][d[u]]++, (e[e[0][d[u]]][d[u]] = d[g]));
          p = !0;
          m = 0;
          for (w = e[0][d[u]]; m < w; m++)
            if (d[s] == e[m + 1][d[u]]) {
              p = !1;
              break;
            }
          p && (e[0][d[u]]++, (e[e[0][d[u]]][d[u]] = d[s]));
        }
        for (d = 0; d < b; d++) {
          h = 0;
          for (l = c.length; h < l; h++)
            if (3 > e[0][h])
              (f[h].x = c[h].x), (f[h].y = c[h].y), (f[h].z = c[h].z);
            else if (3 == e[0][h] || 4 == e[0][h]) {
              f[h].x = 0;
              f[h].y = 0;
              m = f[h].z = 0;
              for (w = e[0][h]; m < w; m++)
                (f[h].x += c[e[m + 1][h]].x),
                  (f[h].y += c[e[m + 1][h]].y),
                  (f[h].z += c[e[m + 1][h]].z);
              f[h].x += 0.5 * c[h].x;
              f[h].y += 0.5 * c[h].y;
              f[h].z += 0.5 * c[h].z;
              f[h].x /= 0.5 + e[0][h];
              f[h].y /= 0.5 + e[0][h];
              f[h].z /= 0.5 + e[0][h];
            } else {
              f[h].x = 0;
              f[h].y = 0;
              m = f[h].z = 0;
              for (w = e[0][h]; m < w; m++)
                (f[h].x += c[e[m + 1][h]].x),
                  (f[h].y += c[e[m + 1][h]].y),
                  (f[h].z += c[e[m + 1][h]].z);
              f[h].x += 1 * c[h].x;
              f[h].y += 1 * c[h].y;
              f[h].z += 1 * c[h].z;
              f[h].x /= 1 + e[0][h];
              f[h].y /= 1 + e[0][h];
              f[h].z /= 1 + e[0][h];
            }
          h = 0;
          for (l = c.length; h < l; h++)
            (c[h].x = f[h].x), (c[h].y = f[h].y), (c[h].z = f[h].z);
        }
      },
      edgeTable: [
        0, 0, 0, 0, 0, 0, 0, 2816, 0, 0, 0, 1792, 0, 3328, 3584, 3840, 0, 0, 0,
        138, 0, 21, 0, 134, 0, 0, 0, 652, 0, 2067, 3865, 3600, 0, 0, 0, 42, 0,
        0, 0, 294, 0, 0, 21, 28, 0, 3875, 1049, 3360, 0, 168, 162, 170, 0, 645,
        2475, 2210, 0, 687, 293, 172, 4010, 3747, 3497, 3232, 0, 0, 0, 0, 0, 69,
        0, 900, 0, 0, 0, 1792, 138, 131, 1608, 1920, 0, 81, 0, 2074, 84, 85, 84,
        86, 0, 81, 0, 3676, 330, 1105, 1881, 1616, 0, 0, 0, 42, 0, 69, 0, 502,
        0, 0, 21, 3580, 138, 2035, 1273, 1520, 2816, 104, 2337, 106, 840, 581,
        367, 102, 2816, 3695, 3429, 3180, 1898, 1635, 1385, 1120, 0, 0, 0, 0, 0,
        0, 0, 3910, 0, 0, 69, 588, 42, 2083, 41, 2880, 0, 0, 0, 1722, 0, 2293,
        4095, 3830, 0, 255, 757, 764, 2538, 2291, 3065, 2800, 0, 0, 81, 338, 0,
        3925, 1119, 3414, 84, 855, 85, 340, 2130, 2899, 89, 2384, 1792, 712,
        194, 1162, 4036, 3781, 3535, 3270, 708, 719, 197, 204, 3018, 2755, 2505,
        2240, 0, 0, 0, 0, 168, 420, 168, 1958, 162, 162, 676, 2988, 170, 163,
        680, 928, 3328, 3096, 3328, 3642, 52, 53, 1855, 1590, 2340, 2111, 2869,
        2620, 298, 51, 825, 560, 3584, 3584, 3090, 3482, 1668, 1941, 1183, 1430,
        146, 2975, 2069, 2460, 154, 915, 153, 400, 3840, 3592, 3329, 3082, 1796,
        1541, 1295, 1030, 2818, 2575, 2309, 2060, 778, 515, 265, 0,
      ],
    },
    c = new Uint32Array(b.edgeTable),
    d = (b.triTable = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [11, 9, 8],
      [],
      [],
      [],
      [8, 10, 9],
      [],
      [10, 8, 11],
      [9, 11, 10],
      [8, 10, 9, 8, 11, 10],
      [],
      [],
      [],
      [1, 7, 3],
      [],
      [4, 2, 0],
      [],
      [2, 1, 7],
      [],
      [],
      [],
      [2, 7, 3, 2, 9, 7],
      [],
      [1, 4, 11, 1, 0, 4],
      [3, 8, 0, 11, 9, 4, 11, 10, 9],
      [4, 11, 9, 11, 10, 9],
      [],
      [],
      [],
      [5, 3, 1],
      [],
      [],
      [],
      [2, 5, 8, 2, 1, 5],
      [],
      [],
      [2, 4, 0],
      [3, 2, 4],
      [],
      [0, 9, 1, 8, 10, 5, 8, 11, 10],
      [3, 4, 0, 3, 10, 4],
      [5, 8, 10, 8, 11, 10],
      [],
      [3, 5, 7],
      [7, 1, 5],
      [1, 7, 3, 1, 5, 7],
      [],
      [9, 2, 0, 9, 7, 2],
      [0, 3, 8, 1, 7, 11, 1, 5, 7],
      [11, 1, 7, 1, 5, 7],
      [],
      [9, 1, 0, 5, 3, 2, 5, 7, 3],
      [8, 2, 5, 8, 0, 2],
      [2, 5, 3, 5, 7, 3],
      [3, 9, 1, 3, 8, 9, 7, 11, 10, 7, 10, 5],
      [9, 1, 0, 10, 7, 11, 10, 5, 7],
      [3, 8, 0, 7, 10, 5, 7, 11, 10],
      [11, 5, 7, 11, 10, 5],
      [],
      [],
      [],
      [],
      [],
      [0, 6, 2],
      [],
      [7, 2, 9, 7, 9, 8],
      [],
      [],
      [],
      [8, 10, 9],
      [7, 1, 3],
      [7, 1, 0],
      [6, 9, 3, 6, 10, 9],
      [7, 10, 8, 10, 9, 8],
      [],
      [6, 0, 4],
      [],
      [11, 1, 4, 11, 3, 1],
      [2, 4, 6],
      [2, 0, 4, 2, 4, 6],
      [2, 4, 6],
      [1, 4, 2, 4, 6, 2],
      [],
      [6, 0, 4],
      [],
      [2, 11, 3, 6, 9, 4, 6, 10, 9],
      [8, 6, 1, 8, 1, 3],
      [10, 0, 6, 0, 4, 6],
      [8, 0, 3, 9, 6, 10, 9, 4, 6],
      [10, 4, 6, 10, 9, 4],
      [],
      [],
      [],
      [5, 3, 1],
      [],
      [0, 6, 2],
      [],
      [7, 4, 8, 5, 2, 1, 5, 6, 2],
      [],
      [],
      [2, 4, 0],
      [7, 4, 8, 2, 11, 3, 10, 5, 6],
      [7, 1, 3],
      [5, 6, 10, 0, 9, 1, 8, 7, 4],
      [5, 6, 10, 7, 0, 3, 7, 4, 0],
      [10, 5, 6, 4, 8, 7],
      [9, 11, 8],
      [3, 5, 6],
      [0, 5, 11, 0, 11, 8],
      [6, 3, 5, 3, 1, 5],
      [3, 9, 6, 3, 8, 9],
      [9, 6, 0, 6, 2, 0],
      [0, 3, 8, 2, 5, 6, 2, 1, 5],
      [1, 6, 2, 1, 5, 6],
      [9, 11, 8],
      [1, 0, 9, 6, 10, 5, 11, 3, 2],
      [6, 10, 5, 2, 8, 0, 2, 11, 8],
      [3, 2, 11, 10, 5, 6],
      [10, 5, 6, 9, 3, 8, 9, 1, 3],
      [0, 9, 1, 5, 6, 10],
      [8, 0, 3, 10, 5, 6],
      [10, 5, 6],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [1, 10, 2, 9, 11, 6, 9, 8, 11],
      [],
      [],
      [6, 0, 2],
      [3, 6, 9, 3, 2, 6],
      [3, 5, 1],
      [0, 5, 1, 0, 11, 5],
      [0, 3, 5],
      [6, 9, 11, 9, 8, 11],
      [],
      [],
      [],
      [4, 5, 9, 7, 1, 10, 7, 3, 1],
      [],
      [11, 6, 7, 2, 4, 5, 2, 0, 4],
      [11, 6, 7, 8, 0, 3, 1, 10, 2, 9, 4, 5],
      [6, 7, 11, 1, 10, 2, 9, 4, 5],
      [],
      [4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2],
      [9, 4, 5, 0, 6, 7, 0, 2, 6],
      [4, 5, 9, 6, 3, 2, 6, 7, 3],
      [6, 7, 11, 5, 3, 8, 5, 1, 3],
      [6, 7, 11, 4, 1, 0, 4, 5, 1],
      [4, 5, 9, 3, 8, 0, 11, 6, 7],
      [9, 4, 5, 7, 11, 6],
      [],
      [],
      [0, 6, 4],
      [8, 6, 4, 8, 1, 6],
      [],
      [0, 10, 2, 0, 9, 10, 4, 8, 11, 4, 11, 6],
      [10, 2, 1, 6, 0, 3, 6, 4, 0],
      [10, 2, 1, 11, 4, 8, 11, 6, 4],
      [4, 2, 6],
      [1, 0, 9, 2, 4, 8, 2, 6, 4],
      [2, 4, 0, 2, 6, 4],
      [8, 2, 4, 2, 6, 4],
      [11, 4, 1, 11, 6, 4],
      [0, 9, 1, 4, 11, 6, 4, 8, 11],
      [3, 6, 0, 6, 4, 0],
      [8, 6, 4, 8, 11, 6],
      [10, 8, 9],
      [6, 3, 9, 6, 7, 3],
      [6, 7, 1],
      [10, 7, 1, 7, 3, 1],
      [7, 11, 6, 8, 10, 2, 8, 9, 10],
      [11, 6, 7, 10, 0, 9, 10, 2, 0],
      [2, 1, 10, 7, 11, 6, 8, 0, 3],
      [1, 10, 2, 6, 7, 11],
      [7, 2, 6, 7, 9, 2],
      [1, 0, 9, 3, 6, 7, 3, 2, 6],
      [7, 0, 6, 0, 2, 6],
      [2, 7, 3, 2, 6, 7],
      [7, 11, 6, 3, 9, 1, 3, 8, 9],
      [9, 1, 0, 11, 6, 7],
      [0, 3, 8, 11, 6, 7],
      [11, 6, 7],
      [],
      [],
      [],
      [],
      [5, 3, 7],
      [8, 5, 2, 8, 7, 5],
      [5, 3, 7],
      [1, 10, 2, 5, 8, 7, 5, 9, 8],
      [1, 7, 5],
      [1, 7, 5],
      [9, 2, 7, 9, 7, 5],
      [11, 3, 2, 8, 5, 9, 8, 7, 5],
      [1, 3, 7, 1, 7, 5],
      [0, 7, 1, 7, 5, 1],
      [9, 3, 5, 3, 7, 5],
      [9, 7, 5, 9, 8, 7],
      [8, 10, 11],
      [3, 4, 10, 3, 10, 11],
      [8, 10, 11],
      [5, 9, 4, 1, 11, 3, 1, 10, 11],
      [2, 4, 5],
      [5, 2, 4, 2, 0, 4],
      [0, 3, 8, 5, 9, 4, 10, 2, 1],
      [2, 1, 10, 9, 4, 5],
      [2, 8, 5, 2, 11, 8],
      [3, 2, 11, 1, 4, 5, 1, 0, 4],
      [9, 4, 5, 8, 2, 11, 8, 0, 2],
      [11, 3, 2, 9, 4, 5],
      [8, 5, 3, 5, 1, 3],
      [5, 0, 4, 5, 1, 0],
      [3, 8, 0, 4, 5, 9],
      [9, 4, 5],
      [11, 9, 10],
      [11, 9, 10],
      [1, 11, 4, 1, 10, 11],
      [8, 7, 4, 11, 1, 10, 11, 3, 1],
      [2, 7, 9, 2, 9, 10],
      [4, 8, 7, 0, 10, 2, 0, 9, 10],
      [2, 1, 10, 0, 7, 4, 0, 3, 7],
      [10, 2, 1, 8, 7, 4],
      [1, 7, 4],
      [3, 2, 11, 4, 8, 7, 9, 1, 0],
      [11, 4, 2, 4, 0, 2],
      [2, 11, 3, 7, 4, 8],
      [4, 1, 7, 1, 3, 7],
      [1, 0, 9, 8, 7, 4],
      [3, 4, 0, 3, 7, 4],
      [8, 7, 4],
      [8, 9, 10, 8, 10, 11],
      [3, 9, 11, 9, 10, 11],
      [0, 10, 8, 10, 11, 8],
      [10, 3, 1, 10, 11, 3],
      [2, 8, 10, 8, 9, 10],
      [9, 2, 0, 9, 10, 2],
      [8, 0, 3, 1, 10, 2],
      [10, 2, 1],
      [1, 11, 9, 11, 8, 9],
      [11, 3, 2, 0, 9, 1],
      [11, 0, 2, 11, 8, 0],
      [11, 3, 2],
      [8, 1, 3, 8, 9, 1],
      [9, 1, 0],
      [8, 0, 3],
      [],
    ]),
    p = [
      0, 265, 515, 778, 2060, 2309, 2575, 2822, 1030, 1295, 1541, 1804, 3082,
      3331, 3593, 3840, 400, 153, 915, 666, 2460, 2197, 2975, 2710, 1430, 1183,
      1941, 1692, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 2620, 2869, 2111,
      2358, 1590, 1855, 1077, 1340, 3642, 3891, 3129, 3376, 928, 681, 419, 170,
      2988, 2725, 2479, 2214, 1958, 1711, 1445, 1196, 4010, 3747, 3497, 3232,
      2240, 2505, 2755, 3018, 204, 453, 719, 966, 3270, 3535, 3781, 4044, 1226,
      1475, 1737, 1984, 2384, 2137, 2899, 2650, 348, 85, 863, 598, 3414, 3167,
      3925, 3676, 1370, 1107, 1881, 1616, 2800, 3065, 2291, 2554, 764, 1013,
      255, 502, 3830, 4095, 3317, 3580, 1786, 2035, 1273, 1520, 2912, 2665,
      2403, 2154, 876, 613, 367, 102, 3942, 3695, 3429, 3180, 1898, 1635, 1385,
      1120, 1120, 1385, 1635, 1898, 3180, 3429, 3695, 3942, 102, 367, 613, 876,
      2154, 2403, 2665, 2912, 1520, 1273, 2035, 1786, 3580, 3317, 4095, 3830,
      502, 255, 1013, 764, 2554, 2291, 3065, 2800, 1616, 1881, 1107, 1370, 3676,
      3925, 3167, 3414, 598, 863, 85, 348, 2650, 2899, 2137, 2384, 1984, 1737,
      1475, 1226, 4044, 3781, 3535, 3270, 966, 719, 453, 204, 3018, 2755, 2505,
      2240, 3232, 3497, 3747, 4010, 1196, 1445, 1711, 1958, 2214, 2479, 2725,
      2988, 170, 419, 681, 928, 3376, 3129, 3891, 3642, 1340, 1077, 1855, 1590,
      2358, 2111, 2869, 2620, 314, 51, 825, 560, 3728, 3993, 3219, 3482, 1692,
      1941, 1183, 1430, 2710, 2975, 2197, 2460, 666, 915, 153, 400, 3840, 3593,
      3331, 3082, 1804, 1541, 1295, 1030, 2822, 2575, 2309, 2060, 778, 515, 265,
      0,
    ],
    t = [
      [],
      [8, 3, 0],
      [9, 0, 1],
      [8, 3, 1, 8, 1, 9],
      [11, 2, 3],
      [11, 2, 0, 11, 0, 8],
      [11, 2, 3, 0, 1, 9],
      [2, 1, 11, 1, 9, 11, 11, 9, 8],
      [10, 1, 2],
      [8, 3, 0, 1, 2, 10],
      [9, 0, 2, 9, 2, 10],
      [3, 2, 8, 2, 10, 8, 8, 10, 9],
      [10, 1, 3, 10, 3, 11],
      [1, 0, 10, 0, 8, 10, 10, 8, 11],
      [0, 3, 9, 3, 11, 9, 9, 11, 10],
      [8, 10, 9, 8, 11, 10],
      [8, 4, 7],
      [3, 0, 4, 3, 4, 7],
      [1, 9, 0, 8, 4, 7],
      [9, 4, 1, 4, 7, 1, 1, 7, 3],
      [2, 3, 11, 7, 8, 4],
      [7, 11, 4, 11, 2, 4, 4, 2, 0],
      [3, 11, 2, 4, 7, 8, 9, 0, 1],
      [2, 7, 11, 2, 1, 7, 1, 4, 7, 1, 9, 4],
      [10, 1, 2, 8, 4, 7],
      [2, 10, 1, 0, 4, 7, 0, 7, 3],
      [4, 7, 8, 0, 2, 10, 0, 10, 9],
      [2, 7, 3, 2, 9, 7, 7, 9, 4, 2, 10, 9],
      [8, 4, 7, 11, 10, 1, 11, 1, 3],
      [11, 4, 7, 1, 4, 11, 1, 11, 10, 1, 0, 4],
      [3, 8, 0, 7, 11, 4, 11, 9, 4, 11, 10, 9],
      [7, 11, 4, 4, 11, 9, 11, 10, 9],
      [9, 5, 4],
      [3, 0, 8, 4, 9, 5],
      [5, 4, 0, 5, 0, 1],
      [4, 8, 5, 8, 3, 5, 5, 3, 1],
      [11, 2, 3, 9, 5, 4],
      [9, 5, 4, 8, 11, 2, 8, 2, 0],
      [3, 11, 2, 1, 5, 4, 1, 4, 0],
      [8, 5, 4, 2, 5, 8, 2, 8, 11, 2, 1, 5],
      [2, 10, 1, 9, 5, 4],
      [0, 8, 3, 5, 4, 9, 10, 1, 2],
      [10, 5, 2, 5, 4, 2, 2, 4, 0],
      [3, 4, 8, 3, 2, 4, 2, 5, 4, 2, 10, 5],
      [5, 4, 9, 1, 3, 11, 1, 11, 10],
      [0, 9, 1, 4, 8, 5, 8, 10, 5, 8, 11, 10],
      [3, 4, 0, 3, 10, 4, 4, 10, 5, 3, 11, 10],
      [4, 8, 5, 5, 8, 10, 8, 11, 10],
      [9, 5, 7, 9, 7, 8],
      [0, 9, 3, 9, 5, 3, 3, 5, 7],
      [8, 0, 7, 0, 1, 7, 7, 1, 5],
      [1, 7, 3, 1, 5, 7],
      [11, 2, 3, 8, 9, 5, 8, 5, 7],
      [9, 2, 0, 9, 7, 2, 2, 7, 11, 9, 5, 7],
      [0, 3, 8, 2, 1, 11, 1, 7, 11, 1, 5, 7],
      [2, 1, 11, 11, 1, 7, 1, 5, 7],
      [1, 2, 10, 5, 7, 8, 5, 8, 9],
      [9, 1, 0, 10, 5, 2, 5, 3, 2, 5, 7, 3],
      [5, 2, 10, 8, 2, 5, 8, 5, 7, 8, 0, 2],
      [10, 5, 2, 2, 5, 3, 5, 7, 3],
      [3, 9, 1, 3, 8, 9, 7, 11, 10, 7, 10, 5],
      [9, 1, 0, 10, 7, 11, 10, 5, 7],
      [3, 8, 0, 7, 10, 5, 7, 11, 10],
      [11, 5, 7, 11, 10, 5],
      [11, 7, 6],
      [0, 8, 3, 11, 7, 6],
      [9, 0, 1, 11, 7, 6],
      [7, 6, 11, 3, 1, 9, 3, 9, 8],
      [2, 3, 7, 2, 7, 6],
      [8, 7, 0, 7, 6, 0, 0, 6, 2],
      [1, 9, 0, 3, 7, 6, 3, 6, 2],
      [7, 6, 2, 7, 2, 9, 2, 1, 9, 7, 9, 8],
      [1, 2, 10, 6, 11, 7],
      [2, 10, 1, 7, 6, 11, 8, 3, 0],
      [11, 7, 6, 10, 9, 0, 10, 0, 2],
      [7, 6, 11, 3, 2, 8, 8, 2, 10, 8, 10, 9],
      [6, 10, 7, 10, 1, 7, 7, 1, 3],
      [6, 10, 1, 6, 1, 7, 7, 1, 0, 7, 0, 8],
      [9, 0, 3, 6, 9, 3, 6, 10, 9, 6, 3, 7],
      [6, 10, 7, 7, 10, 8, 10, 9, 8],
      [8, 4, 6, 8, 6, 11],
      [11, 3, 6, 3, 0, 6, 6, 0, 4],
      [0, 1, 9, 4, 6, 11, 4, 11, 8],
      [1, 9, 4, 11, 1, 4, 11, 3, 1, 11, 4, 6],
      [3, 8, 2, 8, 4, 2, 2, 4, 6],
      [2, 0, 4, 2, 4, 6],
      [1, 9, 0, 3, 8, 2, 2, 8, 4, 2, 4, 6],
      [9, 4, 1, 1, 4, 2, 4, 6, 2],
      [10, 1, 2, 11, 8, 4, 11, 4, 6],
      [10, 1, 2, 11, 3, 6, 6, 3, 0, 6, 0, 4],
      [0, 2, 10, 0, 10, 9, 4, 11, 8, 4, 6, 11],
      [2, 11, 3, 6, 9, 4, 6, 10, 9],
      [8, 4, 6, 8, 6, 1, 6, 10, 1, 8, 1, 3],
      [1, 0, 10, 10, 0, 6, 0, 4, 6],
      [8, 0, 3, 9, 6, 10, 9, 4, 6],
      [10, 4, 6, 10, 9, 4],
      [9, 5, 4, 7, 6, 11],
      [4, 9, 5, 3, 0, 8, 11, 7, 6],
      [6, 11, 7, 4, 0, 1, 4, 1, 5],
      [6, 11, 7, 4, 8, 5, 5, 8, 3, 5, 3, 1],
      [4, 9, 5, 6, 2, 3, 6, 3, 7],
      [9, 5, 4, 8, 7, 0, 0, 7, 6, 0, 6, 2],
      [4, 0, 1, 4, 1, 5, 6, 3, 7, 6, 2, 3],
      [7, 4, 8, 5, 2, 1, 5, 6, 2],
      [6, 11, 7, 1, 2, 10, 9, 5, 4],
      [11, 7, 6, 8, 3, 0, 1, 2, 10, 9, 5, 4],
      [11, 7, 6, 10, 5, 2, 2, 5, 4, 2, 4, 0],
      [7, 4, 8, 2, 11, 3, 10, 5, 6],
      [4, 9, 5, 6, 10, 7, 7, 10, 1, 7, 1, 3],
      [5, 6, 10, 0, 9, 1, 8, 7, 4],
      [5, 6, 10, 7, 0, 3, 7, 4, 0],
      [10, 5, 6, 4, 8, 7],
      [5, 6, 9, 6, 11, 9, 9, 11, 8],
      [0, 9, 5, 0, 5, 3, 3, 5, 6, 3, 6, 11],
      [0, 1, 5, 0, 5, 11, 5, 6, 11, 0, 11, 8],
      [11, 3, 6, 6, 3, 5, 3, 1, 5],
      [9, 5, 6, 3, 9, 6, 3, 8, 9, 3, 6, 2],
      [5, 6, 9, 9, 6, 0, 6, 2, 0],
      [0, 3, 8, 2, 5, 6, 2, 1, 5],
      [1, 6, 2, 1, 5, 6],
      [1, 2, 10, 5, 6, 9, 9, 6, 11, 9, 11, 8],
      [1, 0, 9, 6, 10, 5, 11, 3, 2],
      [6, 10, 5, 2, 8, 0, 2, 11, 8],
      [3, 2, 11, 10, 5, 6],
      [10, 5, 6, 9, 3, 8, 9, 1, 3],
      [0, 9, 1, 5, 6, 10],
      [8, 0, 3, 10, 5, 6],
      [10, 5, 6],
      [10, 6, 5],
      [8, 3, 0, 10, 6, 5],
      [0, 1, 9, 5, 10, 6],
      [10, 6, 5, 9, 8, 3, 9, 3, 1],
      [3, 11, 2, 10, 6, 5],
      [6, 5, 10, 2, 0, 8, 2, 8, 11],
      [1, 9, 0, 6, 5, 10, 11, 2, 3],
      [1, 10, 2, 5, 9, 6, 9, 11, 6, 9, 8, 11],
      [1, 2, 6, 1, 6, 5],
      [0, 8, 3, 2, 6, 5, 2, 5, 1],
      [5, 9, 6, 9, 0, 6, 6, 0, 2],
      [9, 6, 5, 3, 6, 9, 3, 9, 8, 3, 2, 6],
      [11, 6, 3, 6, 5, 3, 3, 5, 1],
      [0, 5, 1, 0, 11, 5, 5, 11, 6, 0, 8, 11],
      [0, 5, 9, 0, 3, 5, 3, 6, 5, 3, 11, 6],
      [5, 9, 6, 6, 9, 11, 9, 8, 11],
      [10, 6, 5, 4, 7, 8],
      [5, 10, 6, 7, 3, 0, 7, 0, 4],
      [5, 10, 6, 0, 1, 9, 8, 4, 7],
      [4, 5, 9, 6, 7, 10, 7, 1, 10, 7, 3, 1],
      [7, 8, 4, 2, 3, 11, 10, 6, 5],
      [11, 6, 7, 10, 2, 5, 2, 4, 5, 2, 0, 4],
      [11, 6, 7, 8, 0, 3, 1, 10, 2, 9, 4, 5],
      [6, 7, 11, 1, 10, 2, 9, 4, 5],
      [7, 8, 4, 5, 1, 2, 5, 2, 6],
      [4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2],
      [9, 4, 5, 8, 0, 7, 0, 6, 7, 0, 2, 6],
      [4, 5, 9, 6, 3, 2, 6, 7, 3],
      [6, 7, 11, 4, 5, 8, 5, 3, 8, 5, 1, 3],
      [6, 7, 11, 4, 1, 0, 4, 5, 1],
      [4, 5, 9, 3, 8, 0, 11, 6, 7],
      [9, 4, 5, 7, 11, 6],
      [10, 6, 4, 10, 4, 9],
      [8, 3, 0, 9, 10, 6, 9, 6, 4],
      [1, 10, 0, 10, 6, 0, 0, 6, 4],
      [8, 6, 4, 8, 1, 6, 6, 1, 10, 8, 3, 1],
      [2, 3, 11, 6, 4, 9, 6, 9, 10],
      [0, 10, 2, 0, 9, 10, 4, 8, 11, 4, 11, 6],
      [10, 2, 1, 11, 6, 3, 6, 0, 3, 6, 4, 0],
      [10, 2, 1, 11, 4, 8, 11, 6, 4],
      [9, 1, 4, 1, 2, 4, 4, 2, 6],
      [1, 0, 9, 3, 2, 8, 2, 4, 8, 2, 6, 4],
      [2, 4, 0, 2, 6, 4],
      [3, 2, 8, 8, 2, 4, 2, 6, 4],
      [1, 4, 9, 11, 4, 1, 11, 1, 3, 11, 6, 4],
      [0, 9, 1, 4, 11, 6, 4, 8, 11],
      [11, 6, 3, 3, 6, 0, 6, 4, 0],
      [8, 6, 4, 8, 11, 6],
      [6, 7, 10, 7, 8, 10, 10, 8, 9],
      [9, 3, 0, 6, 3, 9, 6, 9, 10, 6, 7, 3],
      [6, 1, 10, 6, 7, 1, 7, 0, 1, 7, 8, 0],
      [6, 7, 10, 10, 7, 1, 7, 3, 1],
      [7, 11, 6, 3, 8, 2, 8, 10, 2, 8, 9, 10],
      [11, 6, 7, 10, 0, 9, 10, 2, 0],
      [2, 1, 10, 7, 11, 6, 8, 0, 3],
      [1, 10, 2, 6, 7, 11],
      [7, 2, 6, 7, 9, 2, 2, 9, 1, 7, 8, 9],
      [1, 0, 9, 3, 6, 7, 3, 2, 6],
      [8, 0, 7, 7, 0, 6, 0, 2, 6],
      [2, 7, 3, 2, 6, 7],
      [7, 11, 6, 3, 9, 1, 3, 8, 9],
      [9, 1, 0, 11, 6, 7],
      [0, 3, 8, 11, 6, 7],
      [11, 6, 7],
      [11, 7, 5, 11, 5, 10],
      [3, 0, 8, 7, 5, 10, 7, 10, 11],
      [9, 0, 1, 10, 11, 7, 10, 7, 5],
      [3, 1, 9, 3, 9, 8, 7, 10, 11, 7, 5, 10],
      [10, 2, 5, 2, 3, 5, 5, 3, 7],
      [5, 10, 2, 8, 5, 2, 8, 7, 5, 8, 2, 0],
      [9, 0, 1, 10, 2, 5, 5, 2, 3, 5, 3, 7],
      [1, 10, 2, 5, 8, 7, 5, 9, 8],
      [2, 11, 1, 11, 7, 1, 1, 7, 5],
      [0, 8, 3, 2, 11, 1, 1, 11, 7, 1, 7, 5],
      [9, 0, 2, 9, 2, 7, 2, 11, 7, 9, 7, 5],
      [11, 3, 2, 8, 5, 9, 8, 7, 5],
      [1, 3, 7, 1, 7, 5],
      [8, 7, 0, 0, 7, 1, 7, 5, 1],
      [0, 3, 9, 9, 3, 5, 3, 7, 5],
      [9, 7, 5, 9, 8, 7],
      [4, 5, 8, 5, 10, 8, 8, 10, 11],
      [3, 0, 4, 3, 4, 10, 4, 5, 10, 3, 10, 11],
      [0, 1, 9, 4, 5, 8, 8, 5, 10, 8, 10, 11],
      [5, 9, 4, 1, 11, 3, 1, 10, 11],
      [3, 8, 4, 3, 4, 2, 2, 4, 5, 2, 5, 10],
      [10, 2, 5, 5, 2, 4, 2, 0, 4],
      [0, 3, 8, 5, 9, 4, 10, 2, 1],
      [2, 1, 10, 9, 4, 5],
      [8, 4, 5, 2, 8, 5, 2, 11, 8, 2, 5, 1],
      [3, 2, 11, 1, 4, 5, 1, 0, 4],
      [9, 4, 5, 8, 2, 11, 8, 0, 2],
      [11, 3, 2, 9, 4, 5],
      [4, 5, 8, 8, 5, 3, 5, 1, 3],
      [5, 0, 4, 5, 1, 0],
      [3, 8, 0, 4, 5, 9],
      [9, 4, 5],
      [7, 4, 11, 4, 9, 11, 11, 9, 10],
      [3, 0, 8, 7, 4, 11, 11, 4, 9, 11, 9, 10],
      [11, 7, 4, 1, 11, 4, 1, 10, 11, 1, 4, 0],
      [8, 7, 4, 11, 1, 10, 11, 3, 1],
      [2, 3, 7, 2, 7, 9, 7, 4, 9, 2, 9, 10],
      [4, 8, 7, 0, 10, 2, 0, 9, 10],
      [2, 1, 10, 0, 7, 4, 0, 3, 7],
      [10, 2, 1, 8, 7, 4],
      [2, 11, 7, 2, 7, 1, 1, 7, 4, 1, 4, 9],
      [3, 2, 11, 4, 8, 7, 9, 1, 0],
      [7, 4, 11, 11, 4, 2, 4, 0, 2],
      [2, 11, 3, 7, 4, 8],
      [9, 1, 4, 4, 1, 7, 1, 3, 7],
      [1, 0, 9, 8, 7, 4],
      [3, 4, 0, 3, 7, 4],
      [8, 7, 4],
      [8, 9, 10, 8, 10, 11],
      [0, 9, 3, 3, 9, 11, 9, 10, 11],
      [1, 10, 0, 0, 10, 8, 10, 11, 8],
      [10, 3, 1, 10, 11, 3],
      [3, 8, 2, 2, 8, 10, 8, 9, 10],
      [9, 2, 0, 9, 10, 2],
      [8, 0, 3, 1, 10, 2],
      [10, 2, 1],
      [2, 11, 1, 1, 11, 9, 11, 8, 9],
      [11, 3, 2, 0, 9, 1],
      [11, 0, 2, 11, 8, 0],
      [11, 3, 2],
      [8, 1, 3, 8, 9, 1],
      [9, 1, 0],
      [8, 0, 3],
      [],
    ];
  return b;
};
$3Dmol.MarchingCube = $3Dmol.MarchingCubeInitializer();
$3Dmol.Parsers = (function () {
  var b = {},
    c = function (b) {
      for (var c = 0, d = b.length; c < d; c++) b[c].index || (b[c].index = c);
      for (var d = {}, m = 0; m < b.length; m++) {
        var c = b[m],
          w = Math.floor(c.x / 4.95),
          e = Math.floor(c.y / 4.95),
          p = Math.floor(c.z / 4.95);
        d[w] || (d[w] = {});
        d[w][e] || (d[w][e] = {});
        d[w][e][p] || (d[w][e][p] = []);
        d[w][e][p].push(c);
      }
      b = [
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 1, z: -1 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: 1, z: 1 },
        { x: 1, y: -1, z: -1 },
        { x: 1, y: -1, z: 0 },
        { x: 1, y: -1, z: 1 },
        { x: 1, y: 0, z: -1 },
        { x: 1, y: 0, z: 0 },
        { x: 1, y: 0, z: 1 },
        { x: 1, y: 1, z: -1 },
        { x: 1, y: 1, z: 0 },
        { x: 1, y: 1, z: 1 },
      ];
      for (w in d)
        for (e in ((w = parseInt(w)), d[w]))
          for (p in ((e = parseInt(e)), d[w][e])) {
            p = parseInt(p);
            m = d[w][e][p];
            for (c = 0; c < m.length; c++)
              for (var g = m[c], s = c + 1; s < m.length; s++) {
                var u = m[s];
                y(g, u) &&
                  -1 == g.bonds.indexOf(u.index) &&
                  (g.bonds.push(u.index),
                  g.bondOrder.push(1),
                  u.bonds.push(g.index),
                  u.bondOrder.push(1));
              }
            for (c = 0; c < b.length; c++)
              if (
                ((s = b[c]),
                d[w + s.x] &&
                  d[w + s.x][e + s.y] &&
                  d[w + s.x][e + s.y][p + s.z])
              )
                for (
                  g = m, s = d[w + s.x][e + s.y][p + s.z], u = 0;
                  u < g.length;
                  u++
                )
                  for (var x = g[u], q = 0; q < s.length; q++) {
                    var t = s[q];
                    y(x, t) &&
                      -1 == x.bonds.indexOf(t.index) &&
                      (x.bonds.push(t.index),
                      x.bondOrder.push(1),
                      t.bonds.push(x.index),
                      t.bondOrder.push(1));
                  }
          }
    },
    d = function (b) {
      var d = [],
        l = [],
        m,
        w;
      m = 0;
      for (w = b.length; m < w; m++) {
        var e = b[m];
        e.index = m;
        e.hetflag ? l.push(e) : d.push(e);
      }
      c(l);
      d.sort(function (b, c) {
        return b.chain != c.chain
          ? b.chain < c.chain
            ? -1
            : 1
          : b.resi - c.resi;
      });
      var l = (b = -1),
        p;
      m = 0;
      for (w = d.length; m < w; m++) {
        e = d[m];
        e.resi !== b && ((b = e.resi), p || l++, (p = !1));
        e.reschain = l;
        for (var g = m + 1; g < d.length; g++) {
          var s = d[g];
          if (s.chain != e.chain) break;
          if (1 < s.resi - e.resi) break;
          y(e, s) &&
            (-1 === e.bonds.indexOf(s.index) &&
              (e.bonds.push(s.index),
              e.bondOrder.push(1),
              s.bonds.push(e.index),
              s.bondOrder.push(1)),
            e.resi !== s.resi && (p = !0));
        }
      }
    },
    p = function (b) {
      var c = [],
        d,
        m;
      d = 0;
      for (m = b.length; d < m; d++) {
        b[d].index = d;
        var w = b[d];
        w.hetflag ||
          ("N" !== w.atom && "O" !== w.atom) ||
          (c.push(w),
          (w.hbondOther = null),
          (w.hbondDistanceSq = Number.POSITIVE_INFINITY));
      }
      c.sort(function (b, c) {
        return b.z - c.z;
      });
      d = 0;
      for (m = c.length; d < m; d++)
        for (w = c[d], b = d + 1; b < m; b++) {
          var e = c[b],
            p = e.z - w.z;
          if (3.2 < p) break;
          if (e.atom != w.atom) {
            var g = Math.abs(e.y - w.y);
            if (!(3.2 < g)) {
              var s = Math.abs(e.x - w.x);
              3.2 < s ||
                ((p = s * s + g * g + p * p),
                10.24 < p ||
                  (e.chain == w.chain && 4 > Math.abs(e.resi - w.resi)) ||
                  (p < w.hbondDistanceSq &&
                    ((w.hbondOther = e), (w.hbondDistanceSq = p)),
                  p < e.hbondDistanceSq &&
                    ((e.hbondOther = w), (e.hbondDistanceSq = p))));
            }
          }
        }
    },
    t = function (b) {
      p(b);
      var c = {},
        d,
        m,
        w,
        e,
        t;
      d = 0;
      for (m = b.length; d < m; d++)
        (e = b[d]),
          "undefined" === typeof c[e.chain] && (c[e.chain] = []),
          isFinite(e.hbondDistanceSq) &&
            ((t = e.hbondOther),
            "undefined" === typeof c[t.chain] && (c[t.chain] = []),
            4 === Math.abs(t.resi - e.resi) && (c[e.chain][e.resi] = "h"));
      for (w in c)
        for (d = 1; d < c[w].length - 1; d++)
          (m = c[w][d - 1]),
            (e = c[w][d + 1]),
            (t = c[w][d]),
            "h" == m && m == e && t != m && (c[w][d] = m);
      d = 0;
      for (m = b.length; d < m; d++)
        (e = b[d]),
          isFinite(e.hbondDistanceSq) &&
            "h" != c[e.chain][e.resi] &&
            "h" != e.ss &&
            (c[e.chain][e.resi] = "maybesheet");
      d = 0;
      for (m = b.length; d < m; d++)
        if (
          ((e = b[d]),
          isFinite(e.hbondDistanceSq) && "maybesheet" == c[e.chain][e.resi])
        ) {
          t = e.hbondOther;
          var g = c[t.chain][t.resi];
          if ("maybesheet" == g || "s" == g)
            (c[e.chain][e.resi] = "s"), (c[t.chain][t.resi] = "s");
        }
      for (w in c) {
        for (d = 1; d < c[w].length - 1; d++)
          (m = c[w][d - 1]),
            (e = c[w][d + 1]),
            (t = c[w][d]),
            "s" == m && m == e && t != m && (c[w][d] = m);
        for (d = 0; d < c[w].length; d++)
          (t = c[w][d]),
            ("h" != t && "s" != t) ||
              c[w][d - 1] == t ||
              c[w][d + 1] == t ||
              delete c[w][d];
      }
      d = 0;
      for (m = b.length; d < m; d++)
        (e = b[d]),
          (t = c[e.chain][e.resi]),
          "undefined" != typeof t &&
            "maybesheet" != t &&
            ((e.ss = t),
            c[e.chain][e.resi - 1] != t && (e.ssbegin = !0),
            c[e.chain][e.resi + 1] != t && (e.ssend = !0));
    };
  b.vasp = b.VASP = function (b, c) {
    var d = [[]],
      m,
      w,
      e,
      p,
      g = b.replace(/^\s+/, "").split(/[\n\r]/);
    if (3 > g.length) return d;
    if (g[1].match(/\d+/)) m = parseFloat(g[1]);
    else
      return (
        console.log(
          "Warning: second line of the vasp structure file must be a number"
        ),
        d
      );
    if (0 > m)
      return (
        console.log(
          "Warning: Vasp implementation for negative lattice lengths is not yet available"
        ),
        d
      );
    w = new Float32Array(g[2].replace(/^\s+/, "").split(/\s+/));
    e = new Float32Array(g[3].replace(/^\s+/, "").split(/\s+/));
    p = new Float32Array(g[4].replace(/^\s+/, "").split(/\s+/));
    var s = g[5].replace(/\s+/, "").replace(/\s+$/, "").split(/\s+/),
      u = new Int16Array(g[6].replace(/^\s+/, "").split(/\s+/)),
      t = g[7].replace(/\s+/, "");
    if (t.match(/C/)) t = "cartesian";
    else if (t.match(/D/)) t = "direct";
    else
      return (
        console.log(
          "Warning: Unknown vasp mode in POSCAR file: mode must be either C(artesian) or D(irect)"
        ),
        d
      );
    if (s.length != u.length)
      return (
        console.log("Warning: declaration of atomary species wrong:"),
        console.log(s),
        console.log(u),
        d
      );
    g.splice(0, 8);
    for (var q = 0, y = 0, z = s.length; y < z; y++) {
      for (var A = s[y], C = 0, B = u[y]; C < B; C++) {
        var F = new Float32Array(g[q + C].replace(/^\s+/, "").split(/\s+/));
        atom = {};
        atom.elem = A;
        "cartesian" == t
          ? ((atom.x = m * F[0]), (atom.y = m * F[1]), (atom.z = m * F[2]))
          : ((atom.x = m * (F[0] * w[0] + F[1] * e[0] + F[2] * p[0])),
            (atom.y = m * (F[0] * w[1] + F[1] * e[1] + F[2] * p[1])),
            (atom.z = m * (F[0] * w[2] + F[1] * e[2] + F[2] * p[2])));
        atom.bonds = [];
        d[0].push(atom);
      }
      q += u[y];
    }
    return d;
  };
  b.cube = b.CUBE = function (b, d) {
    var l = [[]],
      m = b.replace(/^\s+/, "").split(/\n\r|\r+/);
    if (6 > m.length) return l;
    for (
      var w = m[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
        e = Math.abs(parseFloat(w[0])),
        w = m[3].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
        w = 0 < parseFloat(w[0]) ? 0.529177 : 1,
        m = m.splice(6, e),
        e = l[l.length - 1].length,
        p = e + m.length,
        g = e;
      g < p;
      ++g
    ) {
      var s = {};
      s.serial = g;
      var u = m[g - e].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
      6 == u[0]
        ? (s.elem = "C")
        : 1 == u[0]
        ? (s.elem = "H")
        : 8 == u[0]
        ? (s.elem = "O")
        : 17 == u[0] && (s.elem = "Cl");
      s.x = parseFloat(u[2]) * w;
      s.y = parseFloat(u[3]) * w;
      s.z = parseFloat(u[4]) * w;
      s.hetflag = !0;
      s.bonds = [];
      s.bondOrder = [];
      s.properties = {};
      l[l.length - 1].push(s);
    }
    for (g = 0; g < l.length; g++) c(l[g]);
    return l;
  };
  b.xyz = b.XYZ = function (b, d) {
    for (
      var l = [[]], m = b.split(/\r?\n|\r/);
      0 < m.length && !(3 > m.length);

    ) {
      var w = parseInt(m[0]);
      if (isNaN(w) || 0 >= w) break;
      if (m.length < w + 2) break;
      for (var e = 2, p = l[l.length - 1].length, w = p + w; p < w; p++) {
        var g = m[e++].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
          s = {};
        s.serial = p;
        var u = g[0];
        s.atom = s.elem = u[0].toUpperCase() + u.substr(1).toLowerCase();
        s.x = parseFloat(g[1]);
        s.y = parseFloat(g[2]);
        s.z = parseFloat(g[3]);
        s.hetflag = !0;
        s.bonds = [];
        s.bondOrder = [];
        s.properties = {};
        l[l.length - 1][p] = s;
        7 <= g.length &&
          ((s.dx = parseFloat(g[4])),
          (s.dy = parseFloat(g[5])),
          (s.dz = parseFloat(g[6])));
      }
      if (d.multimodel) l.push([]), m.splice(0, e);
      else break;
    }
    for (p = 0; p < l.length; p++) c(l[p]);
    if (d.onemol)
      for (m = l, l = [], l.push(m[0]), p = 1; p < m.length; p++)
        for (e = l[0].length, w = 0; w < m[p].length; w++) {
          g = m[p][w];
          for (s = 0; s < g.bonds.length; s++) g.bonds[s] += e;
          g.index = l[0].length;
          g.serial = l[0].length;
          l[0].push(g);
        }
    return l;
  };
  b.sdf = b.SDF = function (b, c) {
    var d = [[]],
      m = !1;
    "undefined" !== typeof c.keepH && (m = !c.keepH);
    for (var p = b.split(/\r?\n|\r/); 0 < p.length && !(4 > p.length); ) {
      var e = parseInt(p[3].substr(0, 3));
      if (isNaN(e) || 0 >= e) break;
      var t = parseInt(p[3].substr(3, 3)),
        g = 4;
      if (p.length < 4 + e + t) break;
      for (
        var s = [], u = d[d.length - 1].length, x = u + e, q, e = u;
        e < x;
        e++, g++
      ) {
        q = p[g];
        var y = {},
          z = q.substr(31, 3).replace(/ /g, "");
        y.atom = y.elem = z[0].toUpperCase() + z.substr(1).toLowerCase();
        ("H" == y.elem && m) ||
          ((y.serial = e),
          (s[e] = d[d.length - 1].length),
          (y.x = parseFloat(q.substr(0, 10))),
          (y.y = parseFloat(q.substr(10, 10))),
          (y.z = parseFloat(q.substr(20, 10))),
          (y.hetflag = !0),
          (y.bonds = []),
          (y.bondOrder = []),
          (y.properties = {}),
          (y.index = d[d.length - 1].length),
          d[d.length - 1].push(y));
      }
      for (e = 0; e < t; e++, g++)
        (q = p[g]),
          (x = s[parseInt(q.substr(0, 3)) - 1 + u]),
          (y = s[parseInt(q.substr(3, 3)) - 1 + u]),
          (q = parseInt(q.substr(6, 3))),
          "undefined" != typeof x &&
            "undefined" != typeof y &&
            (d[d.length - 1][x].bonds.push(y),
            d[d.length - 1][x].bondOrder.push(q),
            d[d.length - 1][y].bonds.push(x),
            d[d.length - 1][y].bondOrder.push(q));
      if (c.multimodel) {
        for (c.onemol || d.push([]); "$$$$" != p[g]; ) g++;
        p.splice(0, ++g);
      } else break;
    }
    return d;
  };
  b.cdjson = b.json = function (b, c) {
    var d = [[]];
    "string" === typeof b && (b = JSON.parse(b));
    for (
      var m = b.m,
        p = m[0].a,
        e = m[0].b,
        t = m[0].s,
        g =
          void 0 !== c && void 0 !== c.parseStyle ? c.parseStyle : void 0 !== t,
        m = d[d.length - 1].length,
        s = 0;
      s < p.length;
      s++
    ) {
      var u = p[s],
        x = {};
      x.id = u.i;
      x.x = u.x;
      x.y = u.y;
      x.z = u.z || 0;
      x.bonds = [];
      x.bondOrder = [];
      var q = u.l || "C";
      x.elem = q[0].toUpperCase() + q.substr(1).toLowerCase();
      x.serial = d[d.length - 1].length;
      g && (x.style = t[u.s || 0]);
      d[d.length - 1].push(x);
    }
    for (s = 0; s < e.length; s++)
      (g = e[s]),
        (p = g.b + m),
        (t = g.e + m),
        (g = g.o || 1),
        (u = d[d.length - 1][p]),
        (x = d[d.length - 1][t]),
        u.bonds.push(t),
        u.bondOrder.push(g),
        x.bonds.push(p),
        x.bondOrder.push(g);
    return d;
  };
  b.mcif = b.cif = function (b, d) {
    function l(b, c) {
      for (var d = [], e = 0, f = 0; f < b.length; ) {
        for (; b.substr(f, c.length) !== c && f < b.length; ) {
          if ("'" === b[f]) for (f++; f < b.length && "'" !== b[f]; ) f++;
          else if ('"' === b[f]) for (f++; f < b.length && '"' !== b[f]; ) f++;
          f++;
        }
        d.push(b.substr(e, f - e));
        e = f += c.length;
      }
      return d;
    }
    for (
      var m = [],
        p = !d.doAssembly,
        e = !d.duplicateAssemblyAtoms,
        y = (m.modelData = []),
        g = b.split(/\r?\n|\r/),
        s = [],
        u = !1,
        x = 0;
      x < g.length;
      x++
    ) {
      var q = g[x].split("#")[0];
      u ? ";" === q[0] && (u = !1) : ";" === q[0] && (u = !0);
      if (u || "" !== q) {
        if (!u && ((q = q.trim()), "_" === q[0])) {
          var A = q.split(/\s/)[0].indexOf(".");
          -1 < A &&
            ((q[A] = "_"), (q = q.substr(0, A) + "_" + q.substr(A + 1)));
        }
        s.push(q);
      }
    }
    for (x = 0; x < s.length; ) {
      g = function (b) {
        var c = b.match("-");
        b = b.replace(/[-xyz]/g, "");
        b = b.split("/");
        var d;
        d = void 0 === b[1] ? 1 : parseInt(b[1]);
        return (("" === b[0] ? 1 : parseInt(b[0])) / d) * (c ? -1 : 1);
      };
      for (
        A = function (b, c, d) {
          return {
            x: B[0][0] * b + B[0][1] * c + B[0][2] * d,
            y: B[1][0] * b + B[1][1] * c + B[1][2] * d,
            z: B[2][0] * b + B[2][1] * c + B[2][2] * d,
          };
        };
        !s[x].startsWith("data_") || "data_global" === s[x];

      )
        x++;
      x++;
      for (u = {}; x < s.length && !s[x].startsWith("data_"); )
        if (void 0 === s[x][0]) x++;
        else if ("_" === s[x][0]) {
          var I = s[x].split(/\s/)[0].toLowerCase(),
            q = (u[I] = u[I] || []),
            D = s[x].substr(s[x].indexOf(I) + I.length);
          if ("" === D)
            if ((x++, ";" === s[x][0])) {
              D = s[x].substr(1);
              for (x++; ";" !== s[x]; ) (D = D + "\n" + s[x]), x++;
              q.push(D);
            } else q.push(s[x]);
          else q.push(D.trim());
          x++;
        } else if ("loop_" === s[x].substr(0, 5)) {
          x++;
          for (D = []; "" === s[x] || "_" === s[x][0]; )
            "" !== s[x] &&
              ((I = s[x].split(/\s/)[0].toLowerCase()),
              (q = u[I] = u[I] || []),
              D.push(q)),
              x++;
          for (
            I = 0;
            x < s.length &&
            "_" !== s[x][0] &&
            !s[x].startsWith("loop_") &&
            !s[x].startsWith("data_");

          ) {
            for (var q = l(s[x], " "), C = 0; C < q.length; C++)
              "" !== q[C] && (D[I].push(q[C]), (I = (I + 1) % D.length));
            x++;
          }
        } else x++;
      y.push({ symmetries: [] });
      m.push([]);
      var D =
          void 0 !== u._atom_site_id
            ? u._atom_site_id.length
            : u._atom_site_label.length,
        B;
      if (void 0 !== u._cell_length_a) {
        var q = parseFloat(u._cell_length_a),
          I = parseFloat(u._cell_length_b),
          C = parseFloat(u._cell_length_c),
          F = parseFloat(u._cell_angle_alpha) || 90,
          J = parseFloat(u._cell_angle_beta) || 90,
          L = parseFloat(u._cell_angle_gamma) || 90,
          K = (J * Math.PI) / 180,
          H = (L * Math.PI) / 180,
          M = Math.cos((F * Math.PI) / 180),
          K = Math.cos(K),
          O = Math.cos(H),
          H = Math.sin(H);
        B = [
          [q, I * O, C * K],
          [0, I * H, (C * (M - K * O)) / H],
          [
            0,
            0,
            (C * Math.sqrt(1 - M * M - K * K - O * O + 2 * M * K * O)) / H,
          ],
        ];
        y[y.length - 1].cryst = {
          a: q,
          b: I,
          c: C,
          alpha: F,
          beta: J,
          gamma: L,
        };
      }
      for (q = 0; q < D; q++)
        if (
          void 0 === u._atom_site_group_pdb ||
          "TER" !== u._atom_site_group_pdb[q]
        )
          (I = {}),
            void 0 !== u._atom_site_cartn_x
              ? ((I.x = parseFloat(u._atom_site_cartn_x[q])),
                (I.y = parseFloat(u._atom_site_cartn_y[q])),
                (I.z = parseFloat(u._atom_site_cartn_z[q])))
              : ((C = A(
                  parseFloat(u._atom_site_fract_x[q]),
                  parseFloat(u._atom_site_fract_y[q]),
                  parseFloat(u._atom_site_fract_z[q])
                )),
                (I.x = C.x),
                (I.y = C.y),
                (I.z = C.z)),
            (I.chain = u._atom_site_auth_asym_id
              ? u._atom_site_auth_asym_id[q]
              : void 0),
            (I.resi = u._atom_site_auth_seq_id
              ? parseInt(u._atom_site_auth_seq_id[q])
              : void 0),
            (I.resn = u._atom_site_auth_comp_id
              ? u._atom_site_auth_comp_id[q].trim()
              : void 0),
            (I.atom = u._atom_site_auth_atom_id
              ? u._atom_site_auth_atom_id[q].replace(/"/gm, "")
              : void 0),
            (I.hetflag =
              !u._atom_site_group_pdb ||
              "HETA" === u._atom_site_group_pdb[q] ||
              "HETATM" === u._atom_site_group_pdb[q]),
            (C = u._atom_site_type_symbol[q]),
            (I.elem = C[0].toUpperCase() + C.substr(1).toLowerCase()),
            (I.bonds = []),
            (I.ss = "c"),
            (I.serial = q),
            (I.bondOrder = []),
            (I.properties = {}),
            m[m.length - 1].push(I);
      if (void 0 !== u._pdbx_struct_oper_list_id && !p) {
        for (q = 0; q < u._pdbx_struct_oper_list_id.length; q++) {
          var A = parseFloat(u["_pdbx_struct_oper_list_matrix[1][1]"][q]),
            D = parseFloat(u["_pdbx_struct_oper_list_matrix[1][2]"][q]),
            I = parseFloat(u["_pdbx_struct_oper_list_matrix[1][3]"][q]),
            C = parseFloat(u["_pdbx_struct_oper_list_vector[1]"][q]),
            F = parseFloat(u["_pdbx_struct_oper_list_matrix[2][1]"][q]),
            J = parseFloat(u["_pdbx_struct_oper_list_matrix[2][2]"][q]),
            L = parseFloat(u["_pdbx_struct_oper_list_matrix[2][3]"][q]),
            M = parseFloat(u["_pdbx_struct_oper_list_vector[2]"][q]),
            H = parseFloat(u["_pdbx_struct_oper_list_matrix[3][1]"][q]),
            K = parseFloat(u["_pdbx_struct_oper_list_matrix[3][2]"][q]),
            O = parseFloat(u["_pdbx_struct_oper_list_matrix[3][3]"][q]),
            R = parseFloat(u["_pdbx_struct_oper_list_vector[3]"][q]),
            A = new $3Dmol.Matrix4(A, D, I, C, F, J, L, M, H, K, O, R);
          y[y.length - 1].symmetries.push(A);
        }
        for (q = 0; q < m.length; q++) z(y[y.length - 1].symmetries, e, m[q]);
      }
      if (void 0 !== u._symmetry_equiv_pos_as_xyz)
        for (q = 0; q < u._symmetry_equiv_pos_as_xyz.length; q++) {
          D = u._symmetry_equiv_pos_as_xyz[q]
            .replace(/["' ]/g, "")
            .split(",")
            .map(function (b) {
              return b.replace(/-/g, "+-");
            });
          A = new $3Dmol.Matrix4(
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
          );
          for (I = 0; 3 > I; I++)
            for (C = D[I].split("+"), F = 0; F < C.length; F++)
              (J = C[F]),
                "" !== J &&
                  ((L = g(J)),
                  J.match("x")
                    ? (A.elements[I + 0] = L)
                    : J.match("y")
                    ? (A.elements[I + 4] = L)
                    : J.match("z")
                    ? (A.elements[I + 8] = L)
                    : (A.elements[I + 12] = L));
          D = new $3Dmol.Matrix4(
            B[0][0],
            B[0][1],
            B[0][2],
            0,
            B[1][0],
            B[1][1],
            B[1][2],
            0,
            B[2][0],
            B[2][1],
            B[2][2],
            0
          );
          I = new $3Dmol.Matrix4().getInverse(D, !0);
          A = new $3Dmol.Matrix4().multiplyMatrices(A, I);
          A = new $3Dmol.Matrix4().multiplyMatrices(D, A);
          y[y.length - 1].symmetries.push(A);
        }
    }
    for (q = 0; q < m.length; q++)
      c(m[q]), t(m[q]), z(y[q].symmetries, e, m[q]);
    return m;
  };
  b.mol2 = b.MOL2 = function (b, c) {
    var d = [[]],
      m = !1;
    "undefined" !== typeof c.keepH && (m = !c.keepH);
    for (var p = b.substr(e, b.length).split(/\r?\n|\r/); 0 < p.length; ) {
      var e = b.search(/@<TRIPOS>MOLECULE/),
        t = b.search(/@<TRIPOS>ATOM/);
      if (-1 == e || -1 == t) break;
      var e = [],
        g = p[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
        s = parseInt(g[0]),
        t = 0;
      1 < g.length && (t = parseInt(g[1]));
      var u = 4,
        x;
      for (x = 3; x < p.length; x++)
        if ("@<TRIPOS>ATOM" == p[x]) {
          u = x + 1;
          break;
        }
      x = d[d.length - 1].length;
      for (s = x + s; x < s; x++) {
        var g = p[u++],
          g = g.replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
          q = {},
          y = g[5].split(".")[0];
        q.atom = q.elem = y[0].toUpperCase() + y.substr(1).toLowerCase();
        if ("H" != q.elem || !m) {
          var y = d[d.length - 1].length,
            z = parseInt(g[0]);
          q.serial = z;
          q.x = parseFloat(g[2]);
          q.y = parseFloat(g[3]);
          q.z = parseFloat(g[4]);
          q.atom = g[5];
          g = parseFloat(g[8]);
          q.index = y;
          q.bonds = [];
          q.bondOrder = [];
          q.properties = { charge: g, partialCharge: g };
          e[z] = y;
          d[d.length - 1].push(q);
        }
      }
      for (x = !1; u < p.length; )
        if ("@<TRIPOS>BOND" == p[u++]) {
          x = !0;
          break;
        }
      if (x && t)
        for (x = 0; x < t; x++)
          (g = p[u++]),
            (g = g.replace(/^\s+/, "").replace(/\s+/g, " ").split(" ")),
            (s = parseInt(g[1])),
            (fromAtom = d[d.length - 1][e[s]]),
            (q = parseInt(g[2])),
            (toAtom = d[d.length - 1][e[q]]),
            (g = parseInt(g[3])),
            isNaN(g) && (g = 1),
            void 0 !== fromAtom &&
              void 0 !== toAtom &&
              (fromAtom.bonds.push(e[q]),
              fromAtom.bondOrder.push(g),
              toAtom.bonds.push(e[s]),
              toAtom.bondOrder.push(g));
      if (c.multimodel)
        c.onemol || d.push([]), p.splice(0, u), (b = p.join("\n"));
      else break;
    }
    return d;
  };
  var A = {
      H: 0.37,
      He: 0.32,
      Li: 1.34,
      Be: 0.9,
      B: 0.82,
      C: 0.77,
      N: 0.75,
      O: 0.73,
      F: 0.71,
      Ne: 0.69,
      Na: 1.54,
      Mg: 1.3,
      Al: 1.18,
      Si: 1.11,
      P: 1.06,
      S: 1.02,
      Cl: 0.99,
      Ar: 0.97,
      K: 1.96,
      Ca: 1.74,
      Sc: 1.44,
      Ti: 1.56,
      V: 1.25,
      Mn: 1.39,
      Fe: 1.25,
      Co: 1.26,
      Ni: 1.21,
      Cu: 1.38,
      Zn: 1.31,
      Ga: 1.26,
      Ge: 1.22,
      Se: 1.16,
      Br: 1.14,
      Kr: 1.1,
      Rb: 2.11,
      Sr: 1.92,
      Y: 1.62,
      Zr: 1.48,
      Nb: 1.37,
      Mo: 1.45,
      Tc: 1.56,
      Ru: 1.26,
      Rh: 1.35,
      Pd: 1.31,
      Ag: 1.53,
      Cd: 1.48,
      In: 1.44,
      Sn: 1.41,
      Sb: 1.38,
      Te: 1.35,
      I: 1.33,
      Xe: 1.3,
      Cs: 2.25,
      Ba: 1.98,
      Lu: 1.6,
      Hf: 1.5,
      Ta: 1.38,
      W: 1.46,
      Re: 1.59,
      Os: 1.44,
      Ir: 1.37,
      Pt: 1.28,
      Au: 1.44,
      Hg: 1.49,
      Tl: 1.48,
      Pb: 1.47,
      Bi: 1.46,
      Rn: 1.45,
    },
    y = function (b, c) {
      var d = (A[b.elem] || 1.6) + (A[c.elem] || 1.6),
        d = d + 0.25,
        d = d * d,
        m = b.x - c.x,
        m = m * m;
      if (m > d) return !1;
      var p = b.y - c.y,
        p = p * p;
      if (p > d) return !1;
      var e = b.z - c.z,
        e = e * e;
      if (e > d) return !1;
      m = m + p + e;
      return isNaN(m) ? !1 : 0.5 > m ? !1 : m > d ? !1 : !0;
    },
    z = function (b, c, d) {
      var m = d.length,
        p = m,
        e,
        t;
      if (!c)
        for (c = 0; c < b.length; c++) {
          if (!b[c].isIdentity()) {
            var g = new $3Dmol.Vector3();
            for (t = 0; t < m; t++) {
              var s = [];
              for (e = 0; e < d[t].bonds.length; e++) s.push(d[t].bonds[e] + p);
              g.set(d[t].x, d[t].y, d[t].z);
              g.applyMatrix4(b[c]);
              e = {};
              for (var u in d[t]) e[u] = d[t][u];
              e.x = g.x;
              e.y = g.y;
              e.z = g.z;
              e.bonds = s;
              d.push(e);
            }
            p = d.length;
          }
        }
      else if (1 < b.length)
        for (c = 0; c < d.length; c++) {
          m = [];
          for (e = 0; e < b.length; e++)
            b[e].isIdentity() ||
              ((p = new $3Dmol.Vector3()),
              p.set(d[c].x, d[c].y, d[c].z),
              p.applyMatrix4(b[e]),
              m.push(p));
          d[c].symmetries = m;
        }
    };
  b.pdb =
    b.PDB =
    b.pdbqt =
    b.PDBQT =
      function (b, c) {
        var l = [[]],
          m = !c.keepH,
          p = !c.noSecondaryStructure,
          e = !c.doAssembly,
          y = !c.duplicateAssemblyAtoms,
          g = (l.modelData = [{ symmetries: [] }]),
          s = l[l.length - 1].length,
          u,
          x = [],
          q = [],
          N = !1,
          I = [],
          D = b.split(/\r?\n|\r/),
          C,
          B,
          F,
          J = {};
        for (C = 0; C < D.length; C++) {
          F = D[C].replace(/^\s*/, "");
          B = F.substr(0, 6);
          var L;
          if (0 == B.indexOf("END"))
            if (c.multimodel)
              c.onemol || (l.push([]), g.push({ symmetries: [] }));
            else break;
          else if ("ATOM  " == B || "HETATM" == B) {
            var K, H, M, O, R, V, P, S, Q;
            B = F.substr(16, 1);
            if (" " == B || "A" == B)
              (Q = parseInt(F.substr(6, 5))),
                (u = F.substr(12, 4).replace(/ /g, "")),
                (L = F.substr(17, 3).replace(/ /g, "")),
                (K = F.substr(21, 1)),
                (H = parseInt(F.substr(22, 4))),
                (M = F.substr(26, 1)),
                (O = parseFloat(F.substr(30, 8))),
                (R = parseFloat(F.substr(38, 8))),
                (V = parseFloat(F.substr(46, 8))),
                (B = parseFloat(F.substr(60, 8))),
                (S = F.substr(76, 2).replace(/ /g, "")),
                "" === S || "undefined" === typeof A[S]
                  ? ((S = F.substr(12, 2).replace(/ /g, "")),
                    0 < S.length && "H" == S[0] && "Hg" != S && (S = "H"),
                    1 < S.length &&
                      ((S = S[0].toUpperCase() + S.substr(1).toLowerCase()),
                      "undefined" === typeof A[S]
                        ? (S = S[0])
                        : "A" == F[0] && "Ca" == S && (S = "C")))
                  : (S = S[0].toUpperCase() + S.substr(1).toLowerCase()),
                ("H" == S && m) ||
                  ((P = "H" == F[0] ? !0 : !1),
                  (I[Q] = l[l.length - 1].length),
                  l[l.length - 1].push({
                    resn: L,
                    x: O,
                    y: R,
                    z: V,
                    elem: S,
                    hetflag: P,
                    chain: K,
                    resi: H,
                    icode: M,
                    rescode: H + (" " != M ? "^" + M : ""),
                    serial: Q,
                    atom: u,
                    bonds: [],
                    ss: "c",
                    bondOrder: [],
                    properties: {},
                    b: B,
                    pdbline: F,
                  }));
          } else if ("SHEET " == B)
            (N = !0),
              (B = F.substr(21, 1)),
              (u = parseInt(F.substr(22, 4))),
              (L = F.substr(32, 1)),
              (F = parseInt(F.substr(33, 4))),
              x.push([B, u, L, F]);
          else if ("CONECT" == B)
            for (
              B = parseInt(F.substr(6, 5)),
                u = I[B],
                L = l[l.length - 1][u],
                B = 0;
              4 > B;
              B++
            ) {
              if (
                ((K = parseInt(F.substr([11, 16, 21, 26][B], 5))),
                (K = I[K]),
                (H = l[l.length - 1][K]),
                void 0 !== L && void 0 !== H)
              )
                if (J[[u, K]])
                  for (J[[u, K]] += 1, H = 0; H < L.bonds.length; H++)
                    L.bonds[H] == K &&
                      ((M = J[[u, K]]), (L.bondOrder[H] = 4 <= M ? 1 : M));
                else if (
                  ((J[[u, K]] = 1),
                  0 == L.bonds.length || L.bonds[L.bonds.length - 1] != K)
                )
                  L.bonds.push(K), L.bondOrder.push(1);
            }
          else if ("HELIX " == B)
            (N = !0),
              (B = F.substr(19, 1)),
              (u = parseInt(F.substr(21, 4))),
              (L = F.substr(31, 1)),
              (F = parseInt(F.substr(33, 4))),
              q.push([B, u, L, F]);
          else if (e || "REMARK" != B || "BIOMT" != F.substr(13, 5))
            "CRYST1" == B &&
              ((u = parseFloat(F.substr(7, 8))),
              (B = parseFloat(F.substr(16, 8))),
              (L = parseFloat(F.substr(25, 8))),
              (K = parseFloat(F.substr(34, 6))),
              (H = parseFloat(F.substr(41, 6))),
              (F = parseFloat(F.substr(48, 6))),
              (g[g.length - 1].cryst = {
                a: u,
                b: B,
                c: L,
                alpha: K,
                beta: H,
                gamma: F,
              }));
          else {
            B = new $3Dmol.Matrix4();
            for (L = 1; 3 >= L; L++)
              if (
                ((F = D[C].replace(/^\s*/, "")), parseInt(F.substr(18, 1)) == L)
              )
                (B.elements[L - 1] = parseFloat(F.substr(23, 10))),
                  (B.elements[L - 1 + 4] = parseFloat(F.substr(33, 10))),
                  (B.elements[L - 1 + 8] = parseFloat(F.substr(43, 10))),
                  (B.elements[L - 1 + 12] = parseFloat(F.substr(53))),
                  C++;
              else
                for (; "BIOMT" == F.substr(13, 5); )
                  C++, (F = D[C].replace(/^\s*/, ""));
            B.elements[3] = 0;
            B.elements[7] = 0;
            B.elements[11] = 0;
            B.elements[15] = 1;
            g[g.length - 1].symmetries.push(B);
            C--;
          }
        }
        new Date().getTime();
        for (L = 0; L < l.length; L++) {
          d(l[L]);
          e || z(g[L].symmetries, y, l[L]);
          if (p || !N) new Date().getTime(), t(l[L]);
          for (C = s; C < l[L].length; C++)
            if (((u = l[L][C]), void 0 !== u)) {
              for (B = 0; B < x.length; B++)
                u.chain != x[B][0] ||
                  u.resi < x[B][1] ||
                  u.resi > x[B][3] ||
                  ((u.ss = "s"),
                  u.resi == x[B][1] && (u.ssbegin = !0),
                  u.resi == x[B][3] && (u.ssend = !0));
              for (B = 0; B < q.length; B++)
                u.chain != q[B][0] ||
                  u.resi < q[B][1] ||
                  u.resi > q[B][3] ||
                  ((u.ss = "h"),
                  u.resi == q[B][1]
                    ? (u.ssbegin = !0)
                    : u.resi == q[B][3] && (u.ssend = !0));
            }
        }
        return l;
      };
  b.pqr = b.PQR = function (b, c) {
    var l = [[]],
      m,
      p = !c.noSecondaryStructure;
    l.modelData = [{ symmetries: [] }];
    var e = [],
      y = b.split(/\r?\n|\r/),
      g,
      s;
    for (g = 0; g < y.length; g++)
      if (
        ((s = y[g].replace(/^\s*/, "")),
        (m = s.substr(0, 6)),
        0 == m.indexOf("END"))
      )
        if (c.multimodel) c.onemol || l.push([]);
        else break;
      else if ("ATOM  " == m || "HETATM" == m) {
        var u = parseInt(s.substr(6, 5));
        m = s.substr(12, 4).replace(/ /g, "");
        var x = s.substr(17, 3),
          q = s.substr(21, 1),
          z = parseInt(s.substr(22, 4)),
          A = s.substr(30).trim().split(/\s+/),
          D = parseFloat(A[0]),
          C = parseFloat(A[1]),
          B = parseFloat(A[2]),
          F = parseFloat(A[3]),
          A = parseFloat(A[4]),
          J = m[0];
        1 < m.length && m[1].toUpperCase() != m[1] && (J = m.substr(0, 2));
        hetflag = "H" == s[0] ? !0 : !1;
        e[u] = l[l.length - 1].length;
        l[l.length - 1].push({
          resn: x,
          x: D,
          y: C,
          z: B,
          elem: J,
          hetflag: hetflag,
          chain: q,
          resi: z,
          serial: u,
          atom: m,
          bonds: [],
          ss: "c",
          bondOrder: [],
          properties: { charge: F, partialCharge: F, radius: A },
          pdbline: s,
        });
      } else if ("CONECT" == m)
        for (
          m = parseInt(s.substr(6, 5)), u = l[l.length - 1][e[m]], m = 0;
          4 > m;
          m++
        )
          (x = parseInt(s.substr([11, 16, 21, 26][m], 5))),
            (q = l[l.length - 1][e[x]]),
            void 0 !== u &&
              void 0 !== q &&
              (u.bonds.push(e[x]), u.bondOrder.push(1));
    for (g = 0; g < l.length; g++) d(l[g]), p && t(l[g]);
    return l;
  };
  b.mmtf = b.MMTF = function (b, c) {
    var d = !c.keepH,
      m = MMTF.decode(b),
      p = [[]],
      e = (p.modelData = []),
      t = 0,
      g = 0,
      s = 0,
      u = m.secStructList,
      x = m.insCodeList,
      q = m.bFactorList,
      y = m.altLocList,
      A = m.occupancyList,
      D = m.bondAtomList,
      C = m.bondOrderList,
      B = m.numModels;
    if (0 == B) return p;
    c.multimodel || (B = 1);
    var F,
      J,
      L,
      K,
      H,
      M = !c.doAssembly,
      O = !c.duplicateAssemblyAtoms;
    F = c.assemblyIndex ? c.assemblyIndex : 0;
    var R = [];
    if (m.bioAssemblyList && 0 < m.bioAssemblyList.length) {
      var V = m.bioAssemblyList[F].transformList;
      F = 0;
      for (H = V.length; F < H; F++) {
        var P = new $3Dmol.Matrix4(V[F].matrix);
        P.transpose();
        R.push(P);
      }
    }
    for (H = V = 0; H < B; H++) {
      var P = m.chainsPerModel[H],
        S = p[p.length - 1],
        Q = [];
      e.push({ symmetries: R });
      for (F = 0; F < P; ++F) {
        var da = m.groupsPerChain[t],
          Y;
        J = m.chainIdList.subarray(4 * t, 4 * t + 4);
        Y = String.fromCharCode.apply(null, J).replace(/\0/g, "");
        var ba = g;
        for (J = 0; J < da; ++J) {
          var E = m.groupList[m.groupTypeList[g]];
          K = E.atomNameList.length;
          var aa = 0;
          u && (aa = u[g]);
          m.insCodeList && String.fromCharCode(x[g]);
          var T = m.groupIdList[g],
            Z = E.groupName,
            W = s;
          for (L = 0; L < K; ++L) {
            var U = E.elementList[L];
            if (!d || "H" != U) {
              var X = "";
              q && (X = q[s]);
              var ga = " ";
              y && (ga = String.fromCharCode(y[s]));
              var Ea = "";
              A && (Ea = A[s]);
              var Na = m.atomIdList[s],
                Fa = E.atomNameList[L],
                Ga = E.atomChargeList[L],
                Ta = m.xCoordList[s],
                Oa = m.yCoordList[s],
                Pa = m.zCoordList[s];
              Q[s] = S.length;
              S.push({
                resn: Z,
                x: Ta,
                y: Oa,
                z: Pa,
                elem: U,
                hetflag: 0 > aa,
                chain: Y,
                resi: T,
                icode: ga,
                rescode: T + (" " != ga ? "^" + ga : ""),
                serial: Na,
                atom: Fa,
                bonds: [],
                ss: 2 == aa ? "h" : 3 == aa ? "s" : "c",
                bondOrder: [],
                properties: { charge: Ga, occupancy: Ea },
                b: X,
              });
            }
            s += 1;
          }
          aa = E.bondAtomList;
          L = 0;
          for (K = E.bondOrderList.length; L < K; ++L)
            (Z = W + aa[2 * L]),
              (U = W + aa[2 * L + 1]),
              (T = E.bondOrderList[L]),
              (Z = Q[Z]),
              (U = Q[U]),
              (X = S[Z]),
              (ga = S[U]),
              X &&
                ga &&
                (X.bonds.push(U),
                X.bondOrder.push(T),
                ga.bonds.push(Z),
                ga.bondOrder.push(T));
          g += 1;
        }
        g = ba;
        for (J = 0; J < da; ++J) g += 1;
        t += 1;
      }
      if (D)
        for (L = V, K = D.length; L < K; L += 2) {
          Z = D[L];
          U = D[L + 1];
          T = C ? C[L / 2] : 1;
          if (Z >= s) {
            V = L;
            break;
          }
          Z = Q[Z];
          U = Q[U];
          X = S[Z];
          ga = S[U];
          X &&
            ga &&
            (X.bonds.push(U),
            X.bondOrder.push(T),
            ga.bonds.push(Z),
            ga.bondOrder.push(T));
        }
      c.multimodel && (c.onemol || p.push([]));
    }
    for (H = 0; H < p.length; H++) M || z(e[H].symmetries, O, p[H]);
    return p;
  };
  return b;
})();
$3Dmol = $3Dmol || {};
$3Dmol.partialCharges = {
  "ALA:N": -0.15,
  "ALA:CA": 0.1,
  "ALA:CB": 0,
  "ALA:C": 0.6,
  "ALA:O": -0.55,
  "ARG:N": -0.15,
  "ARG:CA": 0.1,
  "ARG:CB": 0,
  "ARG:CG": 0,
  "ARG:CD": 0.1,
  "ARG:NE": -0.1,
  "ARG:CZ": 0.5,
  "ARG:NH1": 0.25,
  "ARG:NH2": 0.25,
  "ARG:C": 0.6,
  "ARG:O": -0.55,
  "ASN:N": -0.15,
  "ASN:CA": 0.1,
  "ASN:CB": 0,
  "ASN:CG": 0.55,
  "ASN:OD1": -0.55,
  "ASN:ND2": 0,
  "ASN:C": 0.6,
  "ASN:O": -0.55,
  "ASP:N": -0.15,
  "ASP:CA": 0.1,
  "ASP:CB": 0,
  "ASP:CG": 0.14,
  "ASP:OD1": -0.57,
  "ASP:OD2": -0.57,
  "ASP:C": 0.6,
  "ASP:O": -0.55,
  "CYS:N": -0.15,
  "CYS:CA": 0.1,
  "CYS:CB": 0.19,
  "CYS:SG": -0.19,
  "CYS:C": 0.6,
  "CYS:O": -0.55,
  "GLN:N": -0.15,
  "GLN:CA": 0.1,
  "GLN:CB": 0,
  "GLN:CG": 0,
  "GLN:CD": 0.55,
  "GLN:OE1": -0.55,
  "GLN:NE2": 0,
  "GLN:C": 0.6,
  "GLN:O": -0.55,
  "GLU:N": -0.15,
  "GLU:CA": 0.1,
  "GLU:CB": 0,
  "GLU:CG": 0,
  "GLU:CD": 0.14,
  "GLU:OE1": -0.57,
  "GLU:OE2": -0.57,
  "GLU:C": 0.6,
  "GLU:O": -0.55,
  "GLY:N": -0.15,
  "GLY:CA": 0.1,
  "GLY:C": 0.6,
  "GLY:O": -0.55,
  "HIS:N": -0.15,
  "HIS:CA": 0.1,
  "HIS:CB": 0,
  "HIS:CG": 0.1,
  "HIS:ND1": -0.1,
  "HIS:CD2": 0.1,
  "HIS:NE2": -0.4,
  "HIS:CE1": 0.3,
  "HIS:C": 0.6,
  "HIS:O": -0.55,
  "ILE:N": -0.15,
  "ILE:CA": 0.1,
  "ILE:CB": 0,
  "ILE:CG2": 0,
  "ILE:CG1": 0,
  "ILE:CD": 0,
  "ILE:C": 0.6,
  "ILE:O": -0.55,
  "LEU:N": -0.15,
  "LEU:CA": 0.1,
  "LEU:CB": 0,
  "LEU:CG": 0,
  "LEU:CD1": 0,
  "LEU:CD2": 0,
  "LEU:C": 0.6,
  "LEU:O": -0.55,
  "LYS:N": -0.15,
  "LYS:CA": 0.1,
  "LYS:CB": 0,
  "LYS:CG": 0,
  "LYS:CD": 0,
  "LYS:CE": 0.25,
  "LYS:NZ": 0.75,
  "LYS:C": 0.6,
  "LYS:O": -0.55,
  "MET:N": -0.15,
  "MET:CA": 0.1,
  "MET:CB": 0,
  "MET:CG": 0.06,
  "MET:SD": -0.12,
  "MET:CE": 0.06,
  "MET:C": 0.6,
  "MET:O": -0.55,
  "PHE:N": -0.15,
  "PHE:CA": 0.1,
  "PHE:CB": 0,
  "PHE:CG": 0,
  "PHE:CD1": 0,
  "PHE:CD2": 0,
  "PHE:CE1": 0,
  "PHE:CE2": 0,
  "PHE:CZ": 0,
  "PHE:C": 0.6,
  "PHE:O": -0.55,
  "PRO:N": -0.25,
  "PRO:CD": 0.1,
  "PRO:CA": 0.1,
  "PRO:CB": 0,
  "PRO:CG": 0,
  "PRO:C": 0.6,
  "PRO:O": -0.55,
  "SER:N": -0.15,
  "SER:CA": 0.1,
  "SER:CB": 0.25,
  "SER:OG": -0.25,
  "SER:C": 0.6,
  "SER:O": -0.55,
  "THR:N": -0.15,
  "THR:CA": 0.1,
  "THR:CB": 0.25,
  "THR:OG1": -0.25,
  "THR:CG2": 0,
  "THR:C": 0.6,
  "THR:O": -0.55,
  "TRP:N": -0.15,
  "TRP:CA": 0.1,
  "TRP:CB": 0,
  "TRP:CG": -0.03,
  "TRP:CD2": 0.1,
  "TRP:CE2": -0.04,
  "TRP:CE3": -0.03,
  "TRP:CD1": 0.06,
  "TRP:NE1": -0.06,
  "TRP:CZ2": 0,
  "TRP:CZ3": 0,
  "TRP:CH2": 0,
  "TRP:C": 0.6,
  "TRP:O": -0.55,
  "TYR:N": -0.15,
  "TYR:CA": 0.1,
  "TYR:CB": 0,
  "TYR:CG": 0,
  "TYR:CD1": 0,
  "TYR:CE1": 0,
  "TYR:CD2": 0,
  "TYR:CE2": 0,
  "TYR:CZ": 0.25,
  "TYR:OH": -0.25,
  "TYR:C": 0.6,
  "TYR:O": -0.55,
  "VAL:N": -0.15,
  "VAL:CA": 0.1,
  "VAL:CB": 0,
  "VAL:CG1": 0,
  "VAL:CG2": 0,
  "VAL:C": 0.6,
  "VAL:O": -0.55,
};
$3Dmol.applyPartialCharges = function (b, c) {
  (c && "undefined" !== typeof b.partialCharge) ||
    (b.resn &&
      b.atom &&
      (b.properties.partialCharge =
        $3Dmol.partialCharges[b.resn + ":" + b.atom]));
};
(function () {});
$3Dmol.VolumeData = function (b, c, d) {
  this.unit = { x: 1, y: 1, z: 1 };
  this.origin = { x: 0, y: 0, z: 0 };
  this.size = { x: 0, y: 0, z: 0 };
  this.data = new Float32Array([]);
  this.matrix = null;
  c = c.toLowerCase();
  if (/\.gz$/.test(c)) {
    c = c.replace(/\.gz$/, "");
    try {
      b = pako.inflate(b);
    } catch (p) {
      console.log(p);
    }
  }
  if (this[c]) this[c](b);
  if (d) {
    if (d.negate)
      for (b = 0, c = this.data.length; b < c; b++)
        this.data[b] = -this.data[b];
    if (d.normalize) {
      var t = 0;
      b = 0;
      for (c = this.data.length; b < c; b++) t += this.data[b];
      d = t / this.data.length;
      console.log("computed mean: " + d);
      b = t = 0;
      for (c = this.data.length; b < c; b++)
        var A = this.data[b] - d, t = t + A * A;
      t /= this.data.length;
      console.log("Computed variance: " + t);
      b = 0;
      for (c = this.data.length; b < c; b++)
        this.data[b] = (this.data[b] - d) / t;
    }
  }
};
$3Dmol.VolumeData.prototype.getVal = function (b, c, d) {
  b -= this.origin.x;
  c -= this.origin.y;
  d -= this.origin.z;
  b /= this.unit.x;
  c /= this.unit.y;
  d /= this.unit.z;
  b = Math.round(b);
  c = Math.round(c);
  d = Math.round(d);
  return 0 > b ||
    b >= this.size.x ||
    0 > c ||
    c >= this.size.y ||
    0 > d ||
    d >= this.size.z
    ? 0
    : this.data[b * this.size.y * this.size.z + c * this.size.z + d];
};
$3Dmol.VolumeData.prototype.vasp = function (b) {
  var c = b.replace(/^\s+/, "").split(/[\n\r]/),
    d = $3Dmol.Parsers.vasp(b)[0].length;
  if (0 == d)
    console.log(
      "No good formating of CHG or CHGCAR file, not atomic information provided in the file."
    ),
      (this.data = []);
  else {
    var p = parseFloat(c[1]),
      t;
    t = c[2].replace(/^\s+/, "").split(/\s+/);
    b = new $3Dmol.Vector3(
      parseFloat(t[0]),
      parseFloat(t[1]),
      parseFloat(t[2])
    ).multiplyScalar(1.889725992 * p);
    t = c[3].replace(/^\s+/, "").split(/\s+/);
    var A = new $3Dmol.Vector3(
      parseFloat(t[0]),
      parseFloat(t[1]),
      parseFloat(t[2])
    ).multiplyScalar(1.889725992 * p);
    t = c[4].replace(/^\s+/, "").split(/\s+/);
    t = new $3Dmol.Vector3(
      parseFloat(t[0]),
      parseFloat(t[1]),
      parseFloat(t[2])
    ).multiplyScalar(1.889725992 * p);
    p =
      b.x * (A.y * t.z - t.y * A.z) -
      A.x * (b.y * t.z - t.y * b.z) +
      t.x * (b.y * A.z - A.y * b.z);
    p = Math.abs(p) / Math.pow(1.889725992, 3);
    p = 1 / p;
    c.splice(0, 8 + d + 1);
    var y = c[0].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
      d = Math.abs(y[0]),
      z = Math.abs(y[1]),
      y = Math.abs(y[2]),
      f = (this.origin = new $3Dmol.Vector3(0, 0, 0));
    this.size = { x: d, y: z, z: y };
    this.unit = new $3Dmol.Vector3(b.x, A.y, t.z);
    b = b.multiplyScalar(1 / (1.889725992 * d));
    A = A.multiplyScalar(1 / (1.889725992 * z));
    t = t.multiplyScalar(1 / (1.889725992 * y));
    if (0 != b.y || 0 != b.z || 0 != A.x || 0 != A.z || 0 != t.x || 0 != t.y)
      (this.matrix = new $3Dmol.Matrix4(
        b.x,
        A.x,
        t.x,
        0,
        b.y,
        A.y,
        t.y,
        0,
        b.z,
        A.z,
        t.z,
        0,
        0,
        0,
        0,
        1
      )),
        (this.matrix = this.matrix.multiplyMatrices(
          this.matrix,
          new $3Dmol.Matrix4().makeTranslation(f.x, f.y, f.z)
        )),
        (this.origin = new $3Dmol.Vector3(0, 0, 0)),
        (this.unit = new $3Dmol.Vector3(1, 1, 1));
    c.splice(0, 1);
    c = c.join(" ");
    c = c.replace(/^\s+/, "");
    c = c.split(/[\s\r]+/);
    c.splice(d * z * y + 1);
    c = new Float32Array(c);
    for (b = 0; b < c.length; b++) c[b] = c[b] * p * 0.036749309;
    this.data = c;
  }
};
$3Dmol.VolumeData.prototype.cube = function (b) {
  b = b.replace(/^\s+/, "").split(/[\n\r]+/);
  if (!(6 > b.length)) {
    var c = b[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
      d = parseFloat(c[0]),
      p = Math.abs(d),
      t = (this.origin = new $3Dmol.Vector3(
        parseFloat(c[1]),
        parseFloat(c[2]),
        parseFloat(c[3])
      )),
      c = b[3].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
      A = 0 < c[0] ? 0.529177 : 1;
    t.multiplyScalar(A);
    var y = Math.abs(c[0]),
      z = new $3Dmol.Vector3(
        parseFloat(c[1]),
        parseFloat(c[2]),
        parseFloat(c[3])
      ).multiplyScalar(A),
      c = b[4].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
      f = Math.abs(c[0]),
      h = new $3Dmol.Vector3(
        parseFloat(c[1]),
        parseFloat(c[2]),
        parseFloat(c[3])
      ).multiplyScalar(A),
      c = b[5].replace(/^\s+/, "").replace(/\s+/g, " ").split(" "),
      l = Math.abs(c[0]),
      c = new $3Dmol.Vector3(
        parseFloat(c[1]),
        parseFloat(c[2]),
        parseFloat(c[3])
      ).multiplyScalar(A);
    this.size = { x: y, y: f, z: l };
    this.unit = new $3Dmol.Vector3(z.x, h.y, c.z);
    if (0 != z.y || 0 != z.z || 0 != h.x || 0 != h.z || 0 != c.x || 0 != c.y)
      (this.matrix = new $3Dmol.Matrix4(
        z.x,
        h.x,
        c.x,
        0,
        z.y,
        h.y,
        c.y,
        0,
        z.z,
        h.z,
        c.z,
        0,
        0,
        0,
        0,
        1
      )),
        (this.matrix = this.matrix.multiplyMatrices(
          this.matrix,
          new $3Dmol.Matrix4().makeTranslation(t.x, t.y, t.z)
        )),
        (this.origin = new $3Dmol.Vector3(0, 0, 0)),
        (this.unit = new $3Dmol.Vector3(1, 1, 1));
    t = 6;
    0 > d && t++;
    b = b.splice(p + t).join(" ");
    b = b.replace(/^\s+/, "");
    b = b.split(/[\s\r]+/);
    this.data = new Float32Array(b);
  }
};
$3Dmol.VolumeData.prototype.ccp4 = function (b) {
  var c, d, p, t, A, y, z, f, h, l, m, w, e, G, g, s, u, x, q, N, I, D, C, B, F;
  b = new Int8Array(b);
  D = new Int32Array(b.buffer, 0, 56);
  var J = new Float32Array(b.buffer, 0, 56);
  d = new DataView(b.buffer);
  String.fromCharCode(
    d.getUint8(208),
    d.getUint8(209),
    d.getUint8(210),
    d.getUint8(211)
  );
  c = [d.getUint8(212), d.getUint8(213)];
  if (17 === c[0] && 17 === c[1])
    for (c = b.byteLength, t = 0; t < c; t += 4)
      d.setFloat32(t, d.getFloat32(t), !0);
  d = D[0];
  c = D[1];
  p = D[2];
  t = D[4];
  A = D[5];
  y = D[6];
  z = D[7];
  f = D[8];
  h = D[9];
  l = J[10];
  m = J[11];
  w = J[12];
  e = J[13];
  G = J[14];
  g = J[15];
  s = D[16];
  u = D[17];
  x = D[18];
  q = J[19];
  N = J[20];
  I = J[21];
  D = D[23];
  C = J[49];
  B = J[50];
  F = J[51];
  console.log(
    "Map has min,mean,average,rmsddv: " + q + "," + N + "," + I + "," + J[54]
  );
  J = [l, 0, 0];
  m = [m * Math.cos((Math.PI / 180) * g), m * Math.sin((Math.PI / 180) * g), 0];
  e = [
    w * Math.cos((Math.PI / 180) * G),
    (w *
      (Math.cos((Math.PI / 180) * e) -
        Math.cos((Math.PI / 180) * g) * Math.cos((Math.PI / 180) * G))) /
      Math.sin((Math.PI / 180) * g),
    0,
  ];
  e[2] = Math.sqrt(
    w * w * Math.sin((Math.PI / 180) * G) * Math.sin((Math.PI / 180) * G) -
      e[1] * e[1]
  );
  J = [0, J, m, e];
  z = [0, z, f, h];
  s = [0, s, u, x];
  this.matrix = new $3Dmol.Matrix4();
  this.matrix.set(
    J[s[1]][0] / z[s[1]],
    J[s[2]][0] / z[s[2]],
    J[s[3]][0] / z[s[3]],
    0,
    J[s[1]][1] / z[s[1]],
    J[s[2]][1] / z[s[2]],
    J[s[3]][1] / z[s[3]],
    0,
    J[s[1]][2] / z[s[1]],
    J[s[2]][2] / z[s[2]],
    J[s[3]][2] / z[s[3]],
    0,
    0,
    0,
    0,
    1
  );
  this.matrix = this.matrix.multiplyMatrices(
    this.matrix,
    new $3Dmol.Matrix4().makeTranslation(t + C, A + B, y + F)
  );
  this.origin = new $3Dmol.Vector3(0, 0, 0);
  this.unit = new $3Dmol.Vector3(1, 1, 1);
  this.size = { x: d, y: c, z: p };
  b = new Float32Array(b.buffer, 1024 + D);
  this.data = new Float32Array(d * c * p);
  for (t = 0; t < d; t++)
    for (A = 0; A < c; A++)
      for (y = 0; y < p; y++)
        this.data[(t * c + A) * p + y] = b[(y * c + A) * d + t];
};
$3Dmol.workerString = function () {
  self.onmessage = function (b) {
    b = b.data;
    var c = b.type;
    if (0 > c)
      (self.atomData = b.atoms),
        (self.volume = b.volume),
        (self.ps = new ProteinSurface());
    else {
      var d = self.ps;
      d.initparm(b.expandedExtent, 1 == c ? !1 : !0, self.volume);
      d.fillvoxels(self.atomData, b.extendedAtoms);
      d.buildboundary();
      if (4 === c || 2 === c)
        d.fastdistancemap(),
          d.boundingatom(!1),
          d.fillvoxelswaals(self.atomData, b.extendedAtoms);
      d.marchingcube(c);
      b = d.getFacesAndVertices(b.atomsToShow);
      self.postMessage(b);
    }
  };
}
  .toString()
  .replace(/(^.*?\{|\}$)/g, "");
$3Dmol.workerString +=
  "; var ProteinSurface=" +
  $3Dmol.ProteinSurface.toString().replace(
    /\$3Dmol.MarchingCube./g,
    "MarchingCube."
  );
$3Dmol.workerString +=
  ",MarchingCube=(" + $3Dmol.MarchingCubeInitializer.toString() + ")();";
$3Dmol.SurfaceWorker = window.URL.createObjectURL(
  new Blob([$3Dmol.workerString], { type: "text/javascript" })
);
$3Dmol.workerString = $3Dmol.workerString;
$3Dmol.SurfaceWorker = $3Dmol.SurfaceWorker;
