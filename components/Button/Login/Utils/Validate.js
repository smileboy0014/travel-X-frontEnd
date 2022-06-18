export const Validate = ({ nickName, password, passwordConfirm }) => {
  const errors = {};

  if (!nickName) {
    errors.nickName = "닉네임이 입력되지 않앗습니다.";
  } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/.test(nickName)) {
    errors.nickName = "입력된 닉네임이 유효하지 않습니다.";
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