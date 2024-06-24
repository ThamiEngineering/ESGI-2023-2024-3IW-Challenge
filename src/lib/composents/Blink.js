import { isClass } from "../utils/utils.js";

export function createElement(tagOrElement, attributes, ...children) {

    if (isClass(tagOrElement)) {
        let classElement = new tagOrElement(attributes);
        tagOrElement = classElement.render();
    } else if (typeof tagOrElement === 'function') {
        tagOrElement = tagOrElement(attributes);
    }

    if (typeof tagOrElement === "object") {
        tagOrElement.attributes = { ...tagOrElement.attributes, ...attributes };

        if (!tagOrElement.children) tagOrElement.children = [];
        children.forEach(child => tagOrElement.children.push(child));

        return tagOrElement;
    } else return {
        type: tagOrElement,
        attributes: attributes,
        children: children
    }
}

export class Component {
    constructor(props = {}) {
        console.log(this.constructor);
        console.log(this.render);
        if (this.constructor === Component) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.props = props;
        this.blinkAppState = [];
        this.blinkAppStateCursor = 0;
    }

    render() {
        throw new Error("You have to implement the method render!");
    }

    useState = (initialState) => {
        const stateCursor = this.blinkAppStateCursor;
        this.blinkAppState[stateCursor] = this.blinkAppState[stateCursor] || initialState;

        const setState = (newState) => {
            this.blinkAppState[stateCursor] = newState;
            this.reRender();
        };

        this.blinkAppStateCursor++;
        return [this.blinkAppState[stateCursor], setState];
    };

    renderDOM = (element, container) => {
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
            element.children.forEach(child => this.renderDOM(child, domElement));
        }

        container.appendChild(domElement);
    };

    reRender = () => {
        const root = document.getElementById('root');
        root.innerHTML = '';
        this.blinkAppStateCursor = 0;
        this.renderDOM(this.createElement(), root);
    };
}

const Blink = {
    createElement: createElement,
    Component: Component,
};

export default Blink;