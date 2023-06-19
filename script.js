const cells = document.querySelectorAll(".card__pair");

cells.forEach((element) => {
  element.addEventListener("click", (event) => rotateCell(event));
});

function rotateCell(event) {
  const cell = event.currentTarget;
  const sign = cell.querySelector(".card__sign");

  cell.classList.add("card__rotate");
  cell.dataset.active = "true";

  showSign(sign);

  const activeCells = document.querySelectorAll(`[data-active="true"]`);
  if (activeCells.length === 2) {
    compareCells(...activeCells);
  }
}

function showSign(sign) {
  return setTimeout(() => sign.classList.add("show"), 300);
}

function hideSign(sign) {
  return setTimeout(() => sign.classList.remove("show"));
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
