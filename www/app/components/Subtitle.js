import Blink from "../../lib/composents/Blink.js";

export default class Subtitle extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{"class":"relative min-[426px]:mb-10 min-[769px]:min-h-32 max-[425px]:min-h-24"}, Blink.createElement("h1",{"class":"font-headline text-9xl absolute top-0 left-0 opacity-5 z-0 text-black ml-8 max-[1024px]:text-7xl max-[768px]:text-6xl max-[426px]:text-[32px]"}, `${this.props.title}`),Blink.createElement("div",{"class":"relative z-10 flex items-center ml-[90px] h-full"}, Blink.createElement("div",{"class":"bg-blue-800 w-0.5 h-16 mr-4"}),Blink.createElement("h1",{"class":"font-headline text-[64px] text-black min-[1025px]:mt-10 max-[1024px]:mt-7 max-[768px]:mt-4  max-[1024px]:text-[56px] max-[768px]:text-[42px] max-[426px]:text-[22px]"}, `${this.props.title}`)))
        );
    }
}