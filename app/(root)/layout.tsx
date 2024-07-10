import React from 'react';
import type { Metadata } from 'next';
import '../../styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Dev Overflow - Your Source for Developer Q&A', // Default title
  description:
    'A platform for developers to ask and answer questions, share knowledge, and collaborate.', // Default description
  openGraph: {
    title: 'Dev Overflow - Your Source for Developer Q&A',
    description:
      'A platform for developers to ask and answer questions, share knowledge, and collaborate.',
    url: 'https://your-dev-overflow-website.com', // Replace with your actual URL
    siteName: 'Dev Overflow',
    images: [
      {
        url: '/assets/images/dev-overflow-logo.png', // Path to your logo or an image representing your site
        width: 800,
        height: 600,
        alt: 'Dev Overflow Logo',
      },
    ],
    locale: 'en_US', // Set your default locale
    type: 'website',
  },
  // Add other metadata properties like robots, icons, etc.
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="background-light850_dark100 relative">
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
      <Toaster />
    </main>
  );
}
