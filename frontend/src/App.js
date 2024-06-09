import React, { useEffect, useState } from 'react';
import './App.css';

//import './myMapStyles.css';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; //Map's css

import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';

import axios from 'axios';

import {format} from 'timeago.js';

function App() {
    const [viewport, setViewport] = useState({
      
      latitude: 48.8584,
      longitude: 2.2945,
      zoom: 4
    });

    const [pins, setPins] = useState([]);

    const [currentPlaceId, setCurrentPlaceId] = useState(null);
  
    useEffect(() => {
      const getPins = async () => {
        try{
          const res = await axios.get("/pins");
          setPins(res.data);
        }catch(err){
          console.log(err)
        }
      }
      getPins()
    },[]);

    const handleMarkerClick = (id) => {
      setCurrentPlaceId(id);
    }

    

    return (
    
    <div className='App'>

        <Map
          {...viewport}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >

          {pins.map(p => (
          <>  
            <Marker latitude={p.lat} longitude={p.long} offsetLeft={-20} offsetTop={-10} anchor='center'>

              <RoomIcon style={{ fontSize:viewport.zoom * 7, color: "slateblue", cursor:'pointer'}} 
                onClick={() => handleMarkerClick(p._id)}
              />

            </Marker>
          
            {p._id === currentPlaceId && (
              <Popup longitude={p.long} latitude={p.lat} closeButton={true} closeOnClick={false} anchor="left" 
                onClose={() => setCurrentPlaceId(null)}>
                    <div className="card">
                      <label>Place</label>
                        <h4 className="place">{p.title}</h4>
                      <label>Review</label>
                        <p className="desc"> {p.desc}</p>
                      <label>Rating</label>
                      <div className="stars">
                        <StarIcon className="star"></StarIcon>
                        <StarIcon className="star"></StarIcon>
                        <StarIcon className="star"></StarIcon>
                        <StarIcon className="star"></StarIcon>
                        <StarIcon className="star"></StarIcon>
                      </div>
                      <label>Information</label>
                        <span className="username">Created by<b>{p.username}</b></span>
                        <span className="date">{format(p.createdAt)}</span>
                    </div>
              </Popup>
            )}

          </>
          ))}

        </Map>

    </div>
    
  );
}



export default App;
