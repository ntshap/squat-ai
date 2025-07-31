
import React from 'react';

interface NavigationProps {
  activeTab: 'live' | 'upload';
  onTabChange: (tab: 'live' | 'upload') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-card border-b border-border px-6 shadow-sm">
      <div className="flex space-x-8">
        <button
          onClick={() => onTabChange('live')}
          className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === 'live'
              ? 'border-electric-green text-electric-green font-semibold'
              : 'border-transparent text-slate-600 dark:text-muted-foreground hover:text-slate-800 dark:hover:text-foreground hover:border-gray-400'
          }`}
        >
          Analisis Langsung
        </button>
        <button
          onClick={() => onTabChange('upload')}
          className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === 'upload'
              ? 'border-electric-green text-electric-green font-semibold'
              : 'border-transparent text-slate-600 dark:text-muted-foreground hover:text-slate-800 dark:hover:text-foreground hover:border-gray-400'
          }`}
        >
          Unggah Video
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
