//#region initial Variable
let score = 0;
let num = 3;
let timer;
let time = 25;

let refreshBtn = document.getElementById("refreshWord");
let checkBtn = document.getElementById("checkWord");
let inputField = document.getElementById("inputWord");
const numOfPlays = document.getElementById("num");
const scoreElement = document.getElementById("score");
//#endregion

//#region GameInit
const pageInit = () => {
  // 0 - 22
  let randomWordIndex = Math.floor(Math.random() * words.length);
  let wordObject = words[randomWordIndex];

  let wordArray = wordObject.word.split("");

  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  numOfPlays.innerText = num;
  scoreElement.innerText = score;

  correctWord = wordObject.word.toLocaleLowerCase();
  inputField.setAttribute("maxLength", correctWord.length);
  console.log(wordObject);
  lblWord.innerHTML = wordArray.join("");
  lblHint.innerHTML = wordObject.hint;
  lblTimer.innerText = time;
  inputField.value = "";

  clearInterval(timer);
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      return (lblTimer.innerText = time);
    }

    loseGame({
      title: `Time Out!`,
      timer: 900,
      icon: "warning",
      text: `${correctWord.toUpperCase()}` + " Was The Correct Word!",
    });
  }, 1000);
};
//#endregion

//#region refresh Game
function refreshGame(msg) {
  if (msg) {
    Swal.fire(msg);
  }

  time = 27;
  pageInit();
}

const gameOver = () => {
  Swal.fire("Game Over!", `You get ${score} points`, "error");
  setTimeout(function () {
    window.location.href = "index.html"; // Redirect to the original page
  }, 2500);
  num = 3;
  score = 0;
  refreshGame(msg);
};

function loseGame(msg) {
  num--;
  if (num <= 0) {
    return gameOver();
  }
  refreshGame(msg);
}

//#endregion

//#region checkWord
const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase(); // getting user value
  if (!userWord) {
    return Swal.fire({
      title: `info!`,
      timer: 850,
      icon: "info",
      text: `${userWord}` + " Please enter a word check!",
    });
  }
  time++;
  if (userWord !== correctWord) {
    return Swal.fire({
      title: `Oops!`,
      timer: 850,
      icon: "warning",
      text: `${userWord}` + " is not correct word!... Try Again 🙂",
    });
  } else {
    Swal.fire({
      title: `Good job!😄👏🏻`,
      timer: 950,
      icon: "success",
      text: `${userWord.toUpperCase()}` + " Is The Correct Word!... ",
    });

    timer;
    time = 27;
    score++;
    inputField.value = ""; // making input field empty
  }
  time = 27;
  pageInit();

  if (score === 15) {
    winGame();
  }
};
//#endregion

//#region Swal.fire
refreshBtn.addEventListener("click", () => {
  Swal.fire({
    title: `Good Try!`,
    timer: 900,
    icon: "info",
    text: " The Correct Word Was: " + `${correctWord}`,
  });
  clearInterval(timer);
  time = 27;
  num--;
  if (num <= 0) {
    gameOver();
  }
  pageInit();
});
checkBtn.addEventListener("click", checkWord);

const winGame = () => {
  Swal.fire(
    "🚀🎉Congratulation🏆👏🏻🌟🚀 ",
    `Your Score : ${score} points🎮`,
    "success"
  );
  setTimeout(function () {
    window.location.href = "index.html"; // Redirect to the original page
  }, 4000);
};
//#endregion

window.addEventListener("DOMContentLoaded", () => {
  lblWord = document.getElementById("scrambleWord");
  lblHint = document.getElementById("hint");
  lblTimer = document.getElementById("timer");
  pageInit();
});
