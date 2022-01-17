/*
	Captionator 0.6 [CaptionPlanet]
	Christopher Giffard, 2011
	Share and enjoy

	https://github.com/cgiffard/Captionator
*/
/*global HTMLVideoElement: true, NodeList: true, Audio: true, HTMLElement: true, document:true, window:true, XMLHttpRequest:true, navigator:true, VirtualMediaContainer:true */
/*jshint strict:true */
/*Tab indented, tab = 4 spaces*/

(function () {
  "use strict";
  var e = 10,
    t = 16,
    n = 4.5,
    r = 1.5,
    i = [0, 0, 0, 0.5],
    s = !1,
    o = {};
  (window.captionator = o),
    (o.CaptionatorCueStructure = function (t, n) {
      var r = this;
      (this.isTimeDependent = !1),
        (this.cueSource = t),
        (this.options = n),
        (this.processedCue = null),
        (this.toString = function i(e) {
          if (n.processCueHTML !== !1) {
            var i = function (t, n) {
              if (r.processedCue === null) {
                var s = "",
                  o,
                  u;
                for (o in t)
                  if (o.match(/^\d+$/) && t.hasOwnProperty(o)) {
                    u = t[o];
                    if (u instanceof Object && u.children && u.children.length)
                      u.token === "v"
                        ? (s +=
                            '<q data-voice="' +
                            u.voice.replace(/[\"]/g, "") +
                            "\" class='voice " +
                            "speaker-" +
                            u.voice.replace(/[^a-z0-9]+/gi, "-").toLowerCase() +
                            " webvtt-span' " +
                            'title="' +
                            u.voice.replace(/[\"]/g, "") +
                            '">' +
                            i(u.children, n + 1) +
                            "</q>")
                        : u.token === "c"
                        ? (s +=
                            "<span class='webvtt-span webvtt-class-span " +
                            u.classes.join(" ") +
                            "'>" +
                            i(u.children, n + 1) +
                            "</span>")
                        : u.timeIn > 0
                        ? e === null ||
                          e === undefined ||
                          (e > 0 && e >= u.timeIn)
                          ? (s +=
                              "<span class='webvtt-span webvtt-timestamp-span' data-timestamp='" +
                              u.token +
                              "' data-timestamp-seconds='" +
                              u.timeIn +
                              "'>" +
                              i(u.children, n + 1) +
                              "</span>")
                          : e < u.timeIn &&
                            (s +=
                              "<span class='webvtt-span webvtt-timestamp-span webvtt-cue-future' aria-hidden='true' style='opacity: 0;' data-timestamp='" +
                              u.token +
                              "' data-timestamp-seconds='" +
                              u.timeIn +
                              "'>" +
                              i(u.children, n + 1) +
                              "</span>")
                        : (s +=
                            u.rawToken +
                            i(u.children, n + 1) +
                            "</" +
                            u.token +
                            ">");
                    else if (
                      u instanceof String ||
                      typeof u == "string" ||
                      typeof u == "number"
                    )
                      s += u;
                  }
                return !r.isTimeDependent && n === 0 && (r.processedCue = s), s;
              }
              return r.processedCue;
            };
            return i(this, 0);
          }
          return t;
        }),
        (this.getPlain = function (e) {
          if (n.processCueHTML !== !1) {
            var r = function (t, n) {
              var i = "",
                s,
                o;
              for (s in t)
                if (s.match(/^\d+$/) && t.hasOwnProperty(s)) {
                  o = t[s];
                  if (o instanceof Object && o.children && o.children.length)
                    if (o.timeIn > 0) {
                      if (
                        e === null ||
                        e === undefined ||
                        (e > 0 && e >= o.timeIn)
                      )
                        i += r(o.children, n + 1);
                    } else i += r(o.children, n + 1);
                  else if (
                    o instanceof String ||
                    typeof o == "string" ||
                    typeof o == "number"
                  )
                    i += o;
                }
              return i;
            };
            return r(this, 0);
          }
          return t.replace(/<[^>]*>/gi, "");
        });
    }),
    (o.CaptionatorCueStructure.prototype = []),
    (o.TextTrack = function (t, n, r, i, s, u) {
      (this.onload = function () {}),
        (this.onerror = function () {}),
        (this.oncuechange = function () {}),
        (this.id = t || ""),
        (this.internalMode = o.TextTrack.OFF),
        (this.cues = new o.TextTrackCueList(this)),
        (this.activeCues = new o.ActiveTextTrackCueList(this.cues, this)),
        (this.kind = n || "subtitles"),
        (this.label = r || ""),
        (this.language = i || ""),
        (this.src = s || ""),
        (this.readyState = o.TextTrack.NONE),
        (this.internalDefault = u || !1),
        (this.getMode = function () {
          return this.internalMode;
        }),
        (this.setMode = function (e) {
          var t = [o.TextTrack.OFF, o.TextTrack.HIDDEN, o.TextTrack.SHOWING],
            n,
            r;
          if (t.indexOf(e) === -1)
            throw new Error("Illegal mode value for track: " + e);
          e !== this.internalMode &&
            ((this.internalMode = e),
            this.readyState === o.TextTrack.NONE &&
              this.src.length > 0 &&
              e > o.TextTrack.OFF &&
              this.loadTrack(this.src, null),
            (this.videoNode._captionator_dirtyBit = !0),
            o.rebuildCaptions(this.videoNode),
            e === o.TextTrack.OFF &&
              ((this.cues.length = 0), (this.readyState = o.TextTrack.NONE)));
        }),
        (this.getDefault = function () {
          return this.internalDefault;
        }),
        Object.prototype.__defineGetter__
          ? (this.__defineGetter__("mode", this.getMode),
            this.__defineSetter__("mode", this.setMode),
            this.__defineGetter__("default", this.getDefault))
          : Object.defineProperty &&
            (Object.defineProperty(this, "mode", {
              get: this.getMode,
              set: this.setMode,
            }),
            Object.defineProperty(this, "default", { get: this.getDefault })),
        (this.loadTrack = function (e, t) {
          var n,
            r = new XMLHttpRequest();
          if (this.readyState === o.TextTrack.LOADED)
            t instanceof Function && t(n);
          else {
            (this.src = e), (this.readyState = o.TextTrack.LOADING);
            var i = this;
            r.open("GET", e, !0),
              (r.onreadystatechange = function (e) {
                if (r.readyState === 4)
                  if (r.status === 200) {
                    var s = i.videoNode._captionatorOptions || {};
                    i.kind === "metadata" &&
                      ((s.processCueHTML = !1), (s.sanitiseCueHTML = !1)),
                      (n = o.parseCaptions(r.responseText, s)),
                      (i.readyState = o.TextTrack.LOADED),
                      i.cues.loadCues(n),
                      i.activeCues.refreshCues.apply(i.activeCues),
                      (i.videoNode._captionator_dirtyBit = !0),
                      o.rebuildCaptions(i.videoNode),
                      i.onload.call(this),
                      t instanceof Function && t.call(i, n);
                  } else (i.readyState = o.TextTrack.ERROR), i.onerror();
              });
            try {
              r.send(null);
            } catch (s) {
              (i.readyState = o.TextTrack.ERROR), i.onerror(s);
            }
          }
        }),
        (this.addCue = function (e) {
          if (!(e && e instanceof o.TextTrackCue))
            throw new Error(
              "The argument is null or not an instance of TextTrackCue."
            );
          this.cues.addCue(e);
        }),
        (this.removeCue = function () {});
    }),
    (o.TextTrack.NONE = 0),
    (o.TextTrack.LOADING = 1),
    (o.TextTrack.LOADED = 2),
    (o.TextTrack.ERROR = 3),
    (o.TextTrack.OFF = 0),
    (o.TextTrack.HIDDEN = 1),
    (o.TextTrack.SHOWING = 2),
    (o.TextTrackCue = function (t, n, r, i, s, u, a) {
      (this.id = t),
        (this.track = a instanceof o.TextTrack ? a : null),
        (this.startTime = parseFloat(n)),
        (this.endTime =
          parseFloat(r) >= this.startTime ? parseFloat(r) : this.startTime),
        (this.text =
          typeof i == "string" || i instanceof o.CaptionatorCueStructure
            ? i
            : ""),
        (this.settings = typeof s == "string" ? s : ""),
        (this.intSettings = {}),
        (this.pauseOnExit = !!u),
        (this.wasActive = !1),
        (this.direction = "horizontal"),
        (this.snapToLines = !0),
        (this.linePosition = "auto"),
        (this.textPosition = 50),
        (this.size = 0),
        (this.alignment = "middle");
      if (this.settings.length) {
        var f = this.intSettings,
          l = this;
        (s = s.split(/\s+/).filter(function (e) {
          return e.length > 0;
        })),
          s instanceof Array &&
            s.forEach(function (e) {
              var t = {
                D: "direction",
                L: "linePosition",
                T: "textPosition",
                A: "alignment",
                S: "size",
              };
              (e = e.split(":")),
                t[e[0]] && (f[t[e[0]]] = e[1]),
                t[e[0]] in l && (l[t[e[0]]] = e[1]);
            });
      }
      this.linePosition.match(/\%/) && (this.snapToLines = !1),
        (this.getCueAsSource = function () {
          return String(this.text);
        }),
        (this.getCueAsHTML = function () {
          var t = document.createDocumentFragment(),
            n = document.createElement("div");
          return (
            (n.innerHTML = String(this.text)),
            Array.prototype.forEach.call(n.childNodes, function (e) {
              t.appendChild(e.cloneNode(!0));
            }),
            t
          );
        }),
        (this.isActive = function () {
          var e = 0;
          if (
            this.track instanceof o.TextTrack &&
            (this.track.mode === o.TextTrack.SHOWING ||
              this.track.mode === o.TextTrack.HIDDEN) &&
            this.track.readyState === o.TextTrack.LOADED
          )
            try {
              e = this.track.videoNode.currentTime;
              if (this.startTime <= e && this.endTime >= e)
                return (
                  this.wasActive || ((this.wasActive = !0), this.onenter()), !0
                );
            } catch (t) {
              return !1;
            }
          return this.wasActive && ((this.wasActive = !1), this.onexit()), !1;
        }),
        Object.prototype.__defineGetter__
          ? this.__defineGetter__("active", this.isActive)
          : Object.defineProperty &&
            Object.defineProperty(this, "active", { get: this.isActive }),
        (this.toString = function c() {
          return "TextTrackCue:" + this.id + "\n" + String(this.text);
        }),
        (this.onenter = function () {}),
        (this.onexit = function () {});
    }),
    (o.TextTrackCueList = function (t) {
      (this.track = t instanceof o.TextTrack ? t : null),
        (this.getCueById = function (e) {
          return this.filter(function (t) {
            return t.id === e;
          })[0];
        }),
        (this.loadCues = function (e) {
          for (var t = 0; t < e.length; t++)
            (e[t].track = this.track), Array.prototype.push.call(this, e[t]);
        }),
        (this.addCue = function (e) {
          if (!(e && e instanceof o.TextTrackCue))
            throw new Error(
              "The argument is null or not an instance of TextTrackCue."
            );
          if (e.track !== this.track && !!e.track)
            throw new Error("This cue is associated with a different track!");
          Array.prototype.push.call(this, e);
        }),
        (this.toString = function () {
          return "[TextTrackCueList]";
        });
    }),
    (o.TextTrackCueList.prototype = []),
    (o.ActiveTextTrackCueList = function (t, n) {
      (this.refreshCues = function () {
        if (t.length) {
          var e = this,
            r = !1,
            i = [].slice.call(this, 0);
          (this.length = 0),
            t.forEach(function (t) {
              t.active &&
                (e.push(t), e[e.length - 1] !== i[e.length - 1] && (r = !0));
            });
          if (r)
            try {
              n.oncuechange();
            } catch (s) {}
        }
      }),
        (this.toString = function () {
          return "[ActiveTextTrackCueList]";
        }),
        this.refreshCues();
    }),
    (o.ActiveTextTrackCueList.prototype = new o.TextTrackCueList(null));
  var u = function (e) {
    (this.targetObject = e), (this.currentTime = 0);
    var t = function () {};
    (this.addEventListener = function (e, t, n) {
      e === "timeupdate" &&
        t instanceof Function &&
        (this.timeupdateEventHandler = t);
    }),
      (this.attachEvent = function (e, t) {
        e === "timeupdate" &&
          t instanceof Function &&
          (this.timeupdateEventHandler = t);
      }),
      (this.updateTime = function (e) {
        isNaN(e) || ((this.currentTime = e), t());
      });
  };
  (o.rebuildCaptions = function (e) {
    var t = e.textTracks || [],
      n = e._captionatorOptions instanceof Object ? e._captionatorOptions : {},
      r = e.currentTime,
      i = [],
      s = !1,
      u = [],
      a = [];
    t.forEach(function (e, t) {
      e.mode === o.TextTrack.SHOWING &&
        e.readyState === o.TextTrack.LOADED &&
        ((a = [].slice.call(e.activeCues, 0)),
        (a = a.sort(function (e, t) {
          return e.startTime > t.startTime ? -1 : 1;
        })),
        (i = i.concat(a)));
    }),
      (u = i.map(function (e) {
        return e.track.id + "." + e.id + ":" + e.text.toString(r).length;
      })),
      (s = !o.compareArray(u, e._captionator_previousActiveCues));
    if (s || e._captionator_dirtyBit) {
      (e._captionator_dirtyBit = !1),
        (e._captionator_availableCueArea = null),
        (e._captionator_previousActiveCues = u),
        o.styleCueCanvas(e);
      var f = [].slice
        .call(e._descriptionContainerObject.getElementsByTagName("div"), 0)
        .concat(
          [].slice.call(e._containerObject.getElementsByTagName("div"), 0)
        );
      f.forEach(function (e) {
        e.cueObject &&
          !e.cueObject.active &&
          ((e.cueObject.rendered = !1),
          (e.cueObject.domNode = null),
          e.parentElement.removeChild(e));
      }),
        i.forEach(function (t) {
          var n, i;
          t.track.kind !== "metadata" &&
            t.mode !== o.TextTrack.HIDDEN &&
            (t.rendered
              ? ((n = t.domNode),
                (i = n.getElementsByClassName("captionator-cue-inner")[0]),
                t.text.toString(r) !== n.currentText &&
                  ((n.currentText = t.text.toString(r)),
                  (i.innerHTML = n.currentText),
                  (i.spanified = !1)))
              : ((n = document.createElement("div")),
                (i = document.createElement("span")),
                (i.className = "captionator-cue-inner"),
                (n.id = String(t.id).length ? t.id : o.generateID()),
                (n.className = "captionator-cue"),
                n.appendChild(i),
                (n.cueObject = t),
                (t.domNode = n),
                n.setAttribute("lang", t.track.language),
                (n.currentText = t.text.toString(r)),
                (i.innerHTML = n.currentText),
                (t.rendered = !0),
                t.track.kind === "descriptions"
                  ? e._descriptionContainerObject.appendChild(n)
                  : e._containerObject.appendChild(n)),
            t.track.kind !== "descriptions" && o.styleCue(n, t, e));
        });
    }
  }),
    (o.captionify = function (a, f, l) {
      var c = [],
        h = 0;
      (l = l instanceof Object ? l : {}),
        l.minimumFontSize &&
          typeof l.minimumFontSize == "number" &&
          (e = l.minimumFontSize),
        l.minimumLineHeight &&
          typeof l.minimumLineHeight == "number" &&
          (t = l.minimumLineHeight),
        l.fontSizeVerticalPercentage &&
          typeof l.fontSizeVerticalPercentage == "number" &&
          (n = l.fontSizeVerticalPercentage),
        l.lineHeightRatio &&
          typeof l.lineHeightRatio != "number" &&
          (r = l.lineHeightRatio),
        l.cueBackgroundColour &&
          l.cueBackgroundColour instanceof Array &&
          (i = l.cueBackgroundColour);
      if (!!HTMLVideoElement || a instanceof u || !!l.forceCaptionify) {
        if (
          (typeof document.createElement("video").addTextTrack != "function" &&
            typeof document.createElement("video").addTrack != "function") ||
          !!l.forceCaptionify
        ) {
          !s &&
            l.exportObjects &&
            ((window.TextTrack = o.TextTrack),
            (window.TextTrackCueList = o.TextTrackCueList),
            (window.ActiveTextTrackCueList = o.ActiveTextTrackCueList),
            (window.TextTrackCue = o.TextTrackCue),
            (s = !0));
          if (!a || a === !1 || a === undefined || a === null)
            c = [].slice.call(document.getElementsByTagName("video"), 0);
          else if (a instanceof Array)
            for (h = 0; h < a.length; h++)
              typeof a[h] == "string"
                ? (c = c.concat(
                    [].slice.call(document.querySelectorAll(a[h]), 0)
                  ))
                : a[h].constructor === HTMLVideoElement && c.push(a[h]);
          else
            typeof a == "string"
              ? (c = [].slice.call(document.querySelectorAll(a), 0))
              : a.constructor === HTMLVideoElement && c.push(a);
          return c.length
            ? (c.forEach(function (e) {
                (e.addTextTrack = function (t, n, r, i, s, u, a) {
                  var f = [
                      "subtitles",
                      "captions",
                      "descriptions",
                      "captions",
                      "metadata",
                      "chapters",
                    ],
                    l = f.slice(0, 7),
                    c;
                  (t = typeof t == "string" ? t : ""),
                    (r = typeof r == "string" ? r : ""),
                    (i = typeof i == "string" ? i : ""),
                    (a = typeof a == "boolean" ? a : !1);
                  if (
                    !f.filter(function (e) {
                      return n === e ? !0 : !1;
                    }).length
                  )
                    throw o.createDOMException(
                      12,
                      "DOMException 12: SYNTAX_ERR: You must use a valid kind when creating a TimedTextTrack.",
                      "SYNTAX_ERR"
                    );
                  return (
                    (c = new o.TextTrack(t, n, r, i, s, null)),
                    c
                      ? (e.textTracks instanceof Array || (e.textTracks = []),
                        e.textTracks.push(c),
                        c)
                      : !1
                  );
                }),
                  o.processVideoElement(c[h], f, l);
              }),
              !0)
            : !1;
        }
        return !1;
      }
      return !1;
    }),
    (o.parseCaptions = function (e, t) {
      t = t instanceof Object ? t : {};
      var n = "",
        r = [],
        i = "",
        s = [],
        u =
          /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\,(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,
        a =
          /^(\d+)?:?(\d{2}):(\d{2})\.(\d+)\,(\d+)?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,
        f =
          /^(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s*(.*)/,
        l = /(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)/,
        c = /^([\d\.]+)\s+\+([\d\.]+)\s*(.*)/,
        h = /^\[(\d{2})?:?(\d{2})\:(\d{2})\.(\d{2,3})\]\s*(.*?)$/,
        p = /^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,
        d = /^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,
        v = /^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g,
        m = /<tt\s+xml/gi,
        g = /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)/,
        y = /^([\d\.]+)[smhdwy]/gi;
      if (e) {
        var b = function (n) {
            var r = new o.CaptionatorCueStructure(n, t),
              i = [],
              s,
              u,
              a,
              f = [],
              c = 0,
              h,
              p,
              d,
              v = function (e) {
                return !!e.replace(/[^a-z0-9]+/gi, "").length;
              };
            (i = n.split(/(<\/?[^>]+>)/gi)), (a = r);
            for (s in i)
              if (i.hasOwnProperty(s)) {
                u = i[s];
                if (u.substr(0, 1) === "<") {
                  if (u.substr(1, 1) === "/") {
                    var m = u.substr(2).split(/[\s>]+/g)[0];
                    if (f.length > 0) {
                      var g = 0;
                      for (c = f.length - 1; c >= 0; c--) {
                        var y = f[c][f[c].length - 1];
                        g = c;
                        if (y.token === m) break;
                      }
                      (a = f[g]), (f = f.slice(0, g));
                    }
                  } else if (
                    u.substr(1).match(l) ||
                    u.match(/^<v\s+[^>]+>/i) ||
                    u.match(/^<c[a-z0-9\-\_\.]+>/) ||
                    u.match(/^<(b|i|u|ruby|rt)>/) ||
                    t.sanitiseCueHTML !== !1
                  ) {
                    var b = {
                      token: u.replace(/[<\/>]+/gi, "").split(/[\s\.]+/)[0],
                      rawToken: u,
                      children: [],
                    };
                    b.token === "v"
                      ? (b.voice = u.match(/^<v\s*([^>]+)>/i)[1])
                      : b.token === "c"
                      ? (b.classes = u
                          .replace(/[<\/>\s]+/gi, "")
                          .split(/[\.]+/gi)
                          .slice(1)
                          .filter(v))
                      : !(h = b.rawToken.match(l)) ||
                        ((r.isTimeDependent = !0),
                        (p = h.slice(1)),
                        (b.timeIn =
                          parseInt((p[0] || 0) * 60 * 60, 10) +
                          parseInt((p[1] || 0) * 60, 10) +
                          parseInt(p[2] || 0, 10) +
                          parseFloat("0." + (p[3] || 0)))),
                      a.push(b),
                      f.push(a),
                      (a = b.children);
                  }
                } else
                  t.sanitiseCueHTML !== !1 &&
                    ((u = u
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/\&/g, "&amp;")),
                    t.ignoreWhitespace || (u = u.replace(/\n+/g, "<br />"))),
                    a.push(u);
              }
            return r;
          },
          w = function (r, l) {
            var m,
              g,
              y,
              w,
              E,
              S,
              x = "",
              T,
              N,
              C,
              k;
            if ((N = p.exec(r)))
              return (
                (s = N.slice(2).join("")),
                (s = s.split(/\s+/g).filter(function (e) {
                  return e && !!e.length;
                })),
                null
              );
            if ((N = d.exec(r))) return (i += N[N.length - 1]), null;
            if ((N = v.exec(r))) return null;
            n === "LRC"
              ? (m = [
                  r.substr(0, r.indexOf("]") + 1),
                  r.substr(r.indexOf("]") + 1),
                ])
              : (m = r.split(/\n/g));
            while (!m[0].replace(/\s+/gi, "").length && m.length > 0) m.shift();
            m[0].match(/^\s*[a-z0-9\-]+\s*$/gi)
              ? (T = String(m.shift().replace(/\s*/gi, "")))
              : (T = l);
            for (S = 0; S < m.length; S++) {
              var L = m[S];
              (C = f.exec(L)) || (C = u.exec(L)) || (C = a.exec(L))
                ? ((E = C.slice(1)),
                  (g =
                    parseInt((E[0] || 0) * 60 * 60, 10) +
                    parseInt((E[1] || 0) * 60, 10) +
                    parseInt(E[2] || 0, 10) +
                    parseFloat("0." + (E[3] || 0))),
                  (y =
                    parseInt((E[4] || 0) * 60 * 60, 10) +
                    parseInt((E[5] || 0) * 60, 10) +
                    parseInt(E[6] || 0, 10) +
                    parseFloat("0." + (E[7] || 0))),
                  E[8] && (x = E[8]))
                : (C = c.exec(L))
                ? ((E = C.slice(1)),
                  (g = parseFloat(E[0])),
                  (y = g + parseFloat(E[1])),
                  E[2] && (x = E[2]))
                : !(C = h.exec(L)) ||
                  ((E = C.slice(1, C.length - 1)),
                  (g =
                    parseInt((E[0] || 0) * 60 * 60, 10) +
                    parseInt((E[1] || 0) * 60, 10) +
                    parseInt(E[2] || 0, 10) +
                    parseFloat("0." + (E[3] || 0))),
                  (y = g)),
                (m = m.slice(0, S).concat(m.slice(S + 1)));
              break;
            }
            if (!g && !y) return null;
            var A = s.reduce(function (e, t, n, r) {
              return (e[t.split(":")[0]] = t.split(":")[1]), e;
            }, {});
            (A = x
              .split(/\s+/g)
              .filter(function (e) {
                return e && !!e.length;
              })
              .reduce(function (e, t, n, r) {
                return (e[t.split(":")[0]] = t.split(":")[1]), e;
              }, A)),
              (x = "");
            for (var O in A)
              A.hasOwnProperty(O) &&
                ((x += x.length ? " " : ""), (x += O + ":" + A[O]));
            return (
              (w = t.processCueHTML === !1 ? m.join("\n") : b(m.join("\n"))),
              (k = new o.TextTrackCue(T, g, y, w, x, !1, null)),
              (k.styleData = i),
              k
            );
          },
          E = function (t) {
            var n,
              r = 0;
            if (typeof t != "string") return 0;
            if ((n = g.exec(t)))
              (n = n.slice(1)),
                (r =
                  parseInt((n[0] || 0) * 60 * 60, 10) +
                  parseInt((n[1] || 0) * 60, 10) +
                  parseInt(n[2] || 0, 10) +
                  parseFloat("0." + (n[3] || 0)));
            return r;
          },
          S = function (n, r) {
            var i,
              s,
              u,
              a,
              f = 0,
              l = 0,
              c = String(n.getAttribute("begin")),
              h = String(n.getAttribute("end")),
              p = n.getAttribute("id") || r;
            return (
              (f = E(c)),
              (l = E(h)),
              (u = t.processCueHTML === !1 ? n.innerHTML : b(n.innerHTML)),
              new o.TextTrackCue(p, f, l, u, {}, !1, null)
            );
          };
        r = e.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        if (m.exec(e)) {
          var x = document.createElement("ttml");
          x.innerHTML = e;
          var T = [].slice.call(x.querySelectorAll("[begin],[end]"), 0),
            N = T.map(S);
          return N;
        }
        return (
          e.split(/\n+/g).reduce(function (e, t, n, r) {
            return e || !!h.exec(t);
          }, !1)
            ? ((r = r.split(/\n+/g)), (n = "LRC"))
            : (r = r.split(/\n\n+/g)),
          (r = r
            .filter(function (e) {
              return e.match(/^WEBVTT(\s*FILE)?/gi)
                ? ((n = "WebVTT"), !1)
                : e.replace(/\s*/gi, "").length
                ? !0
                : !1;
            })
            .map(w)
            .filter(function (e) {
              return e !== null ? !0 : !1;
            })),
          n === "LRC" &&
            (r.forEach(function (e, t) {
              var n = 0,
                i;
              t > 0 &&
                ((n = e.startTime),
                (i = r[--t]),
                i.endTime < n && (i.endTime = n));
            }),
            (r = r.filter(function (e) {
              return e.text.toString().replace(/\s*/, "").length > 0 ? !0 : !1;
            }))),
          r
        );
      }
      throw new Error("Required parameter captionData not supplied.");
    }),
    (o.processVideoElement = function (e, t, n) {
      var r = [],
        i = navigator.language || navigator.userLanguage,
        s = t || i.split("-")[0];
      n = n instanceof Object ? n : {};
      if (!e.captioned) {
        (e._captionatorOptions = n),
          (e.className += (e.className.length ? " " : "") + "captioned"),
          (e.captioned = !0),
          e.id.length === 0 && (e.id = o.generateID());
        var u = !1;
        [].slice.call(e.querySelectorAll("track"), 0).forEach(function (i) {
          var s = null;
          i.querySelectorAll("source").length > 0
            ? (s = i.querySelectorAll("source"))
            : (s = i.getAttribute("src"));
          var u = e.addTextTrack(
            i.getAttribute("id") || o.generateID(),
            i.getAttribute("kind"),
            i.getAttribute("label"),
            i.getAttribute("srclang").split("-")[0],
            s,
            i.getAttribute("type"),
            i.hasAttribute("default")
          );
          (i.track = u), (u.trackNode = i), (u.videoNode = e), r.push(u);
          var a = !1;
          (u.kind === "subtitles" || u.kind === "captions") &&
            t === u.language &&
            n.enableCaptionsByDefault &&
            (r.filter(function (e) {
              return (e.kind !== "captions" && e.kind !== "subtitles") ||
                t !== e.language ||
                e.mode !== o.TextTrack.SHOWING
                ? !1
                : !0;
            }).length ||
              (a = !0)),
            u.kind === "chapters" &&
              t === u.language &&
              (r.filter(function (e) {
                return e.kind === "chapters" && e.mode === o.TextTrack.SHOWING
                  ? !0
                  : !1;
              }).length ||
                (a = !0)),
            u.kind === "descriptions" &&
              n.enableDescriptionsByDefault === !0 &&
              t === u.language &&
              (r.filter(function (e) {
                return e.kind === "descriptions" &&
                  e.mode === o.TextTrack.SHOWING
                  ? !0
                  : !1;
              }).length ||
                (a = !0)),
            a === !0 &&
              r.forEach(function (e) {
                e.trackNode.hasAttribute("default") &&
                  e.mode === o.TextTrack.SHOWING &&
                  (e.mode = o.TextTrack.HIDDEN);
              }),
            i.hasAttribute("default") &&
              (r.filter(function (e) {
                return e.trackNode.hasAttribute("default") && e.trackNode !== i
                  ? !0
                  : !1;
              }).length ||
                ((a = !0), (u.internalDefault = !0))),
            a === !0 && (u.mode = o.TextTrack.SHOWING);
        }),
          e.addEventListener(
            "timeupdate",
            function (e) {
              var t = e.target;
              try {
                t.textTracks.forEach(function (e) {
                  e.activeCues.refreshCues.apply(e.activeCues);
                });
              } catch (r) {}
              n.renderer instanceof Function
                ? n.renderer.call(o, t)
                : o.rebuildCaptions(t);
            },
            !1
          ),
          window.addEventListener(
            "resize",
            function (t) {
              (e._captionator_dirtyBit = !0), o.rebuildCaptions(e);
            },
            !1
          ),
          n.enableHighResolution === !0 &&
            window.setInterval(function () {
              try {
                e.textTracks.forEach(function (e) {
                  e.activeCues.refreshCues.apply(e.activeCues);
                });
              } catch (r) {}
              n.renderer instanceof Function
                ? n.renderer.call(o, e)
                : o.rebuildCaptions(e);
            }, 20);
      }
      return e;
    }),
    (o.getNodeMetrics = function (e) {
      var t = window.getComputedStyle(e, null),
        n = e,
        r = e.offsetTop,
        i = e.offsetLeft,
        s = e,
        o = 0,
        u = 0;
      (s = parseInt(t.getPropertyValue("width"), 10)),
        (o = parseInt(t.getPropertyValue("height"), 10));
      while (!!(n = n.offsetParent)) (r += n.offsetTop), (i += n.offsetLeft);
      if (e.hasAttribute("controls")) {
        var a = navigator.userAgent.toLowerCase();
        a.indexOf("chrome") !== -1
          ? (u = 32)
          : a.indexOf("opera") !== -1
          ? (u = 25)
          : a.indexOf("firefox") !== -1
          ? (u = 28)
          : a.indexOf("ie 9") !== -1 || a.indexOf("ipad") !== -1
          ? (u = 44)
          : a.indexOf("safari") !== -1 && (u = 25);
      } else if (e._captionatorOptions) {
        var f = e._captionatorOptions;
        f.controlHeight && (u = parseInt(f.controlHeight, 10));
      }
      return { left: i, top: r, width: s, height: o, controlHeight: u };
    }),
    (o.applyStyles = function (e, t) {
      for (var n in t) ({}.hasOwnProperty.call(t, n) && (e.style[n] = t[n]));
    }),
    (o.checkDirection = function (e) {
      var t = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿",
        n = "֑-߿יִ-﷽ﹰ-ﻼ",
        r = new RegExp("^[^" + n + "]*[" + t + "]"),
        i = new RegExp("^[^" + t + "]*[" + n + "]");
      return i.test(e) ? "rtl" : r.test(e) ? "ltr" : "";
    }),
    (o.styleCue = function (s, u, a) {
      var f = 0,
        l = 0,
        c = 0,
        h = 0,
        p,
        d,
        v = 0,
        m = 0,
        g,
        y,
        b,
        w,
        E,
        S,
        x,
        T,
        N = 0,
        C = 0,
        k = 0,
        L = 0,
        A = 0,
        O = 0,
        M = 0,
        _,
        D,
        P = 0,
        H = a._captionatorOptions || {},
        B,
        j = 100,
        F = 50,
        I = 0,
        q = 0,
        R = !0,
        U = "",
        z,
        W = u.track.language,
        X = function (e) {
          if (e.spanified) return e.characterCount;
          var t = function (e) {
              return !!e.length;
            },
            n = "<span class='captionator-cue-character'>",
            r,
            i,
            s,
            u,
            a = 0,
            f = function (e) {
              a++,
                o.applyStyles(e, {
                  display: "block",
                  lineHeight: "auto",
                  height: y + "px",
                  width: T + "px",
                  textAlign: "center",
                });
            };
          for (r in e.childNodes)
            e.childNodes.hasOwnProperty(r) &&
              !e.childNodes[r].nospan &&
              ((i = e.childNodes[r]),
              i.nodeType === 3
                ? ((u = document.createDocumentFragment()),
                  (s = i.nodeValue),
                  u.appendChild(document.createElement("span")),
                  (u.childNodes[0].innerHTML =
                    n +
                    s
                      .split(/(.)/)
                      .filter(t)
                      .join("</span>" + n) +
                    "</span>"),
                  [].slice
                    .call(
                      u.querySelectorAll("span.captionator-cue-character"),
                      0
                    )
                    .forEach(f),
                  i.parentNode.replaceChild(u, i))
                : e.childNodes[r].nodeType === 1 && (a += X(e.childNodes[r])));
          return (e.characterCount = a), (e.spanified = !0), a;
        };
      (B = o.getNodeMetrics(a)),
        a._captionator_availableCueArea ||
          (a._captionator_availableCueArea = {
            bottom: B.height - B.controlHeight,
            right: B.width,
            top: 0,
            left: 0,
            height: B.height - B.controlHeight,
            width: B.width,
          }),
        u.direction === "horizontal" &&
          (o.applyStyles(s, {
            width: "auto",
            position: "static",
            display: "inline-block",
            padding: "1em",
          }),
          (I = parseInt(s.offsetWidth, 10)),
          (q = Math.floor((I / a._captionator_availableCueArea.width) * 100)),
          (q = q <= 100 ? q : 100)),
        (g = ((B.height * (n / 100)) / 96) * 72),
        (g = g >= e ? g : e),
        (y = Math.floor((g / 72) * 96)),
        (b = Math.floor(g * r)),
        (b = b > t ? b : t),
        (x = Math.ceil((b / 72) * 96)),
        (T = x),
        x * Math.floor(B.height / x) < B.height &&
          ((x = Math.floor(B.height / Math.floor(B.height / x))),
          (b = Math.ceil((x / 96) * 72))),
        x * Math.floor(B.width / x) < B.width &&
          (T = Math.ceil(B.width / Math.floor(B.width / x))),
        (E = Math.floor(a._captionator_availableCueArea.height / x)),
        (S = Math.floor(a._captionator_availableCueArea.width / T)),
        parseFloat(String(u.size).replace(/[^\d\.]/gi, "")) === 0
          ? H.sizeCuesByTextBoundingBox === !0
            ? (p = q)
            : ((p = 100), (R = !1))
          : ((R = !1),
            (p = parseFloat(String(u.size).replace(/[^\d\.]/gi, ""))),
            (p = p <= 100 ? p : 100)),
        (v = u.direction === "horizontal" ? Math.floor(B.width * 0.01) : 0),
        (m = u.direction === "horizontal" ? 0 : Math.floor(B.height * 0.01)),
        u.linePosition === "auto"
          ? (u.linePosition = u.direction === "horizontal" ? E : S)
          : String(u.linePosition).match(/\%/) &&
            ((u.snapToLines = !1),
            (u.linePosition = parseFloat(
              String(u.linePosition).replace(/\%/gi, "")
            )));
      if (u.direction === "horizontal")
        (h = x),
          u.textPosition !== "auto" &&
            R &&
            ((F = parseFloat(String(u.textPosition).replace(/[^\d\.]/gi, ""))),
            p - F > q ? (p -= F) : (p = q)),
          u.snapToLines === !0
            ? (c = a._captionator_availableCueArea.width * (p / 100))
            : (c = B.width * (p / 100)),
          u.textPosition === "auto"
            ? (f =
                (a._captionator_availableCueArea.right - c) / 2 +
                a._captionator_availableCueArea.left)
            : ((F = parseFloat(
                String(u.textPosition).replace(/[^\d\.]/gi, "")
              )),
              (f =
                (a._captionator_availableCueArea.right - c) * (F / 100) +
                a._captionator_availableCueArea.left)),
          u.snapToLines === !0
            ? (l = (E - 1) * x + a._captionator_availableCueArea.top)
            : ((w = B.controlHeight + x + m * 2),
              (l = (B.height - w) * (u.linePosition / 100)));
      else {
        (l = a._captionator_availableCueArea.top),
          (f = a._captionator_availableCueArea.right - T),
          (c = T),
          (h = a._captionator_availableCueArea.height * (p / 100)),
          (C = X(s)),
          (k = [].slice.call(
            s.querySelectorAll("span.captionator-cue-character"),
            0
          )),
          (N = Math.floor((h - m * 2) / y)),
          (c = Math.ceil(C / N) * T),
          (L = Math.ceil(C / N)),
          (A = C - N * (L - 1)),
          (O = A * y);
        if (u.snapToLines === !0)
          f =
            u.direction === "vertical-lr"
              ? a._captionator_availableCueArea.left
              : a._captionator_availableCueArea.right - c;
        else {
          var V = c + v * 2;
          u.direction === "vertical-lr"
            ? (f = (B.width - V) * (u.linePosition / 100))
            : (f = B.width - V - (B.width - V) * (u.linePosition / 100));
        }
        u.textPosition === "auto"
          ? (l =
              (a._captionator_availableCueArea.bottom - h) / 2 +
              a._captionator_availableCueArea.top)
          : ((u.textPosition = parseFloat(
              String(u.textPosition).replace(/[^\d\.]/gi, "")
            )),
            (l =
              (a._captionator_availableCueArea.bottom - h) *
                (u.textPosition / 100) +
              a._captionator_availableCueArea.top)),
          (M = 0),
          (P = 0),
          (_ = 0),
          (D = 0),
          k.forEach(function (e, t) {
            u.direction === "vertical-lr" ? (_ = T * M) : (_ = c - T * (M + 1)),
              u.alignment === "start" || (u.alignment !== "start" && M < L - 1)
                ? (D = P * y + m)
                : u.alignment === "end"
                ? (D = P * y - y + (h + m * 2 - O))
                : u.alignment === "middle" && (D = (h - m * 2 - O) / 2 + P * y),
              e.setAttribute("aria-hidden", "true"),
              o.applyStyles(e, {
                position: "absolute",
                top: D + "px",
                left: _ + "px",
              }),
              P >= N - 1 ? ((P = 0), M++) : P++;
          }),
          s.accessified ||
            ((U = u.text.getPlain(a.currentTime)),
            (z = document.createElement("div")),
            (z.innerHTML = U),
            (z.nospan = !0),
            s.appendChild(z),
            (s.accessified = !0),
            o.applyStyles(z, {
              position: "absolute",
              overflow: "hidden",
              width: "1px",
              height: "1px",
              opacity: "0",
              textIndent: "-999em",
            }));
      }
      u.direction === "horizontal" &&
        (o.checkDirection(String(u.text)) === "rtl"
          ? (d = { start: "right", middle: "center", end: "left" }[u.alignment])
          : (d = { start: "left", middle: "center", end: "right" }[
              u.alignment
            ])),
        o.applyStyles(s, {
          position: "absolute",
          overflow: "hidden",
          width: c + "px",
          height: h + "px",
          top: l + "px",
          left: f + "px",
          padding: m + "px " + v + "px",
          textAlign: d,
          backgroundColor: "rgba(" + i.join(",") + ")",
          direction: o.checkDirection(String(u.text)),
          lineHeight: b + "pt",
          boxSizing: "border-box",
        });
      if (u.direction === "vertical" || u.direction === "vertical-lr")
        f -
          a._captionator_availableCueArea.left -
          a._captionator_availableCueArea.left >=
        a._captionator_availableCueArea.right - (f + c)
          ? (a._captionator_availableCueArea.right = f)
          : (a._captionator_availableCueArea.left = f + c),
          (a._captionator_availableCueArea.width =
            a._captionator_availableCueArea.right -
            a._captionator_availableCueArea.left);
      else {
        if (s.scrollHeight > s.offsetHeight * 1.2)
          if (u.snapToLines) {
            var $ = 0;
            while (s.scrollHeight > s.offsetHeight * 1.2)
              (h += x), (s.style.height = h + "px"), $++;
            (l -= $ * x), (s.style.top = l + "px");
          } else {
            var J = s.scrollHeight - h;
            (h = s.scrollHeight + m),
              (w = B.controlHeight + h + m * 2),
              (l = (B.height - w) * (u.linePosition / 100)),
              (s.style.height = h + "px"),
              (s.style.top = l + "px");
          }
        l -
          a._captionator_availableCueArea.top -
          a._captionator_availableCueArea.top >=
          a._captionator_availableCueArea.bottom - (l + h) &&
        a._captionator_availableCueArea.bottom > l
          ? (a._captionator_availableCueArea.bottom = l)
          : a._captionator_availableCueArea.top < l + h &&
            (a._captionator_availableCueArea.top = l + h),
          (a._captionator_availableCueArea.height =
            a._captionator_availableCueArea.bottom -
            a._captionator_availableCueArea.top);
      }
    }),
    (o.styleCueCanvas = function (i) {
      var s,
        u,
        a,
        f,
        l,
        c,
        h =
          i._captionatorOptions instanceof Object ? i._captionatorOptions : {};
      if (!(i instanceof HTMLVideoElement))
        throw new Error("Cannot style a cue canvas for a non-video node!");
      i._containerObject && ((a = i._containerObject), (l = a.id)),
        i._descriptionContainerObject &&
          ((f = i._descriptionContainerObject), (c = f.id)),
        f
          ? f.parentNode || document.body.appendChild(f)
          : ((f = document.createElement("div")),
            (f.className = "captionator-cue-descriptive-container"),
            (c = o.generateID()),
            (f.id = c),
            (i._descriptionContainerObject = f),
            f.setAttribute("aria-live", "polite"),
            f.setAttribute("aria-atomic", "true"),
            f.setAttribute("role", "region"),
            document.body.appendChild(f),
            o.applyStyles(f, {
              position: "absolute",
              overflow: "hidden",
              width: "1px",
              height: "1px",
              opacity: "0",
              textIndent: "-999em",
            }));
      if (!a) {
        (a = document.createElement("div")),
          (a.className = "captionator-cue-canvas"),
          (l = o.generateID()),
          (a.id = l);
        if (h.appendCueCanvasTo) {
          var p = null;
          if (h.appendCueCanvasTo instanceof HTMLElement)
            p = h.appendCueCanvasTo;
          else if (typeof h.appendCueCanvasTo == "string")
            try {
              var d = document.querySelectorAll(h.appendCueCanvasTo);
              if (!(d.length > 0)) throw null;
              p = d[0];
            } catch (v) {
              (p = document.body), (h.appendCueCanvasTo = !1);
            }
          else (p = document.body), (h.appendCueCanvasTo = !1);
          p.appendChild(a);
        } else document.body.appendChild(a);
        i._containerObject = a;
      } else a.parentNode || document.body.appendChild(a);
      var m = o.getNodeMetrics(i);
      (s = ((m.height * (n / 100)) / 96) * 72),
        (s = s >= e ? s : e),
        (u = Math.floor(s * r)),
        (u = u > t ? u : t),
        o.applyStyles(a, {
          position: "absolute",
          overflow: "hidden",
          zIndex: 100,
          height: m.height - m.controlHeight + "px",
          width: m.width + "px",
          top: (h.appendCueCanvasTo ? 0 : m.top) + "px",
          left: (h.appendCueCanvasTo ? 0 : m.left) + "px",
          color: "white",
          fontFamily: "Verdana, Helvetica, Arial, sans-serif",
          fontSize: s + "pt",
          lineHeight: u + "pt",
          boxSizing: "border-box",
        });
    }),
    (o.createDOMException = function (e, t, n) {
      try {
        document.querySelectorAll("div/[]");
      } catch (r) {
        var i = function (t, n, r) {
          (this.code = t), (this.message = n), (this.name = r);
        };
        return (i.prototype = r), new i(e, t, n);
      }
    }),
    (o.compareArray = function (t, n) {
      if (t instanceof Array && n instanceof Array) {
        if (t.length !== n.length) return !1;
        for (var r in t) if (t.hasOwnProperty(r) && t[r] !== n[r]) return !1;
        return !0;
      }
      return !1;
    }),
    (o.generateID = function (e) {
      var t = "";
      e = e ? e : 10;
      while (t.length < e)
        t += String.fromCharCode(65 + Math.floor(Math.random() * 26));
      return "captionator" + t;
    });
})();
