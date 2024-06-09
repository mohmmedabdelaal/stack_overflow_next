import Question from '@/components/forms/Question';
import { getQuestionById } from '@/lib/actions/questions.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import React from 'react';

const page = async ({ params }: ParamsProps) => {
  const { id } = params;
  const { userId } = auth();
  const mongodbUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: id });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="edit"
          results={JSON.stringify(result)}
          mongodbUserId={mongodbUser._id}
        />
      </div>
    </>
  );
};

export default page;
