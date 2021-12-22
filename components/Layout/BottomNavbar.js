import Styles from "../../styles/BottomNavbar.module.css";
import Link from "next/link";
import { RiHomeSmile2Fill, RiSearchEyeFill } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const BottomNavbar = () => {
  return (
    <div className={Styles.bottomNav}>
      <div>
        <ul>
          <Link href="/" as={`/`}>
            <a>
              <RiHomeSmile2Fill size="40" color="#000" />
            </a>
          </Link>

          <Link href="/search" as={`/search`}>
            <a>
              <RiSearchEyeFill size="40" color="#000" />
            </a>
          </Link>

          <Link href="/" as={`/`}>
            <a>
              <AiFillHeart size="40" color="#000" />
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavbar;
