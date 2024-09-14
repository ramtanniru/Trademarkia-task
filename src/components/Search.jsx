"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Search({ setSearchText }) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (search) {
      router.push(`?query=${encodeURIComponent(search)}`);
      setSearchText(search);
    }
  };

  return (
    <div className="flex flex-row gap-5 justify-start items-center bg-[#F8FAFE] w-full px-20 p-10 border border-b-4 border-[#EAF1FF]">
      <Image src={'/images/logo.svg'} alt='logo' height={50} width={200} />
      <div className="flex flex-row w-2/5 justify-between items-center gap-5">
        <input 
          type="text" 
          className="border border-gray-300 p-2 rounded-lg w-full text-black"
          placeholder="Search Trademark Here eg. Mickey Mouse"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="bg-[#4380EC] text-white p-2 px-5 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}
