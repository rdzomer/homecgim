'use client';

import type { Panel, Category } from '@/lib/types';
import { PanelCard } from './panel-card';
import { CATEGORIES, CATEGORY_DETAILS } from '@/lib/constants';

type PanelGridProps = {
  panels: Panel[];
};

export function PanelGrid({ panels }: PanelGridProps) {
  const groupedPanels = panels.reduce((acc, panel) => {
    (acc[panel.category] = acc[panel.category] || []).push(panel);
    return acc;
  }, {} as Record<Category, Panel[]>);

  const orderedCategories = CATEGORIES.filter(
    (category) => groupedPanels[category]?.length > 0
  );

  return (
    <div className="space-y-12">
      {orderedCategories.map((category) => {
        const CategoryIcon = CATEGORY_DETAILS[category].icon;
        return (
          <section key={category}>
            <div className="flex items-center gap-3 mb-6">
              <CategoryIcon className="h-7 w-7 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {CATEGORY_DETAILS[category].label}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {groupedPanels[category].map((panel) => (
                <PanelCard key={panel.id} panel={panel} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
