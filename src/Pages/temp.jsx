import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import { useEffect, useState, useCallback } from 'react';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import React from 'react';
// import data from "../Source/MapData.json";
import { MBP_Small, MBP_Large, MBP_Admin, Players } from '../Source/convert';
import { useNavigate } from 'react-router-dom';
import { SelectAuth } from "../redux/authSlice";
import { useSelector } from 'react-redux';
import { Button, Checkbox, Drawer, Image } from 'antd';
import io from 'socket.io-client';
import Loader from '../component/Loading';

const socket = io('http://localhost:5500');
const API_URL = process.env.APP_API_URL || 'http://localhost:5500/api';

const Map = () => {
  const navigate = useNavigate();
  const UserData = useSelector(SelectAuth);
  const [mbp_Small, setMBP_Small] = useState([]);
  const [mbp_Large, setMBP_Large] = useState([]);
  const [mbp_Admin, setMBP_Admin] = useState([]);
  const [players, setPlayers] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});                  //current map data
  const [currentMap, setCurrentMap] = useState("");      //current map ID
  const [MyMaps, setMyMaps] = useState([]);      //current map ID

  const showLoading = () => {
    setOpen(true);
  };

  const handleSocketData = useCallback((data) => {
    console.log(data);
  }, []);

  useEffect(() => {
    if (UserData && Object.keys(UserData).length === 0) {
      navigate('/');      
    }
    
  }, [handleSocketData, navigate, UserData]);
  
  useEffect(() => {    
    Object.keys(data).length !== 0 && setMBP_Small(MBP_Small(data));
    Object.keys(data).length !== 0 && setMBP_Large(MBP_Large(data));
    Object.keys(data).length !== 0 && setMBP_Admin(MBP_Admin(data));
    Object.keys(data).length !== 0 && setPlayers(Players(data));
  }, [data]);

  useEffect(() => {
    socket.emit('current_map', currentMap);

    const handleMapData = (data) => {
      data && setData(data.mapData);
    };
    
    socket.on('mapData', handleMapData);

    socket.emit('get_my_maps', UserData.id);
    
    const handleMyMaps = (data) => {
      data && setMyMaps(data);
    };
    
    socket.on('mymaps', handleMyMaps);

    return () => {
        socket.off('mapData', handleMapData);
        socket.off('mymaps', handleMyMaps);
    };
  }, [data, currentMap, UserData]);  // Add dependencies if these might change
  
  return (
    <div>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 bg-[#00000080] text-white p-3 rounded-bl-md rounded-br-md shadow-md  shadow-blue-400 z-[1001]'>
        Server Time: {data.body ? data.body.serverclock : "Day ? : ?? : ?? : ??"}
        <Button type="primary" onClick={showLoading} className='ml-5'>
          Maps
        </Button>
      </div>
      <Drawer
        closable
        destroyOnClose
        title={<p>My Maps</p>}
        placement="right"
        open={open}
        loading={MyMaps.length === 0 ? true : false}
        onClose={() => setOpen(false)}
      >
        {
          MyMaps.length !== 0 && MyMaps.map((map, index) => (
            <div key={index} className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-purple-200 mx-auto">
              <div>
                <div className="font-bold bg-slate-300 rounded-sm p-2 hover:bg-slate-400 transition" onClick={() => setCurrentMap(map._id)}>
                  {map.mapData.body.map}
                  <Checkbox checked= { currentMap === map._id ? true : false } className='float-right' />
                </div>
                <Image
                  className="w-full"
                  src={`${API_URL}/maps/${map.mapData.body.map}.jpg`}
                />
              </div>
            </div>
          ))
        }
      </Drawer>
      {
        data && Object.keys(data).length !== 0 ?
        <MapContainer center={[50, 50]} zoom={3} minZoom={3} maxZoom={9} className='w-full h-screen' crs={L.CRS.Simple}>
          <ImageOverlay
            url={`${API_URL}/maps/${data.body.map}.jpg`}
            bounds={[[0, 0], [100, 100]]}
          />
          {mbp_Small.map((marker, index) => (
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
                iconSize: [32, 37],
                iconAnchor: [16, 37],
                shadowUrl: '/markers-shadow.png',
                shadowSize: [37, 37],
                shadowAnchor: [0, 37]
              })}
            >
              <Popup offset={[0, -15]}>
                <div className='text-center'>{marker.tribename}</div>
                <div>{marker.x_ue4}, {marker.y_ue4}, {marker.z_ue4}</div>
                <div>{marker.decayDestructionTime}, {marker.lastInAllyRangeTime}</div>
              </Popup>
            </Marker>
          ))}
          {mbp_Large.map((marker, index) => (
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
                iconSize: [32, 37],
                iconAnchor: [16, 37],
                shadowUrl: '/markers-shadow.png',
                shadowSize: [37, 37],
                shadowAnchor: [0, 37]
              })}
            >
              <Popup position="top" offset={[0, -15]}>
                <div className='text-center'>{marker.tribename}</div>
                <div>{marker.x_ue4}, {marker.y_ue4}, {marker.z_ue4}</div>
                <div>{marker.decayDestructionTime}, {marker.lastInAllyRangeTime}</div>
              </Popup>
            </Marker>
          ))}
          {mbp_Admin.map((marker, index) => (
            <Marker key={index}
              position={[marker.x_pos, marker.y_pos]}
              icon={L.divIcon({
                className: 'custom-div-icon',
                html: `
                  <div class="custom-marker-wrapper">
                    <img src="/obelisk_blue.png" class="custom-marker-icon scale-150"/>
                  </div>`,
                iconSize: [32, 37],
                iconAnchor: [16, 37],
                shadowUrl: '/markers-shadow.png',
                shadowSize: [37, 37],
                shadowAnchor: [0, 37]
              })}
            >
              <Popup position="top" offset={[-12, -35]}>
                <div className='text-center'>{marker.tribename}</div>
                <div>{marker.x_ue4}, {marker.y_ue4}, {marker.z_ue4}</div>
                <div>{marker.decayDestructionTime}, {marker.lastInAllyRangeTime}</div>
              </Popup>
            </Marker>
          ))}
          {players.map((marker, index) => (
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
                iconSize: [32, 37],
                iconAnchor: [16, 37],
                shadowUrl: '/markers-shadow.png',
                shadowSize: [37, 37],
                shadowAnchor: [0, 37]
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
        :
        <div className='text-4xl flex items-center justify-center'>
          <div>
            <Loader />
            Please select a map.
          </div>
        </div>
      }
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
