// components/Location.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from "../components/Header.jsx"
import Breadcrumb from '../components/BreadCrumb.jsx';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Location = ({ 
  latitude = -1.286389, 
  longitude = 36.8219, 
  zoom = 13,
  locationName = "Our Office",
  address = "Nairobi, Kenya",
  className = "",
}) => {
  const position = [latitude, longitude];

  return (
    <div className='bg-gray-100'>
      <Header />
      <div className={`bg-gray-100 w-full max-w-7xl mx-auto ${className}`}>
        <div className="flex flex-col h-[100vh] pt-24">
          {/* Optional header - remove if you want just the map */}
          <div className=" bg-gray-100">
          <Breadcrumb />
            <h2 className="text-4xl font-semibold text-gray-800 mb-2">Summit Location</h2>
            <hr />
            <p className="text-gray-600">{address}</p>
          </div>
          
          {/* Map container */}
          <div className="flex-1 w-full relative z-0">
            <MapContainer 
              center={position} 
              zoom={zoom} 
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <div className="font-semibold">{locationName}</div>
                  <div className="text-sm">{address}</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;