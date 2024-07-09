import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import EventDetails from "../components/EventDetails.js";
import Navbar from "../components/Navbar.js";
import Title from "../components/Title.js";
import Subtitle from "../components/Subtitle.js";
import Footer from "../components/Footer.js";

export default class PageEvents extends Blink.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextEvent: {},
            upcomingEvents: []
        };
        this.map = null;
        this.mapInitialized = false;
    }

    componentDidMount() {
        this.initializeMap();
        this.loadEventData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.mapInitialized) {
            this.initializeMap();
        }
    }

    initializeMap() {
        let mapContainer = document.querySelector('#map');
        if (mapContainer) {
            console.log('Initializing map...');
            this.map = L.map(mapContainer).setView([48.8566, 2.3522], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
            console.log('Map initialized:', this.map);
            this.mapInitialized = true; // Marquer la carte comme initialisée
        } else {
            console.error('Map container not found');
        }
    }

    loadEventData() {
        const fetchAllPages = async () => {
            let allRecords = [];
            let page = 1;
            let pageSize = 10;
            let totalRecords = 0;
            let idCounter = 0;

            do {
                const response = await fetch(`https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
                const data = await response.json();
                console.log(`Fetched data for page ${page}:`, data);

                data.results.forEach(record => {
                    record.id = idCounter++;
                });

                allRecords = allRecords.concat(data.results);
                totalRecords = data.total_count;
                page++;
            } while (allRecords.length < totalRecords);

            return allRecords;
        };

        fetchAllPages().then(records => {
            console.log('All fetched records:', records);

            let upcomingEvents = records.filter(record => {
                const now = new Date();
                const startDate = new Date(record.start_date);
                return startDate >= now;
            });

            let nextEvent = upcomingEvents.reduce((closest, event) => {
                const eventDate = new Date(event.start_date);
                return (closest === null || eventDate < new Date(closest.start_date)) ? event : closest;
            }, null);

            console.log('Upcoming events:', upcomingEvents);
            console.log('Next event:', nextEvent);

            this.setState({ nextEvent, upcomingEvents });
            this.addMarkers(records);

        }).catch(error => console.error('Erreur lors du chargement des données:', error));
    }

    addMarkers(records) {
        if (!this.map) {
            console.error('Map not initialized');
            return;
        }

        console.log('Adding markers...');
        records.forEach(record => {
            const { latitude, longitude, nom_site, adress, id } = record;
            console.log(`Record ${id} fields:`, record);

            if (latitude && longitude) {
                const lat = parseFloat(latitude.replace(',', '.'));
                const lon = parseFloat(longitude.replace(',', '.'));
                console.log(`Adding marker for ${nom_site} at [${lat}, ${lon}]`);
                L.marker([lat, lon])
                    .addTo(this.map)
                    .bindPopup(`<b>${nom_site}</b><br>${adress || ''}`);
            } else {
                console.warn(`Missing coordinates for record ${id}:`, record);
            }
        });
        console.log('Markers added.');
    }

    render() {
        const { nextEvent, upcomingEvents } = this.state;

        return (
            Blink.createElement("div", {}, Blink.createElement(Navbar, {}),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Title, { "title":"Carte des événements" }),Blink.createElement("div", { "class":"relative z-20 mx-[88px]" }, Blink.createElement("div", { "id":"map" , "class":"w-auto h-[508px]" }))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Prochain événement" }),Blink.createElement("div", { "class":"grid grid-cols-2 mx-[88px] gap-8" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"img" , "class":"h-full w-auto object-cover" }),Blink.createElement(EventDetails, { "event":nextEvent}))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Événements à venir" }),Blink.createElement("div", { "class":"flex mx-[88px] gap-10" }, Blink.createElement(CardEvents, {}),Blink.createElement(CardEvents, {}),Blink.createElement(CardEvents, {}))),Blink.createElement(Footer, {}))
        );
    }
}