const cellElements = document.querySelectorAll('[data-cell]');

for (const cell of cellElements) {
    cell.addEventListener('click', handleClick, { once: true })
}

const handleClick = () => {
    //colocar a lógica do jogo aqui

    //checar por vitória

    //checar por empate
}