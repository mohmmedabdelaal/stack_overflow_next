import React from 'react';
import Head from '../head';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body className="h-screen w-screen p-5">
        <nav>
          <ul>
            <li>go home</li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}

export default AuthLayout;
