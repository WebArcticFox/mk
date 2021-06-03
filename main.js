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
    document.querySelector('.arenas').append(playerDiv)
}


// Initialize players
const player_1 = {
    name: 'Sonya',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Gun','Legs','Arms'],
    attack() {
        console.log(`${this.name} Fight...`)
    }
}

const player_2 = {
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Blade','Legs','Scorpion'],
    attack() {
        console.log(`${this.name} Fight...`)
    }
}


// Create players in Arena
createPlayer('player1', player_1)
createPlayer('player2', player_2)