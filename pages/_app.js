// import Layout from "../components/Layout/Layout";
import ScrollTopArrow from "../components/ScrollTop/ScrollTopArrow";
import BottomNavbar from "../components/Layout/BottomNavbar";
import { wrapper } from "../redux/store";
import "../styles/globals.css";

function TravelX({ Component, pageProps }) {
  return (
    <div>
      <ScrollTopArrow></ScrollTopArrow>
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(TravelX);
