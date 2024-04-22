import React from 'react';
import {getUserInfo} from "@/lib/actions/user.actions";
import Image from "next/image";
import {getJoinedDate} from "@/lib/utils";
import {URLProps} from "@/types";
import {auth, SignedIn} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ProfileLink from "@/components/shared/ProfileLink";

const Page = async ({params, searchParams}: URLProps) => {
    const {userId: clerkId} = auth()
    const {id} = params;
    const userInfo = await getUserInfo({userId: id})

    return (
        <>
            <div className="flex flex-col-reverse items-start justifybetween sm:flex-row ">
                <div className='flex flex-col items-start gap-4 lg:flex-grow'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                    </div>

                    <Image src={userInfo?.user.picture} alt='profile picture' className="rounded-full object-cover"
                           width={100} height={100}/>
                    <div className="mt-3">
                        <h2 className="h2-bold text-dark100_light900">
                            {userInfo.user.name}
                        </h2>
                        <p className="paragraph-regular text-dark200_light900">
                            {userInfo.user.username}
                        </p>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center justify-start gap-2">
                        {userInfo.user.portfolioWebsite && (
                            <ProfileLink imgUrl='/assets/icons/link.svg' title="portfolio"
                                         href={userInfo.user.portfolioWebsite}
                            />

                        )}

                        {userInfo.user.location && (
                            <ProfileLink imgUrl='/assets/icons/location.svg' title={userInfo.user.location}/>
                        )}

                        <ProfileLink imgUrl='/assets/icons/calendar.svg' title={getJoinedDate(userInfo.user.joinedAt)}/>
                    </div>
                    {userInfo.user.bio && (
                        <p className="paragraph-regular text-dark400_light900 mt-8">
                            {userInfo.user.bio}
                        </p>
                    )}
                </div>
            </div>


            <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3 mt-3">
                <SignedIn>
                    {clerkId === userInfo.user.clerkId && (
                        <Link href="/profile/edit">
                            <Button
                                className="paragraph-meduim btn-secondary text-dark300_light900 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                                Edit Profile
                            </Button>
                        </Link>
                    )}
                </SignedIn>
            </div>
            stats
            <div className='flex mt-16 gap-10'>
                <Tabs defaultValue="top-posts" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="top-posts">Top posts</TabsTrigger>
                        <TabsTrigger value="answers">Answers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="top-posts">POSTS</TabsContent>
                    <TabsContent value="answers">ANSWERS</TabsContent>
                </Tabs>

            </div>
        </>
    );
};

export default Page;
