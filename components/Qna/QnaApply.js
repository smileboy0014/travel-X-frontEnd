import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import validate from './QnaValidate';
import axios from 'axios';

const cx = classNames.bind(Style);

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    const formData = new FormData();
    // formData.append('authPublisher', publisher ? publisher : "TRAVELX");
    // formData.append('userId', publisher ? id : values.email);
    // formData.append('password', publisher ? null : values.password);

    // axios({
    //   method: "POST",
    //   url: "http://shineware.iptime.org:8081/qna/apply",
    //   data: formData,
    // }).then((res) => {
    //   console.log(res.data);
    //   onSubmit();
    // }).catch((e) => {
    //   if (e.response.status == '409') {
    //     alert('이미 등록된 사용자입니다.');
    //   } else {
    //     console.error(e);
    //   }
    // });

    onSubmit();
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
      }
      setSubmitting(false);
    }
  }, [errors]);

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  };
}

const QnaApply = ({ setPage, data, setData }) => {
  const [contentByte, setContentByte] = useState('0/1000');
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { email: "", phone: "", qnaApplyTitle: "", qnaApplyContent: "" },
    onSubmit: () => {
      // TODO: get list api 실행
      setData([...data, { title: values.qnaApplyTitle, content: values.qnaApplyContent, date: "2022-06-20", answer: "문의답변 문의답변 문의답변", isEnd: false, isActive: false }])
      setPage('list');
    },
    validate
  });

  const CheckByte = (str, maxByte) => {
    let rbyte = 0, rlen = 0;
    let one_char = "";

    for (let i=0; i<str.length; i++) {
      one_char = str.charAt(i);
      if (escape(one_char).length > 4) {
        rbyte += 2; // 한글 2Byte
      } else {
        rbyte++; //영문 등 나머지 1Byte
      }

      if (rbyte <= maxByte) {
        rlen = i+1; //return할 문자열 갯수
      }
    }

    if (rbyte > maxByte) {
      let str2 = str.substr(0, rlen);
      handleChange({ target: { name: 'qnaApplyContent', value: str2 } });
    } else {
      let newData = rbyte + '/' + maxByte;
      if (contentByte != newData) {
        setContentByte(newData);
      }
    }
  }

  const CheckLength = (str, maxLength) => {
    if (str.length > maxLength) {
      let str2 = str.substr(0, maxLength);
      handleChange({ target: { name: 'qnaApplyContent', value: str2 } });
    } else {
      let newData = str.length + '/' + maxLength;
      if (contentByte != newData) {
        setContentByte(newData);
      }
    }
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <div className={Style["ContactHeader"]}>
        <div className={"site-container"}>
          <div className={Style["ContactHeader-title"]}>1:1 문의하기</div>
          <p className={Style["ContactHeader-text"]}>이용 중 불편한 사항이 있으실 경우 문의 남겨주시면 최대한 빠른 시간 안에 답변을 드리겠습니다.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className={Style["ContactSection"]}>
          <div className={"site-container"}>
            <div className={Style["ReservationInput"]}>
              <dl className={Style["ReservationInput-inner"]}>
                <dt className={Style["ReservationInput-title"]}>
                  <label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">이메일 (선택)</label>
                </dt>
                <dd className={Style["ReservationInput-text"]}>
                  <input 
                    type="text"
                    name="email"
                    className={Style["ReservationInput-input"]}
                    placeholder="이메일을 입력해주세요." 
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email ? errors.email : null}
                </dd>
              </dl>
            </div>
            <div className={Style["ReservationInput"]}>
              <dl className={Style["ReservationInput-inner"]}>
                <dt className={Style["ReservationInput-title"]}>
                  <label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">전화번호 (선택)</label>
                </dt>
                <dd className={Style["ReservationInput-text"]}>
                  <input 
                    type="number" 
                    name="phone"
                    className={Style["ReservationInput-input"]}
                    placeholder="전화번호를 입력해주세요."
                    value={values.phone}
                    onChange={handleChange}
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
        {/* 임시 타이틀 입력 시작 */}
        <div className={cx("ContactSection", "Last")}>
          <div className={"site-container"}>
            <div className={Style["ContactSection-title"]}>문의제목</div>
            <div className={Style["ContactSectionText"]}>
              <input
                className={Style["ReservationInput-input"]}
                name="qnaApplyTitle"
                value={values.qnaApplyTitle}
                onChange={handleChange}  
              />
            </div>
          </div>
        </div>
        {/* 임시 타이틀 입력 끝 */}
        <div className={cx("ContactSection", "Last")}>
          <div className={"site-container"}>
            <div className={Style["ContactSection-title"]}>문의내용</div>
            <div className={Style["ContactSectionText"]}>
              <textarea
                name="qnaApplyContent"
                className={Style["ReservationInput-area"]}
                placeholder="개인 정보 보호를 위해 고객님의 개인 정보를 입력하지 마세요. (10자 이상 작성해주세요.)"
                value={values.qnaApplyContent}
                onChange={handleChange}
                onKeyUp={CheckLength(values.qnaApplyContent, 1000)}
              />
            </div>
            <div className={Style["ContactSectionCount"]}><span id="byteInfo" className={Style["ContactSectionCount-text"]}>{contentByte}</span></div>
          </div>
        </div>
        <div className={Style["BttonFixButton"]}>
          <div className={"site-container"}>
            <button 
              type="submit"
              className={values.qnaApplyContent.length >= 10 ? Style["BttonFixButton-button"] : cx("BttonFixButton-button", "is-disable")}
              disabled={submitting}
            >작성 완료</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default QnaApply;