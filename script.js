const checkBtn = document.getElementById("check-guess");
const restartBtn = document.getElementById("reset");
const myGuess = document.getElementById("guess-number");
const feedback = document.getElementById("feedback");
const record = document.getElementById("record");

function guessNumberGame(digit) {
  let loopCnt = 1;
  document.getElementById("game-name").innerHTML = `GUESS THE ${digit} DIGIT NUMBER!`;
  const randomNum = getDigitNumber(digit, 100, 999).join("");

  checkBtn.addEventListener("click", () => {
    const myGuess = Array.from(getMyGuess()).join("");
    const hint = getHint(randomNum, myGuess).join("");

    if ((randomNum.length != digit) || (myGuess.length != digit)){
      alert("Please make sure to input 3 digit number without repetition");
      return (document.getElementById("guess-number").value = "");
    }

    if (hint != "ooo" && loopCnt < 5) {
      document.getElementById("feedback").innerText = hint;
      record.innerHTML += `Round ${loopCnt} : My Guess was ${myGuess} and Hint was ${hint}<br>`;
      if (hint != "ooo" && loopCnt == 4) {
        document.getElementById("random-num").innerText = randomNum;
        loggedFAILED();
      }
    } else if (hint == "ooo") {
      loggedWON();
      document.getElementById("random-num").innerText = randomNum;
    } else {
      loggedFAILED();
      document.getElementById("random-num").innerText = randomNum;
    }
    loopCnt++;
  });

  restartBtn.addEventListener("click", () => {
    loopCnt = 0;
    location.reload();
  });
}

function getDigitNumber(length, min, max) {
  let resultArr = [];
  for (let i = 0; i < length; i++) {
    const newNumber = Math.floor(Math.random() * 9) + 1;
    resultArr.includes(newNumber) ? i-- : resultArr.push(newNumber);
  }
  return resultArr;
}

// NOTE: still got 'e', '+', '-', ... since input tag html accepted these inputs as per spec
function getMyGuess() {
  let number = new Set(document.getElementById("guess-number").value);
  return number;
}

// myGuess = '125'
// randomNum = '156'
// hint = ["o", "-", "x"]
function getHint(randomNum, myGuess) {
  let hint = [];
  for (let i = 0; i < randomNum.length; i++) {
    if (randomNum.includes(myGuess[i])) {
      if (randomNum[i] == myGuess[i]) {
        hint.push("o");
      } else {
        hint.push("x");
      }
    } else {
      hint.push("-");
    }
  }
  return hint;
}

function loggedWON() {
  alert("YOU WON... Press Restart to try again")
}

function loggedFAILED() {
  alert("YOU FAILED... Press Restart to try again")
}

guessNumberGame(3);
