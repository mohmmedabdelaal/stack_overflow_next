import FilterTags from '@/components/shared/FilterTags';
import GlobalSearch from '@/components/shared/search/GlobalSearch';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { Button } from '@/components/ui/button';

import Link from 'next/link';

function Home() {
  return (
    <>
      <div
        className="flex w-full flex-col-reverse justify-between 
      gap-4 sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button
            className="primary-gradient min-h-[46px]
          px-4 py-3 !text-light-900"
          >
            Ask a Question
          </Button>
        </Link>
      </div>
      <div
        className="mt-11 flex justify-between gap-5 
       max-sm:flex-col sm:items-center"
      >
        <LocalSearch route='/' imgSrc='/assets/icons/search.svg' iconPlace='left' placeHolder="search for job" otherClasses="flex-1"/>

      </div>
    </>
  );
}

export default Home;
