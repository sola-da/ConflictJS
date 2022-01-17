/*! asynquence
    v0.9.0 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!(function UMD(e, n, t) {
  "function" == typeof define && define.amd
    ? define(t)
    : "undefined" != typeof module && module.exports
    ? (module.exports = t())
    : (n[e] = t(e, n));
})("ASQ", this, function DEF(e, n) {
  "use strict";
  function Queue() {
    function Item(e) {
      (this.fn = e), (this.next = void 0);
    }
    var e, n, r;
    return {
      add: function $$add(t) {
        (r = new Item(t)), n ? (n.next = r) : (e = r), (n = r), (r = void 0);
      },
      drain: function $$drain() {
        var r = e;
        for (e = n = t = null; r; ) r.fn(), (r = r.next);
      },
    };
  }
  function schedule(e) {
    r.add(e), t || (t = u(r.drain));
  }
  function tapSequence(e) {
    function trigger() {
      e.seq = createSequence.apply(h, arguments).defer();
    }
    (trigger.fail = function $$trigger$fail() {
      var n = f.call(arguments);
      e.seq = createSequence(function $$create$sequence(e) {
        e.fail.apply(h, n);
      }).defer();
    }),
      e.seq
        .val(function $$val() {
          return trigger.apply(h, arguments), c.apply(h, arguments);
        })
        .or(function $$or() {
          trigger.fail.apply(h, arguments);
        }),
      (e.seq = createSequence(function $$create$sequence(e) {
        trigger = e;
      }).defer());
  }
  function createSequence() {
    function scheduleSequenceTick() {
      r ? sequenceTick() : e || (e = schedule(sequenceTick));
    }
    function throwSequenceErrors() {
      throw 1 === $.length ? $[0] : $;
    }
    function sequenceTick() {
      var a, c;
      if (((e = null), delete d.unpause, r))
        clearTimeout(e),
          (e = null),
          (s.length = p.length = g.length = $.length = 0);
      else if (n)
        for (
          0 !== p.length || t || ((t = !0), throwSequenceErrors());
          p.length;

        ) {
          (t = !0), (a = p.shift());
          try {
            a.apply(h, $);
          } catch (i) {
            l(i) ? ($ = $.concat(i)) : ($.push(i), i.stack && $.push(i.stack)),
              0 === p.length && throwSequenceErrors();
          }
        }
      else if (u && s.length > 0) {
        (u = !1),
          (a = s.shift()),
          (c = g.slice()),
          (g.length = 0),
          c.unshift(createStepCompletion());
        try {
          a.apply(h, c);
        } catch (i) {
          l(i) ? ($ = $.concat(i)) : $.push(i),
            (n = !0),
            scheduleSequenceTick();
        }
      }
    }
    function createStepCompletion() {
      function done() {
        n ||
          r ||
          u ||
          ((u = !0),
          g.push.apply(g, arguments),
          ($.length = 0),
          scheduleSequenceTick());
      }
      return (
        (done.fail = function $$step$fail() {
          n ||
            r ||
            u ||
            ((n = !0),
            (g.length = 0),
            $.push.apply($, arguments),
            scheduleSequenceTick());
        }),
        (done.abort = function $$step$abort() {
          n ||
            r ||
            ((u = !1),
            (r = !0),
            (g.length = $.length = 0),
            scheduleSequenceTick());
        }),
        (done.errfcb = function $$step$errfcb(e) {
          e ? done.fail(e) : done.apply(h, f.call(arguments, 1));
        }),
        done
      );
    }
    function createGate(e, t, u) {
      function resetGate() {
        clearTimeout(s), (s = d = m = o = null);
      }
      function scheduleGateTick() {
        return g ? gateTick() : void (s || (s = schedule(gateTick)));
      }
      function gateTick() {
        if (!(n || r || $)) {
          var t = [];
          (s = null),
            p
              ? (e.fail.apply(h, o), resetGate())
              : g
              ? (e.abort(), resetGate())
              : checkGate() &&
                (($ = !0),
                d.forEach(function $$each(e, n) {
                  t.push(m["s" + n]);
                }),
                e.apply(h, t),
                resetGate());
        }
      }
      function checkGate() {
        if (0 !== d.length) {
          var e = !0;
          return (
            d.some(function $$some(n) {
              return null === n ? ((e = !1), !0) : void 0;
            }),
            e
          );
        }
      }
      function createSegmentCompletion() {
        function done() {
          if (!(n || r || p || g || $ || d[e])) {
            var t = c.apply(h, arguments);
            (m["s" + e] = t.length > 1 ? t : t[0]),
              (d[e] = !0),
              scheduleGateTick();
          }
        }
        var e = d.length;
        return (
          (done.fail = function $$segment$fail() {
            n ||
              r ||
              p ||
              g ||
              $ ||
              d[e] ||
              ((p = !0), (o = f.call(arguments)), scheduleGateTick());
          }),
          (done.abort = function $$segment$abort() {
            n || r || p || g || $ || ((g = !0), gateTick());
          }),
          (done.errfcb = function $$segment$errfcb(e) {
            e ? done.fail(e) : done.apply(h, f.call(arguments, 1));
          }),
          (d[e] = null),
          done
        );
      }
      var a,
        i,
        o,
        s,
        p = !1,
        g = !1,
        $ = !1,
        d = [],
        m = {};
      t.some(function $$some(e) {
        if (p || g) return !0;
        (a = u.slice()), a.unshift(createSegmentCompletion());
        try {
          e.apply(h, a);
        } catch (n) {
          return (i = n), (p = !0), !0;
        }
      }),
        i && (l(i) ? e.fail.apply(h, i) : e.fail(i));
    }
    function then() {
      return n || r || 0 === arguments.length
        ? d
        : (wrapArgs(arguments, thenWrapper).forEach(function $$each(e) {
            i(e) ? seq(e) : s.push(e);
          }),
          scheduleSequenceTick(),
          d);
    }
    function or() {
      return r || 0 === arguments.length
        ? d
        : (p.push.apply(p, arguments), scheduleSequenceTick(), d);
    }
    function gate() {
      if (n || r || 0 === arguments.length) return d;
      var e = f.call(arguments).map(function $$map(e) {
        var n;
        return i(e)
          ? ((n = { seq: e }),
            tapSequence(n),
            function $$segment(e) {
              n.seq.pipe(e);
            })
          : e;
      });
      return (
        then(function $$then(n) {
          var t = f.call(arguments, 1);
          createGate(n, e, t);
        }),
        d
      );
    }
    function pipe() {
      return r || 0 === arguments.length
        ? d
        : (f.call(arguments).forEach(function $$each(e) {
            then(function $$then(n) {
              e.apply(h, f.call(arguments, 1)), n();
            }).or(e.fail);
          }),
          d);
    }
    function seq() {
      return n || r || 0 === arguments.length
        ? d
        : (f.call(arguments).forEach(function $$each(e) {
            var n = { seq: e };
            i(e) && tapSequence(n),
              then(function $$then(e) {
                var t = n.seq;
                i(t) || (t = n.seq.apply(h, f.call(arguments, 1))), t.pipe(e);
              });
          }),
          d);
    }
    function val() {
      return n || r || 0 === arguments.length
        ? d
        : (f.call(wrapArgs(arguments, valWrapper)).forEach(function $$each(e) {
            then(function $$then(n) {
              var t = e.apply(h, f.call(arguments, 1));
              l(t) || (t = c(t)), n.apply(h, t);
            });
          }),
          d);
    }
    function promise() {
      function wrap(e) {
        return function $$fn() {
          e.apply(h, l(arguments[0]) ? arguments[0] : arguments);
        };
      }
      return n || r || 0 === arguments.length
        ? d
        : (f.call(arguments).forEach(function $$each(e) {
            then(function $$then(n) {
              var t = e;
              "function" == typeof e &&
                "function" != typeof e.then &&
                (t = e.apply(h, f.call(arguments, 1))),
                t.then(wrap(n), wrap(n.fail));
            });
          }),
          d);
    }
    function fork() {
      var e;
      return (
        val(function $$val() {
          return (
            e
              ? e.apply(h, arguments)
              : (e = createSequence.apply(h, arguments).defer()),
            c.apply(h, arguments)
          );
        }),
        or(function $$or() {
          if (e) e.fail.apply(h, arguments);
          else {
            var n = f.call(arguments);
            e = createSequence()
              .then(function $$then(e) {
                e.fail.apply(h, n);
              })
              .defer();
          }
        }),
        createSequence()
          .then(function $$then(n) {
            e ? e.pipe(n) : (e = n);
          })
          .defer()
      );
    }
    function abort() {
      return n ? d : ((r = !0), sequenceTick(), d);
    }
    function duplicate() {
      var e;
      return (
        (a = { then_queue: s.slice(), or_queue: p.slice() }),
        (e = createSequence()),
        (a = null),
        e
      );
    }
    function unpause() {
      g.push.apply(g, arguments),
        e === !0 && (e = null),
        scheduleSequenceTick();
    }
    function defer() {
      return p.push(function ignored() {}), d;
    }
    function internals(e, t) {
      var a = arguments.length > 1;
      switch (e) {
        case "seq_error":
          if (!a) return n;
          n = t;
          break;
        case "seq_aborted":
          if (!a) return r;
          r = t;
          break;
        case "then_ready":
          if (!a) return u;
          u = t;
          break;
        case "then_queue":
          return s;
        case "or_queue":
          return p;
        case "sequence_messages":
          return g;
        case "sequence_errors":
          return $;
      }
    }
    function includeExtensions() {
      Object.keys(o).forEach(function $$each(e) {
        d[e] = d[e] || o[e](d, internals);
      });
    }
    var e,
      n = !1,
      t = !1,
      r = !1,
      u = !0,
      s = [],
      p = [],
      g = [],
      $ = [],
      d = brandIt({
        then: then,
        or: or,
        onerror: or,
        gate: gate,
        all: gate,
        pipe: pipe,
        seq: seq,
        val: val,
        promise: promise,
        fork: fork,
        abort: abort,
        duplicate: duplicate,
        defer: defer,
      });
    return (
      includeExtensions(),
      a &&
        ((s = a.then_queue.slice()),
        (p = a.or_queue.slice()),
        (d.unpause = unpause),
        (e = !0)),
      d.then.apply(h, arguments),
      d
    );
  }
  function brandIt(e) {
    return Object.defineProperty(e, p, { enumerable: !1, value: !0 });
  }
  function checkBranding(e) {
    return !(null == e || "object" != typeof e || !e[p]);
  }
  function valWrapper(e) {
    return c.apply(h, f.call(arguments).slice(1, e + 1));
  }
  function thenWrapper(e) {
    arguments[e + 1].apply(h, f.call(arguments).slice(1, e + 1));
  }
  function wrapArgs(e, n) {
    var t, r;
    for (e = f.call(e), t = 0; t < e.length; t++)
      if (l(e[t])) e[t] = n.bind.apply(n, [null, e[t].length].concat(e[t]));
      else if ("function" != typeof e[t] && (n === valWrapper || !i(e[t]))) {
        for (
          r = t + 1;
          r < e.length && "function" != typeof e[r] && !checkBranding(e[r]);
          r++
        );
        e.splice(
          t,
          r - t,
          n.bind.apply(n, [null, r - t].concat(e.slice(t, r)))
        );
      }
    return e;
  }
  var t,
    r,
    u =
      "undefined" != typeof setImmediate
        ? function $$timer(e) {
            return setImmediate(e);
          }
        : setTimeout;
  r = Queue();
  var a,
    c,
    i,
    l,
    o = {},
    s = (n || {})[e],
    f = [].slice,
    p = "__ASQ__",
    h = Object.create(null);
  return (
    (createSequence.failed = function $$public$failed() {
      var e = c.apply(h, arguments);
      return createSequence(function $$failed() {
        throw e;
      }).defer();
    }),
    (createSequence.extend = function $$public$extend(e, n) {
      return (o[e] = n), createSequence;
    }),
    (createSequence.messages = c =
      function $$public$messages() {
        var e = f.call(arguments);
        return brandIt(e);
      }),
    (createSequence.isSequence = i =
      function $$public$isSequence(e) {
        return checkBranding(e) && !Array.isArray(e);
      }),
    (createSequence.isMessageWrapper = l =
      function $$public$isMessageWrapper(e) {
        return checkBranding(e) && Array.isArray(e);
      }),
    (createSequence.unpause = function $$public$unpause(e) {
      return e.unpause && e.unpause(), e;
    }),
    (createSequence.noConflict = function $$public$noConflict() {
      return n && (n[e] = s), createSequence;
    }),
    (createSequence.clone = function $$public$clone() {
      return DEF(e, n);
    }),
    (createSequence.__schedule = schedule),
    (createSequence.__tapSequence = tapSequence),
    createSequence
  );
});
