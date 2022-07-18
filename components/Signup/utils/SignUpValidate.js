export const PasswdValidate = ({ passwd, confirmPasswd }) => {
  const validation = {
    eng: false,
    num: false,
    spcl: false,
    length: false,
    equal: false,
    validateAll: false
  };

  if (passwd.length > 0) {
    if (/[a-zA-Z]/.test(passwd)) {
      validation.eng = true;
    }
    if (/[0-9]/.test(passwd)) {
      validation.num = true;
    }
    if (/[!@#$%^~*+=-]/.test(passwd)) {
      validation.spcl = true;
    }
    if (passwd.length >= 8 && passwd.length <= 20) {
      validation.length = true;
    }
  }

  if (confirmPasswd.length > 0) {
    if (passwd == confirmPasswd) {
      validation.equal = true;
    }
  }

  if (validation.eng && validation.num && validation.spcl && validation.length && validation.equal) {
    validation.validateAll = true;
  } else {
    validation.validateAll = false;
  }

  return validation;
};

export const NicknameValidate = (nickName) => {
  const validation = {
    type: false,
		length: false
  };

  if (/^[가-힣|a-z|A-Z|0-9|]+$/.test(nickName)) {
    validation.type = true;
  } 
  if (nickName.length >= 2 && nickName.length <= 20) {
    validation.length = true;
  }

  return validation;
};

export const EmailValidate = (email) => {
  const validation = {
    type: false
  };

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    validation.type = true;
  }

  return validation;
};