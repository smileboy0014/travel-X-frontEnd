import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { DEFAULT_API_URL } from '../../shared/js/CommonConstant';
import * as spinnerActions from "../../redux/store/modules/spinnerOn";

const useReviewInfiniteVeiw = (roomId, roomType, fromPageNumber, toPageNumber, sortOption, onlyImage, callHttpMethod) => {

  // debugger;
  // console.log(`props is did!!!!##########################`);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [returnCallHttpMethod, setReturnCallHttpMethod] = useState(true);
  const [reviewData, setReviewData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [reviewSummary, setReveiwSummary] = useState({});

  const getReviewSummary = () => {

    axios({
      method: "GET",
      url: DEFAULT_API_URL + "/review/summary",
      params: {
        roomId: roomId,
        useType: roomType
      },
    }).then((res) => {
      if (res.data !== undefined) {
        setReveiwSummary(res.data);
        // console.log(`reviewSummary result is ${reviewSummary.averageReviewScore}`);
      }
    }).catch((error) => {
      console.log(error);
      setError(true);
    });
  }

  const getReviews = () => {
    // debugger;
    axios({
      method: "GET",
      url: DEFAULT_API_URL+"/review/get",
      params: {
        roomId: roomId,
        useType: roomType,
        from: fromPageNumber,
        size: toPageNumber,
        showHasImageOnly: onlyImage,
        sortOption: sortOption === '' ? 'DATE' : sortOption
      },
    }).then((res) => {

      if (res.data !== undefined) {
        // debugger;
        // setReviewData((prevState) => (
        //   [...prevState,
        //   ...res.data]

        // ));
        console.log(res.data);
        setReviewData(res.data);
        setLoading(false);
        // console.log(`getReviews result is ${reviewSummary.averageReviewScore}`);
      }
    }).catch((error) => {
      console.log(error);
      setError(true);
    })

  }



  // Review에서 무한 스크롤 hook에 의해서 정보 가져오는 API
  useEffect(() => {
    if (roomId != undefined && callHttpMethod) {
      setLoading(true);
      setError(false);
      // console.log('query', query);
      // console.log('toPageNumber', toPageNumber);
      // console.log('fromPageNumber', fromPageNumber);
      // console.log('filterValue', filterValue);
      // debugger;
      axios({
        method: "GET",
        url: DEFAULT_API_URL + "/review/get",
        params: {
          roomId: roomId,
          useType: roomType,
          from: fromPageNumber,
          size: toPageNumber,
          sortOption: sortOption === '' ? 'DATE' : sortOption
        },
      })
        .then((res) => {

          // debugger;
          // console.log(`무한 스크롤 API!!!!!! ${res.data}`);
          // console.log(`무한 스크롤 API 결과 방 갯수는 ${res.data.roomDocumentList.length}`);
          if (res.data !== undefined) {
            // debugger;
            let newArr = reviewData.concat(res.data);
            setReviewData(newArr);
            // console.log(`그전 리뷰 사이즈는 !!!!!! ${reviewData.length}`);
            // console.log(`현재 리뷰 사이즈는 !!!!!! ${newArr.length}`);

            setLoading(false);
            setReturnCallHttpMethod(false);
            // console.log(`getReviews result is ${reviewSummary.averageReviewScore}`);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    }

  }, [callHttpMethod]);

  useEffect(() => {
    // debugger;
    setHasMore(reviewData.length < reviewSummary.reviewCount);;

  }, [reviewData]);

  useEffect(() => {
    if (roomId !== undefined) {
      getReviewSummary();
    }
  }, []);

  useEffect(() => {
    // console.log(loading);
    dispatch(spinnerActions.setState(loading));
  }, [loading])

  // Review에서 (필터 검색 포함) 일반적으로 가져오는 API
  useEffect(() => {
    //  debugger;
    if (roomId !== undefined) {
      // console.log(`#####################call useEffect api call!!!!!##########################`);
      setLoading(true);
      reviewData.length = 0;
      getReviews();
    }

  }, [roomId, roomType, sortOption, onlyImage])


  return { reviewData, reviewSummary, hasMore, loading, error, returnCallHttpMethod };

}

export default useReviewInfiniteVeiw;