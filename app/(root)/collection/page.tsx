import Filters from '@/components/shared/Filters';
import { QuestionFilters } from '@/constants/fitlers';

import NoResults from '@/components/shared/NoResults';
import QuestionCard from '@/components/card/QuestionCard';
import { getAllSavedQuestions } from '@/lib/actions/questions.actions';
import { auth } from '@clerk/nextjs';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { SearchPramsProps } from '@/types';

export default async function Collections({ searchParams }: SearchPramsProps) {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getAllSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Collections</h1>
      <div
        className="mt-11 flex justify-between gap-5
       max-sm:flex-col sm:items-center"
      >
        <LocalSearch
          imgSrc="/assets/icons/search.svg"
          iconPlace="left"
          placeHolder="Search for you fav questions."
          otherClasses="flex-3"
          route="/collection"
        />
        <Filters
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-5 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
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
            />
          ))
        ) : (
          <NoResults
            title="There’s no question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
