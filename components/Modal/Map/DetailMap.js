import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

var MARKER_ICON_URL =
  "https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3.png";

const containerStyle = { width: "100%", height: "20rem" };

const DetailMap = ({ lat, lng }) => {

  // 구글 맵으로 보일 시
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyBVi31CDrC3Dyi8f166yV_-6WKocsk7I8E"
    });

    const [marker, setMarker] = useState({ lat: lat, lng: lng });
    const [mapCenter, setMapCenter] = useState({ lat: lat, lng: lng });

    const handleOnLoad = (map) => {
      console.log('marker: ', map);
    };

    return (
      <div>
        {isLoaded ? (
          <GoogleMap
            id='roomMap'
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
          >
            <Marker
              position={marker}
              onLoad={handleOnLoad}
            >
            </Marker>
          </GoogleMap>
        ) : null}

      </div>
    );
  };


// 네이버 맵으로 보일 시
//   var markers = [];
//   var roomMap;

//   const initMap = () => {
//     roomMap = new naver.maps.Map("roomMap", {
//       center: new naver.maps.LatLng(lat, lng),
//       minZoom: 10,
//       maxZoom: 21,
//       // zoomControl: true,
//       // zoomControlOptions: {
//       //   //줌 컨트롤의 옵션
//       //   position: naver.maps.Position.TOP_RIGHT,
//       // },
//     });
//   };

//   const addRoomMapMarker = () => {
//     var roomMapMarker = new naver.maps.Marker({
//       map: roomMap,
//       icon: {
//         url: MARKER_ICON_URL,
//         size: new naver.maps.Size(24, 37),
//         anchor: new naver.maps.Point(12, 37),
//       },
//       position: new naver.maps.LatLng(lat, lng),
//     });

//     markers.push(roomMapMarker);
//   };

//   useEffect(() => {
//     initMap();
//     addRoomMapMarker();
//   }, []);

//   return (
//     <div>
//       <div id="roomMap">
//         <div style={{ width: "100%", height: "20rem" }}></div>
//       </div>
//     </div>
//   );
// };




export default DetailMap;
