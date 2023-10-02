


const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


let match;
let score = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  let card = event.target;
  cardColor = event.target.getAttribute("class", "color");
  card.style.backgroundColor = cardColor;
  // console.log("you just clicked", event.target);
  card.setAttribute("data-flipped", "flipped");
  if(checkForTwo()===true){
    pauseClicks();
    setTimeout(restartClicks, 1000);
  if (checkForMatch() === match) {
      markAsMatched();
    } else if (checkForMatch() === false) {
      setTimeout(flipBack, 1000);
    };

  };
  if (checkForWin() === true) {
    console.log(score);
    setTimeout(()=>alert(`You won in ${score} clicks!`), 500);
  };
 };

function pauseClicks() {
  for (let i of gameContainer.children) {
  i.removeEventListener("click", handleCardClick);
  };
};

function restartClicks() {
  for (let i of gameContainer.children) {
  i.addEventListener("click", handleCardClick);
  };
};


function checkForTwo() {
  const game = [...gameContainer.children];
  let cards = game.filter((i) => {return i.dataset.flipped;
  });
  if (cards.length === 2) {
    score += 1;
    return true;
  } else {
    score += 1;
    return false;
    };
};

function flipBack() {
  for(i of gameContainer.children){
    if(i.dataset.flipped) {
      delete i.dataset.flipped;
      i.style.backgroundColor = "white";
    };
  };
};

function checkForMatch() {
  const game = [...gameContainer.children];
  let cards = game.filter((i) => {return i.dataset.flipped;
  });
  let card1 = cards[0];
  let card2 = cards[1];
  if (card1.classList[0] === card2.classList[0]){
    return match} else {
      return false;
    }
  
};

function markAsMatched() {
  for(let i of gameContainer.children){
    if (i.getAttribute("data-flipped") != null) {
      i.setAttribute("data-matched", "matched");
      delete i.dataset.flipped;
    };
  };
};

function checkForWin() {
  const game = [...gameContainer.children];
  let cards = game.filter((i) => {return i.dataset.matched;
  });
  if (cards.length === gameContainer.children.length) {
    return true;
  } else {
    return false;
  };
};

// when the DOM loads
createDivsForColors(shuffledColors);
