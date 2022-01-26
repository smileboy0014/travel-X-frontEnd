import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import SearchMobileCard from "../../Card/SearchMobileCard";
import { MarkerOverlapRecognizer } from "./MarkerOverlappingRecognizer";
import Style from "../../../styles/CommonModal.module.css";

var markers = [];
var infoWindows = [];
var mobileWindows = [];
var roomMap;
var recognizer;

var MARKER_ICON_URL =
  "https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3.png";
var MARKER_HIGHLIGHT_ICON_URL =
  "https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3_over.png";

const DetailMap = ({ lat, lng, onRequestClosed }) => {
  const searchDataValue = useSelector(({ searchResult }) => searchResult.data);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    console.log("searchDataValue: " + searchDataValue);
  }, [searchDataValue]);

  const initMap = () => {
    roomMap = new naver.maps.Map("roomMap", {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 10,
    });

    recognizer = new MarkerOverlapRecognizer({
      highlightRect: false,
      tolerance: 5,
    });
    recognizer.setMap(roomMap);
  };

  const addRoomMapMarker = () => {
    console.log(searchDataValue[0]);
    if (searchDataValue[0] !== undefined) {
      roomMap = new naver.maps.Map("roomMap", {
        center: new naver.maps.LatLng(
          searchDataValue[0][0].location.lat,
          searchDataValue[0][0].location.lon
        ),
        zoom: 12,
      });

      if (roomMap != null) {
        var w = window.outerWidth;
        var h = window.outerHeight;
        // 지도 element
        var el = document.getElementById("roomMap");
        el.style.width = "100%";
        el.style.height = h + "px";
      }

      searchDataValue[0].map((room, index) => {
        var roomMapMarker = new naver.maps.Marker({
          map: roomMap,
          title: room.propertyName,
          icon: {
            url: MARKER_ICON_URL,
            size: new naver.maps.Size(24, 37),
            anchor: new naver.maps.Point(12, 37),
          },
          // icon: {
          //   content:
          //     '<table class="__se_tbl" style="border-width: 1px 1px 0px 0px; border-style: solid solid none none; border-color: rgb(204, 204, 204) rgb(204, 204, 204) currentColor currentColor; border-image: none;" border="0" cellspacing="0" cellpadding="0"><tbody>' +
          //     '<tr><td style="border-width: 0px 0px 1px 1px; border-style: none none solid solid; border-color: currentColor currentColor rgb(204, 204, 204) rgb(204, 204, 204); border-image: none; width: 40.06px; height: 32.4px; background-color: rgb(255, 255, 255);"><p>' +
          //     '<img style="left: 0px; top: 0px; width: 30px; height: 30px;" alt="" src="https://cdn-icons-png.flaticon.com/512/684/684908.png"></p></td>' +
          //     '<td style="border-width: 0px 0px 1px 1px; border-style: none none solid solid; border-color: currentColor currentColor rgb(204, 204, 204) rgb(204, 204, 204); border-image: none; width: 106.63px; height: 32.4px; background-color: rgb(255, 255, 255);"><p>지역: ' +
          //     room.propertyType +
          //     " 가격:" +
          //     room.basePrice +
          //     "</p></td>" +
          //     "</tr>" +
          //     "</tbody>" +
          //     "</table>",
          //   size: new naver.maps.Size(22, 35),
          //   anchor: new naver.maps.Point(11, 35),
          // },
          position: new naver.maps.LatLng(room.location.lat, room.location.lon),
        });

        var mobileContent;

        mobileContent = [
          {
            img: room.images[0],
            tpye: room.propertyType,
            name: room.propertyName,
            averageScore: room.reviewSummary.averageScore,
            reviewCount: room.reviewSummary.reviewCount,
            price: room.basePrice,
          },
        ];

        markers.push(roomMapMarker);

        mobileWindows.push(mobileContent);

        roomMapMarker.addListener("click", function (e) {
          highlightMarker(e.overlay);
        });
        roomMapMarker.addListener("mouseout", function (e) {
          unhighlightMarker(e.overlay);
        });

        recognizer.add(roomMapMarker);
        // roomMapMarker.addListener("click", function (e) {
        //   var m = e.overlay;
        // });
      });
    }

    naver.maps.Event.addListener(roomMap, "dragend", function (e) {
      console.log("dragend: " + e.coord);
    });

    for (var i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
    }

    function highlightMarker(roomMapMarker) {
      var icon = roomMapMarker.getIcon();

      if (icon.url !== MARKER_HIGHLIGHT_ICON_URL) {
        icon.url = MARKER_HIGHLIGHT_ICON_URL;
        roomMapMarker.setIcon(icon);
      }

      roomMapMarker.setZIndex(1000);
    }

    function unhighlightMarker(roomMapMarker) {
      var icon = roomMapMarker.getIcon();

      if (icon.url === MARKER_HIGHLIGHT_ICON_URL) {
        icon.url = MARKER_ICON_URL;
        roomMapMarker.setIcon(icon);
      }

      roomMapMarker.setZIndex(100);
    }

    function getClickHandler(seq) {
      return function (e) {
        setRoomData(mobileWindows[seq]);
      };
    }
  };

  const getGeocode = () => {
    naver.maps.Service.geocode(
      {
        address: "불정로 6",
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something wrong!");
        } else {
          var result = response.result, // 검색 결과의 컨테이너
            items = result.items; // 검색 결과의 배열

          // console.log("result: " + items);
          // console.log("result: " + JSON.stringify(result.items[0].point));
          return result.items[0].point;
        }

        // do Something
      }
    );
  };

  useEffect(() => {
    initMap();
    addRoomMapMarker();
  }, [searchDataValue]);

  return (
    <div>
      <div id="roomMap" style={{ width: "100%", height: "50rem" }}>
        <SearchMobileCard
          data={roomData}
          closeModal={(value) => {
            onRequestClosed(value);
          }}
        ></SearchMobileCard>
      </div>
    </div>
  );
};

export default DetailMap;
