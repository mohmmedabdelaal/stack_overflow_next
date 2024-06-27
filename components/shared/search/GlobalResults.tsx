import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import GlobalFilters from './GlobalFilters';

const results = [
  {
    type: 'question',
    id: '65ce5c873ceb3427f3f3c5f1',
    title: 'How to use Tailwind CSS?',
  },
  { type: 'answer', id: '456', title: 'Best practices for Next.js?' },
  { type: 'user', id: '789', title: "John Doe's Profile" },
  { type: 'tag', id: '101', title: 'React.js' },
];

const GlobalResults = () => {
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
    <div className="background-light800_darkgradient absolute left-0 top-full z-50 mt-2 w-full max-w-[600px] rounded-xl shadow-lg max-md:hidden">
      {/* Filter Buttons (Improved Styling) */}
      <div className="flex flex-wrap items-center justify-start gap-2 p-3">
        <GlobalFilters onFilterChange={() => {}} />
      </div>

      {/* Divider (Simplified) */}
      <div className="my-2 border-t border-gray-200"></div>

      {/* Top Match Section */}
      <div className="mt-2">
        <h3 className="h3-bold text-dark200_light900 mb-2 ml-3">Top Match</h3>

        {results.length > 0 &&
          results.map((item, index) => (
            <Link
              key={item.id + item.type + index}
              href={renderLink(item.type, item.id)}
              className="flex items-center gap-4 rounded-md p-2 text-light-900 transition-colors duration-200 hover:bg-gray-200"
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
          ))}
      </div>
    </div>
  );
};

export default GlobalResults;
