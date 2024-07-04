import Blink from "../../lib/composents/Blink.js";

export default class SubtitleWithButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{"class":"relative mb-10 min-h-32"}, Blink.createElement("h1",{"class":"font-headline text-9xl absolute top-0 left-0 opacity-5 z-0 text-black ml-8"}, `${this.props.title}`),Blink.createElement("div",{"class":"relative z-10 flex items-center ml-[90px] h-full"}, Blink.createElement("div",{"class":"bg-blue-800 w-0.5 h-36 mr-4 mt-12"}),Blink.createElement("div",{"class":"flex flex-col mt-10"}, Blink.createElement("h1",{"class":"font-headline text-[64px] text-black"}, `${this.props.title}`),Blink.createElement("div",{}, Blink.createElement("button",{"class":"bg-blue-500 text-white flex items-center rounded-full py-2 px-6"}, `Voir plus d'événements`,Blink.createElement("i",{"class":"fa-solid fa-arrow-right ml-2"}))))))
        );
    }
}