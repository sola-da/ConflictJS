!(function (e, t) {
  if ("function" == typeof define && define.amd)
    define(["underscore", "backbone"], function (e, n) {
      t(e, n);
    });
  else if ("undefined" != typeof exports && "function" == typeof require) {
    var n = require("underscore"),
      r = require("backbone");
    t(n, r);
  } else t(e._, e.Backbone);
})(this, function (e, t) {
  t.Model.extend =
    t.Collection.extend =
    t.Router.extend =
    t.View.extend =
      function (e, t) {
        var n = u(this, e, t);
        return (n.extend = this.extend), n;
      };
  var n = function (e) {
      throw "Super does not implement this method: " + e;
    },
    r = /\b_super\b/,
    o = function (e, t, r) {
      var o = function () {
        var o = this._super;
        this._super = e[t] || n(t);
        var i;
        try {
          i = r.apply(this, arguments);
        } finally {
          this._super = o;
        }
        return i;
      };
      for (var i in r) (o[i] = r[i]), delete r[i];
      return o;
    },
    i = function () {},
    u = function (t, n, u) {
      var p,
        f = t.prototype;
      if (
        ((p =
          n && n.hasOwnProperty("constructor")
            ? n.constructor
            : function () {
                return t.apply(this, arguments);
              }),
        e.extend(p, t, u),
        (i.prototype = f),
        (p.prototype = new i()),
        n)
      ) {
        e.extend(p.prototype, n);
        for (var s in n)
          "function" == typeof n[s] &&
            r.test(n[s]) &&
            (p.prototype[s] = o(f, s, n[s]));
      }
      return (
        u && e.extend(p, u), (p.prototype.constructor = p), (p.__super__ = f), p
      );
    };
  return u;
});
