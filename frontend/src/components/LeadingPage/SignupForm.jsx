import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';

export function SignupForm({
  isOpen,
  setIsOpen,
  title,
  description,
  buttonText,
  listType,
}) {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um e-mail válido.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const existingList = JSON.parse(localStorage.getItem(listType)) || [];
      if (existingList.includes(email)) {
        toast({
          title: 'Você já está inscrito!',
          description: 'Seu e-mail já está em nossa lista.',
        });
      } else {
        const newList = [...existingList, email];
        localStorage.setItem(listType, JSON.stringify(newList));
        toast({
          title: 'Inscrição realizada com sucesso!',
          description:
            'Obrigado por se inscrever. Entraremos em contato em breve!',
        });
      }
      setEmail('');
      setIsOpen(false);
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description:
          'Não foi possível completar sua inscrição. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="
          sm:max-w-[480px]
          bg-white text-slate-900
          rounded-xl shadow-2xl
          border border-black/5
          p-6
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="
                  col-span-3
                  bg-white
                  border-2 border-brand-purple/40
                  rounded-lg
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-brand-purple/40
                  focus-visible:border-brand-purple
                  placeholder:text-slate-400
                "
              />
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="submit"
              className="
                w-full
                bg-brand-purple text-white
                hover:bg-purple-700
                font-semibold
                py-3 rounded-lg
                transition
              "
            >
              {buttonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
