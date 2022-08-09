import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as searchResultActions from "../../redux/store/modules/searchResult";
import * as spinnerActions from "../../redux/store/modules/spinnerOn";
import mapBound from "../../redux/store/modules/mapBound";
import {SEARCH_API_URL} from '../../shared/js/CommonConstant';

export default function useInfiniteSearch(
  query,
  fromPageNumber,
  toPageNumber,
  useType,
  propertyTypeValue,
  callHttpMethod

) {
  // debugger;
  // const [fromPage, setFromPage] = useState(0);
  const [totalHitCount, setTotalHitCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [returnCallHttpMethod, setReturnCallHttpMethod] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const { searchDate } = useSelector((state) => state.date);

  // const propertyTypeValue = useSelector(({ propertyType }) => propertyType);

  const searchTypeValue = useSelector(({ searchType }) => searchType.value);

  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );

  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );
  const babyCounterValue = useSelector(
    ({ babyCounter }) => babyCounter.value
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
    // debugger;
    return (paramObj = paramObj.join(","));
  }

  function FormattingDate(date) {
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  function setParam() {
// debugger;
    return {
      day: useType.DAY ? true : false,
      night: useType.NIGHT ? true : false,
      checkinDate: FormattingDate(new Date(searchDate.start)),
      checkoutDate: FormattingDate(new Date(searchDate.end)),
      adult: adultCounterValue,
      child: childCounterValue,
      baby: babyCounterValue,
      query: query,
      searchType:
        searchTypeValue == null ? "RANKING" : searchTypeValue,
      from: fromPageNumber,
      size: toPageNumber,
      types: paramsSerializer(propertyTypeValue)
    };
  }

  useEffect(() => {
    if (rooms.item !== undefined) {
    
    // debugger;
    setHasMore(rooms.item.length < totalHitCount);
    }
  }, [rooms]);

  // useEffect(() => {

  //   if (query != undefined) {
  //     setRooms([]);
  //   }
  // }, [query, useType]);

  useEffect(()=>{
    if(callHttpMethod){
      setReturnCallHttpMethod(callHttpMethod);
    }
  }, [callHttpMethod])

  useEffect(() => {
    // console.log("9999999: " + mapBoundValue);
    // console.log("88888888: " + mapBoundNorthEastValue["lat"]);
    // console.log("88888888: " + mapBoundNorthEastValue["lng"]);
    // console.log("99999999: " + mapBoundSouthWestValue["lat"]);
    // console.log("99999999: " + mapBoundSouthWestValue["lng"]);
  }, [mapBoundValue]);

  // 스피너 관련 useEffect
  useEffect(() => {
		// console.log(loading);
		dispatch(spinnerActions.setState(loading));
	}, [loading]);

  // SRP에서 검색 시(필터 검색 포함) 일반적으로 가져오는 API
  useEffect(() => {
    if (query != undefined) {
      console.log('일반적인 srp 결과 가져오는 API 시작!!!!!!');
      setLoading(true);
      setError(false);
      // console.log('query', query);
      // console.log('toPageNumber', toPageNumber);
      // console.log('searchDate', searchDate);
      // console.log('adultCounterValue', adultCounterValue);
      // console.log('childCounterValue', childCounterValue);
      // console.log('searchTypeValue', searchTypeValue);
      // console.log('useType', useType);
      const param = setParam();
      // console.log(`param type is ${param.types}`);
      // console.log(`param useType is ${param.searchType}`);
      // debugger;
      axios({
        method: "GET",
        url: SEARCH_API_URL+"/search",
        params: param,
      })
        .then((res) => {
          // debugger;
          // console.log(`######### API length is ${res.data.roomDocumentList.length}, totalCount is ${res.data.totalHitCount} #################`);
          // console.log(res.data.roomDocumentList);
          dispatch(searchResultActions.saveData(res.data.roomDocumentList));
          // console.log(`totalHitCount is ${res.data.totalHitCount}`);
          // debugger;
          setTotalHitCount(res.data.totalHitCount);
          setRooms((prevState) => (
            {
            ...prevState,
            item: res.data.roomDocumentList,
          }));
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        }).finally(()=>{
          setLoading(false);
        });
    }

  }, [
    query,
    searchDate,
    adultCounterValue,
    childCounterValue,
    searchTypeValue,
    useType,
    propertyTypeValue
  ]);

  // 지도에서 보기 들어가서 현 지도에서 검색 클릭 시 찾아오는 API
  useEffect(() => {
    if (mapBoundValue > 0) {
      var param = {
        // day: filterValue.rent && filterValue.rent.includes("hDay") ? true : false,
        // night: filterValue.rent && filterValue.rent.includes("fDay") ? true : false,
        day: useType.DAY ? true : false,
        night: useType.NIGHT  ? true : false,
        checkinDate: FormattingDate(new Date(searchDate.start)),
        checkoutDate: FormattingDate(new Date(searchDate.end)),
        adult: adultCounterValue,
        child: childCounterValue,
        top: mapBoundNorthEastValue["lat"],
        right: mapBoundNorthEastValue["lng"],
        bottom: mapBoundSouthWestValue["lat"],
        left: mapBoundSouthWestValue["lng"],
        searchType: "GEO_BOUNDING",
        size: toPageNumber,
      };
      // debugger;
      axios({
        method: "GET",
        url: SEARCH_API_URL+"/search",
        params: param,
      })
        .then((res) => {

          console.log(res);

          if (res.data.totalHitCount < 1) {
            alert('검색 결과가 없습니다.');
            return;
          }
          dispatch(searchResultActions.saveData(res.data.roomDocumentList));

          setTotalHitCount(res.data.totalHitCount);
          setRooms((prevState) => ({
            ...prevState,
            item: res.data.roomDocumentList,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }, [mapBoundValue]);

   // SRP에서 무한 스크롤 hook에 의해서 정보 가져오는 API
   useEffect(() => {
    if (query != undefined && callHttpMethod) {
      setLoading(true);
      setError(false);
      // console.log('query', query);
      // console.log('toPageNumber', toPageNumber);
      // console.log('fromPageNumber', fromPageNumber);
      // console.log('searchDate', searchDate);
      // console.log('adultCounterValue', adultCounterValue);
      // console.log('childCounterValue', childCounterValue);
      // console.log('searchTypeValue', searchTypeValue);
      // console.log('filterValue', filterValue);
      let param = setParam();
      // debugger;
      axios({
        method: "GET",
        url: SEARCH_API_URL+"/search",
        params: param,
      })
        .then((res) => {
          if (res.data.totalHitCount < 1) {
            alert('검색 결과가 없습니다.');
            return;
          }
          // debugger;
          // console.log(`무한 스크롤 API!!!!!! ${res.data}`);
          // console.log(`무한 스크롤 API 결과 방 갯수는 ${res.data.roomDocumentList.length}`);
          // dispatch(searchResultActions.saveData(res.data.roomDocumentList));

          setTotalHitCount(res.data.totalHitCount);
          // console.log(`totalHitCount is ${totalHitCount}`);
          let newArr = {item:rooms.item.concat(res.data.roomDocumentList)};
          setRooms(newArr);
          // console.log(`그전 방 크기는 !!!!!! ${rooms.item.length}`);
          
          setReturnCallHttpMethod(false);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        }).finally(()=>{
          setLoading(false);
        });
    }

  }, [callHttpMethod]);

  return { rooms, totalHitCount, hasMore, loading, error, returnCallHttpMethod };
}
