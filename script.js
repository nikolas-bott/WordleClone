const startBtn = document.getElementById("start-btn");
const guessBtn = document.getElementById("guess-btn");
const displayWord = document.getElementById("display-word");
const textInput = document.getElementById("word-input");
const container = document.getElementById("container");

const wordLength = 4;
let currentWord;

startBtn.addEventListener("click", async () => {
  currentWord = await getRandomWord();
  displayWord.innerText = "You can start guessing now!";
});

guessBtn.addEventListener("click", async () => {
  let guessedWord = textInput.value;
  guessedWord = guessedWord.toLowerCase();

  const isValid = await isWorldValid(guessedWord);
  console.log(isValid);

  if (!isValid) {
    return;
  }

  const validationArray = checkForCorrectLetters(guessedWord);
  const wordAsArr = guessedWord.split("");
  validationArray.forEach((number, index) =>
    createOutput(wordAsArr[index], number)
  );
});

function createOutput(letter, validationNumber) {
  console.log("ja...");
  const outputDiv = document.createElement("div");
  const outputP = document.createElement("p");

  container.appendChild(outputDiv);
  outputDiv.appendChild(outputP);

  switch (validationNumber) {
    case -1:
      outputDiv.style.backgroundColor = "yellow";
      break;
    case 0:
      outputDiv.style.backgroundColor = "beige";
      break;
    case 1:
      outputDiv.style.backgroundColor = "green";
      break;
  }

  outputP.innerText = letter;
}

async function getRandomWord() {
  const response = await fetch(
    `https://random-word-api.vercel.app/api?words=1&length=${wordLength}`
  );
  const data = await response.json();
  const isWorldValids = await isWorldValid(data[0]);
  console.log(isWorldValids);

  if (isWorldValids) {
    console.log("Word is " + data[0]);
    return data[0];
  } else {
    return getRandomWord();
  }
}

async function isWorldValid(word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const data = await response.json();

  if (data[0] && word.length === 4) {
    return true;
  } else {
    return false;
  }
}

function checkForCorrectLetters(input) {
  // 1 -> Correct letter with correct position
  // 0 -> Wrong letter doesnt exist at all
  // -1 -> Right letter at wrong position
  const inputArr = input.split("");
  const goalArr = currentWord.split("");
  const charactersFound = [];
  const outputArr = [];

  console.log(inputArr.length);

  for (let i = 0; i < inputArr.length; i++) {
    console.log("First");
    if (inputArr[i] == goalArr[i]) {
      outputArr.push(1);
      charactersFound.push(inputArr[i]);

      continue;
    }

    let letterFound = false;
    for (let j = 0; j < inputArr.length; j++) {
      if (inputArr[i] == goalArr[j]) {
        if (charactersFound.includes(inputArr[i])) {
          continue;
        }
        letterFound = true;
        charactersFound.push(inputArr[i]);
        outputArr.push(-1);
      }
    }
    if (!letterFound) outputArr.push(0);
  }

  return outputArr;
}
