import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen bg-white">
      Hello
      <Link href='/dashboard'>a</Link>
    </main>
  );
}