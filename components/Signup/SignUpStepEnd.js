import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

const cx = classNames.bind(Style);

const SignUpStepEnd = ({  }) => {
  const router = useRouter();
  useEffect(() => {

  }, []);

  return (
    <div className="site-body">
      {/* <!-- 컨텐츠 시작 --> */}
      <div className={Style["StepPage"]}>
				<div className={Style["SignUpEnd"]}>회원가입이 완료되었습니다.</div>
        {/* <!-- BttonFixButton --> */}
        <div className={cx("BttonFixButton", "no-Scroll")}>
          <div className={"site-container"}>
						<button type="button" className={Style["BttonFixButton-button"]} onClick={() => { router.push('/login'); }}>확인</button>
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
      {/* /* <!-- .컨텐츠 끝 --> */}
    </div>
  )
}

export default SignUpStepEnd;