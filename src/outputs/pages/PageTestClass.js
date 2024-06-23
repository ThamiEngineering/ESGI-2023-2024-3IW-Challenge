import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";

export default class TestClass extends Blink.Component {
    constructor(props) {
        super(props);
    };

    sayHello(event) {
        alert('Hello world !');
    }

    render() {
        return (
            Blink.createElement("div", {}, Blink.createElement("h1", {}, "Test de page par class"), Blink.createElement(Link, { "path": "/" }, "Retour à la home"), Blink.createElement("button", { "onClick": this.sayHello }, "Say Hello"))
        )
    };
}