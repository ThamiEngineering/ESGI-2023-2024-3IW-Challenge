import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";

export default class AboutPage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{}, Blink.createElement("h1",{}, "Vous êtes sur la page about"),Blink.createElement(Link,{"path":"/","title":"PageHome"}))
        );
    }
}