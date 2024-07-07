import Blink from "../../lib/composents/Blink.js";

export default class Title extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div", { "class":"relative mb-10" }, Blink.createElement("h1", { "class":"font-headline text-9xl absolute top-0 left-0 opacity-5 z-0 text-black ml-8" }, this.props.title),Blink.createElement("h1", { "class":"font-headline text-[84px] relative z-10 ml-[88px] top-10 text-black" }, this.props.title))
        )
    }
}