let canvas = document.querySelector('#canvasId'),
  ctx = canvas.getContext("2d"),
  ellipsW, ellipsH, h;
const ellipseSize = 4,
  r = 10,
  mainColor = `hsla(193, 95%, 68%, 1)`;

const resize = () => {
  canvas.setAttribute('width', document.documentElement.clientWidth);
  canvas.setAttribute('height', document.documentElement.clientHeight);
  ellipsW = Math.min(canvas.width, canvas.height) / ellipseSize;
  ellipsH = 0.4 * ellipsW;
  h = 0.2 * ellipsW;
};

resize();
window.addEventListener('resize', resize);
ctx.fillStyle = 'hsla(0, 0%, 0%, 1)';

ctx.fillStyle = mainColor;
ctx.shadowColor = mainColor;
ctx.shadowBlur = 15;

const draw = () => {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.arc(canvas.width / 2, canvas.height / 2, h, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  for (let i = 0; i < 2 * Math.PI; i += 0.15) {
    ctx.beginPath();
    ctx.fillStyle = `hsla(${Math.random() * 40 + 193}, 95%, 68%, 1)`;
    //oblique
    const x0 = ellipsW * Math.sin(i);
    const y0 = ellipsH * Math.cos(i);
    const x1 = x0 * Math.cos(Math.PI / 3) - y0 * Math.sin(Math.PI / 3) + canvas.width / 2;
    const y1 = x0 * Math.sin(Math.PI / 3) + y0 * Math.cos(Math.PI / 3) + canvas.height / 2;
    const x2 = x0 * Math.cos(2 * Math.PI / 3) - y0 * Math.sin(2 * Math.PI / 3) + canvas.width / 2;
    const y2 = x0 * Math.sin(2 * Math.PI / 3) + y0 * Math.cos(2 * Math.PI / 3) + canvas.height / 2;
    ctx.arc(x1, y1, r, 0, Math.PI * 2);
    ctx.arc(x2, y2, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x0 + canvas.width / 2, y0 + canvas.height / 2, r, 0, Math.PI * 2)
    ctx.fill();
  }
};

+function run() {
  window.requestAnimationFrame(run);
  draw();
}()