import Navbar from '../../components/Navbar';
import Head from '../head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head />
      <body>{children}</body>
    </html>
  );
}
