import Blink from "../../lib/composents/Blink.js";

export default class EventDetailsWithoutButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        console.log(this.props.event);
        return (
            <div class="relative mb-4 min-h-32 mt-[15px]">
                <div class="relative z-10 flex w-full h-full">
                    <div class="bg-blue-800 w-0.5 h-[296px] mr-4"></div>
                    <div>
                    <h1 class="font-headline text-[64px] leading-[70px] text-black max-[1024px]:text-[42px] max-[1024px]:leading-10 max-[768px]:text-[50px] max-[768px]:pt-7 max-[768px]:leading-9 mb-4">{this.props.event.sports ?? "Loading.."}</h1>
                        <div class="mb-4">
                            <p class="text-xl bold">SITE</p>
                            <p>{`${this.props.event.nom_site} (${this.props.event.code_site})` ?? "Loading.."}</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-xl bold">DATE DE DEBUT</p>
                            <p>{this.props.event.start_date ?? "Loading.."}</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-xl bold">DATE DE FIN</p>
                            <p>{this.props.event.end_date ?? "Loading.."}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}