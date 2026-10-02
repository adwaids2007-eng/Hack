import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CAMPUSCRAFT — Student Creator Atelier | ASIET',
  description: 'A curated collegiate marketplace for Adi Shankara Institute of Engineering and Technology (ASIET) where student creativity transforms into artisanal connection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased font-body-md text-body-md selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
        {children}
      </body>
    </html>
  );
}
