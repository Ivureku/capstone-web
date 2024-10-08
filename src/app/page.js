"use client";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { onValue, ref } from "firebase/database";
import firebaseServices from "../../firebase";

import DispatchSidebar from "@/app/components/DispatchSidebar";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const customIcon = useMemo(() => {
    return new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3487/3487352.png",
      iconSize: [45, 45],
    });
  }, []);

  const locationsRef = ref(firebaseServices.db, "location");

  const [markers, setMarkers] = useState([]);

  // TODO: monitor firestore/RTDB reads
  useEffect(() => {
    const unsub = onValue(locationsRef, (snapshot) => {
      const locationData = snapshot.val();

      const newMarkers = Object.values(locationData).map(
        async (location, index) => {
          if (location.emergency_request) {
            const emergencyRef = doc(
              firebaseServices.firestoreDB,
              "emergency_requests",
              location.emergency_request
            );
            const assignedEmergency = (await getDoc(emergencyRef)).data();

            return (
              <>
                <Marker
                  key={index}
                  position={[location.lat, location.long]}
                  icon={customIcon}
                >
                  <Popup>
                    <p className="font-black">{location.vehicle_id}</p>
                    <p>Assigned to Caller: {assignedEmergency.caller.name}</p>
                    <p>Heading to: {assignedEmergency.location.address}</p>
                  </Popup>
                </Marker>
              </>
            );
          }

          // return (
          //   <>
          //     <Marker
          //       key={index}
          //       position={[location.lat, location.long]}
          //       icon={customIcon}
          //     >
          //       <Popup>
          //         <p>Caller: {assignedEmergency.caller.name ?? none}</p>
          //         <p>
          //           Heading to: {assignedEmergency.location.address ?? none}
          //         </p>
          //       </Popup>
          //     </Marker>
          //   </>
          // );
        }
      );

      setMarkers(newMarkers);
    });

    return () => unsub();
  }, []);

  // useEffect(() => {
  //   onValue(locationsRef, (snapshot) => {
  //     const locationData = snapshot.val();

  //     const newMarkers = Object.values(locationData).map((location, index) => {
  //       return (
  //         <>
  //           <Marker
  //             key={index}
  //             position={[location.lat, location.long]}
  //             icon={customIcon}
  //           >
  //             <Popup>{location.name}</Popup>
  //           </Marker>
  //         </>
  //       );
  //     });

  //     setMarkers(newMarkers);
  //   });
  // }, [customIcon, locationsRef]);

  return (
    <>
      <DispatchSidebar />
      <MapContainer center={[7.0736, 125.611]} zoom={16} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}.png?key=V6Shnt0Sho66RfMGK8ib"
        />

        {/* <Marker position={[7.0736, 125.611]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {markers}
      </MapContainer>
    </>
  );
}
