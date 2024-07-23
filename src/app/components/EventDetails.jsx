import Blink from "../../lib/composents/Blink.js";
import ButtonEvents from "./ButtonEvents.js";

export default class EventDetails extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div class="relative mb-4 min-h-32">
                <div class="relative z-10 flex w-full h-full">
                    <div class="bg-blue-800 w-0.5 h-[328px] mr-4"></div>
                    <div>
                    <h1 class="font-headline md:text-[64px] text-[40px] text-black">{this.props.event.sports}</h1>
                    <div class="mb-4">
                            <p class="text-xl bold">SITE</p>
                            <p>{`${this.props.event.nom_site} (${this.props.event.code_site})`}</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-xl bold">DATE DE DEBUT</p>
                            <p>{this.props.event.start_date}</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-xl bold">DATE DE FIN</p>
                            <p>{this.props.event.end_date}</p>
                        </div>
                        <ButtonEvents title="Détails de l'événement" event={this.props.event} />
                    </div>
                </div>
            </div>
        );
    }
}