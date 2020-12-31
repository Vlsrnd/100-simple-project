let canvas = document.querySelector('#canvasId');
let context = canvas.getContext("2d");

const resize = () => {
  canvas.setAttribute('width', document.documentElement.clientWidth);
  canvas.setAttribute('height', document.documentElement.clientHeight);
};

resize();
window.addEventListener('resize', resize);
context.fillStyle = 'hsla(0, 0%, 0%, 1)';


const ellipsW = 100;
const ellipsH = 0.4 * ellipsW;
const hMax = 0.3 * ellipsW;
const r = 3;

let t = 0;
let h = 0;
let hUp = true;

const draw = () => {
  context.fillStyle = '#222';
  for (let i = 0; i < 6 * Math.PI; i += 0.05) {
    context.fillStyle = `hsla(${Math.sin(Math.random()) * 50 +200}, 100%, 50%, 1)`;
    //center
    const xCenter = h * Math.sin(i) + canvas.width / 2;
    const yCenter = h * Math.cos(i) + canvas.height / 2;
    h = hUp ? h + 0.05 : h - 0.05;
    hUp = h > hMax ? false : h < 0 ? true : hUp;
    context.beginPath();
    context.arc(xCenter, yCenter, r, 0, Math.PI * 2);
    context.fill();
    //oblique
    const xEl = 1.8 * ellipsH * Math.sin(i)  + canvas.width / 2;
    const yEl0 = ellipsW * Math.cos(i + Math.PI / 4) + canvas.height / 2;
    const yEl1 = ellipsW * Math.cos(i - Math.PI / 4) + canvas.height / 2;
    context.beginPath();
    context.arc( xEl, yEl0, r, 0, Math.PI * 2);
    context.arc( xEl, yEl1, r, 0, Math.PI * 2);
    context.fill();
    //horizontal
    const xEl2 = ellipsW * Math.sin(i) + canvas.width / 2;
    const yEl2 = ellipsH * Math.cos(i) + canvas.height / 2;
    context.beginPath();
    context.arc( xEl2, yEl2, r, 0, Math.PI * 2);
    context.fill();
  }
};
draw();
+function run(){
  window.requestAnimationFrame(run);
  draw();
}()






// let canvas = document.querySelector('#canvasId');
// let context = canvas.getContext("2d");

// const resize = () => {
//   canvas.setAttribute('width', document.documentElement.clientWidth);
//   canvas.setAttribute('height', document.documentElement.clientHeight);
// };

// resize();
// window.addEventListener('resize', resize);
// context.fillStyle = 'hsla(0, 0%, 0%, 1)';

// let t = 0;
// let h = 0;
// let hUp = true;
// const draw = () => {
//   context.fillStyle = '#222';
//   context.fillRect(0, 0, canvas.width, canvas.height);

//   for (let i = 0; i < 200; t += 0.000002, i += 0.5) {
//     let x = h * Math.cos(i + t) + canvas.width / 2;
//     let y = h * Math.sin(i + t) + canvas.height / 2;
//     h = hUp ? h + 0.05 : h - 0.05;
//     hUp = h > 20 ? false : h < 0 ? true : hUp;
//     context.fillStyle = `hsla(${Math.sin(Math.random()) * 50 +200}, 100%, 50%, 1)`;
//     context.beginPath();
//     context.arc(x, y, 3, 0, Math.PI * 2);
//     context.fill();

//     context.beginPath();
//     context.arc( i * Math.sin(i * t) + canvas.height / 2, 
//                  i * Math.cos(t) + canvas.width / 2, 
//                  5, 0, Math.PI * 2);
//     context.fill();
//   }

// };

// +function run(){
//   window.requestAnimationFrame(run);
//   draw();
// }()
