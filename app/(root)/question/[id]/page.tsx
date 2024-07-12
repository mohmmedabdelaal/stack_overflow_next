import { getQuestionById } from '@/lib/actions/questions.actions';
import { auth, SignedIn } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.actions';
import Link from 'next/link';
import Image from 'next/image';
import Metric from '@/components/shared/Metric';
import React from 'react';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import RenderHTML from '@/components/shared/RenderHTML';
import RenderTags from '@/components/shared/RenderTags';
import Answer from '@/components/forms/Answer';
import AllAnswers from '@/components/shared/AllAnswers';
import Votes from '@/components/shared/Votes';
// app/question/[questionId]/page.tsx (Example)

export async function generateMetadata({
  params: { questionId: id },
}: {
  params: { questionId: string };
}) {
  const question = await getQuestionById({ questionId: id });

  return {
    title: question?.title,
    description: question?.content.substring(0, 150) + '...',
  };
}

const Page = async ({ params }: any) => {
  const { userId: clerkId } = auth();
  let mongodbUser;
  if (clerkId) mongodbUser = await getUserById({ userId: clerkId });

  const result = await getQuestionById({ questionId: params.id });
  const { title, content } = result;

  if (!result) {
    console.log('No Question found');
  }
  console.log(result.answers);
  return (
    <>
      <div className="text-dark500_light700 flex w-full flex-col items-start gap-2">
        <div className="text-dark500_light700 flex w-full flex-col-reverse justify-between gap-5">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-5"
          >
            <Image
              src={result.author.picture}
              width={22}
              height={22}
              alt="author"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark-300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongodbUser?._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongodbUser?._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongodbUser?._id)}
              hasSaved={mongodbUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <div className="text-dark500_light700 flex items-start">
          <h1 className="h2-semibold text-dark-200_light800 mt-3.5 w-full text-left">
            {title}
          </h1>
        </div>
        <div className="text-dark500_light700 mb-2.5 flex justify-between gap-4">
          <Metric
            imgUrl="/assets/icons/clock.svg"
            alt="upvotes"
            title=" asked"
            value={` asked ${getTimestamp(result.createdAt)}`}
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(result.answers.length)}
            title=" Answers"
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            title=" Views"
            alt="eye"
            value={formatAndDivideNumber(result.views)}
          />
        </div>
      </div>
      <RenderHTML data={content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.length > 0 ? (
          result.tags.map((tag: any) => (
            <RenderTags
              key={tag._id}
              _id={JSON.stringify(tag._id)}
              name={tag.name}
            />
          ))
        ) : (
          <div>No tags</div>
        )}
      </div>
      <div className="mt-7">
        <AllAnswers
          userId={mongodbUser?._id}
          questionId={result._id}
          totalAnswers={result.answers.length}
        />
      </div>
      <div>
        <SignedIn>
          <Answer
            question={result.content}
            authorId={JSON.stringify(mongodbUser?._id)}
            questionId={JSON.stringify(result._id)}
          />
        </SignedIn>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      {/* Additional rendering based on your question structure */}
    </>
  );
};
export default Page;
