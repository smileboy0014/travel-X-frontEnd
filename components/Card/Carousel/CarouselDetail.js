import Style from "../../../styles/Featured.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

const CarouselDetail = ({ imges }) => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState({ item: [] });
  const slides = imges.length;
  // const images = ["/img/bg.png", "/img/bake.png", "/img/pizza.png"];

  useEffect(() => {
    setImages(imges);
  }, [imges]);

  // useEffect(() => {
  //   console.log("------------");
  //   console.log(images);
  //   console.log("------------");
  // }, [images]);

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== slides ? index + 1 : 0);
    }
  };

  return (
    <div className={Style.container}>
      <div
        className={Style.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain" />
      </div>
      <div
        className={Style.wrapper}
        style={{ transform: `translateX(${-35 * index}vw)` }}
      >
        {images.item !== undefined &&
          images.item.map((img, i) => (
            <div className={Style.imgContainer} key={i}>
              <Image
                src={"http://" + img}
                alt=""
                layout="fill"
                objectFit="contain"
                width="1800px"
                height="100%"
              />
            </div>
          ))}
      </div>
      <div
        className={Style.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image src="/img/arrowr.png" layout="fill" alt="" objectFit="contain" />
      </div>
    </div>
  );
};

export default CarouselDetail;
