(function (q, f) {
  if ("function" === typeof define && define.amd)
    define(["underscore", "backbone"], function (g, i) {
      return f(q, i, g);
    });
  else if ("undefined" !== typeof exports) {
    var g = require("underscore"),
      i = require("backbone");
    f(q, i, g);
    "undefined" !== typeof module && module.exports && (module.exports = i);
    exports = i;
  } else f(q, q.Backbone, q._);
})(this, function (q, f, g) {
  var i,
    p,
    t,
    w,
    n,
    v,
    D,
    E,
    k,
    z,
    F,
    s = {};
  i = f.Model;
  p = f.Collection;
  t = i.prototype;
  n = p.prototype;
  w = f.Events;
  f.Associations = { VERSION: "0.6.2" };
  f.Associations.scopes = [];
  var G = function () {
      return k;
    },
    A = function (a) {
      if (!g.isString(a) || 1 > g.size(a)) a = ".";
      k = a;
      D = RegExp("[\\" + k + "\\[\\]]+", "g");
      E = RegExp("[^\\" + k + "\\[\\]]+", "g");
    };
  try {
    Object.defineProperty(f.Associations, "SEPARATOR", {
      enumerable: !0,
      get: G,
      set: A,
    });
  } catch (J) {}
  f.Associations.Many = f.Many = "Many";
  f.Associations.One = f.One = "One";
  f.Associations.Self = f.Self = "Self";
  f.Associations.SEPARATOR = ".";
  f.Associations.getSeparator = G;
  f.Associations.setSeparator = A;
  f.Associations.EVENTS_BUBBLE = !0;
  f.Associations.EVENTS_WILDCARD = !0;
  f.Associations.EVENTS_NC = !1;
  A();
  v =
    f.AssociatedModel =
    f.Associations.AssociatedModel =
      i.extend({
        relations: void 0,
        _proxyCalls: void 0,
        constructor: function (a, c) {
          c && c.__parents__ && (this.parents = [c.__parents__]);
          i.apply(this, arguments);
        },
        on: function (a, c, d) {
          var b = w.on.apply(this, arguments);
          if (f.Associations.EVENTS_NC) return b;
          var l = /\s+/;
          g.isString(a) &&
            a &&
            !l.test(a) &&
            c &&
            (l = B(a)) &&
            (s[l] = "undefined" === typeof s[l] ? 1 : s[l] + 1);
          return b;
        },
        off: function (a, c, d) {
          if (f.Associations.EVENTS_NC) return w.off.apply(this, arguments);
          var b = /\s+/,
            l = this._events,
            e = {},
            h = l ? g.keys(l) : [],
            m = !a && !c && !d,
            i = g.isString(a) && !b.test(a);
          if (m || i)
            for (var b = 0, j = h.length; b < j; b++)
              e[h[b]] = l[h[b]] ? l[h[b]].length : 0;
          var p = w.off.apply(this, arguments);
          if (m || i) {
            b = 0;
            for (j = h.length; b < j; b++)
              (m = B(h[b])) &&
                (s[m] = l[h[b]]
                  ? s[m] - (e[h[b]] - l[h[b]].length)
                  : s[m] - e[h[b]]);
          }
          return p;
        },
        get: function (a) {
          var c = this.__attributes__,
            d = t.get.call(this, a),
            c = c ? (x(d) ? d : c[a]) : d;
          return x(c) ? c : this._getAttr.apply(this, arguments);
        },
        set: function (a, c, d) {
          var b;
          g.isObject(a) || null == a
            ? ((b = a), (d = c))
            : ((b = {}), (b[a] = c));
          a = this._set(b, d);
          this._processPendingEvents();
          return a;
        },
        _set: function (a, c) {
          var d,
            b,
            l,
            e,
            h = this;
          if (!a) return this;
          this.__attributes__ = a;
          for (d in a)
            if ((b || (b = {}), d.match(D))) {
              var f = H(d);
              e = g.initial(f);
              f = f[f.length - 1];
              e = this.get(e);
              e instanceof i &&
                ((e = b[e.cid] || (b[e.cid] = { model: e, data: {} })),
                (e.data[f] = a[d]));
            } else
              (e = b[this.cid] || (b[this.cid] = { model: this, data: {} })),
                (e.data[d] = a[d]);
          if (b)
            for (l in b)
              (e = b[l]), this._setAttr.call(e.model, e.data, c) || (h = !1);
          else h = this._setAttr.call(this, a, c);
          delete this.__attributes__;
          return h;
        },
        _setAttr: function (a, c) {
          var d;
          c || (c = {});
          if (c.unset) for (d in a) a[d] = void 0;
          this.parents = this.parents || [];
          this.relations &&
            g.each(
              this.relations,
              function (b) {
                var d = b.key,
                  e = b.scope || q,
                  h = this._transformRelatedModel(b, a),
                  m = this._transformCollectionType(b, h, a),
                  u = g.isString(b.map) ? C(b.map, e) : b.map,
                  j = this.attributes[d],
                  k = j && j.idAttribute,
                  o,
                  r,
                  n = !1;
                o = b.options ? g.extend({}, b.options, c) : c;
                if (a[d]) {
                  e = g.result(a, d);
                  e = u ? u.call(this, e, m ? m : h) : e;
                  if (x(e))
                    if (b.type === f.Many)
                      j
                        ? ((j._deferEvents = !0),
                          j[o.reset ? "reset" : "set"](
                            e instanceof p ? e.models : e,
                            o
                          ),
                          (h = j))
                        : ((n = !0),
                          e instanceof p
                            ? (h = e)
                            : ((h = this._createCollection(
                                m || p,
                                b.collectionOptions || (h ? { model: h } : {})
                              )),
                              h[o.reset ? "reset" : "set"](e, o)));
                    else if (b.type === f.One)
                      (b =
                        e instanceof i
                          ? e.attributes.hasOwnProperty(k)
                          : e.hasOwnProperty(k)),
                        (m = e instanceof i ? e.attributes[k] : e[k]),
                        j && b && j.attributes[k] === m
                          ? ((j._deferEvents = !0),
                            j._set(e instanceof i ? e.attributes : e, o),
                            (h = j))
                          : ((n = !0),
                            e instanceof i
                              ? (h = e)
                              : ((o.__parents__ = this),
                                (h = new h(e, o)),
                                delete o.__parents__));
                    else
                      throw Error(
                        "type attribute must be specified and have the values Backbone.One or Backbone.Many"
                      );
                  else h = e;
                  r = a[d] = h;
                  if (n || (r && !r._proxyCallback))
                    r._proxyCallback ||
                      (r._proxyCallback = function () {
                        return (
                          f.Associations.EVENTS_BUBBLE &&
                          this._bubbleEvent.call(this, d, r, arguments)
                        );
                      }),
                      r.on("all", r._proxyCallback, this);
                }
                a.hasOwnProperty(d) &&
                  this._setupParents(a[d], this.attributes[d]);
              },
              this
            );
          return t.set.call(this, a, c);
        },
        _bubbleEvent: function (a, c, d) {
          var b = d[0].split(":"),
            g = b[0],
            e = "nested-change" == d[0],
            h = "change" === g,
            m = d[1],
            u = -1,
            j = c._proxyCalls,
            b = b[1],
            n = !b || -1 == b.indexOf(k),
            o;
          if (
            !e &&
            (n && (F = B(d[0]) || a), f.Associations.EVENTS_NC || s[F])
          ) {
            if (f.Associations.EVENTS_WILDCARD && /\[\*\]/g.test(b))
              return this;
            if (c instanceof p && (h || b)) u = c.indexOf(z || m);
            this instanceof i && (z = this);
            b =
              a +
              (-1 !== u && (h || b) ? "[" + u + "]" : "") +
              (b ? k + b : "");
            f.Associations.EVENTS_WILDCARD &&
              (o = b.replace(/\[\d+\]/g, "[*]"));
            e = [];
            e.push.apply(e, d);
            e[0] = g + ":" + b;
            f.Associations.EVENTS_WILDCARD &&
              b !== o &&
              (e[0] = e[0] + " " + g + ":" + o);
            j = c._proxyCalls = j || {};
            if (this._isEventAvailable.call(this, j, b)) return this;
            j[b] = !0;
            h &&
              ((this._previousAttributes[a] = c._previousAttributes),
              (this.changed[a] = c));
            this.trigger.apply(this, e);
            f.Associations.EVENTS_NC &&
              h &&
              this.get(b) != d[2] &&
              ((a = ["nested-change", b, d[1]]),
              d[2] && a.push(d[2]),
              this.trigger.apply(this, a));
            j && b && delete j[b];
            z = void 0;
            return this;
          }
        },
        _isEventAvailable: function (a, c) {
          return g.find(a, function (a, b) {
            return -1 !== c.indexOf(b, c.length - b.length);
          });
        },
        _setupParents: function (a, c) {
          a &&
            ((a.parents = a.parents || []),
            -1 == g.indexOf(a.parents, this) && a.parents.push(this));
          c &&
            0 < c.parents.length &&
            c != a &&
            ((c.parents = g.difference(c.parents, [this])),
            c._proxyCallback && c.off("all", c._proxyCallback, this));
        },
        _createCollection: function (a, c) {
          var c = g.defaults(c, { model: a.model }),
            d = new a([], g.isFunction(c) ? c.call(this) : c);
          d.parents = [this];
          return d;
        },
        _processPendingEvents: function () {
          this._processedEvents ||
            ((this._processedEvents = !0),
            (this._deferEvents = !1),
            g.each(this._pendingEvents, function (a) {
              a.c.trigger.apply(a.c, a.a);
            }),
            (this._pendingEvents = []),
            g.each(
              this.relations,
              function (a) {
                (a = this.attributes[a.key]) &&
                  a._processPendingEvents &&
                  a._processPendingEvents();
              },
              this
            ),
            delete this._processedEvents);
        },
        _transformRelatedModel: function (a, c) {
          var d = a.relatedModel,
            b = a.scope || q;
          d &&
            !(d.prototype instanceof i) &&
            (d = g.isFunction(d) ? d.call(this, a, c) : d);
          d && g.isString(d) && (d = d === f.Self ? this.constructor : C(d, b));
          if (a.type === f.One) {
            if (!d) throw Error("specify a relatedModel for Backbone.One type");
            if (!(d.prototype instanceof f.Model))
              throw Error(
                "specify an AssociatedModel or Backbone.Model for Backbone.One type"
              );
          }
          return d;
        },
        _transformCollectionType: function (a, c, d) {
          var b = a.collectionType,
            l = a.scope || q;
          if (b && g.isFunction(b) && b.prototype instanceof i)
            throw Error(
              "type is of Backbone.Model. Specify derivatives of Backbone.Collection"
            );
          b &&
            !(b.prototype instanceof p) &&
            (b = g.isFunction(b) ? b.call(this, a, d) : b);
          b && g.isString(b) && (b = C(b, l));
          if (b && !b.prototype instanceof p)
            throw Error("collectionType must inherit from Backbone.Collection");
          if (a.type === f.Many && !c && !b)
            throw Error("specify either a relatedModel or collectionType");
          return b;
        },
        trigger: function (a) {
          this._deferEvents
            ? ((this._pendingEvents = this._pendingEvents || []),
              this._pendingEvents.push({ c: this, a: arguments }))
            : t.trigger.apply(this, arguments);
        },
        toJSON: function (a) {
          var c = {},
            d;
          c[this.idAttribute] = this.id;
          this.visited ||
            ((this.visited = !0),
            (c = t.toJSON.apply(this, arguments)),
            a && a.serialize_keys && (c = g.pick(c, a.serialize_keys)),
            this.relations &&
              g.each(
                this.relations,
                function (b) {
                  var f = b.key,
                    e = b.remoteKey,
                    h = this.attributes[f],
                    i = !b.isTransient,
                    b = b.serialize || [],
                    k = g.clone(a);
                  delete c[f];
                  i &&
                    (b.length &&
                      (k
                        ? (k.serialize_keys = b)
                        : (k = { serialize_keys: b })),
                    (d = h && h.toJSON ? h.toJSON(k) : h),
                    (c[e || f] = g.isArray(d) ? g.compact(d) : d));
                },
                this
              ),
            delete this.visited);
          return c;
        },
        clone: function (a) {
          return new this.constructor(this.toJSON(a));
        },
        cleanup: function (a) {
          a = a || {};
          g.each(
            this.relations,
            function (a) {
              if ((a = this.attributes[a.key]))
                a._proxyCallback && a.off("all", a._proxyCallback, this),
                  (a.parents = g.difference(a.parents, [this]));
            },
            this
          );
          !a.listen && this.off();
        },
        destroy: function (a) {
          var a = a ? g.clone(a) : {},
            a = g.defaults(a, { remove_references: !0, listen: !0 }),
            c = this;
          if (a.remove_references && a.wait) {
            var d = a.success;
            a.success = function (b) {
              d && d(c, b, a);
              c.cleanup(a);
            };
          }
          var b = t.destroy.apply(this, [a]);
          a.remove_references && !a.wait && c.cleanup(a);
          return b;
        },
        _getAttr: function (a) {
          var c = this,
            d = this.__attributes__,
            a = H(a),
            b,
            f;
          if (!(1 > g.size(a))) {
            for (f = 0; f < a.length; f++) {
              b = a[f];
              if (!c) break;
              c =
                c instanceof p
                  ? isNaN(b)
                    ? void 0
                    : c.at(b)
                  : d
                  ? x(c.attributes[b])
                    ? c.attributes[b]
                    : d[b]
                  : c.attributes[b];
            }
            return c;
          }
        },
      });
  var H = function (a) {
      return "" === a ? [""] : g.isString(a) ? a.match(E) : a || [];
    },
    B = function (a) {
      if (!a) return a;
      a = a.split(":");
      return 1 < a.length
        ? ((a = a[a.length - 1]),
          (a = a.split(k)),
          1 < a.length ? a[a.length - 1].split("[")[0] : a[0].split("[")[0])
        : "";
    },
    C = function (a, c) {
      var d,
        b = [c];
      b.push.apply(b, f.Associations.scopes);
      for (var i, e = 0, h = b.length; e < h; ++e)
        if ((i = b[e]))
          if (
            (d = g.reduce(
              a.split(k),
              function (a, b) {
                return a[b];
              },
              i
            ))
          )
            break;
      return d;
    },
    I = function (a, c, d) {
      var b, f;
      g.find(
        a,
        function (a) {
          if (
            (b = g.find(
              a.relations,
              function (b) {
                return a.get(b.key) === c;
              },
              this
            ))
          )
            return (f = a), !0;
        },
        this
      );
      return b && b.map ? b.map.call(f, d, c) : d;
    },
    x = function (a) {
      return !g.isUndefined(a) && !g.isNull(a);
    },
    y = {};
  g.each(["set", "remove", "reset"], function (a) {
    y[a] = p.prototype[a];
    n[a] = function (c, d) {
      this.model.prototype instanceof v &&
        this.parents &&
        (arguments[0] = I(this.parents, this, c));
      return y[a].apply(this, arguments);
    };
  });
  y.trigger = n.trigger;
  n.trigger = function (a) {
    this._deferEvents
      ? ((this._pendingEvents = this._pendingEvents || []),
        this._pendingEvents.push({ c: this, a: arguments }))
      : y.trigger.apply(this, arguments);
  };
  n._processPendingEvents = v.prototype._processPendingEvents;
  n.on = v.prototype.on;
  n.off = v.prototype.off;
  return f;
});
