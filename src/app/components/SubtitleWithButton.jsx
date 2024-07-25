import Blink from "../../lib/composents/Blink.js";
import ButtonHome from "./ButtonHome.js";

export default class SubtitleWithButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative md:mb-10 md:mt-10 min-h-32">
                <h1 class="font-headline lg:text-9xl md:text-7xl text-4xl lg:flex hidden absolute xl:top-0 lg:top-5 top-8 left-0 opacity-5 z-0 text-black md:ml-8 ml-5">{this.props.title}</h1>
                <div class="relative z-10 flex items-center md:ml-[90px] ml-5 h-full">
                    <div class="border-l-4 border-[#0078D0]">
                        <div class="flex flex-col">
                            <h1 class="font-headline lg:text-[84px] md:text-[52px] text-[24px] relative z-10 md:ml-[16px] text-black ml-8">{this.props.title}</h1>
                            <ButtonHome title="Voir plus d'événements" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}