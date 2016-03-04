/*helper*/
function extend(target) {
  for (let i = 1; i < arguments.length; i++) {
    let arg = arguments[i];
    for (let p in arg) {
      target[p] = arg[p];
    }
  }

  return target;
}

const each = (arr, cb) => {
  let len = arr.length;
  let r = [];

  for (let i = 0; i < len; i++) r.push(cb(arr[i], i));

  return r;
};

const getElData = (el, d) => {
  if (el.dataset) return el.dataset[d];
  return el.getAttribute(d);
}

const getEles = sel => {
  let eles = document.querySelectorAll(sel);
  let arr = [];

  each(eles, el => el.src != getElData(el, opts.attr) && arr.push(el));

  return arr;
};

/*events*/
const scroll = (e) => {
  let top = document.body.scrollTop;
  load(prior(winHeight + top + opts.threshold));
};

const bindScroll = () => document.addEventListener('scroll', scroll, false);

const unbindScroll = () => document.removeEventListener('scroll', scroll, false);

const prior = top => counter.filter(d => d.isLoad == false && d.top <= top);

const load = arr => {
  each(arr, d => {
    d.el.src = getElData(d.el, opts.attr);
    counter[d.index].isLoad = true;
    counter.count--;

    if (opts.recalculate) d.el.addEventListener('load', recalculate, false);

    if (counter.count <= 0) {
      state.hasScroll = false;
      unbindScroll();
    }
  });
};

const autoLoad = () => {
  setTimeout(() => {
    load(prior(winHeight * ++times));

    if (counter.count) autoLoad();
  }, opts.delay);
};

const recalculate = () => {
  calculate(counter.filter(d => d.isLoad == false).map(d => d.el));
};

const calculate = (eles) => {
  counter = [];
  counter.count = 0;

  each(eles, (el, i) => {
    let rect = el.getBoundingClientRect();

    counter[i] = {
      el: el,
      top: rect.top + document.body.scrollTop,
      //left: rect.left + document.body.scrollLeft,
      isLoad: false,
      index: i,
    };

    counter.count++;
  });
}

let opts = {};
let eles = null;
let counter = [];
counter.count = 0;
let times = 0;
let winHeight = window.innerHeight || document.documentElement.clientHeight;
let state = {
  hasScroll: true
};

let defaults = {
  el: '[data-origin]',
  attr: 'origin',
  autoload: true,
  delay: 2000,
  threshold: winHeight,
  recalculate: false,
  load: function() {}
};


const init = (options) => {
  opts = extend({}, defaults, options);

  eles = getEles(opts.el);

  if (eles.length) {
    calculate(eles);

    load(prior(winHeight));

    if (opts.autoLoad) autoLoad();

    bindScroll();
  }
};

const refresh = (el) => {
  eles = getEles(el || opts.el);

  if (eles.length) {
    calculate(eles);

    if (!state.hasScroll) {
      if (opts.autoLoad) autoLoad();
      bindScroll();
    }
  }
};

export {
  init,
  refresh
};
