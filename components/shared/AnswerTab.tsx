import { getUserAnswers } from '@/lib/actions/user.actions';
import AnswersCard from '../card/AnswersCard';

interface Props {
  userId: string;
}

async function AnswerTab({ userId }: Props) {
  const { answers } = await getUserAnswers({ userId });

  return (
    <div>
      {answers.map((answer) => (
        <AnswersCard
          key={answer._id}
          content={answer.content}
          author={answer.author}
          createdAt={answer.createdAt}
        />
      ))}
    </div>
  );
}

export default AnswerTab;
