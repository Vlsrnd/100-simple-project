'use strict';
const root = document.querySelector('#root');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
const imgW = 200;
const imgH = 200;
canvas.setAttribute('width', imgW);
canvas.setAttribute('height', imgH);
root.append(canvas);

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = random(0, imgW);
    this.y = random(0, imgH);
    this.directionAngle = random(0, 359);
    this.speed = random(1, 5);
  }
  addToCanvas = (color, radius, canvasContext) => {
    canvasContext.fillStyle = color;
    canvasContext.arc(this.x, this.y, radius, 0, 2 * Math.PI);
  }
  step = () => {

    const angleInRadian = this.directionAngle * Math.PI / 180;
    this.x += this.speed * Math.cos(angleInRadian);
    this.y -= this.speed * Math.sin(angleInRadian);
    if (this.x >= this.canvas.width || this.x <= 0) this.directionAngle = 180 - this.directionAngle;
    if (this.y >= this.canvas.height || this.y <= 0) this.directionAngle = 360 - this.directionAngle;
  }
};

const particles = [];
//create particles
for (let i = 0; i < 1; i++) {
  particles.push(new Particle(canvas));
}

const tik = () => {
  ctx.fillStyle = ('rgba(255,255,255,.2');
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()
  particles.forEach(particle => {
    particle.addToCanvas('red', 3, ctx);
    particle.step();
    ctx.closePath();
  })
  ctx.fill();
  requestAnimationFrame(tik);
};

window.requestAnimationFrame(tik);
