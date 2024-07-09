import Blink from "../../lib/composents/Blink.js";

export default class TitleCenteredWithBg extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div", { "class":"relative mb-10" }, Blink.createElement("h1", { "class":"font-headline text-9xl absolute top-0 left-0 opacity-5 z-0 text-black ml-8 max-[1024px]:text-7xl max-[768px]:text-6xl max-[425px]:text-[20px]" }, this.props.title),Blink.createElement("h1", { "class":"font-headline text-[84px] relative z-10 ml-[32px] min-[1025px]-top-10 max-[768px]-top-4 max-[425px]-top-2 text-black max-[1024px]:text-[56px] max-[768px]:text-[42px] max-[425px]:text-[42px]" }, this.props.title))
        )
    }
}