const getPixels = (canvas, word, density, w, h) => {
  const ctx = canvas.getContext('2d');
  const result = {
    canvas: canvas,
    firstPartCoord: [],
    secondPartCoord: [],
    particles: [],
    leftOrRight: [-100, w + 100],
    currentAnimation: null,
  };
  ctx.fillStyle = 'red';
  ctx.font = '30vh bold monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(word, w / 2, h / 2, w);
  let pixel = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < h; i += density) {
    for (let j = 0; j < w; j += density) {
      if (
        pixel.data[((j + (i * w)) * 4) + 0] > 0 ||
        pixel.data[((j + (i * w)) * 4) + 1] > 0 ||
        pixel.data[((j + (i * w)) * 4) + 2] > 0 ||
        pixel.data[((j + (i * w)) * 4) + 3] > 0) {
        result.firstPartCoord.push({x: j, y: i});
        result.secondPartCoord.push({x: result.leftOrRight[random(0,2)], y: random(-100, h + 100)});
        result.particles.push(new Particle(w, h));
      }
    }
  }
  return result;
};

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Particle {
  constructor(w, h) {
    this.x = random(-100, w + 100);
    this.y = random(-100, h + 100);
  }
  print(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'hsla(' + random(0, 360) + ', 100%, 80%, 1';
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
};

const animationCreator = (coord, speed, settings) => {
  const ctx = settings.canvas.getContext('2d');
  return function animation() {
    ctx.clearRect(0, 0, settings.canvas.width, settings.canvas.height);
    settings.particles.forEach((particle, i) => {
      particle.print(ctx);
      particle.x = particle.x < coord[i].x ? particle.x + speed : particle.x - speed;
      particle.y = particle.y < coord[i].y ? particle.y + speed : particle.y - speed;
    })
    settings.currentAnimation = requestAnimationFrame(animation);
  }
};

const winAnimationInit = (destination) => {
  const w = destination.clientWidth;
  const h = destination.clientHeight;
  const canvas = document.createElement('canvas');
  canvas.setAttribute('height', h);
  canvas.setAttribute('width', w);
  canvas.classList.add('win-animation-canvas');
  destination.append(canvas);
  const animationSettings = getPixels(canvas, 'WIN', 3, w, h);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  return animationSettings;
};

const winAnimationStart = (settings, callback) => {
  const firstPart = animationCreator(settings.firstPartCoord, 10, settings);
  const secondPart = animationCreator(settings.secondPartCoord, 50, settings);
  firstPart();
  setTimeout(() => {
    cancelAnimationFrame(settings.currentAnimation);
    secondPart();
    setTimeout(() => {
      callback();
    }, 500);
  }, 2000)
};


const createScoreForm = () => {
  const form = document.createElement('form');
  form.classList.add('win-form', 'invisible');
  form.innerHTML = '<h1>PUT YOUR NAME</h1>';
  const input = document.createElement('input');
  const button = document.createElement('button');
  button.textContent = 'YUHUUUU!'
  form.append(input, button);
  return form;
};

const addToScoreCreator = (settings) => (event) => {
  event.preventDefault();
  settings.score['test'] = event.target.querySelector('input').value;
};
const mainSettings = {
  score: {
    test: null,
  }
}

window.onload = () => {
  const settings = winAnimationInit(root);
  const form = createScoreForm();
  root.append(form)
  form.style.top = root.clientHeight / 2 - form.clientHeight / 2 + 'px';
  form.style.left = root.clientWidth / 2 - form.clientWidth / 2 + 'px';

  form.onsubmit = addToScoreCreator(mainSettings);

  winAnimationStart(settings, () => form.classList.remove('invisible'));
}



