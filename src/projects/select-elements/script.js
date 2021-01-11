'use strict';
const canvas = document.getElementById('canvas-select');
const ctx = canvas.getContext('2d');
const elements = document.querySelectorAll('.element');

window.addEventListener('load', () => {
  canvas.setAttribute('width', document.documentElement.clientWidth);
  canvas.setAttribute('height', document.documentElement.clientHeight);
});

//mainSettings
const mainSettings = {
  select: {
    isSelectModeOn: false,
    startPoint: {
      x: null,
      y: null
    },
    stopPoint: {
      x: null,
      y: null
    },
    rectSize: {
      width: 0,
      height: 0
    },
    selectedElements: new Set(),
  },
};

//draw rect
const drawRectangular = (canvas, x, y, width, height) => {
  const ctx = canvas.getContext('2d');
  ctx.setLineDash([8, 3]);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeRect(x, y, width, height);
};

//check will element select
const checkSelect = (element, settings) => {
  const {
    startPoint: {
      x: startX,
      y: startY
    },
    stopPoint: {
      x: stopX,
      y: stopY
    }
  } = settings.select;
  const eStartX = element.offsetLeft;
  const eStopX = eStartX + element.clientWidth;
  const eStartY = element.offsetTop;
  const eStopY = eStartY + element.clientHeight;
  return (eStartX >= startX && eStopX <= stopX && eStartY >= startY && eStopY <= stopY ||
    eStartX >= startX && eStopX <= stopX && eStartY >= stopY && eStopY <= startY ||
    eStartX >= stopX && eStopX <= startX && eStartY >= startY && eStopY <= stopY ||
    eStartX >= stopX && eStopX <= startX && eStartY >= stopY && eStopY <= startY
  )
};

//select elements
const toggleSelection = (elements, settings) => {
  const selectedElements = settings.select.selectedElements;
  elements.forEach(element => {
    if (checkSelect(element, settings)) {
      element.classList.add('selected');
      selectedElements.add(element);
    } else {
      element.classList.remove('selected');
      selectedElements.has(element) && selectedElements.delete(element);
    }
  })
};

//draw mode on
const drawModeOnCreator = (canvas, settings) => (event) => {
  event.preventDefault();
  let {startPoint, stopPoint, rectSize} = settings.select;
  if (!settings.select.isSelectModeOn) {
    settings.select.isSelectModeOn = true;
    startPoint.x = event.clientX;
    startPoint.y = event.clientY;
  } else {
    stopPoint.x = event.clientX;
    stopPoint.y = event.clientY;
    rectSize.width = stopPoint.x - startPoint.x;
    rectSize.height = stopPoint.y - startPoint.y;
  }
  drawRectangular(canvas, startPoint.x, startPoint.y, rectSize.width, rectSize.height);
  toggleSelection(elements, settings);
};
const drawModeOn = drawModeOnCreator(canvas, mainSettings);
//
//draw mode off
const drawModeOff = (canvas, settings) => {
  settings.select.isSelectModeOn = false;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  settings.select.rectSize.width = settings.select.rectSize.height = 0;
};

//listener
document.addEventListener('mousedown', (event) => {
  drawModeOn(event);
  document.addEventListener('mousemove', drawModeOn);
});

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', drawModeOn);
  drawModeOff(canvas, mainSettings);
});