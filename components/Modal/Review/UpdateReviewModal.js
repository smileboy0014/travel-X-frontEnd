import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "react-modal";
import Style from "../../../styles/AddReviewModal.module.css";
import CommonStyle from "../../../styles/Component.module.css";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "../../Rating/StarRating";
import * as reviewData from "../../../redux/store/modules/reviewContent";
import classNames from 'classnames/bind';
import { number } from "prop-types";

const cx = classNames.bind(CommonStyle);

const UpdateReviewModal = ({ isOpen, isSave, onRequestClose, ...updateData}) => {
  
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [reviewContent, setReviewContent] = useState({
    title: "",
    content: "",
  });
  const [notice, setNotice] = useState([
    "한번 작성된 리뷰는 수정 불가능합니다.",
    "코인은 지급되지 않습니다.",
    "적립은 로그인 후 가능합니다.",
  ]);
  const [data, setData] = useState("");

  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일	

  const [priceScore, setPriceScore] = useState(0);
  const [kindnessScore, setKindnessScore] = useState(0);
  const [cleanScore, setCleanScore] = useState(0);
  const [facilityScore, setFacilityScore] = useState(0);
  const [comfortScore, setComfortScore] = useState(0);

  const [countNum, setCountNum] = useState(0);

  useEffect(() => {
    setReviewContent({
      ...reviewContent,
      content: data,
    });
  }, [data]);

  useEffect(() => {
    if(isOpen){
      // debugger;
      setKindnessScore(updateData.updateData.kindnessScore);
      setCleanScore(updateData.updateData.cleanScore);
      setFacilityScore(updateData.updateData.facilityScore);
      setComfortScore(updateData.updateData.comfortScore);
      setPriceScore(updateData.updateData.priceScore);
      setReviewContent({
        ...reviewContent,
        title: updateData.updateData.title,
        content: updateData.updateData.contents
      });
    }
  }, [isOpen]);

  useEffect(() => {
   
  }, [onRequestClose]);

  const handleCount = () => {
    return <>{countNum}/1000</>;
  };

  const handleNotice = () => {
    return notice.map((data, index) => <li key={index}>- {data}</li>);
  };
  const handleInput = () => {

    const formData = new FormData();

    if(imgFile != undefined){
      for (let i = 0; i < imgFile.length; i++) {
        formData.append('imageList['+i+']', imgFile[i]);
        // imageList.push(imgFile[i]);
      }
    }
   

    // formData.append('imageList[0]', imgFile[0]);
    // formData.append('review', review);
    // formData.append('review.date', formattingDate());
    formData.append('review.cleanScore',cleanScore);
    formData.append('review.comfortScore',comfortScore);
    formData.append('review.facilityScore',facilityScore);
    formData.append('review.kindnessScore',kindnessScore);
    formData.append('review.priceScore',priceScore);
    formData.append('review.title',reviewContent.title);
    formData.append('review.contents',reviewContent.content);
    formData.append('review.roomId',id);
    formData.append('review.useType',"NIGHT");
    formData.append('review.userId',"1234");
    formData.append('review.id', String(updateData.updateData.id));

    debugger;

    axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/review/update",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      console.log(`save is successed!!`);
      isSave(true);
      console.log(res);
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setReviewContent({ title: "", content: "" });
        onRequestClose(false);
      })
  };

  const handleChangeFile = (event) => {
    console.log(event.target.files)
    setImgFile(event.target.files);
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          // console.log(base64)
          if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString()

            setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
            //  console.log(images)
          }
        }
      }
    }

  }

  function formattingDate() {

    function pad(n) {
      return n < 10 ? "0" + n : n;
    }
    let now = new Date();

    return now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
  }

  const getTitleValue = (e) => {
    const { name, value } = e.target;
    setReviewContent({
      ...reviewContent,
      [name]: value,
    });
    // console.log(reviewContent);
  }

  const getContentValue = (e) => {
    const { value } = e.target;
    setCountNum(value.length);

    setReviewContent({
      ...reviewContent,
      content: value,
    });
    // console.log(reviewContent);
  };

  const getScoreValue = (score, type) =>{
    if(type === 'kind'){
      setKindnessScore(score)
    } else if(type === 'clean'){
      setCleanScore(score)
    } else if(type === 'comfortable'){
      setComfortScore(score)
    } else if(type === 'facility'){
      setFacilityScore(score)
    } else {
      setPriceScore(score)
    }

  }

  return (
    <>
      <Modal
        className={Style["Modal"]}
        overlayClassName={Style["Overlay"]}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
      >
        <div className={Style["dialogForm"]}>
          <div className={Style["form"]}>
            <label onClick={() => onRequestClose(false)}>X</label>
            <h2>[ 리뷰 수정 ]</h2>
            <br />
            <label>서비스&친절도는 어떠셨나요?</label>
            <input name="title"
                  type="number"
                  style={{marginLeft:"50px"}}
                  placeholder="점수 입력"
                  value={kindnessScore}
                  onChange={(e) => getScoreValue(e.target.value, "kind")}
                />
                <br />
            {/* <div className="box flex">{handleStarRating(1)}</div> */}
            <label>숙소&객실 청결도는 어떠셨나요?</label>
            <input name="title"
                 type="number"
                 style={{marginLeft:"50px"}}
                 placeholder="점수 입력"
                 value={cleanScore}
                 onChange={(e) => getScoreValue(e.target.value, "clean")}
                />
                <br />
            {/* <div className="box flex">{handleStarRating(2)}</div> */}
            <label>편안함은 어떠셨나요?</label>
            <input name="title"
                 type="number"
                 style={{marginLeft:"50px"}}
                 placeholder="점수 입력"
                 value={comfortScore}
                 onChange={(e) => getScoreValue(e.target.value, "comfortable")}
                />
                <br />
            {/* <div className="box flex">{handleStarRating(3)}</div> */}
            <label>시설&편의성는 어떠셨나요?</label>
            <input name="title"
                 type="number"
                 style={{marginLeft:"50px"}}
                 placeholder="점수 입력"
                 value={facilityScore}
                 onChange={(e) => getScoreValue(e.target.value, "facility")}
                />
                <br />
            {/* <div className="box flex">{handleStarRating(4)}</div> */}
            <label>가격만족도는 어떠셨나요?</label>
            <input name="title"
                type="number"
                style={{marginLeft:"50px"}}
                placeholder="점수 입력"
                value={priceScore}
                onChange={(e) => getScoreValue(e.target.value, "price")}
                />
                <br />
            {/* <div className={cx("box", "flex")}>{handleStarRating(5)}</div> */}
            <div className={Style["formWrapper"]}>
              <br />
              <h2>후기를 작성해주세요.</h2>
              <div>
                <input name="title"
                  onChange={getTitleValue}
                  value={reviewContent.title}
                  placeholder="제목을 입력해 주세요."
                />
              </div>
              <input type="file" id="file" onChange={handleChangeFile} multiple="multiple" />
              <textarea
                className={Style["area"]}
                name="content"
                onChange={getContentValue}
                value={reviewContent.content}
                placeholder="개인 정보 보호를 위해 개인 정보를 입력하지 마세요."
              />
              <br />
              <label>{handleCount()}</label>
              {/* <Editor setData={setData}></Editor> */}
            </div>
            <div className={Style["noticeWapper"]}>
              <label>유의사항</label>
              <br />
              <br />
              <ul>{handleNotice()}</ul>
            </div>
            <button className={Style["submitButton"]} onClick={handleInput}>
              등록
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateReviewModal;
