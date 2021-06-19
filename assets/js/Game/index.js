import Player from "../Player";
import reRender from "../ReRender/ReRender.js";
import showResultFight from "../ShowResultFight/ShowResultFight.js";
import generateLogs from "../GenerateLogs/GenerateLogs.js";
import fight from "../Fight/Fight.js";
import {enemyAttack, playerAttack} from "../PlayersAttack/PlayersAttack.js";

// Initialize base elements
const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('form.control');
const chat = document.querySelector('.chat');

class Game {
    // all items for Game
    showResultFight = showResultFight;
    fight = fight;
    playerAttack = playerAttack;
    enemyAttack = enemyAttack;
    reRender = reRender;
    generateLogs = generateLogs;
    // /all items for Game

    start = () => {
        // Initialize players
        const player1 = new Player({
            player: 1,
            name: 'Raiden',
            hp: 100,
            img: 'https://www.fightersgeneration.com/nz2/char/raiden-mk2-hd-sprite-cancelled-project.GIF',
            rootSelector: 'arenas'
        });

        const player2 = new Player({
            player: 2,
            name: 'Scorpion',
            hp: 100,
            img: 'https://www.fightersgeneration.com/nz2/char/scorpion-mk-hd-sprite-cancelled-project.gif',
            rootSelector: 'arenas'
        });

        // Send form for Fight
        formFight.addEventListener('submit',(e) => {
            e.preventDefault();

            const enemy = this.enemyAttack(); // Bot Attack (random fight)
            const attack = this.playerAttack(formFight); // User Attack (data from formFight)

            this.fight(attack,enemy,player1,player2,chat); // Attack User
            this.fight(enemy,attack,player2,player1,chat); // Attack Bot

            this.reRender(player1, player2); // ReRender HP

            this.showResultFight(player1, player2, arenas, formFight, chat); // Show result (title wins, logs wins, added reload button
        });

        // Create players in Arena
        player1.createPlayer();
        player2.createPlayer();

        this.generateLogs('start',player1, player2, chat);
    }
}

export default Game;