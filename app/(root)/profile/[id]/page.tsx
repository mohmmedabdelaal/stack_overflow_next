import React from 'react';
import { getUserInfo } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { getJoinedDate } from '@/lib/utils';
import { URLProps } from '@/types';
import { auth, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileLink from '@/components/shared/ProfileLink';
import Stats from '@/components/shared/Stats';
import AnswerTab from '@/components/shared/AnswerTab';
import QuestionTab from '@/components/shared/QuestionTab';
import { checkAndUpdateBadges } from '@/lib/actions/questions.actions';

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const { id } = params;
  const userInfo = await getUserInfo({ userId: id });

  const isCurrentUser = clerkId === userInfo.user.clerkId;
  if (!userInfo?.user) {
    // Handle case where user is not found (e.g., display an error message)
    return <div>User not found</div>;
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row ">
        <div className="flex flex-col items-start gap-4 lg:grow">
          {/* <div className="text-dark500_light700 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="card">
              <h3 className="text-xl font-bold">Questions</h3>
              <p className="text-2xl">{userInfo.user.questions}</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold">Answers</h3>
              <p className="text-2xl">{userInfo.user.answers}</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold">Upvotes</h3>
              <p className="text-2xl">{userInfo.user.upvotes}</p>
            </div>
          </div> */}

          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            className="rounded-full object-cover"
            width={100}
            height={100}
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light900">
              @{userInfo.user.username}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-start gap-2">
            {userInfo.user.portfolioWebsite && (
              <ProfileLink
                imgUrl="/assets/icons/link.svg"
                title="portfolio"
                href={userInfo.user.portfolioWebsite}
              />
            )}

            {userInfo.user.location && (
              <ProfileLink
                imgUrl="/assets/icons/location.svg"
                title={userInfo.user.location}
              />
            )}

            <ProfileLink
              imgUrl="/assets/icons/calendar.svg"
              title={getJoinedDate(userInfo.user.joinedAt)}
            />
          </div>
          {userInfo.user.bio && (
            <p className="paragraph-regular text-dark400_light900 mt-8">
              {userInfo.user.bio}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
        <SignedIn>
          {isCurrentUser && (
            <Link href={`/profile/edit/${id}`}>
              <Button className="paragraph-meduim btn-secondary text-dark300_light900 rounded px-4 py-2 font-bold hover:bg-blue-700">
                Edit Profile
              </Button>
            </Link>
          )}
        </SignedIn>
      </div>
      <Stats
        totalAnswers={userInfo.totalAnswers}
        totalQuestions={userInfo.totalQuestions}
        reputation={userInfo.reputation}
        badges={userInfo.badgesCounts}
      />
      <div className="mt-16 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-5"
          >
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswerTab
              userId={userInfo.user._id}
              clerkId={clerkId}
              searchParams={searchParams}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
