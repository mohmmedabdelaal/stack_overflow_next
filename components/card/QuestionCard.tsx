import Link from 'next/link';
import React from 'react';
import RenderTags from '../shared/RenderTags';
// import Image from 'next/image';
import { getTimestamp ,formatAndDivideNumber} from '@/lib/utils';
import Metric from '@/components/shared/Metric';
// import {SignedIn} from "@clerk/nextjs";

interface QuestionProps {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string,clerkId:string };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?:string | null;
}

const QuestionCard = ({
  _id,
    clerkId,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  // const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex-col-reverse items-start justify-between gap-5 ">
        <div>

        <span className="subtle-regular text-dark400_light700   line-clamp-1 flex sm:hidden">
          {getTimestamp(createdAt)}
        </span>
        <Link href={`/question/${_id}`}>
          <h3
            className="sm:h3-semibold base-semibold
          text-dark200_light900 line-clamp-1 flex-1"
          >
            {title}
          </h3>
        </Link>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2">
          {tags.map(({ _id, name }) => (
            <RenderTags key={_id} _id={_id} name={name} />
          ))}
        </div>

        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            imgUrl={author.picture}
            title={` - asked ${getTimestamp(createdAt)}`}
            alt="User"
            value={author.name}
            href={`/profile/${author._id}`}
            isAuthor
          />
          <div className="flex items-center gap-3">

          <Metric
            imgUrl="/assets/icons/like.svg"
            title=" Votes"
            alt="upvotes"
            value={12}
            textStyle="small-medium text-dark400_light800"
          />
          </div>
          <Metric
           imgUrl='/assets/icons/message.svg'
           alt="message"
           value={formatAndDivideNumber(answers.length)}
           title=" Answers"
           textStyle="small-medium text-dark400_light800"
          />
          <Metric imgUrl="/assets/icons/eye.svg" title=" Views" alt="eye" value={formatAndDivideNumber(views)} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
