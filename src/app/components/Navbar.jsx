import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class Navbar extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="navbar bg-base-100 h-24">
                <div class="flex-1">
                    <img class="h-9 sm:px-20" src="../assets/images/JOLogoColored.svg" alt="Logo" />
                </div>
                <div class="flex-none">
                    <ul class="menu menu-horizontal min-[500px]:px-20 text-black">
                        <li><Link class="font-sansBold text-[17px] sm:text-base" path="/" title="Accueil" /></li>
                        <li><Link class="font-sansBold text-[17px] sm:text-base" path="/events" title="Evénements" /></li>
                    </ul>
                </div>
            </div>
        );
    };
}