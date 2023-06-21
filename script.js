// const board = [1, 3, 7, 8, 9, 5, 4, 2, 6, 10, 1, 3, 7, 8, 9, 5, 4, 2, 6, 10];
let board;
let cells;
let restartGameButton = document.querySelector("#restart");
const title = document.querySelector("h1");
const restartGameContainer = document.querySelector(".game__footer");

function randomizeCells(pairsAmount) {
  let filledArray = [...Array(pairsAmount)].map(
    (element, index) => (element = index)
  );
  return shuffle(filledArray).concat(filledArray);
}

function renderGame() {
  board = randomizeCells(20);
  const gameContainer = document.querySelector("#game");
  board.forEach((el) => gameContainer.appendChild(createCell(el)));

  cells = document.querySelectorAll(".card__pair");

  startGame();
}

function createCell(sign) {
  const cell = document.createElement("div");
  const signContainer = document.createElement("div");
  cell.classList.add("card__pair");
  signContainer.classList.add("card__sign");

  cell.setAttribute("data-active", false);
  signContainer.textContent = sign;
  cell.appendChild(signContainer);

  return cell;
}

function rotateCell(event) {
  const cell = event.currentTarget;
  cell.classList.add("card__rotate");
  setActive(cell, true);
  const activeCells = document.querySelectorAll(`[data-active="true"]`);
  const sign = cell.querySelector(".card__sign");

  showSign(sign);

  if (checkComplete()) {
    title.textContent = "Вы выиграли!";
    restartGameContainer.classList.add("show");
  }

  if (activeCells.length === 2) {
    return compareCells(...activeCells);
  }
}

function restartGame() {
  cells.forEach((element) => {
    const sign = element.querySelector(".card__sign");

    hideSign(sign);
    element.classList.remove("correct", "card__rotate");
  });

  title.textContent = "";
  restartGameContainer.classList.remove("show");
}

function compareCells(firstCell, secondCell) {
  let flag = false;
  const firstSign = firstCell.querySelector(".card__sign");
  const secondSign = secondCell.querySelector(".card__sign");

  setActive(firstCell, false);
  setActive(secondCell, false);

  if (firstSign.textContent === secondSign.textContent) {
    flag = true;
  }

  return updateBorder(
    [
      [firstCell, firstSign],
      [secondCell, secondSign],
    ],
    flag
  );
}

function updateBorder(cells, flag) {
  cells.forEach(([element, sign]) => {
    if (!flag) {
      element.classList.add("wrong");
      setTimeout(() => {
        element.classList.remove("wrong", "card__rotate");
        hideSign(sign);
      }, 800);
    } else {
      element.classList.add("correct");
    }
  });
}

function checkComplete() {
  return Array.from(cells).every((el) => el.classList.contains("card__rotate"));
}

function showSign(sign) {
  return setTimeout(() => sign.classList.add("show"), 300);
}

function hideSign(sign) {
  return sign.classList.remove("show");
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function setActive(element, value) {
  element.dataset.active = value;
}

function startGame() {
  window.addEventListener("DOMContentLoaded", () => {
    cells.forEach((element) => {
      element.addEventListener("click", (event) => rotateCell(event));
    });
    restartGameButton.addEventListener("click", restartGame);
  });
}

renderGame();
