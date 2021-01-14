'use strict';

const root = document.getElementById('root');
//16*30(99) 16*16(40) 9*9(10)

const mainSettings = {
  size: [9, 9],
  count: 10,
  minefield: null,
  cellSize: {
    width: 20,
    height: 20,
  },
  cells: new Map(),
};

const generateMinefield = (settings) => {
  const {size, count} = settings;
  // debugger
  const indexes = [];
  let arrLength = size[0] * size[1];
  const flatArr = new Array(arrLength);
  while (arrLength > 0) {
    indexes.push(--arrLength);
  };
  const minesIndexes = indexes.sort(() => Math.random() - 0.5);
  minesIndexes.length = count;
  flatArr.fill(0);
  minesIndexes.forEach(i => flatArr[i] = 'm');
  const newMinefield = [];
  for (let i = 0; i < flatArr.length; i += size[1]) {
    newMinefield.push(flatArr.slice(i, i + size[1]))
  }
  for (let y = 0; y < size[0]; y++){
    for (let x = 0; x < size[1]; x++) {
      if (newMinefield[y][x] === 'm') continue;
      newMinefield[y][x] = [
        newMinefield[y - 1]?.[x - 1], newMinefield[y - 1]?.[x], newMinefield[y - 1]?.[x + 1],
        newMinefield[y][x - 1], newMinefield[y][x + 1],
        newMinefield[y + 1]?.[x - 1], newMinefield[y + 1]?.[x], newMinefield[y + 1]?.[x + 1]
      ].filter(e => e === 'm').length;
    }
  }
  settings.minefield = newMinefield;
  return settings;
};

class Cell {
  constructor(position, value, settings) {
    this.x = position.x;
    this.y = position.y;
    this.cellSize = settings.cellSize;
    this.value = value;
    this.cellsCollection = settings.cells;
    this.neighbors = [];
    this.element = this.create();
  }
  create = () => {
    const cellElement = document.createElement('div');
    cellElement.style.width = this.cellSize.width + 'px';
    cellElement.style.height = this.cellSize.height + 'px';
    cellElement.classList.add('cell-element');
    return cellElement;
  }
  addToCollection = () => {
    this.cellsCollection.set(this.element, this);
  }
  open = () => {
    if (this.value === 'm') this.element.classList.add('cell-mine');
    else if (this.value === '0') this.element.classList.add('cell-empty');
    else {
      this.element.textContent = this.value;
      this.element.classList.add('cell-num');
    }
  }
  append = (destination) => {
    destination.append(this.element);
  }
  findNeighbors = () => {
    this.neighbors = Array.from(this.cellsCollection.values())
      .filter(cell => {
        return (
          (cell.y === this.y - 1 && cell.x === this.x - 1
            || cell.y === this.y - 1 && cell.x === this.x
            || cell.y === this.y - 1 && cell.x === this.x + 1)
          || (cell.y === this.y && cell.x === this.x - 1
            && cell.y === this.y && cell.x === this.x + 1)
          || (cell.y === this.y + 1 && cell.x === this.x - 1
            || cell.y === this.y + 1 && cell.x === this.x
            || cell.y === this.y + 1 && cell.x === this.x + 1)
        )
      })
  }
};

//for init game
generateMinefield(mainSettings);
//

const createElements = (settings) => {
  const {minefield, cells} = settings;
  for (let y = 0; y < minefield.length; y++) {
    for (let x = 0; x < minefield[y].length; x++) {
      const newCell = new Cell({y: y, x: x}, minefield[y][x], settings);
      newCell.addToCollection();
    }
  }
};
// for init game
createElements(mainSettings);
//
Array.from(mainSettings.cells.values()).map(cell => cell.findNeighbors())
console.log(mainSettings.cells)













// const createElementField = (settings) => {
//   const {minefield, cellSize} = settings;
//   const gameArea = document.createElement('div');
//   gameArea.classList.add('game-area');

//   for (let line of minefield) {
//     const lineElement = document.createElement('div');
//     lineElement.classList.add('line-element');

//     for (let cell of line) {
//       const cellElement = document.createElement('div');
//       cellElement.style.width = cellSize.width + 'px';
//       cellElement.style.height = cellSize.height + 'px';

//       cellElement.classList.add('cell-element');
//       cellElement.dataset.cell = cell;
//       lineElement.append(cellElement);
//     }
//     gameArea.append(lineElement);
//   }
//   return gameArea;
// };

// const openCell = (cell) => {
//   const cellData = cell.dataset.cell;
//   if (cellData === 'm') cell.classList.add('cell-mine');
//   else if (cellData === '0') cell.classList.add('cell-empty');
//   else {
//     cell.textContent = cellData;
//     cell.classList.add('cell-num');
//   }
// };




// move to init function
// const gameArea = createElementField(generateMinefield(mainSettings));
// root.append(gameArea);
// gameArea.addEventListener('mousedown', (event) => {
//   event.preventDefault();
// });
// gameArea.addEventListener('mouseup', (event) => {
//   event.preventDefault();
//   // openCell(event.target);
// });
// //