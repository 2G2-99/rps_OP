/*
Upon run of the program, a prompt will appear asking for an input of "Rock", "Paper" or "Scissors". Then the program will compare the input against a random result from the machine, and depending on the combination the user might win or lose.

To win the game, the player must beat the machine in two of the three rounds.

roundTarget;
roundCounter;
playerPoints;
machinePoints;

Input move
  if move is "Rock"
    store Player's move
  if move is "Paper"
    store Player's move
  if move is "Scissors"
    store Player's move
  else
    alert
    input move again

Generate machine move
  generate random integer
  if random integer is 1
    the move is "Rock"
  if random integer is 2
    the move is "Paper"
  if random integer is 3
    the move is "Scissors"
  store machine move

Winning move
  if "Rock" VS "Paper"
    "Paper" wins
  if "Paper" VS "Scissors"
    "Scissors" wins
  if "Scissors" VS "Rock"
    "Rock" wins

Play round
  roundCounter + 1
  if PlayerMove and MachineMove are the same
    no points
  if PlayerMove beats machineMove
    playerPoints + 1
  if machineMove beats PlayerMove
    machinePoints + 1

Play Game
  while roundCounter < roundTarget
    return playRound
  if playerPoints > machinePoints
    return "Player wins with ___ points"
  else
    return "Machine wins with ___ points"

 */

let roundCounter = 1;
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let randomNumber = parseInt(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      window.alert(`The machine is playing with "rock"`);
      return "rock";
      break;
    case 1:
      window.alert(`The machine is playing with "paper"`);
      return "paper";
      break;
    case 2:
      window.alert(`The machine is playing with "scissors"`);
      return "scissors";
  }
}

function getPlayerChoice() {
  let input = window.window
    .prompt(
      'Please select one of the three movements.\n"Rock", "Paper" or "Scissors"',
      ""
    )
    .toLowerCase();

  if (input === "rock" || input === "paper" || input === "scissors") {
    window.alert(`You are playing with "${input}"`);
    return input;
  } else {
    window.alert("Please enter a valid move");
    return getPlayerChoice();
  }
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    window.alert(`It's a tie, no one scores!.`);
    window.alert(
      `The score is:\n Player ${playerScore} - CPU ${computerScore}`
    );
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore += 1;
    window.alert(`You won, ${playerChoice} beats ${computerChoice}!`);
    window.alert(
      `The score is:\n Player ${playerScore} - CPU ${computerScore}`
    );
  } else if (
    (computerChoice === "rock" && playerChoice === "scissors") ||
    (computerChoice === "paper" && playerChoice === "rock") ||
    (computerChoice === "scissors" && playerChoice === "paper")
  ) {
    computerScore += 1;
    window.alert(`You lose, ${computerChoice} beats ${playerChoice}!`);
    window.alert(
      `The score is:\n Player ${playerScore} - CPU ${computerScore}`
    );
  }
}

function playGame() {
  while (roundCounter <= 5) {
    window.alert(`ROUND ${roundCounter}`);
    playerMove = getPlayerChoice();
    computerMove = getComputerChoice();
    playRound(playerMove, computerMove);
    roundCounter += 1;
  }

  window.alert(`FINAL SCORE:\n Player ${playerScore} - CPU ${computerScore}`);

  if (playerScore > computerScore) {
    window.alert(`You win the game!`);
  } else if (computerScore > playerScore) {
    window.alert(`You lose the game!`);
  } else {
    window.alert(`Its a draw`);
  }
}

playGame();
