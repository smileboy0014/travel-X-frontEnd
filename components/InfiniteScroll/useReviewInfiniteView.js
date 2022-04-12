import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const  useReviewInfiniteVeiw = (roomId, roomType,toPageNumber,sortOption, callHttpMethod) =>{

  // debugger;
  const [loading, setLoading] = useState(true);
  const [fromPage, setFromPage] = useState(0);
  const [totalReveiwCnt,setTotalReviewCnt] = useState(0);
  const [reviewCnt, setReviewCnt] = useState(0);
  const [error, setError] = useState(false);
  const [httpCallEnd,setHttpCallEnd] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [reviewSummary, setReveiwSummary] = useState(null);

  const getReviewSummary = async () => {
    setHttpCallEnd(true);

    await axios({
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
        setReviews(res.data);
        setLoading(false);
      }
    }).catch((error) => {
      console.log(error);
      setError(true);
    })

  }


  useEffect(()=>{
    setReviews([]);
  },[roomId])

  useEffect(()=>{
    debugger;
    if(reviews !== undefined){
      setReviewCnt(reviews.length);
    }
    setHasMore(reviewCnt< totalReveiwCnt);;
    
  }, [reviews]);

   useEffect(()=>{
     debugger;
    const response = getReviewSummary();
    if(response){
      getReviews();
    }

  },[roomId, roomType,toPageNumber, sortOption, callHttpMethod])
 
return{reviews,reviewSummary,hasMore,loading, error, httpCallEnd};

}

export default useReviewInfiniteVeiw;