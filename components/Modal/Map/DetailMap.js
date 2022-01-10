import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";

const DetailMap = ({ lat, lng, markerArr }) => {
  const initMap = () => {
    // Brewery

    if (isMobile) {
      var roomMap = new naver.maps.Map("roomMap", {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 12,
      });
    } else {
      var roomMap = new naver.maps.Map("roomMap", {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 12,
        zoomControl: true,
      });
    }

    if (markerArr !== undefined) {
      for (var i = 0; i < markerArr.length; i++) {
        var marker = new naver.maps.Marker({
          map: roomMap,
          title: markerArr[i].location,
          position: new naver.maps.LatLng(markerArr[i].lat, markerArr[i].lng),
        });
      }
    } else {
      var roomMapMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3595704, 127.105399),
        map: roomMap,
      });
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div id="roomMap">
      <div style={{ width: "100%", height: "40rem" }}></div>
      <div style={{ width: "200px%", padding: "10px" }} />
    </div>
  );
};

export default DetailMap;
