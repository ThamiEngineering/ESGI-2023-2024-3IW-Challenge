import Blink from "../../lib/composents/Blink.js";

export default class TextHome extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative md:mt-4 mt-5 min-h-32 mb-4">
                <div class="relative z-10 flex items-center w-full h-full bottom-4">
                    <div class="border-l-4 border-[#0078D0]">
                        <h1 class="font-headline lg:text-[64px] md:text-[52px] text-[24px] relative z-10 text-black ml-8">{this.props.title}</h1>
                        <p class="text-xl ml-8">Obtenez toutes les dernières actions et informations du monde olympique et des prochains Jeux Olympiques! Revivez les Jeux passés, rencontrez vos athlètes préférés, découvrez les sports olympiques et recevez des informations personnalisées directement chez vous!</p>
                    </div>
                </div>
            </div>
        );
    }
}