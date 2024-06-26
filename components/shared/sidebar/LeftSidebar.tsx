'use client';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const LeftSidebar = () => {
  const { userId, signOut } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    signOut();
  };
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar  sticky left-0 top-0 flex h-screen w-fit justify-between  overflow-y-auto border-r  bg-gray-200 p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          if (item.route === '/profile') {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              href={item.route}
              key={item.route}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                width={26}
                height={26}
                alt={item.label}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p>{item.label}</p>
            </Link>
          );
        })}
        <div className="flex flex-col gap-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button
                className="small-medium btn-secondary
                    min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
              >
                <Image
                  src="/assets/icons/account.svg"
                  alt="login"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Log In
                </span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                className="small-medium btn-secondary
                    min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
              >
                <Image
                  src="/assets/icons/account.svg"
                  width={20}
                  height={20}
                  alt="Sing-up"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Sign Up
                </span>
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Button
              className="small-medium btn-secondary min-h-[41px] w-full rounded-lg
                     px-4 py-3 text-dark-300 shadow-none"
              onClick={handleLogout}
            >
              <Image
                src="/assets/icons/account.svg"
                width={20}
                height={20}
                className=""
                alt="Sign-out"
              />

              <span className="primary-text-gradient max-lg:hidden">
                Log out
              </span>
            </Button>
          </SignedIn>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
