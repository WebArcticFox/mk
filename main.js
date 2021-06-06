// Initialize players
const player1 = {
    player: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Gun','Legs','Arms'],
    attack() {
        console.log(`${this.name} Fight...`)
    }
}

const player2 = {
    player: 2,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Blade','Legs','Scorpion'],
    attack() {
        console.log(`${this.name} Fight...`)
    }
}

const button = document.querySelector('.button')
const chat = document.querySelector('.chat')
const arenas = document.querySelector('.arenas')


const createPlayer = (classUser,player) => {
    // Create elements
    let playerDiv = document.createElement("div")
    let progressbarDiv = document.createElement("div")
    let characterDiv = document.createElement("div")
    let lifeDiv = document.createElement("div")
    let nameDiv = document.createElement("div")
    let playerImg = document.createElement("img")

    // Add classes
    playerDiv.classList.add(classUser)
    progressbarDiv.classList.add('progressbar')
    characterDiv.classList.add('character')
    lifeDiv.classList.add('life')
    nameDiv.classList.add('name')

    // Add attributes
    playerImg.setAttribute('src',player.img)
    lifeDiv.style.width = player.hp+'%'
    nameDiv.innerHTML = player.name

    // Create player html
    characterDiv.append(playerImg)
    progressbarDiv.append(lifeDiv,nameDiv)
    playerDiv.append(progressbarDiv, characterDiv)

    // Add player in Arena
    arenas.append(playerDiv)
}

const random = (player) => {
    // Select life
    let playerDiv = document.querySelector(`.player${player.player}`)
    let lifeDiv = playerDiv.querySelector('.life')

    // Calculate hp
    let hpRemove = Math.ceil(Math.random()*(20 - 1)+1);
    if(hpRemove>=player.hp){
        player.hp = 0
    }else{
        player.hp -= hpRemove
    }
    // Change HTML
    lifeDiv.style.width = player.hp+'%'
}

// Fight
const changeHP = () => {
    // Change HP Player 1
    random(player1)
    if(player1.hp){
        // Change HP Player 2
        random(player2)
        if(!player2.hp){
            // Player 1 Win
            winsUser(player1.name)
        }
    }else{
        // Player 2 Win
        winsUser(player2.name)
    }

}

const winsUser = (name) => {
    // Disabled button
    button.disabled = true

    // Show player win
    let loseTitle = document.createElement('div')
    loseTitle.classList.add('loseTitle')
    loseTitle.innerHTML = `${name} WIN!`
    arenas.append(loseTitle)
}



// Create players in Arena
createPlayer('player1', player1)
createPlayer('player2', player2)