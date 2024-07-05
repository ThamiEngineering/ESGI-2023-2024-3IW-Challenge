import Blink from "../../lib/composents/Blink.js";

export default class EventDetailsWithoutButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative mb-4 min-h-32">
                <div class="relative z-10 flex w-full h-full">
                    <div class="bg-blue-800 w-0.5 h-[296px] mr-4"></div>
                    <div>
                        <h1 class="font-headline text-[64px] text-black">{this.props.title}</h1>
                        <div class="mb-4">
                            <p class="text-xl bold">SITE</p>
                            <p>Pont Alexandre III (ALX)</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-xl bold">DATE DE DEBUT</p>
                            <p>01 Septembre 2024</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-xl bold">DATE DE FIN</p>
                            <p>02 Septembre 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}