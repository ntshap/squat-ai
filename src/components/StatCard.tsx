
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  unit?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit }) => {
  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-dashboard-yellow/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-dashboard-yellow/20 group relative overflow-hidden shadow-sm">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dashboard-yellow/8 via-transparent to-dashboard-yellow/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mb-2">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <TrendingUp className="w-3 h-3 text-dashboard-yellow ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="relative">
          <p className="text-3xl font-bold text-dashboard-yellow group-hover:scale-110 transition-transform duration-300 relative">
            {value}
            {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
          </p>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-dashboard-yellow/15 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Sparkle effect */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-dashboard-yellow rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-dashboard-yellow/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default StatCard;
