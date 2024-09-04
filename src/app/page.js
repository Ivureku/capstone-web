"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const customIcon = useMemo(() => {
    return new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3487/3487352.png",
      iconSize: [45, 45],
    });
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyCNC25NOsP46KRwY_IlknebYCRaLJU-QBg",
    authDomain: "mock-capstone-project.firebaseapp.com",
    databaseURL:
      "https://mock-capstone-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mock-capstone-project",
    storageBucket: "mock-capstone-project.appspot.com",
    messagingSenderId: "601362887412",
    appId: "1:601362887412:web:92a292cdd37a783fe3a4a1",
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const locationsRef = ref(db, "location");

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    onValue(locationsRef, (snapshot) => {
      const locationData = snapshot.val();

      const newMarkers = Object.values(locationData).map((location, index) => {
        return (
          <Marker
            key={index}
            position={[location.lat, location.long]}
            icon={customIcon}
          ></Marker>
        );
      });
      console.log(location.latitude);
      console.log(Object.values(locationData));

      setMarkers(newMarkers);
    });
  }, [customIcon, locationsRef]);

  return (
    <MapContainer center={[7.0736, 125.611]} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}.png?key=V6Shnt0Sho66RfMGK8ib"
      />

      <Marker position={[7.0736, 125.611]} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {markers}
    </MapContainer>
  );
}
