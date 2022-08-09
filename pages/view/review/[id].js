import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Style from "../../../styles/Component.module.css";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import LayerGallery from "../../../components/Review/Gallery/LayerGallery";
// import reviewStyle from "../../../styles/Review.module.css";
import ReviewDetailCarousel from "../../../components/Card/Carousel/ReviewDetailCarousel";
import ReviewOrderbyModal from "../../../components/Modal/ReviewOrderBy/ReviewOrderbyModal";
import { useSelector, useDispatch } from "react-redux";
import classNames from 'classnames/bind';
import useReviewInfiniteVeiw from "../../../components/InfiniteScroll/useReviewInfiniteView";
import * as reviewSearchType from "../../../redux/store/modules/reviewSearchType";

const cx = classNames.bind(Style);

const Review = () => {

  const router = useRouter();
  const { id } = router.query;
  const [layerGalleryList, setLayerGalleryList] = useState([]);
  const [useType, setUseType] = useState("NIGHT");
  // HTTP Method call 요청 했을 때 다시 리뷰 리스트 불러오는 신호 줄 수 있도록 하는 값
  const [callHttpMethod, setCallHttpMethod] = useState(false);
  // 방 상세 별점 볼 수 있도록 하는 값
  const [isOpenStyle, setIsOpenStyle] = useState(true);
  const [layerGalleryOpen, setLayerGalleryOpen] = useState(false);
  const [reviewOrderbyModalOpen, setReviewOrderbyModalOpen] = useState(false);
  const [reviewLength, setReviewLength] = useState(0);
  const [toPageNumber, setToPageNumber] = useState(20);
  const [fromPageNumber, setFromPageNumber] = useState(0);
  const [onlyImage, setOnlyImage] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const sortOption = useSelector(({ reviewSearchType }) => reviewSearchType.value);

  const { reviewData, reviewSummary, hasMore, loading, error, returnCallHttpMethod } = useReviewInfiniteVeiw(
    id, useType, fromPageNumber, toPageNumber, sortOption, onlyImage, callHttpMethod
  );

  const observer = useRef();

  const lastroomElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // debugger;
          setFromPageNumber(fromPageNumber + 20);
          setCallHttpMethod(true);
          // console.log(`무한 스크롤 호출 API 훅 걸렸어!!!!!!!`);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const setSelectNameHandler = () => {
    switch (sortOption) {
      case 'DATE': return ('최신순');
      case 'DESC': return ('평점높은순');
      case 'ASC': return ('평점낮은순');
      default: return ('최신순');
    }
  }

  const onClickHandler = (type, data, index) => {
    if (type === 'openAll') {
      setIsOpenStyle(!isOpenStyle);
    } else if (type === 'disappear') {
      // debugger;
      // console.log(reviews[index]);
      if (index > 0) {
        setReviews((arr) => {
          return [
            ...arr.slice(0, index),
            { ...data, moreContents: false },
            ...arr.slice(index + 1)
          ];
        });
      } else {
        setReviews((arr) => {
          return [
            { ...data, moreContents: false },
            ...arr.slice(index + 1)
          ];
        });
      }
      // forceUpdate();
      // dataList[index] = data;
    }
    else {
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

  const handleIndividualStarScore = (item) => {
    // let averageScore = Math.round((item.kindnessScore + item.cleanScore + item.comfortScore + item.facilityScore + item.priceScore) / 5);
    let averageScore = ((item.kindnessScore + item.cleanScore + item.comfortScore + item.facilityScore + item.priceScore) / 5).toFixed(1);
    item.averageScore = averageScore;
    // if (averageScore < 1) {
    //   averageScore = 1;
    // }

    return (
      <>
        <div className={Style["BasicGradeStar"]}>
          <span className={cx("BasicGradeStar-item", "check")}></span>
        </div>
        <div className={Style["BasicGradeCount"]}>{averageScore} /5</div>
      </>
    );
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
    let dateArr;
    if (date != null) {
      dateArr = date.split('T');
      return dateArr[0]
    } else {
      return null;
    }
  }

  const onChangeCheckHandler = (checked) => {
    if (checked) {
      // setReviews(viewWithPictureContent);
      setOnlyImage(true);
    }
    else {
      // setReviews(viewContent);
      setOnlyImage(false);
    }
  }

  const handleViewDetailCarousel = (item) => {
    if (item.hasImage) {
      return (<ReviewDetailCarousel galleryData={(data) => setLayerGalleryList(data)} data={item.images} />);
    }
  }

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
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(reviewSummary.averageKindnessScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{reviewSummary.averageKindnessScore}</span>
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
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(reviewSummary.averageCleanScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{reviewSummary.averageCleanScore}</span>
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
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(reviewSummary.averageComfortScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{reviewSummary.averageComfortScore}</span>
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
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(reviewSummary.averageFacilityScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{reviewSummary.averageFacilityScore}</span>
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
                    <span className={Style["ReviewGraphBarLine-bar"]} style={{ width: handleBarScore(reviewSummary.averagePriceScore) }}>
                    </span>
                  </span>
                  <span className={Style["ReviewGraphBar-text"]}>{reviewSummary.averagePriceScore}</span>
                </div>
              </dd>
            </dl>
          </li>
        );
    }
  };

  useEffect(() => {
    // debugger;
    setFromPageNumber(0);
    setToPageNumber(20);

  }, [sortOption, onlyImage]);

  useEffect(() => {
    // debugger;
    if (reviewData !== undefined && reviewData.length > 0) {
      // debugger;
      setReviewLength(reviewData.length);

      let filterReviews = reviewData.map((review) => {
        if (review.contents.length > 275) {
          review.moreContents = true;
          return review;
        } else {
          review.moreContents = false;
          return review;
        }
      })

      // 리뷰 갯수가 20개 이상일 때
      // if ((reviewData.length < reviewSummary.reviewCount) && reviewLength < reviewData.length) {
      if ((reviewData.length < reviewSummary.reviewCount)) {
        // console.log('총 리뷰 갯수가 20 이상이야!!!!!');

        if (reviewData.length < 21) {
          filterReviews.splice(reviewData.length / 2, 0, { id: '' });
          // setViewContent(filterReviews);
          setReviews(filterReviews);
        } else {
          filterReviews.splice(reviewData.length - 20, 0, { id: '' });
          // setViewContent(filterReviews);
          setReviews(filterReviews);
        }
      }
      // 리뷰 갯수가 20개 보다 적을 때
      else {
        // console.log('리뷰 갯수가 20 미만이거나 더이상 없어!!!!!!!');
        // setViewContent(filterReviews);
        setReviews(filterReviews);
      }
      // setViewWithPictureContent(filterReviews.filter(data => data.hasImage));
    }

    setTimeout(() => {
      forceUpdate();
    }, 500)

  }, [reviewData]);

  useEffect(() => {
    if (layerGalleryList != null && layerGalleryList.length > 0) {
      setLayerGalleryOpen(true);
    }
  }, [layerGalleryList]);

  useEffect(() => {
    if (!layerGalleryOpen) {
      setLayerGalleryList([]);
    }

  }, [layerGalleryOpen]);

  // useEffect(() => {
  //   // debugger;
  //   setToPageNumber(10);

  // }, [sortOption]);

  useEffect(() => {
    // console.log(`returnCallHttpMethod is ${returnCallHttpMethod}`);
    // console.log(`callHttpMethod is ${callHttpMethod}`);
    if (!returnCallHttpMethod) {
      setCallHttpMethod(false);
    }
  }, [returnCallHttpMethod]);

  useEffect(() => {
    dispatch(reviewSearchType.setReviewSearchType("DATE"));
  }, [])

  return (
    <div className="site">
      {/* <!-- Header --> */}
      <div className={Style["site-header"]}>
        <div className="site-container">
          <div className={Style["Header-inner"]}>
            <DetailTopNavbar HeaderTitle={`이용후기(${reviewSummary && reviewSummary.reviewCount}개)`} />
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
                      {reviewSummary && reviewSummary.averageReviewScore}
                    </span>
                    /5
                  </button>
                </dt>
                <dd className={Style["ReviewHeaderCont"]}>
                  <div className={Style["ReviewGraph"]}>
                    <ul className="ReviewGraph-list">
                      {reviewSummary && handleProgressBar('친절함')}
                      {reviewSummary && handleProgressBar('청결도')}
                      {reviewSummary && handleProgressBar('편안함')}
                      {reviewSummary && handleProgressBar('시설')}
                      {reviewSummary && handleProgressBar('가격')}
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
                <button type="button" className={Style["ReviewFilterValueItem"]} onClick={() => onClickHandler('openModal')}>{setSelectNameHandler()}</button>
              </div>
            </div>
          </div>
          {/* <!-- .ReviewFilter --> */}
          {/* <!-- ReviewPost --> */}
          <div className="ReviewPost">
            <div className="site-container">
              {/* {handleViewConetent(onlyPicture)} */}
              {reviews && reviews.length > 0 && reviews.map((item, index) => {
                // if (reviews.length === index + 1) {
                //   return <div ref={lastroomElementRef} key={item}></div>;
                // }
                if (item.id != undefined && item.id === '') {
                  return <div ref={lastroomElementRef} key={item}></div>;
                }
                else {
                  return (
                    <div className={Style["ReviewPostItem"]} key={index} >
                      <div className={Style["ReviewPostItemMeta"]}>
                        <div className="ReviewPostItemMetaHead">
                          <div className={Style["ReviewPostItemMetaHead-name"]}>{item.userNickName ? item.userNickName : ''}</div>
                          <div className={Style["BasicGrade"]}>
                            {/* {handleIndividualStarScore(item)} */}
                            <div className={Style["BasicGradeStar"]}>
                              <span className={cx("BasicGradeStar-item", "check")}></span>
                            </div>
                            <div className={Style["BasicGradeCount"]}>{item.averageScore} /5</div>
                          </div>
                        </div>
                        <div className={Style["ReviewPostItemMeta-date"]}>{handleFormattingDate(item.date)}</div>
                      </div>
                      <div className={item.moreContents !== undefined && item.moreContents == true ? Style["ReviewPostItemText"] : cx("ReviewPostItemText", "is-View")}>
                        <button type="button" style={item.moreContents !== undefined && item.moreContents == true ? { display: 'block' } : { display: 'none' }} className={Style["ReviewPostItemTextBtn"]} onClick={() => onClickHandler('disappear', item, index)}>...<span className={Style["ReviewPostItemTextBtn-text"]}>더읽기</span></button>
                        {/* <!-- 글이 5줄을 넘을시 노출 --> */}
                        <div className={Style["ReviewPostItemText-crop"]}>
                          {item.contents}
                        </div>
                      </div>
                      {/* <!-- slide --> */}
                      <div>
                        {handleViewDetailCarousel(item)}
                      </div>
                      {/* <!-- .slide --> */}
                    </div>
                  )
                }
              }
              )}
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