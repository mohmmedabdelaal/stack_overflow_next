'use client';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnswerSchema } from '@/lib/validations';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { createAnswer } from '@/lib/actions/answer.actions';
import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';

interface Props {
  authorId: string;
  questionId: string;
}
const Answer = ({ authorId, questionId }: Props) => {
  const { mode } = useTheme();
  const pathName = usePathname();
  const [isSubmit, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  //   const router = useRouter();
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathName,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent('');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    if (!authorId) return;

    // setSetIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CHATGPT_API_KEY}/api/chatgpt`,
        {
          method: 'POST',
          body: JSON.stringify({ question }),
        }
      );

      const aiAnswer = await response.json();

      // Convert plain text to HTML format

      const formattedAnswer = aiAnswer.reply.replace(/\n/g, '<br />');

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }

      // toast({
      //   title: "Success!",
      //   description: "AI Answer has been placed.",
      // });
    } catch (error) {
      console.log(error);
    } finally {
      // setSetIsSubmittingAI(false);
      console.log('error');
    }
  };

  return (
    <div>
      <div className="text-dark500_light700 flex justify-between gap-5">
        <h4 className="paragraph-semibold text-dark-400_light800 mt-1.5">
          Write your answer here..
        </h4>
        <Button
          className=" btn light-border-2 flex gap-1 rounded-md bg-light-400 px-4 py-2.5"
          onClick={() => generateAIAnswer()}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="stars"
            width={22}
            height={22}
            className="object-contain"
          />
          Generate Ai answer..
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="answer"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue={''}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                      ],
                      toolbar:
                        'undo redo | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter |' +
                        'alignright alignjustify | bullist numlist',
                      content_style:
                        'body { font-family:Inter; font-size:16px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light',
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  answer with specific lines
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmit}
            >
              {isSubmit ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
