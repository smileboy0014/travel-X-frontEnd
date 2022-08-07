
// 날짜 포맷 변경(YYYY-MM-DD HH:mm:ss)
export function timestamp(date) {
  date.setHours(date.getHour() + 9);
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

export function changeDateForm(date) {
  let dateArr;
  if (date != null) {
    dateArr = date.split('T');
    return dateArr[0]
  } else {
    return null;
  }
}

export function splitDateForm(date, type) {
  let dateArr;
  if (date != null && date !== '') {
    dateArr = date.split(':');
    return ((type == 'NIGHT' && !dateArr[0].includes('시부터')) ? dateArr[0] + '시부터' : date);
  } else {
    return '숙소문의';
  }
}

export function priceComma(price) {
  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
};

export function checkinForm(checkin,checkout, type) {
  if(checkin && checkout && type === 'NIGHT'){
    let strArr1 = checkin.split('-');
    let strArr2 = checkout.split('-');
    return strArr1[1]+'월 '+strArr1[2]+'일'+' ~ '+strArr2[1]+'월 '+strArr2[2]+'일';
  } else {
    return '숙소 문의';
  }
}

export function peopleTypeForm(adult, child, baby) {
  let adultStr = adult > 0 ? '성인 ' + adult + '명' : '';
		let childStr = child > 0 ? '아동 ' + child + '명' : '';
		let babyStr = baby > 0 ? '유아 ' + baby + '명' : '';
		return adultStr + ((adultStr !== '' && (childStr !== '' || babyStr !== '')) ? ', ' : '') + childStr + (babyStr !== '' ? ', ' : '') + babyStr;
}


