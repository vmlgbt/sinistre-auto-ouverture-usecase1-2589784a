import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Star, Calendar, Phone, Clock, CheckCircle, RefreshCw, User, Home } from 'lucide-react';
import GarageMap from './GarageMap';

interface Garage {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
  availableSlots: { date: string; time: string }[];
}

const PartnerGarages: React.FC = () => {
  const [selectedGarage, setSelectedGarage] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Adresse du client
  const clientAddress = "15 Rue de la Paix, 78180 Montigny-le-Bretonneux";

  const [garages, setGarages] = useState<Garage[]>([
    {
      id: '1',
      name: 'Garage Dupont - Partenaire AXA',
      address: '15 Avenue des Champs, 75008 Paris',
      distance: '2,3 km',
      rating: 4.8,
      phone: '01 42 68 90 12',
      availableSlots: [
        { date: '2024-01-18', time: '09:00' },
        { date: '2024-01-18', time: '14:30' },
        { date: '2024-01-19', time: '10:15' }
      ]
    },
    {
      id: '2',
      name: 'Auto Service Premium AXA',
      address: '8 Rue de la République, 75011 Paris',
      distance: '3,1 km',
      rating: 4.6,
      phone: '01 48 05 77 23',
      availableSlots: [
        { date: '2024-01-17', time: '16:00' },
        { date: '2024-01-19', time: '08:30' },
        { date: '2024-01-20', time: '11:00' }
      ]
    },
    {
      id: '3',
      name: 'Carrosserie Express - AXA',
      address: '42 Boulevard Voltaire, 75020 Paris',
      distance: '5,7 km',
      rating: 4.4,
      phone: '01 43 67 12 88',
      availableSlots: [
        { date: '2024-01-16', time: '13:30' },
        { date: '2024-01-17', time: '15:00' },
        { date: '2024-01-18', time: '10:00' }
      ]
    }
  ]);

  const handleBookAppointment = () => {
    if (selectedGarage && selectedSlot) {
      console.log('Rendez-vous réservé:', { garage: selectedGarage, slot: selectedSlot });
      alert('Rendez-vous confirmé ! Vous recevrez un SMS de confirmation.');
    }
  };

  const handleRefreshGarages = async () => {
    if (!customAddress.trim()) return;
    
    setIsRefreshing(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      // Mise à jour simulée des garages avec nouvelles distances
      const updatedGarages = garages.map(garage => ({
        ...garage,
        distance: `${(Math.random() * 10 + 1).toFixed(1)} km`
      }));
      
      setGarages(updatedGarages);
      setIsRefreshing(false);
    }, 1500);
  };

  const handleGarageSelect = (garageId: string) => {
    setSelectedGarage(garageId);
    setSelectedSlot(null); // Reset slot selection when changing garage
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const currentAddress = useCustomAddress && customAddress ? customAddress : clientAddress;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Garages partenaires AXA à proximité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Adresse du client */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <User className="w-5 h-5 mr-2 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Adresse du client</h4>
              <p className="text-sm text-blue-700 mt-1">
                Marc Dubois - {clientAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Option d'adresse alternative */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="useCustomAddress"
              checked={useCustomAddress}
              onChange={(e) => setUseCustomAddress(e.target.checked)}
              className="mr-2"
            />
            <Label htmlFor="useCustomAddress" className="flex items-center cursor-pointer">
              <Home className="w-4 h-4 mr-2 text-gray-600" />
              Utiliser une autre adresse de récupération
            </Label>
          </div>
          
          {useCustomAddress && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="customAddress" className="text-sm font-medium">
                  Adresse de récupération du véhicule
                </Label>
                <Input
                  id="customAddress"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  placeholder="Saisir l'adresse complète..."
                  className="mt-1"
                />
              </div>
              <Button
                onClick={handleRefreshGarages}
                disabled={!customAddress.trim() || isRefreshing}
                className="w-full"
                variant="outline"
              >
                {isRefreshing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Recherche en cours...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Rafraîchir les garages
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Affichage de l'adresse utilisée pour la recherche */}
        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          Garages recherchés depuis : <span className="font-medium ml-1">{currentAddress}</span>
        </div>

        {/* Carte des garages */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Localisation des garages</h4>
          <GarageMap 
            garages={garages}
            selectedGarage={selectedGarage}
            onGarageSelect={handleGarageSelect}
            centerAddress={currentAddress}
          />
        </div>

        {/* Liste des garages */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Liste des garages disponibles</h4>
          <div className="space-y-4">
            {garages.map((garage) => (
              <div key={garage.id} className={`border rounded-lg p-4 transition-all cursor-pointer ${
                selectedGarage === garage.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`} onClick={() => handleGarageSelect(garage.id)}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{garage.name}</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {garage.address} • {garage.distance}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{garage.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-1" />
                    {garage.phone}
                  </div>

                  {/* Disponibilités toujours affichées */}
                  <div className="border-t pt-4 mt-4">
                    <h5 className="font-medium mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Créneaux disponibles
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {garage.availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSlot(slot);
                            setSelectedGarage(garage.id);
                          }}
                          className={`p-3 rounded border text-sm transition-all ${
                            selectedSlot?.date === slot.date && selectedSlot?.time === slot.time && selectedGarage === garage.id
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="font-medium">{formatDate(slot.date)}</div>
                          <div className="flex items-center justify-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {slot.time}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedGarage && selectedSlot && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">
                  Rendez-vous sélectionné pour le {formatDate(selectedSlot.date)} à {selectedSlot.time}
                </span>
              </div>
              <Button onClick={handleBookAppointment} className="bg-green-600 hover:bg-green-700">
                Confirmer le rendez-vous
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartnerGarages;
