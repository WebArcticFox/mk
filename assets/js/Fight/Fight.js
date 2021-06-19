import generateLogs from "../GenerateLogs/GenerateLogs.js";

const fight = (attack, defence, playerHit,playerDefence, chat) => {
    if(attack.hit!==defence.defence) {
        playerDefence.changeHP(attack.value);
        generateLogs('hit', playerDefence, playerHit, chat, attack.value);
    }else{
        generateLogs('defence', playerHit, playerDefence, chat);
    }
};

export default fight;