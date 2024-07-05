import Blink from "../../lib/composents/Blink.js";
import Navbar from "../components/Navbar.js";
import Button404 from "../components/Button404.js";
import TitleCenteredWithBg from "../components/TitleCenteredWithBg.js";

export default class Page404 extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="h-screen overflow-y-hidden">
                <Navbar />
                <div class="flex flex-col justify-center items-center h-full w-full -mt-32">
                    <TitleCenteredWithBg title="404" />
                    <h1 class="font-headline text-9xl">Cette page est introuvable</h1>
                    <Button404 title="Retour" />
                </div>
            </div>
        );
    }
}