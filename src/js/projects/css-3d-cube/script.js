const button = document.querySelector('.button');
const box = document.querySelector('.box');
const score = document.querySelector('.score');

button.addEventListener('click', () => {
  const random = Math.floor( Math.random() * 6) + 1;
  let rotateStyle = '';

  if (random === 1) {
    return;
  } else if (random === 2) {
    rotateStyle = `transform: rotate3d(0,1,0,-90deg);` 
  } else if (random === 3) {
    rotateStyle = `transform: rotate3d(1,0,0,90deg);` 
  } else if (random === 4) {
    rotateStyle = `transform: rotate3d(0,1,0,90deg);` 
  } else if (random === 5) {
    rotateStyle = `transform: rotate3d(1,0,0,-90deg);` 
  } else if (random === 6) {
    rotateStyle = `transform: rotate3d(1,0,0,180deg);` 
  }

  box.style = rotateStyle;

  score.insertAdjacentHTML('beforeend', `<div>${random}</div>`);
  if (score.clientHeight > document.documentElement.clientHeight){
   score.innerHTML = '<div>Score</div>';
   score.insertAdjacentHTML('beforeend', `<div>${random}</div>`);
  }
    
})
