import { Button } from "../components/Button.js";
import { HistoryLink as Link } from "../lib/router/HistoryRouter.js";


// Function de test d'evenement
function clickButton() {
    alert('Hello !');
}


// Function createElement Temporaire de test (créer la structure créé par Karl et utilisé par le generatePage)
function createElement(tag, attributes, ...children){
    return {
        type: tag,
        attributes: attributes,
        children: children
    }
}

// Function render temporaire de test
function render(structure){
    return structure;
}

// Le JSX doit oubligatoirement être ecrit dans une fonction 
const pageHome = render(
    <div>
        <p>Home</p>
        <button onClick={clickButton}>click me !</button>
    </div>
);

/* Remplacé par:
const pageHome = render(
    createElement(
        "div", 
        {}, 
        createElement(
            "p", 
            {} , 
            "Home"
        ),
        createElement(
            "button", 
            {"onClick":clickButton}, 
            "click me !"
        )
    )
);
*/

export default pageHome;

// Le fichier final une fois traité est envoyé dans ./src/outputs
// c'est donc ce nouveau fichier qui doit être utiliser dans le routing