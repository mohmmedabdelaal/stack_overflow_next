import {UserProfile} from '@clerk/nextjs'
const Page = () => {
    return (
        <div>
            <UserProfile path="/user-profile" routing="path" />
        </div>
    );
};

export default Page;
