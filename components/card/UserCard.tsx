import Image from 'next/image';
import Link from 'next/link';
import RenderTags from '@/components/shared/RenderTags';
import { Badge } from '@/components/ui/badge';
import { getTopInteractedTags } from '@/lib/actions/tag.action';

interface UserProps {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    picture: string;
  };
  variant?: 'default' | 'compact'; // Add a variant prop for different card sizes
}

const UserCard = async ({ user, variant = 'default' }: UserProps) => {
  // Fetch interacted tags (ensure tag._id is converted to string in getTopInteractedTags)
  const { tags } = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <div className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <div
          className={`
            relative aspect-square h-48 w-48 overflow-hidden rounded-t-lg 
            ${variant === 'compact' ? 'h-32 w-32' : ''}
            md:h-auto md:w-48 md:rounded-none md:rounded-s-lg
          `}
        >
          <Image
            src={user.picture}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div
          className={`
          flex flex-col justify-between p-4 leading-normal 
          ${variant === 'compact' ? 'items-center text-center' : ''}
        `}
        >
          {/* Adjust heading size based on variant */}
          <h5
            className={`
            mb-2 tracking-tight text-gray-900 dark:text-white
            ${
              variant === 'default'
                ? 'text-2xl font-bold'
                : 'text-xl font-semibold'
            }
          `}
          >
            {user.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            @{user.username}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
              ))
            ) : (
              <Badge variant="secondary">No tags yet</Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
