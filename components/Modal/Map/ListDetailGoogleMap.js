import React, { useEffect, useState, Fragment } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import SearchMobileCard from "../../Card/SearchMobileCard";

const containerStyle = {
  width: '100%',
  height: "70rem"
};

var MARKER_ICON_URL =
// "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
"https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3.png";
var MARKER_HIGHLIGHT_ICON_URL =
  "https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3_over.png";

var mobileWindows = [];

const DetailMap = ({ lat, lng, onRequestClosed }) => {
  const searchDataValue = useSelector(({ searchResult }) => searchResult.data);
  const [roomData, setRoomData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: '', lng: ''})

  const addRoomMapMarker = () => {
    console.log(searchDataValue[0]);
    if (searchDataValue[0] !== undefined && searchDataValue[0].length > 0) {
      let tmpMarkers = [];
      searchDataValue[0].map((room) => {
        let marker = {
          position: {
            lat: room.location.lat,
            lng: room.location.lon
          }
        }
        tmpMarkers.push(marker);
      });

      setMapCenter({
        lat: searchDataValue[0][0].location.lat,
        lng: searchDataValue[0][0].location.lon
      });
      
      setMarkers(markers.concat(tmpMarkers));
    }
  };

  useEffect(() => {
    setMarkers([]);
    addRoomMapMarker();
  }, [searchDataValue]);

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyBVi31CDrC3Dyi8f166yV_-6WKocsk7I8E"
      >
        <GoogleMap
          id='list-detail-map'
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
        >
          {markers.map((marker, index) => (
            <Fragment key={index}>
              <Marker
                position={marker.position}
              />
            </Fragment>
          ))}
         
          <></>
          <SearchMobileCard
            data={roomData}
            closeModal={(value) => {
              onRequestClosed(value);
            }}
          ></SearchMobileCard>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DetailMap;
