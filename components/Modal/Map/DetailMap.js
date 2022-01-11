import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import img from "../../../public/icon/ico_calender.svg";
import SearchCard_test from "../../Card/SearchCard_test";

const DetailMap = ({ lat, lng, markerArr }) => {
  var markers = [];
  var infoWindows = [];

  const initMap = () => {
    var roomMap = new naver.maps.Map("roomMap", {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 12,
      // zoomControl: true,
    });

    var IWpoint = roomMap.getCenter();

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

        var contentString = "";
        if (isMobile) {
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
        } else {
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
      }
    } else {
      var roomMapMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3595704, 127.105399),
        map: roomMap,
      });
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
          console.log(IWpoint);
          infoWindow.setPosition(IWpoint);
          infoWindow.open(roomMap, marker);
        }
      };
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div id="roomMap">
      <div style={{ width: "100%", height: "60rem" }}></div>
    </div>
  );
};

export default DetailMap;
