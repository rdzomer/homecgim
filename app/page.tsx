'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppHeader } from '@/components/header';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BarChart3, FileText, TrendingUp } from 'lucide-react';
import { UploadPanelDialog } from '@/components/upload-panel-dialog';
import { PanelsProvider } from '@/hooks/use-panels';

const applications = [
  {
    title: 'Painéis Informativos',
    description: 'Visualize e gerencie painéis de dados interativos.',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Análise de Pleitos',
    description: 'Ferramenta para análise de alteração tarifária.',
    href: 'https://cgim.netlify.app',
    icon: FileText,
  },
  {
    title: 'Depreciação Acelerada',
    description: 'Painel de B.I. da Depreciação Acelerada.',
    href: 'https://app.powerbi.com/groups/me/reports/3fb2fbf2-6d88-41aa-b0e8-21e5d6a4e15c/6c95959d5b3449db1d67?experience=power-bi',
    icon: TrendingUp,
  },
];

export default function RootPage() {
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <AuthGuard>
      <PanelsProvider>
        <AppHeader onUploadClick={() => setUploadDialogOpen(true)} />
        <main className="flex-1 container mx-auto p-4 md:p-8 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center w-full">
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                Bem-vindo ao Portal de Aplicações CGIM
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Selecione uma das aplicações abaixo para começar.
              </p>
              <div className="flex flex-col gap-6 w-full max-w-4xl">
                {applications.map((app) => (
                  <Link href={app.href} key={app.title} passHref>
                    <Card className="group flex flex-row items-center w-full bg-card hover:shadow-lg hover:border-primary transition-all duration-300 text-left">
                      <div className="flex-grow p-6">
                        <div className="flex items-center gap-4 mb-2">
                          <app.icon className="h-8 w-8 text-primary" />
                          <CardTitle className="text-lg font-bold">{app.title}</CardTitle>
                        </div>
                        <CardDescription>{app.description}</CardDescription>
                      </div>
                      <div className="p-6">
                         <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
          </div>
        </main>
        <UploadPanelDialog
          isOpen={isUploadDialogOpen}
          setIsOpen={setUploadDialogOpen}
        />
      </PanelsProvider>
    </AuthGuard>
  );
}
