'use client';
import React, { useRef,useState } from 'react';
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
import { QuestionsValid } from '@/lib/validations';
import {Badge} from "@/components/ui/badge";
import Image from "next/image";


const type = 'edit'
const Question = () => {
    const [isSubmiting,setIsSubmiting] = useState(false)

    const editorRef = useRef(null);
  const form = useForm<z.infer<typeof QuestionsValid>>({
    resolver: zodResolver(QuestionsValid),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  });
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
        e.preventDefault();

        const tagInput = e.target as HTMLInputElement;
        const tagValue = tagInput.value.trim();

        if (tagValue !== '') {
            if (tagValue.length > 15) {
                return form.setError('tags', {
                    type: 'required',
                    message: 'Tag must be less than 15 character',
                });
            }
        }

        if (!field.value.includes(tagValue as never)) {
            form.setValue('tags', [...field.value, tagValue]);
            tagInput.value = '';
            form.clearErrors('tags')
        }
    }else{
        form.trigger()
    }

    }

    const handleTagRemove = (tag:string,field:any) => {
        const newTags = field.value.filter((t: string) => t !== tag);
        form.setValue('tags', newTags);
    }
  function onSubmit(values: z.infer<typeof QuestionsValid>) {
    isSubmiting(true);
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
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    init={{
                      height: 350,
                      menubar: false,

                      content_style: 'body {font-size:20px;}',
                      plugins:
                        'ai   anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                      toolbar:
                        'undo codesample redo  fontsize | bold italic underline  | image    | align lineheight  | checklist numlist bullist',

                      tinycomments_mode: 'embedded',
                      tinycomments_author: 'Author name',
                      mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                      ],
                      ai_request: (request, respondWith) =>
                        respondWith.string(() =>
                          // @ts-ignore
                          Promise.reject('See docs to implement AI Assistant')
                        ),
                    }}
                    initialValue=""
                  />
                </FormControl>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="paragraph-semeibold text-dark-400_light800">
                        Tags
                        <span className="text-primary-500">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5">
                          <>
                        <Input
                          className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark-300_light700 min-h-[60px] border"
                          placeholder="Add Tags.."
                          onKeyDown={(e) => handleInputKeyDown(e, field)}
                        />
                              <div className="flex flex-start mt-3.5 gap-3">
                          {field.value.length > 0 && field.value.map(tag => (
                              <Badge key={tag} className='subtle-medium background-light800_dark300 text-light-400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2.5 capitalize' onClick={() => handleTagRemove(tag,field)}>
                                  {tag}
                                  <Image src='/assets/icons/close.svg'   alt='cloese' width={12} height={12} className='cursor-pointer object-contain invert-0 dark:invert' />
                              </Badge>
                          ))}
                              </div>
                          </>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="btn-secondary
                    min-h-[41px] w-full rounded-lg px-4"
            disabled={isSubmiting}
          >
              {isSubmiting ? (
                  <>
                      {type === 'edit' ?  'Editing...' : 'Posting...'}
                  </>
              ):(
                  <>
                      {type === 'edit' ? 'Edit question' : 'asking a question'}
                  </>
              )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Question;
