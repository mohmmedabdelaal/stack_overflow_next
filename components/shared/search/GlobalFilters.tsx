// components/GlobalFilters.tsx
'use client';
import { Button } from '@/components/ui/button'; // Adjust the path if needed
import React, { useState } from 'react';
import { GlobalSearchFilters } from '@/constants/fitlers';
import { useRouter, useSearchParams } from 'next/navigation';
interface FilterButtonProps {
  name: string;
  value: string;
  onClick: (value: string) => void; // Add onClick prop for filtering
}

const FilterButton: React.FC<FilterButtonProps> = ({
  name,
  value,
  onClick,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);

  const typeParams = searchParams.get('type');

  const [active, setActive] = useState(typeParams || '');
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`light-border-2 small-medium :text-light-800 rounded-2xl px-5 py-2 capitalize dark:hover:text-primary-500 ${
        active === value
          ? 'bg-primary-500 text-light-900'
          : 'bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500'
      }`}
      onClick={() => onClick(value)} // Trigger filter action on click
    >
      {name}
    </Button>
  );
};

interface GlobalFiltersProps {
  onFilterChange: (filter: string) => void; // Callback for filtering
}

const GlobalFilters: React.FC<GlobalFiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-3">
      <p className="ml-3">Type:</p>
      {GlobalSearchFilters.map((filter) => (
        <FilterButton key={filter.value} {...filter} onClick={onFilterChange} />
      ))}
    </div>
  );
};

export default GlobalFilters;
