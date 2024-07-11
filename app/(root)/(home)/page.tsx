import Link from 'next/link';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { Button } from '@/components/ui/button';
import Filters from '@/components/shared/Filters';
import { HomePageFilters } from '@/constants/fitlers';
import HomeFilters from '@/components/home/HomeFilters';

import NoResults from '@/components/shared/NoResults';
import QuestionCard from '@/components/card/QuestionCard';
import { getQuestions } from '@/lib/actions/questions.actions';
import { auth } from '@clerk/nextjs';
import { SearchPramsProps } from '@/types';
import Pagination from '@/components/shared/Paginations';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Overflow | Home', // Default title
  description:
    'A platform for developers to ask and answer questions, share knowledge, and collaborate.', // Default description
  openGraph: {
    title: 'Dev Overflow - Your Source for Developer Q&A',
    description:
      'A platform for developers to ask and answer questions, share knowledge, and collaborate.',

    siteName: 'Dev Overflow',
    images: [
      {
        url: '/assets/images/logo.png', // Path to your logo or an image representing your site
        width: 800,
        height: 600,
        alt: 'Dev Overflow Logo',
      },
    ],
    locale: 'en_US', // Set your default locale
    type: 'website',
  },
  // Add other metadata properties like robots, icons, etc.
};

export default async function Home({ searchParams }: SearchPramsProps) {
  const { userId: clerkId } = auth();
  const { questions, isNext } = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

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
        <LocalSearch
          route="/"
          imgSrc="/assets/icons/search.svg"
          iconPlace="left"
          placeHolder="search for Question"
          otherClasses="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-5 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question:any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              clerkId={clerkId}
            />
          ))
        ) : (
          <NoResults
            title="There is no question to show"
            link="/ask-question"
            linkTitle="Ask more accuret question"
            description="Ask question to gain more knowledge"
          />
        )}
      </div>
      <div>
        <div className="mt-10">
          <Pagination
            isNext={isNext}
            pageNumber={searchParams?.page ? +searchParams.page : 1}
          />
        </div>
      </div>
    </>
  );
}
