import React, { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../../styles/RecentSearch.module.css";

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

    console.log("sendSearchAutoComptValue:" + sendSearchAutoComptValue);

    console.log(
      "sendSearchAutoComptPropertyNameValue:" +
        sendSearchAutoComptPropertyNameValue
    );
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
    <div className={Style.site_container}>
      {autoCompltData.length > 0 ? (
        <div className={Style.TotalSearchRelated}>
          <div className={Style.TotalSearchRelatedHeader}>
            <div className={Style.TotalSearchRelatedHeader_title}>
              관련 검색어
            </div>
          </div>
          <div className="TotalSearchRelatedBody">
            <div className={Style.TotalSearchRelatedItem}>
              <div className={Style.TotalSearchRelatedItemTitle}>도서/지역</div>
              <ul className="TotalSearchRelatedList">
                {autoCompltData.map((item, index) => (
                  <li className={Style.TotalSearchRelatedList_item} key={index}>
                    <Link href="/view/search/[id]" as={`/view/search/${item}`}>
                      <a
                        className={Style.TotalSearchRelatedList_link}
                        onClick={() => addKeyword(item, 'autocomplete')}
                      >
                        <mark>{sendSearchTxt}</mark>
                        {item.replace(sendSearchTxt, "")}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {autoCompltPropertyNameData.length > 0 ? (
              <div className={Style.TotalSearchRelatedItem}>
                <div className={Style.TotalSearchRelatedItemTitle}>호텔</div>
                <ul className="TotalSearchRelatedList">
                  {autoCompltPropertyNameData.map((item, index) => (
                    <li
                      className={Style.TotalSearchRelatedList_item}
                      key={index}
                    >
                      <Link
                        href="/view/search/[id]"
                        as={`/view/search/${item}`}
                      >
                        <a
                          className={Style.TotalSearchRelatedList_link}
                          onClick={() => addKeyword(item)}
                        >
                          <mark>{sendSearchTxt}</mark>
                          {item.replace(sendSearchTxt, "")}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className={Style.TotalSearchRecent}>
            <div className={Style.TotalSearchRecentHeader}>
              <div className={Style.TotalSearchRecentHeader_title}>
                최근 검색어
              </div>
              {keywords.length ? (
                <button
                  type="button"
                  className={Style.TotalSearchRecentHeader_close}
                  onClick={handleClearKeywords}
                >
                  전체 삭제
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            {keywords.length ? (
              keywords.map((item) => (
                <div className={Style.TotalSearchRecentList_item} key={item.id}>
                  <Link
                    href="/view/search/[id]"
                    as={`/view/search/${item.text}`}
                  >
                    <a
                      className={Style.TotalSearchRecentList_link}
                      onClick={() => addKeyword(item.text)}
                    >
                      {item.text}
                    </a>
                  </Link>
                  
                  <button
                    className={Style.TotalSearchRecentList_del}
                    onClick={() => handleRemoveKeyword(item.id)}
                  ></button>
                  {/* <AiOutlineClockCircle />
                  {k.text} */}

                  
                </div>
              ))
            ) : (
              <div className="TotalSearchRecentBody">
                <div className={Style.TotalSearchRecent_noTag}>
                  최근 검색한 내역이 없습니다.
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default RecentSearch;
