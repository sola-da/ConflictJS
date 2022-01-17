/*
 * Allofthelights.js
 * Version: 2.0
 * Description: jQuery plugin to turn off the light and enjoy your videos !
 * Licence: MIT
 * Infos: http://www.megaptery.com/allofthelights/
 * Author: Pierre VION - http://www.pierrevion.fr/
 */
(function (e) {
  e.fn.allofthelights = function (t) {
    function f() {
      var n = [];
      var s = [];
      var o = 1;
      var u = true;
      n.push(0);
      n.push(e(document).width());
      s.push(0);
      s.push(e(document).height());
      for (var a = 0; a < i.length; ++a) {
        var f = i[a];
        var l = f.offset();
        var c = f.height();
        var h = f.width();
        n.push(l.left);
        n.push(l.left + h);
        s.push(l.top);
        s.push(l.top + c);
      }
      n.sort(function (e, t) {
        return e - t;
      });
      s.sort(function (e, t) {
        return e - t;
      });
      for (var a = 0; a < n.length - 1; ++a) {
        for (var p = 0; p < s.length - 1; ++p) {
          var d = n[a];
          var v = s[p];
          var m = n[a + 1];
          var g = s[p + 1];
          var y = true;
          for (var b = 0; b < i.length; ++b) {
            var f = i[b];
            var l = f.offset();
            var c = f.height();
            var h = f.width();
            var w = l.left;
            var E = l.top;
            var S = l.left + h;
            var x = l.top + c;
            if (d >= w && v >= E && m <= S && g <= x) {
              y = false;
              break;
            }
          }
          if (y) {
            if (!e("#allofthelights_bg" + o).length > 0) {
              var T =
                "<div id='allofthelights_bg" +
                o +
                "' class='allofthelights_bg'></div>";
              r.append(T);
            }
            e("#allofthelights_bg" + o).css({
              top: v,
              left: d,
              right: "0",
              height: g - v,
              width: m - d,
            });
            o++;
          }
        }
      }
      if (!e("div.allofthelights_bg").is(":visible")) {
        e(".allofthelights_bg").fadeIn(+t.delay_turn_off, function () {
          if (u && e.isFunction(t.callback_turn_off)) {
            t.callback_turn_off.call(this);
            u = false;
          }
        });
      }
    }
    var n = {
      color: "black",
      opacity: "0.9",
      z_index: "10",
      switch_selector: "switch",
      delay_turn_on: 400,
      delay_turn_off: 400,
      scrolling: true,
      is_responsive: true,
      custom_player: null,
    };
    var t = e.extend(n, t);
    var r = e("body");
    var i = [];
    var s = "#" + t.switch_selector + ", ." + t.switch_selector;
    this.each(function () {
      var t = e(this);
      i.push(t);
    });
    if (t.is_responsive) {
      var o = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.dailymotion.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed",
      ];
      if (t.custom_player) {
        o.push(t.custom_player);
      }
      var u = e(this).parent().find(o.join(","));
      var a =
        '<style type="text/css">.fluid_width_video_wrapper{width:100%;position:relative;padding:0;}.fluid_width_video_wrapper iframe,.fluid_width_video_wrapper object,.fluid_width_video_wrapper embed{position:absolute;top:0;left:0;width:100%;height:100%;}</style>';
      r.append(a);
      u.each(function () {
        var t = e(this);
        if (
          (this.tagName.toLowerCase() == "embed" &&
            t.parent("object").length) ||
          t.parent(".fluid_width_video_wrapper").length
        ) {
          return;
        }
        var n =
            this.tagName.toLowerCase() == "object" || t.attr("height")
              ? t.attr("height")
              : t.height(),
          r = t.attr("width") ? t.attr("width") : t.width(),
          i = n / r;
        if (!t.attr("id")) {
          var s = "fitvid" + Math.floor(Math.random() * 999999);
          t.attr("id", s);
        }
        t.wrap('<div class="fluid_width_video_wrapper"></div>')
          .parent(".fluid_width_video_wrapper")
          .css("padding-top", i * 100 + "%");
        t.removeAttr("height").removeAttr("width");
      });
    }
    var a =
      '<style type="text/css">.allofthelights_bg{position:absolute;display:none;background:' +
      t.color +
      ";opacity:" +
      t.opacity +
      ";z-index:" +
      t.z_index +
      ";}</style>";
    r.append(a);
    r.on("click", ".allofthelights_bg", function () {
      var n = true;
      e(".allofthelights_bg").fadeOut(+t.delay_turn_on, function () {
        if (!t.scrolling) {
          r.css("overflow", "auto");
        }
        if (n && e.isFunction(t.callback_turn_on)) {
          t.callback_turn_on.call(this);
          n = false;
        }
      });
    }).on("click", s, function () {
      if (!t.scrolling) {
        r.css("overflow", "hidden");
      }
      f();
    });
    e(window).on("resize", function () {
      if (e("div.allofthelights_bg").is(":visible")) {
        e("div.allofthelights_bg").remove();
        f();
      }
    });
  };
})(jQuery);
