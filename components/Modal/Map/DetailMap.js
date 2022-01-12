import React, { useEffect, useState } from "react";
import { ConsoleView, isMobile } from "react-device-detect";
import img from "../../../public/icon/ico_calender.svg";
import SearchMobileCard from "../../Card/SearchMobileCard";

var markers = [];
var infoWindows = [];
var mobileWindows = [];
var mobileWindow_test = [];
var roomMap;

const DetailMap = ({ lat, lng, markerArr }) => {
  const [roomData, setRoomData] = useState([]);
  const [mobileSeq, setMobileSeq] = useState("");

  const initMap = () => {
    roomMap = new naver.maps.Map("roomMap", {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 12,
    });
  };

  const addRoomMapMarker = () => {
    if (markerArr !== undefined) {
      for (var i = 0; i < markerArr.length; i++) {
        var roomMapMarker = new naver.maps.Marker({
          map: roomMap,
          title: markerArr[i].location,
          icon: {
            content:
              '<table class="__se_tbl" style="border-width: 1px 1px 0px 0px; border-style: solid solid none none; border-color: rgb(204, 204, 204) rgb(204, 204, 204) currentColor currentColor; border-image: none;" border="0" cellspacing="0" cellpadding="0"><tbody>' +
              '<tr><td style="border-width: 0px 0px 1px 1px; border-style: none none solid solid; border-color: currentColor currentColor rgb(204, 204, 204) rgb(204, 204, 204); border-image: none; width: 40.06px; height: 32.4px; background-color: rgb(255, 255, 255);"><p>' +
              '<img style="left: 0px; top: 0px; width: 30px; height: 30px;" alt="" src="https://cdn-icons-png.flaticon.com/512/684/684908.png"></p></td>' +
              '<td style="border-width: 0px 0px 1px 1px; border-style: none none solid solid; border-color: currentColor currentColor rgb(204, 204, 204) rgb(204, 204, 204); border-image: none; width: 106.63px; height: 32.4px; background-color: rgb(255, 255, 255);"><p>지역: ' +
              markerArr[i].location +
              " 가격:" +
              markerArr[i].price +
              "</p></td>" +
              "</tr>" +
              "</tbody>" +
              "</table>",
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35),
          },
          position: new naver.maps.LatLng(markerArr[i].lat, markerArr[i].lng),
        });

        var contentString;
        var mobileContent;
        if (isMobile) {
          mobileContent = [
            {
              addr: markerArr[i].location,
              price: markerArr[i].price,
            },
          ];
        }

        if (!isMobile) {
          contentString =
            '<div class="ProductItem">																			' +
            '	<div class="ProductItem-address">서울 강남구 논현동 201-11</div>                                      ' +
            "	<!-- slide -->                                                                                  " +
            '	<div class="ProductSlide">                                                                      ' +
            '		<div class="swiper-container ProductSlide-container">                                       ' +
            '			<div class="swiper-wrapper ProductSlide-wrapper">                                       ' +
            '				<div class="ProductSlide-slide swiper-slide">                                       ' +
            '					<div class="ProductSlide-thumb">                                                ' +
            '						<a href="#;" class="ProductSlide-link">                                     ' +
            "						</a>                                                                        " +
            "					</div>                                                                          " +
            "				</div>                                                                              " +
            '				<div class="ProductSlide-slide swiper-slide">                                       ' +
            '					<div class="ProductSlide-thumb">                                                ' +
            '						<a href="#;" class="ProductSlide-link">                                     ' +
            "					      " +
            "						</a>                                                                        " +
            "					</div>                                                                          " +
            "				</div>                                                                              " +
            '				<div class="ProductSlide-slide swiper-slide">                                       ' +
            '					<div class="ProductSlide-thumb">                                                ' +
            '						<a href="#;" class="ProductSlide-link">                                     ' +
            "				       " +
            "						</a>                                                                        " +
            "					</div>                                                                          " +
            "				</div>                                                                              " +
            "			</div>                                                                                  " +
            "		</div>                                                                                      " +
            '		<div class="ProductSlide-pagination swiper-pagination"></div>                               ' +
            "	</div>                                                                                          " +
            "	<!-- .slide -->                                                                                 " +
            '	<div class="ProductItemCont">                                                                   ' +
            '		<a href="#;" class="ProductItemCont-link">                                                  ' +
            '			<div class="ProductItemMeta">                                                           ' +
            '				<span class="ProductItemMeta-item icoHotel">호텔</span>                               ' +
            '				<span class="ProductItemMeta-item">슈페리어 트윈 호텔</span>                              ' +
            "			</div>                                                                                  " +
            '			<div class="ProductItemTitle">슈페리어 트윈 (넷플릭스 - 숙소 문의)</div>                           ' +
            '			<div class="ProductItemFilter">                                                         ' +
            '				<span class="ProductItemFilter-item">2인 기준 최대 4인</span>                            ' +
            '				<span class="ProductItemFilter-item">숙박 17시부터</span>                               ' +
            "			</div>                                                                                  " +
            '			<div class="ProductItemPrice">                                                          ' +
            '				<span class="ProductItemPrice-current">79,000원</span>                               ' +
            '				<span class="ProductItemPrice-condition">70,000원+9,000원(1인추가)</span>               ' +
            "			</div>                                                                                  " +
            "		</a>                                                                                        " +
            "	</div>                                                                                          ";
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
      }
    }
    naver.maps.Event.addListener(roomMap, "dragend", function (e) {
      console.log("dragend: " + e.coord);
    });

    for (var i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
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
    const a = getGeocode();
    console.log("좌표: " + a);
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
