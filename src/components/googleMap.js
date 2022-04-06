import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Circle,
} from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: true, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };
  initialPoint = {
    lat: -1.958198,
    lng: 30.111122,
  };
  onMarkerClick = (props, marker, e) =>
 { console.log(this.props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });}
onMarkDragged =(props, marker, e) =>{
  console.log("am dragged")
}
  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={this.initialPoint}
      >
        <Circle center={this.initialPoint} radius={3000} visible={true} />

        <Marker
          onClick={this.onMarkerClick}
          name={"Am in area"}
          icon={"https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-bike-healthy-wanicon-flat-wanicon.png"}
          title="Rider A"
          draggable={true}
          position={{
            lat: -1.958198,
            lng: 30.111122,
          }}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={"Am in area"}
          icon={"https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-bike-healthy-wanicon-flat-wanicon.png"}
          title="Rider B"
          onDragEnd={this.onMarkDragged}
          draggable={true}
          position={{
            lat: -1.968897,
            lng: 30.1358,
          }}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCes4CwutakemAIDaiw9FhlH-xBYsd9Cl4",
})(MapContainer);
