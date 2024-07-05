import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import EventDetailsWithoutButton from "../components/EventDetailsWithoutButton.js";
import Navbar from "../components/Navbar.js";
import Title from "../components/Title.js";
import Subtitle from "../components/Subtitle.js";
import Footer from "../components/Footer.js";

export default class PageEventDetails extends Blink.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            let mapContainer = document.querySelector('#map');
            if (mapContainer) {
                let map = L.map(mapContainer).setView([48.8566, 2.3522], 13);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            } else {
                console.error('Map container not found');
            }
        }, 0);     
    }

    render() {
        return (
            <div>
                <Navbar />
                <div class="my-12">
                    <Title title="Carte des spots de l'événement" />
                    <div class="relative z-20 mx-[88px]">
                        <div id="map" class="w-auto h-[508px]"></div>
                    </div>
                </div>
                <div class="my-12">
                    <Subtitle title="Événement" />
                    <div class="grid grid-cols-2 mx-[88px] gap-8">
                        <img src="../assets/images/Background.svg" alt="img" class="h-full w-auto object-cover" />
                        <EventDetailsWithoutButton title="Para triathlon (ptri)" />
                    </div>
                </div>
                <div class="my-12">
                    <Subtitle title="Spots de l'événement" />
                    <div class="flex mx-[88px] gap-10">
                        <CardEvents />
                        <CardEvents />
                        <CardEvents />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}