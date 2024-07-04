import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class Navbar extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="navbar bg-base-100">
                <div class="flex-1">
                    <img class="h-9 px-20" src="../assets/images/JOLogo.svg" alt="Logo" />
                </div>
                <div class="flex-none">
                    <ul class="menu menu-horizontal px-20 text-black">
                        <li><Link class="font-sansBold" path="/" title="Accueil" /></li>
                        <li><Link class="font-sansBold" path="" title="Evénements" /></li>
                    </ul>
                </div>
            </div>
        );
    };
}