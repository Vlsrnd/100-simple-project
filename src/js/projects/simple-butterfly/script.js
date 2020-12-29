'use strict';

const butterfly = document.querySelector('.butterfly');
const leftWing = document.querySelector('.butterfly__wing-left');
const rightWing = document.querySelector('.butterfly__wing-right');
const maxWingWidth = 70;
let twistCoefficient = 0;

document.addEventListener('mousemove', e => {
  twistCoefficient = e.clientY / e.clientX * 50;
  
  const cos = Math.cos(twistCoefficient);
  leftWing.style.width = rightWing.style.width = `${Math.floor(maxWingWidth * cos)}px`;
  leftWing.style.left = butterfly.clientWidth / 2 - leftWing.clientWidth - 5 + 'px'

  butterfly.style.top = e.clientY - butterfly.clientHeight / 2 + 'px';
  butterfly.style.left = e.clientX - butterfly.clientWidth / 2 + 'px';
})
