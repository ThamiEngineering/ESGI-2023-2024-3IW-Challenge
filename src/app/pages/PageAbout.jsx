import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";

export default class AboutPage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Vous êtes sur la page about</h1>
                <Link path="/" title="PageHome" />
            </div>
        );
    }
}