import React, { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../../styles/Component.module.css";

const RecentSearch = ({
  sendSearchValue,
  sendSearchAutoComptValue,
  sendSearchAutoComptPropertyNameValue,
  getSearchValue,
  sendSearchTxt,
}) => {
  const [keywords, setKeywords] = useState([]);
  const [autoCompltData, setAutoCompltData] = useState([]);
  const [autoCompltPropertyNameData, setAutoCompltPropertyNameData] = useState(
    []
  );

  useEffect(() => {
    setAutoCompltData(sendSearchAutoComptValue);
    setAutoCompltPropertyNameData(sendSearchAutoComptPropertyNameValue);

    // console.log("sendSearchAutoComptValue:" + sendSearchAutoComptValue);

    // console.log(
    //   "sendSearchAutoComptPropertyNameValue:" +
    //     sendSearchAutoComptPropertyNameValue
    // );
  }, [sendSearchAutoComptValue, sendSearchAutoComptPropertyNameValue]);

  useEffect(() => {
    // addKeyword(sendSearchValue);
    if (sendSearchValue !== undefined) {
      const newKeyword = {
        id: Date.now(),
        text: sendSearchValue,
      };
      const nextKeyword = keywords.filter((keyword) => {
        return keyword.text != newKeyword.text;
      });
      setKeywords([newKeyword, ...nextKeyword]);
    }
  }, [sendSearchValue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem("keywords") || "[]";
      setKeywords(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    console.log("저장하는 데이터: " + JSON.stringify(keywords));

    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  const addKeyword = (value, type) => {
    console.log("value: " + value);

    if (value !== undefined) {
      if (type == 'autocomplete') {
        const newKeyword = {
          id: Date.now(),
          text: value,
        };
        const nextKeyword = keywords.filter((keyword) => {
          return keyword.text != newKeyword.text;
        });
        setKeywords([newKeyword, ...nextKeyword]);
        console.log("newKeyword: " + JSON.stringify(newKeyword));
      }



      if (getSearchValue !== undefined) {
        getSearchValue(value);
      }
    }
  };

  // 전체 검색어 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
  };

  // 단일 검색어 삭제
  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((keyword) => {
      return keyword.id != id;
    });
    setKeywords(nextKeyword);
  };

  return (
    <div className="site-container">
      {autoCompltData.length > 0 ? (
        <div className={Style["TotalSearchRelated"]}>
          <div className={Style["TotalSearchRelatedHeader"]}>
            <div className={Style["TotalSearchRelatedHeader-title"]}>
              관련 검색어
            </div>
          </div>
          <div className="TotalSearchRelatedHeaderBody">
            <div className={Style["TotalSearchRelatedItem"]}>
              <div className={Style["TotalSearchRelatedItemTitle"]}>도서/지역</div>
              <ul className="TotalSearchRelatedList">
                {autoCompltData.map((item, index) => (
                  <li className={Style["TotalSearchRelatedList-item"]} key={index}>
                    <Link href="/view/search/[id]" as={`/view/search/${item}`}>
                      <a
                        className={Style["TotalSearchRelatedList-link"]}
                        onClick={() => addKeyword(item, 'autocomplete')}
                      >
                        {/* <mark>{sendSearchTxt}</mark> */}
                        {item}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {autoCompltPropertyNameData.length > 0 ? (
              <div className={Style["TotalSearchRelatedItem"]}>
                <div className={Style["TotalSearchRelatedItemTitle"]}>호텔</div>
                <ul className="TotalSearchRelatedList">
                  {autoCompltPropertyNameData.map((item, index) => (
                    <li
                      className={Style["TotalSearchRelatedList-item"]}
                      key={index}
                    >
                      <Link
                        href="/view/search/[id]"
                        as={`/view/search/${item}`}
                      >
                        <a
                          className={Style["TotalSearchRelatedList-link"]}
                          onClick={() => addKeyword(item)}
                        >
                          {/* <mark>{sendSearchTxt}</mark> */}
                          {item}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      ) : (
        <div className={Style["TotalSearchRecent"]}>
          <div className={Style["TotalSearchRecentHeader"]}>
            <div className={Style["TotalSearchRecentHeader-title"]}>
              최근 검색어
            </div>
            <button
              type="button"
              className={Style["TotalSearchRecentHeader-close"]}
              onClick={handleClearKeywords}
            >
              전체삭제
            </button>
          </div>
          <div className={Style["TotalSearchRecentBody"]}>
            <ul className={Style["TotalSearchRecentList"]}>
              {keywords.length ? (
                keywords.map((item) => (
                  <li className={Style["TotalSearchRelatedList-item"]} key={item.id}>
                    <Link
                      href="/view/search/[id]"
                      as={`/view/search/${item.text}`}
                    >
                      <a
                        className={Style["TotalSearchRecentList-link"]}
                        onClick={() => addKeyword(item.text)}
                      >
                        {item.text}
                      </a>
                    </Link>

                    <button
                      type="button"
                      className={Style["TotalSearchRecentList-del"]}
                      onClick={() => handleRemoveKeyword(item.id)}
                    >
                      <span className="ab-text">del</span>
                    </button>
                  </li>
                ))
              ) : (
                <div className={Style["TotalSearchRecentBody"]}>
                  <div className={Style["TotalSearchRecent-noTag"]}>
                    최근 검색한 내역이 없습니다.
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentSearch;
