import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import React from 'react';
import data from "../Source/MapData.json";
import { MBP_Small, MBP_Large, MBP_Admin, Players } from '../Source/convert';

const socket = io('http://localhost:5200'); // Replace with your backend URL

const Map = () => {

  const [mbp_Small, setMBP_Small] = useState([]);
  const [mbp_Large, setMBP_Large] = useState([]);
  const [mbp_Admin, setMBP_Admin] = useState([]);
  const [players, setPlayers] = useState([]);

  const handleSocketData = useCallback((data) => {
    console.log(data);
  }, []);

  useEffect(() => {
   // Listen for initial data from the server
    socket.on('init', handleSocketData);

    return () => {
      socket.off('init');
    };
  }, [handleSocketData]);
  
  useEffect(() => {
    setMBP_Small(MBP_Small(data));
    setMBP_Large(MBP_Large(data));
    setMBP_Admin(MBP_Admin(data));
    setPlayers(Players(data));
  }, []);
  return (
    <div>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 bg-[#00000080] text-white p-3 rounded-bl-md rounded-br-md shadow-md  shadow-blue-400 z-[1001]'>Server Time: {data.body.serverclock ? data.body.serverclock : "Day ? : ?? : ?? : ??"}</div>
      <MapContainer center={[70, 100]} zoom={2} minZoom={1} maxZoom={6} className='w-full h-screen'>
        <ImageOverlay
          url="/TheIsland_WP.jpg"
          bounds={[[0, 0], [200, 200]]}
        />
        {mbp_Small && mbp_Small.map((marker, index) => (
          <Marker key={index}
            position={[marker.x_pos, marker.y_pos]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `
                <div class="custom-marker-wrapper">
                  <img src="/mbp_small.png" class="custom-marker-icon"/>
                  <div class="custom-marker-icon-overlay">
                    <i class="fa fa-home text-white text-[10px]"></i>
                  </div>
                </div>`,
              iconSize: [32, 37], // Match the size of the custom marker
              iconAnchor: [16, 37], // Center the icon (adjust as needed)
              shadowUrl: '/markers-shadow.png',
              shadowSize: [37, 37], // Adjust based on your shadow image
              shadowAnchor: [0, 37] // Bottom-left position for the shadow
            })}
          >
            <Popup position="top" offset={[0, -15]}>
              <div className='text-center'>{marker.tribename}</div>
              <div>{marker.x_ue4}, {marker.y_ue4}, {marker.z_ue4}</div>
              <div>{marker.decayDestructionTime}, {marker.lastInAllyRangeTime}</div>
            </Popup>
          </Marker>
        ))}
        {mbp_Large && mbp_Large.map((marker, index) => (
          <Marker key={index}
            position={[marker.x_pos, marker.y_pos]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `
                <div class="custom-marker-wrapper">
                  <img src="/mbp_large.png" class="custom-marker-icon"/>
                  <div class="custom-marker-icon-overlay">
                    <i class="fa ${marker.type === "mbp_admin" ? "fa-user" : "fa-home" } text-white text-[10px]"></i>
                  </div>
                </div>`,
              iconSize: [32, 37], // Match the size of the custom marker
              iconAnchor: [16, 37], // Center the icon (adjust as needed)
              shadowUrl: '/markers-shadow.png',
              shadowSize: [37, 37], // Adjust based on your shadow image
              shadowAnchor: [0, 37] // Bottom-left position for the shadow
            })}
          >
            <Popup position="top" offset={[0, -15]}>
              <div className='text-center'>{marker.tribename}</div>
              <div>{marker.x_ue4}, {marker.y_ue4}, {marker.z_ue4}</div>
              <div>{marker.decayDestructionTime}, {marker.lastInAllyRangeTime}</div>
            </Popup>
          </Marker>
        ))}
        {mbp_Admin && mbp_Admin.map((marker, index) => (
          <Marker key={index}
            position={[marker.x_pos, marker.y_pos]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `
                <div class="custom-marker-wrapper">
                  <img src="/mbp_admin.png" class="custom-marker-icon"/>
                  <div class="custom-marker-icon-overlay">
                    <i class="fa fa-user text-white text-[10px]"></i>
                  </div>
                </div>`,
              iconSize: [32, 37], // Match the size of the custom marker
              iconAnchor: [16, 37], // Center the icon (adjust as needed)
              shadowUrl: '/markers-shadow.png',
              shadowSize: [37, 37], // Adjust based on your shadow image
              shadowAnchor: [0, 37] // Bottom-left position for the shadow
            })}
          >
            <Popup position="top" offset={[0, -15]}>
              <div className='text-center'>{marker.tribename}</div>
              <div>{marker.x_ue4}, {marker.y_ue4}, {marker.z_ue4}</div>
              <div>{marker.decayDestructionTime}, {marker.lastInAllyRangeTime}</div>
            </Popup>
          </Marker>
        ))}
        {players && players.map((marker, index) => (
          <Marker key={index}
            position={[marker.x_pos, marker.y_pos]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `
                <div class="custom-marker-wrapper">
                  <img src="/players.png" class="custom-marker-icon"/>
                  <div class="custom-marker-icon-overlay">
                    <i class="fa fa-user text-white text-[10px]"></i>
                  </div>
                </div>`,
              iconSize: [32, 37], // Match the size of the custom marker
              iconAnchor: [16, 37], // Center the icon (adjust as needed)
              shadowUrl: '/markers-shadow.png',
              shadowSize: [37, 37], // Adjust based on your shadow image
              shadowAnchor: [0, 37] // Bottom-left position for the shadow
            })}
          >
            <Popup position="top" offset={[0, -15]}>
              <div className='text-center'>{marker.playername}</div>
              <div className='text-center'>{marker.tribename}</div>
              <div>{marker.x_ue4}, {marker.y_ue4}, {marker.z_ue4}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;




// CSS styles
const customCSS = `
.custom-div-icon {
  position: relative;
  width: 32px;
  height: 27px;
}

.custom-marker-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-marker-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.custom-marker-icon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 87%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-marker-icon-overlay i {
  color: #fff;
  font-size: 13px;
}
`;

// Insert CSS into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customCSS;
document.head.appendChild(styleSheet);