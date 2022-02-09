import React, { useEffect, useState } from "react";

var markers = [];
var roomMap;

var MARKER_ICON_URL =
  "https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3.png";

const DetailMap = ({ lat, lng }) => {
  const initMap = () => {
    roomMap = new naver.maps.Map("roomMap", {
      center: new naver.maps.LatLng(lat, lng),
      minZoom: 10,
      maxZoom: 21,
      // zoomControl: true,
      // zoomControlOptions: {
      //   //줌 컨트롤의 옵션
      //   position: naver.maps.Position.TOP_RIGHT,
      // },
    });
  };

  const addRoomMapMarker = () => {
    var roomMapMarker = new naver.maps.Marker({
      map: roomMap,
      icon: {
        url: MARKER_ICON_URL,
        size: new naver.maps.Size(24, 37),
        anchor: new naver.maps.Point(12, 37),
      },
      position: new naver.maps.LatLng(lat, lng),
    });

    markers.push(roomMapMarker);
  };

  useEffect(() => {
    initMap();
    addRoomMapMarker();
  }, []);

  return (
    <div>
      <div id="roomMap">
        <div style={{ width: "100%", height: "20rem" }}></div>
      </div>
    </div>
  );
};

export default DetailMap;
