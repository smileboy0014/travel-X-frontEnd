import Styles from "../../styles/BottomNavbar.module.css";
import Link from "next/link";
import { RiHomeSmile2Fill, RiSearchEyeFill } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const BottomNavbar = () => {
  return (
    <div>
      <div className={Styles.bottomNav}>
        <div className={Styles.bottomNav2}>
          <div className={Styles.bnTab}>
            <Link href="/" as={`/`}>
              <a>
                <RiHomeSmile2Fill size="40" color="#000" />
              </a>
            </Link>
          </div>
          <div className={Styles.bnTab}>
            <Link href="/search" as={`/search`}>
              <a>
                <RiSearchEyeFill size="40" color="#000" />
              </a>
            </Link>
          </div>
          <div className={Styles.bnTab}>
            <Link href="/" as={`/`}>
              <a>
                <AiFillHeart size="40" color="#000" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
