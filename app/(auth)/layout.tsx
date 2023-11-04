import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
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
