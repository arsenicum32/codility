'use strict';

var el = document.getElementById('r'),
    img = document.getElementById('i');
function r(ar) {
  return ar[Math.floor(Math.random() * ar.length)];
}
var ar = ['one', 'two', 'three', 'four', 'five'];
el.text = r(['круть', 'супир', 'поняль', 'оки-доки', 'дальше', 'гуд']);

el.addEventListener('click', function (_) {
  if (ar.length) {
    i.src = 'http://placehold.it/250x250?text=' + ar.splice(0, 1);
    i.onload = function () {
      return el.disabled = false;
    };
    el.disabled = true;
  } else {
    alert('next');
  }
});