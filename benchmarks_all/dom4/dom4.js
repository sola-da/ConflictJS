/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function (e) {
  "use strict";
  function t() {
    return c.createDocumentFragment();
  }
  function n(e) {
    return c.createElement(e);
  }
  function r(e, t) {
    if (!e)
      throw new Error(
        "Failed to construct " +
          t +
          ": 1 argument required, but only 0 present."
      );
  }
  function i(e) {
    if (e.length === 1) return s(e[0]);
    for (var n = t(), r = R.call(e), i = 0; i < e.length; i++)
      n.appendChild(s(r[i]));
    return n;
  }
  function s(e) {
    return typeof e == "string" ? c.createTextNode(e) : e;
  }
  for (
    var o,
      u,
      a,
      f,
      l,
      c = e.document,
      h = Object.prototype.hasOwnProperty,
      p =
        Object.defineProperty ||
        function (e, t, n) {
          return (
            h.call(n, "value")
              ? (e[t] = n.value)
              : (h.call(n, "get") && e.__defineGetter__(t, n.get),
                h.call(n, "set") && e.__defineSetter__(t, n.set)),
            e
          );
        },
      d =
        [].indexOf ||
        function (t) {
          var n = this.length;
          while (n--) if (this[n] === t) break;
          return n;
        },
      v = function (e) {
        if (!e) throw "SyntaxError";
        if (w.test(e)) throw "InvalidCharacterError";
        return e;
      },
      m = function (e) {
        var t = typeof e.className == "undefined",
          n = t ? e.getAttribute("class") || "" : e.className,
          r = t || typeof n == "object",
          i = (r ? (t ? n : n.baseVal) : n).replace(b, "");
        i.length && q.push.apply(this, i.split(w)),
          (this._isSVG = r),
          (this._ = e);
      },
      g = {
        get: function () {
          return new m(this);
        },
        set: function () {},
      },
      y = "dom4-tmp-".concat(Math.random() * +new Date()).replace(".", "-"),
      b = /^\s+|\s+$/g,
      w = /\s+/,
      E = " ",
      S = "classList",
      x = function (t, n) {
        if (this.contains(t)) n || this.remove(t);
        else if (n === undefined || n) (n = !0), this.add(t);
        return !!n;
      },
      T = e.DocumentFragment && DocumentFragment.prototype,
      N = e.Node,
      C = (N || Element).prototype,
      k = e.CharacterData || N,
      L = k && k.prototype,
      A = e.DocumentType,
      O = A && A.prototype,
      M = (e.Element || N || e.HTMLElement).prototype,
      _ = e.HTMLSelectElement || n("select").constructor,
      D = _.prototype.remove,
      P = e.ShadowRoot,
      H = e.SVGElement,
      B = / /g,
      j = "\\ ",
      F = function (e) {
        var t = e === "querySelectorAll";
        return function (n) {
          var r,
            i,
            s,
            o,
            u,
            a,
            f = this.parentNode;
          if (f) {
            for (
              s = this.getAttribute("id") || y,
                o = s === y ? s : s.replace(B, j),
                a = n.split(","),
                i = 0;
              i < a.length;
              i++
            )
              a[i] = "#" + o + " " + a[i];
            n = a.join(",");
          }
          s === y && this.setAttribute("id", s),
            (u = (f || this)[e](n)),
            s === y && this.removeAttribute("id");
          if (t) {
            (i = u.length), (r = new Array(i));
            while (i--) r[i] = u[i];
          } else r = u;
          return r;
        };
      },
      I = function (e) {
        ("query" in e) || (e.query = M.query),
          ("queryAll" in e) || (e.queryAll = M.queryAll);
      },
      q = [
        "matches",
        M.matchesSelector ||
          M.webkitMatchesSelector ||
          M.khtmlMatchesSelector ||
          M.mozMatchesSelector ||
          M.msMatchesSelector ||
          M.oMatchesSelector ||
          function (t) {
            var n = this.parentNode;
            return !!n && -1 < d.call(n.querySelectorAll(t), this);
          },
        "closest",
        function (t) {
          var n = this,
            r;
          while ((r = n && n.matches) && !n.matches(t)) n = n.parentNode;
          return r ? n : null;
        },
        "prepend",
        function () {
          var t = this.firstChild,
            n = i(arguments);
          t ? this.insertBefore(n, t) : this.appendChild(n);
        },
        "append",
        function () {
          this.appendChild(i(arguments));
        },
        "before",
        function () {
          var t = this.parentNode;
          t && t.insertBefore(i(arguments), this);
        },
        "after",
        function () {
          var t = this.parentNode,
            n = this.nextSibling,
            r = i(arguments);
          t && (n ? t.insertBefore(r, n) : t.appendChild(r));
        },
        "replace",
        function () {
          this.replaceWith.apply(this, arguments);
        },
        "replaceWith",
        function () {
          var t = this.parentNode;
          t && t.replaceChild(i(arguments), this);
        },
        "remove",
        function () {
          var t = this.parentNode;
          t && t.removeChild(this);
        },
        "query",
        F("querySelector"),
        "queryAll",
        F("querySelectorAll"),
      ],
      R = q.slice,
      U = q.length;
    U;
    U -= 2
  ) {
    (u = q[U - 2]),
      u in M || (M[u] = q[U - 1]),
      u === "remove" &&
        (_.prototype[u] = function () {
          return 0 < arguments.length
            ? D.apply(this, arguments)
            : M.remove.call(this);
        }),
      /^(?:before|after|replace|replaceWith|remove)$/.test(u) &&
        (k && !(u in L) && (L[u] = q[U - 1]),
        A && !(u in O) && (O[u] = q[U - 1]));
    if (/^(?:append|prepend)$/.test(u))
      if (T) u in T || (T[u] = q[U - 1]);
      else
        try {
          t().constructor.prototype[u] = q[U - 1];
        } catch (z) {}
  }
  I(c);
  if (T) I(T);
  else
    try {
      I(t().constructor.prototype);
    } catch (z) {}
  P && I(P.prototype),
    n("a").matches("a") ||
      (M[u] = (function (e) {
        return function (n) {
          return e.call(this.parentNode ? this : t().appendChild(this), n);
        };
      })(M[u])),
    (m.prototype = {
      length: 0,
      add: function () {
        for (var t = 0, n; t < arguments.length; t++)
          (n = arguments[t]), this.contains(n) || q.push.call(this, u);
        this._isSVG
          ? this._.setAttribute("class", "" + this)
          : (this._.className = "" + this);
      },
      contains: (function (e) {
        return function (n) {
          return (U = e.call(this, (u = v(n)))), -1 < U;
        };
      })(
        [].indexOf ||
          function (e) {
            U = this.length;
            while (U-- && this[U] !== e);
            return U;
          }
      ),
      item: function (t) {
        return this[t] || null;
      },
      remove: function () {
        for (var t = 0, n; t < arguments.length; t++)
          (n = arguments[t]), this.contains(n) && q.splice.call(this, U, 1);
        this._isSVG
          ? this._.setAttribute("class", "" + this)
          : (this._.className = "" + this);
      },
      toggle: x,
      toString: function W() {
        return q.join.call(this, E);
      },
    }),
    H && !(S in H.prototype) && p(H.prototype, S, g),
    S in c.documentElement
      ? ((f = n("div")[S]),
        f.add("a", "b", "a"),
        "a b" != f &&
          ((a = f.constructor.prototype),
          "add" in a || (a = e.TemporaryTokenList.prototype),
          (l = function (e) {
            return function () {
              var t = 0;
              while (t < arguments.length) e.call(this, arguments[t++]);
            };
          }),
          (a.add = l(a.add)),
          (a.remove = l(a.remove)),
          (a.toggle = x)))
      : p(M, S, g),
    "contains" in C ||
      p(C, "contains", {
        value: function (e) {
          while (e && e !== this) e = e.parentNode;
          return this === e;
        },
      }),
    "head" in c ||
      p(c, "head", {
        get: function () {
          return o || (o = c.getElementsByTagName("head")[0]);
        },
      }),
    (function () {
      for (
        var t,
          n = e.requestAnimationFrame,
          r = e.cancelAnimationFrame,
          i = ["o", "ms", "moz", "webkit"],
          s = i.length;
        !r && s--;

      )
        (n = n || e[i[s] + "RequestAnimationFrame"]),
          (r =
            e[i[s] + "CancelAnimationFrame"] ||
            e[i[s] + "CancelRequestAnimationFrame"]);
      r ||
        (n
          ? ((t = n),
            (n = function (e) {
              var n = !0;
              return (
                t(function () {
                  n && e.apply(this, arguments);
                }),
                function () {
                  n = !1;
                }
              );
            }),
            (r = function (e) {
              e();
            }))
          : ((n = function (e) {
              return setTimeout(e, 15, 15);
            }),
            (r = function (e) {
              clearTimeout(e);
            }))),
        (e.requestAnimationFrame = n),
        (e.cancelAnimationFrame = r);
    })();
  try {
    new e.CustomEvent("?");
  } catch (z) {
    e.CustomEvent = (function (e, t) {
      function n(n, i) {
        var s = c.createEvent(e);
        if (typeof n != "string")
          throw new Error("An event name must be provided");
        return (
          e == "Event" && (s.initCustomEvent = r),
          i == null && (i = t),
          s.initCustomEvent(n, i.bubbles, i.cancelable, i.detail),
          s
        );
      }
      function r(e, t, n, r) {
        this.initEvent(e, t, n), (this.detail = r);
      }
      return n;
    })(e.CustomEvent ? "CustomEvent" : "Event", {
      bubbles: !1,
      cancelable: !1,
      detail: null,
    });
  }
  try {
    new Event("_");
  } catch (z) {
    (z = (function (e) {
      function t(e, t) {
        r(arguments.length, "Event");
        var n = c.createEvent("Event");
        return t || (t = {}), n.initEvent(e, !!t.bubbles, !!t.cancelable), n;
      }
      return (t.prototype = e.prototype), t;
    })(e.Event || function () {})),
      p(e, "Event", { value: z }),
      Event !== z && (Event = z);
  }
  try {
    new KeyboardEvent("_", {});
  } catch (z) {
    (z = (function (t) {
      function a(e) {
        for (
          var t = [],
            n = [
              "ctrlKey",
              "Control",
              "shiftKey",
              "Shift",
              "altKey",
              "Alt",
              "metaKey",
              "Meta",
              "altGraphKey",
              "AltGraph",
            ],
            r = 0;
          r < n.length;
          r += 2
        )
          e[n[r]] && t.push(n[r + 1]);
        return t.join(" ");
      }
      function f(e, t) {
        for (var n in t)
          t.hasOwnProperty(n) && !t.hasOwnProperty.call(e, n) && (e[n] = t[n]);
        return e;
      }
      function l(e, t, n) {
        try {
          t[e] = n[e];
        } catch (r) {}
      }
      function h(t, o) {
        r(arguments.length, "KeyboardEvent"), (o = f(o || {}, i));
        var u = c.createEvent(s),
          h = o.ctrlKey,
          p = o.shiftKey,
          d = o.altKey,
          v = o.metaKey,
          m = o.altGraphKey,
          g = n > 3 ? a(o) : null,
          y = String(o.key),
          b = String(o.char),
          w = o.location,
          E = o.keyCode || ((o.keyCode = y) && y.charCodeAt(0)) || 0,
          S = o.charCode || ((o.charCode = b) && b.charCodeAt(0)) || 0,
          x = o.bubbles,
          T = o.cancelable,
          N = o.repeat,
          C = o.locale,
          k = o.view || e,
          L;
        o.which || (o.which = o.keyCode);
        if ("initKeyEvent" in u) u.initKeyEvent(t, x, T, k, h, d, p, v, E, S);
        else if (0 < n && "initKeyboardEvent" in u) {
          L = [t, x, T, k];
          switch (n) {
            case 1:
              L.push(y, w, h, p, d, v, m);
              break;
            case 2:
              L.push(h, d, p, v, E, S);
              break;
            case 3:
              L.push(y, w, h, d, p, v, m);
              break;
            case 4:
              L.push(y, w, g, N, C);
              break;
            default:
              L.push(char, y, w, g, N, C);
          }
          u.initKeyboardEvent.apply(u, L);
        } else u.initEvent(t, x, T);
        for (y in u) i.hasOwnProperty(y) && u[y] !== o[y] && l(y, u, o);
        return u;
      }
      var n = 0,
        i = {
          char: "",
          key: "",
          location: 0,
          ctrlKey: !1,
          shiftKey: !1,
          altKey: !1,
          metaKey: !1,
          altGraphKey: !1,
          repeat: !1,
          locale: navigator.language,
          detail: 0,
          bubbles: !1,
          cancelable: !1,
          keyCode: 0,
          charCode: 0,
          which: 0,
        },
        s;
      try {
        var o = c.createEvent("KeyboardEvent");
        o.initKeyboardEvent("keyup", !1, !1, e, "+", 3, !0, !1, !0, !1, !1),
          (n =
            ((o.keyIdentifier || o.key) == "+" &&
              (o.keyLocation || o.location) == 3 &&
              (o.ctrlKey ? (o.altKey ? 1 : 3) : o.shiftKey ? 2 : 4)) ||
            9);
      } catch (u) {}
      return (
        (s = 0 < n ? "KeyboardEvent" : "Event"), (h.prototype = t.prototype), h
      );
    })(e.KeyboardEvent || function () {})),
      p(e, "KeyboardEvent", { value: z }),
      KeyboardEvent !== z && (KeyboardEvent = z);
  }
  try {
    new MouseEvent("_", {});
  } catch (z) {
    (z = (function (t) {
      function n(t, n) {
        r(arguments.length, "MouseEvent");
        var i = c.createEvent("MouseEvent");
        return (
          n || (n = {}),
          i.initMouseEvent(
            t,
            !!n.bubbles,
            !!n.cancelable,
            n.view || e,
            n.detail || 1,
            n.screenX || 0,
            n.screenY || 0,
            n.clientX || 0,
            n.clientY || 0,
            !!n.ctrlKey,
            !!n.altKey,
            !!n.shiftKey,
            !!n.metaKey,
            n.button || 0,
            n.relatedTarget || null
          ),
          i
        );
      }
      return (n.prototype = t.prototype), n;
    })(e.MouseEvent || function () {})),
      p(e, "MouseEvent", { value: z }),
      MouseEvent !== z && (MouseEvent = z);
  }
})(window),
  (function (e) {
    "use strict";
    function n() {}
    function r(e, t, n) {
      function i(e) {
        i.once &&
          (e.currentTarget.removeEventListener(e.type, t, i), (i.removed = !0)),
          i.passive && (e.preventDefault = r.preventDefault),
          typeof i.callback == "function"
            ? i.callback.call(this, e)
            : i.callback && i.callback.handleEvent(e),
          i.passive && delete e.preventDefault;
      }
      return (
        (i.type = e),
        (i.callback = t),
        (i.capture = !!n.capture),
        (i.passive = !!n.passive),
        (i.once = !!n.once),
        (i.removed = !1),
        i
      );
    }
    var t =
      e.WeakMap ||
      (function () {
        function s(e, i, s) {
          (n = s), (t = !1), (r = undefined), e.dispatchEvent(i);
        }
        function o(e) {
          this.value = e;
        }
        function u() {
          e++, (this.__ce__ = new i("@DOMMap:" + e + Math.random()));
        }
        var e = 0,
          t = !1,
          n = !1,
          r;
        return (
          (o.prototype.handleEvent = function (i) {
            (t = !0),
              n
                ? i.currentTarget.removeEventListener(i.type, this, !1)
                : (r = this.value);
          }),
          (u.prototype = {
            constructor: u,
            delete: function (n) {
              return s(n, this.__ce__, !0), t;
            },
            get: function (t) {
              s(t, this.__ce__, !1);
              var n = r;
              return (r = undefined), n;
            },
            has: function (n) {
              return s(n, this.__ce__, !1), t;
            },
            set: function (t, n) {
              return (
                s(t, this.__ce__, !0),
                t.addEventListener(this.__ce__.type, new o(n), !1),
                this
              );
            },
          }),
          u
        );
      })();
    (n.prototype = (Object.create || Object)(null)),
      (r.preventDefault = function () {});
    var i = e.CustomEvent,
      s = Object.prototype.hasOwnProperty,
      o = e.dispatchEvent,
      u = e.addEventListener,
      a = e.removeEventListener,
      f = 0,
      l = function () {
        f++;
      },
      c =
        [].indexOf ||
        function (t) {
          var n = this.length;
          while (n--) if (this[n] === t) break;
          return n;
        },
      h = function (e) {
        return "".concat(
          e.capture ? "1" : "0",
          e.passive ? "1" : "0",
          e.once ? "1" : "0"
        );
      },
      p,
      d;
    try {
      u("_", l, { once: !0 }),
        o(new i("_")),
        o(new i("_")),
        a("_", l, { once: !0 });
    } catch (v) {}
    f !== 1 &&
      (function () {
        function s(e) {
          return function (s, o, u) {
            if (u && typeof u != "boolean") {
              var a = i.get(this),
                f = h(u),
                l,
                p,
                d;
              a || i.set(this, (a = new n())),
                s in a || (a[s] = { handler: [], wrap: [] }),
                (p = a[s]),
                (l = c.call(p.handler, o)),
                l < 0
                  ? ((l = p.handler.push(o) - 1), (p.wrap[l] = d = new n()))
                  : (d = p.wrap[l]),
                f in d ||
                  ((d[f] = r(s, o, u)), e.call(this, s, d[f], d[f].capture));
            } else e.call(this, s, o, u);
          };
        }
        function o(e) {
          return function (n, r, s) {
            if (s && typeof s != "boolean") {
              var o = i.get(this),
                u,
                a,
                f,
                l;
              if (o && n in o) {
                (f = o[n]), (a = c.call(f.handler, r));
                if (-1 < a) {
                  (u = h(s)), (l = f.wrap[a]);
                  if (u in l) {
                    e.call(this, n, l[u], l[u].capture), delete l[u];
                    for (u in l) return;
                    f.handler.splice(a, 1),
                      f.wrap.splice(a, 1),
                      f.handler.length === 0 && delete o[n];
                  }
                }
              }
            } else e.call(this, n, r, s);
          };
        }
        var i = new t();
        (p = function (e) {
          if (!e) return;
          var t = e.prototype;
          (t.addEventListener = s(t.addEventListener)),
            (t.removeEventListener = o(t.removeEventListener));
        }),
          e.EventTarget
            ? p(EventTarget)
            : (p(e.Text),
              p(e.Element || e.HTMLElement),
              p(e.HTMLDocument),
              p(e.Window || { prototype: e }),
              p(e.XMLHttpRequest));
      })();
  })(self);
