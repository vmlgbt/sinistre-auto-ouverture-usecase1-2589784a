
import React from 'react';
import { Sparkle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  activeTab: 'contexte' | 'declaration';
  onTabChange: (tab: 'contexte' | 'declaration') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo AXA */}
          <div className="flex items-center">
            <div className="bg-axa-blue text-white px-4 py-2 rounded-lg font-bold text-lg">
              AXA
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-900">Solaris</h1>
              <p className="text-sm text-gray-500">Gestion des sinistres Auto</p>
            </div>
          </div>

          {/* User info */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Conseiller AXA</p>
              <p className="text-xs text-gray-500">Service Sinistres</p>
            </div>
            <div className="w-8 h-8 bg-axa-blue rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation secondaire */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-2">
            <button
              onClick={() => onTabChange('contexte')}
              className={cn(
                'px-4 py-2 rounded-md font-medium text-sm transition-all duration-200',
                activeTab === 'contexte'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              )}
            >
              Contexte client
            </button>
            <button
              onClick={() => onTabChange('declaration')}
              className={cn(
                'px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center space-x-2',
                activeTab === 'declaration'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              )}
            >
              <Sparkle className="w-4 h-4" />
              <span>Déclaration</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
