import Image from "next/image";
import Link from "next/link";
import RenderTags from "@/components/shared/RenderTags";
import {Badge} from "@/components/ui/badge";
import {getTopInteractedTags} from "@/lib/actions/tag.action";

interface UserProps {
    user:{
        _id: string,
        clerkId: string,
    name: string;
    username: string;
    picture: string;
    }
}
const Page = async ({user}: UserProps) => {
    const interactedTags = await getTopInteractedTags({userId: user._id});

    return (
        <Link  href={`/profile/${user.clerkId}`}
               className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
        >
            <>
                <time dateTime="2016-01-8" suppressHydrationWarning={true} />
            <article className="flex flex-col items-center bg-white border w-full border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" width={120} height={120} src={
                        user.picture} alt={user.name} />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.name}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.username}</p>
                            <div className="flex mt-1.5 flex-wrap">

                            {interactedTags.length > 0 ? (
                                interactedTags.map((tag)=>(
                            <RenderTags key={tag._id} _id={tag._id} name={tag.name} />

                                ))
                            ): (<Badge>No tags yet</Badge>)}
                            </div>
                        </div>
                </article>
            </>
        </Link>
    );
};

export default Page;
