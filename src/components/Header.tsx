
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-card/95 backdrop-blur-xl border-b border-border px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
          <div className="p-3 rounded-2xl bg-dashboard-yellow/15 group-hover:bg-dashboard-yellow/25 transition-colors duration-300 border border-dashboard-yellow/20">
            <Activity className="w-6 h-6 text-dashboard-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-foreground group-hover:text-dashboard-yellow transition-colors duration-300">
            SquatSense AI
          </h1>
        </Link>
        <div className="flex items-center space-x-6">
          <span className="text-sm text-slate-600 dark:text-muted-foreground font-medium">
            {document.documentElement.classList.contains('dark') ? 'Mode Gelap' : 'Mode Terang'}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
