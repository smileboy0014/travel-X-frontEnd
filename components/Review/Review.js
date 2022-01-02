import React, {useEffect, useState} from "react";
import reviewStyle from "../../styles/Review.module.css";
import ReviewContents from "./ReviewContents";
import ReviewWriteModal from "../Modal/Review/ReviewWriteModal";
import ReviewDetailModal from "../Modal/Review/ReviewDetailModal";
import * as reviewData from "../../redux/store/modules/reviewContent";
import {useSelector, useDispatch} from "react-redux";

const Review = () => {
    const [review, setReview] = useState('');
    const [reviewWriteModalOpen, setReviewWriteModalOpen] = useState(false);
    const [reviewDetailModalOpen, setReviewDetailModalOpen] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(({ reviewContent }) => reviewContent.data
    );
   
    const [viewContent, setViewContent] = useState([
        {
            title: "위치가 좋네요",
            content: "위치가 너무 좋아요!! 다음에 또 올게요"
        }, {
            title: "숙소 청결합니다.",
            content: "깔끔합니다!!"
        }, {
            title: "주인아저씨 넘 친절쓰",
            content: "우리집인줄"
        }, {
            title: "다음에 또 올게요!!",
            content: "너무 친절해요 ㅎㅎ"
        }
    ]);

    useEffect(()=>{
      // console.log(data);
        if(data.content != '' && data.title != ''){
          setViewContent(viewContent.concat({...data }));
          dispatch(reviewData.setData({title:'', content:''}));
        }
    },[data])

    
    const handleOpenModal = (type) => {
        if (type == 'view') {
            setReviewDetailModalOpen(true);
        } else if (type == 'write') {
            setReviewWriteModalOpen(true);
        }
    }

    return (
        <div className={reviewStyle.App}>
            <h1>[ 숙소 후기 ]</h1>
            <div className={reviewStyle.reviewContainer}>
                {
                    viewContent.map((element, idx) => (
                        idx < 4
                            ? <ReviewContents key={idx} title={element.title} content={element.content}/>
                            : <div key={idx}/>
                    ))
                }
            </div>

            <button onClick={() => handleOpenModal('view')}>
                전체 리뷰 보기</button>
            <button onClick={() => handleOpenModal('write')}>
                리뷰 작성 하기</button>

            <ReviewWriteModal
                isOpen={reviewWriteModalOpen}
                onRequestClose={() => setReviewWriteModalOpen(false)}
                setData={setReview}
                myStyle={reviewStyle}/>

            <ReviewDetailModal
                data={viewContent}
                isOpen={reviewDetailModalOpen}
                onRequestClose={() => setReviewDetailModalOpen(false)}/>

        </div>
    )
}
export default Review;