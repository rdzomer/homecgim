'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { usePanels } from '@/hooks/use-panels';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { CATEGORIES, CATEGORY_DETAILS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome do painel deve ter pelo menos 2 caracteres.',
  }),
  category: z.enum(CATEGORIES, {
    errorMap: () => ({ message: 'Selecione uma categoria.' }),
  }),
  file:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files?.length === 1, 'O arquivo HTML é obrigatório.')
          .refine(
            (files) => files?.[0]?.type === 'text/html',
            'Apenas arquivos .html são aceitos.'
          ),
});

type UploadPanelDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function UploadPanelDialog({ isOpen, setIsOpen }: UploadPanelDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addPanel } = usePanels();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const file = values.file[0];
      const htmlContent = await file.text();
      
      const newPanel = await addPanel({
        name: values.name,
        category: values.category,
        htmlContent,
      });

      if (newPanel) {
        toast({
          title: 'Upload bem-sucedido',
          description: `O painel "${newPanel.name}" foi adicionado.`,
        });
        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Falha no upload:', error);
      toast({
        variant: 'destructive',
        title: 'Falha no Upload',
        description:
          'Houve um problema ao enviar seu painel. Por favor, tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar um Novo Painel</DialogTitle>
          <DialogDescription>
            Forneça os detalhes e selecione o arquivo HTML para seu novo painel.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Painel</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Produção Mensal de Aço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {CATEGORY_DETAILS[cat].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arquivo HTML</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".html"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
