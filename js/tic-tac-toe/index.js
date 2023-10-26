let turn = "x";
let symbols = [["", "", ""], ["", "", ""], ["", "", ""]];

const board = document.querySelector(".board");
const tiles = Array.from(document.querySelectorAll(".tile"));

board.addEventListener("click", ({ target }) => {
    const classes = Array.from(target.classList);
    if (classes.includes("tile") && classes.length !== 1) return;

    const idx = tiles.indexOf(target);

    target.classList.add(`tile-${turn}`);
    symbols[idx % 3][Math.floor(idx / 3)] = turn;
    turn = turn === "x" ? "o" : "x";

    displayTurn(turn);

    checkWin();
});

function displayTurn(turn) {
    // 1. zmień text elementu h1 z klasą "turn" zależnie od tego, czyja jest aktualnie tura
    document.querySelector('.turn').textContent = `${turn.toUpperCase()} turn`;
}

function checkWin() {
    // 2. sprawdź czy któryś z graczy wygrał pojedynek - jeśli tak wyświetla komunikat (możesz użyć np. funkcji "alert(...)")

    // check vertical
    symbols.forEach((item) => {
        if (item[0] === item[1] && item[1] === item[2] && item[0] !== '') {
            return alert(`wygral ${item[0]}`);
        }
    })

    // check horizontal
    Array.from({ length: 3 }).forEach((_, i) => {
        item = [symbols[0][i], symbols[1][i], symbols[2][i]]
        if (item[0] === item[1] && item[1] === item[2] && item[0] !== '') {
            return alert(`wygral ${item[0]}`);
        }
    })

    // check diagonal
    if ((symbols[0][0] === symbols[1][1] && symbols[1][1] === symbols[2][2] || symbols[0][2] === symbols[1][1] && symbols[1][1] === symbols[2][0]) && symbols[1][1] !== '') {
        return alert(`wygral ${symbols[1][1]}`);
    }

    // check draw
    if (symbols.every((item) => item.every((item2) => item2 !== ''))) {
        return alert('remis!');
    }
}

// 3. dodaj listener pod przycisk z napisaem "reset" tak, aby po jego kliknięciu wywołać funkcję reset
const resetElement = document.querySelector('.reset');
resetElement.addEventListener('click', () => {
    reset();
})

function reset() {
    // 4. zresetuj stan gry
    turn = "x";
    displayTurn(turn);
    symbols = [["", "", ""], ["", "", ""], ["", "", ""]];
    tiles.forEach((item) => item.classList = ['tile'])
}
