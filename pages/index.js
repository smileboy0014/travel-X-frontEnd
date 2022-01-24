import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Script from "next/script";
import Style from "../styles/Index.module.css";
import GeoLocationButton from "../components/Button/GeolocationButton";
import SearchMapModal from "./../components/Modal/Map/SearchMapModal_Bak";
import { useDispatch, useSelector } from "react-redux";
import * as mapActions from "../redux/store/modules/map";
import * as dateActions from "../redux/store/modules/date";
import SelectSearchLocationModal from "./../components/Modal/Map/SelectSearchLocationModal";
import PesonalModal from "../components/Modal/Personal/PersonalModal";
import BottomNavbar from "../components/NavBar/BottomNavbar";
import CalendarModal from './../components/Modal/Calendar/CalendarModal';

export default function Home() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const week = new Array('일', '월', '화', '수', '목', '금', '토');
  const [date, setDate] = useState([today, nextDay]);
  const [showSearchMapModal, setShowSearchMapModal] = useState(false);
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const [showSelectSearchLocationModal, setShowSelectSearchLocationModal] =
    useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.map);
  const { searchDate } = useSelector((state) => state.date);
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );
  const handleScriptLoaded = (value) => {
    dispatch(mapActions.setScriptLoaded(value));
  };

  useEffect(() => {
    dispatch(dateActions.setSearchDate({start: date[0].toJSON(), end: date[1].toJSON()}));
  }, [date]);

  return (
    <div className={Style.background}>
      <div className={Style.main}>
        <div className={Style.subMain}>
          {/* <Script
            type="text/javascript"
            src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ra1rvd631l&submodules=geocoder"
            onError={(e) => {
              console.error("Script failed to load", e);
            }}
            onLoad={() => {
              handleScriptLoaded(true);
            }}
          /> */}
          <Link href={"/search"} as={`/search`}>
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
              <button onClick={() => setCalendarModalOpen(true)}>{`${new Date(searchDate.start).getMonth()+1}.${new Date(searchDate.start).getDate()}(${week[new Date(searchDate.start).getDay()]}) - ${new Date(searchDate.end).getMonth()+1}.${new Date(searchDate.end).getDate()}(${week[new Date(searchDate.end).getDay()]})`}</button>
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
          
          <CalendarModal
            isOpen={calendarModalOpen}
            onRequestClose={() => setCalendarModalOpen(false)}
            setSearchDate={(value) => setSearchDate(value)}
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
