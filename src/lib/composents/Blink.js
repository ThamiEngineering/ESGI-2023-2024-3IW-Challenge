// Blinck.js
import generateStructure from "../composents/generateStructure.js";
import { isClass } from "../utils/utils.js";
import { validateProps } from "../utils/propValidation.js";

export function createElement(tagOrElement, attributes, ...children) {
    if (isClass(tagOrElement)) {
        let classElement = new tagOrElement(attributes);
        tagOrElement = classElement.render();
        tagOrElement.instance = classElement;
        classElement.firstRender = true;
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
    };
}

export class Component {
    constructor(props = {}) {
        if (this.constructor === Component) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.props = props;
        this.state = {};
    }

    validateProps(validators) {
        for (const props in validators) {
            const type = validators[props];
            console.log(props, type);
            validateProps(this.props[props], type);
        }
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.update();
    }

    update() {
        this.firstRender = false;
        const newRenderedElement = generateStructure(this.render());
        if (!(newRenderedElement instanceof Node)) {
            throw new Error("Rendered element is not a valid Node");
        }
        const currentElement = this._rootElement;
        const parentElement = currentElement.parentElement;
        if (parentElement && currentElement) {
            if (this.componentWillUpdate) this.componentWillUpdate();
            parentElement.replaceChild(newRenderedElement, currentElement);
            if (this.componentDidUpdate) this.componentDidUpdate();
            this._rootElement = newRenderedElement;
        }
    }

    attachRootElement(element) {
        this._rootElement = element;
    }

    render() {
        throw new Error("You have to implement the method render!");
    }
}

const Blink = {
    createElement: createElement,
    Component: Component,
};

export default Blink;