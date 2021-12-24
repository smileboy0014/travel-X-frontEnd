import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
// import Modal from "../components/Modal/RoomFilterModal";
import PesonalModal from "../Personal/PersonalModal";
import { useSelector, useDispatch } from "react-redux";

import RoomFilterModal from "../RoomFilter/RoomFilterModal";

const search = (prop, closeParentModal) => {
  const [keywords, setKeywords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoCompltData, setAutoCompltData] = useState([]);
  const [showPersonalModal, setPersonalShowModal] = useState(false);
  const [showRoomFilterModal, setRoomFilterShowModal] = useState(false);
  const router = useRouter();
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );
  const roomFilterValue = useSelector(({ roomFilter }) => roomFilter.filter);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem("keywords") || "[]";
      setKeywords(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  const handleAddKeyword = () => {
    router.push(`/view/${searchValue}`);
    const newKeyword = {
      id: Date.now(),
      text:
        searchValue +
        "(성인: " +
        adultCounterValue +
        "어린이 " +
        childCounterValue +
        ")",
    };
    setKeywords([newKeyword, ...keywords]);

    console.log("111111111111111" + closeParentDialog);

    closeParentDialog(false);
  };

  // 단일 검색어 삭제
  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((keyword) => {
      return keyword.id != id;
    });
    setKeywords(nextKeyword);
  };

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      getAutoComplt();
    }, 100);
    return () => clearTimeout(timerId);
  }, [searchValue]);

  const getAutoComplt = () => {
    axios
      .get("http://shineware.iptime.org:5051/autocomplete?query=" + searchValue)
      .then((res) => {
        console.log(res.data);
        setAutoCompltData(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      handleAddKeyword();
    }
  };

  const onListClick = (value) => {
    const newKeyword = {
      id: Date.now(),
      text:
        value +
        "(성인: " +
        adultCounterValue +
        "어린이 " +
        childCounterValue +
        ")",
    };
    setKeywords([newKeyword, ...keywords]);
  };

  return (
    <div>
      <div>
        <input
          type="search"
          onChange={onChangeSearch}
          onKeyPress={onKeyPress}
          placeholder="조회조건"
        />

        <button onClick={handleAddKeyword}>
          <div>{"확인"}</div>
        </button>

        <button onClick={() => setRoomFilterShowModal(true)}>룸타입</button>
        <RoomFilterModal
          onClose={() => setRoomFilterShowModal(false)}
          show={showRoomFilterModal}
        ></RoomFilterModal>

        <button onClick={() => setPersonalShowModal(true)}>인원수</button>
        <PesonalModal
          onClose={() => setPersonalShowModal(false)}
          show={showPersonalModal}
        ></PesonalModal>
        <p />
        <div>
          <div>
            {"성인: " + adultCounterValue}
            {"어린이: " + childCounterValue}
          </div>
          <div>{"룸필터값: " + roomFilterValue}</div>
        </div>
      </div>
      {autoCompltData.length > 0 ? (
        autoCompltData.map((item, index) => (
          <Link href="/view/[id]" as={`/view/${item}`} key={index}>
            <a onClick={() => onListClick(item)}>
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

export default search;
