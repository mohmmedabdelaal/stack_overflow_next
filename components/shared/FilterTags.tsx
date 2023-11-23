'use client';
import React from 'react';
import RenderTags from './RenderTags';

const FilterTags = () => {
  const popularTags = [
    { _id: '1', name: 'javascript', totalQuestions: 15 },
    { _id: '2', name: 'react', totalQuestions: 50 },
    { _id: '3', name: 'next', totalQuestions: 45 },
    { _id: '4', name: 'vue', totalQuestions: 25 },
    { _id: '5', name: 'redux', totalQuestions: 5 },
  ];
  return (
    <div>
      {popularTags.map((tag) => (
        <RenderTags
          key={tag._id}
          _id={tag._id}
          name={tag.name}
          totalQuestions={tag.totalQuestions}
        />
      ))}
    </div>
  );
};

export default FilterTags;
