import { isClass } from "./utils.js";

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

export function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}