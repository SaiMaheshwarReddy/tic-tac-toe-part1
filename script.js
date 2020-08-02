const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessage = document.querySelector('[data-winning-message-text]')
const restartBtn = document.getElementById('restartButton')
const whosTurn = document.getElementById('whosTurn')
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        whosTurn.innerHTML = "It's X's turn"
        cell.removeEventListener('click', cellClicked)
        cell.addEventListener('click', cellClicked, { once: true })
    })
    displayHover()
    winningMessageElement.classList.remove('show')


}

function cellClicked(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        displayHover()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    } else {
        if (circleTurn) {
            winningMessage.innerText = "O's Wins!"
        } else {
            winningMessage.innerText = "X's Wins!"
        }
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
    if (circleTurn) {
        whosTurn.innerHTML = "It's O's turn"
        whosTurn.style.color = 'white'
    } else {
        whosTurn.innerHTML = "It's X's turn"
        whosTurn.style.color = 'black'
    }
}

function displayHover() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}