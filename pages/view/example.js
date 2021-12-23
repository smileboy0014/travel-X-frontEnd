import { useEffect, useRef } from 'react';
import Axios from "axios";
import Carousel from '../../components/Card/Carousel/Carousel';

const Post = ({ items }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    console.log('example useEffect:', items);
  });

  return (
    <Carousel
      ref={carouselRef}
      items={items}
    />
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