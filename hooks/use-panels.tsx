'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import type { Panel, Category } from '@/lib/types';
import { generatePanelDescription } from '@/ai/flows/generate-panel-description';
import { useToast } from './use-toast';
import { useAuth } from './use-auth';

interface PanelContextType {
  panels: Panel[];
  loading: boolean;
  addPanel: (panelData: {
    name: string;
    category: Category;
    htmlContent: string;
  }) => Promise<Panel | null>;
  getPanelById: (id: string) => Panel | undefined;
  deletePanel: (id: string) => void;
}

const PanelsContext = createContext<PanelContextType | undefined>(undefined);

export function PanelsProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [panels, setPanels] = useState<Panel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPanels = useCallback(async () => {
    if (!user) {
      setPanels([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const panelsCollection = collection(firestore, 'panels');
      const q = query(panelsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const panelsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Panel[];
      setPanels(panelsData);
    } catch (error) {
      console.error('Falha ao carregar painéis do Firestore', error);
      toast({
        variant: 'destructive',
        title: 'Erro de Banco de Dados',
        description: 'Não foi possível carregar os painéis do Firestore.',
      });
    } finally {
      setLoading(false);
    }
  }, [toast, user]);

  useEffect(() => {
    fetchPanels();
  }, [fetchPanels]);

  const addPanel = useCallback(
    async (panelData: {
      name: string;
      category: Category;
      htmlContent: string;
    }) => {
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Não autenticado',
          description: 'Você precisa estar logado para adicionar um painel.',
        });
        return null;
      }

      try {
        const { description } = await generatePanelDescription({
          htmlContent: panelData.htmlContent,
        });

        const newPanelData = {
          ...panelData,
          description,
          userId: user.uid,
          createdAt: new Date().toISOString(),
        };

        const docRef = await addDoc(collection(firestore, 'panels'), newPanelData);

        const newPanel: Panel = {
          ...newPanelData,
          id: docRef.id,
        };

        setPanels((prev) => [newPanel, ...prev]);
        return newPanel;
      } catch (error) {
        console.error('Falha ao gerar descrição ou adicionar painel', error);
        toast({
          variant: 'destructive',
          title: 'Erro de IA ou Banco de Dados',
          description:
            'Falha ao criar o painel. Por favor, tente novamente.',
        });
        return null;
      }
    },
    [toast, user]
  );

  const getPanelById = useCallback(
    (id: string): Panel | undefined => {
      return panels.find((p) => p.id === id);
    },
    [panels]
  );

  const deletePanel = useCallback(
    async (id: string) => {
      try {
        await deleteDoc(doc(firestore, 'panels', id));
        setPanels((prev) => prev.filter((p) => p.id !== id));
        toast({
          title: 'Painel Excluído',
          description: 'O painel foi removido com sucesso do banco de dados.',
        });
      } catch (error) {
        console.error('Falha ao excluir painel', error);
        toast({
          variant: 'destructive',
          title: 'Erro ao Excluir',
          description: 'Não foi possível remover o painel do banco de dados.',
        });
      }
    },
    [toast]
  );

  const value = { panels, loading, addPanel, getPanelById, deletePanel };

  return (
    <PanelsContext.Provider value={value}>{children}</PanelsContext.Provider>
  );
}

export function usePanels() {
  const context = useContext(PanelsContext);
  if (context === undefined) {
    throw new Error('usePanels deve ser usado dentro de um PanelsProvider');
  }
  return context;
}
