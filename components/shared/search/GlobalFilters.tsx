// components/GlobalFilters.tsx
'use client';
import { Button } from '@/components/ui/button'; // Adjust the path if needed
import React, { useState } from 'react';
import { GlobalSearchFilters } from '@/constants/fitlers';
import { useRouter, useSearchParams } from 'next/navigation';
import { fromUrlQuery } from '@/lib/utils';

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get('type');

  const [active, setActive] = useState(typeParams || '');
  const handleClick = (item: string) => {
    if (item === active) {
      setActive('');
      const newSearchParams = fromUrlQuery({
        params: searchParams.toString(),
        key: 'type',
        value: null,
      });

      router.push(newSearchParams, { scroll: undefined });
    } else {
      setActive(item);
      const newSearchParams = fromUrlQuery({
        params: searchParams.toString(),
        key: 'type',
        value: item.toLowerCase(),
      });
      router.push(newSearchParams, { scroll: undefined });
    }
  };
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3 ">
        {GlobalSearchFilters.map((filter) => (
          <Button
            variant="ghost"
            key={filter.value + filter.name}
            size="sm"
            className={`light-border-2 small-medium :text-light-800 ml-2 rounded-2xl px-5 py-2 capitalize dark:hover:text-primary-500 ${
              active === filter.value
                ? 'bg-primary-500 text-light-900'
                : 'bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500'
            }`}
            onClick={() => handleClick(filter.value)} // Trigger filter action on click
          >
            {filter.name}
          </Button>
          // <FilterButton key={filter.value} {...filter} onClick={onFilterChange} />
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
