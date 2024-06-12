// Function de test d'evenement
function clickButton() {
    alert('Hello !');
}

// Function createElement Temporaire de test (créé la structure créé par karl et utilisé par me generatePage)
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
    createElement("div", {} , createElement("p", {} , "Home"),createElement("button", {"onClick":clickButton} , "click me !"))
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