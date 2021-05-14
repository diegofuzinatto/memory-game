const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

startGame()

function startGame() {
    initializeCards(game.createCardsFromTechs())
}

function updateMovement(){
    let movements = document.getElementById("movement")
    movements.innerHTML = game.movements
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = ''

    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener("click", flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    
    if(face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "./assets/images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    } else {
        let iconElement = document.createElement('img')
        iconElement.src = "./assets/images/flag.png"
        cardElementFace.appendChild(iconElement)
    }
    element.appendChild(cardElementFace)
}

function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            updateMovement()
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    updateRankingBD()
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = 'flex'
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)

            };
        }
    }

}

function createRanking() {
    let ranking = document.getElementById("ranking")

    for (var user of game.ranking) {
        let li = document.createElement("li")
        li.innerHTML = user.name + ": "

        let span = document.createElement("span")
        span.innerHTML = user.movements

        li.appendChild(span)
        ranking.appendChild(li)
    }
}

function updateRanking() {
    let li = document.getElementsByTagName(li)
    let span = document.getElementsByTagName(span)
    let i = 0

    for (var user of game.ranking) {
        li[i].innerHTML = user.name + ": "
        span[i].innerHTML = user.movements
    }
}


function restart() {
    game.clearCards()
    game.clearMovements()
    updateMovement()
    startGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = 'none'
}