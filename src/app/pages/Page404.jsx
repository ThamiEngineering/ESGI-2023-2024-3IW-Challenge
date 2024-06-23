import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";

export default class Page404 extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Vous êtes sur la page 404</h1>
                <Link path="/">Retour à la page home</Link>
            </div>
        );
    }
}