'use server';

import { connectToDatabase } from '../mongoose';
import { SearchParams } from './shared.types';
//  import {Question, User, Answer,Tag} from '@/database'
import Question from '@/database/question.model';
import User from '@/database/user.model';
import Answer from '@/database/Answer.model';
import Tag from '@/database/tag.model';
import { FilterQuery, ObjectId } from 'mongoose';

export async function getGlobalSearch(params: SearchParams) {
  try {
    connectToDatabase();

    const { type, query } = params;

    if (!query || query.trim() === '') {
      return { results: [] };
    }

    const regexQuery = { $regex: new RegExp(query, 'i') };
    const limit = 10; // Limit results for performance

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: Tag, searchField: 'name', type: 'tag' },
    ];

    const filteredModelsAndTypes = type
      ? modelsAndTypes.filter((item) => item.type === type)
      : modelsAndTypes;

    const results = await Promise.all(
      filteredModelsAndTypes.map(async ({ model, searchField, type }) => {
        const queryObject: FilterQuery<any> = { [searchField]: regexQuery };

        if (model === User) {
          queryObject.$or = [{ name: regexQuery }, { username: regexQuery }];
        }

        const data = await model.find(queryObject).limit(limit).lean();

        return data.map((item: any) => {
          let title = '';
          if (type === 'answer') {
            title = item.content.substring(0, 50) + '...';
          } else {
            title = item[searchField];
          }

          return {
            ...item,
            _id:
              type === 'user' ? item.clerkId.toString() : item._id.toString(),
            type,
            title,
            ...(type === 'answer' && {
              question: {
                ...item.question,
                _id: (item.question._id as ObjectId).toString(),
              },
              author: {
                ...item.author,
                _id: (item.author._id as ObjectId).toString(),
              },
            }),
          };
        });
      })
    );

    const flat = results.flat();

    return JSON.stringify(flat);
  } catch (error) {
    console.error('Error in global search:', error);
    throw error;
  }
}
///
/**
 * 
Certainly! Here's the simplified version of the `getGlobalSearch` function using the latest version of Next.js:

```typescript
import { connectToDatabase } from '../mongoose';
import { SearchParams } from './shared.types';
import { Question, User, Answer, Tag } from '@/database';
import { FilterQuery, ObjectId } from 'mongoose';


```

In this simplified version, the imports have been updated to use the latest syntax for importing models and utility functions.

The filtering of models and types based on the `type` parameter has been simplified using the `filter` method. The specific adjustments for the `User` model have been made using the `$or` operator.

The mapping of the results has been simplified, and the unnecessary commented code has been removed.

The flattened results are returned as a JSON string.

Please make sure to import the necessary models and the `connectToDatabase` function in your code.
*/
