import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as searchResultActions from "../../redux/store/modules/searchResult";

export default function useInfiniteSearch(query, fromPageNumber, toPageNumber) {
  const [fromPage, setFromPage] = useState(0);
  const [totalHitCount, setTotalHitCount] = useState(1);
  const [roomCnt, setroomCnt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();
  const { searchDate } = useSelector((state) => state.date);

  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );

  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );

  function addZero(value) { 
    if (value >= 10) { 
      return value; 
    } 
    
    return `0${value}`; 
  } 
  
  function FormattingDate(date) { 
    console.log(date);
    const year = date.getFullYear(); 
    const month = addZero(date.getMonth() + 1); 
    const day = addZero(date.getDate()); 
    
    return `${year}${month}${day}`; 
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
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: "http://shineware.iptime.org:5050/search",
      params: {
        checkinDate: FormattingDate(new Date(searchDate.start)),
        checkoutDate: FormattingDate(new Date(searchDate.end)),
        adult: adultCounterValue,
        // child: childCounterValue,
        query: query,
        // from: fromPageNumber,
        size: toPageNumber,
      },
    }).then((res) => {
      console.log(res);
      dispatch(searchResultActions.saveData(res.data.roomDocumentList));

      setTotalHitCount(res.data.totalHitCount);
      setRooms((prevState) => ({
        ...prevState,
        item: res.data.roomDocumentList,
      }));

      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setError(true);
    });
  }, [query, toPageNumber, searchDate]);

  return { loading, error, rooms, hasMore };
}
