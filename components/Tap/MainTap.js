import React, {useState, useRef, useEffect} from "react";
import Image from 'next/image'
import style from "../../styles/MainTap.module.css"
import TabCard from "../Card/TabCard/TabCard";

const MainTap = (props) => {

    const {items} = props;
    // console.log(items);

    const useTabs = (initialTabs) => {
        const [contentIndex, setContentIndex] = useState(initialTabs);
        return {contentChange: setContentIndex, useIndex: contentIndex};
    }

    const {contentChange, useIndex} = useTabs(0);

    const tabIndex = (index) => {
        if (index === useIndex) {

            return `${style.tabs} ${style.activeTabs}`

        } else {

            return `${style.tabs}`

        }
    }

    return (
        <div className={style.container}>

            <div className={style.blocTabs}>
                {
                    items && items.map((section, index) => (
                        <button
                            className={tabIndex(index)}
                            key={index}
                            onClick={() => contentChange(index)}>{section.tab}</button>
                    ))
                }
            </div>

            <div className={style.contentTabs}>
                <div className='row'>
                    {
                        items && items[useIndex]
                            .content
                            .map((img, idx) => (
                                <div className='col' key={idx}>
                                    <TabCard content={img} roomId={items[useIndex].roomId}/>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MainTap;
