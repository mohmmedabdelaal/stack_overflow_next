'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fromUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import GlobalResults from './GlobalResults';

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get('q');
  const [search, setSearch] = useState(query || '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    };

    setIsOpen(false);

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const fromUrl = fromUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        });
        router.push(fromUrl, { scroll: false });
      } else {
        if (query) {
          const removeUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['global', 'type'],
          });
          router.push(removeUrl, { scroll: false });
        }
      }
      return () => clearTimeout(delayDebounce);
    }, 300);
  }, [router, search, searchParams, query]);

  return (
    <div
      ref={searchContainerRef}
      className="relative w-full max-w-[600px] max-md:hidden"
    >
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
            if (!isOpen) setIsOpen(true);
            if (e.target.value === '' && isOpen) setIsOpen(false);
          }}
          className="paragraph-regular no-focus placeholder 
          background-light800_darkgradient text-dark500_light700 border-none shadow-none"
        />
      </div>
      {isOpen && <GlobalResults />}
    </div>
  );
};

export default GlobalSearch;
