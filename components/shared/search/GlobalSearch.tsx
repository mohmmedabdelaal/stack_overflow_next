'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const GlobalSearch = () => {
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
          placeholder="Search for job..."
          value=""
          onChange={() => {}}
          className="paragraph-regular no-focus placeholder 
          background-light800_darkgradient border-none shadow-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
