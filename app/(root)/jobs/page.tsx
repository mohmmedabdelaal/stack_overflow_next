import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Available Jobs</h1>
      <div
        className="mt-11 flex justify-between gap-5 py-28
          max-sm:flex-col  sm:items-center"
      >
        <div className="mt-10 flex items-center justify-around p-2">
          <div className="flex flex-col">
            <h1 className="text-7xl font-bold tracking-wider">
              Welcome to{' '}
              <span className="text-primary-500">Jobista overflow</span>
            </h1>
            <div>Icons here</div>
          </div>

          <div>
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
