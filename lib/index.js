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

  for (let i = 0; i < len; i++) {
    let r = cb(arr[i], i);
    if (r === false) break;
  }
};

const scroll = (e) => {
  let top = document.body.scrollTop;
  load(prior(top));
};

const bindScroll = () => document.addEventListener('scroll', scroll, false);

const unbindScroll = () => document.removeEventListener('scroll', scroll, false);

const prior = top => counter.filter(d => d.isLoad == false && d.top <= top);

const load = arr => {
  each(arr, d => {
    d.el.src = d.el.dataset[opts.attr];
    counter[d.index].isLoad = true;
    counter.count--;

    if (counter.count <= 0) unbindScroll();
  });
};

const autoLoad = () => {
  setTimeout(() => {
    load(prior(window.innerHeight * ++times));

    if (counter.count) autoLoad();
  }, opts.delay);
};

let defaults = {
  el: '[data-origin]',
  attr: 'origin',
  autoLoad: true,
  delay: 2000,
};

let opts = {};
let eles = null;
let counter = [];
counter.count = 0;
let times = 0;

const init = (options) => {
  opts = extend({}, defaults, options);

  eles = document.querySelectorAll(opts.el);

  if (eles.length) {
    each(eles, (el, i) => {
      let rect = el.getBoundingClientRect();

      counter[i] = {
        el: el,
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft,
        isLoad: false,
        index: i,
      };

      counter.count++;
    });

    load(prior(window.innerHeight));

    if (opts.autoLoad) autoLoad();

    bindScroll();
  }
};

export {
  init,
};
