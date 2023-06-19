const cells = document.querySelectorAll(".card__pair");
const title = document.querySelector("h1");
const restartGameContainer = document.querySelector(".game__footer");
const restartGameButton = document.querySelector("#restart");

function rotateCell(event) {
  const cell = event.currentTarget;
  cell.classList.add("card__rotate");
  cell.dataset.active = "true";
  const activeCells = document.querySelectorAll(`[data-active="true"]`);
  const sign = cell.querySelector(".card__sign");

  showSign(sign);

  if (checkComplete()) {
    title.textContent = "Вы выиграли!"
    restartGameContainer.classList.add("show");
  }

  if (activeCells.length === 2) {
    return compareCells(...activeCells);
  }
}

function restartGame() {
  cells.forEach(element => {
    const sign = element.querySelector(".card__sign");

    hideSign(sign);
    element.classList.remove("correct", "card__rotate")
  })

  title.textContent = "";
  restartGameContainer.classList.remove("show");
}

function compareCells(firstCell, secondCell) {
  let flag = false;
  const firstSign = firstCell.querySelector(".card__sign");
  const secondSign = secondCell.querySelector(".card__sign");

  firstCell.dataset.active = "false";
  secondCell.dataset.active = "false";

  if (firstSign.textContent === secondSign.textContent) {
    flag = true;
  }

  return updateBorder([[firstCell, firstSign], [secondCell, secondSign]], flag);
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
  return Array.from(cells).every(el => el.classList.contains("card__rotate"));
}

function showSign(sign) {
  return setTimeout(() => sign.classList.add("show"), 300);
}

function hideSign(sign) {
  return setTimeout(() => sign.classList.remove("show"));
}

cells.forEach((element) => {
  element.addEventListener("click", (event) => rotateCell(event));
});

restartGameButton.addEventListener("click", restartGame)