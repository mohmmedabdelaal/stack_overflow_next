import Question from '@/components/forms/Question';
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {getUserById} from "@/lib/actions/user.actions";

const Page = async () => {
    const {userId} = auth()
    if(!userId) redirect('/sign-in')

    const mongoUserId = await getUserById({userId});

  return (
    <div>
      <div>
        <Question mongodbUserId={JSON.stringify(mongoUserId?._id)} />
      </div>
    </div>
  );
};

export default Page;
