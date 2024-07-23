import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import EventDetails from "../components/EventDetails.js";
import Navbar from "../components/Navbar.js";
import Title from "../components/Title.js";
import Subtitle from "../components/Subtitle.js";
import Footer from "../components/Footer.js";
import storage from "../../lib/utils/storage.js";

export default class PageEvents extends Blink.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextEvent: {},
            upcomingEvents: [],
            visibleEvents: [{}, {}, {}],
            currentIndex: 0,
            sportsList: []
        };
        this.map = null;
        this.mapInitialized = false;
        this.filterSport = "";
        this.filterStartDate = "";
        this.filterEndDate = "";
        this.userLocation = null;
        this.routingControl = null;
        this.olympicLayer = L.layerGroup();
        this.paralympicLayer = L.layerGroup();
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

            this.layerControl = L.control.layers(null, {
                "Olympic Venues": this.olympicLayer,
                "Paralympic Venues": this.paralympicLayer
            }).addTo(this.map);

            console.log('Map initialized:', this.map);
            this.mapInitialized = true;
            this.getUserLocation();
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

            const sportsList = [...new Set(records.map(record => record.sports))];

            console.log('Upcoming events:', upcomingEvents);
            console.log('Next event:', nextEvent);
            console.log('Visible events:', visibleEvents);
            console.log('Sports list:', sportsList);

            this.setState({ nextEvent, upcomingEvents, visibleEvents, sportsList });
            this.addMarkers(records);

        }).catch(error => console.error('Erreur lors du chargement des données:', error));
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.map.setView([latitude, longitude], 13);
                    this.userLocation = [latitude, longitude];
                    this.addUserMarker([latitude, longitude]);
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                }
            );
        } else {
            console.error("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    }

    addUserMarker(location) {
        if (this.map) {
            L.marker(location)
                .addTo(this.map)
                .bindPopup("Votre position")
                .openPopup();
            this.map.setView(location, 13);
        }
    }

    addMarkers(records) {
        if (!this.map) {
            console.error('Map not initialized');
            return;
        }

        console.log('Adding markers...');
        this.olympicLayer.clearLayers();
        this.paralympicLayer.clearLayers();

        records.forEach(record => {
            const { latitude, longitude, code_site, nom_site, category_id, id, sports, start_date, end_date } = record;
            console.log(`Record ${id} fields:`, record);

            const lat = parseFloat(latitude.replace(',', '.'));
            const lon = parseFloat(longitude.replace(',', '.'));
            if (this.isValidCoordinate(lat) && this.isValidCoordinate(lon)) {
                console.log(`Adding marker for ${nom_site} at [${lat}, ${lon}]`);

                storage.setItem("eventDetails", record);
                
                const popupContent = `
                    <b>Code Site</b><br>${code_site}<br>
                    <b>Site</b><br>${nom_site}<br>
                    <b>Categorie</b><br>${category_id}<br>
                    <b>Sports</b><br>${sports}<br>
                    <b>Date de début</b><br>${start_date}<br>
                    <b>Date de fin</b><br>${end_date}<br>
                    <b>Latitude</b><br>${latitude}<br>
                    <b>Longitude</b><br>${longitude}<br><br>
                    <button class="btn btn-primary event-detail-link" data-id="${id}">Détail de l'événement</button>
                    <button class="btn btn-secondary route-button" data-id="${id}">Voir l'itinéraire</button>
                `;

                record.popupContent = popupContent;

                const marker = L.marker([lat, lon], { record }).bindPopup(popupContent);

                marker.on('popupopen', () => {
                    const button = document.querySelector(`.event-detail-link[data-id="${id}"]`);
                    if (button) {
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            storage.setItem("eventDetails", record);
                            const path = `/events/${id}`;
                            window.history.pushState({}, undefined, path);
                            window.dispatchEvent(new Event("pushstate"));
                        });
                    }

                    const routeButton = document.querySelector(`.route-button[data-id="${id}"]`);
                    if (routeButton) {
                        routeButton.addEventListener('click', () => this.showRoute([lat, lon]));
                    }
                });

                if (category_id === "venue-olympic") {
                    marker.addTo(this.olympicLayer);
                } else if (category_id === "venue-paralympic") {
                    marker.addTo(this.paralympicLayer);
                }
            } else {
                console.warn(`Invalid coordinates for record ${id}:`, record);
            }
        });

        this.map.addLayer(this.olympicLayer);
        this.map.addLayer(this.paralympicLayer);
        console.log('Markers added.');
    }

    isValidCoordinate(coord) {
        return !isNaN(coord) && isFinite(coord);
    }

    async showRoute(destination) {
        if (!this.userLocation) {
            alert("Votre position n'est pas disponible.");
            return;
        }

        const [userLat, userLon] = this.userLocation;
        const [destLat, destLon] = destination;

        try {
            const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248ac96e253242c4b05966b778fc865dafa&start=${userLon},${userLat}&end=${destLon},${destLat}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (!data.features || data.features.length === 0) {
                throw new Error('No route found');
            }

            const route = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);

            if (this.currentRouteLine) {
                this.map.removeLayer(this.currentRouteLine);
            }

            this.currentRouteLine = L.polyline(route, { color: 'blue', weight: 4 }).addTo(this.map);
            this.map.fitBounds(this.currentRouteLine.getBounds());
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    }

    filterRecords = (records) => {
        const filterSport = this.filterSport?.toLowerCase();
        const filterStartDate = this.filterStartDate ? new Date(this.filterStartDate) : null;
        const filterEndDate = this.filterEndDate ? new Date(this.filterEndDate) : null;

        let filteredRecords = records;

        if (filterSport) {
            filteredRecords = filteredRecords.filter(record => record.sports.toLowerCase().includes(filterSport));
        }

        if (filterStartDate) {
            filteredRecords = filteredRecords.filter(record => new Date(record.start_date) >= filterStartDate);
        }

        if (filterEndDate) {
            filteredRecords = filteredRecords.filter(record => new Date(record.end_date) <= filterEndDate);
        }

        if (filterSport && filterStartDate) {
            filteredRecords = filteredRecords.filter(record => record.sports.toLowerCase().includes(filterSport) && new Date(record.start_date) >= filterStartDate);
        }

        if (filterSport && filterEndDate) {
            filteredRecords = filteredRecords.filter(record => record.sports.toLowerCase().includes(filterSport) && new Date(record.end_date) <= filterEndDate);
        }

        if (filterStartDate && filterEndDate) {
            filteredRecords = filteredRecords.filter(record => new Date(record.start_date) >= filterStartDate && new Date(record.end_date) <= filterEndDate);
        }

        if (filterSport && filterStartDate && filterEndDate) {
            filteredRecords = filteredRecords.filter(record => record.sports.toLowerCase().includes(filterSport) && new Date(record.start_date) >= filterStartDate && new Date(record.end_date) <= filterEndDate);
        }

        return filteredRecords;
    }

    applyFilters = () => {
        const olympicRecords = this.filterRecords(this.olympicLayer.getLayers().map(marker => marker.options.record));
        this.olympicLayer.clearLayers();
        olympicRecords.forEach(record => {
            const lat = parseFloat(record.latitude.replace(',', '.'));
            const lon = parseFloat(record.longitude.replace(',', '.'));
            const marker = L.marker([lat, lon], { record }).bindPopup(record.popupContent);
            this.olympicLayer.addLayer(marker);

            marker.on('popupopen', () => {
                const button = document.querySelector(`.event-detail-link[data-id="${record.id}"]`);
                if (button) {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        storage.setItem("eventDetails", record);
                        const path = `/events/${record.id}`;
                        window.history.pushState({}, undefined, path);
                        window.dispatchEvent(new Event("pushstate"));
                    });
                }

                const routeButton = document.querySelector(`.route-button[data-id="${record.id}"]`);
                if (routeButton) {
                    routeButton.addEventListener('click', () => this.showRoute([lat, lon]));
                }
            });
        });

        const paralympicRecords = this.filterRecords(this.paralympicLayer.getLayers().map(marker => marker.options.record));
        this.paralympicLayer.clearLayers();
        paralympicRecords.forEach(record => {
            const lat = parseFloat(record.latitude.replace(',', '.'));
            const lon = parseFloat(record.longitude.replace(',', '.'));
            const marker = L.marker([lat, lon], { record }).bindPopup(record.popupContent);
            this.paralympicLayer.addLayer(marker);

            marker.on('popupopen', () => {
                const button = document.querySelector(`.event-detail-link[data-id="${record.id}"]`);
                if (button) {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        storage.setItem("eventDetails", record);
                        const path = `/events/${record.id}`;
                        window.history.pushState({}, undefined, path);
                        window.dispatchEvent(new Event("pushstate"));
                    });
                }

                const routeButton = document.querySelector(`.route-button[data-id="${record.id}"]`);
                if (routeButton) {
                    routeButton.addEventListener('click', () => this.showRoute([lat, lon]));
                }
            });
        });

        console.log('Applying filters...');
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

    handleSportFilterChange = (event) => {
        const { value } = event.target;
        this.filterSport = value;
    }

    handleStartDateFilterChange = (event) => {
        const { value } = event.target;
        this.filterStartDate = value;
    }

    handleEndDateFilterChange = (event) => {
        const { value } = event.target;
        this.filterEndDate = value;
    }

    render() {
        const { nextEvent, visibleEvents, upcomingEvents, sportsList } = this.state;

        const sportOptions = [];
        for (let i = 0; i < sportsList.length; i++) {
            sportOptions.push(Blink.createElement('option', { key: i, value: sportsList[i] }, sportsList[i]));
        }

        return (
            Blink.createElement("div", {}, Blink.createElement(Navbar, {}),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Title, { "title":"Carte des événements" }),Blink.createElement("div", { "class":"relative z-20 mx-[15px] md:mx-[88px]" }, Blink.createElement("div", { "id":"map" , "class":"w-auto h-[508px]" })),Blink.createElement("div", { "class":"relative md:flex mx-[15px] md:mx-[88px] gap-4 top-2" }, Blink.createElement("div", { "class":"w-full md:w-1/3" }, Blink.createElement("label", { "for":"filterSport" , "class":"block text-gray-700" }, "Filtrer par sport"),Blink.createElement("select", { "id":"filterSport" , "name":"filterSport" , "onChange":this.handleSportFilterChange, "class":"w-full p-2 border border-gray-300 rounded" }, Blink.createElement("option", { "value":"" }, "Choisir un sport"),                                ...sportOptions)),Blink.createElement("div", { "class":"w-full md:w-1/3" }, Blink.createElement("label", { "for":"filterStartDate" , "class":"block text-gray-700 text-[17px] sm:text-base" }, "Date de début"),Blink.createElement("input", { "id":"filterStartDate" , "type":"date" , "name":"filterDate" , "onChange":this.handleStartDateFilterChange, "class":"w-full p-2 border border-gray-300 rounded" })),Blink.createElement("div", { "class":"w-full md:w-1/3" }, Blink.createElement("label", { "for":"filterEndDate" , "class":"block text-gray-700 " }, "Date de fin"),Blink.createElement("input", { "id":"filterEndDate" , "type":"date" , "name":"filterDate" , "onChange":this.handleEndDateFilterChange, "class":"w-full p-2 border border-gray-300 rounded" })),Blink.createElement("div", { "class":"w-full md:w-1/3" }, Blink.createElement("button", { "onClick":this.applyFilters, "class":"w-full p-2 bg-blue-500 text-white rounded mt-6" }, "                                Appliquer les filtres                            ")))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Prochain événement" }),Blink.createElement("div", { "class":"min-[769px]:grid min-[769px]:grid-cols-2 md:space-x-10 mx-[15px] md:mx-[88px]" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"img" , "class":"h-full w-auto object-cover" }),Blink.createElement(EventDetails, { "event":nextEvent}))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Événements à venir" }),Blink.createElement("div", { "class":"flex mx-[88px] gap-10 grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1" },                                             ...Array.from(                            { length: 3 },                            (_, index) => (                                Blink.createElement(CardEvents, { title: visibleEvents[index].sports })                            )                        )                    ),Blink.createElement("div", { "class":"flex gap-2 mx-[88px] mt-4" }, Blink.createElement("button", { "onClick":this.handlePrev, "class":"w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" }, Blink.createElement("i", { "class":"fa fa-chevron-left text-white" })),Blink.createElement("button", { "onClick":this.handleNext, "class":"w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" }, Blink.createElement("i", { "class":"fa fa-chevron-right text-white" })))),Blink.createElement(Footer, {}))
        );
    }
}