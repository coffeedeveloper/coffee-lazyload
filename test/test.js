Lazyload.init({
  autoLoad: false,
  recalculate: true
});

setTimeout(function() {
  document.querySelector('#xxoo').innerHTML = document.querySelector('.j-tmpl').innerHTML
  Lazyload.refresh();
}, 5000);
