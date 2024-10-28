let cells = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#reset");
let newGmBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turno;
let oWins = 0;
let xWins = 0;

let currentStartingPlayer = 'O';

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const updateTurnHighlight = () => {
    if (turno) {
        document.querySelector("#score-o").classList.add("highlight");
        document.querySelector("#score-x").classList.remove("highlight");
    } else {
        document.querySelector("#score-o").classList.remove("highlight");
        document.querySelector("#score-x").classList.add("highlight");
    }
};

const resetGame = () => {
    oWins = 0;
    xWins = 0;
    
    document.querySelector("#score-o").innerText = `O Wins: ${oWins}`;
    document.querySelector("#score-x").innerText = `X Wins: ${xWins}`;

    newGame();
}

const newGame = () => {
    turno = (currentStartingPlayer === 'O'); 
    enabledBoxes();
    msgContainer.classList.add("hide");
    updateTurnHighlight();
}


const toggleStartingPlayer = () => {
    currentStartingPlayer = currentStartingPlayer === 'O' ? 'X' : 'O';
}

const endGame = () => {
    const winner = checkWinner();
    if (winner) {
        showWinner(winner);
    } else {
        const isDraw = Array.from(cells).every(cell => cell.classList.contains('taken'));
        if (isDraw) {
            showDraw();
        }
    }
    toggleStartingPlayer();
}

newGmBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (cell.classList.contains('taken')) {
            return;
        }

        cell.innerText = turno ? "O" : "X"; 
        cell.classList.add('taken');

        endGame();
        
        turno = !turno; 
        updateTurnHighlight();
    });
});

const disabledBoxes = () => {
    cells.forEach((cell) => {
        cell.classList.add('taken');
        cell.disabled = true;
    });
}

const enabledBoxes = () => {
    cells.forEach((cell) => {
        cell.classList.remove('taken'); 
        cell.innerText = ""; 
        cell.disabled = false;
    });
}

const showWinner = (winner) => {
    msg.innerText = `${winner} won the game!`; 
    msgContainer.classList.remove("hide");

    if (winner === "O") {
        oWins++;
        document.querySelector("#score-o").innerText = `O Wins: ${oWins}`;
    } else if (winner === "X") {
        xWins++;
        document.querySelector("#score-x").innerText = `X Wins: ${xWins}`;
    }

    disabledBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].innerText &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText) {
            return cells[a].innerText;
        }
    }
    return null;
}

const showDraw = () => {
    msg.innerText = "It's a draw!"; 
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

newGmBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);

updateTurnHighlight();
