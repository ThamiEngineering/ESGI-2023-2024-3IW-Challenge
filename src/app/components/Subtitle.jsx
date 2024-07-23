import Blink from "../../lib/composents/Blink.js";

export default class Subtitle extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative md:mb-10 min-h-32 flex items-center">
                <h1 class="font-headline lg:text-9xl md:text-7xl text-4xl lg:flex hidden absolute xl:top-0 lg:top-5 top-8 left-0 opacity-5 z-0 text-black md:ml-8 ml-5">{this.props.title}</h1>
                <div class="relative z-10 flex items-center md:ml-[90px] ml-5 lg:top-10 md:top-[8px] border-l-4 border-[#0078D0] ">
                    <h1 class="font-headline lg:text-[84px] text-[40px] relative z-10 md:ml-[16px] ml-2 text-black">{this.props.title}</h1>
                </div>
            </div>
        );
    } 
}