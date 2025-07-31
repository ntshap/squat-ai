
import React from 'react';
import { Camera, Zap, Target } from 'lucide-react';

interface LiveVideoDisplayProps {
  isActive: boolean;
}

const LiveVideoDisplay: React.FC<LiveVideoDisplayProps> = ({ isActive }) => {
  return (
    <div className="bg-card border-2 border-border rounded-2xl mb-6 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      <div className="aspect-video flex items-center justify-center bg-muted/30 relative overflow-hidden">
        {isActive ? (
          <div className="text-center relative z-10">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-dashboard-yellow to-dashboard-yellow/70 rounded-full flex items-center justify-center animate-pulse mx-auto shadow-lg shadow-dashboard-yellow/30 relative">
                <Camera className="w-10 h-10 text-black" />
                
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full border-2 border-dashboard-yellow/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-2 border-dashboard-yellow/20 animate-ping" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
            
            <p className="text-xl font-semibold text-foreground mb-2">Kamera aktif</p>
            <p className="text-sm text-muted-foreground mb-4">Menganalisis postur squat Anda...</p>
            
            {/* Analysis indicators */}
            <div className="flex justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-1 text-dashboard-yellow">
                <Target className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-medium">Melacak</span>
              </div>
              <div className="flex items-center space-x-1 text-dashboard-yellow">
                <Zap className="w-4 h-4 animate-bounce" />
                <span className="text-xs font-medium">Menganalisis</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-dashboard-yellow rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
            
            {/* Scanning line effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dashboard-yellow to-transparent animate-pulse"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dashboard-yellow to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        ) : (
          <div className="text-center relative z-10">
            <div className="w-20 h-20 bg-muted border-2 border-dashed border-muted-foreground/50 rounded-full flex items-center justify-center mb-6 mx-auto hover:border-dashboard-yellow/50 transition-colors duration-300 group">
              <Camera className="w-10 h-10 text-muted-foreground group-hover:text-dashboard-yellow transition-colors duration-300" />
            </div>
            <p className="text-xl font-medium text-foreground mb-2">Kamera tidak aktif</p>
            <p className="text-sm text-muted-foreground">Klik "Mulai Kamera" untuk memulai analisis</p>
          </div>
        )}
        
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-dashboard-yellow/5 to-transparent"></div>
        <div className="absolute top-4 right-4 w-3 h-3 bg-dashboard-yellow/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-2 h-2 bg-dashboard-yellow/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-4 w-1 h-1 bg-dashboard-yellow/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-6 left-1/3 w-1.5 h-1.5 bg-dashboard-yellow/25 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Grid overlay for tech feel */}
        {isActive && (
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-8 h-full gap-px">
              {[...Array(96)].map((_, i) => (
                <div key={i} className="border border-dashboard-yellow/20"></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveVideoDisplay;
