import React, {useCallback, useEffect, useState} from "react";
import Modal from "react-modal";
import style from "../../../styles/ReviewEditor.module.css"
import {useSelector, useDispatch} from "react-redux";
import * as reviewData from "../../../redux/store/modules/reviewContent";
import dynamic from "next/dynamic";

// 이렇게 안해주면 에러남;;
const Editor = dynamic(
    () => import ("../../../components/Editor/Editor"),
    {ssr: false}
);

const ReviewWriteModal = ({isOpen, setReview ,onRequestClose}) => {
    const dispatch = useDispatch();
    const [reviewContent, setReviewContent] = useState({title: '', content: ''});
    const [data, setData] = useState('');

    const getValue = useCallback((e) => {
        const {name, value} = e.target;

        setReviewContent({
            ...reviewContent,
            [name]: value
        })
        // console.log(reviewContent);
    }, []);

    useEffect(() => {
        setReviewContent({
            ...reviewContent,
            content: data
        })
        // console.log(reviewContent);
    }, [data]);

    const handleInput = useCallback(() => {
      
        dispatch(reviewData.setData({title:reviewContent.title, content:reviewContent.content}));
        setReviewContent({title: '', content: ''});
        onRequestClose(false);
    })

    return (
        <> < Modal isOpen = {
            isOpen
        }
        ariaHideApp = {
            false
        } > <label onClick={() => onRequestClose(false)}>X</label>
        <h2>[ 리뷰 작성 ]</h2>

        <div className={style.formWrapper}>
            <input
                className={style.titleInput}
                name='title'
                onChange={getValue}
                type='text'
                placeholder='제목'/>
            <Editor setData={setData}></Editor>
        </div>
        <button className={style.submitButton} onClick={handleInput}>입력</button>
    </Modal>
</>
    )
}

export default ReviewWriteModal;