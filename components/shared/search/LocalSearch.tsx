'use client';
import React, {useState} from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

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
  const router = useRouter()
  const pathename = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q');
  const [search, setSearch] = useState(query || "");

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
      <Input type="text" placeholder={placeHolder} onChange={(e) => setSearch(e.target.value)} className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"  />
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
