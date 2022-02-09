// import React, {useEffect} from "react";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const Editor = (props) =>{
//   return (
//     <>
//     <CKEditor
//             editor={ClassicEditor}
//             data=""
//             style={{innerHeight:500}}
//             onReady={editor => {
//               // You can store the "editor" and use when it is needed.
//               // console.log('Editor is ready to use!', editor);
//             }}
//             onChange={(event, editor) => {
//               const data = editor.getData();
//               props.setData(data);
//               // console.log({ event, editor, data });
//             }}
//             onBlur={(event, editor) => {
//               // console.log('Blur.', editor);
//             }}
//             onFocus={(event, editor) => {
//               // console.log('Focus.', editor);
//             }}
//           />
//     </>
//   )
// }
// export default Editor;
