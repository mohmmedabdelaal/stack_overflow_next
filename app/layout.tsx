import {ClerkProvider} from "@clerk/nextjs";
import  type {Metadata} from 'next';
import Head from './head';
import '../styles/globals.css'
import {ThemeProvider} from "@/app/Context";

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

    <html>
      <Head />

      <body>
      <ClerkProvider
        appearance={
          {
              elements: {
                  formButtonPrimary: 'Primary-gradient',
                  footerActionLink: 'primary-text-gradient hover: text-primary-500'
              }
          }
        }
      >
     {/*<ThemeProvider>*/}

      {children}

     {/*</ThemeProvider>*/}
      </ClerkProvider>
      </body>
    </html>
  );
}
