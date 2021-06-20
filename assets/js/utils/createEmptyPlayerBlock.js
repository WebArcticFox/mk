import createElement from "./createElement.js";

const createEmptyPlayerBlock = (parent) => {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    parent.appendChild(el);
};

export default createEmptyPlayerBlock;