import React, { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../../styles/RecentSearch.module.css";
import { AiOutlineSearch, AiOutlineClockCircle } from "react-icons/ai";

const RecentSearch = ({ sendSearchValue, sendSearchAutoComptValue }) => {
  const [keywords, setKeywords] = useState([]);
  const [autoCompltData, setAutoCompltData] = useState([]);

  useEffect(() => {
    setAutoCompltData(sendSearchAutoComptValue);
  }, [sendSearchAutoComptValue]);

  useEffect(() => {
    if (sendSearchValue !== undefined) {
      addKeyword(sendSearchValue);
    }
  }, [sendSearchValue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem("keywords") || "[]";
      setKeywords(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  const addKeyword = (value) => {
    if (value !== undefined) {
      const newKeyword = {
        id: Date.now(),
        text: value,
      };
      setKeywords([newKeyword, ...keywords]);
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
    <div className={Style.header}>
      {autoCompltData.length > 0 ? (
        autoCompltData.map((item, index) => (
          <div className={Style.header_autoCompt}>
            <Link
              href="/view/search/[id]"
              as={`/view/search/${item}`}
              key={index}
            >
              <a onClick={() => addKeyword(item)}>
                <div>
                  <AiOutlineSearch />
                  {item}
                </div>
              </a>
            </Link>
          </div>
        ))
      ) : (
        <React.Fragment>
          <div className={Style.header_recent}>
            <h2>최근 검색어</h2>
            {keywords.length ? (
              <button type="button" onClick={handleClearKeywords}>
                전체 삭제
              </button>
            ) : (
              ""
            )}
          </div>

          <div>
            {keywords.length ? (
              keywords.map((k) => (
                <div key={k.id}>
                  <AiOutlineClockCircle />
                  {k.text}

                  <button onClick={() => handleRemoveKeyword(k.id)}>
                    삭제
                  </button>
                </div>
              ))
            ) : (
              <div>최근 검색어가 없습니다</div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default RecentSearch;
