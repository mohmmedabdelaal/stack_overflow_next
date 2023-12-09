'use client';
import React, { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Editor } from '@tinymce/tinymce-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { questionValid } from '@/lib/validations';

const Question = () => {
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof questionValid>>({
    resolver: zodResolver(questionValid),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  });
  function onSubmit(values: z.infer<typeof questionValid>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semeibold text-dark-400_light800">
                  Title
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark-300_light700 min-h-[60px] border"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5">
                  Be specific and imagine you’re asking a question to another
                  person.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semeibold text-dark-400_light800">
                  explanation
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey="mf12mrig0pwyh7izl5pw6ao4ht7a61fmes14fawk0cm56qzo"
                    init={{
                      plugins:
                        'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                      toolbar:
                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                      tinycomments_mode: 'embedded',
                      tinycomments_author: 'Author name',
                      mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                      ],
                      ai_request: (request, respondWith) =>
                        respondWith.string(() =>
                          Promise.reject('See docs to implement AI Assistant')
                        ),
                    }}
                    initialValue="Welcome to TinyMCE!"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5">
                  Be specific and imagine you’re asking a question to another
                  person.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="btn-secondary
                    min-h-[41px] w-full rounded-lg px-4"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Question;
