import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const GlobalResults = () => {
  return (
    <div className="background-light800_darkgradient absolute left-0 top-full z-50 mt-2 w-full max-w-[600px] rounded-xl shadow-lg max-md:hidden">
      {/* Filter Buttons (Improved Styling) */}
      <div className="flex flex-wrap items-center justify-start gap-2 p-3">
        <p className="ml-3">Type:</p>
        <Button
          variant="outline"
          className="rounded-full text-sm transition-colors duration-200 hover:bg-gray-200"
        >
          Question
        </Button>
        <Button
          variant="outline"
          className="rounded-full text-sm transition-colors duration-200 hover:bg-gray-200"
        >
          Answer
        </Button>
        <Button
          variant="outline"
          className="rounded-full text-sm transition-colors duration-200 hover:bg-gray-200"
        >
          User
        </Button>
        <Button
          variant="outline"
          className="rounded-full text-sm transition-colors duration-200 hover:bg-gray-200"
        >
          Tag
        </Button>
      </div>

      {/* Divider (Simplified) */}
      <div className="my-2 border-t border-gray-200"></div>

      {/* Top Match Section */}
      <div className="mt-2 p-4">
        <h3 className="h3-bold text-dark200_light900 mb-2">Top Match</h3>
        <Link
          href={`/noWhere`}
          className="flex items-center gap-4 rounded-md p-2 transition-colors duration-200 hover:bg-slate-700"
        >
          <Image
            src="/assets/icons/tag.svg"
            width={24}
            height={24}
            alt="tag"
            className="fill-current"
          />
          <div className="flex flex-col">
            <h4 className="font-medium text-black">Title</h4>
            <p className="text-gray-500">Type</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GlobalResults;
