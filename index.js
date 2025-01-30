// # DOM

/*
 * Change all console.logs for DOM elements

 */

const playGround = document.querySelector('#playground');
const selectionButtons = document.createElement('div');
const messages = document.createElement('div');

selectionButtons.setAttribute('id', 'selection');
selectionButtons.classList.add('container');

messages.setAttribute('id', 'messages');
messages.classList.add('container');

const ROCK = document.createElement('button');
ROCK.setAttribute('id', 'rock');
ROCK.textContent = 'ROCK';
selectionButtons.appendChild(ROCK);

const PAPER = document.createElement('button');
PAPER.setAttribute('id', 'paper');
PAPER.textContent = 'PAPER';
selectionButtons.appendChild(PAPER);

const SCISSORS = document.createElement('button');
SCISSORS.setAttribute('id', 'scissors');
SCISSORS.textContent = 'SCISSORS';
selectionButtons.appendChild(SCISSORS);

let choicesList = selectionButtons.querySelectorAll('button');

choicesList.forEach(choice => {
  choice.classList.add('btn');
  choice.addEventListener('click', handleChoice);
});

playGround.appendChild(selectionButtons);
playGround.appendChild(messages);

function createMessage(text) {
  const message = document.createElement('p');
  message.textContent = text;
  message.classList.add('message');
  messages.appendChild(message);
}

//////////////////////////////////////////////////////////////////

// # GAME
let roundCounter = 1;
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let randomNumber = parseInt(Math.random() * 3);

  switch (randomNumber) {
    case 0:
      createMessage(`The machine is playing with "rock"`);
      return 'rock';
      break;
    case 1:
      createMessage(`The machine is playing with "paper"`);

      return 'paper';
      break;
    case 2:
      createMessage(`The machine is playing with "scissors"`);

      return 'scissors';
  }
}

function getPlayerChoice(e) {
  let choice = e.target;
  let choiceMessage = `You are playing with "${choice.id}"`;

  if (
    choice.id === 'rock' ||
    choice.id === 'paper' ||
    choice.id === 'scissors'
  ) {
    createMessage(choiceMessage);
    choice.setAttribute('style', 'background: #1E1E24; color: #F7F7FF; ');
    return choice.id;
  }
}

function handleChoice(e) {
  const playerChoice = getPlayerChoice(e);
  const computerChoice = getComputerChoice();

  playRound(playerChoice, computerChoice);
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    createMessage(`It's a tie, no one scores!.`);
    createMessage(
      `The score is:\n Player ${playerScore} - CPU ${computerScore}`
    );
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    playerScore += 1;
    createMessage(`You won, ${playerChoice} beats ${computerChoice}!`);
    createMessage(
      `The score is:\n Player ${playerScore} - CPU ${computerScore}`
    );
  } else if (
    (computerChoice === 'rock' && playerChoice === 'scissors') ||
    (computerChoice === 'paper' && playerChoice === 'rock') ||
    (computerChoice === 'scissors' && playerChoice === 'paper')
  ) {
    computerScore += 1;
    createMessage(`You lose, ${computerChoice} beats ${playerChoice}!`);
    createMessage(
      `The score is:\n Player ${playerScore} - CPU ${computerScore}`
    );
  }
}
