import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/search" as={`/search`}>
        <a>
          <img src="/main.png" />
        </a>
      </Link>
    </div>
  );
}
