import { useEffect, useState,useRef,forwardRef } from "react"
import axios from "axios"
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../Functions/useStore";


const Map = forwardRef(({start,end,color},ref) => {

    const[route,setRoute]=useState([]);
    const setDistance = useStore((state)=>state.setDistance);
    const setDuration =useStore((state)=>state.setDuration);
    const[error,setError]=useState('');
    
    
    useEffect(()=>{
     if(start && end){
        const url=`https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

        axios
       .get(url)
       .then(response=>{
          //  console.log('Map JSON : ',response);
         if(response.data.routes && response.data.routes.length >0){
          // routing to Coordinates part of json that is matrix of longitude and 
          // latitudes and setting 'routes' with same parametars with map funcionality
          // routes is array of  objects who are created with {} shorthand method 
            setRoute(response.data.routes[0].geometry.coordinates.map(([lng,lat]) => ({lng,lat})));
            setDistance(response.data.routes[0].distance);
            setDuration(response.data.routes[0].duration);
         }
       })
       .catch(error=>{
        setError(error);
       })
    
    }
    },[start,end]);
    
    const ChangeMapFocus = ({ routes }) => {
      const map = useMap();
      useEffect(() => {
        if (routes && routes.length > 0) {
          //Reformating from lng lat to lat lng for fitBounds function
          const bounds = routes.map(route => [route.lat, route.lng]); 
          map.fitBounds(bounds); 
        }
      }, [routes, map]);
    
      return null;
    };
    // Using this to zoom in onto favorite location 
    const SetStartLocation=({start})=>{
      const map=useMap();
      map.flyTo(start,18,0);
      return null;
    }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
    <MapContainer center={[44.8, 20.5]} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {route && <ChangeMapFocus routes={route}/>}
      {start && <SetStartLocation start={start}/>}
      {start && <Marker position={[start.lat, start.lng]} />}
      {end && <Marker position={[end.lat,end.lng]}/>}
      {route.length > 0 && <Polyline positions={route} color={color} />}
    </MapContainer>
  </div>

  );
});

export default Map