import React from 'react';
import LocalSearch from '@/components/shared/search/LocalSearch';
import Filters from '@/components/shared/Filters';
import { UserFilters } from '@/constants/fitlers';
import UserCard from '@/components/card/UserCard';
import { getAllUsers } from '@/lib/actions/user.actions';
import { SearchPramsProps } from '@/types';
import NoResults from '@/components/shared/NoResults';

const Page = async ({ searchParams }: SearchPramsProps) => {
  const results = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div
        className="mt-11 flex justify-between gap-5
              max-sm:flex-col sm:items-center"
      >
        <LocalSearch
          imgSrc="/assets/icons/search.svg"
          iconPlace="left"
          placeHolder="Search amazing minds here..."
          otherClasses="flex-3"
          route="/community"
        />
        <Filters
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          // selectedFilter={selectedFilter}
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {results.users.length > 0 ? (
          results.users.map((user) => (
            <UserCard key={user._id} user={user} variant="compact" />
          ))
        ) : (
          <NoResults
            title="No users available now"
            link="/profile"
            linkTitle="Users not found"
            description="Try to connect with more profiles"
          />
        )}
      </section>
    </>
  );
};

export default Page;
