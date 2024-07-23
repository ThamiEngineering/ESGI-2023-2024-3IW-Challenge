import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class Footer extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="navbar bg-black h-24 mt-10 relative flex justify-between">
                <div class="">
                    <img class="h-9 z-40" src="../assets/images/JOLogoWhite.svg" alt="Logo" />
                </div>
                <div class="gap-5">
                    <Link class="font-sansBold text-white" path="/" title="Accueil" />
                    <Link class="font-sansBold text-white" path="/events" title="Evénements" />
                </div>
            </div>
        );
    };
}