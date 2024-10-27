let cells = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#reset");
let newGmBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turno = true;

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

const resetGame = () =>{
    turno = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (cell.classList.contains('taken')) {
            return;
        }

        if (turno) {
            cell.innerText = "O";
            turno = false;
        } else {
            cell.innerText = "X"; 
            turno = true;
        }
        cell.classList.add('taken');

        checkWinner();
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
    disabledBoxes();
}

const checkWinner = () => {
    // Check for a winner
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].innerText &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText) {
            console.log("winner", cells[a].innerText);

            showWinner(cells[a].innerText);
            return;
        }
    }

    const isDraw = Array.from(cells).every(cell => cell.classList.contains('taken'));
    if (isDraw) {
        showDraw();
    }
};

const showDraw = () => {
    msg.innerText = "It's a draw!"; 
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

newGmBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);