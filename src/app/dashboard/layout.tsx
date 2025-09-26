import { PanelsProvider } from '@/hooks/use-panels';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PanelsProvider>
      <div className="flex flex-col flex-1 bg-background">{children}</div>
    </PanelsProvider>
  );
}
