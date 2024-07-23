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
      eventDetails: {},
      spotsEvent: [],
    };
    this.map = null;
    this.mapInitialized = false;
  }

  componentDidMount() {
    this.loadEventData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.mapInitialized && this.state.spotsEvent.length > 0) {
      this.initializeMap();
      this.addEventMarker(this.state.eventDetails);
      this.addMarkers(this.state.spotsEvent);
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
    const { latitude, longitude } = this.state.eventDetails;
    if (mapContainer && latitude && longitude) {
      const lat = parseFloat(latitude.replace(',', '.'));
      const lon = parseFloat(longitude.replace(',', '.'));

      console.log('Initializing map...');
      this.map = L.map(mapContainer).setView([lat, lon], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
      console.log('Map initialized:', this.map);
      this.mapInitialized = true;
    } else {
      console.error('Map container or event coordinates not found');
    }
  }

  async loadEventData() {
    const eventDetails = storage.getItem("eventDetails");
    console.log("eventDetails: " + eventDetails);

    try {
      const response = await fetch("../../spots.json");
      const spotsDetails = await response.json();
      const spotsEvent = spotsDetails[eventDetails.code_site] || [];
      this.setState({ eventDetails, spotsEvent });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  }

  addEventMarker(eventDetails) {
    if (!this.map) {
      console.error('Map not initialized');
      return;
    }

    const { latitude, longitude, nom_site } = eventDetails;
    if (latitude && longitude) {
      const lat = parseFloat(latitude.replace(',', '.'));
      const lon = parseFloat(longitude.replace(',', '.'));
      console.log(`Adding event marker for ${nom_site} at [${lat}, ${lon}]`);

      const eventMarker = L.marker([lat, lon], {
        icon: L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })
      });

      eventMarker
        .addTo(this.map)
        .bindPopup(
          `<b>Nom</b><br>${nom_site}<br>
           <b>Code Site</b><br>${eventDetails.code_site}<br>
           <b>Sports</b><br>${eventDetails.sports}<br>
           <b>Date de début</b><br>${eventDetails.start_date}<br>
           <b>Date de fin</b><br>${eventDetails.end_date}<br>
           <b>Latitude</b><br>${latitude}<br>
           <b>Longitude</b><br>${longitude}`
        );
    } else {
      console.warn('Missing coordinates for event:', eventDetails);
    }
  }

  addMarkers(spotsEvent) {
    if (!this.map) {
      console.error('Map not initialized');
      return;
    }

    console.log('Adding markers...');
    spotsEvent.forEach((spot, index) => {
      console.log("spot: " + spot);
      const { latitude, longitude, nom, adresse, description } = spot;
      if (latitude && longitude) {
        const lat = parseFloat(latitude.replace(',', '.'));
        const lon = parseFloat(longitude.replace(',', '.'));
        console.log(`Adding marker for ${nom} at [${lat}, ${lon}]`);
        L.marker([lat, lon])
          .addTo(this.map)
          .bindPopup(
            `<b>Nom</b><br>${nom}<br>
             <b>Adresse</b><br>${adresse}<br>
             <b>Description</b><br>${description}<br>
             <b>Latitude</b><br>${latitude}<br>
             <b>Longitude</b><br>${longitude}`
          );
      } else {
        console.warn(`Missing coordinates for spot ${index}:`, spot);
      }
    });
    console.log('Markers added.');
  }

  render() {
    const { eventDetails, spotsEvent } = this.state;
    console.log('spotsEvent', spotsEvent);
    return (
      Blink.createElement("div", {}, Blink.createElement(Navbar, {}),Blink.createElement("div", { "class":"my-12" }, Blink.createElement("div", { "class":"-mt-16" }, Blink.createElement(Title, { "title":"Carte des spots de l'événement" }),Blink.createElement("div", { "class":"relative z-20 md:mx-[88px] mx-5" }, Blink.createElement("div", { "id":"map" , "class":"w-auto h-[508px]" })))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Événement" }),Blink.createElement("div", { "class":"grid md:grid-cols-2 grid-cols-1 md:mx-[88px] mx-5 gap-8" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"img" , "class":"h-full w-auto object-cover" }),Blink.createElement(EventDetailsWithoutButton, { "event":eventDetails}))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Spots de l'événement" }),Blink.createElement("div", { "class":"flex md:mx-[88px] mt-12 mx-5 gap-10 grid grid-cols-1 md:grid-cols-3" },             ...Array.from({ length: spotsEvent.length }, (_, index) =>              Blink.createElement(CardEvents, { title: spotsEvent[index].nom })            ))),Blink.createElement(Footer, {}))
    );
  }
}
