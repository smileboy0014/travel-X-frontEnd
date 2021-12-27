import Link from "next/link";
import styles from "../styles/Index.module.css";
import PesonalModal from "../components/Modal/Personal/PersonalModal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [showPersonalModal, setPersonalShowModal] = useState(false);
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );

  return (
    <div className={styles.main}>
      <Link href="/search" as={`/search`}>
        <a>
          <img src="/SearchBar2.jpg" />
        </a>
      </Link>
      <div>
        <button>12/30 ~ 12/31 1박2일</button>
        <button onClick={() => setPersonalShowModal(true)}>
          {"성인: " + adultCounterValue + " 아동: " + childCounterValue}
        </button>
      </div>

      <PesonalModal
        onClose={() => setPersonalShowModal(false)}
        show={showPersonalModal}
      />
    </div>
  );
}
