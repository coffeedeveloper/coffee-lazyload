(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('Lazyload', ['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Lazyload = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
      var arg = arguments[i];
      for (var p in arg) {
        target[p] = arg[p];
      }
    }

    return target;
  }

  var each = function each(arr, cb) {
    var len = arr.length;

    for (var i = 0; i < len; i++) {
      var r = cb(arr[i], i);
      if (r === false) break;
    }
  };

  var scroll = function scroll(e) {
    var top = document.body.scrollTop;
    load(prior(winHeight + top));
  };

  var bindScroll = function bindScroll() {
    return document.addEventListener('scroll', scroll, false);
  };

  var unbindScroll = function unbindScroll() {
    return document.removeEventListener('scroll', scroll, false);
  };

  var prior = function prior(top) {
    return counter.filter(function (d) {
      return d.isLoad == false && d.top <= top;
    });
  };

  var load = function load(arr) {
    each(arr, function (d) {
      d.el.src = d.el.dataset[opts.attr];
      counter[d.index].isLoad = true;
      counter.count--;

      if (opts.recalculate) d.el.addEventListener('load', recalculate, false);

      if (counter.count <= 0) unbindScroll();
    });
  };

  var autoLoad = function autoLoad() {
    setTimeout(function () {
      load(prior(winHeight * ++times));

      if (counter.count) autoLoad();
    }, opts.delay);
  };

  var recalculate = function recalculate() {
    calculate(counter.filter(function (d) {
      return d.isLoad == false;
    }).map(function (d) {
      return d.el;
    }));
  };

  var calculate = function calculate(eles) {
    counter = [];
    counter.count = 0;

    each(eles, function (el, i) {
      var rect = el.getBoundingClientRect();

      counter[i] = {
        el: el,
        top: rect.top + document.body.scrollTop,
        //left: rect.left + document.body.scrollLeft,
        isLoad: false,
        index: i
      };

      counter.count++;
    });
  };

  var defaults = {
    el: '[data-origin]',
    attr: 'origin',
    autoLoad: true,
    delay: 2000,
    recalculate: false
  };

  var opts = {};
  var eles = null;
  var counter = [];
  counter.count = 0;
  var times = 0;
  var winHeight = window.innerHeight || document.documentElement.clientHeight;

  var init = function init(options) {
    opts = extend({}, defaults, options);

    eles = document.querySelectorAll(opts.el);

    if (eles.length) {
      calculate(eles);

      load(prior(winHeight));

      if (opts.autoLoad) autoLoad();

      bindScroll();
    }
  };

  exports.init = init;
});
