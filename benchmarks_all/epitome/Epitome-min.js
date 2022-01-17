(function (t) {
  var e = function (t) {
      return t.replace(/^on([A-Z])/, function (t, e) {
        return e.toLowerCase();
      });
    },
    i = function (t, i) {
      t = e(t);
      var n = t.split(/\s+/),
        r = this;
      return (
        n.each(function (t) {
          r.$events[t] = (r.$events[t] || []).include(i);
        }),
        this
      );
    }.overloadSetter(),
    n = function (t, i) {
      t = e(t);
      var n = this.$events[t];
      if (n)
        if (i) {
          var r = n.indexOf(i);
          -1 != r && n.splice(r, 1);
        } else delete this.$events[t];
      return this;
    }.overloadSetter(),
    r = "*",
    o = "undefined",
    s = "function",
    u = new Class({
      $events: {},
      $subscribers: {},
      on: i,
      off: n,
      trigger: function (t, i) {
        t = e(t);
        var n = this.$events[t] || [],
          o =
            t in this.$subscribers
              ? this.$subscribers[t]
              : r in this.$subscribers
              ? this.$subscribers[r]
              : [],
          s = this;
        return n || o
          ? ((i = Array.from(i)),
            n.each(function (t) {
              t.apply(s, i);
            }),
            o.each(function (e) {
              e.fn
                ? e.fn.apply(e.context, i)
                : e.subscriber.trigger(t, Array.flatten([s, i]));
            }),
            this)
          : this;
      },
      listenTo: function (t, e, i) {
        var n = typeof e,
          u = { context: t, subscriber: this };
        return (
          n === s ? ((i = e), (e = r)) : n === o && (e = r),
          i && (u.fn = i),
          (t.$subscribers[e] = (t.$subscribers[e] || []).include(u)),
          this
        );
      },
      stopListening: function (t, e, i) {
        var n;
        return (
          Object.each(t.$subscribers, function (r, s) {
            if (((n = r.length), typeof e !== o)) {
              if (s === e)
                for (; n--; )
                  ((i && i === r[n].fn) || !i) &&
                    r[n].context === t &&
                    r.splice(n, 1);
            } else for (; n--; ) r[n].context === t && r.splice(n, 1);
          }),
          this
        );
      },
      setOptions: function () {
        var t,
          e = (this.options = Object.merge.apply(
            null,
            [{}, this.options].append(arguments)
          ));
        for (t in e)
          "function" == typeOf(e[t]) &&
            /^on[A-Z]/.test(t) &&
            (this.on(t, e[t]), delete e[t]);
        return this;
      },
    });
  "function" == typeof define && define.amd
    ? define("epitome-events", [], function () {
        return u;
      })
    : (t.Epitome || (t.Epitome = {}), (t.Epitome.Events = u));
})(this),
  (function (t) {
    var e = function (t) {
      var e = new t();
      return (e.Events = t), e;
    };
    "function" == typeof define && define.amd
      ? define("epitome", ["./epitome-events"], e)
      : (t.Epitome = e(t.Epitome.Events));
  })(this),
  (function (t) {
    var e = function () {
      var t = function (e, i, n) {
        if (((n = n || []), e === i)) return 0 !== e || 1 / e == 1 / i;
        if (null == e || null == i) return e === i;
        var r = typeOf(e),
          o = typeOf(i);
        if (r != o) return !1;
        switch (r) {
          case "string":
            return e == i + "";
          case "number":
            return e != +e ? i != +i : 0 == e ? 1 / e == 1 / i : e == +i;
          case "date":
          case "boolean":
            return +e == +i;
          case "regexp":
            return (
              e.source == i.source &&
              e.global == i.global &&
              e.multiline == i.multiline &&
              e.ignoreCase == i.ignoreCase
            );
        }
        if ("object" != typeof e || "object" != typeof i) return !1;
        for (var s = n.length; s--; ) if (n[s] == e) return !0;
        n.push(e);
        var u = 0,
          a = !0;
        if ("array" == r) {
          if (((u = e.length), (a = u == i.length)))
            for (; u-- && (a = u in e == u in i && t(e[u], i[u], n)); );
        } else {
          if (
            "constructor" in e != "constructor" in i ||
            e.constructor != i.constructor
          )
            return !1;
          for (var c in e)
            if (
              e.hasOwnProperty(c) &&
              (u++, !(a = i.hasOwnProperty(c) && t(e[c], i[c], n)))
            )
              break;
          if (a) {
            for (c in i) if (i.hasOwnProperty(c) && !u--) break;
            a = !u;
          }
        }
        return n.pop(), a;
      };
      return t;
    };
    "function" == typeof define && define.amd
      ? define("epitome-isequal", ["./epitome"], e)
      : (t.Epitome || (t.Epitome = {}), (t.Epitome.isEqual = e(t.Epitome)));
  })(this),
  (function (t) {
    var e = function (t, e) {
      return new Class({
        Implements: [e],
        _attributes: {},
        properties: {
          id: {
            get: function () {
              var t = this._attributes.id || String.uniqueID();
              return this.cid || (this.cid = t), this._attributes.id;
            },
          },
        },
        validators: {},
        options: { defaults: {} },
        collections: [],
        initialize: function (t, e) {
          return (
            e &&
              e.defaults &&
              (this.options.defaults = Object.merge(
                this.options.defaults,
                e.defaults
              )),
            (t = t && "object" === typeOf(t) ? t : {}),
            this.set(Object.merge(this.options.defaults, t)),
            this.setOptions(e),
            this.trigger("ready")
          );
        },
        set: function () {
          (this.propertiesChanged = []),
            (this.validationFailed = []),
            this._set.apply(this, arguments),
            this.propertiesChanged.length &&
              this.trigger("change", this.get(this.propertiesChanged)),
            this.validationFailed.length &&
              this.trigger("error", [this.validationFailed]);
        },
        _set: function (e, i) {
          if (!e || i === void 0) return this;
          if (this.properties[e] && this.properties[e].set)
            return this.properties[e].set.call(this, i);
          if (this._attributes[e] && t(this._attributes[e], i)) return this;
          var n = this.validate(e, i);
          if (this.validators[e] && n !== !0) {
            var r = {};
            return (
              (r[e] = { key: e, value: i, error: n }),
              this.validationFailed.push(r),
              this.trigger("error:" + e, r[e]),
              this
            );
          }
          return (
            null === i ? delete this._attributes[e] : (this._attributes[e] = i),
            this.trigger("change:" + e, i),
            this.propertiesChanged.push(e),
            this
          );
        }.overloadSetter(),
        get: function (t) {
          return t && this.properties[t] && this.properties[t].get
            ? this.properties[t].get.call(this)
            : t && this._attributes[t] !== void 0
            ? this._attributes[t]
            : null;
        }.overloadGetter(),
        unset: function () {
          var t = Array.prototype.slice.apply(arguments),
            e = {},
            i = t.length;
          return i
            ? (Array.each(Array.flatten(t), function (t) {
                e[t] = null;
              }),
              this.set(e),
              this)
            : this;
        },
        toJSON: function () {
          return Object.clone(this._attributes);
        },
        empty: function () {
          var t = Object.keys(this.toJSON()),
            e = this;
          this.trigger("change", [t]),
            Array.each(
              t,
              function (t) {
                e.trigger("change:" + t, null);
              },
              this
            ),
            (this._attributes = {}),
            this.trigger("empty");
        },
        destroy: function () {
          (this._attributes = {}), this.trigger("destroy");
        },
        validate: function (t, e) {
          return t in this.validators ? this.validators[t].call(this, e) : !0;
        },
      });
    };
    "function" == typeof define && define.amd
      ? define("epitome-model", ["./epitome-isequal", "./epitome-events"], e)
      : (t.Epitome || (t.Epitome = { isEqual: {}, Events: {} }),
        (t.Epitome.Model = e(t.Epitome.isEqual, t.Epitome.Events)));
  })(this),
  (function (t) {
    var e = new Class({
        Extends: Request,
        options: { secure: !0 },
        initialize: function (t) {
          this.parent(t),
            Object.append(this.headers, {
              Accept: "application/json,text/plain;q=0.2,text/html;q=0.1",
              "X-Request": "JSON",
            });
        },
        success: function (t) {
          var e;
          try {
            e = this.response.json = JSON.decode(t, this.options.secure);
          } catch (i) {
            return this.fireEvent("error", [t, i]), void 0;
          }
          t && null == e && 204 != this.status
            ? this.onFailure()
            : this.onSuccess(e, t);
        },
      }),
      i = function (t) {
        var i = "sync:",
          n = { create: "POST", read: "GET", update: "PUT", delete_: "DELETE" };
        return new Class({
          Extends: t,
          properties: {
            urlRoot: {
              set: function (t) {
                (this.urlRoot = t), delete this._attributes.urlRoot;
              },
              get: function () {
                var t =
                  this.urlRoot || this.options.urlRoot || "no-urlRoot-set";
                return "/" != t.charAt(t.length - 1) && (t += "/"), t;
              },
            },
          },
          options: { request: e, emulateREST: !1, useJSON: !1 },
          initialize: function (t, e) {
            this.setOptions(e), this.setupSync(), this.parent(t, this.options);
          },
          sync: function (t, e) {
            var i = {};
            return (
              (t = t && n[t] ? n[t] : n.read),
              (i.method = t),
              (t == n.create || t == n.update) &&
                ((i.data = e || this.toJSON()),
                this.preProcessor && (i.data = this.preProcessor(i.data))),
              this.options.useJSON && ["POST", "PUT", "DELETE"].contains(t)
                ? ((i.data = JSON.encode(i.data)),
                  (i.urlEncoded = !1),
                  this.request.setHeader("Content-type", "application/json"))
                : (i.urlEncoded = !0),
              (i.url = [this.get("urlRoot"), this.get("id")].join("")),
              "/" !== i.url.slice(-1) && (i.url += "/"),
              this.request.setOptions(i),
              this.request[t](e),
              this
            );
          },
          setupSync: function () {
            var t,
              e = this,
              r = 0,
              o = function () {
                r++;
              };
            return (
              (this.getRequestId = function () {
                return r + 1;
              }),
              (t = {
                link: "chain",
                url: this.get("urlRoot"),
                emulation: this.options.emulateREST,
                onRequest: o,
                onCancel: function () {
                  this.removeEvents(i + r);
                },
                onSuccess: function (t) {
                  (t = e.postProcessor && e.postProcessor(t)),
                    (e.isNewModel = !1),
                    e.trigger(i + r, [t]),
                    e.trigger("sync", [
                      t,
                      this.options.method,
                      this.options.data,
                    ]);
                },
                onFailure: function () {
                  e.trigger(i + "error", [
                    this.options.method,
                    this.options.url,
                    this.options.data,
                  ]),
                    e.trigger("requestFailure", [
                      this.status,
                      this.response.text,
                    ]);
                },
              }),
              this.options.headers && (t.headers = this.options.headers),
              (this.request = new this.options.request(t)),
              Object.each(n, function (t, i) {
                e[i] = function (t) {
                  this.sync(i, t);
                };
              }),
              this
            );
          },
          _throwAwaySyncEvent: function (t, e) {
            t = t || i + this.getRequestId();
            var n = this,
              r = {};
            return (
              (r[t] = function (t) {
                t && "object" == typeof t && n.set(t),
                  e && e.call(n, t),
                  n.off(r);
              }),
              this.on(r)
            );
          }.protect(),
          postProcessor: function (t) {
            return t;
          },
          preProcessor: function (t) {
            return t;
          },
          fetch: function () {
            return (
              this._throwAwaySyncEvent(i + this.getRequestId(), function () {
                (this.isNewModel = !1), this.trigger("fetch");
              }),
              this.read(),
              this
            );
          },
          save: function (t, e) {
            var n = ["update", "create"][+this.isNew()];
            if (t) {
              var r = typeOf(t),
                o = "object" == r || ("string" == r && e !== void 0);
              o && this._set.apply(this, arguments);
            }
            return (
              this._throwAwaySyncEvent(i + this.getRequestId(), function () {
                this.trigger("save"), this.trigger(n);
              }),
              this[n](),
              this
            );
          },
          destroy: function () {
            this._throwAwaySyncEvent(i + this.getRequestId(), function () {
              (this._attributes = {}), this.trigger("destroy");
            }),
              this.delete_();
          },
          isNew: function () {
            return (
              this.isNewModel === void 0 && (this.isNewModel = !this.get("id")),
              this.isNewModel
            );
          },
        });
      };
    "function" == typeof define && define.amd
      ? define("epitome-model-sync", ["./epitome-model"], i)
      : (t.Epitome || (t.Epitome = { Model: {} }),
        (t.Epitome.Model.Sync = i(t.Epitome.Model)));
  })(this),
  (function (t) {
    var e = function () {
      var e = (function () {
        var e = !("object" != typeof t.localStorage || !t.localStorage.getItem),
          i = "localStorage",
          n = "sessionStorage",
          r = function (i) {
            var n,
              r = "epitome-" + i,
              o = {},
              s = "model";
            if (e)
              try {
                o = JSON.decode(t[i].getItem(r)) || o;
              } catch (u) {
                e = !1;
              }
            if (!e)
              try {
                (n = JSON.decode(t.name)),
                  n && "object" == typeof n && n[r] && (o = n[r]);
              } catch (u) {
                d();
              }
            var a = {
                store: function (t) {
                  (t = t || this.toJSON()),
                    h([s, this.get("id")].join(":"), t),
                    this.trigger("store", t);
                },
                eliminate: function () {
                  return (
                    l([s, this.get("id")].join(":")), this.trigger("eliminate")
                  );
                },
                retrieve: function () {
                  var t = c([s, this.get("id")].join(":")) || null;
                  return this.trigger("retrieve", t), t;
                },
              },
              c = function (t) {
                return o[t] || null;
              },
              h = function (n, s) {
                if (
                  ((o = e ? JSON.decode(t[i].getItem(r)) || o : o),
                  (o[n] = s),
                  e)
                )
                  try {
                    t[i].setItem(r, JSON.encode(o));
                  } catch (u) {}
                else d();
                return this;
              },
              l = function (n) {
                if ((delete o[n], e))
                  try {
                    t[i].setItem(r, JSON.encode(o));
                  } catch (s) {}
                else d();
              },
              d = function () {
                var e = {},
                  i = JSON.decode(t.name);
                (e[r] = o), (t.name = JSON.encode(Object.merge(e, i)));
              };
            return function (t) {
              return t && (s = t), new Class(Object.clone(a));
            };
          };
        return { localStorage: r(i), sessionStorage: r(n) };
      })();
      return e;
    };
    "function" == typeof define && define.amd
      ? define("epitome-storage", ["./epitome"], e)
      : (t.Epitome || (t.Epitome = {}), (t.Epitome.Storage = e(t)));
  })(this),
  (function (t) {
    var e = function (e, i) {
      var n = [
          "forEach",
          "each",
          "invoke",
          "filter",
          "map",
          "some",
          "indexOf",
          "contains",
          "getRandom",
          "getLast",
        ],
        r = new Class({
          Implements: [i],
          model: e,
          _models: [],
          initialize: function (t, e) {
            return (
              this.setOptions(e),
              t && this.setUp(t),
              (this.id = this.options.id || String.uniqueID()),
              this.trigger("ready")
            );
          },
          setUp: function (t) {
            return (
              (t = Array.from(t)),
              Array.each(t, this.addModel.bind(this)),
              this.on("destroy", this.removeModel.bind(this)),
              this
            );
          },
          addModel: function (t, e) {
            var i;
            return (
              "object" != typeOf(t) ||
                instanceOf(t, this.model) ||
                (t = new this.model(t)),
              (t.cid = t.cid || t.get("id") || String.uniqueID()),
              (i = this.getModelByCID(t.cid)),
              i && e !== !0
                ? this.trigger("add:error", t)
                : (i && e === !0 && (this._models[this._models.indexOf(t)] = t),
                  this.listenTo(t),
                  this._models.push(t),
                  t.collections.include(this),
                  (this.length = this._models.length),
                  this.trigger("add", [t, t.cid]).trigger("reset", [t, t.cid]))
            );
          },
          modelEvent: function () {},
          removeModel: function (t, e) {
            var i = this;
            return (
              (t = Array.from(t).slice()),
              Array.each(t, function (t) {
                t.collections.erase(i),
                  t.collections.length || delete t.fireEvent,
                  Array.erase(i._models, t),
                  (i.length = i._models.length),
                  e || i.trigger("remove", [t, t.cid]);
              }),
              this.trigger("reset", [t])
            );
          },
          get: function (t) {
            return this[t];
          },
          getModelByCID: function (t) {
            var e = null;
            return (
              this.some(function (i) {
                return i.cid == t && (e = i);
              }),
              e
            );
          },
          getModelById: function (t) {
            var e = null;
            return (
              this.some(function (i) {
                return i.get("id") == t && (e = i);
              }),
              e
            );
          },
          getModel: function (t) {
            return this._models[t];
          },
          toJSON: function () {
            var t = function (t) {
              return t.toJSON();
            };
            return Array.map(this._models, t);
          },
          empty: function (t) {
            return this.removeModel(this._models, t), this.trigger("empty");
          },
          sort: function (t) {
            if (!t) return this._models.sort(), this.trigger("sort");
            if ("function" == typeof t)
              return this.model.sort(t), this.trigger("sort");
            var e = "asc",
              i = t.split(","),
              n = function (t, e) {
                return e > t ? -1 : t > e ? 1 : 0;
              };
            return (
              this._models.sort(function (t, r) {
                var o = 0;
                return (
                  Array.some(i, function (i) {
                    i = i.trim();
                    var s = i.split(":"),
                      u = s[0],
                      a = s[1] ? s[1] : e,
                      c = t.get(u),
                      h = r.get(u),
                      l = n(c, h),
                      d = { asc: l, desc: -l };
                    return d[a] === void 0 && (a = e), (o = d[a]), 0 != o;
                  }),
                  o
                );
              }),
              this.trigger("sort")
            );
          },
          reverse: function () {
            return Array.reverse(this._models), this.trigger("sort");
          },
          find: function (e) {
            var i = t.Slick.parse(e),
              n = [],
              r = this,
              o = {
                "=": function (t, e) {
                  return t == e;
                },
                "!=": function (t, e) {
                  return t != e;
                },
                "^=": function (t, e) {
                  return 0 === t.indexOf(e);
                },
                "*=": function (t, e) {
                  return -1 !== t.indexOf(e);
                },
                "$=": function (t, e) {
                  return t.indexOf(e) == t.length - e.length;
                },
                "*": function (t) {
                  return t !== void 0;
                },
              },
              s = function (t) {
                return t && o[t] ? o[t] : null;
              },
              u = function (t) {
                var e = t.key,
                  i = t.value || null,
                  n = t.tag || null,
                  o = s(t.operator);
                r = r.filter(function (t) {
                  var r, s;
                  return (
                    n && e
                      ? ((r = t.get(n)), (s = r ? r[e] : null))
                      : (s = n ? t.get(n) : t.get(e)),
                    null !== s && null !== i && null !== o ? o(s, i) : null != s
                  );
                });
              };
            if (i.expressions.length) {
              var a,
                c,
                h,
                l,
                d,
                f,
                p,
                g,
                m = i.expressions;
              t: for (c = 0; (l = m[c]); c++) {
                for (a = 0; (d = l[a]); a++) {
                  if (
                    ((h = d.attributes),
                    (f = d.id),
                    f &&
                      ((p = { key: "id", value: f, operator: "=" }),
                      h || (h = []),
                      h.push(p)),
                    (g = d.tag),
                    g &&
                      "*" != g &&
                      (h || (h = [{ key: null, value: "", operator: "*" }]),
                      (h = Array.map(h, function (t) {
                        return (t.tag = g), t;
                      }))),
                    !h)
                  )
                    continue t;
                  Array.each(h, u);
                }
                (n[c] = r), (r = this);
              }
            }
            return [].combine(Array.flatten(n));
          },
          findOne: function (t) {
            var e = this.find(t);
            return e.length ? e[0] : null;
          },
        });
      return (
        Array.each(n, function (t) {
          r.implement(t, function () {
            return Array.prototype[t].apply(this._models, arguments);
          });
        }),
        r
      );
    };
    "function" == typeof define && define.amd
      ? define("epitome-collection", ["./epitome-model", "./epitome-events"], e)
      : (t.Epitome || (t.Epitome = { Model: {}, Events: {} }),
        (t.Epitome.Collection = e(t.Epitome.Model, t.Epitome.Events)));
  })(this),
  (function (t) {
    var e = function (t) {
      var e = "no-urlRoot-set",
        i = "fetch:";
      return new Class({
        Extends: t,
        options: { urlRoot: e },
        initialize: function (t, e) {
          this.setupSync(), this.parent(t, e);
        },
        setupSync: function () {
          var t = this,
            e = 0,
            n = function () {
              e++;
            };
          return (
            (this.getRequestId = function () {
              return e + 1;
            }),
            (this.request = new Request.JSON({
              link: "chain",
              url: this.options.urlRoot,
              emulation: this.options.emulateREST,
              onRequest: n,
              onCancel: function () {
                this.removeEvents(i + e);
              },
              onSuccess: function (n) {
                (n = t.postProcessor && t.postProcessor(n)),
                  t.trigger(i + e, [[n]]);
              },
              onFailure: function () {
                t.trigger(i + "error", [
                  this.options.method,
                  this.options.url,
                  this.options.data,
                ]);
              },
            })),
            this.request.setHeader(
              "Accept",
              "application/json,text/plain;q=0.2,text/html;q=0.1"
            ),
            this
          );
        },
        fetch: function (t, e) {
          return (
            e || (e = {}),
            this._throwAwayEvent(function (e) {
              t
                ? (this.empty(), Array.each(e, this.addModel.bind(this)))
                : this.processModels(e),
                this.trigger("fetch", [e]);
            }),
            this.request.get(e),
            this
          );
        },
        processModels: function (t) {
          var e = this;
          Array.each(t, function (t) {
            var i = t.id && e.getModelById(t.id);
            i ? i.set(t) : e.addModel(t);
          });
        },
        _throwAwayEvent: function (t) {
          var e = i + this.getRequestId(),
            n = this,
            r = {};
          if (t && "function" == typeof t)
            return (
              (r[e] = function (e) {
                t.apply(n, e), n.off(r);
              }),
              this.on(r)
            );
        }.protect(),
        postProcessor: function (t) {
          return t;
        },
      });
    };
    "function" == typeof define && define.amd
      ? define("epitome-collection-sync", ["./epitome-collection"], e)
      : (t.Epitome || (t.Epitome = { Collection: {} }),
        (t.Epitome.Collection.Sync = e(t.Epitome.Collection)));
  })(this),
  (function (t) {
    (function () {
      var t = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "/": "&#x2F;",
        },
        e = RegExp("[" + Object.keys(t).join("") + "]", "g");
      String.implement({
        escape: function () {
          return (this + "").replace(e, function (e) {
            return t[e];
          });
        },
      });
    })();
    var e = function () {
      return new Class({
        options: {
          evaluate: /<%([\s\S]+?)%>/g,
          normal: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
          noMatch: /.^/,
          escaper: /\\|'|\r|\n|\t|\u2028|\u2029/g,
        },
        Implements: Options,
        initialize: function (t) {
          this.setOptions(t);
          var e = (this.escapes = {
            "\\": "\\",
            "'": "'",
            r: "\r",
            n: "\n",
            t: "	",
            u2028: "\u2028",
            u2029: "\u2029",
          });
          return (
            Object.each(
              e,
              function (t, e) {
                this[t] = e;
              },
              e
            ),
            (this.matcher = RegExp(
              [
                (this.options.escape || this.options.noMatch).source,
                (this.options.normal || this.options.noMatch).source,
                (this.options.evaluate || this.options.noMatch).source,
              ].join("|") + "|$",
              "g"
            )),
            this
          );
        },
        template: function (t, e, i) {
          var n,
            r = i ? Object.merge(this.options, i) : this.options,
            o = this.escapes,
            s = r.escaper,
            u = 0,
            a = "__p+='";
          t.replace(this.matcher, function (e, i, n, r, c) {
            return (
              (a += t.slice(u, c).replace(s, function (t) {
                return "\\" + o[t];
              })),
              i &&
                (a +=
                  "'+\n((__t=(obj['" +
                  i +
                  "']))==null?'':String.escape(__t))+\n'"),
              n && (a += "'+\n((__t=(obj['" + n + "']))==null?'':__t)+\n'"),
              r && (a += "';\n" + r + "\n__p+='"),
              (u = c + e.length),
              e
            );
          }),
            (a += "';\n"),
            r.variable || (a = "obj=obj||{};with(obj){\n" + a + "}\n"),
            (a =
              "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
              a +
              "return __p;\n");
          try {
            n = Function(r.variable || "obj", a);
          } catch (c) {
            throw ((c.source = a), c);
          }
          if (e) return n(e);
          var h = function (t) {
            return n.call(this, t);
          };
          return (
            (h.source = "function(" + (r.variable || "obj") + "){\n" + a + "}"),
            h
          );
        },
      });
    };
    "function" == typeof define && define.amd
      ? define("epitome-template", ["./epitome"], e)
      : (t.Epitome || (t.Epitome = {}), (t.Epitome.Template = e(t.Epitome)));
  })(this),
  (function (t) {
    var e = function (t, e, i, n) {
      return new Class({
        Implements: [n],
        element: null,
        collection: null,
        model: null,
        options: { template: "", events: {} },
        initialize: function (t) {
          return (
            t &&
              t.collection &&
              (this.setCollection(t.collection), delete t.collection),
            t && t.model && (this.setModel(t.model), delete t.model),
            this.setOptions(t),
            this.options.element &&
              (this.setElement(this.options.element, this.options.events),
              delete this.options.element),
            this.trigger("ready")
          );
        },
        setElement: function (t, e) {
          return (
            this.element && this.detachEvents() && this.destroy(),
            (this.element = document.id(t)),
            e && this.attachEvents(e),
            this
          );
        },
        setCollection: function (t) {
          var e = this,
            n = function (t) {
              return function () {
                e.trigger(t + ":collection", arguments);
              };
            };
          return (
            instanceOf(t, i) &&
              ((this.collection = t),
              this.collection.on({
                change: n("change"),
                fetch: n("fetch"),
                add: n("add"),
                remove: n("remove"),
                sort: n("sort"),
                reset: n("reset"),
                error: n("error"),
              })),
            this
          );
        },
        setModel: function (t) {
          var i = this,
            n = function (t) {
              return function () {
                i.trigger(t + ":model", arguments);
              };
            };
          return (
            instanceOf(t, e) &&
              ((this.model = t),
              this.model.on({
                change: n("change"),
                destroy: n("destroy"),
                empty: n("empty"),
                error: n("error"),
              })),
            this
          );
        },
        attachEvents: function (t) {
          var e = this;
          return (
            Object.each(t, function (t, i) {
              e.element.addEvent(i, function () {
                e.trigger(t, arguments);
              });
            }),
            this.element.store("attachedEvents", t),
            this
          );
        },
        detachEvents: function () {
          var t = this.element.retrieve("attachedEvents");
          return (
            t && this.element.removeEvents(t).eliminate("attachedEvents"), this
          );
        },
        template: function (e, i) {
          i = i || this.options.template;
          var n = this.Template || (this.Template = new t());
          return n.template(i, e);
        },
        render: function () {
          return this.trigger("render");
        },
        empty: function (t) {
          return (
            t ? this.element.empty() : this.element.set("html", ""),
            this.trigger("empty")
          );
        },
        dispose: function () {
          return this.element.dispose(), this.trigger("dispose");
        },
        destroy: function () {
          return this.element.destroy(), this.trigger("destroy");
        },
      });
    };
    "function" == typeof define && define.amd
      ? define(
          "epitome-view",
          [
            "./epitome-template",
            "./epitome-model",
            "./epitome-collection",
            "./epitome-events",
          ],
          e
        )
      : (t.Epitome ||
          (t.Epitome = { Template: {}, Model: {}, Collection: {}, Events: {} }),
        (t.Epitome.View = e(
          t.Epitome.Template,
          t.Epitome.Model,
          t.Epitome.Collection,
          t.Epitome.Events
        )));
  })(this),
  (function (t) {
    var e = function (t) {
      var e,
        i = "hashchange",
        n = "on" + i in window,
        r = [window, document],
        o = function (t) {
          for (var e, i = {}, n = /([^&=]+)=([^&]*)/g; (e = n.exec(t)); )
            i[decodeURIComponent(e[1])] = decodeURIComponent(e[2]);
          return i;
        };
      return (
        (Element.Events.hashchange = {
          onAdd: function () {
            var t = location.hash,
              o = function () {
                t != location.hash &&
                  ((t = location.hash),
                  r.invoke(
                    "fireEvent",
                    i,
                    0 == t.indexOf("#") ? t.substr(1) : t
                  ));
              };
            (n && (window.onhashchange = o)) || (e = o.periodical(100));
          },
          onRemove: function () {
            (n && (window.onhashchange = null)) || clearInterval(e);
          },
        }),
        new Class({
          Implements: [t],
          options: { triggerOnLoad: !0 },
          routes: {},
          boundEvents: {},
          initialize: function (t) {
            var e = this;
            this.setOptions(t),
              this.options.routes && (this.routes = this.options.routes),
              window.addEvent(i, function () {
                var t,
                  i = location.hash,
                  n = i.split("?")[0],
                  r = i.split("?")[1] || "",
                  s = !0;
                for (t in e.routes) {
                  var u = [],
                    a = e.normalize(t, u, !0, !1),
                    c = a.exec(n),
                    h = !1;
                  if (c) {
                    (s = !1), (e.req = c[0]);
                    var l = c.slice(1),
                      d = {};
                    Array.each(l, function (t, e) {
                      u[e] !== void 0 && (d[u[e].name] = t);
                    }),
                      (e.route = t),
                      (e.param = d || {}),
                      (e.query = r && o(r)),
                      (h = e.routes[t]),
                      e.trigger("before", h),
                      h && e.$events[h]
                        ? (e.trigger(h + ":before"),
                          e.trigger(h, Object.values(e.param)))
                        : e.trigger(
                            "error",
                            ["Route", h, "is undefined"].join(" ")
                          ),
                      e.trigger("after", h),
                      h && e.trigger(h + ":after");
                    break;
                  }
                }
                s && e.trigger("undefined");
              }),
              this.trigger("ready"),
              this.options.triggerOnLoad && window.fireEvent(i);
          },
          navigate: function (t, e) {
            location.hash == t && e ? window.fireEvent(i) : (location.hash = t);
          },
          normalize: function (t, e, i, n) {
            return t instanceof RegExp
              ? t
              : ((t = t
                  .concat(n ? "" : "/?")
                  .replace(/\/\(/g, "(?:/")
                  .replace(
                    /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,
                    function (t, i, n, r, o, s) {
                      return (
                        e.push({ name: r, optional: !!s }),
                        (i = i || ""),
                        [
                          s ? "" : i,
                          "(?:",
                          s ? i : "",
                          (n || "") +
                            (o || (n && "([^/.]+?)") || "([^/]+?)") +
                            ")",
                          s || "",
                        ].join("")
                      );
                    }
                  )
                  .replace(/([\/.])/g, "\\$1")
                  .replace(/\*/g, "(.*)")),
                RegExp("^" + t + "$", i ? "" : "i"));
          },
          addRoute: function (t) {
            return t && t.route && t.id && t.events
              ? t.id.length
                ? this.routes[t.route]
                  ? this.trigger(
                      "error",
                      'Route "{route}" or id "{id}" already exists, aborting'.substitute(
                        t
                      )
                    )
                  : ((this.routes[t.route] = t.id),
                    this.on((this.boundEvents[t.route] = t.events)),
                    this.trigger("route:add", t))
                : this.trigger("error", "Route id cannot be empty, aborting")
              : this.trigger(
                  "error",
                  "Please include route, id and events in the argument object when adding a route"
                );
          },
          removeRoute: function (t) {
            return t && this.routes[t] && this.boundEvents[t]
              ? (this.off(this.boundEvents[t]),
                delete this.routes[t],
                delete this.boundEvents[t],
                this.trigger("route:remove", t))
              : this.trigger(
                  "error",
                  "Could not find route or route is not removable"
                );
          },
        })
      );
    };
    "function" == typeof define && define.amd
      ? define("epitome-router", ["./epitome-events"], e)
      : (t.Epitome || (t.Epitome = { Events: {} }),
        (t.Epitome.Router = e(t.Epitome.Events)));
  })(this);
