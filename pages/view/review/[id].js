import React, { useState, useRef, useCallback, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Style from "../../../styles/Component.module.css";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import LayerGallery from "../../../components/Review/Gallery/LayerGallery";
// import reviewStyle from "../../../styles/Review.module.css";
import ReviewCard from "../../../components/Card/Review/ReviewCard";
import ReviewDetailCarousel from "../../../components/Card/Carousel/ReviewDetailCarousel";
import AddReviewModal from "../../../components/Modal/Review/AddReviewModal";
import ReviewDetailModal from "../../../components/Modal/Review/ReviewDetailModal";
import ReviewOrderbyModal from "../../../components/Modal/ReviewOrderBy/ReviewOrderbyModal";
import ProgressBar from "../../../components/Progress/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import classNames from 'classnames/bind';
import { height } from "dom7";

const cx = classNames.bind(Style);

const Review = () => {

  // const {id} = props;
  const router = useRouter();
  const { id } = router.query;
  const [totalCount, setTotalCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(0);
  const [priceScore, setPriceScore] = useState(0);
  const [kindnessScore, setKindnessScore] = useState(0);
  const [cleanScore, setCleanScore] = useState(0);
  const [facilityScore, setFacilityScore] = useState(0);
  const [comfortScore, setComfortScore] = useState(0);
  const [layerGalleryList,setLayerGalleryList] = useState([]);
  const [onlyPicture, setOnlyPicture] = useState(false);
  const [review, setReview] = useState(false);
  const [isOpenStyle, setIsOpenStyle] = useState(false);
  const [layerGalleryOpen, setLayerGalleryOpen] = useState(false);
  const [clickPicture, setClickPicture] = useState(false);
  const [reviewOrderbyModalOpen, setReviewOrderbyModalOpen] = useState(false);
  const [AddReviewModalOpen, setAddReviewModalOpen] = useState(false);
  const [reviewDetailModalOpen, setReviewDetailModalOpen] = useState(false);
  const dispatch = useDispatch();
  // const data = useSelector(({ reviewContent }) => reviewContent.data);
  const [viewContent, setViewContent] = useState([]);
  const [viewWithPictureContent, setViewWithPictureContent] = useState([]);

  const getReviewSummary = () => {

    setReview(false);

    Axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/review/summary",
      params: {
        roomId: id,
        useType: "NIGHT"
      },
    }).then((res) => {
      if (res.data !== undefined) {
        setReviewScore(res.data.averageReviewScore);
        setPriceScore(res.data.averagePriceScore);
        setKindnessScore(res.data.averageKindnessScore);
        setCleanScore(res.data.averageCleanScore);
        setFacilityScore(res.data.averageFacilityScore);
        setComfortScore(res.data.averageComfortScore);
      }
    });
  }

  const getReviews = () => {

    Axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/review/get",
      params: {
        roomId: id,
        useType: "NIGHT",
        from: "0",
        size: "100",
      },
    }).then((res) => {
      if (res.data !== undefined) {
        setTotalCount(res.data.length);
        setViewContent(res.data);
        setViewWithPictureContent(res.data.filter(data => data.hasImage));
      }

    });

  }
  const onClickHandler = (type) => {
    if(type === 'openAll'){
      setIsOpenStyle(!isOpenStyle);
    } else {
      setReviewOrderbyModalOpen(true);
    }
    
  }

  const handleBarScore = (score) => {
    if (score > 5) {
      return "100%";
    } else {
      return String(score * 20) + "%";
    }
  }

  const handleSetGalleryPicutre = (data) =>{
      setLayerGalleryList(data);
  }

  const handleIndividualStarScore = (item) => {
    let averageScore = Math.round((item.kindnessScore + item.cleanScore + item.comfortScore + item.facilityScore + item.priceScore) / 5);
    item.averageScore = averageScore;
    if (averageScore < 1) {
      averageScore = 1;
    }
    switch (averageScore) {
      case 1:
        return (
          <>
            <div className={Style["BasicGradeStar"]}>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
            </div>
            <div className={Style["BasicGradeCount"]}>{averageScore} /5</div>
          </>
        )
      case 2:
        return (
          <>
            <div className={Style["BasicGradeStar"]}>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
            </div>
            <div className={Style["BasicGradeCount"]}>{averageScore} /5</div>
          </>
        )
      case 3:
        return (
          <>
            <div className={Style["BasicGradeStar"]}>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
            </div>
            <div className={Style["BasicGradeCount"]}>{averageScore} /5</div>
          </>
        )
      case 4:
        return (
          <>
            <div className={Style["BasicGradeStar"]}>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item")}></span>
            </div>
            <div className={Style["BasicGradeCount"]}>{averageScore} /5</div>
          </>
        )
      case 5:
        return (
          <>
            <div className={Style["BasicGradeStar"]}>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
              <span className={cx("BasicGradeStar-item", "check")}></span>
            </div>
            <div className={Style["BasicGradeCount"]}>{averageScore} /5</div>
          </>
        )
    }

  }

  const handleFormattingDate = (date) => {
    let dateArr = date.split('T');
    return dateArr[0];
  }

  const onChangeCheckHandler = (checked) => {
    if (checked) {
      setOnlyPicture(true);
    } else {
      setOnlyPicture(false);
    }
  }

  const handleViewConetent = (check) => {
    if (check) {
      return (
        <>
          {viewWithPictureContent && viewWithPictureContent.map((item, index) => (
            // items
            <div className={Style["ReviewPostItem"]} key={index}>
              <div className={Style["ReviewPostItemMeta"]}>
                <div className="ReviewPostItemMetaHead">
                  <div className={Style["ReviewPostItemMetaHead-name"]}>{item.userId}</div>
                  <div className={Style["BasicGrade"]}>
                    {handleIndividualStarScore(item)}

                  </div>
                </div>
                <div className={Style["ReviewPostItemMeta-date"]}>{handleFormattingDate(item.date)}</div>
              </div>
              <div className={Style["ReviewPostItemText"]}>
                <button type="button" className={Style["ReviewPostItemTextBtn"]}>...<span className={Style["ReviewPostItemTextBtn-text"]}>더읽기</span></button>
                {/* <!-- 글이 5줄을 넘을시 노출 --> */}
                <div className={Style["ReviewPostItemText-crop"]}>
                  {item.contents}
                </div>
              </div>
              {/* <!-- slide --> */}
              <ReviewDetailCarousel clickPicture={(data)=>handleSetGalleryPicutre(data)}  data={item.imageIdList} />
              {/* <!-- .slide --> */}
            </div>
            //  //items
          ))}
        </>
      )
    } else {
      return (
      <>
      {viewContent && viewContent.map((item, index) => (
        // items
        <div className={Style["ReviewPostItem"]} key={index}>
          <div className={Style["ReviewPostItemMeta"]}>
            <div className="ReviewPostItemMetaHead">
              <div className={Style["ReviewPostItemMetaHead-name"]}>{item.userId}</div>
              <div className={Style["BasicGrade"]}>
                {handleIndividualStarScore(item)}

              </div>
            </div>
            <div className={Style["ReviewPostItemMeta-date"]}>{handleFormattingDate(item.date)}</div>
          </div>
          <div className={Style["ReviewPostItemText"]}>
            <button type="button" className={Style["ReviewPostItemTextBtn"]}>...<span className={Style["ReviewPostItemTextBtn-text"]}>더읽기</span></button>
            {/* <!-- 글이 5줄을 넘을시 노출 --> */}
            <div className={Style["ReviewPostItemText-crop"]}>
              {item.contents}
            </div>
          </div>
          {/* <!-- slide --> */}
          <ReviewDetailCarousel galleryData={layerGalleryList}  data={item.imageIdList} />
          {/* <!-- .slide --> */}
        </div>
        //  //items
      ))}
    </>
      )
    }

  }

  const handleOpenModal = (type) => {
    if (type == "view") {
      setReviewDetailModalOpen(true);
    } else if (type == "add") {
      setAddReviewModalOpen(true);
    }
  };

  const handleProgressBar = (type) => {
    switch (type) {
      case '친절함':
        return (
          <li className={Style["ReviewGraph-item"]}>
            <dl className={Style["ReviewGraph-inner"]}>
              <dt className={Style["ReviewGraph-title"]}>친절함</dt>
              <dd className={Style["ReviewGraph-text"]}>
                <div className={Style["ReviewGraphBar"]}>
                  <span className={Style["ReviewGraphBarLine"]}>
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(kindnessScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{kindnessScore}</span>
                </div>
              </dd>
            </dl>
          </li>
        );
      case '청결도':
        return (
          <li className={Style["ReviewGraph-item"]}>
            <dl className={Style["ReviewGraph-inner"]}>
              <dt className={Style["ReviewGraph-title"]}>청결도</dt>
              <dd className={Style["ReviewGraph-text"]}>
                <div className={Style["ReviewGraphBar"]}>
                  <span className={Style["ReviewGraphBarLine"]}>
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(cleanScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{cleanScore}</span>
                </div>
              </dd>
            </dl>
          </li>
        );
      case '편안함':
        return (
          <li className={Style["ReviewGraph-item"]}>
            <dl className={Style["ReviewGraph-inner"]}>
              <dt className={Style["ReviewGraph-title"]}>편안함</dt>
              <dd className={Style["ReviewGraph-text"]}>
                <div className={Style["ReviewGraphBar"]}>
                  <span className={Style["ReviewGraphBarLine"]}>
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(comfortScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{comfortScore}</span>
                </div>
              </dd>
            </dl>
          </li>
        );
      case '시설':
        return (
          <li className={Style["ReviewGraph-item"]}>
            <dl className={Style["ReviewGraph-inner"]}>
              <dt className={Style["ReviewGraph-title"]}>시설</dt>
              <dd className={Style["ReviewGraph-text"]}>
                <div className={Style["ReviewGraphBar"]}>
                  <span className={Style["ReviewGraphBarLine"]}>
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(facilityScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{facilityScore}</span>
                </div>
              </dd>
            </dl>
          </li>
        );
      case '가격':
        return (
          <li className={Style["ReviewGraph-item"]}>
            <dl className={Style["ReviewGraph-inner"]}>
              <dt className={Style["ReviewGraph-title"]}>가격 대비 만족도</dt>
              <dd className={Style["ReviewGraph-text"]}>
                <div className={Style["ReviewGraphBar"]}>
                  <span className={Style["ReviewGraphBarLine"]}>
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(priceScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{priceScore}</span>
                </div>
              </dd>
            </dl>
          </li>
        );
    }
  };


  const reviewCard = viewContent.map((review, index) =>
    index < 3 ? <ReviewCard key={index} {...review} /> : null
  );

  useEffect(() => {
    setIsOpenStyle(true);
    setOnlyPicture(false);
    setReviewOrderbyModalOpen(false);
    setLayerGalleryList([]);
  }, []);

  useEffect(() => {
    if (id !== undefined) {

      getReviewSummary();
      getReviews();
    }
  }, [id, review]);


  useEffect(() => {
    setLayerGalleryOpen(true);

  }, [layerGalleryList]);

  useEffect(() =>{
    if(!layerGalleryOpen){
        setLayerGalleryList([]);
    }

  }, [layerGalleryOpen]);

  return (
    <div className="site">
      {/* <!-- Header --> */}
      <div className={Style["site-header"]}>
        <div className="site-container">
          <div className={Style["Header-inner"]}>
            <DetailTopNavbar HeaderTitle={`이용후기(${totalCount}개)`} />
          </div>
        </div>
      </div>
      {/* <!-- .Header --> */}

      {/* <!-- Body --> */}
      <div className="site-body">
        {/* <!-- 컨텐츠 시작 --> */}
        <div className={Style["ReviewPage"]}>
          {/* <!-- ReviewHeader --> */}
          <div className={Style["ReviewHeader"]}>
            <div className="site-container">
              <dl className={isOpenStyle ? "ReviewHeader-inner" : cx("ReviewHeader-inner", "is-Open")}>
                <dt className={Style["ReviewHeaderTitle"]}>
                  <div className={Style["ReviewHeaderTitle-text"]}>전체 평점</div>
                  <button type="button" className={Style["ReviewHeaderTitleGrade"]} onClick={() => onClickHandler('openAll')}>
                    <span className={Style["ReviewHeaderTitleGrade-text"]}>
                      {reviewScore}
                    </span>
                    /5
                  </button>
                </dt>
                <dd className={Style["ReviewHeaderCont"]}>
                  <div className={Style["ReviewGraph"]}>
                    <ul className="ReviewGraph-list">
                      {handleProgressBar('친절함')}
                      {handleProgressBar('청결도')}
                      {handleProgressBar('편안함')}
                      {handleProgressBar('시설')}
                      {handleProgressBar('가격')}
                    </ul>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          {/* <!-- .ReviewHeader --> */}
          {/* <!-- ReviewFilter --> */}
          <div className={Style["ReviewFilter"]}>
            <div className="site-container">
              <div className={Style["ReviewFilter-inner"]}>
                <label className={Style["ReviewFilterCheck"]}>
                  <input type="checkbox" name="ReviewFilterCheck" onChange={(e) => onChangeCheckHandler(e.currentTarget.checked)}
                    className={Style["ReviewFilterCheck-input"]} />
                  <span className={Style["ReviewFilterCheck-text"]}>사진 리뷰만</span>
                </label>
                <button type="button" className={Style["ReviewFilterValueItem"]} onClick={() =>onClickHandler('openModal')}>최신순</button>
              </div>
            </div>
          </div>
          {/* <!-- .ReviewFilter --> */}
          {/* <!-- ReviewPost --> */}
          <div className="ReviewPost">
            <div className="site-container">
              {handleViewConetent(onlyPicture)}
            </div>
          </div>
          {/* <!-- .ReviewPost --> */}
          {/* <!-- ReviewNoPost --> */}
          <div className={Style["ReviewNoPost"]}>더 이상의 후기가 없습니다.</div>
          {/* <!-- .ReviewNoPost --> */}
        </div>
        {/* <!-- .컨텐츠 끝 --> */}

        {/* <!-- SortPop --> */}
        <ReviewOrderbyModal isOpen={reviewOrderbyModalOpen} onRequestClose={() => setReviewOrderbyModalOpen(false)} />
        {/* <!-- .SortPop --> */}

        {/* <!-- LayerGallery --> */}
        <LayerGallery data={layerGalleryList} isOpen={layerGalleryOpen} onRequestClose={() => setLayerGalleryOpen(false)} />
        {/* <!-- .LayerGallery --> */}
      </div>
      {/* <!-- .Body --> */}
    </div>
    // </div>
  );
};
export default Review;