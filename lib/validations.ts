import * as z from 'zod';

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const EditProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' }),

  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),

  portfolioWebsite: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional(), // Portfolio link is optional

  bio: z
    .string()
    .max(250, { message: 'Bio must be at most 250 characters long' })
    .optional(), // Bio is optional

  location: z
    .string()
    .max(50, { message: 'Location must be at most 50 characters long' })
    .optional(), // Location is optional
});
