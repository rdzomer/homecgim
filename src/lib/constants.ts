import type { Category } from './types';
import { Cog, Gem, MoreHorizontal, FileText, BookCopy } from 'lucide-react';
import { HydrogenIcon } from '@/components/icons';

export const CATEGORIES: readonly Category[] = [
  'Metalurgia',
  'Papel e Celulose',
  'Minerais Críticos',
  'Hidrogênio',
  'Memórias de Reunião',
  'Outros',
] as const;

export const CATEGORY_DETAILS: Record<
  Category,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  Metalurgia: { icon: Cog, label: 'Metalurgia' },
  'Papel e Celulose': { icon: FileText, label: 'Papel e Celulose' },
  'Minerais Críticos': { icon: Gem, label: 'Minerais Críticos' },
  Hidrogênio: { icon: HydrogenIcon, label: 'Hidrogênio' },
  'Memórias de Reunião': { icon: BookCopy, label: 'Memórias de Reunião' },
  Outros: { icon: MoreHorizontal, label: 'Outros' },
};