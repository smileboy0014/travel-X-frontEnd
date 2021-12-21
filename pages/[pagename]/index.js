import React from 'react';
import {useRouter} from 'next/router';
import Detial from '../../views/detail';
import MyPage from '../../views/myPage';
import SearchResult from '../../views/searchResult';

const Dynamic = () => {
    const router = useRouter();
    const {pagename} = router.query;
    return (
        <div>
            {
                pagename === "detail" ? <Detial/> : 
                pagename === "myPage" ? <MyPage/> : <SearchResult/>
              
            }
        </div>
    );
};

export default Dynamic;