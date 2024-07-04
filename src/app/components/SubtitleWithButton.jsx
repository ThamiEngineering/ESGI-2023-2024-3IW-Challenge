import Blink from "../../lib/composents/Blink.js";

export default class SubtitleWithButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative mb-10 min-h-32">
                <h1 class="font-headline text-9xl absolute top-0 left-0 opacity-5 z-0 text-black ml-8">{this.props.title}</h1>
                <div class="relative z-10 flex items-center ml-[90px] h-full">
                    <div class="bg-blue-800 w-0.5 h-36 mr-4 mt-12"></div>
                    <div class="flex flex-col mt-10">
                        <h1 class="font-headline text-[64px] text-black">{this.props.title}</h1>
                        <div>
                            <button class="bg-blue-500 text-white flex items-center rounded-full py-2 px-6">Voir plus d'événements<i class="fa-solid fa-arrow-right ml-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}