import React, {useState} from "react";
import style from "../../styles/MainTap.module.css"
const MainTap = () => {
    const useTabs = (initialTabs, allTabs) => {
        const [contentIndex, setContentIndex] = useState(initialTabs);
        return {contentItem: allTabs[contentIndex], contentChange: setContentIndex};
    }

    const content = [
        {
            tab: "react",
            content: "컴퓨팅에서 리액트는 자바스크립트 라이브러리의 하나로서 사용자 인터페이스를 만들기 위해 사용된다. 페이스북과 개별 개발자 및 기업들 공동체에 " +
                    "의해 유지보수된다. 리액트는 싱글 페이지나 모바일 애플리케이션의 개발 시 토대로 사용될 수 있다."
        }, {
            tab: "Node.js",
            content: "Node.js는 확장성 있는 네트워크 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다. 작성 언어로 자바스크립트를 활용하며 Non-bloc" +
                    "king I/O와 단일 스레드 이벤트 루프를 통한 높은 처리 성능을 가지고 있다"
        }, {
            tab: "javascript",
            content: "자바스크립트는 객체 기반의 스크립트 프로그래밍 언어이다. 이 언어는 웹 브라우저 내에서 주로 사용하며, 다른 응용 프로그램의 내장 객체에도 " +
                    "접근할 수 있는 기능을 가지고 있다. 또한 Node.js와 같은 런타임 환경과 같이 서버 사이드 네트워크 프로그래밍에도 사용되고 있다."
        }
    ];

    const {contentItem, contentChange} = useTabs(0, content);

    return (
        <div className={style.container}>
           
          <div className={style.bloc_tabs}>
          {
                content.map(
                    (section, index) => (<button key={index} onClick={() => contentChange(index)}>{section.tab}</button>)
                )
            }
          </div>
         
            <div className="contentArea">{contentItem.content}</div>
            </div>
    )
}

export default MainTap;