/*jshint esversion: 6 */

// Initialize base elements
const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('form.control');

// Initialize damage
const HIT = {
    head: 50,
    body: 30,
    foot: 20,
};
const ATTACK = ['head','body','foot'];

// Initialize function

// RenderHP
const reRender = () => {
    player1.renderHP();
    player2.renderHP();
};

// Random
const getRandom = (maxValue) => {
    return Math.ceil(Math.random()*maxValue);
};

// Select player life
function elHP () {
    return document.querySelector(`.player${this.player} .life`);
}

// Rerender player HP
function renderHP () {
    let lifeDiv = this.elHP();
    lifeDiv.style.width = this.hp+'%';
}

// Change players HP
function changeHP (countHPRemove) {
    this.hp -= countHPRemove;
    if(this.hp<0){
        this.hp = 0;
    }
}

// Create element (div/img)
function createElement (tag, classes) {
    let element = document.createElement(tag);
    if(classes){
        element.classList.add(classes);
    }
    return element;
}

// Show result
const showResult = (name) => {
    // Show player win
    let loseTitle = createElement('div', 'loseTitle');
    if(name){
        loseTitle.innerHTML = `${name} WIN!`;
    }else{
        loseTitle.innerHTML = `DRAW!`;
    }
    arenas.append(loseTitle);
};

// Create Reload Button
const createReloadButton = () => {
    let reloadWrap = createElement('div','reloadWrap');
    let reloadButton = createElement('button', 'button');
    reloadButton.innerHTML = 'Restart';
    reloadButton.addEventListener('click',() => {
        window.location.reload();
    });
    reloadWrap.appendChild(reloadButton);
    arenas.append(reloadWrap);
};

// Bot attack
const enemyAttack = () => {
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    };
};

// Create Players
const createPlayer = (player) => {
    // Create elements
    let playerDiv = createElement('div', `player${player.player}`);
    let progressbarDiv = createElement('div', 'progressbar');
    let characterDiv = createElement('div', 'character');
    let lifeDiv = createElement('div', 'life');
    let nameDiv = createElement('div','name');
    let playerImg = createElement('img');

    // Add attributes
    playerImg.setAttribute('src',player.img);
    lifeDiv.style.width = player.hp+'%';
    nameDiv.innerHTML = player.name;

    // Create player html
    characterDiv.append(playerImg);
    progressbarDiv.append(lifeDiv,nameDiv);
    playerDiv.append(progressbarDiv, characterDiv);

    return playerDiv;
};

// Initialize players
const player1 = {
    player: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Gun','Legs','Arms'],
    attack() {
        console.log(`${this.name} Fight...`);
    },
    elHP, renderHP, changeHP
};

const player2 = {
    player: 2,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Blade','Legs','Scorpion'],
    attack() {
        console.log(`${this.name} Fight...`);
    },
    elHP, renderHP, changeHP
};

let fight = (attack, defence, playerDefence) => {
    if(attack.hit!==defence.defence) {
        playerDefence.changeHP(attack.value);
    }
};




formFight.addEventListener('submit',(e) => {
    e.preventDefault();

    const enemy = enemyAttack(); // Bot Attack
    const attack = {}; // User Attack

    // Get user Attack
    for (let item of formFight) {
        if(item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if(item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    // Fight
    fight(attack,enemy,player2); // Fight User
    fight(enemy,attack,player1); // Fight Bot

    reRender(); // Rerender HP

    // Hidden form and create reload button
    if(player1.hp===0 || player2.hp===0) {
        formFight.style.display = 'none';
        createReloadButton();
    }

    // Show result
    if(player1.hp && !player2.hp) {
        showResult(player1.name);
    } else if (!player1.hp && player2.hp) {
        showResult(player2.name);
    } else if (!player1.hp && !player2.hp) {
        showResult();
    }

});

// Create players in Arena
arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));