'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface Props {
  route: string;
  placeHolder: string;
  imgSrc: string;
  iconPlace: string;
  otherclasses: string;
}

const LocalSearch = ({
  route,
  placeHolder,
  imgSrc,
  otherclasses,
  iconPlace,
}: Props) => {
  return (
    <div
      className={`background-light800_darkgradient 
    flex min-h-[56px] grow items-center gap-4 
    rounded-[10px] px-4 ${otherclasses}`}
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
      <Input type="text" placeholder={placeHolder} onChange={() => {}} />
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
