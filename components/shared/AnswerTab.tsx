import { getUserAnswers } from '@/lib/actions/user.actions';
import React from 'react';
import AnswersCard from '../card/AnswersCard';

async function AnswerTab({ searchParams, userId, clerkId }) {
  const { answers } = await getUserAnswers({ userId });
  console.log(answers);
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
