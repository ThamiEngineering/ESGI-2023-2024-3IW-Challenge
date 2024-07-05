import Blink from "../../lib/composents/Blink.js";

export default class Title extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative mb-10">
                <h1 class="font-headline text-9xl absolute top-0 left-0 opacity-5 z-0 text-black ml-8 max-[1024px]:text-7xl max-[768px]:text-6xl max-[426px]:text-[32px]">{this.props.title}</h1>
                <h1 class="font-headline text-[84px] relative z-10 ml-[88px] min-[1025px]:top-10 text-black max-[1024px]:text-[56px] max-[1024px]:top-6 max-[768px]:text-[42px] max-[768px]:top-4 max-[426px]:text-[22px] max-[426px]:top-2">{this.props.title}</h1>
            </div>
        )
    }
}