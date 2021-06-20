import createElement from "../utils/createElement.js";
import generateLogs from "../GenerateLogs/GenerateLogs.js";

// Create Reload Button
export const createReloadButton = function () {
    let reloadWrap = createElement('div','reloadWrap');
    let reloadButton = createElement('button', 'button');
    reloadButton.innerHTML = 'Restart';
    reloadButton.addEventListener('click',() => {
        this.reloadGame();
    });
    reloadWrap.appendChild(reloadButton);
    this.arenas.append(reloadWrap);
};

const userWins = (name, player1, player2, arenas, chat) => {
    // Show player win
    let loseTitle = createElement('div', 'loseTitle');
    if(name){
        loseTitle.innerHTML = `${name} WIN!`;
        switch (name) {
            case (player1.name):
                generateLogs('end', player2, player1, chat);
                break;
            case (player2.name):
                generateLogs('end', player1, player2, chat);
                break;
        }

    }else{
        loseTitle.innerHTML = `DRAW!`;
        generateLogs('draw', {}, {}, chat);
    }
    arenas.append(loseTitle);
};

export const showResultFight = function() {
    if(this.player1.hp===0 || this.player2.hp===0) {
        this.formFight.style.display = 'none';
        // Show result
        if(this.player1.hp && !this.player2.hp) {
            userWins(this.player1.name, this.player1, this.player2, this.arenas, this.chat);
        } else if (!this.player1.hp && this.player2.hp) {
            userWins(this.player2.name, this.player1, this.player2, this.arenas, this.chat);
        } else if (!this.player1.hp && !this.player2.hp) {
            userWins('', {}, {}, this.arenas, this.chat);
        }

        return true;
    }
    return false;
};
