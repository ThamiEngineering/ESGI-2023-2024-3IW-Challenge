import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class Footer extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="navbar bg-black h-24">
                <div class="flex-1">
                    <img class="h-9 px-20" src="../assets/images/JOLogoWhite.svg" alt="Logo" />
                </div>
                <div class="flex-none">
                    <ul class="menu menu-horizontal min-[426px]:px-20 text-white">
                        <li><Link class="font-sansBold" path="/" title="Accueil" /></li>
                        <li><Link class="font-sansBold" path="/events" title="Evénements" /></li>
                    </ul>
                </div>
            </div>
        );
    };
}