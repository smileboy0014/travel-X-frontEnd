import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";

const DetailMap = ({ lat, lng, markerArr }) => {
  const initMap = () => {
    // Brewery

    if (isMobile) {
      var roomMap = new naver.maps.Map("roomMap", {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 10,
      });
    } else {
      var roomMap = new naver.maps.Map("roomMap", {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 10,
        zoomControl: true,
      });
    }

    if (markerArr !== undefined) {
      var roomMapMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: roomMap,
      });
    } else {
      // var roomMapMarker = new naver.maps.Marker({
      //   position: new naver.maps.LatLng(37.3595704, 127.105399),
      //   map: roomMap,
      // });
      // var roomMapMarker = new naver.maps.Marker({
      //   position: new naver.maps.LatLng(lat + 1, lng + 1),
      //   map: roomMap,
      // });
      for (var i = 0; i < 10; i++) {
        var position = new naver.maps.LatLng(lat + i, lng + i);
        var roomMapMarker = new naver.maps.Marker({
          map: roomMap,
          position: position,
          title: key,
        });
      }
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div id="roomMap">
      <div style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
};

export default DetailMap;
