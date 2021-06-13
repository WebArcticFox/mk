/*jshint esversion: 6 */

// Initialize base elements
const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('form.control');
const chat = document.querySelector('.chat');

// Logs
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [player2]: [player1] - труп',
        '[player1] погиб от удара бойца [player2]',
        'Результат боя: [player1] - жертва, [player2] - убийца',
    ],
    hit: [
        '[player2] пытался сконцентрироваться, но [player1] разбежавшись раздробил копчиком левое ухо врага.',
        '[player2] расстроился, как вдруг, неожиданно [player1] случайно раздробил грудью грудину противника.',
        '[player2] зажмурился, а в это время [player1], прослезившись, раздробил кулаком пах оппонента.',
        '[player2] чесал <вырезано цензурой>, и внезапно неустрашимый [player1] отчаянно размозжил грудью левый бицепс оппонента.',
        '[player2] задумался, но внезапно [player1] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[player2] ковырялся в зубах, но [player1] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[player2] вспомнил что-то важное, но внезапно [player1] зевнув, размозжил открытой ладонью челюсть противника.',
        '[player2] осмотрелся, и в это время [player1] мимоходом раздробил стопой аппендикс соперника.',
        '[player2] кашлянул, но внезапно [player1] показав палец, размозжил пальцем грудь соперника.',
        '[player2] пытался что-то сказать, а жестокий [player1] проснувшись размозжил копчиком левую ногу противника.',
        '[player2] забылся, как внезапно безумный [player1] со скуки, влепил удар коленом в левый бок соперника.',
        '[player2] поперхнулся, а за это [player1] мимоходом раздробил коленом висок врага.',
        '[player2] расстроился, а в это время наглый [player1] пошатнувшись размозжил копчиком губы оппонента.',
        '[player2] осмотрелся, но внезапно [player1] робко размозжил коленом левый глаз противника.',
        '[player2] осмотрелся, а [player1] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[player2] ковырялся в зубах, как вдруг, неожиданно [player1] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[player2] пришел в себя, и в это время [player1] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[player2] пошатнулся, а в это время [player1] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[player1] потерял момент и храбрый [player2] отпрыгнул от удара открытой ладонью в ключицу.',
        '[player1] не контролировал ситуацию, и потому [player2] поставил блок на удар пяткой в правую грудь.',
        '[player1] потерял момент и [player2] поставил блок на удар коленом по селезенке.',
        '[player1] поскользнулся и задумчивый [player2] поставил блок на тычок головой в бровь.',
        '[player1] старался провести удар, но непобедимый [player2] ушел в сторону от удара копчиком прямо в пятку.',
        '[player1] обманулся и жестокий [player2] блокировал удар стопой в солнечное сплетение.',
        '[player1] не думал о бое, потому расстроенный [player2] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[player1] обманулся и жестокий [player2] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

const getTime = () => {
    const date = new Date;
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

// Replace text in logs
const logsReplace = (text,player1,player2, time = '') => {
    if(!time){
        return text.replace('[player1]', player1.name).replace('[player2]', player2.name);
    }else{
        return text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', time);
    }
};

// Generate all logs
const generateLogs = (type, player1 = {}, player2 = {}, damage = 0) => {
    let text = '';
    switch (type) {
        case 'hit':
            text = `${getTime()} | ${logsReplace(logs[type][getRandom(logs[type].length)-1], player2, player1)} | [-${damage}] | [${player1.hp}/100]`; // +
            break;
        case 'defence':
            text = `${getTime()} | ${logsReplace(logs[type][getRandom(logs[type].length)-1], player1, player2)}`; // +
            break;
        case 'start':
            text = `${logsReplace(logs[type], player1, player2, getTime())}`; // +
            break;
        case 'end':
            text = `${getTime()} | ${logsReplace(logs[type][getRandom(logs[type].length)-1], player1, player2)}`;
            break;
        case 'draw':
            text = `${getTime()} | ${logs.draw}`;
            break;
        default:
            text = 'Игра немного затупила и решила что надо пообщаться в чате :)';
    }

    const newElementChat = `<p>${text}</p>`;
    chat.insertAdjacentHTML('afterbegin', newElementChat);
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
const showResult = () => {
    // Hidden form and create reload button
    if(player1.hp===0 || player2.hp===0) {
        formFight.style.display = 'none';
        createReloadButton();
        // Show result
        if(player1.hp && !player2.hp) {
            userWins(player1.name);
        } else if (!player1.hp && player2.hp) {
            userWins(player2.name);
        } else if (!player1.hp && !player2.hp) {
            userWins();
        }
    }
};

// Player/Bot wins
const userWins = (name) => {
    // Show player win
    let loseTitle = createElement('div', 'loseTitle');
    if(name){
        loseTitle.innerHTML = `${name} WIN!`;
        switch (name) {
            case (player1.name):
                generateLogs('end', player2, player1);
                break;
            case (player2.name):
                generateLogs('end', player1, player2);
                break;
        }

    }else{
        loseTitle.innerHTML = `DRAW!`;
        generateLogs('draw')
    }
    arenas.append(loseTitle);
}

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

// Player Attack
const playerAttack = () => {
    const attack = {}; // User Attack
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
    return attack;
}

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
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Blade','Legs','Scorpion'],
    attack() {
        console.log(`${this.name} Fight...`);
    },
    elHP, renderHP, changeHP
};

let fight = (attack, defence, playerHit,playerDefence) => {
    if(attack.hit!==defence.defence) {
        playerDefence.changeHP(attack.value);
        generateLogs('hit', playerDefence, playerHit, attack.value);
    }else{
        generateLogs('defence', playerHit, playerDefence);
    }
};

formFight.addEventListener('submit',(e) => {
    e.preventDefault();

    const enemy = enemyAttack(); // Bot Attack
    const attack = playerAttack(); // User Attack

    // Fight
    fight(attack,enemy,player1,player2); // Fight User
    fight(enemy,attack,player2,player1); // Fight Bot

    reRender(); // Rerender HP

    showResult();

});

// Create players in Arena
arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));
generateLogs('start',player1, player2)