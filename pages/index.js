import { useState, useEffect, Fragment } from 'react';
import Link from "next/link";
import Script from 'next/script';
import styles from "../styles/Home.module.css";
import GeoLocationButton from '../components/Button/GeolocationButton';
import SearchMapModal from './../components/Modal/Map/SearchMapModal';
import { useDispatch, useSelector } from "react-redux";
import * as mapActions from "../redux/store/modules/map";
import SelectSearchLocationModal from './../components/Modal/Map/SelectSearchLocationModal';

export default function Home() {
  const [showSearchMapModal, setShowSearchMapModal] = useState(false);
  const [showSelectSearchLocationModal, setShowSelectSearchLocationModal] = useState(false);
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.map);

  const handleScriptLoaded = (value) => {
    dispatch(mapActions.setScriptLoaded(value));
  }

  return (
    <div className={styles.main}>
      <Script
        type="text/javascript"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ra1rvd631l&submodules=geocoder"
        onError={(e) => {
          console.error('Script failed to load', e);
        }}
        onLoad={() => { handleScriptLoaded(true) }}
      />
      <Link href="/search" as={`/search`}>
        <a>
          <img src="/main.jpg" />
        </a>
      </Link>
      <GeoLocationButton showSelectSearchLocationModal={() => setShowSelectSearchLocationModal(true)} />
      <SelectSearchLocationModal
        onClose={() => setShowSelectSearchLocationModal(false)}
        show={showSelectSearchLocationModal}
        showSearchMapModal={() => setShowSearchMapModal(true)}
      />
      <SearchMapModal
        onClose={() => setShowSearchMapModal(false)}
        show={showSearchMapModal}
      />
      <p>{addresses.map((addr, index) => (
          <Fragment key={index}>
            {addr}
            <br />
          </Fragment>
        ))}
      </p>
       
    </div>
  );
}
