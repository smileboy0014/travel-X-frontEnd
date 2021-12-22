import React, { useEffect, useState } from "react";
import Axios from "axios";
import SearchResultList from "../../components/Card/SearchResultList";
import RoomFilterModal from "../../components/Modal/RoomFilter/RoomFilterModal";

const Post = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  //검색 결과 LIST Card
  const nameList = item.map((name, index) => (
    <SearchResultList
      propertyName={name.propertyName}
      roomName={name.roomName}
      address={name.address}
      propertyType={name.propertyType}
      images={"https://" + name.images[0]}
      price={name.price}
      index={index}
    />
  ));

  return (
    <div>
      <button onClick={() => setShowModal(true)}>룸타입</button>
      <RoomFilterModal
        onClose={() => setShowModal(false)}
        show={showModal}
      ></RoomFilterModal>
      <div>{nameList}</div>
      aaaaaaaaa
    </div>
  );
};

export default Post;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const apiUrl = `http://shineware.iptime.org:5050/search?checkinDate=20211210&checkoutDate=20211212&adult=4&query=${encodeURIComponent(
    id
  )}`;

  const res = await Axios.get(apiUrl);
  const data = res.data.roomDocumentList;
  return {
    props: {
      item: data,
    },
  };
}
