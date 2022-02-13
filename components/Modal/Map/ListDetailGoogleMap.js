import React, { useEffect, useState, Fragment, useCallback } from "react";
import { GoogleMap, useLoadScript, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import SearchMobileCard from "../../Card/SearchMobileCard";

const containerStyle = {
  width: '100%',
  height: "70rem"
};

var MARKER_ICON_URL =
"https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3.png";
var MARKER_HIGHLIGHT_ICON_URL =
  "https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3_over.png";

const DetailMap = ({ lat, lng, onRequestClosed }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVi31CDrC3Dyi8f166yV_-6WKocsk7I8E"
  });
  const searchDataValue = useSelector(({ searchResult }) => searchResult.data);
  const [roomData, setRoomData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [mobileWindows, setMobileWindows] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 37.4959854, lng: 127.0664091});

  const addRoomMapMarker = () => {
    console.log(searchDataValue[0]);
    if (searchDataValue[0] !== undefined && searchDataValue[0].length > 0 && isLoaded) {
      let tmpMarkers = [];
      let tmpMobileWindows = [];
      searchDataValue[0].map((room) => {
        let marker = {
          id: room.roomId + room.useType,
          position: {
            lat: room.location.lat,
            lng: room.location.lon
          }
        }

        let mobileContent = [
          {
            img: room.images[0],
            type: room.propertyType,
            name: room.propertyName,
            averageScore: room.reviewSummary.averageScore,
            reviewCount: room.reviewSummary.reviewCount,
            price: room.basePrice,
          },
          {
            img: room.images[0],
            type: room.propertyType,
            name: room.propertyName,
            averageScore: room.reviewSummary.averageScore,
            reviewCount: room.reviewSummary.reviewCount,
            price: room.basePrice,
          }
        ];
        
        tmpMobileWindows.push(mobileContent);
        tmpMarkers.push(marker);
      });

      setMapCenter({
        lat: searchDataValue[0][0].location.lat,
        lng: searchDataValue[0][0].location.lon
      });
      setMarkers(tmpMarkers);
      setMobileWindows(tmpMobileWindows);
    }
  };

  const handleActiveMarker = (index) => {
    setRoomData(mobileWindows[index]);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  useEffect(() => {
    setMarkers([]);
    addRoomMapMarker();
  }, [searchDataValue, isLoaded]);

  useEffect(() => {
    console.log(roomData);
  }, [roomData])

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          onLoad={handleOnLoad}
          id='list-detail-map'
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
        >
          {markers.map((marker, index) => (
            <Fragment key={index}>
              <Marker
                id={marker.id}
                position={marker.position}
                onClick={() => handleActiveMarker(index)}
              >
                {/* {activeMarker === marker.id ? (
                  <InfoWindow 
                    position={marker.position}
                    onCloseClick={() => setActiveMarker(null)}>
                    <div>{marker.id}</div>
                  </InfoWindow>
                ) : null} */}
              </Marker>
            </Fragment>
          ))}
          <SearchMobileCard
            data={roomData}
            closeModal={(value) => {
              onRequestClosed(value);
            }}
          />
        </GoogleMap>
      ) : null}
      
    </div>
  );
};

export default DetailMap;
