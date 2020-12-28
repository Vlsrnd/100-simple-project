'use strict';

const body = document.querySelector('body');
const elements = document.querySelectorAll('.elem');


let twistCoefficient = 0;
const twistStep = 0.2;

const x = [body.clientWidth / 2 - 200, body.clientWidth / 2 + 200];
const y = [body.clientHeight / 2 - 100, body.clientHeight / 2 + 100];

elements[0].style.left = x[0] + 'px';
elements[0].style.top = y[0] + 'px';
elements[1].style.left = x[1] + 'px';
elements[1].style.top = y[0] + 'px';
elements[2].style.left = x[0] + 'px';
elements[2].style.top = y[1] + 'px';
elements[3].style.left = x[1] + 'px';
elements[3].style.top = y[1] + 'px';

const limit = (value, min, max) => Math.max(min, Math.min(max, value));

const rotate = (event) => {
  twistCoefficient = event.deltaY > 0 ? twistCoefficient + twistStep : twistCoefficient - twistStep;
  const sin = Math.sin(twistCoefficient);

  elements.forEach(element => {
    element.style.width = `${50 + 250 * sin}px`;
    element.style.borderRadius = `${20 + sin * 60}% ${20 + sin * 60}%`;
    element.style.transform = `rotate(${sin * 360}deg) scale(${1 + sin / 2})`;
  })
}

document.addEventListener('wheel', rotate)