import Link from "next/link";
import styles from "../styles/Home.module.css";
import MainTap from "../components/Tap/MainTap";

export default function Home() {
  return (
    <div className={styles.main}>
      <Link href="/search" as={`/search`}>
        <a>
          <img src="/main.jpg" />
        </a>
      </Link>
    </div>
  );
}
