'use client';

import { AppHeader } from '@/components/header';
import { PanelGrid } from '@/components/panel-grid';
import { Button } from '@/components/ui/button';
import { usePanels } from '@/hooks/use-panels';
import { Upload } from 'lucide-react';
import { UploadPanelDialog } from '@/components/upload-panel-dialog';
import { useState } from 'react';
import Loading from './loading';

export default function DashboardPage() {
  const { panels, loading } = usePanels();
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AppHeader onUploadClick={() => setUploadDialogOpen(true)} />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {panels.length > 0 ? (
          <PanelGrid panels={panels} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              Bem-vindo ao PanelUp
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Seu painel está vazio. Envie seu primeiro painel HTML para começar.
            </p>
            <Button onClick={() => setUploadDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Enviar Painel
            </Button>
          </div>
        )}
      </main>
      <UploadPanelDialog
        isOpen={isUploadDialogOpen}
        setIsOpen={setUploadDialogOpen}
      />
    </>
  );
}
