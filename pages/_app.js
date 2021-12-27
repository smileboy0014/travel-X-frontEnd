import Layout from "../components/Layout/Main/MainLayout";
import ScrollTopArrow from "../components/ScrollTop/ScrollTopArrow";
import { wrapper } from "../redux/store";
import "../styles/globals.css";
import ReactModal from "react-modal";

function MyApp({ Component, pageProps }) {
  ReactModal.setAppElement("#__next");
  return (
    <Layout>
      <ScrollTopArrow></ScrollTopArrow>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
