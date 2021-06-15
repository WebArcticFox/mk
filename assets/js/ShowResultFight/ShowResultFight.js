import createElement from "../utils/createElement.js";
import generateLogs from "../GenerateLogs/GenerateLogs.js";

// Create Reload Button
const createReloadButton = (arenas) => {
    let reloadWrap = createElement('div','reloadWrap');
    let reloadButton = createElement('button', 'button');
    reloadButton.innerHTML = 'Restart';
    reloadButton.addEventListener('click',() => {
        window.location.reload();
    });
    reloadWrap.appendChild(reloadButton);
    arenas.append(reloadWrap);
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

const showResultFight = (player1, player2, arenas, formFight, chat) => {
    if(player1.hp===0 || player2.hp===0) {
        formFight.style.display = 'none';
        createReloadButton(arenas);
        // Show result
        if(player1.hp && !player2.hp) {
            userWins(player1.name, player1, player2, arenas, chat);
        } else if (!player1.hp && player2.hp) {
            userWins(player2.name, player1, player2, arenas, chat);
        } else if (!player1.hp && !player2.hp) {
            userWins('', {}, {},arenas, chat);
        }
    }
};

export default showResultFight;