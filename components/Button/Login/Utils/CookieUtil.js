export const SetCookie = (name, value, url, expires) => {
  document.cookie = 
    encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';' +
    ` path=${url};` + 
    ` max-age=${expires};` +
    ' SameSite=None; Secure';
}

export const GetCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const DeleteCookie = (name) => {
  SetCookie(name, "", {
    'max-age': -1
  });
}