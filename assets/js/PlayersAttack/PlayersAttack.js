// Player Attack
import getRandom from "../utils/getRandom.js";

// Initialize damage
const HIT = {
    head: 50,
    body: 30,
    foot: 20,
};
const ATTACK = ['head','body','foot'];

export const playerAttack = (formFight) => {
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
};

// Bot attack
export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    };
};