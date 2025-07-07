
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-6 flex-shrink-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm text-gray-500">
          © 2024 AXA France. Tous droits réservés.
        </div>
        <div className="text-sm text-gray-500">
          Version 2.1.4
        </div>
      </div>
    </footer>
  );
};

export default Footer;
