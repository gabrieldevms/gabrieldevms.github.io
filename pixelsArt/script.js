const buttonRandomColor = document.createElement('button');
buttonRandomColor.id = 'button-random-color';
buttonRandomColor.innerText = 'Cores aleatórias';
document.body.appendChild(buttonRandomColor);

const createColorElement = color => {
  const element = document.createElement('div');
  element.style.backgroundColor = color;
  element.className = 'color';
  return element;
}

const getRandomColor = () => {
  let caracters = '0123456789ABCDEF';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += caracters[Math.floor(Math.random() * 16)];
  }
 
  if (color === '#FFFFFF') {
    color = getRandomColor();
  }
  return color;
}

const generatePalette = () => {
  const palette = document.getElementById('color-palette');
  palette.innerHTML = '';

  const firstElement = createColorElement('black');
  firstElement.classList.add('selected');
  palette.appendChild(firstElement);

  for (let index = 0; index < 3; index += 1) {
    const randomColor = getRandomColor();
    const colorElement = createColorElement(randomColor);
    palette.appendChild(colorElement);
  }

  localStorage.setItem('colorPalette', palette.innerHTML);
}

const storedPalette = localStorage.getItem('colorPalette');
if (storedPalette) {
  const palette = document.getElementById('color-palette');
  palette.innerHTML = storedPalette;
} else {
  generatePalette();
}

buttonRandomColor.addEventListener('click', generatePalette);

const createPixelBoard = () => {
  const pixelBoard = document.createElement('div');
  pixelBoard.id = 'pixel-board';

  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.backgroundColor = 'white';
      pixelBoard.appendChild(pixel);
    }
  }

  return pixelBoard;
}

const createClearButton = () => {
  const clearButton = document.createElement('button');
  clearButton.id = 'clear-board';
  clearButton.innerText = 'Limpar';
  clearButton.addEventListener('click', () => {
    const pixels = document.getElementsByClassName('pixel');
    Array.from(pixels).forEach(pixel => {
      pixel.style.backgroundColor = 'white';
    });
  });
  return clearButton;
};

const pixelBoard = createPixelBoard();
document.body.insertBefore(pixelBoard, document.getElementById('clear-board'));
buttonRandomColor.insertAdjacentElement('afterend', createClearButton());

const palette = document.getElementById('color-palette');
palette.addEventListener('click', event => {
  const selectedColor = document.querySelector('.color.selected');
  const clickedColor = event.target;
  
  if (clickedColor.classList.contains('color')) {
    selectedColor.classList.remove('selected');
    clickedColor.classList.add('selected');
  }
});

const pixels = document.getElementsByClassName('pixel');
for (let pixel of pixels) {
  pixel.addEventListener('click', event => {
    const selectedPixel = event.target;
    selectedPixel.style.backgroundColor = document.querySelector('.color.selected').style.backgroundColor;
    selectedPixel.classList.remove('selected');
  });
}
