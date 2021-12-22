import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.main}>
      <Link href="/search" as={`/search`}>
        <a>
          <img src="/main.png" />
        </a>
      </Link>
    </div>
  );
}
