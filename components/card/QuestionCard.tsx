'use client';
import Link from 'next/link';
import React from 'react';
import RenderTags from '../shared/RenderTags';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import Metric from '@/components/shared/Metric';

interface Props {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex-col-reverse items-start justify-between gap-5 ">
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

        <div className="flex">
          {tags.map(({ _id, name }) => (
            <RenderTags key={_id} _id={_id} name={name} />
          ))}
        </div>
        <div className="flex">
          <Metric
            imgUrl="/assets/icons/avatar.svg"
            title={` - asked ${getTimestamp(createdAt)}`}
            alt="User"
            value={author.name}
            href={`/profile/${author._id}`}
            isAuthor
          />{' '}
          <Metric
            imgUrl="/assets/icons/message.svg"
            title={` - asked ${getTimestamp(createdAt)}`}
            alt="Message"
            value="message"
            href={`/profile/${author._id}`}
            isAuthor
          />
          <Metric
            imgUrl="/assets/icons/avatar.svg"
            title={` - asked ${getTimestamp(createdAt)}`}
            alt="User"
            value={author.name}
            href={`/profile/${author._id}`}
            isAuthor
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
