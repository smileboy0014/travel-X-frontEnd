import { useEffect, useRef, useState } from 'react';
import Axios from "axios";
import MainTap from '../../components/Tap/MainTap';

const Post = ({ items }) => {
  const carouselRef = useRef(null);

  const [tabItem, setTapItem] = useState(null);


  useEffect(() => {
    console.log('example useEffect:', items);
    let tab = [];

    for(let i =0; i< 3; i++){
      let tabObj = {tab:"강남"+i, content:items[i].images, roomId:items[i].roomId}  ;
      tab.push(tabObj);
    }
    setTapItem(tab);

  },[]);

  return (
    <>
    <MainTap 
    items={tabItem}/>
    </>

  )
}
export default Post;

export async function getServerSideProps() {
  const apiUrl = `http://shineware.iptime.org:5050/search?checkinDate=20211210&checkoutDate=20211212&adult=4&query=${encodeURIComponent("강남")}`;
  const data = await Axios.get(apiUrl)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e.message);
      return [];
    })

  return {
    props: {
      items: data.roomDocumentList ? data.roomDocumentList : [],
    },
  };
}
