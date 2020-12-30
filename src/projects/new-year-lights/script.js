let canvas = document.querySelector('#canvasId');
let context = canvas.getContext("2d");

const resize = () => {
  canvas.setAttribute('width', document.documentElement.clientWidth);
  canvas.setAttribute('height', document.documentElement.clientHeight);
};

resize();
window.addEventListener('resize', resize);
context.fillStyle = 'hsla(0, 0%, 0%, 1)';

let t = 0;
const draw = () => {
  context.fillStyle = '#222';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 200; i++) {
    let x = i * Math.cos(i * t) + canvas.width / 2;
    let y = i * Math.sin(i * t) + canvas.height / 2;
    context.fillStyle = `hsla(${Math.floor(Math.random() * 360)}, 100%, 60%, 1)`;
    context.beginPath();
    context.arc(x, y, 3, 0, Math.PI * 2);
    context.fill();
  }
  t += 0.002;
};

document.addEventListener('click', () => {
  +function run(){
    window.requestAnimationFrame(run);
    draw();
  }()
});
