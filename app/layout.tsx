import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import Head from './head';
import '../styles/globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import Navbar from '@/components/shared/navbar/Navbar';
import Sidebar from '@/components/shared/sidebar/LeftSidebar';
import RightSidebar from '@/components/shared/sidebar/RightSidebar';

export const metadata: Metadata = {
  title: 'DevOverflow',
  description:
    'Website about developers and needs for jobs demands which the market needs',
  icons: {
    icon: '../assets/images/default-logo.svg',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head />

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
                <Sidebar />
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
