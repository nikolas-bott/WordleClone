const startBtn = document.getElementById("start-btn");
const displayWord = document.getElementById("display-word");

startBtn.addEventListener("click", async () => {
  const word = await getRandomWord(4);
  displayWord.innerText = word;
});

async function getRandomWord(letterCount) {
  const response = await fetch(
    `https://random-word-api.vercel.app/api?words=1&length=${letterCount}`
  );
  const data = await response.json();
  const isWorldValids = await isWorldValid(data[0]);
  console.log(isWorldValids);

  if (isWorldValids) {
    return data[0];
  } else {
    return getRandomWord(4);
  }
}

async function isWorldValid(word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const data = await response.json();

  if (data[0]) return true;
  else return false;
}
