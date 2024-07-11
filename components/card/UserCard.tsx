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
      className="rounded-lg bg-white shadow-md duration-300 hover:shadow-xl max-xs:min-w-full xs:w-[280px]"
    >
      <img
        src={user.picture}
        alt={user.name}
        className="h-56 w-full rounded-t-lg object-cover"
      />
      <div className="p-8 capitalize">
        <h2 className="text-xl font-medium tracking-wide">{user.name}</h2>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          @{user.username}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
            ))
          ) : (
            <Badge variant="secondary">No tags yet</Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
