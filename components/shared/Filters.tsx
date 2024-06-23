'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Filter {
  name: string;
  value: string;
}

interface Props {
  filters: Filter[];
  otherClasses?: string;
  containerClasses?: string;
  selectedFilter?: string; // New prop to track selected filter
  onChange?: (value: string) => void; // Function to handle filter change
}

const Filters = ({
  filters,
  otherClasses,
  containerClasses,
  selectedFilter,
  onChange,
}: Props) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select onValueChange={onChange} defaultValue={selectedFilter}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark-500_light700 border px-5 py-2.5`}
        >
          <div className="ling-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className={`${
                  item.value === selectedFilter
                    ? 'bg-primary text-primary-foreground'
                    : ''
                }`} // Conditional styling
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
