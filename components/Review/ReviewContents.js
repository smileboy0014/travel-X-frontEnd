import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';

const ReviewContents = (props) => {

    return (
            <div  className='row'>
              <div className='col'>
              <h2>{props.title}</h2>
                <div>
                    {ReactHtmlParser(props.content)}
                </div>
              </div>
            </div>
    )
}

export default ReviewContents;