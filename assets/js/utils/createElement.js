const createElement = (tag, classes) => {
    let element = document.createElement(tag);
    if(classes){
        element.classList.add(classes);
    }
    return element;
};

export default createElement;