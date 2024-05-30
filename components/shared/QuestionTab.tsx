// components/shared/QuestionTab.tsx
import React from 'react';
import { PostType } from '@/types';
import Link from 'next/link';

interface QuestionTabProps {
  questions: PostType[];
  isLoading?: boolean;
}

const QuestionTab: React.FC<QuestionTabProps> = ({
  questions,
  isLoading = false,
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!questions || questions.length === 0) {
    // Check if questions is undefined or empty
    return <div>No questions found.</div>;
  }

  return (
    <div className="mt-8 space-y-6">
      {questions.map((question) => (
        <div key={question._id} className="border rounded-md p-4">
          {/* Render the content of each question */}
          <h2>{question.title}</h2>
          {/* You can add more details like tags, upvotes, etc. */}
          <Link href={`/question/${question._id}`}>View Question</Link>
        </div>
      ))}
    </div>
  );
};

export default QuestionTab;
