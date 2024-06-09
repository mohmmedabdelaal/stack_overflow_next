'use client';

import { deleteAnswer } from '@/lib/actions/answer.actions';
import { deleteQuestion } from '@/lib/actions/questions.actions';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

interface EditDeleteActionsProps {
  type: 'Question' | 'Answer';
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: EditDeleteActionsProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/question/edit/${itemId}`);
  };
  const handleDelete = async () => {
    if (type === 'Question') {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathName });
    } else {
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathName });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'Question' && (
        <>
          <Image
            className="cursor-pointer object-contain"
            src={'/assets/icons/edit.svg'}
            alt="Edit"
            width={14}
            height={14}
            onClick={handleEdit}
          />
          <Image
            className="cursor-pointer object-contain"
            src={'/assets/icons/trash.svg'}
            alt="delete"
            width={14}
            height={14}
            onClick={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default EditDeleteAction;
