import React from 'react';
import Head from '../head';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body className="h-screen w-screen p-5">
        {children}
      </body>
    </html>
  );
}

export default AuthLayout;
