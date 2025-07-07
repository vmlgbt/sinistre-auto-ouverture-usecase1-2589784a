
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Calendar, Phone, Clock, CheckCircle } from 'lucide-react';

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

  const garages: Garage[] = [
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
  ];

  const handleBookAppointment = () => {
    if (selectedGarage && selectedSlot) {
      console.log('Rendez-vous réservé:', { garage: selectedGarage, slot: selectedSlot });
      alert('Rendez-vous confirmé ! Vous recevrez un SMS de confirmation.');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Garages partenaires AXA à proximité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {garages.map((garage) => (
          <div key={garage.id} className={`border rounded-lg p-4 transition-all cursor-pointer ${
            selectedGarage === garage.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`} onClick={() => setSelectedGarage(garage.id)}>
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
