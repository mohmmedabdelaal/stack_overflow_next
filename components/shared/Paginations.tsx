'use client';

import { fromUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

interface PaginationProps {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === 'prev' ? pageNumber - 1 : pageNumber + 12;
    const newParams = fromUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextPageNumber.toString(),
    });
    router.push(newParams);
  };

  if (!isNext && pageNumber === 1) return null;
  return (
    <div className="flex w-full items-center justify-center py-5">
      <Button
        className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition duration-200 hover:bg-gray-300"
        disabled={pageNumber === 1}
        onClick={() => handleNavigation('prev')}
      >
        <p>Prev</p>
      </Button>
      <div>
        <p className="flex items-center justify-center rounded-md border border-gray-300 bg-orange-400 px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
          {pageNumber}
        </p>
      </div>
      <Button
        className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition duration-200 hover:bg-gray-300"
        disabled={!isNext}
        onClick={() => handleNavigation('next')}
      >
        <p>Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
