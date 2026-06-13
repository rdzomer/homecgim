'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePanels } from '@/hooks/use-panels';
import type { Panel } from '@/lib/types';
import { Loader2 } from 'lucide-react';

function PanelContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { getPanelById, panels, loading } = usePanels();
  const [panel, setPanel] = useState<Panel | undefined | null>(null);

  const fetchPanel = useCallback(() => {
    if (id) {
      const found = getPanelById(id);
      setPanel(found ?? undefined);
    } else {
      setPanel(undefined);
    }
  }, [id, getPanelById]);

  useEffect(() => {
    if (loading) { setPanel(null); return; }
    fetchPanel();
  }, [id, panels, loading, fetchPanel]);

  if (panel === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Carregando painel...</p>
      </div>
    );
  }

  if (panel === undefined) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Painel não encontrado</h2>
        <p className="text-muted-foreground">O painel que você está procurando não existe ou foi excluído.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <iframe
        title={panel.name}
        srcDoc={panel.htmlContent}
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-full border-0"
      />
    </div>
  );
}

export default function PanelPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    }>
      <PanelContent />
    </Suspense>
  );
}
