'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/auth-guard';

const metadata: Metadata = {
  title: 'Aplicações CGIM',
  description: 'Portal de acesso para as aplicações da CGIM.',
};

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AuthGuard>{children}</AuthGuard>;
}

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
        <AuthProvider>
          <main className="flex-1 flex flex-col">
            <AppContent>{children}</AppContent>
          </main>
          <footer className="py-4 text-center text-sm text-muted-foreground">
            © 2025 CGIM. Todos os direitos reservados.
          </footer>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
