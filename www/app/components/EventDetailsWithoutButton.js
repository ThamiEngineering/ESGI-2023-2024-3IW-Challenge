import Blink from "../../lib/composents/Blink.js";

export default class EventDetailsWithoutButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{"class":"relative mb-4 min-h-32"}, Blink.createElement("div",{"class":"relative z-10 flex w-full h-full"}, Blink.createElement("div",{"class":"bg-blue-800 w-0.5 h-[296px] mr-4"}),Blink.createElement("div",{}, Blink.createElement("h1",{"class":"font-headline text-[64px] text-black"}, `${this.props.title}`),Blink.createElement("div",{"class":"mb-4"}, Blink.createElement("p",{"class":"text-xl bold"}, `SITE`),Blink.createElement("p",{}, `Pont Alexandre III (ALX)`)),Blink.createElement("div",{"class":"mb-4"}, Blink.createElement("p",{"class":"text-xl bold"}, `DATE DE DEBUT`),Blink.createElement("p",{}, `01 Septembre 2024`)),Blink.createElement("div",{"class":"mb-4"}, Blink.createElement("p",{"class":"text-xl bold"}, `DATE DE FIN`),Blink.createElement("p",{}, `02 Septembre 2024`)))))
        );
    }
}