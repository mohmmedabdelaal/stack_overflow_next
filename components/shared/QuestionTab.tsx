// components/shared/QuestionTab.tsx
import { getUserQuestions } from '@/lib/actions/user.actions';
import QuestionCard from '../card/QuestionCard';

interface QuestionTabProps {
  userId: string; // Assuming userId is a string
  clerkId: string; // Assuming clerkId is also a string
}

const QuestionTab = async ({ userId, clerkId }: QuestionTabProps) => {
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
