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
            upcomingEvents: [],
            visibleEvents: [{}, {}, {}],
            currentIndex: 0
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

    componentWillUnmount() {
        if (this.map) {
            this.map.remove();
            this.map = null;
            this.mapInitialized = false;
        } else {
            console.error('Map not initialized');
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
            this.mapInitialized = true;
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

            const visibleEvents = upcomingEvents.slice(0, 3);

            console.log('Upcoming events:', upcomingEvents);
            console.log('Next event:', nextEvent);
            console.log('Visible events:', visibleEvents)

            this.setState({ nextEvent, upcomingEvents, visibleEvents });
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
            const { latitude, longitude, code_site, nom_site, category_id, id, sports, start_date, end_date } = record;
            console.log(`Record ${id} fields:`, record);

            if (latitude && longitude) {
                const lat = parseFloat(latitude.replace(',', '.'));
                const lon = parseFloat(longitude.replace(',', '.'));
                console.log(`Adding marker for ${nom_site} at [${lat}, ${lon}]`);
                L.marker([lat, lon])
                    .addTo(this.map)
                    .bindPopup(`<b>Code Site</b><br>${code_site}<br><b>Site</b><br>${nom_site}<br><b>Categorie</b><br>${category_id}<br><b>Sports</b><br>${sports}<br><b>Date de début</b><br>${start_date}<br><b>Date de fin</b><br>${end_date}<br><b>Latitude</b><br>${latitude}<br><b>Longitude</b><br>${longitude}`);
            } else {
                console.warn(`Missing coordinates for record ${id}:`, record);
            }
        });
        console.log('Markers added.');
    }

    handleNext = () => {
        const { currentIndex, upcomingEvents } = this.state;
        if (currentIndex + 3 < upcomingEvents.length) {
            const newIndex = currentIndex + 3;
            const visibleEvents = upcomingEvents.slice(newIndex, newIndex + 3);
            this.map.remove();
            console.log('Map removed');
            this.setState({ currentIndex: newIndex, visibleEvents });
            this.initializeMap();
            console.log('Map reinitialized');
            this.addMarkers(upcomingEvents);
        }
    }

    handlePrev = () => {
        const { currentIndex, upcomingEvents } = this.state;
        if (currentIndex - 3 >= 0) {
            const newIndex = currentIndex - 3;
            const visibleEvents = upcomingEvents.slice(newIndex, newIndex + 3);
            this.map.remove();
            console.log('Map removed');
            this.setState({ currentIndex: newIndex, visibleEvents });
            this.initializeMap();
            console.log('Map reinitialized');
            this.addMarkers(upcomingEvents);
        }
    }

    render() {
        const { nextEvent, visibleEvents } = this.state;

        console.log(visibleEvents);

        return (
            Blink.createElement("div", {}, Blink.createElement(Navbar, {}),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Title, { "title":"Carte des événements" }),Blink.createElement("div", { "class":"relative z-20 mx-[88px]" }, Blink.createElement("div", { "id":"map" , "class":"w-auto h-[508px]" }))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Prochain événement" }),Blink.createElement("div", { "class":"min-[769px]:grid min-[769px]:grid-cols-2 space-x-10 mx-[88px]" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"img" , "class":"h-full w-auto object-cover" }),Blink.createElement(EventDetails, { "event":nextEvent}))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Événements à venir" }),Blink.createElement("div", { "class":"flex mx-[88px] gap-10 grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1" },                                             ...Array.from(                            { length: 3 },                            (_, index) => (                                Blink.createElement(CardEvents, { title: visibleEvents[index].sports })                            )                        )                    ),Blink.createElement("div", { "class":"flex gap-2 mx-[88px] mt-4" }, Blink.createElement("button", { "onClick":this.handlePrev, "class":"w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" }, Blink.createElement("i", { "class":"fa fa-chevron-left text-white" })),Blink.createElement("button", { "onClick":this.handleNext, "class":"w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" }, Blink.createElement("i", { "class":"fa fa-chevron-right text-white" })))),Blink.createElement(Footer, {}))
        );
    }
}