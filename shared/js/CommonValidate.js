export const KorEngNumValidate = (value, minLen, maxLen) => {
  const validation = {
    syntax: false,
		length: false
  };

  if (/^[가-힣|a-z|A-Z|0-9|]+$/.test(value)) {
    validation.syntax = true;
  } 
  if (value.length >= minLen && value.length <= maxLen) {
    validation.length = true;
  }

  return validation;
};

export const EmailValidate = (value) => {
  const validation = {
    syntax: false
  };

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    validation.syntax = true;
  }

  return validation;
};



export const PhoneValidate = (value) => {
  const validation = {
    syntax: false
  };

  if (/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/.test(value)) {
    validation.syntax = true;
  }

  return validation;
};