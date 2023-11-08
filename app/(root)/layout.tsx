import {ClerkProvider} from "@clerk/nextjs";
import  type {Metadata} from 'next';
import Head from '../head';
import '../globals.css'

export const metadata: Metadata = {
    title: 'DevOverflow',
    description: 'Website about developers and needs for jobs demands which the market needs',
    icons: {
        icon: '../assets/images/default-logo.svg'
    }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider>

    <html>
      <Head />

      <body>
      <h1>From the future</h1>
      {children}</body>
    </html>
      </ClerkProvider>
  );
}
