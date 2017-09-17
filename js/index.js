'use strict';

var el = document.getElementById('r'),
    img = document.getElementById('i');
function r(ar) {
  return ar[Math.floor(Math.random() * ar.length)];
}
var ar = [ '27', '28', '29', '30'];

el.addEventListener('click', function () {
  if (ar.length) {
    i.src = '/img/' + ar.splice(0, 1)+'.png';
    i.onload = function () {
      return el.disabled = false;
    };
    el.disabled = true;
    el.text = r(['круть', 'супир', 'поняль', 'оки-доки', 'дальше', 'гуд']);
  } else {
    window.location.href = '/public'
  }
});
