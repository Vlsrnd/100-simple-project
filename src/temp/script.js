const box = document.querySelector('.box');
let startCoord = [null, null];
let angleX = 0;
let angleY = 0;

const changeAngle = (e) => {
  angleX -= startCoord[0] - e.clientX;
  angleY += startCoord[1] - e.clientY;
  startCoord[0] = e.clientX;
  startCoord[1] = e.clientY;
};

const rotateBox = (e) => {
  e.preventDefault();
  changeAngle(e);
  box.style.transform = `rotate3d(1, 0, 0, ${angleY}deg)` +
    `rotate3d(0, 1, 0, ${angleX}deg)`;
}

document.addEventListener('mousedown', (e) => {
  startCoord = [e.clientX, e.clientY];
  document.addEventListener('mousemove', rotateBox);
})
document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', rotateBox);
})
