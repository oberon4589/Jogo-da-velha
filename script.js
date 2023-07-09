const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');

let isCircleTurn = false;

const winningCombinations = [
    [0,1,2], //linha 1
    [3,4,5], //linha 2
    [6,7,8], //linha 3

    [0,3,6], //vertical 1
    [1,4,7], //vertical 2
    [2,5,8], //vertical 3

    [0,4,8], //diagonal 1
    [2,4,6]  //diagonal 2

]

const startGame = () => {
    for (const cell of cellElements) {
        cell.addEventListener('click', handleClick, { once: true })
    }

    isCircleTurn = false;

    board.classList.add('x');
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageElement.innerText = 'Empate!';
    } else {
        winningMessageElement.innerText = isCircleTurn 
        ? "Circulo venceu!"
        : "X venceu!";
    }

    winningMessage.classList.add('show-winning-message');
}

const checkWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => { //Vê se alguma celula do array é verdadeira
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.add('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    }else {
        board.classList.add('x');
    }
}

const handleClick = (e) => {
    //colocar a lógica do jogo aqui
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);
    //checar por vitória

    const isWin = checkWin(classToAdd);
    if (isWin) {
        endGame(false);
    }

    //checar por empate

    //Mudar simbolo
    swapTurns();
}

for (const cell of cellElements) {
    cell.addEventListener('click', handleClick, { once: true });
}

startGame();