'use client'

import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Link href='/login'>Login</Link>
    </main>
  );
}