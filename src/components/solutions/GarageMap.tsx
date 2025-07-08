
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Garage {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
  availableSlots: { date: string; time: string }[];
}

interface GarageMapProps {
  garages: Garage[];
  selectedGarage: string | null;
  onGarageSelect: (garageId: string) => void;
  centerAddress: string;
}

const GarageMap: React.FC<GarageMapProps> = ({ 
  garages, 
  selectedGarage, 
  onGarageSelect, 
  centerAddress 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Fonction pour géocoder une adresse (simulation)
  const geocodeAddress = (address: string): [number, number] => {
    // Simulation de géocodage - en production, utilisez l'API Mapbox Geocoding
    const addresses: { [key: string]: [number, number] } = {
      "15 Rue de la Paix, 78180 Montigny-le-Bretonneux": [2.0372, 48.7589],
      "15 Avenue des Champs, 75008 Paris": [2.3069, 48.8712],
      "8 Rue de la République, 75011 Paris": [2.3708, 48.8566],
      "42 Boulevard Voltaire, 75020 Paris": [2.3915, 48.8566]
    };
    
    return addresses[address] || [2.3522, 48.8566]; // Défaut : centre de Paris
  };

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainer.current) return;

    // Note: Remplacez par votre token Mapbox réel
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';
    
    const centerCoords = geocodeAddress(centerAddress);
    
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: centerCoords,
        zoom: 12
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Mettre à jour le centre de la carte quand l'adresse change
  useEffect(() => {
    if (map.current) {
      const centerCoords = geocodeAddress(centerAddress);
      map.current.flyTo({
        center: centerCoords,
        zoom: 12,
        duration: 1000
      });
    }
  }, [centerAddress]);

  // Mettre à jour les marqueurs des garages
  useEffect(() => {
    if (!map.current) return;

    // Supprimer les anciens marqueurs
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Ajouter le marqueur de l'adresse de référence
    const centerCoords = geocodeAddress(centerAddress);
    const centerMarker = new mapboxgl.Marker({ color: '#3B82F6' })
      .setLngLat(centerCoords)
      .setPopup(new mapboxgl.Popup().setHTML(`
        <div class="p-2">
          <strong>Adresse de référence</strong><br/>
          ${centerAddress}
        </div>
      `))
      .addTo(map.current);
    
    markers.current.push(centerMarker);

    // Ajouter les marqueurs des garages
    garages.forEach(garage => {
      const coords = geocodeAddress(garage.address);
      
      // Créer un élément HTML personnalisé pour le marqueur
      const el = document.createElement('div');
      el.className = `w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
        selectedGarage === garage.id 
          ? 'bg-green-500 border-green-600 shadow-lg scale-110' 
          : 'bg-red-500 border-red-600 hover:scale-105'
      }`;
      el.innerHTML = `
        <div class="w-full h-full rounded-full flex items-center justify-center">
          <div class="w-3 h-3 bg-white rounded-full"></div>
        </div>
      `;

      el.addEventListener('click', () => {
        onGarageSelect(garage.id);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-3 max-w-xs">
            <h4 class="font-semibold text-sm mb-1">${garage.name}</h4>
            <p class="text-xs text-gray-600 mb-2">${garage.address}</p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-500">${garage.distance}</span>
              <span class="flex items-center">
                <span class="text-yellow-500">★</span>
                <span class="ml-1">${garage.rating}</span>
              </span>
            </div>
          </div>
        `))
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Ajuster la vue pour inclure tous les marqueurs
    if (markers.current.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      
      // Ajouter l'adresse de référence
      bounds.extend(centerCoords);
      
      // Ajouter tous les garages
      garages.forEach(garage => {
        bounds.extend(geocodeAddress(garage.address));
      });

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 14
      });
    }
  }, [garages, selectedGarage, centerAddress, onGarageSelect]);

  return (
    <div className="relative">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-orange-700">
          <strong>Note :</strong> Pour utiliser la carte, vous devez configurer votre token Mapbox dans les paramètres du projet.
        </p>
      </div>
      <div 
        ref={mapContainer} 
        className="w-full h-96 rounded-lg border border-gray-200"
        style={{ minHeight: '400px' }}
      />
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>Adresse de référence</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span>Garages disponibles</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Garage sélectionné</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageMap;
