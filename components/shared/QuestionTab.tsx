// components/shared/QuestionTab.tsx
import { getUserQuestions } from '@/lib/actions/user.actions';
import Link from 'next/link';
import QuestionCard from '../card/QuestionCard';

const QuestionTab = async ({ searchParams, userId, clerkId }) => {
  const { questions } = await getUserQuestions({ userId });
  return (
    <div className="mt-8 space-y-6">
      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          author={question.author}
          clerkId={clerkId}
          tags={question.tags}
          views={question.views}
          upvotes={question.upvotes}
          createdAt={question.createdAt}
          answers={question.answers}
        />
      ))}
    </div>
  );
};

export default QuestionTab;
