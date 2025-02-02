// # UI
// Containers
const SCOREBOARD = document.querySelector('#scoreboard.container');
const INFO = document.querySelector('#info');
const SCORE = document.querySelector('#scores');
const BUTTONS_LIST = document.querySelector('#btn-list');

// Info & Scores
const INFO_MESSAGE = document.querySelector('#info .message');
const SCORE_MESSAGE = document.querySelector('#score .message');

// Buttons
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
  choice.addEventListener('click', handleChoice);
});

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

// Remove 'picked' class from any element that has it
function removeTransition() {
  document.querySelectorAll('.picked').forEach(element => {
    element.classList.remove('picked');
  });
}

// # GAME
let playerScore = 0;
let computerScore = 0;

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

  // setMessage with the values of both choices and play the round
  setMessage(`${playerChoice} against ${computerChoice}`, INFO_MESSAGE);
  playRound(playerChoice, computerChoice);
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    setMessage(`It's a tie, no one scores!.`, INFO_MESSAGE);
    setMessage(`Player ${playerScore} - CPU ${computerScore}`, SCORE_MESSAGE);
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    playerScore += 1;
    setMessage(
      `You won, ${playerChoice} beats ${computerChoice}!`,
      INFO_MESSAGE
    );
    setMessage(`Player ${playerScore} - CPU ${computerScore}`, SCORE_MESSAGE);
  } else if (
    (computerChoice === 'rock' && playerChoice === 'scissors') ||
    (computerChoice === 'paper' && playerChoice === 'rock') ||
    (computerChoice === 'scissors' && playerChoice === 'paper')
  ) {
    computerScore += 1;
    setMessage(
      `You lose, ${computerChoice} beats ${playerChoice}!`,
      INFO_MESSAGE
    );
    setMessage(`Player ${playerScore} - CPU ${computerScore}`, SCORE_MESSAGE);
  }
}
