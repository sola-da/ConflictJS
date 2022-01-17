/**
 * craftyjs 0.6.3
 * http://craftyjs.com/
 *
 * Copyright 2014, Louis Stowasser
 * Dual licensed under the MIT or GPL licenses.
 */

!(function a(b, c, d) {
  function e(g, h) {
    if (!c[g]) {
      if (!b[g]) {
        var i = "function" == typeof require && require;
        if (!h && i) return i(g, !0);
        if (f) return f(g, !0);
        throw new Error("Cannot find module '" + g + "'");
      }
      var j = (c[g] = { exports: {} });
      b[g][0].call(
        j.exports,
        function (a) {
          var c = b[g][1][a];
          return e(c ? c : a);
        },
        j,
        j.exports,
        a,
        b,
        c,
        d
      );
    }
    return c[g].exports;
  }
  for (
    var f = "function" == typeof require && require, g = 0;
    g < d.length;
    g++
  )
    e(d[g]);
  return e;
})(
  {
    1: [
      function (a) {
        var b = a("./core.js"),
          c = (window.document, a("./HashMap.js"));
        (b._rectPool = (function () {
          var a = [],
            b = 0;
          return {
            get: function (c, d, e, f) {
              a.length <= b && a.push({});
              var g = a[b++];
              return (g._x = c), (g._y = d), (g._w = e), (g._h = f), g;
            },
            copy: function (c) {
              a.length <= b && a.push({});
              var d = a[b++];
              return (
                (d._x = c._x), (d._y = c._y), (d._w = c._w), (d._h = c._h), d
              );
            },
            recycle: function () {
              b--;
            },
          };
        })()),
          (b.map = new c());
        var d = Math,
          e = (d.cos, d.sin, d.PI),
          f = e / 180;
        b.extend({
          zeroFill: function (a, b) {
            return (
              (b -= a.toString().length),
              b > 0
                ? new Array(b + (/\./.test(a) ? 2 : 1)).join("0") + a
                : a.toString()
            );
          },
        }),
          b.c("2D", {
            _x: 0,
            _y: 0,
            _w: 0,
            _h: 0,
            _z: 0,
            _rotation: 0,
            _alpha: 1,
            _visible: !0,
            _globalZ: null,
            _origin: null,
            _mbr: null,
            _entry: null,
            _children: null,
            _parent: null,
            _changed: !1,
            _define2DProperties: function () {
              Object.defineProperty(this, "x", {
                set: function (a) {
                  this._attr("_x", a);
                },
                get: function () {
                  return this._x;
                },
                configurable: !0,
                enumerable: !0,
              }),
                Object.defineProperty(this, "_x", { enumerable: !1 }),
                Object.defineProperty(this, "y", {
                  set: function (a) {
                    this._attr("_y", a);
                  },
                  get: function () {
                    return this._y;
                  },
                  configurable: !0,
                  enumerable: !0,
                }),
                Object.defineProperty(this, "_y", { enumerable: !1 }),
                Object.defineProperty(this, "w", {
                  set: function (a) {
                    this._attr("_w", a);
                  },
                  get: function () {
                    return this._w;
                  },
                  configurable: !0,
                  enumerable: !0,
                }),
                Object.defineProperty(this, "_w", { enumerable: !1 }),
                Object.defineProperty(this, "h", {
                  set: function (a) {
                    this._attr("_h", a);
                  },
                  get: function () {
                    return this._h;
                  },
                  configurable: !0,
                  enumerable: !0,
                }),
                Object.defineProperty(this, "_h", { enumerable: !1 }),
                Object.defineProperty(this, "z", {
                  set: function (a) {
                    this._attr("_z", a);
                  },
                  get: function () {
                    return this._z;
                  },
                  configurable: !0,
                  enumerable: !0,
                }),
                Object.defineProperty(this, "_z", { enumerable: !1 }),
                Object.defineProperty(this, "rotation", {
                  set: function (a) {
                    this._attr("_rotation", a);
                  },
                  get: function () {
                    return this._rotation;
                  },
                  configurable: !0,
                  enumerable: !0,
                }),
                Object.defineProperty(this, "_rotation", { enumerable: !1 }),
                Object.defineProperty(this, "alpha", {
                  set: function (a) {
                    this._attr("_alpha", a);
                  },
                  get: function () {
                    return this._alpha;
                  },
                  configurable: !0,
                  enumerable: !0,
                }),
                Object.defineProperty(this, "_alpha", { enumerable: !1 }),
                Object.defineProperty(this, "visible", {
                  set: function (a) {
                    this._attr("_visible", a);
                  },
                  get: function () {
                    return this._visible;
                  },
                  configurable: !0,
                  enumerable: !0,
                }),
                Object.defineProperty(this, "_visible", { enumerable: !1 });
            },
            init: function () {
              (this._globalZ = this[0]),
                (this._origin = { x: 0, y: 0 }),
                (this._bx1 = 0),
                (this._bx2 = 0),
                (this._by1 = 0),
                (this._by2 = 0),
                (this._children = []),
                this._define2DProperties(),
                (this._entry = b.map.insert(this)),
                this.bind("Move", function (a) {
                  var b = this._cbr || this._mbr || this;
                  this._entry.update(b),
                    this._children.length > 0 && this._cascade(a);
                }),
                this.bind("Rotate", function (a) {
                  var b = this._cbr || this._mbr || this;
                  this._entry.update(b),
                    this._children.length > 0 && this._cascade(a);
                }),
                this.bind("Remove", function () {
                  if (this._children) {
                    for (var a = 0; a < this._children.length; a++)
                      delete this._children[a]._parent,
                        this._children[a].destroy &&
                          this._children[a].destroy();
                    this._children = [];
                  }
                  this._parent && this._parent.detach(this),
                    b.map.remove(this),
                    this.detach();
                });
            },
            offsetBoundary: function (a, b, c, d) {
              return (
                1 === arguments.length && (b = c = d = a),
                (this._bx1 = a),
                (this._bx2 = c),
                (this._by1 = b),
                (this._by2 = d),
                this.trigger("BoundaryOffset"),
                this._calculateMBR(),
                this
              );
            },
            _calculateMBR: function () {
              var a = this._origin.x + this._x,
                b = this._origin.y + this._y,
                c = -this._rotation * f,
                d = this._x - this._bx1 - a,
                e = this._x + this._w + this._bx2 - a,
                g = this._y - this._by1 - b,
                h = this._y + this._h + this._by2 - b,
                i = Math.cos(c),
                j = Math.sin(c);
              (i = 1e-10 > i && i > -1e-10 ? 0 : i),
                (j = 1e-10 > j && j > -1e-10 ? 0 : j);
              var k = d * i + g * j,
                l = -d * j + g * i,
                m = e * i + g * j,
                n = -e * j + g * i,
                o = e * i + h * j,
                p = -e * j + h * i,
                q = d * i + h * j,
                r = -d * j + h * i,
                s = Math.floor(Math.min(k, m, o, q) + a),
                t = Math.floor(Math.min(l, n, p, r) + b),
                u = Math.ceil(Math.max(k, m, o, q) + a),
                v = Math.ceil(Math.max(l, n, p, r) + b);
              if (
                (this._mbr
                  ? ((this._mbr._x = s),
                    (this._mbr._y = t),
                    (this._mbr._w = u - s),
                    (this._mbr._h = v - t))
                  : (this._mbr = { _x: s, _y: t, _w: u - s, _h: v - t }),
                this._cbr)
              ) {
                var w = this._cbr,
                  x = w.cx,
                  y = w.cy,
                  z = w.r,
                  A = a + (x + this._x - a) * i + (y + this._y - b) * j,
                  B = b - (x + this._x - a) * j + (y + this._y - b) * i;
                (w._x = Math.min(A - z, s)),
                  (w._y = Math.min(B - z, t)),
                  (w._w = Math.max(A + z, u) - w._x),
                  (w._h = Math.max(B + z, v) - w._y);
              }
            },
            _rotate: function (a) {
              var b = -1 * (a % 360),
                c = this._rotation - a;
              if (0 !== c) {
                this._rotation = a;
                var d = b * f,
                  e = {
                    x: this._origin.x + this._x,
                    y: this._origin.y + this._y,
                  };
                this._calculateMBR();
                {
                  var g = c * f;
                  Math.cos(d), Math.sin(d);
                }
                this.trigger("Rotate", {
                  cos: Math.cos(g),
                  sin: Math.sin(g),
                  deg: c,
                  rad: g,
                  o: e,
                });
              }
            },
            area: function () {
              return this._w * this._h;
            },
            intersect: function (a, b, c, d) {
              var e,
                f = this._mbr || this;
              return (
                (e = "object" == typeof a ? a : { x: a, y: b, w: c, h: d }),
                f._x < e.x + e.w &&
                  f._x + f._w > e.x &&
                  f._y < e.y + e.h &&
                  f._h + f._y > e.y
              );
            },
            within: function (a, b, c, d) {
              var e,
                f = this._mbr || this;
              return (
                (e = "object" == typeof a ? a : { _x: a, _y: b, _w: c, _h: d }),
                e._x <= f._x &&
                  e._x + e._w >= f._x + f._w &&
                  e._y <= f._y &&
                  e._y + e._h >= f._y + f._h
              );
            },
            contains: function (a, b, c, d) {
              var e,
                f = this._mbr || this;
              return (
                (e = "object" == typeof a ? a : { _x: a, _y: b, _w: c, _h: d }),
                e._x >= f._x &&
                  e._x + e._w <= f._x + f._w &&
                  e._y >= f._y &&
                  e._y + e._h <= f._y + f._h
              );
            },
            pos: function () {
              return { _x: this._x, _y: this._y, _w: this._w, _h: this._h };
            },
            mbr: function () {
              return this._mbr
                ? {
                    _x: this._mbr._x,
                    _y: this._mbr._y,
                    _w: this._mbr._w,
                    _h: this._mbr._h,
                  }
                : this.pos();
            },
            isAt: function (a, b) {
              if (this.mapArea) return this.mapArea.containsPoint(a, b);
              if (this.map) return this.map.containsPoint(a, b);
              var c = this._mbr || this;
              return (
                c._x <= a && c._x + c._w >= a && c._y <= b && c._y + c._h >= b
              );
            },
            move: function (a, b) {
              return (
                "n" === a.charAt(0) && (this.y -= b),
                "s" === a.charAt(0) && (this.y += b),
                ("e" === a || "e" === a.charAt(1)) && (this.x += b),
                ("w" === a || "w" === a.charAt(1)) && (this.x -= b),
                this
              );
            },
            shift: function (a, b, c, d) {
              return (
                a && (this.x += a),
                b && (this.y += b),
                c && (this.w += c),
                d && (this.h += d),
                this
              );
            },
            _cascade: function (a) {
              if (a) {
                var b,
                  c = 0,
                  d = this._children,
                  e = d.length;
                if ("cos" in a || "sin" in a)
                  for (; e > c; ++c) (b = d[c]), "rotate" in b && b.rotate(a);
                else
                  for (
                    var f = this._x - a._x,
                      g = this._y - a._y,
                      h = this._w - a._w,
                      i = this._h - a._h;
                    e > c;
                    ++c
                  )
                    (b = d[c]), b.shift(f, g, h, i);
              }
            },
            attach: function () {
              for (
                var a, b = 0, c = arguments, d = arguments.length;
                d > b;
                ++b
              )
                (a = c[b]),
                  a._parent && a._parent.detach(a),
                  (a._parent = this),
                  this._children.push(a);
              return this;
            },
            detach: function (a) {
              var b;
              if (!a) {
                for (b = 0; b < this._children.length; b++)
                  this._children[b]._parent = null;
                return (this._children = []), this;
              }
              for (b = 0; b < this._children.length; b++)
                this._children[b] == a && this._children.splice(b, 1);
              return (a._parent = null), this;
            },
            origin: function (a, b) {
              if ("string" == typeof a)
                if ("centre" === a || "center" === a || -1 === a.indexOf(" "))
                  (a = this._w / 2), (b = this._h / 2);
                else {
                  var c = a.split(" ");
                  "top" === c[0]
                    ? (b = 0)
                    : "bottom" === c[0]
                    ? (b = this._h)
                    : ("middle" === c[0] ||
                        "center" === c[1] ||
                        "centre" === c[1]) &&
                      (b = this._h / 2),
                    "center" === c[1] || "centre" === c[1] || "middle" === c[1]
                      ? (a = this._w / 2)
                      : "left" === c[1]
                      ? (a = 0)
                      : "right" === c[1] && (a = this._w);
                }
              return (this._origin.x = a), (this._origin.y = b), this;
            },
            flip: function (a) {
              return (
                (a = a || "X"),
                this["_flip" + a] ||
                  ((this["_flip" + a] = !0), this.trigger("Invalidate")),
                this
              );
            },
            unflip: function (a) {
              return (
                (a = a || "X"),
                this["_flip" + a] &&
                  ((this["_flip" + a] = !1), this.trigger("Invalidate")),
                this
              );
            },
            rotate: function (a) {
              var b, c;
              (b =
                (this._x + this._origin.x - a.o.x) * a.cos +
                (this._y + this._origin.y - a.o.y) * a.sin +
                (a.o.x - this._origin.x)),
                (c =
                  (this._y + this._origin.y - a.o.y) * a.cos -
                  (this._x + this._origin.x - a.o.x) * a.sin +
                  (a.o.y - this._origin.y)),
                this._attr("_rotation", this._rotation - a.deg),
                this._attr("_x", b),
                this._attr("_y", c);
            },
            _attr: function (a, c) {
              if (this[a] !== c) {
                var d,
                  e = b._rectPool.copy(this);
                if ("_rotation" === a) this._rotate(c);
                else if ("_z" === a)
                  (this._globalZ = parseInt(c + b.zeroFill(this[0], 5), 10)),
                    this.trigger("reorder");
                else if ("_x" === a || "_y" === a)
                  (d = this._mbr),
                    d &&
                      ((d[a] -= this[a] - c),
                      this._cbr && (this._cbr[a] -= this[a] - c)),
                    (this[a] = c),
                    this.trigger("Move", e);
                else if ("_h" === a || "_w" === a) {
                  d = this._mbr;
                  var f = this[a];
                  (this[a] = c),
                    d && this._calculateMBR(),
                    "_w" === a
                      ? this.trigger("Resize", { axis: "w", amount: c - f })
                      : "_h" === a &&
                        this.trigger("Resize", { axis: "h", amount: c - f }),
                    this.trigger("Move", e);
                }
                (this[a] = c),
                  this.trigger("Invalidate"),
                  b._rectPool.recycle(e);
              }
            },
          }),
          b.c("Gravity", {
            _gravityConst: 0.2,
            _gy: 0,
            _falling: !0,
            _anti: null,
            init: function () {
              this.requires("2D");
            },
            gravity: function (a) {
              return (
                a && (this._anti = a),
                isNaN(this._jumpSpeed) && (this._jumpSpeed = 0),
                this.bind("EnterFrame", this._enterFrame),
                this
              );
            },
            gravityConst: function (a) {
              return (this._gravityConst = a), this;
            },
            _enterFrame: function () {
              this._falling
                ? ((this._gy += this._gravityConst),
                  (this.y += this._gy),
                  this.trigger("Moved", { x: this._x, y: this._y - this._gy }))
                : (this._gy = 0);
              var a,
                c,
                d,
                e = !1,
                f = this.pos(),
                g = 0;
              for (
                f._y++,
                  f.x = f._x,
                  f.y = f._y,
                  f.w = f._w,
                  f.h = f._h,
                  c = b.map.search(f),
                  d = c.length;
                d > g;
                ++g
              )
                if (
                  ((a = c[g]),
                  a !== this && a.has(this._anti) && a.intersect(f))
                ) {
                  e = a;
                  break;
                }
              e
                ? this._falling &&
                  (this._gy > this._jumpSpeed || !this._up) &&
                  this.stopFalling(e)
                : (this._falling = !0);
            },
            stopFalling: function (a) {
              a && (this.y = a._y - this._h),
                (this._falling = !1),
                this._up && (this._up = !1),
                this.trigger("hit");
            },
            antigravity: function () {
              this.unbind("EnterFrame", this._enterFrame);
            },
          }),
          (b.polygon = function (a) {
            arguments.length > 1 &&
              (a = Array.prototype.slice.call(arguments, 0)),
              (this.points = a);
          }),
          (b.polygon.prototype = {
            containsPoint: function (a, b) {
              var c,
                d,
                e = this.points,
                f = !1;
              for (c = 0, d = e.length - 1; c < e.length; d = c++)
                e[c][1] > b != e[d][1] > b &&
                  a <
                    ((e[d][0] - e[c][0]) * (b - e[c][1])) /
                      (e[d][1] - e[c][1]) +
                      e[c][0] &&
                  (f = !f);
              return f;
            },
            shift: function (a, b) {
              for (var c, d = 0, e = this.points.length; e > d; d++)
                (c = this.points[d]), (c[0] += a), (c[1] += b);
            },
            rotate: function (a) {
              for (var b, c, d, e = 0, f = this.points.length; f > e; e++)
                (b = this.points[e]),
                  (c = a.o.x + (b[0] - a.o.x) * a.cos + (b[1] - a.o.y) * a.sin),
                  (d = a.o.y - (b[0] - a.o.x) * a.sin + (b[1] - a.o.y) * a.cos),
                  (b[0] = c),
                  (b[1] = d);
            },
          }),
          (b.circle = function (a, b, c) {
            (this.x = a), (this.y = b), (this.radius = c), (this.points = []);
            for (var d, e = 0; 8 > e; e++)
              (d = (e * Math.PI) / 4),
                (this.points[e] = [
                  this.x + Math.sin(d) * c,
                  this.y + Math.cos(d) * c,
                ]);
          }),
          (b.circle.prototype = {
            containsPoint: function (a, b) {
              var c = this.radius,
                d = (Math.sqrt, this.x - a),
                e = this.y - b;
              return c * c > d * d + e * e;
            },
            shift: function (a, b) {
              (this.x += a), (this.y += b);
              for (var c, d = 0, e = this.points.length; e > d; d++)
                (c = this.points[d]), (c[0] += a), (c[1] += b);
            },
            rotate: function () {},
          }),
          (b.matrix = function (a) {
            (this.mtx = a),
              (this.width = a[0].length),
              (this.height = a.length);
          }),
          (b.matrix.prototype = {
            x: function (a) {
              if (this.width == a.height) {
                for (var c = [], d = 0; d < this.height; d++) {
                  c[d] = [];
                  for (var e = 0; e < a.width; e++) {
                    for (var f = 0, g = 0; g < this.width; g++)
                      f += this.mtx[d][g] * a.mtx[g][e];
                    c[d][e] = f;
                  }
                }
                return new b.matrix(c);
              }
            },
            e: function (a, b) {
              return 1 > a ||
                a > this.mtx.length ||
                1 > b ||
                b > this.mtx[0].length
                ? null
                : this.mtx[a - 1][b - 1];
            },
          });
      },
      { "./HashMap.js": 4, "./core.js": 10 },
    ],
    2: [
      function (a) {
        var b = a("./core.js"),
          c = window.document;
        b.c("DOM", {
          _element: null,
          _cssStyles: null,
          avoidCss3dTransforms: !1,
          init: function () {
            (this._cssStyles = {
              visibility: "",
              left: "",
              top: "",
              width: "",
              height: "",
              zIndex: "",
              opacity: "",
              transformOrigin: "",
              transform: "",
            }),
              (this._element = c.createElement("div")),
              b.stage.inner.appendChild(this._element),
              (this._element.style.position = "absolute"),
              (this._element.id = "ent" + this[0]),
              this.bind("Invalidate", this._invalidateDOM),
              this.bind("NewComponent", this._updateClass),
              this.bind("RemoveComponent", this._removeClass),
              this._invalidateDOM();
          },
          remove: function () {
            this.undraw(),
              this.unbind("NewComponent", this._updateClass),
              this.unbind("RemoveComponent", this._removeClass),
              this.unbind("Invalidate", this._invalidateDOM);
          },
          getDomId: function () {
            return this._element.id;
          },
          _removeClass: function (a) {
            var b = 0,
              c = this.__c,
              d = "";
            for (b in c) b != a && (d += " " + b);
            (d = d.substr(1)), (this._element.className = d);
          },
          _updateClass: function () {
            var a = 0,
              b = this.__c,
              c = "";
            for (a in b) c += " " + a;
            (c = c.substr(1)), (this._element.className = c);
          },
          _invalidateDOM: function () {
            this._changed || ((this._changed = !0), b.DrawManager.addDom(this));
          },
          DOM: function (a) {
            return (
              a &&
                a.nodeType &&
                (this.undraw(),
                (this._element = a),
                (this._element.style.position = "absolute")),
              this
            );
          },
          draw: function () {
            var a = this._element.style,
              c = this.__coord || [0, 0, 0, 0],
              d = { x: c[0], y: c[1], w: c[2], h: c[3] },
              e = b.support.prefix,
              f = [];
            if (
              (this._cssStyles.visibility !== this._visible &&
                ((this._cssStyles.visibility = this._visible),
                (a.visibility = this._visible ? "visible" : "hidden")),
              b.support.css3dtransform && !this.avoidCss3dTransforms
                ? f.push(
                    "translate3d(" + ~~this._x + "px," + ~~this._y + "px,0)"
                  )
                : (this._cssStyles.left !== this._x &&
                    ((this._cssStyles.left = this._x),
                    (a.left = ~~this._x + "px")),
                  this._cssStyles.top !== this._y &&
                    ((this._cssStyles.top = this._y),
                    (a.top = ~~this._y + "px"))),
              this._cssStyles.width !== this._w &&
                ((this._cssStyles.width = this._w),
                (a.width = ~~this._w + "px")),
              this._cssStyles.height !== this._h &&
                ((this._cssStyles.height = this._h),
                (a.height = ~~this._h + "px")),
              this._cssStyles.zIndex !== this._z &&
                ((this._cssStyles.zIndex = this._z), (a.zIndex = this._z)),
              this._cssStyles.opacity !== this._alpha &&
                ((this._cssStyles.opacity = this._alpha),
                (a.opacity = this._alpha),
                (a[e + "Opacity"] = this._alpha)),
              this._mbr)
            ) {
              var g = this._origin.x + "px " + this._origin.y + "px";
              (a.transformOrigin = g),
                (a[e + "TransformOrigin"] = g),
                f.push(
                  b.support.css3dtransform
                    ? "rotateZ(" + this._rotation + "deg)"
                    : "rotate(" + this._rotation + "deg)"
                );
            }
            return (
              this._flipX && f.push("scaleX(-1)"),
              this._flipY && f.push("scaleY(-1)"),
              this._cssStyles.transform != f.join(" ") &&
                ((this._cssStyles.transform = f.join(" ")),
                (a.transform = this._cssStyles.transform),
                (a[e + "Transform"] = this._cssStyles.transform)),
              this.trigger("Draw", { style: a, type: "DOM", co: d }),
              this
            );
          },
          undraw: function () {
            var a = this._element;
            return (
              a && null !== a.parentNode && a.parentNode.removeChild(a), this
            );
          },
          css: function (a, c) {
            var d,
              e,
              f = this._element,
              g = f.style;
            if ("object" == typeof a)
              for (d in a)
                a.hasOwnProperty(d) &&
                  ((e = a[d]),
                  "number" == typeof e && (e += "px"),
                  (g[b.DOM.camelize(d)] = e));
            else {
              if (!c) return b.DOM.getStyle(f, a);
              "number" == typeof c && (c += "px"), (g[b.DOM.camelize(a)] = c);
            }
            return this.trigger("Invalidate"), this;
          },
        }),
          b.extend({
            DOM: {
              window: {
                init: function () {
                  (this.width =
                    window.innerWidth ||
                    window.document.documentElement.clientWidth ||
                    window.document.body.clientWidth),
                    (this.height =
                      window.innerHeight ||
                      window.document.documentElement.clientHeight ||
                      window.document.body.clientHeight),
                    b.uniqueBind("RenderScene", b.DrawManager.renderDOM),
                    b.uniqueBind("ViewportResize", this._resize),
                    b.uniqueBind("PixelartSet", this._setPixelArt);
                },
                _resize: function () {
                  (b.stage.elem.style.width = b.viewport.width + "px"),
                    (b.stage.elem.style.height = b.viewport.height + "px");
                },
                _setPixelArt: function (a) {
                  var c = b.stage.inner.style;
                  a
                    ? ((c[b.DOM.camelize("image-rendering")] = "optimizeSpeed"),
                      (c[b.DOM.camelize("image-rendering")] =
                        "-moz-crisp-edges"),
                      (c[b.DOM.camelize("image-rendering")] = "-o-crisp-edges"),
                      (c[b.DOM.camelize("image-rendering")] =
                        "-webkit-optimize-contrast"),
                      (c[b.DOM.camelize("-ms-interpolation-mode")] =
                        "nearest-neighbor"),
                      (c[b.DOM.camelize("image-rendering")] =
                        "optimize-contrast"),
                      (c[b.DOM.camelize("image-rendering")] = "pixelated"),
                      (c[b.DOM.camelize("image-rendering")] = "crisp-edges"))
                    : ((c[b.DOM.camelize("image-rendering")] =
                        "optimizeQuality"),
                      (c[b.DOM.camelize("-ms-interpolation-mode")] = "bicubic"),
                      (c[b.DOM.camelize("image-rendering")] = "auto"));
                },
                width: 0,
                height: 0,
              },
              inner: function (a) {
                var b = a.getBoundingClientRect(),
                  d =
                    b.left +
                    (window.pageXOffset
                      ? window.pageXOffset
                      : c.body.scrollLeft),
                  e =
                    b.top +
                    (window.pageYOffset
                      ? window.pageYOffset
                      : c.body.scrollTop),
                  f =
                    parseInt(this.getStyle(a, "border-left-width") || 0, 10) ||
                    parseInt(this.getStyle(a, "borderLeftWidth") || 0, 10) ||
                    0,
                  g =
                    parseInt(this.getStyle(a, "border-top-width") || 0, 10) ||
                    parseInt(this.getStyle(a, "borderTopWidth") || 0, 10) ||
                    0;
                return (d += f), (e += g), { x: d, y: e };
              },
              getStyle: function (a, b) {
                var d;
                return (
                  a.currentStyle
                    ? (d = a.currentStyle[this.camelize(b)])
                    : window.getComputedStyle &&
                      (d = c.defaultView
                        .getComputedStyle(a, null)
                        .getPropertyValue(this.csselize(b))),
                  d
                );
              },
              camelize: function (a) {
                return a.replace(/-+(.)?/g, function (a, b) {
                  return b ? b.toUpperCase() : "";
                });
              },
              csselize: function (a) {
                return a.replace(/[A-Z]/g, function (a) {
                  return a ? "-" + a.toLowerCase() : "";
                });
              },
              translate: function (a, d) {
                var e = c.documentElement,
                  f = c.body;
                return {
                  x:
                    (a -
                      b.stage.x +
                      ((e && e.scrollLeft) || (f && f.scrollLeft) || 0)) /
                      b.viewport._scale -
                    b.viewport._x,
                  y:
                    (d -
                      b.stage.y +
                      ((e && e.scrollTop) || (f && f.scrollTop) || 0)) /
                      b.viewport._scale -
                    b.viewport._y,
                };
              },
            },
          });
      },
      { "./core.js": 10 },
    ],
    3: [
      function (a) {
        var b = a("./core.js"),
          c = window.document;
        b.c("DebugCanvas", {
          init: function () {
            this.requires("2D"),
              b.DebugCanvas.context || b.DebugCanvas.init(),
              b.DebugCanvas.add(this),
              (this._debug = { alpha: 1, lineWidth: 1 }),
              this.bind("RemoveComponent", this.onDebugRemove),
              this.bind("Remove", this.onDebugDestroy);
          },
          onDebugRemove: function (a) {
            "DebugCanvas" === a && b.DebugCanvas.remove(this);
          },
          onDebugDestroy: function () {
            b.DebugCanvas.remove(this);
          },
          debugAlpha: function (a) {
            return (this._debug.alpha = a), this;
          },
          debugFill: function (a) {
            return (
              "undefined" == typeof a && (a = "red"),
              (this._debug.fillStyle = a),
              this
            );
          },
          debugStroke: function (a) {
            return (
              "undefined" == typeof a && (a = "red"),
              (this._debug.strokeStyle = a),
              this
            );
          },
          debugDraw: function (a) {
            var b = a.globalAlpha,
              c = this._debug;
            c.alpha && (a.globalAlpha = this._debug.alpha),
              c.strokeStyle && (a.strokeStyle = c.strokeStyle),
              c.lineWidth && (a.lineWidth = c.lineWidth),
              c.fillStyle && (a.fillStyle = c.fillStyle),
              this.trigger("DebugDraw"),
              (a.globalAlpha = b);
          },
        }),
          b.c("DebugRectangle", {
            init: function () {
              this.requires("2D, DebugCanvas");
            },
            debugRectangle: function (a) {
              return (
                (this.debugRect = a),
                this.unbind("DebugDraw", this.drawDebugRect),
                this.bind("DebugDraw", this.drawDebugRect),
                this
              );
            },
            drawDebugRect: function () {
              ctx = b.DebugCanvas.context;
              var a = this.debugRect;
              null !== a &&
                void 0 !== a &&
                a._h &&
                a._w &&
                (this._debug.fillStyle && ctx.fillRect(a._x, a._y, a._w, a._h),
                this._debug.strokeStyle &&
                  ctx.strokeRect(a._x, a._y, a._w, a._h));
            },
          }),
          b.c("VisibleMBR", {
            init: function () {
              this.requires("DebugRectangle")
                .debugFill("purple")
                .bind("EnterFrame", this._assignRect);
            },
            _assignRect: function () {
              this.debugRectangle(this._mbr ? this._mbr : this);
            },
          }),
          b.c("DebugPolygon", {
            init: function () {
              this.requires("2D, DebugCanvas");
            },
            debugPolygon: function (a) {
              return (
                (this.polygon = a),
                this.unbind("DebugDraw", this.drawDebugPolygon),
                this.bind("DebugDraw", this.drawDebugPolygon),
                this
              );
            },
            drawDebugPolygon: function () {
              if ("undefined" != typeof this.polygon) {
                (ctx = b.DebugCanvas.context), ctx.beginPath();
                for (var a in this.polygon.points)
                  ctx.lineTo(
                    this.polygon.points[a][0],
                    this.polygon.points[a][1]
                  );
                ctx.closePath(),
                  this._debug.fillStyle && ctx.fill(),
                  this._debug.strokeStyle && ctx.stroke();
              }
            },
          }),
          b.c("WiredHitBox", {
            init: function () {
              this.requires("DebugPolygon").debugStroke("red").matchHitBox(),
                this.bind("NewHitbox", this.matchHitBox);
            },
            matchHitBox: function () {
              this.debugPolygon(this.map);
            },
          }),
          b.c("SolidHitBox", {
            init: function () {
              this.requires("Collision, DebugPolygon")
                .debugFill("orange")
                .debugAlpha(0.7)
                .matchHitBox(),
                this.bind("NewHitbox", this.matchHitBox);
            },
            matchHitBox: function () {
              this.debugPolygon(this.map);
            },
          }),
          (b.DebugCanvas = {
            context: null,
            entities: [],
            onetimeEntities: [],
            add: function (a) {
              this.entities.push(a);
            },
            remove: function (a) {
              for (var b = this.entities, c = b.length - 1; c >= 0; c--)
                b[c] == a && b.splice(c, 1);
            },
            init: function () {
              if (!b.DebugCanvas.context) {
                if (!b.support.canvas)
                  return b.trigger("NoCanvas"), void b.stop();
                var a;
                (a = c.createElement("canvas")),
                  (a.width = b.viewport.width),
                  (a.height = b.viewport.height),
                  (a.style.position = "absolute"),
                  (a.style.left = "0px"),
                  (a.style.top = "0px"),
                  (a.id = "debug-canvas"),
                  (a.style.zIndex = 1e5),
                  b.stage.elem.appendChild(a),
                  (b.DebugCanvas.context = a.getContext("2d")),
                  (b.DebugCanvas._canvas = a);
              }
              b.unbind("RenderScene", b.DebugCanvas.renderScene),
                b.bind("RenderScene", b.DebugCanvas.renderScene);
            },
            renderScene: function (a) {
              a = a || b.viewport.rect();
              var c,
                d = b.DebugCanvas.entities,
                e = 0,
                f = d.length,
                g = b.DebugCanvas.context,
                h = b.viewport;
              for (
                g.setTransform(
                  h._scale,
                  0,
                  0,
                  h._scale,
                  Math.round(h._x * h._scale),
                  Math.round(h._y * h._scale)
                ),
                  g.clearRect(a._x, a._y, a._w, a._h);
                f > e;
                e++
              )
                (c = d[e]), c.debugDraw(g);
            },
          });
      },
      { "./core.js": 10 },
    ],
    4: [
      function (a, b) {
        function c(a, b, c) {
          (this.keys = a), (this.map = c), (this.obj = b);
        }
        var d,
          e =
            (a("./core.js"),
            window.document,
            function (a) {
              (d = a || 64), (this.map = {});
            }),
          f = " ",
          g = {};
        (e.prototype = {
          insert: function (a) {
            var b,
              d,
              f = e.key(a),
              g = new c(f, a, this),
              h = 0;
            for (h = f.x1; h <= f.x2; h++)
              for (b = f.y1; b <= f.y2; b++)
                (d = (h << 16) ^ b),
                  this.map[d] || (this.map[d] = []),
                  this.map[d].push(a);
            return g;
          },
          search: function (a, b) {
            var c,
              d,
              f,
              h = e.key(a, g),
              i = [];
            for (void 0 === b && (b = !0), c = h.x1; c <= h.x2; c++)
              for (d = h.y1; d <= h.y2; d++)
                if ((cell = this.map[(c << 16) ^ d]))
                  for (f = 0; f < cell.length; f++) i.push(cell[f]);
            if (b) {
              var j,
                k,
                m = [],
                n = {};
              for (c = 0, l = i.length; l > c; c++)
                (j = i[c]),
                  j &&
                    ((k = j[0]),
                    (j = j._mbr || j),
                    !n[k] &&
                      j._x < a._x + a._w &&
                      j._x + j._w > a._x &&
                      j._y < a._y + a._h &&
                      j._h + j._y > a._y &&
                      (n[k] = i[c]));
              for (j in n) m.push(n[j]);
              return m;
            }
            return i;
          },
          remove: function (a, b) {
            var c,
              d,
              f = 0;
            for (
              1 == arguments.length && ((b = a), (a = e.key(b, g))), f = a.x1;
              f <= a.x2;
              f++
            )
              for (c = a.y1; c <= a.y2; c++)
                if (((d = (f << 16) ^ c), this.map[d])) {
                  var h,
                    i = this.map[d],
                    j = i.length;
                  for (h = 0; j > h; h++)
                    i[h] && i[h][0] === b[0] && i.splice(h, 1);
                }
          },
          refresh: function (a) {
            var b,
              c,
              d,
              f,
              g,
              h = a.keys,
              i = a.obj;
            for (c = h.x1; c <= h.x2; c++)
              for (d = h.y1; d <= h.y2; d++)
                if ((b = this.map[(c << 16) ^ d]))
                  for (g = b.length, f = 0; g > f; f++)
                    b[f] && b[f][0] === i[0] && b.splice(f, 1);
            for (e.key(i, h), c = h.x1; c <= h.x2; c++)
              for (d = h.y1; d <= h.y2; d++)
                (b = this.map[(c << 16) ^ d]),
                  b || (b = this.map[(c << 16) ^ d] = []),
                  b.push(i);
            return a;
          },
          boundaries: function () {
            var a,
              b,
              c = {
                max: { x: -1 / 0, y: -1 / 0 },
                min: { x: 1 / 0, y: 1 / 0 },
              },
              d = {
                max: { x: -1 / 0, y: -1 / 0 },
                min: { x: 1 / 0, y: 1 / 0 },
              };
            for (var e in this.map)
              if (this.map[e].length) {
                var f = e >> 16,
                  g = (e << 16) >> 16;
                if ((0 > g && (f = -1 ^ f), f >= c.max.x)) {
                  c.max.x = f;
                  for (a in this.map[e])
                    (b = this.map[e][a]),
                      "object" == typeof b &&
                        "requires" in b &&
                        (d.max.x = Math.max(d.max.x, b.x + b.w));
                }
                if (f <= c.min.x) {
                  c.min.x = f;
                  for (a in this.map[e])
                    (b = this.map[e][a]),
                      "object" == typeof b &&
                        "requires" in b &&
                        (d.min.x = Math.min(d.min.x, b.x));
                }
                if (g >= c.max.y) {
                  c.max.y = g;
                  for (a in this.map[e])
                    (b = this.map[e][a]),
                      "object" == typeof b &&
                        "requires" in b &&
                        (d.max.y = Math.max(d.max.y, b.y + b.h));
                }
                if (g <= c.min.y) {
                  c.min.y = g;
                  for (a in this.map[e])
                    (b = this.map[e][a]),
                      "object" == typeof b &&
                        "requires" in b &&
                        (d.min.y = Math.min(d.min.y, b.y));
                }
              }
            return d;
          },
        }),
          (e.key = function (a, b) {
            return (
              a._mbr && (a = a._mbr),
              b || (b = {}),
              (b.x1 = Math.floor(a._x / d)),
              (b.y1 = Math.floor(a._y / d)),
              (b.x2 = Math.floor((a._w + a._x) / d)),
              (b.y2 = Math.floor((a._h + a._y) / d)),
              b
            );
          }),
          (e.hash = function (a) {
            return a.x1 + f + a.y1 + f + a.x2 + f + a.y2;
          }),
          (c.prototype = {
            update: function (a) {
              e.hash(e.key(a, g)) != e.hash(this.keys) &&
                this.map.refresh(this);
            },
          }),
          (b.exports = e);
      },
      { "./core.js": 10 },
    ],
    5: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        (b.easing = function (a) {
          (this.timePerFrame = 1e3 / b.timer.FPS()),
            (this.duration = a),
            this.reset();
        }),
          (b.easing.prototype = {
            duration: 0,
            clock: 0,
            steps: null,
            complete: !1,
            paused: !1,
            reset: function () {
              (this.loops = 1),
                (this.clock = 0),
                (this.complete = !1),
                (this.paused = !1);
            },
            repeat: function (a) {
              this.loops = a;
            },
            setProgress: function (a, b) {
              (this.clock = this.duration * a),
                "undefined" != typeof b && (this.loops = b);
            },
            pause: function () {
              this.paused = !0;
            },
            resume: function () {
              (this.paused = !1), (this.complete = !1);
            },
            tick: function (a) {
              if (!this.paused && !this.complete)
                for (
                  this.clock += a,
                    this.frames = Math.floor(this.clock / this.timePerFrame);
                  this.clock >= this.duration && this.complete === !1;

                )
                  this.loops--,
                    this.loops > 0
                      ? (this.clock -= this.duration)
                      : (this.complete = !0);
            },
            time: function () {
              return Math.min(this.clock / this.duration, 1);
            },
            value: function () {
              return this.time();
            },
          }),
          b.c("Tween", {
            init: function () {
              (this.tweenGroup = {}),
                (this.tweenStart = {}),
                (this.tweens = []),
                this.bind("EnterFrame", this._tweenTick);
            },
            _tweenTick: function (a) {
              var b, c, d;
              for (d = this.tweens.length - 1; d >= 0; d--)
                (b = this.tweens[d]),
                  b.easing.tick(a.dt),
                  (c = b.easing.value()),
                  this._doTween(b.props, c),
                  b.easing.complete &&
                    (this.tweens.splice(d, 1), this._endTween(b.props));
            },
            _doTween: function (a, b) {
              for (var c in a)
                this[c] = (1 - b) * this.tweenStart[c] + b * a[c];
            },
            tween: function (a, c) {
              var d = { props: a, easing: new b.easing(c) };
              for (var e in a)
                "undefined" != typeof this.tweenGroup[e] && this.cancelTween(e),
                  (this.tweenStart[e] = this[e]),
                  (this.tweenGroup[e] = a);
              return this.tweens.push(d), this;
            },
            cancelTween: function (a) {
              if ("string" == typeof a)
                "object" == typeof this.tweenGroup[a] &&
                  delete this.tweenGroup[a][a];
              else if ("object" == typeof a)
                for (var b in a) this.cancelTween(b);
              return this;
            },
            _endTween: function (a) {
              for (var b in a) delete this.tweenGroup[b];
              this.trigger("TweenEnd", a);
            },
          });
      },
      { "./core.js": 10 },
    ],
    6: [
      function (a) {
        var b = a("./core.js"),
          c = window.document;
        b.c("Canvas", {
          init: function () {
            b.canvas.context || b.canvas.init(),
              b.DrawManager.total2D++,
              (this.currentRect = {}),
              (this._changed = !0),
              b.DrawManager.addCanvas(this),
              this.bind("Invalidate", function () {
                this._changed === !1 &&
                  ((this._changed = !0), b.DrawManager.addCanvas(this));
              }),
              this.bind("Remove", function () {
                b.DrawManager.total2D--,
                  (this._changed = !0),
                  b.DrawManager.addCanvas(this);
              });
          },
          drawVars: {
            type: "canvas",
            pos: {},
            ctx: null,
            coord: [0, 0, 0, 0],
            co: { x: 0, y: 0, w: 0, h: 0 },
          },
          draw: function (a, c, d, e, f) {
            if (this.ready) {
              4 === arguments.length &&
                ((f = e), (e = d), (d = c), (c = a), (a = b.canvas.context));
              var g = this.drawVars.pos;
              (g._x = this._x + (c || 0)),
                (g._y = this._y + (d || 0)),
                (g._w = e || this._w),
                (g._h = f || this._h),
                (context = a || b.canvas.context),
                (coord = this.__coord || [0, 0, 0, 0]);
              var h = this.drawVars.co;
              (h.x = coord[0] + (c || 0)),
                (h.y = coord[1] + (d || 0)),
                (h.w = e || coord[2]),
                (h.h = f || coord[3]),
                0 !== this._rotation &&
                  (context.save(),
                  context.translate(
                    this._origin.x + this._x,
                    this._origin.y + this._y
                  ),
                  (g._x = -this._origin.x),
                  (g._y = -this._origin.y),
                  context.rotate((this._rotation % 360) * (Math.PI / 180))),
                (this._flipX || this._flipY) &&
                  (context.save(),
                  context.scale(this._flipX ? -1 : 1, this._flipY ? -1 : 1),
                  this._flipX && (g._x = -(g._x + g._w)),
                  this._flipY && (g._y = -(g._y + g._h)));
              var i;
              return (
                this._alpha < 1 &&
                  ((i = context.globalAlpha),
                  (context.globalAlpha = this._alpha)),
                (this.drawVars.ctx = context),
                this.trigger("Draw", this.drawVars),
                (0 !== this._rotation || this._flipX || this._flipY) &&
                  context.restore(),
                i && (context.globalAlpha = i),
                this
              );
            }
          },
        }),
          b.extend({
            canvas: {
              context: null,
              init: function () {
                if (!b.support.canvas)
                  return b.trigger("NoCanvas"), void b.stop();
                var a;
                (a = c.createElement("canvas")),
                  (a.width = b.viewport.width),
                  (a.height = b.viewport.height),
                  (a.style.position = "absolute"),
                  (a.style.left = "0px"),
                  (a.style.top = "0px"),
                  b.stage.elem.appendChild(a),
                  (b.canvas.context = a.getContext("2d")),
                  (b.canvas._canvas = a);
                var d = b.viewport._scale;
                1 != d && b.canvas.context.scale(d, d),
                  this._setPixelart(b._pixelartEnabled),
                  b.uniqueBind("PixelartSet", this._setPixelart),
                  b.uniqueBind("RenderScene", b.DrawManager.renderCanvas),
                  b.uniqueBind("ViewportResize", this._resize);
              },
              _resize: function () {
                var a = b.canvas._canvas;
                (a.width = b.viewport.width), (a.height = b.viewport.height);
              },
              _setPixelart: function (a) {
                var c = b.canvas.context;
                (c.imageSmoothingEnabled = !a),
                  (c.mozImageSmoothingEnabled = !a),
                  (c.webkitImageSmoothingEnabled = !a),
                  (c.oImageSmoothingEnabled = !a),
                  (c.msImageSmoothingEnabled = !a);
              },
            },
          });
      },
      { "./core.js": 10 },
    ],
    7: [
      function (a) {
        var b = a("./core.js"),
          c = (window.document, Math.PI / 180);
        b.c("Collision", {
          init: function () {
            this.requires("2D"), (this._collisionData = {}), this.collision();
          },
          remove: function () {
            (this._cbr = null),
              this.unbind("Resize", this._resizeMap),
              this.unbind("Resize", this._checkBounds);
          },
          collision: function (a) {
            if (
              (this.unbind("Resize", this._resizeMap),
              this.unbind("Resize", this._checkBounds),
              a)
            ) {
              if (arguments.length > 1) {
                var d = Array.prototype.slice.call(arguments, 0);
                a = new b.polygon(d);
              }
              this._findBounds(a.points);
            } else
              (a = new b.polygon(
                [0, 0],
                [this._w, 0],
                [this._w, this._h],
                [0, this._h]
              )),
                this.bind("Resize", this._resizeMap),
                (this._cbr = null);
            return (
              this.rotation &&
                a.rotate({
                  cos: Math.cos(-this.rotation * c),
                  sin: Math.sin(-this.rotation * c),
                  o: { x: this._origin.x, y: this._origin.y },
                }),
              (this.map = a),
              this.attach(this.map),
              this.map.shift(this._x, this._y),
              this.trigger("NewHitbox", a),
              this
            );
          },
          _findBounds: function (a) {
            for (
              var b, c = 1 / 0, d = -1 / 0, e = 1 / 0, f = -1 / 0, g = 0;
              g < a.length;
              ++g
            )
              (b = a[g]),
                b[0] < c && (c = b[0]),
                b[0] > d && (d = b[0]),
                b[1] < e && (e = b[1]),
                b[1] > f && (f = b[1]);
            var h = {
              cx: (c + d) / 2,
              cy: (e + f) / 2,
              r: Math.sqrt((d - c) * (d - c) + (f - e) * (f - e)) / 2,
            };
            return (
              c >= 0 &&
                e >= 0 &&
                ((this._checkBounds = function () {
                  (null === this._cbr && this._w < d) || this._h < f
                    ? ((this._cbr = h), this._calculateMBR())
                    : this._cbr && ((this._cbr = null), this._calculateMBR());
                }),
                this.bind("Resize", this._checkBounds)),
              c >= 0 && e >= 0 && d <= this._w && f <= this._h
                ? ((this._cbr = null), !1)
                : ((this._cbr = h), this._calculateMBR(), !0)
            );
          },
          _resizeMap: function (a) {
            var b,
              d,
              e = this.rotation * c,
              f = this.map.points;
            "w" === a.axis
              ? (e
                  ? ((b = a.amount * Math.cos(e)), (d = a.amount * Math.sin(e)))
                  : ((b = a.amount), (d = 0)),
                (f[1][0] += b),
                (f[1][1] += d))
              : (e
                  ? ((d = a.amount * Math.cos(e)),
                    (b = -a.amount * Math.sin(e)))
                  : ((b = 0), (d = a.amount)),
                (f[3][0] += b),
                (f[3][1] += d)),
              (f[2][0] += b),
              (f[2][1] += d);
          },
          hit: function (a) {
            var c,
              d,
              e,
              f,
              g = this._cbr || this._mbr || this,
              h = b.map.search(g, !1),
              i = 0,
              j = h.length,
              k = {},
              l = "map" in this && "containsPoint" in this.map,
              m = [];
            if (!j) return !1;
            for (; j > i; ++i)
              (d = h[i]),
                (e = d._cbr || d._mbr || d),
                d &&
                  ((c = d[0]),
                  !k[c] &&
                    this[0] !== c &&
                    d.__c[a] &&
                    e._x < g._x + g._w &&
                    e._x + e._w > g._x &&
                    e._y < g._y + g._h &&
                    e._h + e._y > g._y &&
                    (k[c] = d));
            for (f in k)
              if (((d = k[f]), l && "map" in d)) {
                var n = this._SAT(this.map, d.map);
                (n.obj = d), (n.type = "SAT"), n && m.push(n);
              } else m.push({ obj: d, type: "MBR" });
            return m.length ? m : !1;
          },
          onHit: function (a, b, c) {
            var d = !1;
            return (
              this.bind("EnterFrame", function () {
                var e = this.hit(a);
                e
                  ? ((d = !0), b.call(this, e))
                  : d && ("function" == typeof c && c.call(this), (d = !1));
              }),
              this
            );
          },
          _createCollisionHandler: function (a, b) {
            return function () {
              var c = this.hit(a);
              if (b.occurring === !0) {
                if (c !== !1) return;
                (b.occurring = !1), this.trigger("HitOff", a);
              } else c !== !1 && ((b.occurring = !0), this.trigger("HitOn", c));
            };
          },
          checkHits: function () {
            var a = arguments,
              b = 0;
            for (
              1 === a.length && (a = a[0].split(/\s*,\s*/));
              b < a.length;
              ++b
            ) {
              var c = a[b],
                d = this._collisionData[c];
              void 0 === d &&
                ((this._collisionData[c] = d =
                  { occurring: !1, handler: null }),
                (d.handler = this._createCollisionHandler(c, d)),
                this.bind("EnterFrame", d.handler));
            }
            return this;
          },
          ignoreHits: function () {
            var a,
              b = arguments,
              c = 0;
            if (0 === b.length) {
              for (a in this._collisionData)
                this.unbind("EnterFrame", a.handler);
              this._collisionData = {};
            }
            for (
              1 === b.length && (b = b[0].split(/\s*,\s*/));
              c < b.length;
              ++c
            ) {
              var d = b[c];
              (a = this._collisionData[d]),
                void 0 !== a &&
                  (this.unbind("EnterFrame", a.handler),
                  delete this._collisionData[d]);
            }
            return this;
          },
          resetHitChecks: function () {
            var a,
              b = arguments,
              c = 0;
            if (0 === b.length)
              for (a in this._collisionData)
                this._collisionData[a].occurring = !1;
            for (
              1 === b.length && (b = b[0].split(/\s*,\s*/));
              c < b.length;
              ++c
            ) {
              var d = b[c];
              (a = this._collisionData[d]), void 0 !== a && (a.occurring = !1);
            }
            return this;
          },
          _SAT: function (a, b) {
            for (
              var c,
                d,
                e,
                f,
                g,
                h,
                i,
                j,
                k,
                l,
                m = a.points,
                n = b.points,
                o = 0,
                p = m.length,
                q = n.length,
                r = { x: 0, y: 0 },
                s = null,
                t = null,
                u = null;
              p > o;
              o++
            ) {
              for (
                k = m[o == p - 1 ? 0 : o + 1],
                  l = m[o],
                  r.x = -(k[1] - l[1]),
                  r.y = k[0] - l[0],
                  d = Math.sqrt(r.x * r.x + r.y * r.y),
                  r.x /= d,
                  r.y /= d,
                  e = f = 1 / 0,
                  g = h = -1 / 0,
                  c = 0;
                p > c;
                ++c
              )
                (j = m[c][0] * r.x + m[c][1] * r.y),
                  j > g && (g = j),
                  e > j && (e = j);
              for (c = 0; q > c; ++c)
                (j = n[c][0] * r.x + n[c][1] * r.y),
                  j > h && (h = j),
                  f > j && (f = j);
              if (
                (f > e
                  ? ((i = f - g), (r.x = -r.x), (r.y = -r.y))
                  : (i = e - h),
                i >= 0)
              )
                return !1;
              (null === s || i > s) && ((s = i), (u = { x: r.x, y: r.y }));
            }
            for (o = 0; q > o; o++) {
              for (
                k = n[o == q - 1 ? 0 : o + 1],
                  l = n[o],
                  r.x = -(k[1] - l[1]),
                  r.y = k[0] - l[0],
                  d = Math.sqrt(r.x * r.x + r.y * r.y),
                  r.x /= d,
                  r.y /= d,
                  e = f = 1 / 0,
                  g = h = -1 / 0,
                  c = 0;
                p > c;
                ++c
              )
                (j = m[c][0] * r.x + m[c][1] * r.y),
                  j > g && (g = j),
                  e > j && (e = j);
              for (c = 0; q > c; ++c)
                (j = n[c][0] * r.x + n[c][1] * r.y),
                  j > h && (h = j),
                  f > j && (f = j);
              if (
                (f > e
                  ? ((i = f - g), (r.x = -r.x), (r.y = -r.y))
                  : (i = e - h),
                i >= 0)
              )
                return !1;
              (null === s || i > s) && (s = i),
                (i > t || null === t) && ((t = i), (u = { x: r.x, y: r.y }));
            }
            return { overlap: t, normal: u };
          },
        });
      },
      { "./core.js": 10 },
    ],
    8: [
      function (a) {
        var b = a("./core.js"),
          c = window.document;
        b.extend({
          assignColor: (function () {
            function a(a) {
              return (a._red = a._blue = a._green = 0), a;
            }
            function b(a) {
              var b = a.toString(16);
              return 1 == b.length && (b = "0" + b), b;
            }
            function d(a, c, d) {
              return "#" + b(a) + b(c) + b(d);
            }
            function e(b, c) {
              var d;
              if (7 === b.length) d = 2;
              else {
                if (4 !== b.length) return a(c);
                d = 1;
              }
              return (
                (c._red = parseInt(b.substr(1, d), 16)),
                (c._green = parseInt(b.substr(1 + d, d), 16)),
                (c._blue = parseInt(b.substr(1 + 2 * d, d), 16)),
                c
              );
            }
            function f(b, c) {
              var d = l.exec(b);
              return null === d || (4 != d.length && 5 != d.length)
                ? a(c)
                : ((c._red = Math.round(parseFloat(d[1]))),
                  (c._green = Math.round(parseFloat(d[2]))),
                  (c._blue = Math.round(parseFloat(d[3]))),
                  d[4] && (c._strength = parseFloat(d[4])),
                  c);
            }
            function g(a, b) {
              if ("undefined" == typeof k[a]) {
                j === !1 && (window.document.body.appendChild(i), (j = !0)),
                  (i.style.color = a);
                var c = window.getComputedStyle(i).color;
                f(c, b), (k[a] = d(b._red, b._green, b._blue));
              } else e(k[a], b);
              return b;
            }
            function h(a) {
              return (
                "rgba(" +
                a._red +
                ", " +
                a._green +
                ", " +
                a._blue +
                ", " +
                a._strength +
                ")"
              );
            }
            var i = c.createElement("div");
            i.style.display = "none";
            var j = !1,
              k = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#00ff00",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                orange: "#ffa500",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
              },
              l =
                /rgba?\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,?\s*([0-9.]+)?\)/;
            return function (a, b) {
              (b = b || {}), (a = a.trim().toLowerCase());
              var c = null;
              (c =
                "#" === a[0]
                  ? e(a, b)
                  : "r" === a[0] && "g" === a[1] && "b" === a[2]
                  ? f(a, b)
                  : g(a, b)),
                (b._strength = b._strength || 1),
                (b._color = h(b));
            };
          })(),
        }),
          b.c("Color", {
            _red: 0,
            _green: 0,
            _blue: 0,
            _strength: 1,
            _color: "",
            ready: !0,
            init: function () {
              this.bind("Draw", this._drawColor), this.trigger("Invalidate");
            },
            remove: function () {
              this.unbind("Draw", this._drawColor),
                this.has("DOM") &&
                  (this._element.style.backgroundColor = "transparent"),
                this.trigger("Invalidate");
            },
            _drawColor: function (a) {
              this._color &&
                ("DOM" === a.type
                  ? ((a.style.backgroundColor = this._color),
                    (a.style.lineHeight = 0))
                  : "canvas" === a.type &&
                    ((a.ctx.fillStyle = this._color),
                    a.ctx.fillRect(a.pos._x, a.pos._y, a.pos._w, a.pos._h)));
            },
            color: function (a) {
              return 0 === arguments.length
                ? this._color
                : (arguments.length >= 3
                    ? ((this._red = arguments[0]),
                      (this._green = arguments[1]),
                      (this._blue = arguments[2]),
                      "number" == typeof arguments[3] &&
                        (this._strength = arguments[3]))
                    : (b.assignColor(a, this),
                      "number" == typeof arguments[1] &&
                        (this._strength = arguments[1])),
                  (this._color =
                    "rgba(" +
                    this._red +
                    ", " +
                    this._green +
                    ", " +
                    this._blue +
                    ", " +
                    this._strength +
                    ")"),
                  this.trigger("Invalidate"),
                  this);
            },
          });
      },
      { "./core.js": 10 },
    ],
    9: [
      function (a) {
        var b = a("./core.js"),
          c = window.document;
        b.extend({
          over: null,
          mouseObjs: 0,
          mousePos: {},
          lastEvent: null,
          keydown: {},
          selected: !1,
          detectBlur: function (a) {
            var c =
              a.clientX > b.stage.x &&
              a.clientX < b.stage.x + b.viewport.width &&
              a.clientY > b.stage.y &&
              a.clientY < b.stage.y + b.viewport.height;
            !b.selected && c && b.trigger("CraftyFocus"),
              b.selected && !c && b.trigger("CraftyBlur"),
              (b.selected = c);
          },
          resetKeyDown: function () {
            for (var a in b.keys)
              b.keydown[b.keys[a]] && this.trigger("KeyUp", { key: b.keys[a] });
            b.keydown = {};
          },
          mouseDispatch: function (a) {
            if (b.mouseObjs) {
              b.lastEvent = a;
              var c,
                d,
                e,
                f,
                g,
                h = -1,
                i = 0,
                j = b.DOM.translate(a.clientX, a.clientY),
                k = {},
                l = a.target ? a.target : a.srcElement,
                m = a.type;
              if (
                ((a.mouseButton =
                  "undefined" == typeof a.which
                    ? a.button < 2
                      ? b.mouseButtons.LEFT
                      : 4 == a.button
                      ? b.mouseButtons.MIDDLE
                      : b.mouseButtons.RIGHT
                    : a.which < 2
                    ? b.mouseButtons.LEFT
                    : 2 == a.which
                    ? b.mouseButtons.MIDDLE
                    : b.mouseButtons.RIGHT),
                (a.realX = f = b.mousePos.x = j.x),
                (a.realY = g = b.mousePos.y = j.y),
                "CANVAS" != l.nodeName)
              ) {
                for (; "string" != typeof l.id && -1 == l.id.indexOf("ent"); )
                  l = l.parentNode;
                (ent = b(parseInt(l.id.replace("ent", ""), 10))),
                  ent.has("Mouse") && ent.isAt(f, g) && (c = ent);
              }
              if (!c)
                for (
                  d = b.map.search({ _x: f, _y: g, _w: 1, _h: 1 }, !1),
                    e = d.length;
                  e > i;
                  ++i
                )
                  if (d[i].__c.Mouse && d[i]._visible) {
                    var n = d[i],
                      o = !1;
                    if (
                      !k[n[0]] &&
                      ((k[n[0]] = !0),
                      n.mapArea
                        ? n.mapArea.containsPoint(f, g) && (o = !0)
                        : n.isAt(f, g) && (o = !0),
                      o && (n._z >= h || -1 === h))
                    ) {
                      if (n._z === h && n[0] < c[0]) continue;
                      (h = n._z), (c = n);
                    }
                  }
              c
                ? "mousedown" === m
                  ? c.trigger("MouseDown", a)
                  : "mouseup" === m
                  ? c.trigger("MouseUp", a)
                  : "dblclick" == m
                  ? c.trigger("DoubleClick", a)
                  : "click" == m
                  ? c.trigger("Click", a)
                  : "mousemove" === m
                  ? (c.trigger("MouseMove", a),
                    this.over !== c &&
                      (this.over &&
                        (this.over.trigger("MouseOut", a), (this.over = null)),
                      (this.over = c),
                      c.trigger("MouseOver", a)))
                  : c.trigger(m, a)
                : ("mousemove" === m &&
                    this.over &&
                    (this.over.trigger("MouseOut", a), (this.over = null)),
                  "mousedown" === m
                    ? b.viewport.mouselook("start", a)
                    : "mousemove" === m
                    ? b.viewport.mouselook("drag", a)
                    : "mouseup" == m && b.viewport.mouselook("stop")),
                "mousemove" === m && (this.lastEvent = a);
            }
          },
          touchDispatch: function (a) {
            var d,
              e = b.lastEvent;
            "touchstart" === a.type
              ? (d = "mousedown")
              : "touchmove" === a.type
              ? (d = "mousemove")
              : "touchend" === a.type
              ? (d = "mouseup")
              : "touchcancel" === a.type
              ? (d = "mouseup")
              : "touchleave" === a.type && (d = "mouseup"),
              a.touches && a.touches.length
                ? (first = a.touches[0])
                : a.changedTouches &&
                  a.changedTouches.length &&
                  (first = a.changedTouches[0]);
            var f = c.createEvent("MouseEvent");
            f.initMouseEvent(
              d,
              !0,
              !0,
              window,
              1,
              first.screenX,
              first.screenY,
              first.clientX,
              first.clientY,
              !1,
              !1,
              !1,
              !1,
              0,
              a.relatedTarget
            ),
              first.target.dispatchEvent(f),
              null !== e &&
                "mousedown" == e.type &&
                "mouseup" == d &&
                ((d = "click"),
                (f = c.createEvent("MouseEvent")),
                f.initMouseEvent(
                  d,
                  !0,
                  !0,
                  window,
                  1,
                  first.screenX,
                  first.screenY,
                  first.clientX,
                  first.clientY,
                  !1,
                  !1,
                  !1,
                  !1,
                  0,
                  a.relatedTarget
                ),
                first.target.dispatchEvent(f)),
              a.target &&
                "INPUT" !== a.target.nodeName &&
                "TEXTAREA" !== a.target.nodeName &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
          },
          keyboardDispatch: function (a) {
            for (
              var c = a,
                d = {},
                e =
                  "char charCode keyCode type shiftKey ctrlKey metaKey timestamp".split(
                    " "
                  ),
                f = e.length;
              f;

            ) {
              var g = e[--f];
              d[g] = c[g];
            }
            return (
              (d.which = null !== c.charCode ? c.charCode : c.keyCode),
              (d.key = c.keyCode || c.which),
              (d.originalEvent = c),
              (a = d),
              "keydown" === a.type
                ? b.keydown[a.key] !== !0 &&
                  ((b.keydown[a.key] = !0), b.trigger("KeyDown", a))
                : "keyup" === a.type &&
                  (delete b.keydown[a.key], b.trigger("KeyUp", a)),
              b.selected && !(8 == a.key || (a.key >= 112 && a.key <= 135))
                ? (a.stopPropagation
                    ? a.stopPropagation()
                    : (a.cancelBubble = !0),
                  a.target &&
                    "INPUT" !== a.target.nodeName &&
                    "TEXTAREA" !== a.target.nodeName &&
                    (a.preventDefault
                      ? a.preventDefault()
                      : (a.returnValue = !1)),
                  !1)
                : void 0
            );
          },
        }),
          b.bind("Load", function () {
            b.addEvent(this, "keydown", b.keyboardDispatch),
              b.addEvent(this, "keyup", b.keyboardDispatch),
              b.addEvent(this, b.stage.elem, "mousedown", b.mouseDispatch),
              b.addEvent(this, b.stage.elem, "mouseup", b.mouseDispatch),
              b.addEvent(this, c.body, "mouseup", b.detectBlur),
              b.addEvent(this, window, "blur", b.resetKeyDown),
              b.addEvent(this, b.stage.elem, "mousemove", b.mouseDispatch),
              b.addEvent(this, b.stage.elem, "click", b.mouseDispatch),
              b.addEvent(this, b.stage.elem, "dblclick", b.mouseDispatch),
              b.addEvent(this, b.stage.elem, "touchstart", b.touchDispatch),
              b.addEvent(this, b.stage.elem, "touchmove", b.touchDispatch),
              b.addEvent(this, b.stage.elem, "touchend", b.touchDispatch),
              b.addEvent(this, b.stage.elem, "touchcancel", b.touchDispatch),
              b.addEvent(this, b.stage.elem, "touchleave", b.touchDispatch);
          }),
          b.bind("CraftyStop", function () {
            b.removeEvent(this, "keydown", b.keyboardDispatch),
              b.removeEvent(this, "keyup", b.keyboardDispatch),
              b.stage &&
                (b.removeEvent(
                  this,
                  b.stage.elem,
                  "mousedown",
                  b.mouseDispatch
                ),
                b.removeEvent(this, b.stage.elem, "mouseup", b.mouseDispatch),
                b.removeEvent(this, b.stage.elem, "mousemove", b.mouseDispatch),
                b.removeEvent(this, b.stage.elem, "click", b.mouseDispatch),
                b.removeEvent(this, b.stage.elem, "dblclick", b.mouseDispatch),
                b.removeEvent(
                  this,
                  b.stage.elem,
                  "touchstart",
                  b.touchDispatch
                ),
                b.removeEvent(this, b.stage.elem, "touchmove", b.touchDispatch),
                b.removeEvent(this, b.stage.elem, "touchend", b.touchDispatch),
                b.removeEvent(
                  this,
                  b.stage.elem,
                  "touchcancel",
                  b.touchDispatch
                ),
                b.removeEvent(
                  this,
                  b.stage.elem,
                  "touchleave",
                  b.touchDispatch
                )),
              b.removeEvent(this, c.body, "mouseup", b.detectBlur),
              b.removeEvent(this, window, "blur", b.resetKeyDown);
          }),
          b.c("Mouse", {
            init: function () {
              b.mouseObjs++,
                this.bind("Remove", function () {
                  b.mouseObjs--;
                });
            },
            areaMap: function (a) {
              if (arguments.length > 1) {
                var c = Array.prototype.slice.call(arguments, 0);
                a = new b.polygon(c);
              }
              return (
                a.shift(this._x, this._y),
                (this.mapArea = a),
                this.attach(this.mapArea),
                this
              );
            },
          }),
          b.c("Draggable", {
            _origMouseDOMPos: null,
            _oldX: null,
            _oldY: null,
            _dragging: !1,
            _dir: null,
            init: function () {
              this.requires("Mouse"), this.enableDrag();
            },
            _ondrag: function (a) {
              var c = b.DOM.translate(a.clientX, a.clientY);
              if (0 === c.x || 0 === c.y) return !1;
              if (this._dir) {
                var d =
                  (c.x - this._origMouseDOMPos.x) * this._dir.x +
                  (c.y - this._origMouseDOMPos.y) * this._dir.y;
                (this.x = this._oldX + d * this._dir.x),
                  (this.y = this._oldY + d * this._dir.y);
              } else
                (this.x = this._oldX + (c.x - this._origMouseDOMPos.x)),
                  (this.y = this._oldY + (c.y - this._origMouseDOMPos.y));
              this.trigger("Dragging", a);
            },
            _ondown: function (a) {
              a.mouseButton === b.mouseButtons.LEFT && this._startDrag(a);
            },
            _onup: function (a) {
              a.mouseButton === b.mouseButtons.LEFT &&
                this._dragging === !0 &&
                (b.removeEvent(this, b.stage.elem, "mousemove", this._ondrag),
                b.removeEvent(this, b.stage.elem, "mouseup", this._onup),
                (this._dragging = !1),
                this.trigger("StopDrag", a));
            },
            dragDirection: function (a) {
              if ("undefined" == typeof a) this._dir = null;
              else if ("" + parseInt(a, 10) == a)
                this._dir = {
                  x: Math.cos((a / 180) * Math.PI),
                  y: Math.sin((a / 180) * Math.PI),
                };
              else {
                var b = Math.sqrt(a.x * a.x + a.y * a.y);
                this._dir = { x: a.x / b, y: a.y / b };
              }
            },
            _startDrag: function (a) {
              (this._origMouseDOMPos = b.DOM.translate(a.clientX, a.clientY)),
                (this._oldX = this._x),
                (this._oldY = this._y),
                (this._dragging = !0),
                b.addEvent(this, b.stage.elem, "mousemove", this._ondrag),
                b.addEvent(this, b.stage.elem, "mouseup", this._onup),
                this.trigger("StartDrag", a);
            },
            stopDrag: function () {
              return (
                b.removeEvent(this, b.stage.elem, "mousemove", this._ondrag),
                b.removeEvent(this, b.stage.elem, "mouseup", this._onup),
                (this._dragging = !1),
                this.trigger("StopDrag"),
                this
              );
            },
            startDrag: function () {
              return this._dragging || this._startDrag(b.lastEvent), this;
            },
            enableDrag: function () {
              return (
                this.bind("MouseDown", this._ondown),
                b.addEvent(this, b.stage.elem, "mouseup", this._onup),
                this
              );
            },
            disableDrag: function () {
              return (
                this.unbind("MouseDown", this._ondown),
                this._dragging && this.stopDrag(),
                this
              );
            },
          }),
          b.c("Keyboard", {
            isDown: function (a) {
              return "string" == typeof a && (a = b.keys[a]), !!b.keydown[a];
            },
          }),
          b.c("Multiway", {
            _speed: 3,
            _keydown: function (a) {
              this._keys[a.key] &&
                ((this._movement.x =
                  Math.round(1e3 * (this._movement.x + this._keys[a.key].x)) /
                  1e3),
                (this._movement.y =
                  Math.round(1e3 * (this._movement.y + this._keys[a.key].y)) /
                  1e3),
                this.trigger("NewDirection", this._movement));
            },
            _keyup: function (a) {
              this._keys[a.key] &&
                ((this._movement.x =
                  Math.round(1e3 * (this._movement.x - this._keys[a.key].x)) /
                  1e3),
                (this._movement.y =
                  Math.round(1e3 * (this._movement.y - this._keys[a.key].y)) /
                  1e3),
                this.trigger("NewDirection", this._movement));
            },
            _enterframe: function () {
              this.disableControls ||
                (0 !== this._movement.x &&
                  ((this.x += this._movement.x),
                  this.trigger("Moved", {
                    x: this.x - this._movement.x,
                    y: this.y,
                  })),
                0 !== this._movement.y &&
                  ((this.y += this._movement.y),
                  this.trigger("Moved", {
                    x: this.x,
                    y: this.y - this._movement.y,
                  })));
            },
            _initializeControl: function () {
              return this.unbind("KeyDown", this._keydown)
                .unbind("KeyUp", this._keyup)
                .unbind("EnterFrame", this._enterframe)
                .bind("KeyDown", this._keydown)
                .bind("KeyUp", this._keyup)
                .bind("EnterFrame", this._enterframe);
            },
            multiway: function (a, c) {
              (this._keyDirection = {}),
                (this._keys = {}),
                (this._movement = { x: 0, y: 0 }),
                (this._speed = { x: 3, y: 3 }),
                c
                  ? void 0 !== a.x && void 0 !== a.y
                    ? ((this._speed.x = a.x), (this._speed.y = a.y))
                    : ((this._speed.x = a), (this._speed.y = a))
                  : (c = a),
                (this._keyDirection = c),
                this.speed(this._speed),
                this._initializeControl();
              for (var d in c)
                b.keydown[b.keys[d]] &&
                  this.trigger("KeyDown", { key: b.keys[d] });
              return this;
            },
            enableControl: function () {
              return (this.disableControls = !1), this;
            },
            disableControl: function () {
              return (this.disableControls = !0), this;
            },
            speed: function (a) {
              for (var c in this._keyDirection) {
                var d = b.keys[c] || c;
                this._keys[d] = {
                  x:
                    Math.round(
                      1e3 *
                        Math.cos(this._keyDirection[c] * (Math.PI / 180)) *
                        a.x
                    ) / 1e3,
                  y:
                    Math.round(
                      1e3 *
                        Math.sin(this._keyDirection[c] * (Math.PI / 180)) *
                        a.y
                    ) / 1e3,
                };
              }
              return this;
            },
          }),
          b.c("Fourway", {
            init: function () {
              this.requires("Multiway");
            },
            fourway: function (a) {
              return (
                this.multiway(a, {
                  UP_ARROW: -90,
                  DOWN_ARROW: 90,
                  RIGHT_ARROW: 0,
                  LEFT_ARROW: 180,
                  W: -90,
                  S: 90,
                  D: 0,
                  A: 180,
                  Z: -90,
                  Q: 180,
                }),
                this
              );
            },
          }),
          b.c("Twoway", {
            _speed: 3,
            _up: !1,
            init: function () {
              this.requires("Fourway, Keyboard, Gravity");
            },
            twoway: function (a, c) {
              return (
                this.multiway(a, {
                  RIGHT_ARROW: 0,
                  LEFT_ARROW: 180,
                  D: 0,
                  A: 180,
                  Q: 180,
                }),
                a && (this._speed = a),
                (this._jumpSpeed = arguments.length < 2 ? 2 * this._speed : c),
                this.bind("EnterFrame", function () {
                  this.disableControls ||
                    (this._up &&
                      ((this.y -= this._jumpSpeed),
                      (this._falling = !0),
                      this.trigger("Moved", {
                        x: this._x,
                        y: this._y + this._jumpSpeed,
                      })));
                }).bind("KeyDown", function (a) {
                  this._falling ||
                    (a.key !== b.keys.UP_ARROW &&
                      a.key !== b.keys.W &&
                      a.key !== b.keys.Z) ||
                    (this._up = !0);
                }),
                this
              );
            },
          });
      },
      { "./core.js": 10 },
    ],
    10: [
      function (a, b) {
        function c() {
          var a = e++;
          return a in h ? c() : a;
        }
        function d(a) {
          if (null === a || "object" != typeof a) return a;
          var b = a.constructor();
          for (var c in a) b[c] = d(a[c]);
          return b;
        }
        var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n = a("./version"),
          o = function (a) {
            return new o.fn.init(a);
          };
        (g = {}), (k = Array.prototype.slice), (l = /\s*,\s*/), (m = /\s+/);
        var p = function () {
          (e = 1), (f = 0), (h = {}), (i = {}), (j = []);
        };
        p(),
          (o.fn = o.prototype =
            {
              init: function (a) {
                if ("string" != typeof a)
                  return (
                    a || ((a = 0), a in h || (h[a] = this)),
                    a in h
                      ? ((this[0] = a),
                        (this.length = 1),
                        this.__c || (this.__c = {}),
                        h[a] || (h[a] = this),
                        h[a])
                      : ((this.length = 0), this)
                  );
                var b,
                  c,
                  d,
                  e,
                  f,
                  i,
                  j,
                  k = 0,
                  n = !1,
                  o = !1;
                if ("*" === a) {
                  i = 0;
                  for (b in h) (this[i] = +b), i++;
                  return (this.length = i), 1 === i ? h[this[0]] : this;
                }
                -1 !== a.indexOf(",")
                  ? ((o = !0), (d = l))
                  : -1 !== a.indexOf(" ") && ((n = !0), (d = m));
                for (b in h)
                  if (h.hasOwnProperty(b))
                    if (((c = h[b]), n || o)) {
                      for (
                        e = a.split(d), i = 0, j = e.length, f = 0;
                        j > i;
                        i++
                      )
                        c.__c[e[i]] && f++;
                      ((n && f === j) || (o && f > 0)) && (this[k++] = +b);
                    } else c.__c[a] && (this[k++] = +b);
                if ((k > 0 && !n && !o && this.extend(g[a]), e && n))
                  for (i = 0; j > i; i++) this.extend(g[e[i]]);
                return (this.length = k), 1 === k ? h[this[k - 1]] : this;
              },
              setName: function (a) {
                var b = String(a);
                return (
                  (this._entityName = b), this.trigger("NewEntityName", b), this
                );
              },
              addComponent: function (a) {
                var b = [],
                  c = 0;
                if (arguments.length > 1)
                  for (var d = 0; d < arguments.length; d++)
                    b.push(arguments[d]);
                else -1 !== a.indexOf(",") ? (b = a.split(l)) : b.push(a);
                for (; c < b.length; c++)
                  this.__c[b[c]] !== !0 &&
                    ((this.__c[b[c]] = !0),
                    this.extend(g[b[c]]),
                    g[b[c]] && "init" in g[b[c]] && g[b[c]].init.call(this));
                return this.trigger("NewComponent", b), this;
              },
              toggleComponent: function (a) {
                var b,
                  c,
                  d = 0;
                if (arguments.length > 1)
                  for (b = arguments.length; b > d; d++)
                    this.has(arguments[d])
                      ? this.removeComponent(arguments[d])
                      : this.addComponent(arguments[d]);
                else if (-1 !== a.indexOf(","))
                  for (c = a.split(l), b = c.length; b > d; d++)
                    this.has(c[d])
                      ? this.removeComponent(c[d])
                      : this.addComponent(c[d]);
                else
                  this.has(a) ? this.removeComponent(a) : this.addComponent(a);
                return this;
              },
              requires: function (a) {
                return this.addComponent(a);
              },
              removeComponent: function (a, b) {
                var c = g[a];
                if (
                  (this.trigger("RemoveComponent", a),
                  c && "remove" in c && c.remove.call(this, !1),
                  b === !1 && c)
                )
                  for (var d in c) delete this[d];
                return delete this.__c[a], this;
              },
              getId: function () {
                return this[0];
              },
              has: function (a) {
                return !!this.__c[a];
              },
              attr: function (a, b, c, d) {
                return 1 === arguments.length && "string" == typeof arguments[0]
                  ? this._attr_get(a)
                  : this._attr_set(a, b, c, d);
              },
              _attr_get: function (a, b) {
                var c, d, e;
                return (
                  ("undefined" == typeof b || null === b) && (b = this),
                  a.indexOf(".") > -1
                    ? ((d = a.split(".")),
                      (c = d.shift()),
                      (e = d.join(".")),
                      this._attr_get(d.join("."), b[c]))
                    : b[a]
                );
              },
              _attr_set: function () {
                var a, b, c;
                return (
                  "string" == typeof arguments[0]
                    ? ((a = this._set_create_object(
                        arguments[0],
                        arguments[1]
                      )),
                      (b = !!arguments[2]),
                      (c = arguments[3] || arguments[0].indexOf(".") > -1))
                    : ((a = arguments[0]),
                      (b = !!arguments[1]),
                      (c = !!arguments[2])),
                  b || this.trigger("Change", a),
                  c
                    ? this._recursive_extend(a, this)
                    : this.extend.call(this, a),
                  this
                );
              },
              _set_create_object: function (a, b) {
                var c,
                  d,
                  e,
                  f = {};
                return (
                  a.indexOf(".") > -1
                    ? ((c = a.split(".")),
                      (d = c.shift()),
                      (e = c.join(".")),
                      (f[d] = this._set_create_object(e, b)))
                    : (f[a] = b),
                  f
                );
              },
              _recursive_extend: function (a, b) {
                var c;
                for (c in a)
                  b[c] =
                    "Object" === a[c].constructor.name
                      ? this._recursive_extend(a[c], b[c])
                      : a[c];
                return b;
              },
              toArray: function () {
                return k.call(this, 0);
              },
              timeout: function (a, b) {
                return (
                  this.each(function () {
                    var c = this;
                    setTimeout(function () {
                      a.call(c);
                    }, b);
                  }),
                  this
                );
              },
              bind: function (a, b) {
                var c,
                  d = i[a] || (i[a] = {});
                return 1 === this.length
                  ? ((c = d[this[0]]),
                    c || ((c = d[this[0]] = []), (c.depth = 0)),
                    c.push(b),
                    this)
                  : (this.each(function () {
                      (c = d[this[0]]),
                        c || ((c = d[this[0]] = []), (c.depth = 0)),
                        c.push(b);
                    }),
                    this);
              },
              uniqueBind: function (a, b) {
                this.unbind(a, b), this.bind(a, b);
              },
              one: function (a, b) {
                var c = this,
                  d = function (e) {
                    b.call(c, e), c.unbind(a, d);
                  };
                return c.bind(a, d);
              },
              unbind: function (a, b) {
                return (
                  this.each(function () {
                    var c,
                      d,
                      e = i[a] || (i[a] = {}),
                      f = 0;
                    if (!e || !e[this[0]]) return this;
                    if (((c = e[this[0]].length), !b))
                      return delete e[this[0]], this;
                    for (; c > f; f++)
                      (d = e[this[0]]), d[f] == b && delete d[f];
                  }),
                  this
                );
              },
              trigger: function (a, b) {
                var c = i[a] || (i[a] = {});
                if (1 === this.length) {
                  if (c && c[this[0]]) {
                    var d,
                      e = c[this[0]],
                      f = e.length;
                    for (e.depth++, d = 0; f > d; d++)
                      "undefined" == typeof e[d] && e.depth <= 1
                        ? (e.splice(d, 1), d--, f--)
                        : e[d].call(this, b);
                    e.depth--;
                  }
                  return this;
                }
                return (
                  this.each(function () {
                    if (i[a] && i[a][this[0]]) {
                      var c,
                        d = i[a][this[0]],
                        e = d.length;
                      for (d.depth++, c = 0; e > c; c++)
                        "undefined" == typeof d[c] && d.depth <= 1
                          ? (d.splice(c, 1), c--, e--)
                          : d[c].call(this, b);
                      d.depth--;
                    }
                  }),
                  this
                );
              },
              each: function (a) {
                for (var b = 0, c = this.length; c > b; b++)
                  h[this[b]] && a.call(h[this[b]], b);
                return this;
              },
              get: function (a) {
                var b = this.length;
                if ("undefined" != typeof a)
                  return a >= b || 0 > a + b
                    ? void 0
                    : a >= 0
                    ? h[this[a]]
                    : h[this[a + b]];
                for (var c = 0, d = []; b > c; c++)
                  h[this[c]] && d.push(h[this[c]]);
                return d;
              },
              clone: function () {
                var a,
                  b,
                  c = this.__c,
                  d = o.e();
                for (a in c) d.addComponent(a);
                for (b in this)
                  "0" != b &&
                    "_global" != b &&
                    "_changed" != b &&
                    "function" != typeof this[b] &&
                    "object" != typeof this[b] &&
                    (d[b] = this[b]);
                return d;
              },
              setter: function (a, b) {
                return (
                  o.support.setter
                    ? this.__defineSetter__(a, b)
                    : o.support.defineProperty &&
                      Object.defineProperty(this, a, {
                        set: b,
                        configurable: !0,
                      }),
                  this
                );
              },
              destroy: function () {
                this.each(function () {
                  var a;
                  this.trigger("Remove");
                  for (var b in this.__c)
                    (a = g[b]), a && "remove" in a && a.remove.call(this, !0);
                  for (var c in i) this.unbind(c);
                  delete h[this[0]];
                });
              },
            }),
          (o.fn.init.prototype = o.fn),
          (o.extend = o.fn.extend =
            function (a) {
              var b,
                c = this;
              if (!a) return c;
              for (b in a) c !== a[b] && (c[b] = a[b]);
              return c;
            }),
          o.extend({
            init: function (a, b, c) {
              return (
                o.viewport.init(a, b, c),
                this.trigger("Load"),
                this.timer.init(),
                this
              );
            },
            getVersion: function () {
              return n;
            },
            stop: function (a) {
              if ((this.timer.stop(), a)) {
                if ((o.audio.remove(), o.stage && o.stage.elem.parentNode)) {
                  var b = document.createElement("div");
                  (b.id = o.stage.elem.id),
                    o.stage.elem.parentNode.replaceChild(b, o.stage.elem);
                }
                p();
              }
              return o.trigger("CraftyStop"), this;
            },
            pause: function (a) {
              return (
                (1 === arguments.length ? a : !this._paused)
                  ? (this.trigger("Pause"),
                    (this._paused = !0),
                    setTimeout(function () {
                      o.timer.stop();
                    }, 0),
                    (o.keydown = {}))
                  : (this.trigger("Unpause"),
                    (this._paused = !1),
                    setTimeout(function () {
                      o.timer.init();
                    }, 0)),
                this
              );
            },
            isPaused: function () {
              return this._paused;
            },
            timer: (function () {
              var a,
                b,
                c,
                d = "fixed",
                e = 5,
                g = 40,
                h = 0,
                i = 0,
                j = 50,
                k = 1e3 / j;
              return {
                init: function () {
                  "undefined" == typeof c && (c = new Date().getTime() - k);
                  var d =
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    null;
                  d
                    ? (a = function () {
                        o.timer.step(), (b = d(a));
                      })()
                    : (a = setInterval(function () {
                        o.timer.step();
                      }, 1e3 / j));
                },
                stop: function () {
                  o.trigger("CraftyStopTimer"),
                    "number" == typeof a && clearInterval(a);
                  var c =
                    window.cancelAnimationFrame ||
                    window.cancelRequestAnimationFrame ||
                    window.webkitCancelRequestAnimationFrame ||
                    window.mozCancelRequestAnimationFrame ||
                    window.oCancelRequestAnimationFrame ||
                    window.msCancelRequestAnimationFrame ||
                    null;
                  c && c(b), (a = null);
                },
                steptype: function (a, b) {
                  if ("variable" === a || "semifixed" === a)
                    (d = a), b && (g = b);
                  else {
                    if ("fixed" !== a) throw "Invalid step type specified";
                    (d = "fixed"), b && (e = b);
                  }
                },
                step: function () {
                  var a,
                    b,
                    j,
                    l = 0;
                  if (
                    ((currentTime = new Date().getTime()),
                    h > 0 && o.trigger("MeasureWaitTime", currentTime - h),
                    c + i >= currentTime)
                  )
                    return void (h = currentTime);
                  var m = currentTime - (c + i);
                  m > 20 * k && ((i += m - k), (m = k)),
                    "fixed" === d
                      ? ((l = Math.ceil(m / k)), (l = Math.min(l, e)), (b = k))
                      : "variable" === d
                      ? ((l = 1), (b = m), (b = Math.min(b, g)))
                      : "semifixed" === d &&
                        ((l = Math.ceil(m / g)), (b = m / l));
                  for (var n = 0; l > n; n++) {
                    j = currentTime;
                    var p = { frame: f++, dt: b, gameTime: c };
                    o.trigger("EnterFrame", p),
                      o.trigger("ExitFrame", p),
                      (c += b),
                      (currentTime = new Date().getTime()),
                      o.trigger("MeasureFrameTime", currentTime - j);
                  }
                  l > 0 &&
                    ((a = currentTime),
                    o.trigger("PreRender"),
                    o.trigger("RenderScene"),
                    o.trigger("PostRender"),
                    (currentTime = new Date().getTime()),
                    o.trigger("MeasureRenderTime", currentTime - a)),
                    (h = currentTime);
                },
                FPS: function (a) {
                  return "undefined" == typeof a
                    ? j
                    : ((j = a), void (k = 1e3 / j));
                },
                simulateFrames: function (a, b) {
                  for ("undefined" == typeof b && (b = k); a-- > 0; ) {
                    var c = { frame: f++, dt: b };
                    o.trigger("EnterFrame", c), o.trigger("ExitFrame", c);
                  }
                  o.trigger("PreRender"),
                    o.trigger("RenderScene"),
                    o.trigger("PostRender");
                },
              };
            })(),
            e: function () {
              var a = c();
              return (
                (h[a] = null),
                (h[a] = o(a)),
                arguments.length > 0 &&
                  h[a].addComponent.apply(h[a], arguments),
                h[a].setName("Entity #" + a),
                h[a].addComponent("obj"),
                o.trigger("NewEntity", { id: a }),
                h[a]
              );
            },
            c: function (a, b) {
              g[a] = b;
            },
            trigger: function (a, b) {
              var c,
                d,
                e,
                f,
                g,
                j = i[a] || (i[a] = {});
              for (c in j)
                if (j.hasOwnProperty(c) && ((f = j[c]), f && 0 !== f.length)) {
                  if (h[c]) g = o(+c);
                  else {
                    if ("global" !== c) continue;
                    g = o;
                  }
                  for (f.depth++, e = f.length, d = 0; e > d; d++)
                    "undefined" == typeof f[d] && f.depth <= 1
                      ? (f.splice(d, 1), d--, e--)
                      : f[d].call(g, b);
                  f.depth--;
                }
            },
            bind: function (a, b) {
              var c = i[a] || (i[a] = {});
              return (
                c.global || ((c.global = []), (c.global.depth = 0)),
                c.global.push(b),
                b
              );
            },
            uniqueBind: function (a, b) {
              return this.unbind(a, b), this.bind(a, b);
            },
            one: function (a, b) {
              var c = this,
                d = function (e) {
                  b.call(c, e), c.unbind(a, d);
                };
              return c.bind(a, d);
            },
            unbind: function (a, b) {
              var c,
                d,
                e,
                f,
                g = i[a];
              if (void 0 === g || void 0 === g.global || 0 === g.global.length)
                return !1;
              if (1 === arguments.length) return delete g.global, !0;
              for (e = g.global, f = !1, c = 0, d = e.length; d > c; c++)
                e[c] === b && ((f = !0), delete e[c]);
              return f;
            },
            frame: function () {
              return f;
            },
            components: function () {
              return g;
            },
            isComp: function (a) {
              return a in g;
            },
            debug: function (a) {
              return "handlers" === a ? i : h;
            },
            settings: (function () {
              var a = {},
                b = {};
              return {
                register: function (a, c) {
                  b[a] = c;
                },
                modify: function (c, d) {
                  b[c] && (b[c].call(a[c], d), (a[c] = d));
                },
                get: function (b) {
                  return a[b];
                },
              };
            })(),
            clone: d,
          }),
          "function" == typeof define &&
            define("crafty", [], function () {
              return o;
            }),
          (b.exports = o);
      },
      { "./version": 30 },
    ],
    11: [
      function (a, b) {
        var c = a("./core");
        a("./2D"),
          a("./animation"),
          a("./canvas"),
          a("./collision"),
          a("./color"),
          a("./controls"),
          a("./DebugLayer"),
          a("./device"),
          a("./diamondiso"),
          a("./DOM"),
          a("./drawing"),
          a("./extensions"),
          a("./HashMap"),
          a("./html"),
          a("./isometric"),
          a("./keycodes"),
          a("./loader"),
          a("./math"),
          a("./model"),
          a("./particles"),
          a("./scenes"),
          a("./sound"),
          a("./sprite-animation"),
          a("./sprite"),
          a("./storage"),
          a("./text"),
          a("./time"),
          a("./version"),
          a("./viewport"),
          window && (window.Crafty = c),
          (b.exports = c);
      },
      {
        "./2D": 1,
        "./DOM": 2,
        "./DebugLayer": 3,
        "./HashMap": 4,
        "./animation": 5,
        "./canvas": 6,
        "./collision": 7,
        "./color": 8,
        "./controls": 9,
        "./core": 10,
        "./device": 12,
        "./diamondiso": 13,
        "./drawing": 14,
        "./extensions": 15,
        "./html": 16,
        "./isometric": 17,
        "./keycodes": 18,
        "./loader": 19,
        "./math": 20,
        "./model": 21,
        "./particles": 22,
        "./scenes": 23,
        "./sound": 24,
        "./sprite": 26,
        "./sprite-animation": 25,
        "./storage": 27,
        "./text": 28,
        "./time": 29,
        "./version": 30,
        "./viewport": 31,
      },
    ],
    12: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.extend({
          device: {
            _deviceOrientationCallback: !1,
            _deviceMotionCallback: !1,
            _normalizeDeviceOrientation: function (a) {
              var c;
              window.DeviceOrientationEvent
                ? (c = {
                    tiltLR: a.gamma,
                    tiltFB: a.beta,
                    dir: a.alpha,
                    motUD: null,
                  })
                : window.OrientationEvent &&
                  (c = {
                    tiltLR: 90 * a.x,
                    tiltFB: -90 * a.y,
                    dir: null,
                    motUD: a.z,
                  }),
                b.device._deviceOrientationCallback(c);
            },
            _normalizeDeviceMotion: function (a) {
              var c = a.accelerationIncludingGravity,
                d = c.z > 0 ? 1 : -1,
                e = {
                  acceleration: c,
                  rawAcceleration:
                    "[" +
                    Math.round(c.x) +
                    ", " +
                    Math.round(c.y) +
                    ", " +
                    Math.round(c.z) +
                    "]",
                  facingUp: d,
                  tiltLR: Math.round((c.x / 9.81) * -90),
                  tiltFB: Math.round(((c.y + 9.81) / 9.81) * 90 * d),
                };
              b.device._deviceMotionCallback(e);
            },
            deviceOrientation: function (a) {
              (this._deviceOrientationCallback = a),
                b.support.deviceorientation &&
                  (window.DeviceOrientationEvent
                    ? b.addEvent(
                        this,
                        window,
                        "deviceorientation",
                        this._normalizeDeviceOrientation
                      )
                    : window.OrientationEvent &&
                      b.addEvent(
                        this,
                        window,
                        "MozOrientation",
                        this._normalizeDeviceOrientation
                      ));
            },
            deviceMotion: function (a) {
              (this._deviceMotionCallback = a),
                b.support.devicemotion &&
                  window.DeviceMotionEvent &&
                  b.addEvent(
                    this,
                    window,
                    "devicemotion",
                    this._normalizeDeviceMotion
                  );
            },
          },
        });
      },
      { "./core.js": 10 },
    ],
    13: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.extend({
          diamondIso: {
            _tile: { width: 0, height: 0, r: 0 },
            _map: { width: 0, height: 0, x: 0, y: 0 },
            _origin: { x: 0, y: 0 },
            init: function (a, b, c, d) {
              return (
                (this._tile.width = parseInt(a, 10)),
                (this._tile.height = parseInt(b, 10) || parseInt(a, 10) / 2),
                (this._tile.r = this._tile.width / this._tile.height),
                (this._map.width = parseInt(c, 10)),
                (this._map.height = parseInt(d, 10) || parseInt(c, 10)),
                (this._origin.x = (this._map.height * this._tile.width) / 2),
                this
              );
            },
            place: function (a, b, c, d) {
              var e = this.pos2px(b, c);
              d || (d = 1);
              var f = 0,
                g = 0;
              void 0 !== a.__margin &&
                ((f = a.__margin[0]), (g = a.__margin[1])),
                (a.x = e.left + f),
                (a.y = e.top + g - a.h),
                (a.z = e.top * d);
            },
            centerAt: function (a, c) {
              var d = this.pos2px(a, c);
              (b.viewport.x =
                -d.left + b.viewport.width / 2 - this._tile.width),
                (b.viewport.y = -d.top + b.viewport.height / 2);
            },
            area: function (a) {
              a || (a = 0);
              var c = b.viewport.rect(),
                d = c._x,
                e = c._y,
                f = c._w,
                g = c._h,
                h = a * this._tile.width,
                i = a * this._tile.height;
              (d -= this._tile.width / 2 + h),
                (e -= this._tile.height / 2 + i),
                (f += this._tile.width / 2 + h),
                (g += this._tile.height / 2 + i);
              var j = [];
              for (yl = e + g; yl > e; e += this._tile.height / 2)
                for (xl = d + f; xl > d; d += this._tile.width / 2) {
                  var k = this.px2pos(d, e);
                  j.push([~~k.x, ~~k.y]);
                }
              return j;
            },
            pos2px: function (a, b) {
              return {
                left: ((a - b) * this._tile.width) / 2 + this._origin.x,
                top: ((a + b) * this._tile.height) / 2,
              };
            },
            px2pos: function (a, b) {
              var c = (a - this._origin.x) / this._tile.r;
              return {
                x: (b + c) / this._tile.height,
                y: (b - c) / this._tile.height,
              };
            },
            polygon: function (a) {
              a.requires("Collision");
              var c = 0,
                d = 0;
              void 0 !== a.__margin &&
                ((c = a.__margin[0]), (d = a.__margin[1]));
              var e = [
                  [c - 0, a.h - d - this._tile.height / 2],
                  [c - this._tile.width / 2, a.h - d - 0],
                  [c - this._tile.width, a.h - d - this._tile.height / 2],
                  [c - this._tile.width / 2, a.h - d - this._tile.height],
                ],
                f = new b.polygon(e);
              return f;
            },
          },
        });
      },
      { "./core.js": 10 },
    ],
    14: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.c("Image", {
          _repeat: "repeat",
          ready: !1,
          init: function () {
            var a = function (a) {
              if ("canvas" === a.type) {
                if (!this.ready || !this._pattern) return;
                var b = a.ctx;
                (b.fillStyle = this._pattern),
                  b.save(),
                  b.translate(a.pos._x, a.pos._y),
                  b.fillRect(0, 0, this._w, this._h),
                  b.restore();
              } else
                "DOM" === a.type &&
                  this.__image &&
                  ((a.style.backgroundImage = "url(" + this.__image + ")"),
                  (a.style.backgroundRepeat = this._repeat));
            };
            this.bind("Draw", a).bind("RemoveComponent", function (b) {
              "Image" === b && this.unbind("Draw", a);
            });
          },
          image: function (a, c) {
            if (
              ((this.__image = a),
              (this._repeat = c || "no-repeat"),
              (this.img = b.asset(a)),
              !this.img)
            ) {
              (this.img = new Image()),
                b.asset(a, this.img),
                (this.img.src = a);
              var d = this;
              return (
                (this.img.onload = function () {
                  d.has("Canvas") &&
                    (d._pattern = b.canvas.context.createPattern(
                      d.img,
                      d._repeat
                    )),
                    (d.ready = !0),
                    "no-repeat" === d._repeat &&
                      ((d.w = d.img.width), (d.h = d.img.height)),
                    d.trigger("Invalidate");
                }),
                this
              );
            }
            return (
              (this.ready = !0),
              this.has("Canvas") &&
                (this._pattern = b.canvas.context.createPattern(
                  this.img,
                  this._repeat
                )),
              "no-repeat" === this._repeat &&
                ((this.w = this.img.width), (this.h = this.img.height)),
              this.trigger("Invalidate"),
              this
            );
          },
        }),
          (b.DrawManager = (function () {
            function a(a, b) {
              return a._globalZ - b._globalZ;
            }
            var c = [],
              d = [],
              e = [],
              f = !1,
              g = {
                merge: function (a, b, c) {
                  return (
                    "undefined" == typeof c && (c = {}),
                    (c._h = Math.max(a._y + a._h, b._y + b._h)),
                    (c._w = Math.max(a._x + a._w, b._x + b._w)),
                    (c._x = Math.min(a._x, b._x)),
                    (c._y = Math.min(a._y, b._y)),
                    (c._w -= c._x),
                    (c._h -= c._y),
                    c
                  );
                },
                clean: function () {
                  var a, b, e;
                  for (e = 0, l = d.length; l > e; e++)
                    (b = d[e]),
                      (a = b._mbr || b),
                      "undefined" == typeof b.staleRect && (b.staleRect = {}),
                      (b.staleRect._x = a._x),
                      (b.staleRect._y = a._y),
                      (b.staleRect._w = a._w),
                      (b.staleRect._h = a._h),
                      (b._changed = !1);
                  (d.length = 0), (c.length = 0);
                },
                createDirty: function (a) {
                  var b = a._mbr || a;
                  if (a.staleRect) {
                    if (g.overlap(a.staleRect, b))
                      return (
                        g.merge(a.staleRect, b, a.staleRect),
                        void c.push(a.staleRect)
                      );
                    c.push(a.staleRect);
                  }
                  (a.currentRect._x = b._x),
                    (a.currentRect._y = b._y),
                    (a.currentRect._w = b._w),
                    (a.currentRect._h = b._h),
                    c.push(a.currentRect);
                },
                overlap: function (a, b) {
                  return (
                    a._x < b._x + b._w &&
                    a._y < b._y + b._h &&
                    a._x + a._w > b._x &&
                    a._y + a._h > b._y
                  );
                },
              };
            return (
              b.bind("InvalidateViewport", function () {
                f = !0;
              }),
              b.bind("PostRender", function () {
                f = !1;
              }),
              {
                total2D: b("2D").length,
                onScreen: function (a) {
                  return (
                    b.viewport._x + a._x + a._w > 0 &&
                    b.viewport._y + a._y + a._h > 0 &&
                    b.viewport._x + a._x < b.viewport.width &&
                    b.viewport._y + a._y < b.viewport.height
                  );
                },
                mergeSet: function (a) {
                  for (var b = 0; b < a.length - 1; )
                    g.overlap(a[b], a[b + 1])
                      ? (g.merge(a[b], a[b + 1], a[b]),
                        a.splice(b + 1, 1),
                        b > 0 && b--)
                      : b++;
                  return a;
                },
                addCanvas: function (a) {
                  d.push(a);
                },
                addDom: function (a) {
                  e.push(a);
                },
                debug: function () {
                  console.log(d, e);
                },
                drawAll: function (c) {
                  c = c || b.viewport.rect();
                  var d,
                    e = b.map.search(c),
                    f = 0,
                    g = e.length,
                    h = b.canvas.context;
                  for (
                    h.clearRect(c._x, c._y, c._w, c._h), e.sort(a);
                    g > f;
                    f++
                  )
                    (d = e[f]),
                      d._visible &&
                        d.__c.Canvas &&
                        (d.draw(), (d._changed = !1));
                },
                boundingRect: function (a) {
                  if (a && a.length) {
                    var b,
                      c,
                      d = 1,
                      e = a.length,
                      f = a[0];
                    for (f = [f._x, f._y, f._x + f._w, f._y + f._h]; e > d; )
                      (b = a[d]),
                        (c = [b._x, b._y, b._x + b._w, b._y + b._h]),
                        c[0] < f[0] && (f[0] = c[0]),
                        c[1] < f[1] && (f[1] = c[1]),
                        c[2] > f[2] && (f[2] = c[2]),
                        c[3] > f[3] && (f[3] = c[3]),
                        d++;
                    return (
                      (c = f),
                      (f = {
                        _x: c[0],
                        _y: c[1],
                        _w: c[2] - c[0],
                        _h: c[3] - c[1],
                      })
                    );
                  }
                },
                renderCanvas: function () {
                  var e = d.length;
                  if (e || f) {
                    var h,
                      i,
                      j,
                      k,
                      l,
                      m = 0,
                      n = b.canvas.context,
                      o = b.DrawManager;
                    if (f) {
                      var p = b.viewport;
                      n.setTransform(
                        p._scale,
                        0,
                        0,
                        p._scale,
                        Math.round(p._x * p._scale),
                        Math.round(p._y * p._scale)
                      );
                    }
                    if (e / o.total2D > 0.6 || f)
                      return o.drawAll(), void g.clean();
                    for (m = 0; e > m; m++) g.createDirty(d[m]);
                    (c = o.mergeSet(c)), (e = c.length);
                    var q = [],
                      r = [];
                    for (m = 0; e > m; ++m)
                      if (((h = c[m]), (q.length = 0), (r.length = 0), h)) {
                        for (
                          h._w = h._x + h._w,
                            h._h = h._y + h._h,
                            h._x = h._x > 0 ? 0 | h._x : (0 | h._x) - 1,
                            h._y = h._y > 0 ? 0 | h._y : (0 | h._y) - 1,
                            h._w -= h._x,
                            h._h -= h._y,
                            h._w = h._w === (0 | h._w) ? h._w : (0 | h._w) + 1,
                            h._h = h._h === (0 | h._h) ? h._h : (0 | h._h) + 1,
                            i = b.map.search(h, !1),
                            n.clearRect(h._x, h._y, h._w, h._h),
                            n.save(),
                            n.beginPath(),
                            n.rect(h._x, h._y, h._w, h._h),
                            n.clip(),
                            j = 0,
                            k = i.length;
                          k > j;
                          ++j
                        )
                          (l = i[j]),
                            !q[l[0]] &&
                              l._visible &&
                              l.__c.Canvas &&
                              ((q[l[0]] = !0), r.push(l));
                        for (r.sort(a), j = 0, k = r.length; k > j; ++j) {
                          l = r[j];
                          var s = l._mbr || l;
                          g.overlap(s, h) && l.draw(), (l._changed = !1);
                        }
                        n.closePath(), n.restore();
                      }
                    if (b.DrawManager.debugDirty === !0)
                      for (
                        n.strokeStyle = "red", m = 0, e = c.length;
                        e > m;
                        ++m
                      )
                        (h = c[m]), n.strokeRect(h._x, h._y, h._w, h._h);
                    g.clean();
                  }
                },
                renderDOM: function () {
                  if (f) {
                    var a = b.stage.inner.style,
                      c = b.viewport;
                    (a.transform = a[b.support.prefix + "Transform"] =
                      "scale(" + c._scale + ", " + c._scale + ")"),
                      (a.left = Math.round(c._x * c._scale) + "px"),
                      (a.top = Math.round(c._y * c._scale) + "px"),
                      (a.zIndex = 10);
                  }
                  if (e.length) {
                    for (var d = 0, g = e.length; g > d; ++d)
                      e[d].draw()._changed = !1;
                    e.length = 0;
                  }
                },
              }
            );
          })()),
          b.extend({
            _pixelartEnabled: !1,
            pixelart: function (a) {
              (b._pixelartEnabled = a), b.trigger("PixelartSet", a);
            },
          });
      },
      { "./core.js": 10 },
    ],
    15: [
      function (a) {
        var b = a("./core.js"),
          c = window.document;
        !(function () {
          var a = (b.support = {}),
            d = navigator.userAgent.toLowerCase(),
            e =
              /(webkit)[ \/]([\w.]+)/.exec(d) ||
              /(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(d) ||
              /(ms)ie ([\w.]+)/.exec(d) ||
              /(moz)illa(?:.*? rv:([\w.]+))?/.exec(d) ||
              [],
            f = /iPad|iPod|iPhone|Android|webOS|IEMobile/i.exec(d);
          if (
            (f && (b.mobile = f[0]),
            (a.defineProperty = (function () {
              if (!("defineProperty" in Object)) return !1;
              try {
                Object.defineProperty({}, "x", {});
              } catch (a) {
                return !1;
              }
              return !0;
            })()),
            (a.audio = "Audio" in window),
            (a.prefix = e[1] || e[0]),
            "moz" === a.prefix && (a.prefix = "Moz"),
            "o" === a.prefix && (a.prefix = "O"),
            e[2] && ((a.versionName = e[2]), (a.version = +e[2].split(".")[0])),
            (a.canvas = "getContext" in c.createElement("canvas")),
            a.canvas)
          ) {
            var g;
            try {
              (g = c.createElement("canvas").getContext("experimental-webgl")),
                (g.viewportWidth = a.canvas.width),
                (g.viewportHeight = a.canvas.height);
            } catch (h) {}
            a.webgl = !!g;
          } else a.webgl = !1;
          (a.css3dtransform =
            "undefined" != typeof c.createElement("div").style.Perspective ||
            "undefined" !=
              typeof c.createElement("div").style[a.prefix + "Perspective"]),
            (a.deviceorientation =
              "undefined" != typeof window.DeviceOrientationEvent ||
              "undefined" != typeof window.OrientationEvent),
            (a.devicemotion = "undefined" != typeof window.DeviceMotionEvent);
        })(),
          b.extend({
            _events: {},
            addEvent: function (a, b, c, d) {
              3 === arguments.length &&
                ((d = c), (c = b), (b = window.document));
              var e = function (b) {
                  (b = b || window.event),
                    "function" == typeof d && d.call(a, b);
                },
                f = a[0] || "";
              this._events[f + b + c + d] ||
                ((this._events[f + b + c + d] = e),
                b.attachEvent
                  ? b.attachEvent("on" + c, e)
                  : b.addEventListener(c, e, !1));
            },
            removeEvent: function (a, b, c, d) {
              3 === arguments.length &&
                ((d = c), (c = b), (b = window.document));
              var e = a[0] || "",
                f = this._events[e + b + c + d];
              f &&
                (b.detachEvent
                  ? b.detachEvent("on" + c, f)
                  : b.removeEventListener(c, f, !1),
                delete this._events[e + b + c + d]);
            },
            background: function (a) {
              b.stage.elem.style.background = a;
            },
          });
      },
      { "./core.js": 10 },
    ],
    16: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.c("HTML", {
          inner: "",
          init: function () {
            this.requires("2D, DOM");
          },
          replace: function (a) {
            return (this.inner = a), (this._element.innerHTML = a), this;
          },
          append: function (a) {
            return (this.inner += a), (this._element.innerHTML += a), this;
          },
          prepend: function (a) {
            return (
              (this.inner = a + this.inner),
              (this._element.innerHTML = a + this.inner),
              this
            );
          },
        });
      },
      { "./core.js": 10 },
    ],
    17: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.extend({
          isometric: {
            _tile: { width: 0, height: 0 },
            _elements: {},
            _pos: { x: 0, y: 0 },
            _z: 0,
            size: function (a, b) {
              return (
                (this._tile.width = a),
                (this._tile.height = b > 0 ? b : a / 2),
                this
              );
            },
            place: function (a, c, d, e) {
              var f = this.pos2px(a, c);
              return (
                (f.top -= d * (this._tile.height / 2)),
                (e.attr({
                  x: f.left + b.viewport._x,
                  y: f.top + b.viewport._y,
                }).z += d),
                this
              );
            },
            pos2px: function (a, b) {
              return {
                left: a * this._tile.width + (1 & b) * (this._tile.width / 2),
                top: (b * this._tile.height) / 2,
              };
            },
            px2pos: function (a, b) {
              return {
                x: -Math.ceil(-a / this._tile.width - 0.5 * (1 & b)),
                y: (b / this._tile.height) * 2,
              };
            },
            centerAt: function (a, c) {
              if ("number" == typeof a && "number" == typeof c) {
                var d = this.pos2px(a, c);
                return (
                  (b.viewport._x =
                    -d.left + b.viewport.width / 2 - this._tile.width / 2),
                  (b.viewport._y =
                    -d.top + b.viewport.height / 2 - this._tile.height / 2),
                  this
                );
              }
              return {
                top:
                  -b.viewport._y +
                  b.viewport.height / 2 -
                  this._tile.height / 2,
                left:
                  -b.viewport._x + b.viewport.width / 2 - this._tile.width / 2,
              };
            },
            area: function () {
              var a = this.centerAt(),
                c = this.px2pos(
                  -a.left + b.viewport.width / 2,
                  -a.top + b.viewport.height / 2
                ),
                d = this.px2pos(
                  -a.left - b.viewport.width / 2,
                  -a.top - b.viewport.height / 2
                );
              return {
                x: { start: c.x, end: d.x },
                y: { start: c.y, end: d.y },
              };
            },
          },
        });
      },
      { "./core.js": 10 },
    ],
    18: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.extend({
          keys: {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            PAUSE: 19,
            CAPS: 20,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            INSERT: 45,
            DELETE: 46,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_0: 96,
            NUMPAD_1: 97,
            NUMPAD_2: 98,
            NUMPAD_3: 99,
            NUMPAD_4: 100,
            NUMPAD_5: 101,
            NUMPAD_6: 102,
            NUMPAD_7: 103,
            NUMPAD_8: 104,
            NUMPAD_9: 105,
            MULTIPLY: 106,
            ADD: 107,
            SUBSTRACT: 109,
            DECIMAL: 110,
            DIVIDE: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PLUS: 187,
            COMMA: 188,
            MINUS: 189,
            PERIOD: 190,
            PULT_UP: 29460,
            PULT_DOWN: 29461,
            PULT_LEFT: 4,
            PULT_RIGHT: 5,
          },
          mouseButtons: { LEFT: 0, MIDDLE: 1, RIGHT: 2 },
        });
      },
      { "./core.js": 10 },
    ],
    19: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.extend({
          assets: {},
          __paths: { audio: "", images: "" },
          paths: function (a) {
            return "undefined" == typeof a
              ? this.__paths
              : (a.audio && (this.__paths.audio = a.audio),
                void (a.images && (this.__paths.images = a.images)));
          },
          asset: function (a, c) {
            return 1 === arguments.length
              ? b.assets[a]
              : b.assets[a]
              ? void 0
              : ((b.assets[a] = c),
                this.trigger("NewAsset", { key: a, value: c }),
                c);
          },
          image_whitelist: ["jpg", "jpeg", "gif", "png", "svg"],
          load: function (a, c, d, e) {
            function f() {
              var a = this.src;
              this.removeEventListener &&
                this.removeEventListener("canplaythrough", f, !1),
                m++,
                d && d({ loaded: m, total: n, percent: (m / n) * 100, src: a }),
                m === n && c && c();
            }
            function g() {
              var a = this.src;
              e && e({ loaded: m, total: n, percent: (m / n) * 100, src: a }),
                m++,
                m === n && c && c();
            }
            a = "string" == typeof a ? JSON.parse(a) : a;
            var h,
              i,
              j,
              k,
              l,
              m = 0,
              n =
                (a.audio ? Object.keys(a.audio).length : 0) +
                (a.images ? Object.keys(a.images).length : 0) +
                (a.sprites ? Object.keys(a.sprites).length : 0),
              o = b.support.audio,
              p = b.paths(),
              q = function (a) {
                return a.substr(a.lastIndexOf(".") + 1, 3).toLowerCase();
              },
              r = function (a, b) {
                return -1 === b.search("://")
                  ? "audio" == a
                    ? p.audio + b
                    : p.images + b
                  : b;
              },
              s = function (a) {
                return b.asset(a) || null;
              },
              t = function (a) {
                return b.audio.supports(q(a));
              },
              u = function (a) {
                return -1 != b.image_whitelist.indexOf(q(a));
              },
              v = function (a, c) {
                (a.onload = f),
                  "webkit" === b.support.prefix && (a.src = ""),
                  (a.src = c);
              };
            for (k in a)
              for (l in a[k]) {
                if (((h = a[k][l]), "audio" === k && o)) {
                  if ("object" == typeof h) {
                    var w = [];
                    for (var x in h)
                      (i = r(k, h[x])), !s(i) && t(h[x]) && w.push(i);
                    j = b.audio.add(l, w).obj;
                  } else
                    "string" == typeof h &&
                      t(h) &&
                      ((i = r(k, h)), s(i) || (j = b.audio.add(l, i).obj));
                  j &&
                    j.addEventListener &&
                    j.addEventListener("canplaythrough", f, !1);
                } else
                  (l = "sprites" === k ? l : h),
                    (i = r(k, l)),
                    u(l) &&
                      ((j = s(i)),
                      j ||
                        ((j = new Image()),
                        "sprites" === k &&
                          b.sprite(
                            h.tile,
                            h.tileh,
                            i,
                            h.map,
                            h.paddingX,
                            h.paddingY,
                            h.paddingAroundBorder
                          ),
                        b.asset(i, j)),
                      v(j, i));
                j ? (j.onerror = g) : --n;
              }
            0 === n && c();
          },
          removeAssets: function (a) {
            a = "string" == typeof a ? JSON.parse(a) : a;
            var c,
              d,
              e,
              f,
              g = b.paths(),
              h = function (a, b) {
                return -1 === b.search("://")
                  ? "audio" == a
                    ? g.audio + b
                    : g.images + b
                  : b;
              };
            for (e in a)
              for (f in a[e])
                if (((c = a[e][f]), "audio" === e))
                  if ("object" == typeof c)
                    for (var i in c)
                      (d = h(e, c[i])), b.asset(d) && b.audio.remove(f);
                  else
                    "string" == typeof c &&
                      ((d = h(e, c)), b.asset(d) && b.audio.remove(f));
                else if (
                  ((f = "sprites" === e ? f : c), (d = h(e, f)), b.asset(d))
                ) {
                  if ("sprites" === e)
                    for (var j in c.map) delete b.components()[j];
                  delete b.assets[d];
                }
          },
        });
      },
      { "./core.js": 10 },
    ],
    20: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        (b.math = {
          abs: function (a) {
            return 0 > a ? -a : a;
          },
          amountOf: function (a, b, c) {
            return c > b ? (a - b) / (c - b) : (a - c) / (b - c);
          },
          clamp: function (a, b, c) {
            return a > c ? c : b > a ? b : a;
          },
          degToRad: function (a) {
            return (a * Math.PI) / 180;
          },
          distance: function (a, c, d, e) {
            var f = b.math.squaredDistance(a, c, d, e);
            return Math.sqrt(parseFloat(f));
          },
          lerp: function (a, b, c) {
            return a + (b - a) * c;
          },
          negate: function (a) {
            return Math.random() < a ? -1 : 1;
          },
          radToDeg: function (a) {
            return (180 * a) / Math.PI;
          },
          randomElementOfArray: function (a) {
            return a[Math.floor(a.length * Math.random())];
          },
          randomInt: function (a, b) {
            return a + Math.floor((1 + b - a) * Math.random());
          },
          randomNumber: function (a, b) {
            return a + (b - a) * Math.random();
          },
          squaredDistance: function (a, b, c, d) {
            return (a - c) * (a - c) + (b - d) * (b - d);
          },
          withinRange: function (a, b, c) {
            return a >= b && c >= a;
          },
        }),
          (b.math.Vector2D = (function () {
            function a(b, c) {
              if (b instanceof a) (this.x = b.x), (this.y = b.y);
              else if (2 === arguments.length) (this.x = b), (this.y = c);
              else if (arguments.length > 0)
                throw "Unexpected number of arguments for Vector2D()";
            }
            return (
              (a.prototype.x = 0),
              (a.prototype.y = 0),
              (a.prototype.add = function (a) {
                return (this.x += a.x), (this.y += a.y), this;
              }),
              (a.prototype.angleBetween = function (a) {
                return Math.atan2(
                  this.x * a.y - this.y * a.x,
                  this.x * a.x + this.y * a.y
                );
              }),
              (a.prototype.angleTo = function (a) {
                return Math.atan2(a.y - this.y, a.x - this.x);
              }),
              (a.prototype.clone = function () {
                return new a(this);
              }),
              (a.prototype.distance = function (a) {
                return Math.sqrt(
                  (a.x - this.x) * (a.x - this.x) +
                    (a.y - this.y) * (a.y - this.y)
                );
              }),
              (a.prototype.distanceSq = function (a) {
                return (
                  (a.x - this.x) * (a.x - this.x) +
                  (a.y - this.y) * (a.y - this.y)
                );
              }),
              (a.prototype.divide = function (a) {
                return (this.x /= a.x), (this.y /= a.y), this;
              }),
              (a.prototype.dotProduct = function (a) {
                return this.x * a.x + this.y * a.y;
              }),
              (a.prototype.crossProduct = function (a) {
                return this.x * a.y - this.y * a.x;
              }),
              (a.prototype.equals = function (b) {
                return b instanceof a && this.x == b.x && this.y == b.y;
              }),
              (a.prototype.perpendicular = function (b) {
                return (b = b || new a()), b.setValues(-this.y, this.x);
              }),
              (a.prototype.getNormal = function (b, c) {
                return (
                  (c = c || new a()),
                  c.setValues(b.y - this.y, this.x - b.x).normalize()
                );
              }),
              (a.prototype.isZero = function () {
                return 0 === this.x && 0 === this.y;
              }),
              (a.prototype.magnitude = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
              }),
              (a.prototype.magnitudeSq = function () {
                return this.x * this.x + this.y * this.y;
              }),
              (a.prototype.multiply = function (a) {
                return (this.x *= a.x), (this.y *= a.y), this;
              }),
              (a.prototype.negate = function () {
                return (this.x = -this.x), (this.y = -this.y), this;
              }),
              (a.prototype.normalize = function () {
                var a = Math.sqrt(this.x * this.x + this.y * this.y);
                return (
                  0 === a
                    ? ((this.x = 1), (this.y = 0))
                    : ((this.x /= a), (this.y /= a)),
                  this
                );
              }),
              (a.prototype.scale = function (a, b) {
                return (
                  void 0 === b && (b = a), (this.x *= a), (this.y *= b), this
                );
              }),
              (a.prototype.scaleToMagnitude = function (a) {
                var b = a / this.magnitude();
                return (this.x *= b), (this.y *= b), this;
              }),
              (a.prototype.setValues = function (b, c) {
                return (
                  b instanceof a
                    ? ((this.x = b.x), (this.y = b.y))
                    : ((this.x = b), (this.y = c)),
                  this
                );
              }),
              (a.prototype.subtract = function (a) {
                return (this.x -= a.x), (this.y -= a.y), this;
              }),
              (a.prototype.toString = function () {
                return "Vector2D(" + this.x + ", " + this.y + ")";
              }),
              (a.prototype.translate = function (a, b) {
                return (
                  void 0 === b && (b = a), (this.x += a), (this.y += b), this
                );
              }),
              (a.tripleProduct = function (a, c, d, e) {
                e = e || new b.math.Vector2D();
                var f = a.dotProduct(d),
                  g = c.dotProduct(d);
                return e.setValues(c.x * f - a.x * g, c.y * f - a.y * g);
              }),
              a
            );
          })()),
          (b.math.Matrix2D = (function () {
            return (
              (Matrix2D = function (a, b, c, d, e, f) {
                if (a instanceof Matrix2D)
                  (this.a = a.a),
                    (this.b = a.b),
                    (this.c = a.c),
                    (this.d = a.d),
                    (this.e = a.e),
                    (this.f = a.f);
                else if (6 === arguments.length)
                  (this.a = a),
                    (this.b = b),
                    (this.c = c),
                    (this.d = d),
                    (this.e = e),
                    (this.f = f);
                else if (arguments.length > 0)
                  throw "Unexpected number of arguments for Matrix2D()";
              }),
              (Matrix2D.prototype.a = 1),
              (Matrix2D.prototype.b = 0),
              (Matrix2D.prototype.c = 0),
              (Matrix2D.prototype.d = 1),
              (Matrix2D.prototype.e = 0),
              (Matrix2D.prototype.f = 0),
              (Matrix2D.prototype.apply = function (a) {
                var b = a.x;
                return (
                  (a.x = b * this.a + a.y * this.c + this.e),
                  (a.y = b * this.b + a.y * this.d + this.f),
                  a
                );
              }),
              (Matrix2D.prototype.clone = function () {
                return new Matrix2D(this);
              }),
              (Matrix2D.prototype.combine = function (a) {
                var b = this.a;
                return (
                  (this.a = b * a.a + this.b * a.c),
                  (this.b = b * a.b + this.b * a.d),
                  (b = this.c),
                  (this.c = b * a.a + this.d * a.c),
                  (this.d = b * a.b + this.d * a.d),
                  (b = this.e),
                  (this.e = b * a.a + this.f * a.c + a.e),
                  (this.f = b * a.b + this.f * a.d + a.f),
                  this
                );
              }),
              (Matrix2D.prototype.equals = function (a) {
                return (
                  a instanceof Matrix2D &&
                  this.a == a.a &&
                  this.b == a.b &&
                  this.c == a.c &&
                  this.d == a.d &&
                  this.e == a.e &&
                  this.f == a.f
                );
              }),
              (Matrix2D.prototype.determinant = function () {
                return this.a * this.d - this.b * this.c;
              }),
              (Matrix2D.prototype.invert = function () {
                var a = this.determinant();
                if (0 !== a) {
                  var b = {
                    a: this.a,
                    b: this.b,
                    c: this.c,
                    d: this.d,
                    e: this.e,
                    f: this.f,
                  };
                  (this.a = b.d / a),
                    (this.b = -b.b / a),
                    (this.c = -b.c / a),
                    (this.d = b.a / a),
                    (this.e = (b.c * b.f - b.e * b.d) / a),
                    (this.f = (b.e * b.b - b.a * b.f) / a);
                }
                return this;
              }),
              (Matrix2D.prototype.isIdentity = function () {
                return (
                  1 === this.a &&
                  0 === this.b &&
                  0 === this.c &&
                  1 === this.d &&
                  0 === this.e &&
                  0 === this.f
                );
              }),
              (Matrix2D.prototype.isInvertible = function () {
                return 0 !== this.determinant();
              }),
              (Matrix2D.prototype.preRotate = function (a) {
                var b = Math.cos(a),
                  c = Math.sin(a),
                  d = this.a;
                return (
                  (this.a = b * d - c * this.b),
                  (this.b = c * d + b * this.b),
                  (d = this.c),
                  (this.c = b * d - c * this.d),
                  (this.d = c * d + b * this.d),
                  this
                );
              }),
              (Matrix2D.prototype.preScale = function (a, b) {
                return (
                  void 0 === b && (b = a),
                  (this.a *= a),
                  (this.b *= b),
                  (this.c *= a),
                  (this.d *= b),
                  this
                );
              }),
              (Matrix2D.prototype.preTranslate = function (a, b) {
                return (
                  "number" == typeof a
                    ? ((this.e += a), (this.f += b))
                    : ((this.e += a.x), (this.f += a.y)),
                  this
                );
              }),
              (Matrix2D.prototype.rotate = function (a) {
                var b = Math.cos(a),
                  c = Math.sin(a),
                  d = this.a;
                return (
                  (this.a = b * d - c * this.b),
                  (this.b = c * d + b * this.b),
                  (d = this.c),
                  (this.c = b * d - c * this.d),
                  (this.d = c * d + b * this.d),
                  (d = this.e),
                  (this.e = b * d - c * this.f),
                  (this.f = c * d + b * this.f),
                  this
                );
              }),
              (Matrix2D.prototype.scale = function (a, b) {
                return (
                  void 0 === b && (b = a),
                  (this.a *= a),
                  (this.b *= b),
                  (this.c *= a),
                  (this.d *= b),
                  (this.e *= a),
                  (this.f *= b),
                  this
                );
              }),
              (Matrix2D.prototype.setValues = function (a, b, c, d, e, f) {
                return (
                  a instanceof Matrix2D
                    ? ((this.a = a.a),
                      (this.b = a.b),
                      (this.c = a.c),
                      (this.d = a.d),
                      (this.e = a.e),
                      (this.f = a.f))
                    : ((this.a = a),
                      (this.b = b),
                      (this.c = c),
                      (this.d = d),
                      (this.e = e),
                      (this.f = f)),
                  this
                );
              }),
              (Matrix2D.prototype.toString = function () {
                return (
                  "Matrix2D([" +
                  this.a +
                  ", " +
                  this.c +
                  ", " +
                  this.e +
                  "] [" +
                  this.b +
                  ", " +
                  this.d +
                  ", " +
                  this.f +
                  "] [0, 0, 1])"
                );
              }),
              (Matrix2D.prototype.translate = function (a, b) {
                return (
                  "number" == typeof a
                    ? ((this.e += this.a * a + this.c * b),
                      (this.f += this.b * a + this.d * b))
                    : ((this.e += this.a * a.x + this.c * a.y),
                      (this.f += this.b * a.x + this.d * a.y)),
                  this
                );
              }),
              Matrix2D
            );
          })());
      },
      { "./core.js": 10 },
    ],
    21: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.c("Model", {
          init: function () {
            (this.changed = []),
              this.bind("Change", this._changed_attributes),
              this.bind("Change", this._changed_triggers);
          },
          _changed_triggers: function (a, c) {
            var d;
            c = b.extend.call({ pre: "" }, c);
            for (d in a)
              this.trigger("Change[" + c.pre + d + "]", a[d]),
                "Object" === a[d].constructor.name &&
                  this._changed_triggers(a[d], { pre: c.pre + d + "." });
          },
          _changed_attributes: function (a) {
            var b;
            for (b in a) this.changed.push(b);
            return this;
          },
          is_dirty: function (a) {
            return 0 === arguments.length
              ? !!this.changed.length
              : this.changed.indexOf(a) > -1;
          },
        });
      },
      { "./core.js": 10 },
    ],
    22: [
      function (a) {
        var b = a("./core.js"),
          c = window.document;
        b.c("Particles", {
          init: function () {
            (this._Particles = b.clone(this._Particles)),
              (this._Particles.parentEntity = this);
          },
          particles: function (a) {
            if (!b.support.canvas || b.deactivateParticles) return this;
            var d, e, f, g, h;
            (d = c.createElement("canvas")),
              (d.width = b.viewport.width),
              (d.height = b.viewport.height),
              (d.style.position = "absolute"),
              (d.style.left = "0px"),
              (d.style.top = "0px"),
              b.stage.elem.appendChild(d),
              (e = d.getContext("2d")),
              this._Particles.init(a),
              this.bind("Remove", function () {
                b.stage.elem.removeChild(d);
              }).bind("RemoveComponent", function (a) {
                "particles" === a && b.stage.elem.removeChild(d);
              }),
              (f = this.x + b.viewport.x),
              (g = this.y + b.viewport.y),
              (this._Particles.position = this._Particles.vectorHelpers.create(
                f,
                g
              ));
            var i = { x: b.viewport.x, y: b.viewport.y };
            return (
              this.bind("EnterFrame", function () {
                (f = this.x + b.viewport.x),
                  (g = this.y + b.viewport.y),
                  (this._Particles.viewportDelta = {
                    x: b.viewport.x - i.x,
                    y: b.viewport.y - i.y,
                  }),
                  (i = { x: b.viewport.x, y: b.viewport.y }),
                  (this._Particles.position =
                    this._Particles.vectorHelpers.create(f, g)),
                  "function" == typeof b.DrawManager.boundingRect
                    ? ((h = b.DrawManager.boundingRect(
                        this._Particles.register
                      )),
                      h && e.clearRect(h._x, h._y, h._w, h._h))
                    : e.clearRect(0, 0, b.viewport.width, b.viewport.height),
                  this._Particles.update(),
                  this._Particles.render(e);
              }),
              this
            );
          },
          _Particles: {
            presets: {
              maxParticles: 150,
              size: 18,
              sizeRandom: 4,
              speed: 1,
              speedRandom: 1.2,
              lifeSpan: 29,
              lifeSpanRandom: 7,
              angle: 65,
              angleRandom: 34,
              startColour: [255, 131, 0, 1],
              startColourRandom: [48, 50, 45, 0],
              endColour: [245, 35, 0, 0],
              endColourRandom: [60, 60, 60, 0],
              sharpness: 20,
              sharpnessRandom: 10,
              spread: 10,
              duration: -1,
              fastMode: !1,
              gravity: { x: 0, y: 0.1 },
              jitter: 0,
              particles: [],
              active: !0,
              particleCount: 0,
              elapsedFrames: 0,
              emissionRate: 0,
              emitCounter: 0,
              particleIndex: 0,
            },
            init: function (a) {
              (this.position = this.vectorHelpers.create(0, 0)),
                "undefined" == typeof a && (a = {});
              for (var b in this.presets)
                this[b] = "undefined" != typeof a[b] ? a[b] : this.presets[b];
              (this.emissionRate = this.maxParticles / this.lifeSpan),
                (this.positionRandom = this.vectorHelpers.create(
                  this.spread,
                  this.spread
                ));
            },
            addParticle: function () {
              if (this.particleCount == this.maxParticles) return !1;
              var a = new this.particle(this.vectorHelpers);
              return (
                this.initParticle(a),
                (this.particles[this.particleCount] = a),
                this.particleCount++,
                !0
              );
            },
            RANDM1TO1: function () {
              return 2 * Math.random() - 1;
            },
            initParticle: function (a) {
              (a.position.x =
                this.position.x + this.positionRandom.x * this.RANDM1TO1()),
                (a.position.y =
                  this.position.y + this.positionRandom.y * this.RANDM1TO1());
              var b =
                  (this.angle + this.angleRandom * this.RANDM1TO1()) *
                  (Math.PI / 180),
                c = this.vectorHelpers.create(Math.sin(b), -Math.cos(b)),
                d = this.speed + this.speedRandom * this.RANDM1TO1();
              (a.direction = this.vectorHelpers.multiply(c, d)),
                (a.size = this.size + this.sizeRandom * this.RANDM1TO1()),
                (a.size = a.size < 0 ? 0 : ~~a.size),
                (a.timeToLive =
                  this.lifeSpan + this.lifeSpanRandom * this.RANDM1TO1()),
                (a.sharpness =
                  this.sharpness + this.sharpnessRandom * this.RANDM1TO1()),
                (a.sharpness =
                  a.sharpness > 100 ? 100 : a.sharpness < 0 ? 0 : a.sharpness),
                (a.sizeSmall = ~~((a.size / 200) * a.sharpness));
              var e = [
                  this.startColour[0] +
                    this.startColourRandom[0] * this.RANDM1TO1(),
                  this.startColour[1] +
                    this.startColourRandom[1] * this.RANDM1TO1(),
                  this.startColour[2] +
                    this.startColourRandom[2] * this.RANDM1TO1(),
                  this.startColour[3] +
                    this.startColourRandom[3] * this.RANDM1TO1(),
                ],
                f = [
                  this.endColour[0] +
                    this.endColourRandom[0] * this.RANDM1TO1(),
                  this.endColour[1] +
                    this.endColourRandom[1] * this.RANDM1TO1(),
                  this.endColour[2] +
                    this.endColourRandom[2] * this.RANDM1TO1(),
                  this.endColour[3] +
                    this.endColourRandom[3] * this.RANDM1TO1(),
                ];
              (a.colour = e),
                (a.deltaColour[0] = (f[0] - e[0]) / a.timeToLive),
                (a.deltaColour[1] = (f[1] - e[1]) / a.timeToLive),
                (a.deltaColour[2] = (f[2] - e[2]) / a.timeToLive),
                (a.deltaColour[3] = (f[3] - e[3]) / a.timeToLive);
            },
            update: function () {
              if (this.active && this.emissionRate > 0) {
                var a = 1 / this.emissionRate;
                for (
                  this.emitCounter++;
                  this.particleCount < this.maxParticles &&
                  this.emitCounter > a;

                )
                  this.addParticle(), (this.emitCounter -= a);
                this.elapsedFrames++,
                  -1 != this.duration &&
                    this.duration < this.elapsedFrames &&
                    this.stop();
              }
              (this.particleIndex = 0), (this.register = []);
              for (var b; this.particleIndex < this.particleCount; ) {
                var c = this.particles[this.particleIndex];
                if (c.timeToLive > 0) {
                  (c.direction = this.vectorHelpers.add(
                    c.direction,
                    this.gravity
                  )),
                    (c.position = this.vectorHelpers.add(
                      c.position,
                      c.direction
                    )),
                    (c.position = this.vectorHelpers.add(
                      c.position,
                      this.viewportDelta
                    )),
                    this.jitter &&
                      ((c.position.x += this.jitter * this.RANDM1TO1()),
                      (c.position.y += this.jitter * this.RANDM1TO1())),
                    c.timeToLive--;
                  var d = (c.colour[0] += c.deltaColour[0]),
                    e = (c.colour[1] += c.deltaColour[1]),
                    f = (c.colour[2] += c.deltaColour[2]),
                    g = (c.colour[3] += c.deltaColour[3]);
                  (b = []),
                    b.push("rgba(" + (d > 255 ? 255 : 0 > d ? 0 : ~~d)),
                    b.push(e > 255 ? 255 : 0 > e ? 0 : ~~e),
                    b.push(f > 255 ? 255 : 0 > f ? 0 : ~~f),
                    b.push((g > 1 ? 1 : 0 > g ? 0 : g.toFixed(2)) + ")"),
                    (c.drawColour = b.join(",")),
                    this.fastMode ||
                      ((b[3] = "0)"), (c.drawColourEnd = b.join(","))),
                    this.particleIndex++;
                } else
                  this.particleIndex != this.particleCount - 1 &&
                    (this.particles[this.particleIndex] =
                      this.particles[this.particleCount - 1]),
                    this.particleCount--;
                var h = {};
                (h._x = ~~c.position.x),
                  (h._y = ~~c.position.y),
                  (h._w = c.size),
                  (h._h = c.size),
                  this.register.push(h);
              }
            },
            stop: function () {
              (this.active = !1),
                (this.elapsedFrames = 0),
                (this.emitCounter = 0),
                this.parentEntity.trigger("ParticleEnd");
            },
            render: function (a) {
              for (var c = 0, d = this.particleCount; d > c; c++) {
                var e = this.particles[c],
                  f = e.size,
                  g = f >> 1;
                if (
                  !(
                    e.position.x + f < 0 ||
                    e.position.y + f < 0 ||
                    e.position.x - f > b.viewport.width ||
                    e.position.y - f > b.viewport.height
                  )
                ) {
                  var h = ~~e.position.x,
                    i = ~~e.position.y;
                  if (this.fastMode) a.fillStyle = e.drawColour;
                  else {
                    var j = a.createRadialGradient(
                      h + g,
                      i + g,
                      e.sizeSmall,
                      h + g,
                      i + g,
                      g
                    );
                    j.addColorStop(0, e.drawColour),
                      j.addColorStop(0.9, e.drawColourEnd),
                      (a.fillStyle = j);
                  }
                  a.fillRect(h, i, f, f);
                }
              }
            },
            particle: function (a) {
              (this.position = a.create(0, 0)),
                (this.direction = a.create(0, 0)),
                (this.size = 0),
                (this.sizeSmall = 0),
                (this.timeToLive = 0),
                (this.colour = []),
                (this.drawColour = ""),
                (this.deltaColour = []),
                (this.sharpness = 0);
            },
            vectorHelpers: {
              create: function (a, b) {
                return { x: a, y: b };
              },
              multiply: function (a, b) {
                return (a.x *= b), (a.y *= b), a;
              },
              add: function (a, b) {
                return (a.x += b.x), (a.y += b.y), a;
              },
            },
          },
        });
      },
      { "./core.js": 10 },
    ],
    23: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.extend({
          _scenes: {},
          _current: null,
          scene: function (a, c, d) {
            return 1 === arguments.length || "function" != typeof arguments[1]
              ? void b.enterScene(a, arguments[1])
              : void b.defineScene(a, c, d);
          },
          defineScene: function (a, b, c) {
            if ("function" != typeof b)
              throw "Init function is the wrong type.";
            (this._scenes[a] = {}),
              (this._scenes[a].initialize = b),
              "undefined" != typeof c && (this._scenes[a].uninitialize = c);
          },
          enterScene: function (a, c) {
            if ("function" == typeof c) throw "Scene data cannot be a function";
            b.trigger("SceneDestroy", { newScene: a }),
              b.viewport.reset(),
              b("2D").each(function () {
                this.has("Persist") || this.destroy();
              }),
              null !== this._current &&
                "uninitialize" in this._scenes[this._current] &&
                this._scenes[this._current].uninitialize.call(this);
            var d = this._current;
            (this._current = a),
              b.trigger("SceneChange", { oldScene: d, newScene: a }),
              this._scenes[a].initialize.call(this, c);
          },
        });
      },
      { "./core.js": 10 },
    ],
    24: [
      function (a) {
        var b = a("./core.js"),
          d = window.document;
        b.extend({
          audio: {
            sounds: {},
            supported: null,
            codecs: {
              ogg: 'audio/ogg; codecs="vorbis"',
              wav: 'audio/wav; codecs="1"',
              webma: 'audio/webm; codecs="vorbis"',
              mp3: 'audio/mpeg; codecs="mp3"',
              m4a: 'audio/mp4; codecs="mp4a.40.2"',
            },
            volume: 1,
            muted: !1,
            paused: !1,
            playCheck: null,
            _canPlay: function () {
              if (((this.supported = {}), b.support.audio)) {
                var a,
                  c = this.audioElement();
                for (var d in this.codecs)
                  (a = c.canPlayType(this.codecs[d])),
                    (this.supported[d] = "" !== a && "no" !== a ? !0 : !1);
              }
            },
            supports: function (a) {
              return (
                null === this.supported && this._canPlay(),
                this.supported[a] ? !0 : !1
              );
            },
            audioElement: function () {
              return "undefined" != typeof Audio
                ? new Audio("")
                : d.createElement("audio");
            },
            create: function (a, c) {
              var d = c.substr(c.lastIndexOf(".") + 1).toLowerCase();
              if (!this.supports(d)) return !1;
              var e = this.audioElement();
              return (
                (e.id = a),
                (e.preload = "auto"),
                (e.volume = b.audio.volume),
                (e.src = c),
                b.asset(c, e),
                (this.sounds[a] = {
                  obj: e,
                  played: 0,
                  volume: b.audio.volume,
                }),
                this.sounds[a]
              );
            },
            add: function (a, c) {
              if (b.support.audio) {
                var d, e;
                if (1 === arguments.length && "object" == typeof a)
                  for (var f in a)
                    for (d in a[f]) if ((e = b.audio.create(f, a[f][d]))) break;
                if (
                  "string" == typeof a &&
                  ("string" == typeof c && (e = b.audio.create(a, c)),
                  "object" == typeof c)
                )
                  for (d in c) if ((e = b.audio.create(a, c[d]))) break;
                return e;
              }
            },
            play: function (a, c, d) {
              if (0 !== c && b.support.audio && this.sounds[a]) {
                var e = this.sounds[a],
                  f = this.getOpenChannel();
                if (!f) return null;
                (f.id = a), (f.repeat = c);
                var g = f.obj;
                return (
                  (f.volume = e.volume = e.obj.volume = d || b.audio.volume),
                  (g.volume = e.volume),
                  (g.src = e.obj.src),
                  this.muted && (g.volume = 0),
                  g.play(),
                  e.played++,
                  (f.onEnd = function () {
                    e.played < f.repeat || -1 == c
                      ? (this.currentTime && (this.currentTime = 0),
                        this.play(),
                        e.played++)
                      : ((f.active = !1),
                        this.pause(),
                        this.removeEventListener("ended", f.onEnd, !0),
                        (this.currentTime = 0),
                        b.trigger("SoundComplete", { id: f.id }));
                  }),
                  g.addEventListener("ended", f.onEnd, !0),
                  g
                );
              }
            },
            maxChannels: 7,
            setChannels: function (a) {
              (this.maxChannels = a),
                a < this.channels.length && (this.channels.length = a);
            },
            channels: [],
            getOpenChannel: function () {
              for (var a = 0; a < this.channels.length; a++) {
                var b = this.channels[a];
                if (
                  b.active === !1 ||
                  (b.obj.ended && b.repeat <= this.sounds[b.id].played)
                )
                  return (b.active = !0), b;
              }
              if (a < this.maxChannels) {
                var c = {
                  obj: this.audioElement(),
                  active: !0,
                  _is: function (a) {
                    return this.id === a && this.active;
                  },
                };
                return this.channels.push(c), c;
              }
              return null;
            },
            remove: function (a) {
              if (b.support.audio) {
                var c,
                  d,
                  e = b.paths().audio;
                if (a)
                  this.sounds[a] &&
                    ((c = this.sounds[a]),
                    (d = c.obj.src.split("/").pop()),
                    b.audio.stop(a),
                    delete b.assets[e + d],
                    delete b.assets[c.obj.src],
                    delete b.audio.sounds[a]);
                else
                  for (var f in this.sounds)
                    (c = this.sounds[f]),
                      (d = c.obj.src.split("/").pop()),
                      b.audio.stop(a),
                      delete b.assets[e + d],
                      delete b.assets[c.obj.src],
                      delete b.audio.sounds[a];
              }
            },
            stop: function (a) {
              if (b.support.audio)
                for (var d in this.channels)
                  (c = this.channels[d]),
                    ((!a && c.active) || c._is(a)) &&
                      ((c.active = !1), c.obj.pause());
            },
            _mute: function (a) {
              if (b.support.audio) {
                var c;
                for (var d in this.channels)
                  (c = this.channels[d]), (c.obj.volume = a ? 0 : c.volume);
                this.muted = a;
              }
            },
            toggleMute: function () {
              this._mute(this.muted ? !1 : !0);
            },
            mute: function () {
              this._mute(!0);
            },
            unmute: function () {
              this._mute(!1);
            },
            pause: function (a) {
              if (b.support.audio && a && this.sounds[a]) {
                var c;
                for (var d in this.channels)
                  (c = this.channels[d]),
                    c._is(a) && !c.obj.paused && c.obj.pause();
              }
            },
            unpause: function (a) {
              if (b.support.audio && a && this.sounds[a]) {
                var c;
                for (var d in this.channels)
                  (c = this.channels[d]),
                    c._is(a) && c.obj.paused && c.obj.play();
              }
            },
            togglePause: function (a) {
              if (b.support.audio && a && this.sounds[a]) {
                var c;
                for (var d in this.channels)
                  (c = this.channels[d]),
                    c._is(a) && (c.obj.paused ? c.obj.play() : c.obj.pause());
              }
            },
            isPlaying: function (a) {
              if (!b.support.audio) return !1;
              for (var c in this.channels)
                if (this.channels[c]._is(a)) return !0;
              return !1;
            },
          },
        });
      },
      { "./core.js": 10 },
    ],
    25: [
      function (a) {
        {
          var b = a("./core.js");
          a("./animation.js"), window.document;
        }
        b.c("SpriteAnimation", {
          _reels: null,
          _currentReelId: null,
          _currentReel: null,
          _isPlaying: !1,
          animationSpeed: 1,
          init: function () {
            this._reels = {};
          },
          reel: function (a, c, d, e, f) {
            if (0 === arguments.length) return this._currentReelId;
            if (1 === arguments.length && "string" == typeof a) {
              if ("undefined" == typeof this._reels[a])
                throw "The specified reel " + a + " is undefined.";
              return (
                this.pauseAnimation(),
                this._currentReelId !== a &&
                  ((this._currentReelId = a),
                  (this._currentReel = this._reels[a]),
                  this._updateSprite(),
                  this.trigger("ReelChange", this._currentReel)),
                this
              );
            }
            var g, h;
            if (
              ((g = {
                id: a,
                frames: [],
                currentFrame: 0,
                easing: new b.easing(c),
                defaultLoops: 1,
              }),
              (g.duration = g.easing.duration),
              "number" == typeof d)
            )
              if (((h = d), (y = e), f >= 0))
                for (; d + f > h; h++) g.frames.push([h, y]);
              else for (; h > d + f; h--) g.frames.push([h, y]);
            else {
              if (3 !== arguments.length || "object" != typeof d)
                throw "Urecognized arguments. Please see the documentation for 'reel(...)'.";
              g.frames = d;
            }
            return (this._reels[a] = g), this;
          },
          animate: function (a, b) {
            "string" == typeof a && this.reel(a);
            var c = this._currentReel;
            if ("undefined" == typeof c || null === c)
              throw "No reel is specified, and there is no currently active reel.";
            return (
              this.pauseAnimation(),
              "undefined" == typeof b && (b = "number" == typeof a ? a : 1),
              c.easing.reset(),
              this.loops(b),
              this._setFrame(0),
              this.bind("EnterFrame", this._animationTick),
              (this._isPlaying = !0),
              this.trigger("StartAnimation", c),
              this
            );
          },
          resumeAnimation: function () {
            return (
              this._isPlaying === !1 &&
                null !== this._currentReel &&
                (this.bind("EnterFrame", this._animationTick),
                (this._isPlaying = !0),
                this._currentReel.easing.resume(),
                this.trigger("StartAnimation", this._currentReel)),
              this
            );
          },
          pauseAnimation: function () {
            return (
              this._isPlaying === !0 &&
                (this.unbind("EnterFrame", this._animationTick),
                (this._isPlaying = !1),
                this._reels[this._currentReelId].easing.pause()),
              this
            );
          },
          resetAnimation: function () {
            var a = this._currentReel;
            if (null === a) throw "No active reel to reset.";
            return this.reelPosition(0), a.easing.repeat(a.defaultLoops), this;
          },
          loops: function (a) {
            return 0 === arguments.length
              ? null !== this._currentReel
                ? this._currentReel.easing.loops
                : 0
              : (null !== this._currentReel &&
                  (0 > a && (a = 1 / 0),
                  this._currentReel.easing.repeat(a),
                  (this._currentReel.defaultLoops = a)),
                this);
          },
          reelPosition: function (a) {
            if (null === this._currentReel) throw "No active reel.";
            if (0 === arguments.length) return this._currentReel.currentFrame;
            var b,
              c = this._currentReel.frames.length;
            if (("end" === a && (a = c - 1), 1 > a && a > 0))
              (b = a), (a = Math.floor(c * b));
            else {
              if (a !== Math.floor(a)) throw "Position " + a + " is invalid.";
              0 > a && (a = c - 1 + a), (b = a / c);
            }
            return (
              (a = Math.min(a, c - 1)),
              (a = Math.max(a, 0)),
              this._setProgress(b),
              this._setFrame(a),
              this
            );
          },
          _animationTick: function (a) {
            var b = this._reels[this._currentReelId];
            b.easing.tick(a.dt * this.animationSpeed);
            var c = b.easing.value(),
              d = Math.min(
                Math.floor(b.frames.length * c),
                b.frames.length - 1
              );
            this._setFrame(d),
              b.easing.complete === !0 &&
                (this.pauseAnimation(),
                this.trigger("AnimationEnd", this._currentReel));
          },
          _setFrame: function (a) {
            var b = this._currentReel;
            a !== b.currentFrame &&
              ((b.currentFrame = a),
              this._updateSprite(),
              this.trigger("FrameChange", b));
          },
          _updateSprite: function () {
            var a = this._currentReel,
              b = a.frames[a.currentFrame];
            this.sprite(b[0], b[1]);
          },
          _setProgress: function (a, b) {
            this._currentReel.easing.setProgress(a, b);
          },
          isPlaying: function (a) {
            return this._isPlaying
              ? a
                ? this._currentReelId === a
                : !!this._currentReelId
              : !1;
          },
          getReel: function (a) {
            if (0 === arguments.length) {
              if (!this._currentReelId) return null;
              a = this._currentReelId;
            }
            return this._reels[a];
          },
        });
      },
      { "./animation.js": 5, "./core.js": 10 },
    ],
    26: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.extend({
          sprite: function (a, c, d, e, f, g, h) {
            var i, j, k;
            "string" == typeof a &&
              ((g = f), (f = e), (e = c), (d = a), (a = 1), (c = 1)),
              "string" == typeof c &&
                ((g = f), (f = e), (e = d), (d = c), (c = a)),
              !g && f && (g = f),
              (f = parseInt(f || 0, 10)),
              (g = parseInt(g || 0, 10));
            var l = function () {
              (this.ready = !0), this.trigger("Invalidate");
            };
            (k = b.asset(d)),
              k ||
                ((k = new Image()),
                (k.src = d),
                b.asset(d, k),
                (k.onload = function () {
                  for (var a in e) b(a).each(l);
                }));
            var m = function () {
              this.requires("2D, Sprite"),
                (this.__trim = [0, 0, 0, 0]),
                (this.__image = d),
                (this.__coord = [
                  this.__coord[0],
                  this.__coord[1],
                  this.__coord[2],
                  this.__coord[3],
                ]),
                (this.__tile = a),
                (this.__tileh = c),
                (this.__padding = [f, g]),
                (this.__padBorder = h),
                this.sprite(
                  this.__coord[0],
                  this.__coord[1],
                  this.__coord[2],
                  this.__coord[3]
                ),
                (this.img = k),
                this.img.complete &&
                  this.img.width > 0 &&
                  ((this.ready = !0), this.trigger("Invalidate")),
                (this.w = this.__coord[2]),
                (this.h = this.__coord[3]);
            };
            for (i in e)
              e.hasOwnProperty(i) &&
                ((j = e[i]),
                b.c(i, {
                  ready: !1,
                  __coord: [j[0], j[1], j[2] || 1, j[3] || 1],
                  init: m,
                }));
            return this;
          },
        }),
          b.c("Sprite", {
            __image: "",
            __tile: 0,
            __tileh: 0,
            __padding: null,
            __trim: null,
            img: null,
            ready: !1,
            init: function () {
              this.__trim = [0, 0, 0, 0];
              var a = function (a) {
                var b = a.co,
                  c = a.pos,
                  d = a.ctx;
                if ("canvas" === a.type)
                  d.drawImage(
                    this.img,
                    b.x,
                    b.y,
                    b.w,
                    b.h,
                    c._x,
                    c._y,
                    c._w,
                    c._h
                  );
                else if ("DOM" === a.type) {
                  var e = this._h / b.h,
                    f = this._w / b.w,
                    g = this._element.style;
                  (g.background =
                    g.backgroundColor +
                    " url('" +
                    this.__image +
                    "') no-repeat"),
                    (g.backgroundPosition =
                      "-" + b.x * f + "px -" + b.y * e + "px"),
                    (1 != e || 1 != f) &&
                      (g.backgroundSize =
                        this.img.width * f +
                        "px " +
                        this.img.height * e +
                        "px");
                }
              };
              this.bind("Draw", a).bind("RemoveComponent", function (b) {
                "Sprite" === b && this.unbind("Draw", a);
              });
            },
            sprite: function (a, b, c, d) {
              return (
                (this.__coord = this.__coord || [0, 0, 0, 0]),
                (this.__coord[0] =
                  a * (this.__tile + this.__padding[0]) +
                  (this.__padBorder ? this.__padding[0] : 0) +
                  this.__trim[0]),
                (this.__coord[1] =
                  b * (this.__tileh + this.__padding[1]) +
                  (this.__padBorder ? this.__padding[1] : 0) +
                  this.__trim[1]),
                "undefined" != typeof c &&
                  "undefined" != typeof d &&
                  ((this.__coord[2] =
                    this.__trim[2] || c * this.__tile || this.__tile),
                  (this.__coord[3] =
                    this.__trim[3] || d * this.__tileh || this.__tileh)),
                this.trigger("Invalidate"),
                this
              );
            },
            crop: function (a, b, c, d) {
              var e = this._mbr || this.pos();
              return (
                (this.__trim = []),
                (this.__trim[0] = a),
                (this.__trim[1] = b),
                (this.__trim[2] = c),
                (this.__trim[3] = d),
                (this.__coord[0] += a),
                (this.__coord[1] += b),
                (this.__coord[2] = c),
                (this.__coord[3] = d),
                (this._w = c),
                (this._h = d),
                this.trigger("Invalidate", e),
                this
              );
            },
          });
      },
      { "./core.js": 10 },
    ],
    27: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        (b.storage = function (a, b) {
          var c = window.localStorage,
            d = b;
          if (!c) return !1;
          if (1 === arguments.length)
            try {
              return JSON.parse(c.getItem(a));
            } catch (e) {
              return c.getItem(a);
            }
          else "object" == typeof b && (d = JSON.stringify(b)), c.setItem(a, d);
        }),
          (b.storage.remove = function (a) {
            window.localStorage.removeItem(a);
          });
      },
      { "./core.js": 10 },
    ],
    28: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.c("Text", {
          _text: "",
          defaultSize: "10px",
          defaultFamily: "sans-serif",
          defaultVariant: "normal",
          defaultLineHeight: "normal",
          ready: !0,
          init: function () {
            this.requires("2D"),
              (this._textFont = {
                type: "",
                weight: "",
                size: this.defaultSize,
                lineHeight: this.defaultLineHeight,
                family: this.defaultFamily,
                variant: this.defaultVariant,
              }),
              this.bind("Draw", function (a) {
                var b = this._fontString();
                if ("DOM" === a.type) {
                  var c = this._element,
                    d = c.style;
                  (d.color = this._textColor),
                    (d.font = b),
                    (c.innerHTML = this._text);
                } else if ("canvas" === a.type) {
                  var e = a.ctx;
                  e.save(),
                    (e.textBaseline = "top"),
                    (e.fillStyle = this._textColor || "rgb(0,0,0)"),
                    (e.font = b),
                    e.fillText(this._text, a.pos._x, a.pos._y),
                    e.restore();
                }
              });
          },
          _getFontHeight: (function () {
            var a = /([a-zA-Z]+)\b/,
              b = {
                px: 1,
                pt: 4 / 3,
                pc: 16,
                cm: 96 / 2.54,
                mm: 96 / 25.4,
                in: 96,
                em: void 0,
                ex: void 0,
              };
            return function (c) {
              var d = parseFloat(c),
                e = a.exec(c),
                f = e ? e[1] : "px";
              return Math.ceil(void 0 !== b[f] ? d * b[f] : d);
            };
          })(),
          text: function (a) {
            return "undefined" == typeof a || null === a
              ? this._text
              : ((this._text = "function" == typeof a ? a.call(this) : a),
                this.has("Canvas") && this._resizeForCanvas(),
                this.trigger("Invalidate"),
                this);
          },
          _resizeForCanvas: function () {
            var a = b.canvas.context;
            (a.font = this._fontString()),
              (this.w = a.measureText(this._text).width);
            var c = this._textFont.size || this.defaultSize;
            this.h = 1.1 * this._getFontHeight(c);
          },
          _fontString: function () {
            return (
              this._textFont.type +
              " " +
              this._textFont.variant +
              " " +
              this._textFont.weight +
              " " +
              this._textFont.size +
              " / " +
              this._textFont.lineHeight +
              " " +
              this._textFont.family
            );
          },
          textColor: function (a) {
            return (
              b.assignColor(a, this),
              (this._textColor =
                "rgba(" +
                this._red +
                ", " +
                this._green +
                ", " +
                this._blue +
                ", " +
                this._strength +
                ")"),
              this.trigger("Invalidate"),
              this
            );
          },
          textFont: function (a, b) {
            if (1 === arguments.length) {
              if ("string" == typeof a) return this._textFont[a];
              if ("object" == typeof a)
                for (var c in a)
                  this._textFont[c] = "family" == c ? "'" + a[c] + "'" : a[c];
            } else this._textFont[a] = b;
            return (
              this.has("Canvas") && this._resizeForCanvas(),
              this.trigger("Invalidate"),
              this
            );
          },
          unselectable: function () {
            return (
              this.has("DOM") &&
                (this.css({
                  "-webkit-touch-callout": "none",
                  "-webkit-user-select": "none",
                  "-khtml-user-select": "none",
                  "-moz-user-select": "none",
                  "-ms-user-select": "none",
                  "user-select": "none",
                  cursor: "default",
                }),
                this.trigger("Invalidate")),
              this
            );
          },
        });
      },
      { "./core.js": 10 },
    ],
    29: [
      function (a) {
        {
          var b = a("./core.js");
          window.document;
        }
        b.c("Delay", {
          init: function () {
            (this._delays = []),
              this.bind("EnterFrame", function (a) {
                for (var b = this._delays.length; --b >= 0; ) {
                  var c = this._delays[b];
                  if (c === !1) this._delays.splice(b, 1);
                  else {
                    for (
                      c.accumulator += a.dt;
                      c.accumulator >= c.delay && c.repeat >= 0;

                    )
                      (c.accumulator -= c.delay),
                        c.repeat--,
                        c.callback.call(this);
                    c.repeat < 0 &&
                      (this._delays.splice(b, 1),
                      "function" == typeof c.callbackOff &&
                        c.callbackOff.call(this));
                  }
                }
              });
          },
          delay: function (a, b, c, d) {
            return (
              this._delays.push({
                accumulator: 0,
                callback: a,
                callbackOff: d,
                delay: b,
                repeat: (0 > c ? 1 / 0 : c) || 0,
              }),
              this
            );
          },
          cancelDelay: function (a) {
            for (var b = this._delays.length; --b >= 0; ) {
              var c = this._delays[b];
              c && c.callback == a && (this._delays[b] = !1);
            }
            return this;
          },
        });
      },
      { "./core.js": 10 },
    ],
    30: [
      function (a, b) {
        b.exports = "0.6.3";
      },
      {},
    ],
    31: [
      function (a) {
        var b = a("./core.js"),
          c = window.document;
        b.extend({
          viewport: {
            clampToEntities: !0,
            _width: 0,
            _height: 0,
            _x: 0,
            _y: 0,
            _scale: 1,
            bounds: null,
            scroll: function (a, c) {
              (this[a] = c),
                b.trigger("ViewportScroll"),
                b.trigger("InvalidateViewport");
            },
            rect_object: { _x: 0, _y: 0, _w: 0, _h: 0 },
            rect: function () {
              return (
                (this.rect_object._x = -this._x),
                (this.rect_object._y = -this._y),
                (this.rect_object._w = this._width / this._scale),
                (this.rect_object._h = this._height / this._scale),
                this.rect_object
              );
            },
            pan: (function () {
              function a(a) {
                h.tick(a.dt);
                var i = h.value();
                (b.viewport.x = (1 - i) * f + i * d),
                  (b.viewport.y = (1 - i) * g + i * e),
                  b.viewport._clamp(),
                  h.complete && (c(), b.trigger("CameraAnimationDone"));
              }
              function c() {
                b.unbind("EnterFrame", a);
              }
              var d, e, f, g, h;
              return (
                b.bind("StopCamera", c),
                function (c, i, j) {
                  b.trigger("StopCamera"),
                    "reset" != c &&
                      ((f = b.viewport._x),
                      (g = b.viewport._y),
                      (d = f - c),
                      (e = g - i),
                      (h = new b.easing(j)),
                      b.uniqueBind("EnterFrame", a));
                }
              );
            })(),
            follow: (function () {
              function a() {
                b.viewport.scroll(
                  "_x",
                  -(this.x + this.w / 2 - b.viewport.width / 2 - e)
                ),
                  b.viewport.scroll(
                    "_y",
                    -(this.y + this.h / 2 - b.viewport.height / 2 - f)
                  ),
                  b.viewport._clamp();
              }
              function c() {
                d && d.unbind("Move", a);
              }
              var d, e, f;
              return (
                b.bind("StopCamera", c),
                function (c, g, h) {
                  c &&
                    c.has("2D") &&
                    (b.trigger("StopCamera"),
                    (d = c),
                    (e = "undefined" != typeof g ? g : 0),
                    (f = "undefined" != typeof h ? h : 0),
                    c.bind("Move", a),
                    a.call(c));
                }
              );
            })(),
            centerOn: function (a, c) {
              var d = a.x + b.viewport.x,
                e = a.y + b.viewport.y,
                f = a.w / 2,
                g = a.h / 2,
                h = b.viewport.width / 2,
                i = b.viewport.height / 2,
                j = d + f - h,
                k = e + g - i;
              b.viewport.pan(j, k, c);
            },
            zoom: (function () {
              function a() {
                b.unbind("EnterFrame", c);
              }
              function c(c) {
                var e, l;
                k.tick(c.dt),
                  (e = Math.pow(f, k.value())),
                  (l = 1 === f ? k.value() : (1 / e - 1) / (1 / f - 1)),
                  b.viewport.scale(e * d),
                  b.viewport.scroll("_x", g * (1 - l) + h * l),
                  b.viewport.scroll("_y", i * (1 - l) + j * l),
                  b.viewport._clamp(),
                  k.complete && (a(), b.trigger("CameraAnimationDone"));
              }
              b.bind("StopCamera", a);
              var d, e, f, g, h, i, j, k;
              return function (a, l, m, n) {
                return a
                  ? (arguments.length <= 2 &&
                      ((n = l),
                      (l = b.viewport.x - b.viewport.width),
                      (m = b.viewport.y - b.viewport.height)),
                    b.trigger("StopCamera"),
                    (d = b.viewport._scale),
                    (f = a),
                    (e = d * f),
                    (g = b.viewport.x),
                    (i = b.viewport.y),
                    (h = -(l - b.viewport.width / (2 * e))),
                    (j = -(m - b.viewport.height / (2 * e))),
                    (k = new b.easing(n)),
                    void b.uniqueBind("EnterFrame", c))
                  : void b.viewport.scale(1);
              };
            })(),
            scale: (function () {
              return function (a) {
                (this._scale = a ? a : 1),
                  b.trigger("InvalidateViewport"),
                  b.trigger("ViewportScale");
              };
            })(),
            mouselook: (function () {
              var a = !1,
                c = !1,
                d = {};
              return (
                (old = {}),
                function (e, f) {
                  if ("boolean" == typeof e)
                    return (
                      (a = e),
                      void (a
                        ? b.mouseObjs++
                        : (b.mouseObjs = Math.max(0, b.mouseObjs - 1)))
                    );
                  if (a)
                    switch (e) {
                      case "move":
                      case "drag":
                        if (!c) return;
                        (diff = { x: f.clientX - d.x, y: f.clientY - d.y }),
                          (d.x = f.clientX),
                          (d.y = f.clientY),
                          (b.viewport.x += diff.x),
                          (b.viewport.y += diff.y),
                          b.viewport._clamp();
                        break;
                      case "start":
                        b.trigger("StopCamera"),
                          (d.x = f.clientX),
                          (d.y = f.clientY),
                          (c = !0);
                        break;
                      case "stop":
                        c = !1;
                    }
                }
              );
            })(),
            _clamp: function () {
              if (this.clampToEntities) {
                var a = this.bounds || b.map.boundaries();
                (a.max.x *= this._scale),
                  (a.min.x *= this._scale),
                  (a.max.y *= this._scale),
                  (a.min.y *= this._scale),
                  a.max.x - a.min.x > b.viewport.width
                    ? b.viewport.x < -a.max.x + b.viewport.width
                      ? (b.viewport.x = -a.max.x + b.viewport.width)
                      : b.viewport.x > -a.min.x && (b.viewport.x = -a.min.x)
                    : (b.viewport.x =
                        -1 *
                        (a.min.x +
                          (a.max.x - a.min.x) / 2 -
                          b.viewport.width / 2)),
                  a.max.y - a.min.y > b.viewport.height
                    ? b.viewport.y < -a.max.y + b.viewport.height
                      ? (b.viewport.y = -a.max.y + b.viewport.height)
                      : b.viewport.y > -a.min.y && (b.viewport.y = -a.min.y)
                    : (b.viewport.y =
                        -1 *
                        (a.min.y +
                          (a.max.y - a.min.y) / 2 -
                          b.viewport.height / 2));
              }
            },
            init: function (a, d, e) {
              b.DOM.window.init(),
                this._defineViewportProperties(),
                (this._width = a ? a : b.DOM.window.width),
                (this._height = d ? d : b.DOM.window.height),
                "undefined" == typeof e && (e = "cr-stage");
              var f;
              if ("string" == typeof e) f = c.getElementById(e);
              else {
                if (
                  !("undefined" != typeof HTMLElement
                    ? e instanceof HTMLElement
                    : e instanceof Element)
                )
                  throw new TypeError(
                    "stage_elem must be a string or an HTMLElement"
                  );
                f = e;
              }
              (b.stage = {
                x: 0,
                y: 0,
                fullscreen: !1,
                elem: f ? f : c.createElement("div"),
                inner: c.createElement("div"),
              }),
                a ||
                  d ||
                  ((c.body.style.overflow = "hidden"),
                  (b.stage.fullscreen = !0)),
                b.addEvent(this, window, "resize", b.viewport.reload),
                b.addEvent(this, window, "blur", function () {
                  b.settings.get("autoPause") && (b._paused || b.pause());
                }),
                b.addEvent(this, window, "focus", function () {
                  b._paused && b.settings.get("autoPause") && b.pause();
                }),
                b.settings.register("stageSelectable", function (a) {
                  b.stage.elem.onselectstart = a
                    ? function () {
                        return !0;
                      }
                    : function () {
                        return !1;
                      };
                }),
                b.settings.modify("stageSelectable", !1),
                b.settings.register("stageContextMenu", function (a) {
                  b.stage.elem.oncontextmenu = a
                    ? function () {
                        return !0;
                      }
                    : function () {
                        return !1;
                      };
                }),
                b.settings.modify("stageContextMenu", !1),
                b.settings.register("autoPause", function () {}),
                b.settings.modify("autoPause", !1),
                f || (c.body.appendChild(b.stage.elem), (b.stage.elem.id = e));
              var g,
                h = b.stage.elem.style;
              if (
                (b.stage.elem.appendChild(b.stage.inner),
                (b.stage.inner.style.position = "absolute"),
                (b.stage.inner.style.zIndex = "1"),
                (b.stage.inner.style.transformStyle = "preserve-3d"),
                (h.width = this.width + "px"),
                (h.height = this.height + "px"),
                (h.overflow = "hidden"),
                b.bind("ViewportResize", function () {
                  b.trigger("InvalidateViewport");
                }),
                b.mobile)
              ) {
                void 0 !== typeof h.webkitTapHighlightColor &&
                  (h.webkitTapHighlightColor = "rgba(0,0,0,0)");
                var i = c.createElement("meta"),
                  j = c.getElementsByTagName("head")[0];
                (i = c.createElement("meta")),
                  i.setAttribute("name", "apple-mobile-web-app-capable"),
                  i.setAttribute("content", "yes"),
                  j.appendChild(i),
                  b.addEvent(this, b.stage.elem, "touchmove", function (a) {
                    a.preventDefault();
                  });
              } else
                (h.position = "relative"),
                  (g = b.DOM.inner(b.stage.elem)),
                  (b.stage.x = g.x),
                  (b.stage.y = g.y);
            },
            _defineViewportProperties: function () {
              Object.defineProperty(this, "x", {
                set: function (a) {
                  this.scroll("_x", a);
                },
                get: function () {
                  return this._x;
                },
                configurable: !0,
              }),
                Object.defineProperty(this, "y", {
                  set: function (a) {
                    this.scroll("_y", a);
                  },
                  get: function () {
                    return this._y;
                  },
                  configurable: !0,
                }),
                Object.defineProperty(this, "width", {
                  set: function (a) {
                    (this._width = a), b.trigger("ViewportResize");
                  },
                  get: function () {
                    return this._width;
                  },
                  configurable: !0,
                }),
                Object.defineProperty(this, "height", {
                  set: function (a) {
                    (this._height = a), b.trigger("ViewportResize");
                  },
                  get: function () {
                    return this._height;
                  },
                  configurable: !0,
                });
            },
            reload: function () {
              b.DOM.window.init();
              var a,
                c = b.DOM.window.width,
                d = b.DOM.window.height;
              b.stage.fullscreen &&
                ((this._width = c),
                (this._height = d),
                b.trigger("ViewportResize")),
                (a = b.DOM.inner(b.stage.elem)),
                (b.stage.x = a.x),
                (b.stage.y = a.y);
            },
            reset: function () {
              b.viewport.mouselook("stop"),
                b.trigger("StopCamera"),
                b.viewport.scale(1);
            },
          },
        });
      },
      { "./core.js": 10 },
    ],
  },
  {},
  [11]
);
