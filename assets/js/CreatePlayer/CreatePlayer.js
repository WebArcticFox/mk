// Select player life
import createElement from "../utils/createElement.js";

export const elHP = function() {
    return document.querySelector(`.player${this.player} .life`);
}

// Rerender player HP
export const renderHP = function() {
    let lifeDiv = this.elHP();
    lifeDiv.style.width = this.hp+'%';
}

// Change players HP
export const changeHP = function(countHPRemove) {
    this.hp -= countHPRemove;
    if(this.hp<0){
        this.hp = 0;
    }
}

// Create Players
export const createPlayer = (playerObject) => {
    const {player, name, hp, img} = playerObject;
    // Create elements
    let playerDiv = createElement('div', `player${player}`);
    let progressbarDiv = createElement('div', 'progressbar');
    let characterDiv = createElement('div', 'character');
    let lifeDiv = createElement('div', 'life');
    let nameDiv = createElement('div','name');
    let playerImg = createElement('img');

    // Add attributes
    playerImg.setAttribute('src',img);
    lifeDiv.style.width = hp+'%';
    nameDiv.innerHTML = name;

    // Create player html
    characterDiv.append(playerImg);
    progressbarDiv.append(lifeDiv,nameDiv);
    playerDiv.append(progressbarDiv, characterDiv);

    return playerDiv;
};