import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function useInfiniteSearch_test(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );

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
        size: pageNumber,
      },
    }).then((res) => {
      setRooms((prevState) => ({
        ...prevState,
        item: res.data.roomDocumentList ? res.data.roomDocumentList : [],
      }));

      setHasMore(
        res.data.roomDocumentList !== undefined &&
          res.data.roomDocumentList.length > 0
      );
      setLoading(false);
    });
  }, [query, pageNumber]);

  return { loading, error, rooms, hasMore };
}
