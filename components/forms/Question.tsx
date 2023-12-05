'use client';

import * as z from 'zod';

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Name must be more than 2 charchters',
    })
    .max(50),
});

const Question = () => {
  return <div>Questions form here</div>;
};

export default Question;
