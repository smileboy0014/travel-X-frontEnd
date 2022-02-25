import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as searchResultActions from "../../redux/store/modules/searchResult";
import mapBound from "../../redux/store/modules/mapBound";

export default function useInfiniteSearch(
  query,
  fromPageNumber,
  toPageNumber,
  filterValue
) {
  const [fromPage, setFromPage] = useState(0);
  const [totalHitCount, setTotalHitCount] = useState(1);
  const [roomCnt, setroomCnt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();
  const { searchDate } = useSelector((state) => state.date);

  const searchTypeValue = useSelector(({ searchType }) => searchType.value);

  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );

  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );

  const mapBoundValue = useSelector(({ mapBound }) => mapBound.value);
  const mapBoundSouthWestValue = useSelector(
    ({ mapBound }) => mapBound.southWest
  );
  const mapBoundNorthEastValue = useSelector(
    ({ mapBound }) => mapBound.northEast
  );

  function addZero(value) {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  }

  function paramsSerializer(paramObj) {
    return (paramObj = paramObj.join(","));
  }

  function FormattingDate(date) {
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  function setParam() {
    const parmas = {};
    if (filterValue.hotel && filterValue.hotel.length > 0) {
      return (parmas = {
        day:
          filterValue.rent && filterValue.rent.includes("hDay") ? true : false,
        checkinDate: FormattingDate(new Date(searchDate.start)),
        checkoutDate: FormattingDate(new Date(searchDate.end)),
        adult: adultCounterValue,
        child: childCounterValue,
        query: query,
        searchType:
          searchTypeValue == null ? "RANKING" : searchTypeValue.searchTypeValue,
        size: toPageNumber,
        types:
          paramsSerializer(filterValue.hotel).length > 0
            ? paramsSerializer(filterValue.hotel)
            : "HOTEL",
      });
    } else if (mapBoundValue > 0) {
      return (parmas = {
        day:
          filterValue.rent && filterValue.rent.includes("hDay") ? true : false,
        checkinDate: FormattingDate(new Date(searchDate.start)),
        checkoutDate: FormattingDate(new Date(searchDate.end)),
        adult: adultCounterValue,
        child: childCounterValue,
        query: query,
        top: mapBoundNorthEastValue["lat"],
        right: mapBoundNorthEastValue["lng"],
        bottom: mapBoundSouthWestValue["lat"],
        left: mapBoundSouthWestValue["lng"],
        searchType: "GEO_BOUNDING",
        size: toPageNumber,
      });
    } else {
      return (parmas = {
        day:
          filterValue.rent && filterValue.rent.includes("hDay") ? true : false,
        checkinDate: FormattingDate(new Date(searchDate.start)),
        checkoutDate: FormattingDate(new Date(searchDate.end)),
        adult: adultCounterValue,
        child: childCounterValue,
        query: query,
        searchType:
          searchTypeValue == null ? "RANKING" : searchTypeValue.searchTypeValue,
        size: toPageNumber,
      });
    }
  }

  useEffect(() => {
    if (rooms.item !== undefined) {
      setroomCnt(rooms.item.length);
    }
    setHasMore(roomCnt < totalHitCount);
  }, [rooms]);

  useEffect(() => {
    setRooms([]);
  }, [query]);

  useEffect(() => {
    console.log("9999999: " + mapBoundValue);

    console.log("88888888: " + mapBoundNorthEastValue["lat"]);
    console.log("88888888: " + mapBoundNorthEastValue["lng"]);
    console.log("99999999: " + mapBoundSouthWestValue["lat"]);
    console.log("99999999: " + mapBoundSouthWestValue["lng"]);
  }, [mapBoundValue]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let param = setParam();
    // debugger;
    axios({
      method: "GET",
      url: "http://shineware.iptime.org:5050/search",
      params: param,
    })
      .then((res) => {
        console.log(res);
        dispatch(searchResultActions.saveData(res.data.roomDocumentList));

        setTotalHitCount(res.data.totalHitCount);
        setRooms((prevState) => ({
          ...prevState,
          item: res.data.roomDocumentList,
        }));

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [
    query,
    toPageNumber,
    searchDate,
    adultCounterValue,
    childCounterValue,
    searchTypeValue,
    filterValue,
    mapBoundValue,
  ]);

  return { loading, error, rooms, hasMore };
}
