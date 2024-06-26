import React from 'react';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import RenderHTML from '@/components/shared/RenderHTML';
import Link from 'next/link';

interface AuthorProps {
  content: string;
  author: {};
  createdAt: {};
}
const AnswersCard = ({ content, author, createdAt }: AuthorProps) => {
  const { name, picture, clerkId } = author;
  return (
    <article className="light-border text-dark500_light700 border-b py-10">
      <div className="mb-8 flex flex-col-reverse justify-between gap-5">
        <Link
          href={`/profile/${clerkId}`}
          className="flex flex-1 items-start gap-1 sm:items-center"
        >
          <Image
            src={picture}
            width={18}
            height={18}
            alt="profile"
            className="rounded-full object-cover max-sm:mt-0.5"
          />
          <div className="flex flex-col sm:flex-row sm:items-center">
            <p className="body-smibold text-dark-300_light700">{name}</p>
            <p className="small-regular text-light-400_light500 ml-0.5 mt-0.5 line-clamp-1">
              Answered {getTimestamp(createdAt)}
            </p>
          </div>
        </Link>
      </div>
      <RenderHTML data={content} />
    </article>
  );
};

export default AnswersCard;
