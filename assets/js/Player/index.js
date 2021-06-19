import createElement from "../utils/createElement.js";

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${props.player}`;
        this.rootSelector = 'arenas';
    }

    elHP = () => { // Get life bar
        return document.querySelector(`.${this.selector} .life`);
    };

    renderHP = () => { // Change life bar player
        let lifeDiv = this.elHP();
        lifeDiv.style.width = this.hp+'%';
    };

    changeHP = (countHPRemove) => { // Change player HP
        this.hp -= countHPRemove;
        if(this.hp<0){
            this.hp = 0;
        }
    };

    createPlayer = () => { // Create player in Arena
        const playerDiv = createElement('div', `player${this.player}`);
        const progressbarDiv = createElement('div', 'progressbar');
        const characterDiv = createElement('div', 'character');
        const lifeDiv = createElement('div', 'life');
        const nameDiv = createElement('div','name');
        const playerImg = createElement('img');
        playerImg.setAttribute('src',this.img);

        // Add attributes
        lifeDiv.style.width = this.hp+'%';
        nameDiv.innerHTML = this.name;

        // Create player html
        characterDiv.append(playerImg);
        progressbarDiv.append(lifeDiv,nameDiv);
        playerDiv.append(progressbarDiv, characterDiv);

        const root = document.querySelector(`.${this.rootSelector}`);
        root.appendChild(playerDiv);
    };

}

export default Player