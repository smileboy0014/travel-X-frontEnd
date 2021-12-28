import React, { useEffect, useState } from "react";
import Link from "next/link";

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
    <div>
      {autoCompltData.length > 0 ? (
        autoCompltData.map((item, index) => (
          <Link
            href="/view/search/[id]"
            as={`/view/search/${item}`}
            key={index}
          >
            <a onClick={() => addKeyword(item)}>
              <div>{item}</div>
              <p></p>
            </a>
          </Link>
        ))
      ) : (
        <React.Fragment>
          <div>
            <h2>최근 검색어</h2>
            {keywords.length ? (
              <button type="button" onClick={handleClearKeywords}>
                전체 삭제
              </button>
            ) : (
              ""
            )}
          </div>

          <ul>
            {keywords.length ? (
              keywords.map((k) => (
                <li key={k.id}>
                  {k.text}
                  <button onClick={() => handleRemoveKeyword(k.id)}>
                    삭제
                  </button>
                </li>
              ))
            ) : (
              <div>최근 검색어가 없습니다</div>
            )}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default RecentSearch;
