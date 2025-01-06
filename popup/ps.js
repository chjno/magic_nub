var l = document.getElementById('l');
var m = document.getElementById('m');
var r = document.getElementById('r');
var ps = document.getElementById('ps');
var nubbing = false;
var scrolling = false;
var mx;
var my;

$(window).resize(function () {
  window.resizeTo(300, 322);
});

function mousing(e) {
  var x = e.clientX;
  var y = e.clientY;
  var dx = x - mx;
  var dy = y - my;

  if (nubbing) {
    chrome.runtime.sendMessage({ type: 'mouse', dx: dx, dy: dy });
  } else if (scrolling) {
    chrome.runtime.sendMessage({ type: 'scroll', dx: dx, dy: dy });
  }
}

$('.hold').mousedown(plock);
$(window).mousemove(mousing);
$(window).mouseup(unlock);
$('.click').click(clicked);

function clicked(e) {
  var divId = e.target.id;
  chrome.runtime.sendMessage({ type: 'click', button: divId });
}

function plock(e) {
  var divId = e.target.id;
  if (divId == 'ps') {
    nubbing = true;
    mx = e.clientX;
    my = e.clientY;
  } else if (divId == 'm') {
    scrolling = true;
    mx = e.clientX;
    my = e.clientY;
  }
}

function unlock(e) {
  chrome.runtime.sendMessage({ type: 'unlock' });
  var divId = e.target.id;
  nubbing = false;
  scrolling = false;
}
