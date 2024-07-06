import Blink from "../../lib/composents/Blink.js";
import ButtonHome from "./ButtonHome.js";

export default class SubtitleWithButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative mb-10 min-h-32">
                <h1 class="font-headline text-9xl absolute top-0 left-0 opacity-5 z-0 text-black ml-8 max-[1024px]:text-7xl max-[768px]:text-6xl max-[426px]:text-[42px]">{this.props.title}</h1>
                <div class="relative z-10 flex items-center ml-[90px] h-full">
                    <div class="bg-blue-800 w-0.5 h-36 mr-4 min-[1025px]-mt-10 max-[1024px]-mt-7 max-[768px]-mt-4 max-[425px]-mt-0"></div>
                    <div class="flex flex-col mt-10">
                        <h1 class="font-headline text-[64px] text-black max-[1024px]:text-[56px] max-[768px]:text-[42px] max-[426px]:text-[32px] ">{this.props.title}</h1>
                        <ButtonHome title="Voir plus d'événements" />
                    </div>
                </div>
            </div>
        );
    }
}