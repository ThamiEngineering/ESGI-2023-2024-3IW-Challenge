import Blink from "../../lib/composents/Blink.js";

export default class TextHome extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="relative mt-4 min-h-32 mb-4">
                <div class="relative z-10 flex items-center w-full h-full bottom-4">
                    <div class="bg-blue-800 w-0.5 h-[304px] mr-4"></div>
                    <div>
                        <h1 class="font-headline text-[64px] text-black">{this.props.title}</h1>
                        <p class="text-xl">Obtenez toutes les dernières actions et informations du monde olympique et des prochains Jeux Olympiques! Revivez les Jeux passés, rencontrez vos athlètes préférés, découvrez les sports olympiques et recevez des informations personnalisées directement chez vous!</p>
                    </div>
                </div>
            </div>
        );
    }
}