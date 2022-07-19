// 방 정보에서 숙소 유형 한글로 바꿔주는 funciotn
export function propertyTypeFilter(type){
  switch(type){
    case 'HOTEL':
      return '호텔';
    case 'MOTEL':
      return '모텔';
    case 'PENSION':
      return '펜션';
    case 'GUESTHOUSE':
      return '게스트하우스';
    case 'RESORT':
      return '리조트';
    case 'CAMPING':
      return '캠핑';
    default :
    return 'N/A';
  }
}