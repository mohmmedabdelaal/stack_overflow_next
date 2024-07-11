'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fromUrlQuery, removeKeysFromQuery } from '@/lib/utils';

interface Props {
  route: string;
  placeHolder: string;
  imgSrc: string;
  iconPlace: string;
  otherClasses: string;
}
const DEBOUNCE_MS = 300;

const LocalSearch = ({
  route,
  placeHolder,
  imgSrc,
  otherClasses,
  iconPlace,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
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
        if (route === pathname) {
          const removeUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          });
          router.push(removeUrl, { scroll: false });
        }
      }
      return () => clearTimeout(delayDebounce);
    }, DEBOUNCE_MS);
  }, [router, pathname, route, search, searchParams, query]);
  return (
    <div
      className={`background-light800_darkgradient 
    flex min-h-[56px] grow items-center gap-4 
    rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPlace === 'left' && (
        <Image
          src={imgSrc}
          width={20}
          height={20}
          alt="Search Icon"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeHolder}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />
      {iconPlace === 'right' && (
        <Image
          src={imgSrc}
          width={20}
          height={20}
          alt="Search icon"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
