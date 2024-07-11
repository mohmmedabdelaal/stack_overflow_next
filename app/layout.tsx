import { ClerkProvider } from '@clerk/nextjs';
import React from 'react'
import type { Metadata } from 'next';
import '../styles/globals.css';
import '../styles/prism.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import Navbar from '@/components/shared/navbar/Navbar';
import LeftSidebar from '@/components/shared/sidebar/LeftSidebar';
import RightSidebar from '@/components/shared/sidebar/RightSidebar';

export const metadata: Metadata = {
  title: 'Dev Overflow - Your Source for Developer Q&A', // Default title
  description:
    'A platform for developers to ask and answer questions, share knowledge, and collaborate.', // Default description
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      {/* <Head /> */}

      <body>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'Primary-gradient',
              footerActionLink: 'primary-text-gradient hover: text-primary-500',
            },
          }}
        >
          <ThemeProvider>
            <main className="background-light850_dark100 relative">
              <Navbar />
              <div className="flex">
                <LeftSidebar />
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
                  <div className="mx-auto w-full max-w-5xl">{children}</div>
                </section>
                <RightSidebar />
              </div>
            </main>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
