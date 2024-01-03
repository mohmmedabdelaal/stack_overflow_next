'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  imgUrl: string;
  title: string;
  alt: string;
  value: string | number;
  isAuthor?: boolean;
  textStyle?: string;
  href?: string;
}
const Metric = ({
  imgUrl,
  title,
  alt,
  value,
  isAuthor,
  href,
  textStyle,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? 'rounded-full' : ''}`}
      />
      <p className={`${textStyle} flex items-center gap-1`}>{value}</p>
      <span
        className={`small-regular line-clamp-1 ${
          isAuthor ? 'max-sm:hidden' : ''
        }`}
      >
        {title}
      </span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }
  return <div className="flex-center gap-1">{metricContent}</div>;
};

export default Metric;
