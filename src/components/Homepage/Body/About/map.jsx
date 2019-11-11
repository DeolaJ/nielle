import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 6.595144,
         lng: 3.353047
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyARp90f0MrifnFjh8YoK5yxpETDHOCKNWQ'
})(MapContainer);