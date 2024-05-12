let redDiv = document.querySelector("#red");
let yellowDiv = document.querySelector("#yellow");
let greenDiv = document.querySelector("#green");
let blueDiv = document.querySelector("#blue");
let announceBox = document.querySelector("#announce-box");
let winnerDiv = document.querySelector("#winner");
let btn = document.querySelector("#btn");
winnerDiv.style.display = "none";
let flag = true;
let score = {
  red: 0,
  blue: 0,
  green: 0,
  yellow: 0,
};
// OpeningCeremony() → Race100M() → LongJump() → HighJump() → AwardCeremony()
function OpeningCeremony(score, Race100M) {
  btn.style.display = "none";
  setTimeout(() => {
    console.log("Let the games begin!!");
    announceBox.innerHTML += "<p class='announce'>Let the games begin!</p>";
    Race100M(score);
  }, 1000);
}

function Race100M(score) {
  console.log("Race 100M event starts.");
  setTimeout(() => {
    const times = {
      red: Math.floor(Math.random() * 6) + 10,
      blue: Math.floor(Math.random() * 6) + 10,
      green: Math.floor(Math.random() * 6) + 10,
      yellow: Math.floor(Math.random() * 6) + 10,
    };

    const sortedTime = Object.keys(times).sort((a, b) => times[a] - times[b]);

    score[sortedTime[0]] += 50;
    score[sortedTime[1]] += 25;
    UpdateHTML(score, "Race 100 M", sortedTime[0]);
    console.log(`Race 100M winners : ${sortedTime[0]} and ${sortedTime[1]}`);
    console.log(`Updated Score : ${JSON.stringify(score)}`);
    LongJump(score);
  }, 3000);
}

function LongJump(score) {
  console.log("Long Jump event starts.");
  setTimeout(() => {
    const colors = ["red", "yellow", "green", "blue"];
    const randomeColor = colors[Math.floor(Math.random() * colors.length)];
    score[randomeColor] += 150;

    console.log(`Long Jump winner : ${randomeColor}`);
    console.log(`Updated Score : ${JSON.stringify(score)}`);
    UpdateHTML(score, "Long Jump", randomeColor);
    HighJump(score);
  }, 2000);
}

function HighJump(score) {
  console.log("High Jump event starts.");
  setTimeout(() => {
    const userInput = prompt("What color secured highest jump?");
    if (userInput && score.hasOwnProperty(userInput.toLowerCase())) {
      score[userInput.toLowerCase()] += 100;

      console.log(`High Jump winner : ${userInput.toLowerCase()}`);
      console.log(`Updated Score : ${JSON.stringify(score)}`);
      UpdateHTML(score, "High Jump", userInput.toLowerCase());
    } else {
      console.log("Event is canceled");
      UpdateHTML(score, "High Jump", "Event Canceled");
    }
    AwardCeremony(score);
  }, 0);
}

function AwardCeremony(score) {
  console.log("Award Ceremony begins !");
  const highToLowSorting = Object.keys(score).sort(
    (a, b) => score[b] - score[a]
  );
  //   console.log(highToLowSorting);
  console.log(
    `${highToLowSorting[0].toUpperCase()} => ${score[highToLowSorting[0]]}`
  );
  console.log(
    `${highToLowSorting[1].toUpperCase()} => ${score[highToLowSorting[1]]}`
  );
  console.log(
    `${highToLowSorting[2].toUpperCase()} => ${score[highToLowSorting[2]]}`
  );
  console.log(
    `${highToLowSorting[3].toUpperCase()} => ${score[highToLowSorting[3]]}`
  );
  updateWinner(highToLowSorting[0].toUpperCase(), score[highToLowSorting[0]]);
}
btn.addEventListener("click", () => {
  if (flag) {
    OpeningCeremony(score, Race100M);
    flag = false;
    btn.innerText = "Restart Event";
  } else {
    score = {
      red: 0,
      blue: 0,
      green: 0,
      yellow: 0,
    };
    redDiv.innerHTML = "";
    yellowDiv.innerHTML = "";
    greenDiv.innerHTML = "";
    blueDiv.innerHTML = "";
    announceBox.innerHTML = "";
    OpeningCeremony(score, Race100M);
    flag = true;
  }
});

function UpdateHTML(score, event, winner) {
  redDiv.innerHTML = `<p class='score'> Score : ${score.red} </p>`;
  yellowDiv.innerHTML = `<p class='score'> Score : ${score.yellow} </p>`;
  greenDiv.innerHTML = `<p class='score'> Score : ${score.green} </p>`;
  blueDiv.innerHTML = `<p class='score'> Score : ${score.blue} </p>`;
  if (winner !== "Event Canceled") {
    announceBox.innerHTML += `<p class='announce'> ${event} winner is <span style="color:${winner}">${winner}</span>. </p>`;
  } else {
    announceBox.innerHTML += `<p class='announce' style="text-decoration: line-through" > ${event} ${winner}. </p>`;
  }
}

function updateWinner(color, score) {
  winnerDiv.innerHTML = `<video src="./VideoEffects/celebrate.mp4" loop muted autoplay></video>
  <h1 style="z-index:1; color:white; margin-top:40%;">Here is Your Winner : <span style="color:${color}">${color}</span> and Score is ${score} </h1>`;
  let main = document.querySelector("#main");
  setTimeout(() => {
    main.style.display = "none";
    winnerDiv.style.display = "block";
  }, 1000);
  setTimeout(() => {
    main.style.display = "block";
    winnerDiv.style.display = "none";
    btn.style.display = "block";
  }, 6000);
}
