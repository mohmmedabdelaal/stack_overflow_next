import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen p-5">{children}</body>
    </html>
  );
}

export default AuthLayout;
