import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import SearchMobileCard from "../../Card/SearchMobileCard";
// import * as test from "./MarkerOverlappingRecognizer";

var markers = [];
var infoWindows = [];
var mobileWindows = [];
var roomMap;

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
    lat: "37.5492077",
    lng: "127.1464824",
  }, // 강동구 중심좌표
  {
    price: "13,000원",
    location: "강북",
    lat: "37.6469954",
    lng: "127.0147158",
  }, // 강북구 중심좌표
  {
    price: "14,000원",
    location: "강서",
    lat: "37.5657617",
    lng: "126.8226561",
  }, // 강서구 중심좌표
  {
    price: "15,000원",
    location: "관악",
    lat: "37.4603732",
    lng: "126.9536086",
  }, // 관악구 중심좌표
  {
    price: "16,000원",
    location: "광진",
    lat: "37.5574120",
    lng: "127.0796211",
  }, // 광진구 중심좌표
  {
    price: "17,000원",
    location: "구로",
    lat: "37.4954856",
    lng: "126.858121",
  }, // 구로구 중심좌표
  {
    price: "18,000원",
    location: "금천",
    lat: "37.4600969",
    lng: "126.9001546",
  }, // 금천구 중심좌표
  {
    price: "19,000원",
    location: "노원",
    lat: "37.6377533",
    lng: "127.0754623",
  }, // 노원구 중심좌표
  {
    price: "10,000원",
    location: "도봉",
    lat: "37.6658609",
    lng: "127.0317674",
  }, // 도봉구 중심좌표
  {
    price: "21,000원",
    location: "동대문",
    lat: "37.5838012",
    lng: "127.0507003",
  }, // 동대문구 중심좌표
  {
    price: "31,000원",
    location: "동작",
    lat: "37.4965037",
    lng: "126.9443073",
  }, // 동작구 중심좌표
  {
    price: "31,000원",
    location: "마포",
    lat: "37.5676507",
    lng: "126.8854549",
  }, // 마포구 중심좌표
  {
    price: "41,000원",
    location: "서대문",
    lat: "37.5820369",
    lng: "126.9356665",
  }, // 서대문구 중심좌표
  {
    price: "51,000원",
    location: "서초",
    lat: "37.4769528",
    lng: "127.0378103",
  }, // 서초구 중심좌표
  {
    price: "61,000원",
    location: "성동",
    lat: "37.5506753",
    lng: "127.0409622",
  }, // 성동구 중심좌표
  {
    price: "71,000원",
    location: "성북",
    lat: "37.606991",
    lng: "127.0232185",
  }, // 성북구 중심좌표
  {
    price: "81,000원",
    location: "송파",
    lat: "37.5177941",
    lng: "127.1127078",
  }, // 송파구 중심좌표
  {
    price: "91,000원",
    location: "양천",
    lat: "37.5270616",
    lng: "126.8561534",
  }, // 양천구 중심좌표
  {
    price: "111,000원",
    location: "영등포",
    lat: "37.520641",
    lng: "126.9139242",
  }, // 영등포구 중심좌표
  {
    price: "112,000원",
    location: "용산",
    lat: "37.5311008",
    lng: "126.9810742",
  }, // 용산구 중심좌표
  {
    price: "113,000원",
    location: "은평",
    lat: "37.6176125",
    lng: "126.9227004",
  }, // 은평구 중심좌표
  {
    price: "114,000원",
    location: "종로",
    lat: "37.5990998",
    lng: "126.9861493",
  }, // 종로구 중심좌표
  {
    price: "115,000원",
    location: "중구",
    lat: "37.5579452",
    lng: "126.9941904",
  }, // 중구 중심좌표
  {
    price: "116,000원",
    location: "중랑구",
    lat: "37.598031",
    lng: "127.092931",
  }, // 중랑구 중심좌표
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

    // const woody = test.MarkerOverlappingRecognizer.setMap(roomMap);
  };

  const addRoomMapMarker = () => {
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
        if (isMobile) {
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
        } else {
          contentString =
            '<div class="ProductItem">						                          															 ' +
            '	<div class="ProductItem-address">																								 ' +
            room.address +
            "</div>                                      																						 " +
            "	<!-- slide -->                                                                                  								 " +
            '	<div class="ProductSlide">                                                                      								 ' +
            '		<div class="swiper-container ProductSlide-container">                                      									 ' +
            '			<div class="swiper-wrapper ProductSlide-wrapper">                                       								 ' +
            '				<div class="ProductSlide-slide swiper-slide">                                       								 ' +
            '					<div class="ProductSlide-thumb">                                                								 ' +
            '						<div class="ProductSlide-link">                                     										 ' +
            '             <img alt="" src="https://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg">' +
            "					  </img>                                                                   										 " +
            "					</idv>                                                                     										 " +
            "				</div>                                                                         										 " +
            "			</div>                                                                             										 " +
            "		</div>                                                                                 										 " +
            "	</div>                                                                                     										 " +
            '		<div class="ProductSlide-pagination swiper-pagination"></div>                          										 ' +
            "	</div>                                                                                     										 " +
            "	<!-- .slide -->                                                                            										 " +
            '	<div class="ProductItemCont">                                                              										 ' +
            '		<a href="#;" class="ProductItemCont-link">                                             										 ' +
            '			<div class="ProductItemMeta">                                                      										 ' +
            '				<span class="ProductItemMeta-item icoHotel">																	     ' +
            room.propertyType +
            "</span>                               " +
            '				<span class="ProductItemMeta-item">' +
            room.propertyName +
            "</span>                              " +
            "			</div>                                                                             										    " +
            '			<div class="ProductItemTitle">' +
            room.roomName +
            "</div>                           " +
            '			<div class="ProductItemFilter">                                                    										    ' +
            '				<span class="ProductItemFilter-item">' +
            room.baseUser +
            "인 기준 최대 4인</span>                            " +
            '				<span class="ProductItemFilter-item">숙박 ' +
            room.checkinInfo +
            "시 부터</span>                               " +
            "			</div>                                                                             										    " +
            '			<div class="ProductItemPrice">                                                     										    ' +
            '				<span class="ProductItemPrice-current">' +
            room.basePrice +
            "</span>                               " +
            '				<span class="ProductItemPrice-condition">70,000원+9,000원(1인추가)</span>          										    ' +
            "			</div>                                                                             										    " +
            "		</a>                                                                                   										    " +
            "	</div>                                                                                     										    ";
        }

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

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          if (!isMobile) {
            infoWindow.open(roomMap, marker);
          } else {
            setRoomData(mobileWindows[seq]);
          }
        }
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
          {isMobile == true && (
            <SearchMobileCard data={roomData}></SearchMobileCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailMap;
