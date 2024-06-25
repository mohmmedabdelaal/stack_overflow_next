'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fromUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const GlobalSearch = () => {
  const router = useRouter();
  const pathename = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q');
  const [search, setSearch] = useState(query || '');
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const fromUrl = fromUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        });
        router.push(fromUrl, { scroll: false });
      } else {
        if (route === pathename) {
          const removeUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          });
          router.push(removeUrl, { scroll: false });
        }
      }
      return () => clearTimeout(delayDebounce);
    }, 3000);
  }, [router, search, searchParams, query]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div
        className="background-light800_darkgradient 
      relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={25}
          height={25}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="paragraph-regular no-focus placeholder 
          background-light800_darkgradient text-dark-200_light700 border-none shadow-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
