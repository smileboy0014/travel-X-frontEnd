export const QnaValidate = ({ email }) => {
  const errors = {};

  if (email.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "입력된 이메일이 유효하지 않습니다.";
  }

  return errors;
};

export default QnaValidate;