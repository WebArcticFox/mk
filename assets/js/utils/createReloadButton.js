import createElement from "./createElement.js";

const createReloadButton = function () {
    console.log(this);
    let reloadWrap = createElement('div','reloadWrap');
    let reloadButton = createElement('button', 'button');
    reloadButton.innerHTML = 'Restart';
    reloadButton.addEventListener('click',() => {
        this.reload();
    });
    reloadWrap.appendChild(reloadButton);
    this.arenas.append(reloadWrap);
};

export default createReloadButton;