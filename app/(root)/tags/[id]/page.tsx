import LocalSearch from '@/components/shared/search/LocalSearch';
import { getQuestionByTagId } from '@/lib/actions/tag.action';
import QuestionCard from '@/components/card/QuestionCard';

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: URLSearchParams;
}) => {
  const { id } = params;
  const result = await getQuestionByTagId({
    tagId: id,
    page: 1,
    searchQuery: searchParams.get('q') ?? '',
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
      <div
        className="mt-11 flex justify-between gap-5
       max-sm:flex-col sm:items-center"
      >
        <LocalSearch
          imgSrc="/assets/icons/search.svg"
          iconPlace="left"
          placeHolder="Search amazing answers here..."
          otherClasses="flex-3"
          route="/commnity"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        <div className="mt-5 flex w-full flex-col gap-6">
          {result.questions.length > 0 ? (
            result.questions.map((question) => (
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
            <div>No results now</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
