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
      spotsEvent: [{}, {}, {}],
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

  async loadEventData() {
    const eventDetails = storage.getItem("eventDetails");
    console.log("eventDetails: " + eventDetails);

    try {
      const response = await fetch("../../spots.json");
      const spotsDetails = await response.json();
      const spotsEvent = spotsDetails[eventDetails.code_site];
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

    const { latitude, longitude, nom, adresse, description } = eventDetails;
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      console.log(`Adding event marker for ${nom} at [${lat}, ${lon}]`);

      // Create a custom icon
      const eventIcon = L.icon({
        iconUrl: 'path/to/custom-icon.png', // Replace with the path to your custom icon
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
      });

      L.marker([lat, lon], { icon: eventIcon })
        .addTo(this.map)
        .bindPopup(
          `<b>Nom</b><br>${nom}<br>
           <b>Adresse</b><br>${adresse}<br>
           <b>Description</b><br>${description}<br>
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
      console.log("spot: " + spot)
      const { latitude, longitude, nom, adresse, description } = spot;
      if (latitude && longitude) {
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
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
    console.log('spotEvent', spotsEvent)
    return (
      Blink.createElement("div", {}, Blink.createElement(Navbar, {}),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Title, { "title":"Carte des spots de l'événement" }),Blink.createElement("div", { "class":"relative z-20 mx-[88px]" }, Blink.createElement("div", { "id":"map" , "class":"w-auto h-[508px]" }))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Événement" }),Blink.createElement("div", { "class":"min-[769px]:grid min-[769px]:grid-cols-2 space-x-10 mx-[88px]" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"img" , "class":"h-full w-auto object-cover" }),Blink.createElement(EventDetailsWithoutButton, { "event":eventDetails}))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Spots de l'événement" }),Blink.createElement("div", { "class":"flex mx-[88px] gap-10 grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1" },             ...Array.from({ length: spotsEvent.length }, (_, index) =>              Blink.createElement(CardEvents, { title: spotsEvent[index].nom })            ))),Blink.createElement(Footer, {}))
    );
  }
}
