const statusDisplay = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `player ${currentPlayer} has won!`; // here currentPlayer are the two players suppose X and Y
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `this is ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn(); // .innerhTML le value nai change garera display gardinxa 
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', handleCellClick));
// query select garera click garda  event Listener chalaune
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if(gameState[clickedCellIndex] != "" || ! gameActive) {
        // cell ka index haru click bahye ki k gare game Active xa ki nai bhanera bujna ko lagi use hune logic
        return ;
    }
    handleCellPlayed(clickedCell, clickedCellIndex); 
    handleResultValidation();
}
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; 
    // here currentPlayers is X which is given as input from line 3
    clickedCell.innerHTML = currentPlayer;
     // Jati oota current player diye pani .innerHTML le kam gardai jane bhayo 
}
const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++)
    // yo loop le winingConditions bata value haru linxa 
    {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw =! gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }handlePlayerChange();
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}