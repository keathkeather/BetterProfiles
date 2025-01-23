import { Inter } from 'next/font/google';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Navbar } from './components/navbar';
import Head from 'next/head';
import { StoreProvider } from './store/StoreProvider';

const inter = Inter({ subsets: ['latin',] });

export const metadata = {
  title: 'UserDash',
  description: 'Connect with professionals and explore their experiences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
    <html lang='en'>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mokoto:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
    </StoreProvider>
  );
}
