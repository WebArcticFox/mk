const allPlayerAttack = async function() {
    let hit = '';
    let defence = '';
    for (let item of this.formFight) {
        if(item.checked && item.name === 'hit') {
            hit = item.value;
        }
        if(item.checked && item.name === 'defence') {
            defence = item.value;
        }
        item.checked = false;
    }

    await this.getDamage(hit, defence).then( data => {
        this.attack = data.player1;
        this.enemy = data.player2;
    })
};

export default allPlayerAttack;