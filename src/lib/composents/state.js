// État global de l'application Blink
let blinkAppState = [];
let blinkAppStateCursor = 0;

export const useState = (initialState) => {
    const stateCursor = blinkAppStateCursor;
    blinkAppState[stateCursor] = blinkAppState[stateCursor] || initialState;

    const setState = (newState) => {
        blinkAppState[stateCursor] = newState;
        reRender();
    };

    blinkAppStateCursor++;
    return [blinkAppState[stateCursor], setState];
};

const render = (element, container) => {
    if (typeof element === 'string' || typeof element === 'number') {
        const textNode = document.createTextNode(String(element));
        container.appendChild(textNode);
        return;
    }

    const domElement = document.createElement(element.tag);
    if (element.props) {
        Object.keys(element.props).forEach(prop => {
            domElement[prop] = element.props[prop];
        });
    }

    if (element.children) {
        element.children.forEach(child => render(child, domElement));
    }

    container.appendChild(domElement);
};

const reRender = () => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    blinkAppStateCursor = 0;
    render(Blink.createElement(App), root);
};
