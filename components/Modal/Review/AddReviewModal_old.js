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

const AddReviewModal = ({ isOpen, isSave, onRequestClose }) => {
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

  // 경험
  const [rating1, setRating1] = useState(0);
  const [hoverRating1, setHoverRating1] = useState(0);
  const [starNumber1, setStarNumber1] = useState([1, 2, 3, 4, 5]);

  // 서비스 && 친절도
  const [rating2, setRating2] = useState(0);
  const [hoverRating2, setHoverRating2] = useState(0);
  const [starNumber2, setStarNumber2] = useState([6, 7, 8, 9, 10]);

  // 청결도
  const [rating3, setRating3] = useState(0);
  const [hoverRating3, setHoverRating3] = useState(0);
  const [starNumber3, setStarNumber3] = useState([11, 12, 13, 14, 15]);

  // 시설 && 편의성
  const [rating4, setRating4] = useState(0);
  const [hoverRating4, setHoverRating4] = useState(0);
  const [starNumber4, setStarNumber4] = useState([16, 17, 18, 19, 20]);

  // 교통 && 위치 접근성
  const [rating5, setRating5] = useState(0);
  const [hoverRating5, setHoverRating5] = useState(0);
  const [starNumber5, setStarNumber5] = useState([21, 22, 23, 24, 25]);

  const [countNum, setCountNum] = useState(0);

  useEffect(() => {
    setReviewContent({
      ...reviewContent,
      content: data,
    });
  }, [data]);

  useEffect(() => {
    setRating1(0);
    setHoverRating1(0);
    setRating2(0);
    setHoverRating2(0);
    setRating3(0);
    setHoverRating3(0);
    setRating4(0);
    setHoverRating4(0);
    setRating5(0);
    setHoverRating5(0);
    setCountNum(0);
    setKindnessScore(3)
  }, [onRequestClose]);

  const handleCount = () => {
    return <>{countNum}/1000</>;
  };

  const handleNotice = () => {
    return notice.map((data, index) => <li key={index}>- {data}</li>);
  };
  const handleInput = () => {

    const formData = new FormData();

    let imageList = [];

    let review = {
      date: formattingDate(),
      cleanScore: formattingScore(rating3),
      comfortScore: formattingScore(rating5),
      facilityScore: formattingScore(rating4),
      kindnessScore: formattingScore(rating2),
      priceScore: formattingScore(rating1),
      title: reviewContent.title,
      contents: reviewContent.content,
      roomId: id,
      useType: "NIGHT",
      userId: "미정"
    }

    if(imgFile != undefined){
      for (let i = 0; i < imgFile.length; i++) {
        formData.append('imageList['+i+']', imgFile[i]);
        // imageList.push(imgFile[i]);
      }
    }
   

    // formData.append('imageList[0]', imgFile[0]);
    // formData.append('review', review);
    // formData.append('review.date', formattingDate());
    formData.append('review.cleanScore',formattingScore(rating3));
    formData.append('review.comfortScore',formattingScore(rating5));
    formData.append('review.facilityScore',formattingScore(rating4));
    formData.append('review.kindnessScore',formattingScore(rating2));
    formData.append('review.priceScore',formattingScore(rating1));
    formData.append('review.title',reviewContent.title);
    formData.append('review.contents',reviewContent.content);
    formData.append('review.roomId',id);
    formData.append('review.useType',"NIGHT");
    formData.append('review.userId',"미정");



    // axios.post("http://shineware.iptime.org:8081/review/post", review, {
    //   headers: { "Content-Type": `multipart/form-data` }
    // }

    axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/review/register",
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

    //         axios({
    //   method: "POST",
    //   url: "http://shineware.iptime.org:8081/review/post",
    //   header: {"Content-Type": `application/json`},
    //   body: JSON.stringify(review)
    // }).then((res) => {
    //   console.log(`save is successed!!`);
    //   setReview(true);
    // }).catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setReviewContent({ title: "", content: "" });
    //     onRequestClose(false);
    //   });
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
          console.log(base64)
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

  const onSaveRating = (type, index) => {
    switch (type) {
      case 1:
        setRating1(index);
      case 2:
        setRating2(index);
      case 3:
        setRating3(index);
      case 4:
        setRating4(index);
      case 5:
        setRating5(index);
    }
  };

  const formattingScore = (idx) => {
    let adjScore = idx % 5;
    switch (adjScore) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 0:
        return 5;
    }
  }

  const handleBarScore = (score) => {
    if (score > 5) {
      return "100%";
    } else {
      return String(score * 20) + "%";
    }
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
            <h2>[ 리뷰 작성 ]</h2>
            <br />
            <label>이곳에서의 경험은 어떠셨나요?</label>
            <input name="title"
                  onChange={getTitleValue}
                  type="number"
                  placeholder="제목을 입력해 주세요."
                />
            {/* <div className="box flex">{handleStarRating(1)}</div> */}
            <label>서비스&친절도는 어떠셨나요?</label>
            <input name="title"
                  onChange={getTitleValue}
                  placeholder="제목을 입력해 주세요."
                />
            {/* <div className="box flex">{handleStarRating(2)}</div> */}
            <label>숙소&객실 청결도는 어떠셨나요?</label>
            <input name="title"
                  onChange={getTitleValue}
                  placeholder="제목을 입력해 주세요."
                />
            {/* <div className="box flex">{handleStarRating(3)}</div> */}
            <label>시설&편의성는 어떠셨나요?</label>
            <input name="title"
                  onChange={getTitleValue}
                  placeholder="제목을 입력해 주세요."
                />
            {/* <div className="box flex">{handleStarRating(4)}</div> */}
            <label>교통&위치접근성은 어떠셨나요?</label>
            <input name="title"
                  onChange={getTitleValue}
                  placeholder="제목을 입력해 주세요."
                />
            {/* <div className={cx("box", "flex")}>{handleStarRating(5)}</div> */}
            <div className={Style["formWrapper"]}>
              <br />
              <h2>후기를 작성해주세요.</h2>
              <div>
                <input name="title"
                  onChange={getTitleValue}
                  placeholder="제목을 입력해 주세요."
                />
              </div>
              <input type="file" id="file" onChange={handleChangeFile} multiple="multiple" />
              <textarea
                className={Style["area"]}
                name="content"
                onChange={getContentValue}
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

export default AddReviewModal;
