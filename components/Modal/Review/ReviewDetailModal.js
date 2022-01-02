import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import ReviewContents from "../../../components/Review/ReviewContents";

const ReviewDetailModal = ({data, isOpen, onRequestClose}) => {

    return (
        <> < Modal isOpen = {
            isOpen
        }
       > <label onClick={() => onRequestClose(false)}>X</label>
        <h2>[ 모든 리뷰 ]</h2>
        <div>
            {
                data.map(
                    (element, idx) => (<ReviewContents key={idx} title={element.title} content={element.content}/>)
                )
            }

        </div>
    </Modal>
</>
    )
}
export default ReviewDetailModal;