import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Style from "../../styles/Component.module.css";
import QnaList from '../../components/Qna/QnaList';
import QnaApply from '../../components/Qna/QnaApply';

const Qna = () => {
  const router = useRouter();

  const [page, setPage] = useState('list');
  const [data, setData] = useState([]);

  const handleClick = (e, item, index) => {
    e.preventDefault();
    
    setData((arr) => {
      if (index > 0) {
        return [
          ...arr.slice(0, index),
          { ...item, isActive: !item.isActive },
          ...arr.slice(index + 1)
        ];
      } else if (index == data.length) {
        return [
          ...arr.slice(0, index),
          { ...item, isActive: !item.isActive }
        ];
      } else {
        return [
          { ...item, isActive: !item.isActive },
          ...arr.slice(index + 1)
        ];
      }
      
    })
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    
    if (page == 'list') {
      router.back();
    } else {
      setPage('list');
    }
  };

  useEffect(() => {
    let list = [
      { title: "예약내역이 안보여요.", content: "예약취소는 어떻게 해야 하나요?", date: "2022-04-04", answer: "문의답변 문의답변 문의답변", isEnd: true, isActive: false },
      { title: "예약내역이 안보여요.", content: "예약취소는 어떻게 해야 하나요?", date: "2022-04-04", answer: "", isEnd: false, isActive: false },
      { title: "예약내역이 안보여요.", content: "예약취소는 어떻게 해야 하나요?", date: "2022-04-04", answer: "", isEnd: false, isActive: false },
      { title: "예약내역이 안보여요.", content: "예약취소는 어떻게 해야 하나요?", date: "2022-04-04", answer: "문의답변 문의답변 문의답변", isEnd: true, isActive: false },
    ];

    setData([...list]);
  }, []);

  return (
    <div className="site">
      <div className={Style["site-header"]}>
        <div className={"site-container"}>
          <div className={Style["Header-inner"]}>
            <a href="#" className={Style["HeaderBack"]} onClick={handleBackClick}><span className={"ab-text"}>Back</span></a>
            <div className={Style["HeaderTitle"]}>1:1 문의하기</div>
          </div>
        </div>
      </div>
      <div className={"site-body"}>
        {/* <!-- 컨텐츠 시작 --> */}
        <div className={Style["ContactPage"]}>
          {page == 'list' ? 
          // 1대1 문의 목록 Body
          (
            <QnaList 
              data={data}
              setPage={setPage}
              handleClick={(e, item, index) => handleClick(e, item, index)}
            />
          ) : 
          // 1대1 문의하기 Body
          (
            <QnaApply 
              setPage={setPage}
              setData={setData}
              data={data}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Qna;