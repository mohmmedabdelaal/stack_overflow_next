import { getUserAnswers } from '@/lib/actions/user.actions';
import { SearchPramsProps } from '@/types';
import AnswersCard from '../card/AnswersCard';
// import Pagination from './Paginations';

interface Props extends SearchPramsProps {
  userId: string;
  clerkId?: string | null;
}

async function AnswerTab({ searchParams, userId, clerkId }: Props) {
  const results = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div>
      {results?.answers.map((item) => (
        <AnswersCard
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          key={item._id}
          author={item.author}
          createdAt={item.createdAt}
          upvotes={item.upvotes}
        />
      ))}
      <div className="mt-10">
        {/* <Pagination pageNumber={searchParams?.page ? +searchParams.page: 1} isNext={results.isNextAnswer} /> */}
      </div>
    </div>
  );
}

export default AnswerTab;
