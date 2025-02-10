
//Welcome message

console.log (`

      Rock ✊         Paper ✋       Scissors ✌️
    _______        _______        _______
---'   ____ )  ---'    ____)  ---'   ____)____
      (_____)         (_____)          ______)
      (_____)         (_____)       __________)
      (____)          (_____)      (____)
---.__(___)      ---.________)  ---.__(___)
    
    Welcome! This is a best-of-five matchup against your browser to see who rules the console. 
    
    Click the 'Play Game' button to start.
    
    `);

//Ask ready to play? Have user hit the button to start
const readyButton = document.querySelector('.ready');
readyButton.addEventListener('click', startGame);

let userScore = 0;
let computerScore = 0;

function startGame() {
    let userChoice = userMove();
    if (userChoice === null) return; // Exit if user cancels
    let computerChoice = computerMove();
    decideRoundWinnerAndScore(userChoice, computerChoice);
}
//Ask user for their move
function userMove() {
    let userMove; 
    while (true) {
        userMove = prompt("Pick your move out of 'Rock, 'Paper', or 'Scissors'").toLowerCase();
        if (userMove == 'rock' || userMove == 'paper' || userMove == 'scissors') {
            console.log(`User move: ${userMove}`);
            return userMove;
        }
        else { 
            alert("Please choose a valid answer (this is sensitive to typos)");
        }
    }

}

//Select a move randomly between three values cases
function computerMove() {
    let randomNum = Math.random();
    let computerMove = "";
    //Based on the value, match to a move
    if (randomNum <= 0.33) {
        computerMove = 'rock';
    }
    else if (randomNum > 0.33 && randomNum <= 0.66) {
        computerMove = 'paper';
    }
    else if (randomNum > 0.66) {
        computerMove = 'scissors';
    }
    else {
        console.log("Something's not working")
       }
    console.log(`Computer move: ${computerMove}`);
    return computerMove;
}

//Select a winner of the round and update the score
function decideRoundWinnerAndScore (userChoice, computerChoice) {
    console.log(`Deciding winner with user choice of ${userChoice} and ${computerChoice} `);
    //Define win conditions
    const winConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
      };

    if (winConditions[userChoice] == computerChoice) {
        userScore++;
        console.log(`You win! The new score is you: ${userScore} and the computer: ${computerScore}`);
      } 
      //If equivalent, say tie
    else if (userChoice == computerChoice) { 
        console.log("Tie! Scores have not changed.");
    }
      
    else {
        computerScore++;
        console.log(`You lose! The new score is you: ${userScore} and the computer: ${computerScore}`);
      }

      checkWin();

}

//Set win or loss based on winning or losing three out of five rounds
function checkWin () {
    if (userScore > 2) {
        console.log("That's best of five! Congrats, you win the game!")
    }
    if (computerScore > 2) {
        console.log("That's best of five. Sorry, you lose to the machine. ")
    }
    else { 
        userChoice = userMove();
        computerChoice = computerMove();
        decideRoundWinnerAndScore(userChoice, computerChoice);
    }
}

//Play again?