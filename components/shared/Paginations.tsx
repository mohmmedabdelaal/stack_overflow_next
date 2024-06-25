'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  pageNumber: number;
  isNext: boolean;
  route: string;
}

const Pagination = ({ pageNumber, isNext, route }: PaginationProps) => {
  const searchParams = useSearchParams();

  const updateSearchParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    return params.toString();
  };
  return (
    <div className="flex w-full items-center justify-center py-5">
      <div className="flex items-center gap-2">
        {pageNumber > 1 && (
          <Link
            href={`${route}?${updateSearchParams(pageNumber - 1)}`}
            className="flex h-10 w-10 items-center justify-center"
          >
            Previous
          </Link>
        )}

        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Page {pageNumber}
        </span>

        {isNext && (
          <Link href={`${route}?${updateSearchParams(pageNumber + 1)}`}>
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
