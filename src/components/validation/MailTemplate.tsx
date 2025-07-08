
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, Printer, Sparkle, Edit } from 'lucide-react';

const MailTemplate: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailContent, setEmailContent] = useState(`Objet : Déclaration d'accident de parking - N° de sinistre :170492218073

Madame, Monsieur Dubois,

Nous accusons réception de votre déclaration de sinistre concernant les dommages constatés sur votre véhicule Peugeot 308 immatriculé AB-123-CD.

DÉTAILS DU SINISTRE :
- Date de découverte : Ce jour vers 10h30
- Lieu : Parking du centre commercial Carrefour à Montigny-le-Bretonneux (78300)
- Nature des dommages : Rétroviseur droit cassé et rayure sur l'aile avant droite
- Estimation des réparations : 800 €

GARANTIE ACTIVÉE :
Votre sinistre entre dans le cadre de la garantie "Dommages Tous Accidents" de votre contrat. 
Franchise applicable : 150 €

PROCHAINES ÉTAPES :
Afin de poursuivre le traitement de votre dossier, nous avons besoin des documents suivants :
- Constat amiable (si disponible)
- Copie de votre permis de conduire
- Copie de la carte grise du véhicule
- RIB pour l'indemnisation

Un expert se rendra disponible pour évaluer les dommages. Nous vous contacterons dans les 48h pour convenir d'un rendez-vous.

En cas de questions, n'hésitez pas à nous contacter au 01.XX.XX.XX.XX ou par email.

Cordialement,
Service Sinistres AXA
Gestionnaire : Marie Dupont`);

  const handleSendEmail = () => {
    console.log('Envoi par email');
    // Logique d'envoi email
  };

  const handleSendMail = () => {
    console.log('Envoi par courrier');
    // Logique d'envoi courrier
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-blue-600" />
            Modèle de courrier
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="flex items-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            {isEditing ? 'Aperçu' : 'Éditer'}
          </Button>
        </CardTitle>
        <div className="flex items-center text-sm text-purple-600 bg-purple-50 border border-purple-200 rounded-lg p-2">
          <Sparkle className="w-4 h-4 mr-2" />
          Modèle généré par l'IA d'après les informations saisies
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <Textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[400px] text-sm font-mono"
            placeholder="Contenu du courrier..."
          />
        ) : (
          <div className="bg-gray-50 border rounded-lg p-4 max-h-[400px] overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap text-gray-800 font-sans">
              {emailContent}
            </pre>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button onClick={handleSendEmail} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Envoyer par email
          </Button>
          <Button variant="outline" onClick={handleSendMail} className="w-full">
            <Printer className="w-4 h-4 mr-2" />
            Envoyer par courrier
          </Button>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 border rounded p-2">
          <p className="font-medium mb-1">Informations d'envoi :</p>
          <p>• L'email sera envoyé à l'adresse du contrat</p>
          <p>• Le courrier sera envoyé à l'adresse de correspondance</p>
          <p>• Une copie sera archivée dans le dossier</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MailTemplate;
