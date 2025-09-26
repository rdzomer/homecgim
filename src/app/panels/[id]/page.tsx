'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { usePanels } from '@/hooks/use-panels';
import type { Panel } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function PanelViewPage() {
  const params = useParams();
  const { getPanelById, panels, loading } = usePanels();
  const [panel, setPanel] = useState<Panel | undefined | null>(null);

  const fetchPanel = useCallback(() => {
    if (params.id) {
      const foundPanel = getPanelById(params.id as string);
      setPanel(foundPanel);
    }
  }, [params.id, getPanelById]);

  useEffect(() => {
    if (loading) {
      setPanel(null);
      return;
    }
    fetchPanel();
  }, [params.id, panels, loading, fetchPanel]);

  if (panel === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Panel...</p>
      </div>
    );
  }

  if (panel === undefined) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Panel Not Found</h2>
        <p className="text-muted-foreground">
          The panel you are looking for does not exist or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full">
      <iframe
        title={panel.name}
        srcDoc={panel.htmlContent}
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-full border-0"
      />
    </div>
  );
}
