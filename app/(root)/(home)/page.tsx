import Link from 'next/link';
import React from 'react';

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/search?q=searchQuery=example-search">Search for</Link>
    </main>
  );
}

export default Home;
