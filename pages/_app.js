import '../shared/styles/globals.css'
import Link from "next/link";

const TravelX = ({Component}) => {
    return (
    
            <> <ul>
                <li>
                    <Link href="/">
                        <a>홈</a>
                    </Link>
                </li>
                <li>
                    <Link href="/[pagename]" as="/detail">
                        <a>상세</a>
                    </Link>
                </li>
                <li>
                    <Link href="/[pagename]" as="/myPage">
                        <a>내정보</a>
                    </Link>
                </li>
                <li>
                    <Link href="/[pagename]" as="/searchResult">
                        <a>검색결과</a>
                    </Link>
                </li>
            </ul>
            <Component/>
        </>
  

    );
};

export default TravelX;