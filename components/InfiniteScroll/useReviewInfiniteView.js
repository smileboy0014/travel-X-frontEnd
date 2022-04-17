import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const useReviewInfiniteVeiw = (roomId, roomType, toPageNumber, sortOption, callHttpMethod) => {

  // debugger;
  // console.log(`props is did!!!!##########################`);
  const [loading, setLoading] = useState(true);
  const [fromPage, setFromPage] = useState(0);
  const [totalReveiwCnt, setTotalReviewCnt] = useState(0);
  const [reviewCnt, setReviewCnt] = useState(0);
  const [error, setError] = useState(false);
  const [httpCallEnd, setHttpCallEnd] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [reviewSummary, setReveiwSummary] = useState(0);

  const getReviewSummary = () => {
    setHttpCallEnd(true);

    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/review/summary",
      params: {
        roomId: roomId,
        useType: roomType
      },
    }).then((res) => {
      if (res.data !== undefined) {
        setReveiwSummary(res.data);
        setTotalReviewCnt(res.data.reviewCount);
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
      url: "http://shineware.iptime.org:8081/review/get",
      params: {
        roomId: roomId,
        useType: roomType,
        from: fromPage,
        size: toPageNumber,
        sortOption: sortOption === '' ? 'DATE' : sortOption
      },
    }).then((res) => {

      if (res.data !== undefined) {
        // debugger;
        // contents 내용이 5줄이 넘어갈 경우 더 읽기 버튼 나오도록 수정
        // if(res.data.length > 0){
        //   let filterReviews = res.data.map((review)=>{
        //     if(review.contents.length > 275){
        //       review.moreContents = true;
        //     } else {
        //       review.moreContents = false;
        //     }
        // })
        // setReviews(filterReviews);
        // } else {
        //   setReviews(res.data);
        // }

        setReviewData(res.data);
        setLoading(false);
        // console.log(`getReviews result is ${reviewSummary.averageReviewScore}`);
      }
    }).catch((error) => {
      console.log(error);
      setError(true);
    })

  }

  useEffect(() => {
    // console.log(`useEffect reviewSummary result is ${reviewSummary.averageReviewScore}`);
  }, [reviewSummary]);

  useEffect(() => {
    // debugger;
    if (reviewData !== undefined) {
      setReviewCnt(reviewData.length);
    }
    setHasMore(reviewCnt < totalReveiwCnt);;

  }, [reviewData]);

  useEffect(() => {
    //  debugger;
    // const response = getReviewSummary();
    // if(response){
    //   getReviews();
    // }
    // console.log(`#####################call useEffect api call!!!!!##########################`);
    // console.log(`roomId is ${roomId} ###################################`);
    // console.log(`roomType is ${roomType} ##########################`);
    // console.log(`toPageNumber is ${toPageNumber} ##########################`);
    // console.log(`sortOption is ${sortOption} #########################`);
    // console.log(`callHttpMethod is ${callHttpMethod}##########################`);

    if (roomId !== undefined) {
      console.log(`#####################call useEffect api call!!!!!##########################`);
      getReviewSummary();
      getReviews();
    }

  }, [roomId, roomType, toPageNumber, sortOption, callHttpMethod])

  return { reviewData, reviewSummary, hasMore, loading, error, httpCallEnd };

}

export default useReviewInfiniteVeiw;