
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

interface EmailConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (email: string) => void;
  defaultEmail?: string;
}

const EmailConfirmationDialog: React.FC<EmailConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  defaultEmail = 'marc.dubois@email.com',
}) => {
  const [email, setEmail] = useState(defaultEmail);

  const handleConfirm = () => {
    onConfirm(email);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-blue-600" />
            Confirmation d'envoi
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Vous êtes sur le point d'envoyer un accusé de réception à l'adresse email suivante :
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Label htmlFor="email-address">Adresse email</Label>
          <Input
            id="email-address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Confirmer l'envoi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmailConfirmationDialog;
