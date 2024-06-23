import { isClass } from "../utils/utils.js";
import { useState } from "../utils/state.js";

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
        if (this.constructor === Component) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.props = props;
    }

    render() {
        throw new Error("You have to implement the method render!");
    }
}

const Blink = {
    createElement: createElement,
    Component: Component,
    useState: useState,
};

export default Blink;