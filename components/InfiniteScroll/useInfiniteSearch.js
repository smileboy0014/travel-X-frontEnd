import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function useInfiniteSearch(query, fromPageNumber, toPageNumber) {
  const [fromPage, setFromPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );

  useEffect(() => {
    console.log("fromPageNumber:" + fromPageNumber);
    console.log("toPageNumber: " + toPageNumber);
  }, [fromPageNumber, toPageNumber]);

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
        checkinDate: "20211223",
        checkoutDate: "20211224",
        adult: adultCounterValue,
        query: query,
        from: fromPageNumber,
        size: toPageNumber,
      },
    }).then((res) => {
      if (
        res.data.roomDocumentList !== undefined &&
        res.data.roomDocumentList.length > 0
      ) {
        setRooms((prevState) => ({
          ...prevState,
          item: res.data.roomDocumentList ? res.data.roomDocumentList : [],
        }));

        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    });
  }, [query, toPageNumber]);

  return { loading, error, rooms, hasMore };
}
