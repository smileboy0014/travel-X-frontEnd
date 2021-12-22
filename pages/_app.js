import Layout from "../components/Layout/Layout";
import ScrollTopArrow from "../components/ScrollTop/ScrollTopArrow";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ScrollTopArrow></ScrollTopArrow>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
