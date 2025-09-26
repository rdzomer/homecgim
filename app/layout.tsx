import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Aplicações CGIM',
  description: 'Portal de acesso para as aplicações da CGIM.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col'
        )}
      >
        <div className="relative w-full h-12">
            <Image 
                src="https://storage.googleapis.com/aai-sit-studio-public-proctor-v1/f2d7293a-9694-4d83-91c6-231a4155b9e6.png"
                alt="Banner superior com imagens industriais"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                quality={100}
                priority
            />
        </div>
        <AuthProvider>
          <main className="flex-1 flex flex-col">{children}</main>
          <Toaster />
        </AuthProvider>
         <div className="relative w-full h-12">
            <Image 
                src="https://storage.googleapis.com/aai-sit-studio-public-proctor-v1/f2d7293a-9694-4d83-91c6-231a4155b9e6.png"
                alt="Banner inferior com imagens industriais"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
                quality={100}
            />
        </div>
      </body>
    </html>
  );
}
