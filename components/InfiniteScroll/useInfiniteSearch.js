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

  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );

  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );

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
        checkinDate: "20220123",
        checkoutDate: "20220124",
        adult: adultCounterValue,
        child: childCounterValue,
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
    });
  }, [query, toPageNumber]);

  return { loading, error, rooms, hasMore };
}
