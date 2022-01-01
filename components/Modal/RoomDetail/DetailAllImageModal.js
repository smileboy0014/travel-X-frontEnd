import React, { Fragment, useEffect } from "react";
import Modal from "react-modal";
import Styles from "../../../styles/DetailAllImageModal.module.css";
import Image from 'next/image';

const sampleImage = 'http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg';

const DetailAllImageModal = ({ isOpen, onRequestClose, images }) => {
  useEffect(() => {
    console.log(images);
  })

  return (
    <div>
      <Modal
        className={Styles.Modal}
        overlayClassName={Styles.Overlay}
        isOpen={isOpen}
      >
        <label onClick={() => onRequestClose(false)}>X</label>

        <div className={Styles.container}>
          {images && images.map((item, index) => (
            <Fragment key={index}>
              <Image
                src={item ? 'http://' + item : sampleImage}
                alt="room-image"
                width={800}
                height={600}
                loading='eager'
              />
            </Fragment>
          ))}
        </div>
        
      </Modal>
    </div>
  );
};

export default DetailAllImageModal;
