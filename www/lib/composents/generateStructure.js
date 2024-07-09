// generateStructure.js
export default function generateStructure(structure) {
    if (!structure) return null;

    const element = document.createElement(structure.type);
    if (structure.attributes) {
        for (let attrName in structure.attributes) {
            if (/on[A-Z]/.test(attrName)) {
                element.addEventListener(
                    attrName.replace("on", "").toLowerCase(),
                    structure.attributes[attrName]
                );
            } else if (/data[A-Z]/.test(attrName)) {
                element.dataset[attrName.replace("data", "").toLowerCase()] =
                    structure.attributes[attrName];
            } else element.setAttribute(attrName, structure.attributes[attrName]);
        }
    }
    if (structure.children) {
        for (let child of structure.children) {
            let subElement;
            if (typeof child === "string") {
                subElement = document.createTextNode(child);
            } else {
                subElement = generateStructure(child);
            }

            if (!subElement) continue;

            element.appendChild(subElement);
        }
    }

    if (structure.instance && structure.instance.attachRootElement) {
        structure.instance.attachRootElement(element);
        if (structure.instance.firstRender && structure.instance.componentDidMount) {
            structure.instance.componentDidMount();
        }
    }

    return element;
}