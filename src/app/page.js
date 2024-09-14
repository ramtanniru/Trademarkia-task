"use client";
import Search from "@/components/Search";
import SearchResults from "@/components/SearchResults";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('query');
    setSearch(query || '');
  }, [router.query]);

  return (
    <>
      <Search setSearchText={(value) => setSearch(value)} />
      <SearchResults searchKey={search} />
    </>
  );
}
