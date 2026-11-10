const runTest = document.getElementById("Run-Test");
const parent = document.getElementById("Tests");
const successRate = document.getElementById("Success-Rate");
let boxes = [];
let totalTrials = 0;
let totalSuccesses = 0;

runTest.addEventListener("click", function () {
  const newCard = document.createElement("div");
  newCard.classList.add("card");

  boxes = fillBoxes();
  totalTrials++;

  const title = document.createElement("h4");
  title.textContent = "Simulation Result";

  const result = document.createElement("p");
  result.id = "resultID";
  if (runFullTrial(boxes)) {
    result.textContent = "Success!";
    result.style.color = "green";
    totalSuccesses++;
  } else {
    result.textContent = "Failure!";
    result.style.color = "red";
  }
  newCard.appendChild(title);
  newCard.appendChild(result);
  parent.appendChild(newCard);

  successRate.textContent = `Success Rate: ${((totalSuccesses / totalTrials) * 100).toFixed(2)}%`;
});

function fillBoxes() {
  let numbers = [];
  for (let i = 0; i < 100; i++) {
    numbers[i] = i + 1;
  }

  //Fisher-Yates Shuffle
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}

function foundNumber(targetNum, array) {
  let nextNum = targetNum;

  for (let i = 0; i < 50; i++) {
    if (array[nextNum - 1] === targetNum) {
      return true;
    } else {
      nextNum = array[nextNum - 1];
    }
  }
  return false;
}

function runFullTrial(array) {
  for (let i = 1; i <= 100; i++) {
    if (!foundNumber(i, array)) {
      return false;
    }
  }
  return true;
}
