'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BarChart3, FileText, TrendingUp } from 'lucide-react';
import { AppLogo } from '@/components/icons';
import { AuthGuard } from '@/components/auth-guard';

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

function LandingPage() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <AppLogo className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Aplicações CGIM
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
            Bem-vindo ao Portal de Aplicações CGIM
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Selecione uma das aplicações abaixo para começar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app) => (
            <Link
              href={app.href}
              key={app.title}
              className="group"
              target={app.href.startsWith('http') ? '_blank' : '_self'}
              rel={app.href.startsWith('http') ? 'noopener noreferrer' : ''}
            >
              <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <app.icon className="h-10 w-10 text-primary" />
                      <div>
                        <CardTitle className="text-xl font-bold">{app.title}</CardTitle>
                        <CardDescription className="mt-1">{app.description}</CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CGIM. Todos os direitos reservados.
      </footer>
    </div>
  );
}


export default function ProtectedLandingPage() {
  return (
    <AuthGuard>
      <LandingPage />
    </AuthGuard>
  )
}
