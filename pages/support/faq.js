import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const Faq = () => {
  const router = useRouter();

  const [values, setValues] = useState([]);

  const handleClick = (e, item, index) => {
    e.preventDefault();
    
    setValues((arr) => {
      if (index > 0) {
        return [
          ...arr.slice(0, index),
          { ...item, isActive: !item.isActive },
          ...arr.slice(index + 1)
        ];
      } else if (index == values.length) {
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
  }

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    let list = [
      { title: "예약취소는 어떻게 해야 하나요?", content: "예약취소는 어떻게 해야 하나요?", isActive: false },
      { title: "예약취소는 어떻게 해야 하나요?", content: "예약취소는 어떻게 해야 하나요?", isActive: false },
      { title: "예약취소는 어떻게 해야 하나요?", content: "예약취소는 어떻게 해야 하나요?", isActive: false },
      { title: "예약취소는 어떻게 해야 하나요?", content: "예약취소는 어떻게 해야 하나요?", isActive: false },
      { title: "예약취소는 어떻게 해야 하나요?", content: "예약취소는 어떻게 해야 하나요?", isActive: false }
    ];

    setValues([...list]);
  }, []);

  return (
    <div className="site">
      <div className={Style["site-header"]}>
        <div className={"site-container"}>
          <div className={Style["Header-inner"]}>
            <a href="#;" className={Style["HeaderBack"]} onClick={handleBackClick}><span className={"ab-text"}>Back</span></a>
            <div className={Style["HeaderTitle"]}>자주 묻는 질문</div>
          </div>
        </div>
      </div>
      <div className={"site-body"}>
        <div className={Style["QnaPage"]}>
          <div className={Style["QnaPageHeader"]}>
            <div className={"site-container"}>
              <div className={Style["QnaPageHeader-title"]}>자주 묻는 질문</div>
            </div>
          </div>
          <div className={Style["QnaList"]}>
            <ul className={Style["QnaList-list"]}>
              {values.map((item, index) => {
                return (
                  <li className={item.isActive ? cx("QnaList-item", "is-Active") : Style["QnaList-item"]} key={index}>
                    <div className={Style["QnaListItem"]}>
                      <dl className={Style["QnaListItem-inner"]}>
                        <dt className={Style["QnaListItemTitle"]}>
                          <a href="#;" className={Style["QnaListItemTitle-link"]} onClick={(e) => handleClick(e, item, index)}>{item.title}</a>
                        </dt>
                        <dd className={Style["QnaListItemCont"]}>
                          {item.content}
                        </dd>
                      </dl>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq;