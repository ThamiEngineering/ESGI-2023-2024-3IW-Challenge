import Blink from "../../lib/composents/Blink.js";

export default class Title extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative mb-10">
                <h1 class="font-headline lg:text-9xl md:text-7xl text-4xl absolute lg:flex hidden xl:top-0 lg:top-5 top-8 left-0 opacity-5 z-0 text-black md:ml-8 ml-5">{this.props.title}</h1>
                <h1 class="font-headline lg:text-[84px] text-[42px] relative z-10 md:ml-[88px] lg:ml-8 ml-5 top-10 text-black">{this.props.title}</h1>
            </div>
        )
    }
}