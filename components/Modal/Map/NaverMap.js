import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as mapActions from "../../../redux/store/modules/map";
import { isMobile } from "react-device-detect";

const NaverMap = (props) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [addresses, setAddresses] = useState("");
  const { scriptLoaded } = useSelector((state) => state.map);

  const dispatch = useDispatch();

  const setUserPos = (e) => {
    dispatch(mapActions.setPos({ latitude: latitude, longitde: longitude }));
    dispatch(mapActions.setAddr(addresses));
    props.closeSearchMapModal(e);
  };

  useEffect(() => {
    const initMap = () => {
      if (isMobile) {
        console.log("모바일 버젼");
        const mapOptions = {
          center: new naver.maps.LatLng(37.71344096516783, 126.8666797982575),
          zoom: 18,
        };
      } else {
        console.log("웹버젼");
        const mapOptions = {
          center: new naver.maps.LatLng(37.71344096516783, 126.8666797982575),
          zoom: 18,
          zoomControl: true,
        };
      }

      var infoWindow = new naver.maps.InfoWindow({
        anchorSkew: true,
      });

      const map = new naver.maps.Map("map", mapOptions);

      const marker = new naver.maps.Marker({
        position: window.naver.maps.LatLng(
          37.71344096516783,
          126.8666797982575
        ),
        map: map,
      });

      naver.maps.Event.addListener(map, "click", function (e) {
        marker.setPosition(e.coord);
      });

      map.setCursor("pointer");

      function searchCoordinateToAddress(latlng) {
        infoWindow.close();

        naver.maps.Service.reverseGeocode(
          {
            coords: latlng,
            orders: [
              naver.maps.Service.OrderType.ADDR,
              naver.maps.Service.OrderType.ROAD_ADDR,
            ].join(","),
          },
          function (status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
              return alert("Something Wrong!");
            }

            const items = response.v2.results,
              addresses = [],
              address = "";

            for (let i = 0, ii = items.length, item, addrType; i < ii; i++) {
              item = items[i];
              address = makeAddress(item) || "";
              addrType =
                item.name === "roadaddr" ? "[도로명 주소]" : "[지번 주소]";

              addresses.push(i + 1 + ". " + addrType + " " + address);
            }
            console.log(latlng);
            setLatitude(latlng.y);
            setLongitude(latlng.x);
            setAddresses(addresses);
          }
        );
      }

      function initGeocoder() {
        if (!map.isStyleMapReady) {
          return;
        }

        map.addListener("click", function (e) {
          searchCoordinateToAddress(e.coord);
        });
      }

      naver.maps.onJSContentLoaded = initGeocoder;
      naver.maps.Event.once(map, "init_stylemap", initGeocoder);
    };

    function makeAddress(item) {
      if (!item) {
        return;
      }

      var name = item.name,
        region = item.region,
        land = item.land,
        isRoadAddress = name === "roadaddr";

      var sido = "",
        sigugun = "",
        dongmyun = "",
        ri = "",
        rest = "";

      if (hasArea(region.area1)) {
        sido = region.area1.name;
      }

      if (hasArea(region.area2)) {
        sigugun = region.area2.name;
      }

      if (hasArea(region.area3)) {
        dongmyun = region.area3.name;
      }

      if (hasArea(region.area4)) {
        ri = region.area4.name;
      }

      if (land) {
        if (hasData(land.number1)) {
          if (hasData(land.type) && land.type === "2") {
            rest += "산";
          }

          rest += land.number1;

          if (hasData(land.number2)) {
            rest += "-" + land.number2;
          }
        }

        if (isRoadAddress === true) {
          if (checkLastString(dongmyun, "면")) {
            ri = land.name;
          } else {
            dongmyun = land.name;
            ri = "";
          }

          if (hasAddition(land.addition0)) {
            rest += " " + land.addition0.value;
          }
        }
      }

      return [sido, sigugun, dongmyun, ri, rest].join(" ");
    }

    function hasArea(area) {
      return !!(area && area.name && area.name !== "");
    }

    function hasData(data) {
      return !!(data && data !== "");
    }

    function checkLastString(word, lastString) {
      return new RegExp(lastString + "$").test(word);
    }

    function hasAddition(addition) {
      return !!(addition && addition.value);
    }

    // Naver Map Script 로드 후 맵 초기화
    if (scriptLoaded) initMap();
    console.log(scriptLoaded);
  }, [scriptLoaded]);

  return (
    <>
      <div id="map">
        <div style={{ width: "100%", height: "300px" }}></div>
      </div>
      {/* <button onClick={setUserPos}>확인</button> */}
    </>
  );
};

export default NaverMap;
