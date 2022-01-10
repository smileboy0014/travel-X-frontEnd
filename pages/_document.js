import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ra1rvd631l&submodules=geocoder"
          />
        </Head>
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
