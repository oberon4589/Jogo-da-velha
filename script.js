const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const RestarButton = document.querySelector('[data-restart-button]');

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
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    }

    setBoardHoverClass();
    board.classList.add('x');
    winningMessage.classList.remove('show-winning-message');
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

const handleRestartClick = () => {

}

const checkWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => { //Vê se alguma celula do array é verdadeira
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const checkDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.add('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    }else {
        board.classList.add('x');
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
}

const handleClick = (e) => {
    //colocar a lógica do jogo aqui
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);
    //checar por vitória

    const isWin = checkWin(classToAdd);
    
    //checar por empate

    const isDraw = checkDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        //Mudar simbolo
    swapTurns();
    }
}


for (const cell of cellElements) {
    cell.addEventListener('click', handleClick, { once: true });
}

startGame();
RestarButton.addEventListener('click', startGame);