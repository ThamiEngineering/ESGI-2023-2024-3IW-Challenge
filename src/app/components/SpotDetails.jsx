import Blink from "../../lib/composents/Blink.js";

export default class spotDetails extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        console.log("this.props.spotttt", this.props.spot);
        
        return (
            <div class="relative mb-4 min-h-32">
                <div class="relative z-10 flex w-full h-full">
                    <div class="bg-blue-800 w-0.5 h-[296px] mr-4"></div>
                    <div>
                        <div class="mb-4">
                            <p class="text-xl bold">Nom</p>
                            <p>{this.props.spot.nom ?? "Loading.."}</p>
                        </div>
                        <div class="mb-4"> 
                            <p class="text-xl bold">Adresse</p>
                            <p>{this.props.spot.adresse ?? "Loading.."}</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-xl bold">Description</p>
                            <p>{this.props.spot.description ?? "Loading.."}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}