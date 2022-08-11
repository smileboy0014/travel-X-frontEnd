import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import axios from 'axios';
import { EmailValidate, PhoneValidate } from './../../shared/js/CommonValidate';
import * as spinnerActions from "../../../redux/store/modules/spinnerOn";

const cx = classNames.bind(Style);

const useForm = ({ initialValues, onSubmit }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [validation, setValidation] = useState({
    email: true,
    phone: true,
    title: false,
    content: false,
  });
  const [validationAll, setValidationAll] = useState(false);
  const [submitting, setSubmitting] = useState(false);
	const userInfo = useSelector((state) => state.userInfo.info);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleValidation = (name, value) => {
    setValidation({ ...validation, [name]: value });
  };

  const handleSubmit = (e) => {
    setSubmitting(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('authPublisher', userInfo.pub);
    formData.append('userId', userInfo.id);
    formData.append('title', values.qnaApplyTitle);
    formData.append('contents', values.qnaApplyContent);
    formData.append('email', values.email);
    formData.append('phoneNumber', values.phone);

    axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/inquiry/register",
      data: formData,
    }).then((res) => {
      onSubmit();
    }).catch((e) => {
      console.error(e);
    }).finally(() => {
      setSubmitting(false);
    });
  };

  // useEffect(() => {
  //   if (submitting) {
  //     if (Object.keys(errors).length === 0) {
  //       onSubmit(values);
  //     }
  //     setSubmitting(false);
  //   }
  // }, [errors]);

  useEffect(() => {
    dispatch(spinnerActions.setState(submitting));
  }, [submitting]);

  useEffect(() => {
    if (values.email.length == 0) {
      handleValidation('email', true);
      return;
    }
    handleValidation('email', EmailValidate(values.email).syntax);
  }, [values.email]);

  useEffect(() => {
    if (values.phone.length == 0) {
      handleValidation('phone', true);
      return;
    }
    handleValidation('phone', PhoneValidate(values.phone).syntax);
  }, [values.phone]);

  useEffect(() => {
    handleValidation('title', values.qnaApplyTitle.length > 0);
  }, [values.qnaApplyTitle]);

  useEffect(() => {
    handleValidation('content', values.qnaApplyContent.length >= 10);
  }, [values.qnaApplyContent]);

  useEffect(() => {
    if (validation.email && validation.phone && validation.title && validation.content) {
      setValidationAll(true);
    } else {
      setValidationAll(false);
    }
  }, [validation])

  return {
    values,
    validation,
    submitting,
    handleChange,
    handleSubmit,
    validationAll
  };
}

const QnaApply = ({ setPage, fetchInqueryList }) => {
  const [contentByte, setContentByte] = useState('0/1000');
  const { values, validation, submitting, handleChange, handleSubmit, validationAll } = useForm({
    initialValues: { email: "", phone: "", qnaApplyTitle: "", qnaApplyContent: "" },
    onSubmit: () => {
      // fetchInqueryList();
      setPage('list');
    }
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
                    placeholder="id@gmail.com" 
                    value={values.email}
                    onChange={handleChange}
                  />
                </dd>
              </dl>
              {!validation.email && values.email.length > 0 ? <div className={cx("Error-text", "is-Active")}>이메일 형식을 확인해주세요.</div> : null}
            </div>
            <div className={Style["ReservationInput"]}>
              <dl className={Style["ReservationInput-inner"]}>
                <dt className={Style["ReservationInput-title"]}>
                  <label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">전화번호 (선택)</label>
                </dt>
                <dd className={Style["ReservationInput-text"]}>
                  <input 
                    type="text" 
                    name="phone"
                    className={Style["ReservationInput-input"]}
                    placeholder="010-1234-5678"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </dd>
              </dl>
              {!validation.phone && values.phone.length > 0 ? <div className={cx("Error-text", "is-Active")}>휴대폰번호 형식을 확인해주세요.</div> : null}
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
              {values.qnaApplyTitle.length == 0 ? <div className={cx("Error-text", "is-Active")}>문의제목을 입력해주세요.</div> : null}
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
            <div className={Style["ContactSectionCount"]}>
              <span id="byteInfo" className={Style["ContactSectionCount-text"]} style={values.qnaApplyContent.length < 10 ? { color: 'red' } : null}>{contentByte}</span>
            </div>
          </div>
        </div>
        <div className={Style["BttonFixButton"]}>
          <div className={"site-container"}>
            <button 
              type="submit"
              className={!submitting && validationAll ? Style["BttonFixButton-button"] : cx("BttonFixButton-button", "is-disable")}
              disabled={submitting || !validationAll}
            >작성 완료</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default QnaApply;