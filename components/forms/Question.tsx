'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

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
