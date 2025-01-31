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

    //In case the parent element has more than one child then the last child is removed
    if (parent.childNodes.length > 1) {
      parent.removeChild(parent.lastChild);
    }

    // We fill the new "paragraph" element and fill it with the message
    paragraph.textContent = text;
    parent.appendChild(paragraph);
  }
}

// # GAME
let roundCounter = 1;
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let randomNumber = parseInt(Math.random() * 3);

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

  if (
    choice.id === 'rock' ||
    choice.id === 'paper' ||
    choice.id === 'scissors'
  ) {
    choice.setAttribute('style', 'background: #1E1E24; color: #F7F7FF; ');
    return choice.id;
  }
}

function handleChoice(e) {
  INFO_MESSAGE.textContent = '';

  const playerChoice = getPlayerChoice(e);
  const computerChoice = getComputerChoice();
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
