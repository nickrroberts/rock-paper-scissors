
//Welcome message

console.log (`

      Rock ✊         Paper ✋       Scissors ✌️
    _______        _______        _______
---'   ____ )  ---'    ____)  ---'   ____)____
      (_____)         (_____)          ______)
      (_____)         (_____)       __________)
      (____)          (_____)      (____)
---.__(___)      ---.________)  ---.__(___)
    
    `);

let userScore = 0;
let computerScore = 0;
let userChoice;
let computerChoice;
const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };
const resultMessages = {
    player: "You win the round! 🎉",
    computer: "Computer wins the round. 🤖",
    tie: "It's a tie! 😐",
    playerWin: "That's best of five! Congrats, you win the game! Refresh to play again.",
    computerWin: "That's best of five. Sorry, you lose to the machine. Refresh to play again." 

};
let gameActive = true; // Track game state
const playButton = document.querySelector(".submit");
const userInput = document.getElementById("entry")
const modal = document.getElementById("gameModal");
const modalMessage = document.getElementById("modal-message");
const closeButton = document.querySelector(".close");


playButton.addEventListener('click', handleGame);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleGame();
    }
});

async function handleGame() {
    if (!gameActive) return; // Prevent interactions after game ends

    let userChoice = await userMove();
    let computerChoice = computerMove();
    let result = decideWinner(userChoice, computerChoice);
    updateScore(result);
    displayResult(result);

    if (checkWin() !== 'continue') {
        gameActive = false; // Stop the game once someone wins
        displayResult(checkWin()); // Show final message
    }
}


//Ask user for their move
function userMove() {
    return new Promise( resolve => {

        function handleInput () {
            //normalize any weird case in the submission
            let userMove = userInput.value.toLowerCase();
            if (["rock", "paper", "scissors"].includes(userMove)) {
                console.log(`User move: ${userMove}`);
                userInput.value = "";
                resolve(userMove);
            } else {
                alert("Invalid choice. Please enter 'Rock', 'Paper', or 'Scissors'.");
            }
        }
        handleInput();
    });
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
function decideWinner (userChoice, computerChoice) {
    if (winConditions[userChoice] == computerChoice) {
        return 'player'
    } 
      //If equivalent, say tie
    else if (userChoice == computerChoice) { 
        return 'tie'
    }
    else {
        return 'computer'
    }
}

function updateScore (result) {
    if (result == 'player') {
        document.getElementById("human-score").textContent = `Human: ${++userScore}`;
    }
    if (result == 'computer') {
        document.getElementById("computer-score").textContent = `Computer: ${++computerScore}`;
    }
}

function displayResult (result) {
    document.getElementById("message").textContent = resultMessages[result];
    if (result=='playerWin') {
        openModal("🎉 You won the game! 🎉");
    }
    if (result=='computerWin') {
        openModal("🤖 Computer won the game 🤖");
    }

}

//Set win or loss based on winning or losing three out of five rounds
function checkWin () {
    if (userScore > 2) {
        return 'playerWin';
    }
    if (computerScore > 2) {
        return 'computerWin';
    }
    else { return 'continue'}
}

// Function to open the modal with a message
function openModal(message) {
    modalMessage.textContent = message; // Set modal message
    modal.style.display = "flex"; // Show modal
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Close modal when the close button is clicked
closeButton.addEventListener("click", closeModal);

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});


