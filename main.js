/*jshint esversion: 6 */
import {createPlayer, changeHP, elHP, renderHP} from "./assets/js/CreatePlayer/CreatePlayer.js";  //  Create players
import generateLogs from "./assets/js/GenerateLogs/GenerateLogs.js"; // All logs
import {enemyAttack, playerAttack} from "./assets/js/PlayersAttack/playersAttack.js"; // Attack user and attack bot
import reRender from "./assets/js/ReRender/ReRender.js"; // reRender HP players
import showResultFight from "./assets/js/ShowResultFight/showResultFight.js"; // Show result fight (and disabled button and show title)
import fight from "./assets/js/Fight/fight.js"; // Fight plus logs fight


// Initialize base elements
const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('form.control');
const chat = document.querySelector('.chat');

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


// Send form for Fight
formFight.addEventListener('submit',(e) => {
    e.preventDefault();

    const enemy = enemyAttack(); // Bot Attack (random fight)
    const attack = playerAttack(formFight); // User Attack (data from formFight)

    fight(attack,enemy,player1,player2,chat); // Attack User
    fight(enemy,attack,player2,player1,chat); // Attack Bot

    reRender(player1, player2); // ReRender HP

    showResultFight(player1, player2, arenas, formFight, chat); // Show result (title wins, logs wins, added reload button
});

// Create players in Arena
arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));
generateLogs('start',player1, player2, chat);