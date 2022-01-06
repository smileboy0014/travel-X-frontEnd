import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Html>
    );
  }
}

export default MyDocument;
