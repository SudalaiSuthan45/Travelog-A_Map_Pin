import React from 'react';
import './App.css';

//import './myMapStyles.css';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; //Map's css

import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';



function App() {
    const [viewport, setViewport] = React.useState({
      
      latitude: 48.8584,
      longitude: 2.2945,
      zoom: 4
    });
  
    return (
    
    <div className='App'>

        <Map
          {...viewport}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
      
          <Marker latitude={48.8584} longitude={2.2945} offsetLeft={-20} offsetTop={-10} anchor='center'>

            <RoomIcon style={{ fontSize:viewport.zoom * 7, color: "slateblue"}}/>

          </Marker>
          
          <Popup longitude={2.2945} latitude={48.8584} anchor="left">
                <div className="card">
                  <label>Place</label>
                    <h4 className="place">Eiffel tower</h4>
                  <label>Review</label>
                    <p className="desc"> beatutyyy</p>
                  <label>Rating</label>
                  <div className="stars">
                    <StarIcon className="star"></StarIcon>
                    <StarIcon className="star"></StarIcon>
                    <StarIcon className="star"></StarIcon>
                    <StarIcon className="star"></StarIcon>
                    <StarIcon className="star"></StarIcon>
                  </div>
                  <label>Information</label>
                    <span className="username">Created by<b>anhs</b></span>
                    <span className="date">1 hour ago</span>
                </div>
          </Popup>
          
        </Map>

    </div>
    
  );
}



export default App;
