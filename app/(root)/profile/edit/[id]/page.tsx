import Profile from '@/components/forms/Profile';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import React from 'react';
import { notFound } from 'next/navigation';

const page = async () => {
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });

  if (!userId) {
    return notFound(); // Redirect to 404 if not logged in
  }

  if (!mongoUser) {
    return notFound(); // Redirect to 404 if user not found
  }

  // if (userId !== mongoUser) {
  //   return notFound(); // Redirect to 404 if the user is not the owner of the profile
  // }
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile profileData={JSON.stringify(mongoUser)} clerkId={userId} />
      </div>
    </>
  );
};

export default page;
