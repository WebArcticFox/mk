import Player from "../Player";
import reRender from "../ReRender/ReRender.js";
import generateLogs from "../GenerateLogs/GenerateLogs.js";
import fight from "../Fight/Fight.js";
import allPlayerAttack from "../PlayersAttack/PlayersAttack.js";
import {showResultFight, createReloadButton} from "../ShowResultFight/ShowResultFight.js";
import createEmptyPlayerBlock from "../utils/createEmptyPlayerBlock.js";
import createElement from "../utils/createElement.js";


class Game {
    constructor() {
        this.player1 = {};
        this.player2 = {};
        this.arenas = document.querySelector('.arenas');
        this.formFight = document.querySelector('form.control');
        this.chat = document.querySelector('.chat');
        this.enemy = {};
        this.attack = {};
        this.playerOneRandom = {};
    }

    // all base items for Game
    showResultFight = showResultFight;
    allPlayerAttack = allPlayerAttack;
    fight = fight;
    reRender = reRender;
    generateLogs = generateLogs;
    createReloadButton = createReloadButton;
    createEmptyPlayerBlock = createEmptyPlayerBlock;
    createElement = createElement;
    // /all base items for Game

    getPlayers = async () => {
        const data = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(responce => responce.json());
        return data;
    };

    getOneRandomPlayer = async () => {
        const data = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(responce => responce.json());
        return data;
    };

    getDamage = async (hit, defence) => {
        const data = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(responce => responce.json());
        return data;
    };

    init = async () =>  {
        localStorage.removeItem('player1');
        const players = await this.getPlayers();
        const parent = document.querySelector('.parent');
        const playerStart = document.querySelector('.player');
        let imgSrc = null;
        this.createEmptyPlayerBlock(parent);
        players.forEach(item => {
            const el = this.createElement('div', ['character', `div${item.id}`]);
            const img = this.createElement('img');

            el.addEventListener('mousemove', () => {
                if (imgSrc === null) {
                    imgSrc = item.img;
                    const img = this.createElement('img');
                    img.src = imgSrc;
                    playerStart.appendChild(img);
                }
            });

            el.addEventListener('mouseout', () => {
                if (imgSrc) {
                    imgSrc = null;
                    playerStart.innerHTML = '';
                }
            });

            el.addEventListener('click', () => {
                localStorage.setItem('player1', JSON.stringify(item));
                el.classList.add('active');
                setTimeout(() => {
                    window.location.pathname = '/mk/fight.html';
                }, 1000);
            });

            img.src = item.avatar;
            img.alt = item.name;

            el.appendChild(img);
            parent.appendChild(el);
        });
    };

    start = async () => {
        this.playerOneRandom = await this.getOneRandomPlayer();

        this.player1 = new Player({ // Create user
            ...JSON.parse(localStorage.getItem('player1')),
            player: 1,
            rootSelector: 'arenas'
        });

        this.player2 = new Player({ // Create bot
            ...this.playerOneRandom,
            player: 2,
            rootSelector: 'arenas'
        });

        // Create players in Arena
        this.player1.createPlayer();
        this.player2.createPlayer();

        this.generateLogs('start', this.player1, this.player2, this.chat);

        // Form for Fight
        this.formFight.addEventListener('submit',async (e) => {
            e.preventDefault();
            await this.allPlayerAttack(); // Get player and enemy attack from api
            this.fight(); // Attack user and attack bot
            this.reRender(); // ReRender HP
            // Show result
            if(this.showResultFight()){
                this.createReloadButton(); // If fight ended - we draw reload button
            }
            // /show result
        });
    };

    reloadGame = () => {
        window.location.pathname = '/mk/index.html';
    }
}

export default Game;