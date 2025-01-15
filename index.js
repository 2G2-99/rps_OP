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

let roundTarget = 0;
let roundCounter = 0;
let playerpoints = 0;
let computerPoints = 0;

function getComputerChoice() {
  let randomNumber = parseInt(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "rock";
      break;
    case 1:
      return "paper";
      break;
    case 2:
      return "scissors";
  }
}

let computerMove = getComputerChoice();
