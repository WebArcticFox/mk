// Initialize base elements
const button = document.querySelector('.button')
const arenas = document.querySelector('.arenas')

// Initialize function
// Random
const getRandom = (maxValue) => {
    return Math.ceil(Math.random()*maxValue)
}

// Select player life
function elHP () {
    return document.querySelector(`.player${this.player} .life`)
}

// Rerender player HP
function renderHP () {
    let lifeDiv = this.elHP()
    lifeDiv.style.width = this.hp+'%'
}

// Change players HP
function changeHP (countHPRemove) {
    this.hp -= countHPRemove
    if(this.hp<0){
        this.hp = 0
    }
    this.renderHP()
}

// Create element (div/img)
function createElement (tag, classes) {
    let element = document.createElement(tag)
    if(classes){
        element.classList.add(classes)
    }
    return element
}

// Show result
const showResult = (name) => {
    // Show player win
    let loseTitle = createElement('div', 'loseTitle')
    if(name){
        loseTitle.innerHTML = `${name} WIN!`
    }else{
        loseTitle.innerHTML = `DRAW!`
    }
    arenas.append(loseTitle)
    arenas.append(createReloadButton())
}

// Create Reload Button
const createReloadButton = () => {
    let reloadWrap = createElement('div','reloadWrap')
    let reloadButton = createElement('button', 'button')
    reloadButton.innerHTML = 'Restart'
    reloadButton.addEventListener('click',() => {
        window.location.reload()
    })
    reloadWrap.appendChild(reloadButton)
    return reloadWrap
}

// Create Players
const createPlayer = (player) => {
    // Create elements
    let playerDiv = createElement('div', `player${player.player}`)
    let progressbarDiv = createElement('div', 'progressbar')
    let characterDiv = createElement('div', 'character')
    let lifeDiv = createElement('div', 'life')
    let nameDiv = createElement('div','name')
    let playerImg = createElement('img')

    // Add attributes
    playerImg.setAttribute('src',player.img)
    lifeDiv.style.width = player.hp+'%'
    nameDiv.innerHTML = player.name

    // Create player html
    characterDiv.append(playerImg)
    progressbarDiv.append(lifeDiv,nameDiv)
    playerDiv.append(progressbarDiv, characterDiv)

    return playerDiv
}

// Initialize players
const player1 = {
    player: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Gun','Legs','Arms'],
    attack() {
        console.log(`${this.name} Fight...`)
    },
    elHP, renderHP, changeHP
}

const player2 = {
    player: 2,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Blade','Legs','Scorpion'],
    attack() {
        console.log(`${this.name} Fight...`)
    },
    elHP, renderHP, changeHP
}


// Button RANDOM (Fight)
button.addEventListener('click',function () {
    player1.changeHP(getRandom(20))
    player2.changeHP(getRandom(20))
    // Disabled button
    if(player1.hp===0 || player2.hp===0) {
        button.disabled = true
    }
    // Show result
    if(player1.hp && !player2.hp) {
        showResult(player1.name)
    } else if (!player1.hp && player2.hp) {
        showResult(player2.name)
    } else if (!player1.hp && !player2.hp) {
        showResult()
    }
})






// Create players in Arena
arenas.append(createPlayer(player1))
arenas.append(createPlayer(player2))