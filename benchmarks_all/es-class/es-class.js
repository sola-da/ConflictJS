/*! (C) Andrea Giammarchi - MIT Style License */
var Class =
  Class ||
  (function (e) {
    "use strict";
    function O(e, t, n) {
      for (var r, s = [], o = 0; o < e.length; o++)
        (r = U(e[o])), d.call(r, i) && s.push(r[i]), D(r, t, n, !1, !1);
      return s;
    }
    function M(e) {
      for (var t, n, r, i = v(S(e)), s = x(e), o = 0; o < s.length; o++)
        (t = s[o]), (n = y(e, t)), d.call(n, a) && P(n, M), g(i, t, n);
      return i;
    }
    function _(e, t) {
      for (var n, r, i, s, o = x(e), u = 0; u < o.length; u++)
        (n = o[u]),
          (r = y(e, n)),
          d.call(t, n)
            ? d.call(r, a) &&
              ((i = r[a]),
              q(i) &&
                ((r = y(t, n)), d.call(r, a) && ((s = r[a]), q(s) && _(i, s))))
            : (d.call(r, a) && P(r, M), g(t, n, r));
    }
    function D(e, t, n, r, i) {
      for (
        var s, o = typeof e != "function", u = x(e), a = 0;
        a < u.length;
        a++
      )
        (s = u[a]),
          (o || C.call(N, s) < 0) &&
            I(s, i) &&
            (d.call(t, s) && X("duplicated: " + s.toString()),
            z(n, t, s, y(e, s), r));
    }
    function P(e, t) {
      var n = e[a];
      q(n) && (e[a] = t(n));
    }
    function H(e, t) {
      var n = function () {};
      return e && "" + t != "" + n
        ? function () {
            return t.apply(this, arguments);
          }
        : n;
    }
    function B(e, t, n, r) {
      var i = F(t, r);
      g(e, t, { enumerable: !1, configurable: i, writable: i, value: n });
    }
    function j(e) {
      return e ? (e < 65 || 90 < e) && (e < 97 || 122 < e) && e !== 95 : !0;
    }
    function F(e, t) {
      return t ? !R(e) : !0;
    }
    function I(e, a) {
      return (
        e !== t &&
        e !== n &&
        e !== r &&
        e !== s &&
        e !== o &&
        e !== u &&
        e !== f &&
        (a || e !== i)
      );
    }
    function q(e) {
      return e != null && typeof e == "object";
    }
    function R(e) {
      for (var t, n = 0; n < e.length; n++) {
        t = e.charCodeAt(n);
        if ((t < 65 || 90 < t) && t !== 95) return !1;
      }
      return !0;
    }
    function U(t) {
      if (q(t)) return t;
      var n, r, s, o, u;
      if (t.isClass) {
        t.length && X((t.name || "Class") + " should not expect arguments");
        for (o = { init: t }, u = t.prototype; u && u !== e.prototype; u = S(u))
          for (n = 0, s = x(u); n < s.length; n++)
            (r = s[n]), I(r, !1) && !d.call(o, r) && g(o, r, y(u, r));
      } else
        for (n = 0, o = {}, u = t({}), s = x(u); n < s.length; n++)
          (r = s[n]),
            r !== i &&
              (~r.toString().indexOf("mixin:init") && T(u[r])
                ? (o.init = u[r][0])
                : g(o, r, y(u, r)));
      return o;
    }
    function z(e, n, r, i, s) {
      var o = d.call(i, a),
        u,
        f;
      if (s) {
        if (d.call(n, r)) {
          e && q(n[r]) && q(e[t][r]) && _(e[t][r], n[r]);
          return;
        }
        o && P(i, M);
      } else
        o
          ? ((f = i[a]),
            typeof f == "function" && L(f) && (i[a] = V(e, r, f, s)))
          : ($(e, r, i, "get"), $(e, r, i, "set"));
      (u = F(r, s)),
        (i.enumerable = !1),
        (i.configurable = u),
        o && (i.writable = u),
        g(n, r, i);
    }
    function W(e, t) {
      for (var n, r, i = 0; i < e.length; i++) {
        n = e[i];
        for (r in n)
          d.call(n, r) &&
            !d.call(t, r) &&
            X(r.toString() + " is not implemented");
      }
    }
    function X(e) {
      try {
        console.warn(e);
      } catch (t) {}
    }
    function V(e, t, n, r) {
      return function () {
        d.call(this, u) || B(this, u, null, r);
        var i = this[u],
          s = (this[u] = e[t]),
          o = n.apply(this, arguments);
        return (this[u] = i), o;
      };
    }
    function $(e, t, n, r, i) {
      d.call(n, r) && L(n[r]) && (n[r] = V(y(e, t), r, n[r], i));
    }
    var t = "constructor",
      n = "extends",
      r = "implements",
      i = "init",
      s = "prototype",
      o = "static",
      u = "super",
      a = "value",
      f = "with",
      l = "__proto__",
      c = [
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ],
      h =
        {}[c[2]] ||
        function (e) {
          for (var t in this) if (e === t) return this.hasOwnProperty(e);
          return !1;
        },
      p = !h.call({ valueOf: 0 }, c[5]),
      d = e[c[0]],
      v =
        e.create ||
        function (e) {
          var t = this instanceof v;
          return (v[s] = t ? m : e), t ? this : new v();
        },
      m = v[s],
      g = e.defineProperty,
      y = e.getOwnPropertyDescriptor,
      b =
        e.getOwnPropertyNames ||
        function (e) {
          var t = [],
            n,
            r;
          for (r in e) d.call(e, r) && t.push(r);
          if (p)
            for (n = 0; n < c.length; n++)
              (r = c[n]), d.call(e, r) && t.push(r);
          return t;
        },
      w =
        e.getOwnPropertySymbols ||
        function () {
          return [];
        },
      E = e.getPrototypeOf,
      S =
        E ||
        function (e) {
          return e[l] || null;
        },
      x = function (e) {
        return b(e).concat(w(e));
      },
      T =
        Array.isArray ||
        function (t) {
          return e[s].toString.call(t) === "[object Array]";
        },
      N = b(function () {}).concat("arguments"),
      C =
        N.indexOf ||
        function (e) {
          for (var t = this.length; t-- && this[t] !== e; );
          return t;
        },
      k = { value: !0 },
      L =
        (
          "" +
          function () {
            this["super"]();
          }
        ).indexOf(u) < 0
          ? function () {
              return !0;
            }
          : function (e) {
              var t = "" + e,
                n = t.indexOf(u);
              return n < 0
                ? !1
                : j(t.charCodeAt(n - 1)) && j(t.charCodeAt(n + 5));
            };
    try {
      g({}, "{}", {});
    } catch (A) {
      "__defineGetter__" in {}
        ? ((g = function (e, t, n) {
            return (
              d.call(n, a)
                ? (e[t] = n[a])
                : (d.call(n, "get") && e.__defineGetter__(t, n.get),
                  d.call(n, "set") && e.__defineSetter__(t, n.set)),
              e
            );
          }),
          (y = function (e, t) {
            var n = e.__lookupGetter__(t),
              r = e.__lookupSetter__(t),
              i = {};
            return (
              n || r ? (n && (i.get = n), r && (i.set = r)) : (i[a] = e[t]), i
            );
          }))
        : ((g = function (e, t, n) {
            return (e[t] = n[a]), e;
          }),
          (y = function (e, t) {
            return { value: e[t] };
          }));
    }
    return function (e) {
      var i = d.call(e, t),
        u = d.call(e, n),
        a = u && e[n],
        c = u && typeof a == "function",
        h = c ? a[s] : a,
        p = i ? e[t] : H(c, a),
        m = u && i && L(p),
        y = u ? v(h) : p[s],
        b,
        w;
      return (
        m && (p = V(h, t, p, !1)),
        d.call(e, f) &&
          ((b = O([].concat(e[f]), y, h)),
          (w = b.length),
          w &&
            ((p = (function (e) {
              return function () {
                var t = 0;
                while (t < w) b[t++].call(this);
                return e.apply(this, arguments);
              };
            })(p)),
            (p[s] = y))),
        d.call(e, o) && D(e[o], p, h, !0, !0),
        u && (a !== h && D(a, p, h, !0, !0), (p[s] = y)),
        y[t] !== p && B(y, t, p, !1),
        D(e, y, h, !1, !0),
        d.call(e, r) && W([].concat(e[r]), y),
        u && !E && B(y, l, h, !1),
        g(p, "isClass", k)
      );
    };
  })(Object);
