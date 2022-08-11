import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import Style from "../../styles/Component.module.css";
import QnaList from '../../components/Qna/QnaList';
import QnaApply from '../../components/Qna/QnaApply';
import axios from 'axios';
import * as spinnerActions from "../../redux/store/modules/spinnerOn";

const Qna = () => {
  const router = useRouter();
  const dispatch = useDispatch();

	const userInfo = useSelector((state) => state.userInfo.info);
  const [page, setPage] = useState('list');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  

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

  const fetchInqueryList = async () => {
    let params = {
      authPublisher: userInfo.pub,
      userId: userInfo.id
    };

    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/inquiry/get",
      params: params
    }).then((res) => {
      // console.log(res.data);
      setData([...res.data]);
    }).catch((e) => {
      console.error(e);
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    if (page == 'list') {
      fetchInqueryList();
    }
  }, [page]);

  useEffect(() => {
    dispatch(spinnerActions.setState(loading));
  }, [loading]);

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
              fetchInqueryList={fetchInqueryList}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Qna;