import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import SearchMobileCard from "../../Card/SearchMobileCard";
import { MarkerOverlapRecognizer } from "./MarkerOverlappingRecognizer";
import Style from "../../../styles/Component.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as mapBoundActions from "../../../redux/store/modules/mapBound";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

var markers = [];
var mobileWindows = [];
var roomMap;
var recognizer;
var selectedId = "";
var selectedMarker;

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
};

const mapPinStyle = Style["MapPin"];
const mapPinCountStyle = Style["MapPin-count"];
const mapPinPriceStyle = Style["MapPin-price"];

const DetailMap = ({ lat, lng, onRequestClosed }) => {
  const searchDataValue = useSelector(({ searchResult }) => searchResult.data);
  const [slide, setSlide] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [mapObserver, setMapObserver] = useState(0);
  const [mapSouthWest, setMapSouthWest] = useState({
    lat: "",
    lng: "",
  });

  const [mapNorthEast, setMapNorthEast] = useState({
    lat: "",
    lng: "",
  });

  const dispatch = useDispatch();

  const initVars = () => {
    markers.map(marker => {
      marker.setMap(null);
    });
    recognizer.setMap(null);

    markers = [];
    mobileWindows = [];
    recognizer = null;
    selectedId = "";
    selectedMarker = null;
  };

  const initMap = () => {
    if (searchDataValue[0] !== undefined && searchDataValue[0][0] !== undefined) {
      if (roomMap == null) {
        roomMap = new naver.maps.Map("roomMap", {
          center: new naver.maps.LatLng(
            searchDataValue[0][0].location.lat,
            searchDataValue[0][0].location.lon
          ),
          zoom: 14,
        });
      } else {
        let newCenter = new naver.maps.LatLng(
          searchDataValue[0][0].location.lat,
          searchDataValue[0][0].location.lon
        );

        roomMap.setCenter(newCenter);
      }

      recognizer = new MarkerOverlapRecognizer({
        highlightRect: false,
        tolerance: 5,
      });
      recognizer.setMap(roomMap);
    }
  };

  const clusteringByLocation = (rooms) => {
    let clusters = [];
    let prev = { lat: 0, lon: 0 };
    let curIndex = -1;

    rooms.sort((a, b) => {
      return a.basePrice - b.basePrice;
    });

    rooms.sort((a, b) => {
      if (a.location.lat == b.location.lat) {
        return a.location.lon - b.location.lon;
      }
      return a.location.lat - b.location.lat;
    });

    rooms.map((room) => {
      if (room.location.lat == prev.lat && room.location.lon == prev.lon) {
        clusters[curIndex].items.push(room);
        clusters[curIndex].count++;
      } else {
        let cluster = {
          index: ++curIndex,
          count: 1,
          minPrice: room.basePrice,
          items: [room],
        };

        clusters.push(cluster);
        prev = room.location;
      }
    });

    return clusters;
  };

  const priceComma = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const addRoomMapMarker = () => {
    console.log("addRoomMapMarker Function : ", searchDataValue[0]);

    if (searchDataValue[0] !== undefined) {
      let clusters = clusteringByLocation(Array.from(searchDataValue[0]));
      
      clusters.map((cluster) => {
        let price =
          cluster.count == 1 ? `${cluster.minPrice}` : `${cluster.minPrice} ~`;
        var roomMapMarker = new naver.maps.Marker({
          map: roomMap,
          title: cluster.items[0].propertyName,
          icon: {
            content:
              `<button id="map_${cluster.items[0].roomId}" class="${mapPinStyle}">` +
                (cluster.count > 1 ?
                `<span class="${mapPinCountStyle}">${cluster.count}</span>` 
                : "") +
                `<span class="${mapPinPriceStyle}">${priceComma(price)}</span>` +
              "</button>",
            size: new naver.maps.Size(24, 37),
            anchor: new naver.maps.Point(12, 37),
            elementId: `map_${cluster.items[0].roomId}`,
          },
          position: new naver.maps.LatLng(
            cluster.items[0].location.lat,
            cluster.items[0].location.lon
          ),
        });

        let mobileWindow = [];
        cluster.items.map((room) => {
          mobileWindow.push({
            img: room.images[0],
            type: room.propertyType,
            name: room.roomName,
            propertyName: room.propertyName,
            averageScore: room.reviewSummary ? room.reviewSummary.averageScore : 0,
            reviewCount: room.reviewSummary ? room.reviewSummary.reviewCount : 0,
            price: room.basePrice,
          });
        });

        mobileWindows.push(mobileWindow);
        markers.push(roomMapMarker);

        roomMapMarker.addListener("click", function (e) {
          if (
            selectedId != "" &&
            selectedMarker != null &&
            e.domEvent.target.parentElement.id != selectedId
          ) {
            document.getElementById(selectedId).className = Style["MapPin"];
            selectedMarker.setZIndex(100);
          }

          highlightMarker(e.overlay);
          selectedId = e.domEvent.target.parentElement.id;
          selectedMarker = e.overlay;
        });

        recognizer.add(roomMapMarker);
      });
    }

    naver.maps.Event.addListener(roomMap, "bounds_changed", function (e) {
      var bounds = roomMap.getBounds();
      var southWest = bounds.getSW();
      var northEast = bounds.getNE();

      setMapSouthWest({
        lat: southWest._lat,
        lng: southWest._lng,
      });

      setMapNorthEast({
        lat: northEast._lat,
        lng: northEast._lng,
      });
    });



    if (clusters != undefined) {
      for (var i = 0, ii = clusters.length; i < ii; i++) {
        naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
      }
    }

    function highlightMarker(roomMapMarker) {
      if (document.getElementById(roomMapMarker.icon.elementId) != null) {
        document.getElementById(roomMapMarker.icon.elementId).className =
          cx("MapPin", "is-Active");
      }

      roomMapMarker.setZIndex(1000);
      setMapObserver(mapObserver++);
    }

    function getClickHandler(seq) {
      return (e) => {
        setRoomData(mobileWindows[seq]);
      };
    }
  };

  useEffect(() => {
    setSlide(true);
  }, [roomData]);

  useEffect(() => {
    console.log("searchDataValue: ", searchDataValue);
    initMap();
    addRoomMapMarker();
    setRoomData([]);
    
    return () => {
      initVars();
    }
  }, [searchDataValue]);

  useEffect(() => {
    /* 리스트 보기로 화면이 닫혔을 때만 clean up. 
       재 검색 때마다 naver map 중복 할당하여 레이어 겹치는 버그 방지 */
    return () => {
      roomMap.destroy();
      roomMap = null;
    }
  }, []);

  // useEffect(() => {}, [mapSouthWest, mapNorthEast, test]);

  const onSearchMap = () => {
    dispatch(mapBoundActions.increment());
    dispatch(mapBoundActions.setNorthEast(mapNorthEast));
    dispatch(mapBoundActions.setSouthWest(mapSouthWest));
  };

  return (
    <div className={Style["MapSection"]}>
      <button className={cx("ListFixButton", "Current-search")} onClick={onSearchMap}>
        현 지도에서 검색
      </button>
      <div 
        id="roomMap" 
        style={mapContainerStyle} 
        // className={Style["MapSection-map"]}
        observer={mapObserver}
      >
      </div>
      <div className={Style["MapSectionInfo"]}>
        <div className="site-container">
          <SearchMobileCard
            data={roomData}
            closeModal={(value) => {
              onRequestClosed(value);
            }}
            initSlide={slide}
          ></SearchMobileCard>
        </div>
      </div>
    </div>
  );
};

export default DetailMap;
