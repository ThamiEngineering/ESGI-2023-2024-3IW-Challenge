import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import EventDetailsWithoutButton from "../components/EventDetailsWithoutButton.js";
import Navbar from "../components/Navbar.js";
import Title from "../components/Title.js";
import Subtitle from "../components/Subtitle.js";
import Footer from "../components/Footer.js";
import storage from "../../lib/utils/storage.js";

export default class PageEventDetails extends Blink.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDetails: {}
        };
    }

    componentDidMount() {
        this.loadEventData();
        
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

    loadEventData() {
        const eventDetails = storage.getItem("eventDetails");
        
        setTimeout(() => {
            this.setState({ eventDetails });
        }, 0);
    }

    render() {
        const { eventDetails } = this.state;
        console.log(eventDetails);
        return (
            Blink.createElement("div", {}, Blink.createElement(Navbar, {}),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Title, { "title":"Carte des spots de l'événement" }),Blink.createElement("div", { "class":"relative z-20 mx-[88px]" }, Blink.createElement("div", { "id":"map" , "class":"w-auto h-[508px]" }))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Événement" }),Blink.createElement("div", { "class":" min-[769px]:grid min-[769px]:grid-cols-2 space-x-10 mx-[88px]" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"img" , "class":"h-full w-auto object-cover" }),Blink.createElement(EventDetailsWithoutButton, { "event":eventDetails}))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Spots de l'événement" }),Blink.createElement("div", { "class":"flex mx-[88px] gap-10 grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1" }, Blink.createElement(CardEvents, {}),Blink.createElement(CardEvents, {}),Blink.createElement(CardEvents, {}))),Blink.createElement(Footer, {}))
        );
    }
}