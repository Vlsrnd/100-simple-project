let canvas = document.querySelector('#canvasId');
let context = canvas.getContext("2d");

const resize = () => {
  canvas.setAttribute('width', document.documentElement.clientWidth);
  canvas.setAttribute('height', document.documentElement.clientHeight);
};

resize();
window.addEventListener('resize', resize);
context.fillStyle = 'hsla(0, 0%, 0%, 1)';

//main settings
const ellipsW = canvas.width / 4;
const ellipsH = 0.4 * ellipsW;
const h = 0.2 * ellipsW;
const r = 10;
const mainColor = `hsla(193, 95%, 68%, 1)`;

const maxShadowOffset = 10;
context.fillStyle = mainColor;
context.shadowColor = mainColor;
context.shadowBlur = 5;
context.shadowOffsetX = 0;
context.shadowOffsetY = 0;

const moveShadow = (e) => {
  const deltaX = Math.floor(e.clientX / canvas.width * (2 * maxShadowOffset + 1)) -
    maxShadowOffset;
  const deltaY = Math.floor(e.clientY / canvas.height * (2 * maxShadowOffset + 1)) -
    maxShadowOffset;
  context.shadowOffsetX = -deltaX;
  context.shadowOffsetY = -deltaY;
};
document.addEventListener('mousemove', moveShadow);

const draw = () => {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.arc(canvas.width / 2, canvas.height / 2, h, 0, Math.PI * 2);
  context.fill();
  context.closePath();
  for (let i = 0; i < 2 * Math.PI; i += 0.05) {
    context.beginPath();
    context.fillStyle = `hsla(${Math.random() * 40 + 193}, 95%, 68%, 1)`;
    //oblique
    const x0 = ellipsW * Math.sin(i);
    const y0 = ellipsH * Math.cos(i);
    const x1 = x0 * Math.cos(Math.PI / 3) - y0 * Math.sin(Math.PI / 3) + canvas.width / 2;
    const y1 = x0 * Math.sin(Math.PI / 3) + y0 * Math.cos(Math.PI / 3) + canvas.height / 2;
    const x2 = x0 * Math.cos(2 * Math.PI / 3) - y0 * Math.sin(2 * Math.PI / 3) + canvas.width / 2;
    const y2 = x0 * Math.sin(2 * Math.PI / 3) + y0 * Math.cos(2 * Math.PI / 3) + canvas.height / 2;
    context.arc(x1, y1, r, 0, Math.PI * 2);
    context.arc(x2, y2, r, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(x0 + canvas.width / 2, y0 + canvas.height / 2, r, 0, Math.PI * 2)
    context.fill();
  }
};

+function run() {
  window.requestAnimationFrame(run);
  draw();
}()