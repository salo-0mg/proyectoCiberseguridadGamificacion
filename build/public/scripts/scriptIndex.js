"use strict";

var title = document.querySelector('.title');
var leaf1 = document.querySelector('.leaf1');
var leaf2 = document.querySelector('.leaf2');
var bush2 = document.querySelector('.bush2');
var mount1 = document.querySelector('.mount1');
var mount2 = document.querySelector('.mount2');
document.addEventListener('scroll', function () {
  var value = window.scrollY;
  title.style.marginTop = value * 1.1 + 'px';
  leaf1.style.marginLeft = -value + 'px';
  leaf2.style.marginLeft = value + 'px';
  bush2.style.marginBottom = -value + 'px';
  mount1.style.marginBottom = -value * 1.1 + 'px';
  mount2.style.marginBottom = -value * 1.2 + 'px';
});