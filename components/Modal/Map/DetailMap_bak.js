import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import SearchMobileCard from "../../Card/SearchMobileCard";
import { MarkerOverlapRecognizer } from "./MarkerOverlappingRecognizer";

var markers = [];
var infoWindows = [];
var mobileWindows = [];
var roomMap;
var recognizer;

var MARKER_ICON_URL =
  "https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3.png";
var MARKER_HIGHLIGHT_ICON_URL =
  "https://ssl.pstatic.net/static/maps/img/icons/sp_pins_spot_v3_over.png";

const markerArr = [
  {
    price: "1,000원",
    location: "불정로 6",
    lat: "37.4959854",
    lng: "127.0664091",
  }, // 강남구 중심좌표
  {
    price: "12,000원",
    location: "강동",
    lat: "37.4959854",
    lng: "127.0664091",
  }, // 강동구 중심좌표
];

const DetailMap = ({ lat, lng }) => {
  const searchDataValue = useSelector(({ searchResult }) => searchResult.data);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {}, [searchDataValue]);

  const initMap = () => {
    roomMap = new naver.maps.Map("roomMap", {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 12,
    });

    recognizer = new MarkerOverlapRecognizer({
      highlightRect: false,
      tolerance: 5,
    });
    recognizer.setMap(roomMap);
    // const woody = test.MarkerOverlappingRecognizer.setMap(roomMap);
  };

  const addRoomMapMarker = () => {
    console.log(searchDataValue[0]);
    if (searchDataValue[0] !== undefined) {
      // for (var i = 0; i < searchDataValue.length; i++) {
      // for (var i = 0; i < 5; i++) {

      var i = 0;

      searchDataValue[0].map((room, index) => {
        i = i + 1;
        if (i > 10) {
          i = 11;
        }
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
          position: new naver.maps.LatLng(markerArr[i].lat, markerArr[i].lng),
        });

        var contentString;
        var mobileContent;
        // if (isMobile) {
        mobileContent = [
          {
            img: markerArr[i].location,
            tpye: markerArr[i].location,
            name: markerArr[i].location,
            starRating: markerArr[i].location,
            review: markerArr[i].location,
            price: markerArr[i].price,
          },
        ];
        // } else {
        //   contentString =
        //     '<div class="ProductItem">						                          															 ' +
        //     '	<div class="ProductItem-address">																								 ' +
        //     room.address +
        //     "</div>                                      																						 " +
        //     "	<!-- slide -->                                                                                  								 " +
        //     '	<div class="ProductSlide">                                                                      								 ' +
        //     '		<div class="swiper-container ProductSlide-container">                                      									 ' +
        //     '			<div class="swiper-wrapper ProductSlide-wrapper">                                       								 ' +
        //     '				<div class="ProductSlide-slide swiper-slide">                                       								 ' +
        //     '					<div class="ProductSlide-thumb">                                                								 ' +
        //     '						<div class="ProductSlide-link">                                     										 ' +
        //     '             <img alt="" src="https://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg">' +
        //     "					  </img>                                                                   										 " +
        //     "					</idv>                                                                     										 " +
        //     "				</div>                                                                         										 " +
        //     "			</div>                                                                             										 " +
        //     "		</div>                                                                                 										 " +
        //     "	</div>                                                                                     										 " +
        //     '		<div class="ProductSlide-pagination swiper-pagination"></div>                          										 ' +
        //     "	</div>                                                                                     										 " +
        //     "	<!-- .slide -->                                                                            										 " +
        //     '	<div class="ProductItemCont">                                                              										 ' +
        //     '		<a href="#;" class="ProductItemCont-link">                                             										 ' +
        //     '			<div class="ProductItemMeta">                                                      										 ' +
        //     '				<span class="ProductItemMeta-item icoHotel">																	     ' +
        //     room.propertyType +
        //     "</span>                               " +
        //     '				<span class="ProductItemMeta-item">' +
        //     room.propertyName +
        //     "</span>                              " +
        //     "			</div>                                                                             										    " +
        //     '			<div class="ProductItemTitle">' +
        //     room.roomName +
        //     "</div>                           " +
        //     '			<div class="ProductItemFilter">                                                    										    ' +
        //     '				<span class="ProductItemFilter-item">' +
        //     room.baseUser +
        //     "인 기준 최대 4인</span>                            " +
        //     '				<span class="ProductItemFilter-item">숙박 ' +
        //     room.checkinInfo +
        //     "시 부터</span>                               " +
        //     "			</div>                                                                             										    " +
        //     '			<div class="ProductItemPrice">                                                     										    ' +
        //     '				<span class="ProductItemPrice-current">' +
        //     room.basePrice +
        //     "</span>                               " +
        //     '				<span class="ProductItemPrice-condition">70,000원+9,000원(1인추가)</span>          										    ' +
        //     "			</div>                                                                             										    " +
        //     "		</a>                                                                                   										    " +
        //     "	</div>                                                                                     										    ";
        // }

        var infoWindow = new naver.maps.InfoWindow({
          content: contentString,
          backgroundColor: "#eee", //박스안쪽영역 컬러
          borderColor: "#3B170B", //테두리컬러
          borderWidth: 3, //테두리 굵기
          anchorSize: new naver.maps.Size(0, 0),
          anchorSkew: false,
          anchorColor: "#eee",
          pixelOffset: new naver.maps.Point(20, -20),
        });

        markers.push(roomMapMarker);
        infoWindows.push(infoWindow);
        mobileWindows.push(mobileContent);

        roomMapMarker.addListener("mouseover", function (e) {
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
        var marker = markers[seq],
          infoWindow = infoWindows[seq];

        console.log("mobileWindows: " + mobileWindows[seq]);

        // if (infoWindow.getMap()) {
        //   infoWindow.close();
        // } else {
        // if (!isMobile) {
        //   infoWindow.open(roomMap, marker);
        // } else {
        setRoomData(mobileWindows[seq]);
        // }
        // }
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
    // const a = getGeocode();
    // console.log("좌표: " + a);
  }, [markerArr]);

  return (
    <div>
      <div id="roomMap">
        <div style={{ width: "100%", height: "60rem" }}>
          <SearchMobileCard data={roomData}></SearchMobileCard>
        </div>
      </div>
    </div>
  );
};

export default DetailMap;
