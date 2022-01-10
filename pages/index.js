import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Script from "next/script";
import Style from "../styles/Index.module.css";
import GeoLocationButton from "../components/Button/GeolocationButton";
import SearchMapModal from "./../components/Modal/Map/SearchMapModal";
import { useDispatch, useSelector } from "react-redux";
import * as mapActions from "../redux/store/modules/map";
import SelectSearchLocationModal from "./../components/Modal/Map/SelectSearchLocationModal";
import PesonalModal from "../components/Modal/Personal/PersonalModal";
import BottomNavbar from "../components/NavBar/BottomNavbar";

export default function Home() {
  const [showSearchMapModal, setShowSearchMapModal] = useState(false);
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const [showSelectSearchLocationModal, setShowSelectSearchLocationModal] =
    useState(false);
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.map);
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );
  const handleScriptLoaded = (value) => {
    dispatch(mapActions.setScriptLoaded(value));
  };

  return (
    <div className={Style.background}>
      <div className={Style.main}>
        <div className={Style.subMain}>
          <Script
            type="text/javascript"
            src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ra1rvd631l&submodules=geocoder"
            onError={(e) => {
              console.error("Script failed to load", e);
            }}
            onLoad={() => {
              handleScriptLoaded(true);
            }}
          />
          <Link href="/search" as={`/search`}>
            <a>
              <img className={Style.img} src="/SearchBar2.jpg" />
            </a>
          </Link>
          <div>
            <div className={Style.button1}>
              <GeoLocationButton
                showSelectSearchLocationModal={() =>
                  setShowSelectSearchLocationModal(true)
                }
              />
            </div>
            <div className={Style.button2}>
              <button>12/30 ~ 12/31 1박2일</button>
              <button onClick={() => setPersonalModalOpen(true)}>
                {"성인: " + adultCounterValue + " 아동: " + childCounterValue}
              </button>
            </div>
          </div>

          <PesonalModal
            isOpen={personalModalOpen}
            onRequestClose={() => setPersonalModalOpen(false)}
          />

          <SelectSearchLocationModal
            onClose={() => setShowSelectSearchLocationModal(false)}
            show={showSelectSearchLocationModal}
            showSearchMapModal={() => setShowSearchMapModal(true)}
          />
          <SearchMapModal
            onClose={() => setShowSearchMapModal(false)}
            show={showSearchMapModal}
          />
          <p>
            {addresses.map((addr, index) => (
              <Fragment key={index}>
                {addr}
                <br />
              </Fragment>
            ))}
          </p>
        </div>
        <BottomNavbar></BottomNavbar>
      </div>
    </div>
  );
}
