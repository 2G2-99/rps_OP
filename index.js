// # UI
// CONTAINERS
const SCOREBOARD = document.querySelector('#scoreboard.container');
const INFO = document.querySelector('#info');
const SCORE = document.querySelector('#scores');
const BUTTONS_LIST = document.querySelector('#btn-list');

// INFO & SCORES
const INFO_MESSAGE = document.querySelector('#info .message');
const SCORE_MESSAGE = document.querySelector('#score .message');

// BUTTONS
const ROCK = document.querySelector('#rock');
const PAPER = document.querySelector('#paper');
const SCISSORS = document.querySelector('#scissors');

ROCK.textContent = 'ROCK';
PAPER.textContent = 'PAPER';
SCISSORS.textContent = 'SCISSORS';

let choicesList = BUTTONS_LIST.querySelectorAll('button');

// Event listener to handle click on a choice button
choicesList.forEach(choice => {
  choice.classList.add('btn');
  choice.classList.add('pixelify-sans');
  choice.addEventListener('click', handleChoice);
});

// Remove 'picked' class from any element that has it
function removeTransition() {
  document.querySelectorAll('.picked').forEach(element => {
    element.classList.remove('picked');
  });
}

function disableButtons() {
  removeTransition();

  choicesList.forEach(choice => {
    choice.setAttribute('disabled', '');
    choice.dataset.state = 'disabled';
  });
}

function enableButtons() {
  choicesList.forEach(choice => {
    choice.removeAttribute('disabled');
    choice.dataset.state = 'enabled';
  });
}

// Information and score
function capitalizeFirstChar(string) {
  if (!string) return '';

  const [firstChar, ...rest] = string;
  return `${firstChar.toUpperCase()}${rest.join('')}`;
}

// Displays a message on a given element
function setMessage(text, element) {
  // In case the element has no text, the given text will fill the element
  if (!element.textContent) {
    element.textContent = text;
  } else {
    // A reference to the element's parent is created and a "paragraph" element is created
    let parent = element.parentNode;
    let paragraph = document.createElement('p');

    // In case the parent element has more than one child then the last child is removed
    if (parent.childNodes.length > 1) {
      parent.removeChild(parent.lastChild);
    }

    // The given text fills the "paragraph" element and it is appended to the parent element
    paragraph.textContent = text;
    parent.appendChild(paragraph);
  }
}

function displayScore(playerScore, computerScore) {
  setMessage(`Player ${playerScore} - CPU ${computerScore}`, SCORE_MESSAGE);
}

function displayRoundInfo(winner) {
  const message = `${RESULT_MESSAGES[winner]}`;
  setMessage(message, INFO_MESSAGE);
}

// # GAME
let playerScore = 0;
let computerScore = 0;

const GAME_RULES = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

const RESULT_MESSAGES = {
  tie: "It's a tie!",
  player: 'You win this round!',
  computer: 'Computer wins this round!',
};

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);

  // Depending on the number obtained from randomNumber a move is returned
  switch (randomNumber) {
    case 0:
      return 'rock';
      break;
    case 1:
      return 'paper';
      break;
    case 2:
      return 'scissors';
  }
}

function getPlayerChoice(e) {
  let choice = e.target;

  // The button clicked determines which move is returned
  if (
    choice.id === 'rock' ||
    choice.id === 'paper' ||
    choice.id === 'scissors'
  ) {
    removeTransition();

    // Add class to clicked element
    choice.classList.add('picked');
    return choice.id;
  }
}

function handleChoice(e) {
  // Initial information is cleared
  INFO_MESSAGE.textContent = '';

  // The value of "getPlayerChoice" and "getComputerChoice" are stored in variables
  const playerChoice = getPlayerChoice(e);
  const computerChoice = getComputerChoice();
  const capitalizedPlayer = capitalizeFirstChar(playerChoice);
  const capitalizedComputer = capitalizeFirstChar(computerChoice);

  // setMessage with the values of both choices and play the round
  setMessage(
    `${capitalizedPlayer} against ${capitalizedComputer}`,
    INFO_MESSAGE
  );
  playRound(playerChoice, computerChoice);
}

function playRound(player, computer) {
  const winner = determineWinner(player, computer);
  const scores = updateScores(winner);

  displayRoundInfo(winner);
  displayScore(scores.playerScore, scores.computerScore);

  if (scores.playerScore >= 5 || scores.computerScore >= 5) endGame();
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'tie';

  // This checks if playerChoice and computerChoice are the same, based on GAME_RULES
  return GAME_RULES[playerChoice] === computerChoice ? 'player' : 'computer';
}

function updateScores(winner) {
  if (winner === 'player') playerScore += 1;
  if (winner === 'computer') computerScore += 1;
  return { playerScore, computerScore };
}

// TODO: ADD FEATURE TO END GAME
function endGame() {
  disableButtons();
}

/* 
Terms to end game:
  * if playerScore or computer are higher than 5, stop game

Actions to do END OF GAME
  * Clear messages
  * Add  a new End Of Game Message
  * Disable game buttons
  * Display PLAY AGAIN button
*/
