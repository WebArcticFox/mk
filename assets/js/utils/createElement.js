const createElement = (tag, classes) => {
    let element = document.createElement(tag);
    if(classes){
        if (Array.isArray(classes)) {
            classes.forEach(item => {
                element.classList.add(item);
            })
        } else {
            element.classList.add(classes);
        }
    }
    return element;
};

export default createElement;