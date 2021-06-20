import generateLogs from "../GenerateLogs/GenerateLogs.js";

const oneAttack = (attack, defence, playerHit, playerDefence, chat) => {
    if(attack.hit!==defence.defence) {
        playerDefence.changeHP(attack.value);
        generateLogs('hit', playerDefence, playerHit, chat, attack.value);
    }else{
        generateLogs('defence', playerHit, playerDefence, chat);
    }
};

const fight = function() {
    oneAttack(this.attack, this.enemy, this.player1, this.player2, this.chat);
    oneAttack(this.enemy, this.attack, this.player2, this.player1, this.chat);
};

export default fight;