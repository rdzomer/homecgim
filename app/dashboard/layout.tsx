'use client';

import { PanelsProvider } from '@/hooks/use-panels';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AppHeader } from '@/components/header';
import { UploadPanelDialog } from '@/components/upload-panel-dialog';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PanelsProvider>
      <div className="flex flex-col flex-1 bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container flex h-16 items-center">
            <Button asChild variant="ghost" className="-ml-4">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar ao Início</span>
              </Link>
            </Button>
          </div>
        </header>
        {children}
      </div>
    </PanelsProvider>
  );
}
