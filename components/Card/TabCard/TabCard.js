import {useEffect, useState, forwardRef, useRef, Fragment} from 'react'
import Image from 'next/image'
import Link from 'next/link';

const sampleImage = 'http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b' +
        '25a27081f1dd3f584.jpg';

const TabCard = (props) => {

    return (
        <div>
            <Link href={`/view/detail/${props.roomId}`}>
                <a>
                    <Image
                        src={props.content? 'http://' + props.content : sampleImage}
                        alt="cardImage"
                        width={150}
                        height={150}/>
                </a>
            </Link>
        </div>

    )
}

export default TabCard;