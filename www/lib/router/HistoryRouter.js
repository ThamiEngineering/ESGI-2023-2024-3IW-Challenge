import Blink from "../composents/Blink.js";
import generateStructure from "../composents/generateStructure.js";
import { isClass } from "../utils/utils.js";

export function HistoryLink(props) {
    return {
        type: "a",
        attributes: {
            href: props.path ?? "#",
            onClick: function (e) {
                e.preventDefault();
                window.history.pushState({}, undefined, props.path);
                window.dispatchEvent(new Event("pushstate"));
            }
        },
        children: props.title ? [props.title] : []
    }
}

export default function HistoryRouter(routes, rootElement) {
    function manageRoute() {
        let currentPath = window.location.pathname;

        let matchedPage = null;
        let params = {};
        Object.keys(routes).forEach(route => {
            if (matchedPage) return; // Si déjà trouvé, on arrête la recherche
            const routePattern = route.replace(/:[^\s/]+/g, '([\\w-]+)');
            const regex = new RegExp(`^${routePattern}$`);
            const match = currentPath.match(regex);
            if (match) {
                matchedPage = route;
                const paramNames = route.match(/:([^\s/]+)/g) || [];
                paramNames.forEach((param, index) => {
                    params[param.replace(':', '')] = match[index + 1];
                });
            }
        });

        const page = routes[matchedPage || "*"];
        let generatedPage;

        if (isClass(page)) {
            let pageClass = Blink.createElement(page);
            generatedPage = generateStructure(pageClass);
        } else if (typeof page === "function") {
            generatedPage = page();
        } else {
            generatedPage = generateStructure(page);
        }

        generatedPage = typeof generatedPage === "function" ? generatedPage() : generatedPage;

        if (root.childNodes[0]) {
            rootElement.replaceChild(generatedPage, root.childNodes[0]);
        } else {
            rootElement.appendChild(generatedPage);
        }
    }

    window.addEventListener("popstate", manageRoute);
    window.addEventListener("pushstate", manageRoute);
    manageRoute();
}