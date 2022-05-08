export const Validate = ({ email, password, passwordConfirm }) => {
  const errors = {};

  if (!email) {
    errors.email = "이메일이 입력되지 않앗습니다.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "입력된 이메일이 유효하지 않습니다.";
  }

  if (!password) {
    errors.password = "비밀번호가 입력되지 않았습니다.";
  } else if (password.length < 8) {
    errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = "비밀번호 확인이 입력되지 않았습니다.";
  } else if (password != passwordConfirm) {
    errors.passwordConfirm = "비밀번호가 위 입력된 내용과 일치하지 않습니다.";
  }

  return errors;
};

export default Validate;