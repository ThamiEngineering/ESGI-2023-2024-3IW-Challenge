import { createElement, createTextElement } from './createElement.js';
import { isValidElement } from './createElement.js';

function render(element, container) {
    // Si l'élément est une instance d'une classe, appeler sa méthode render()
    if (typeof element === 'object' && typeof element.render === 'function') {
        element = element.render();
    }

    // Vérification de la validité de l'élément
    if (!isValidElement(element)) {
        throw new Error(`Invalid element type: ${element.type}`);
    }

    // création du DOM node
    const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);

    // ajout des propriétés
    const isProperty = key => key !== 'children';
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(propName => {
            dom[propName] = element.props[propName];
        });

    // ajout des enfants
    element.props.children.forEach(child => {
        render(child, dom);
    });

    // ajout du DOM node au container
    container.appendChild(dom);
}

export const ReactDOM = {
    createElement,
    render
}
