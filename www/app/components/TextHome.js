import Blink from "../../lib/composents/Blink.js";

export default class TextHome extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{"class":"relative mt-4 min-h-32 mb-4"}, Blink.createElement("div",{"class":"relative z-10 flex items-center w-full h-full bottom-4"}, Blink.createElement("div",{"class":"bg-blue-800 w-0.5 h-[304px] mr-4"}),Blink.createElement("div",{}, Blink.createElement("h1",{"class":"font-headline text-[64px] leading-[70px] text-black max-[1024px]:text-[42px] max-[1024px]:leading-10 max-[768px]:text-[36px] max-[768px]:leading-9 max-[426px]:text-[22px] mb-4 "}, `${this.props.title}`),Blink.createElement("p",{"class":"text-xl max-[1024px]:text-[20px] max-[768px]:text-[16px] max-[425px]:text-[12px]"}, `Obtenez toutes les dernières actions et informations du monde olympique et des prochains Jeux Olympiques! Revivez les Jeux passés, rencontrez vos athlètes préférés, découvrez les sports olympiques et recevez des informations personnalisées directement chez vous!`))))
        );
    }
}