'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import GlobalFilters from './GlobalFilters';
import { useSearchParams } from 'next/navigation';
import { getGlobalSearch } from '@/lib/actions/general.actions';

const GlobalResults = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    { type: 'question', _id: 1, title: 'Next.js question' },
    { type: 'tag', _id: 1, title: 'Nextjs' },
    { type: 'user', _id: 1, title: 'jsm' },
  ]);
  const global = searchParams.get('global');
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setResult([]);
      try {
        const data = await getGlobalSearch({ query: global, type });
        if (typeof data === 'string') {
          setResult(JSON.parse(data));
        } else {
          setResult(data.results); // Assuming you want the 'results' array
        }
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    if (global) {
      fetchData();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case 'question':
        return `/question/${id}`;
      case 'answer':
        return `/question/${id}`;
      case 'user':
        return `/profile/${id}`;
      case 'tag':
        return `/tags/${id}`;
      default:
        return '/';
    }
  };
  return (
    <div className="background-light800_darkgradient absolute left-0 top-full z-50 mt-2 w-full max-w-[600px] flex-wrap rounded-xl py-6 shadow-sm dark:bg-dark-400 sm:max-w-[600px]">
      {/* Filter Buttons (Improved Styling) */}

      <GlobalFilters />

      {/* Divider (Simplified) */}
      <div className="my-2 border-t border-gray-200"></div>

      {/* Top Match Section */}
      <div className="mt-2">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
            <p className="text-dark-200_light800 body-semibold">
              Browsing the database
            </p>
          </div>
        ) : (
          <div className="fle flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  key={item.type + item._id + index}
                  href={renderLink(item.type, item._id)}
                  className="flex cursor-pointer items-start gap-4 rounded-md px-5 py-2.5 text-light-900 transition-colors duration-200 hover:bg-gray-200"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    width={24}
                    height={24}
                    alt="tag"
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, no results found!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResults;
