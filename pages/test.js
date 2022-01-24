import React, { useEffect, useState } from "react";
import accidentDeath from "./data";
import MarkerClustering from "./MarkerClustering.js";
import $ from "jquery";

var map;

const test = () => {
  const initMap = () => {
    map = new naver.maps.Map("map", {
      zoom: 6,
      center: new naver.maps.LatLng(36.2253017, 127.6460516),
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    });

    var data = accidentDeath.accidentDeath;

    if (data !== undefined) {
      console.log("2222222222");

      var markers = [];
      var latlng;
      var marker;
      var roomMapMarker;

      // data.map(
      //   (item, idx) => (
      //     console.log("item.grd_la: " + item.grd_la),
      //     (roomMapMarker = new naver.maps.Marker({
      //       map: roomMap,
      //       position: new naver.maps.LatLng(item.grd_la, item.grd_lo),
      //     }))
      //   )
      // );

      data.map(
        (item, idx) => (
          (latlng = new naver.maps.LatLng(item.grd_la, item.grd_lo)),
          (marker = new naver.maps.Marker({
            position: latlng,
            draggable: true,
          })),
          markers.push(marker)
        )
      );

      var htmlMarker1 = {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../../public/images/cluster-marker-1.png);background-size:contain;"></div>',
          size: new naver.maps.Size(40, 40),
          anchor: new naver.maps.Point(20, 20),
        },
        htmlMarker2 = {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../../public/images/cluster-marker-2.png);background-size:contain;"></div>',
          size: new naver.maps.Size(40, 40),
          anchor: new naver.maps.Point(20, 20),
        },
        htmlMarker3 = {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../../public/images/cluster-marker-3.png);background-size:contain;"></div>',
          size: new naver.maps.Size(40, 40),
          anchor: new naver.maps.Point(20, 20),
        },
        htmlMarker4 = {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../../public/images/cluster-marker-4.png);background-size:contain;"></div>',
          size: new naver.maps.Size(40, 40),
          anchor: new naver.maps.Point(20, 20),
        },
        htmlMarker5 = {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../../public/images/cluster-marker-5.png);background-size:contain;"></div>',
          size: new naver.maps.Size(40, 40),
          anchor: new naver.maps.Point(20, 20),
        };

      // var markerClustering = new MarkerClustering({
      //   minClusterSize: 2,
      //   maxZoom: 13,
      //   map: map,
      //   markers: markers,
      //   disableClickZoom: false,
      //   gridSize: 120,
      //   icons: [
      //     htmlMarker1,
      //     htmlMarker2,
      //     htmlMarker3,
      //     htmlMarker4,
      //     htmlMarker5,
      //   ],
      //   indexGenerator: [10, 100, 200, 500, 1000],
      //   stylingFunction: function (clusterMarker, count) {
      //     $(clusterMarker.getElement()).find("div:first-child").text(count);
      //   },
      // });
    }
  };

  useEffect(() => {
    initMap();
  }, []);
  return (
    <div>
      <div id="map">
        <div style={{ width: "100%", height: "60rem" }}></div>
      </div>
    </div>
  );
};

export default test;
