import React from 'react';
import LocalSearch from '@/components/shared/search/LocalSearch';
import Filters from '@/components/shared/Filters';
import { UserFilters } from '@/constants/fitlers';
import UserCard from '@/components/card/UserCard';
import { getAllUsers } from '@/lib/actions/user.actions';
import { Badge } from '@/components/ui/badge';

const Page = async () => {
  const results = await getAllUsers({});

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
        />
      </div>
      <div className="mt-3.5 pt-2">
        {results.user.length > 0 ? (
          results.user.map((users) => <UserCard key={users._id} user={users} />)
        ) : (
          <Badge>
            <h1> No Users yet...</h1>
          </Badge>
        )}
      </div>
    </>
  );
};

export default Page;
