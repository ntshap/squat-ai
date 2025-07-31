
import React from 'react';
import { Play, Square, Settings, Activity, Sliders } from 'lucide-react';

interface ControlPanelProps {
  isActive: boolean;
  onToggleCamera: () => void;
  weight: number;
  onWeightChange: (weight: number) => void;
  mode: 'Beginner' | 'Pro';
  onModeChange: (mode: 'Beginner' | 'Pro') => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isActive,
  onToggleCamera,
  weight,
  onWeightChange,
  mode,
  onModeChange,
}) => {
  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dashboard-yellow/5 via-transparent to-dashboard-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 rounded-xl bg-dashboard-yellow/10 group-hover:bg-dashboard-yellow/20 transition-colors duration-300 relative">
          <Settings className="w-5 h-5 text-dashboard-yellow" />
          <div className="absolute inset-0 bg-dashboard-yellow/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-dashboard-yellow transition-colors duration-300">Kontrol</h3>
        <Activity className="w-4 h-4 text-dashboard-yellow animate-pulse ml-auto" />
      </div>
      
      {/* Start/Stop Camera Button */}
      <div className="relative z-10">
        <button
          onClick={onToggleCamera}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden ${
            isActive
              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/25 border-2 border-red-700'
              : 'bg-gradient-to-r from-dashboard-yellow to-dashboard-yellow/90 hover:from-dashboard-yellow/90 hover:to-dashboard-yellow text-black shadow-lg shadow-dashboard-yellow/25 border-2 border-dashboard-yellow'
          } hover:scale-105 hover:shadow-xl`}
        >
          {/* Button shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {isActive ? (
            <>
              <Square className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Hentikan Kamera</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Mulai Kamera</span>
            </>
          )}
        </button>
      </div>

      {/* Weight Slider */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-dashboard-yellow" />
          <label className="text-sm font-semibold text-foreground flex items-center justify-between flex-1">
            <span>Berat Pengguna</span>
            <span className="text-dashboard-yellow font-bold px-2 py-1 rounded-lg bg-dashboard-yellow/10 animate-pulse">
              {weight} kg
            </span>
          </label>
        </div>
        <div className="relative">
          <input
            type="range"
            min="30"
            max="150"
            value={weight}
            onChange={(e) => onWeightChange(Number(e.target.value))}
            className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider relative z-10 hover:scale-105 transition-transform duration-200"
            style={{
              background: `linear-gradient(to right, #CCFF00 0%, #CCFF00 ${((weight - 30) / 120) * 100}%, #e5e7eb ${((weight - 30) / 120) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span className="bg-muted px-2 py-1 rounded border border-border">30 kg</span>
            <span className="bg-muted px-2 py-1 rounded border border-border">150 kg</span>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-dashboard-yellow animate-pulse" />
          <label className="text-sm font-semibold text-foreground">Mode Latihan</label>
        </div>
        <div className="flex rounded-xl bg-muted p-1 border-2 border-border relative overflow-hidden">
          <button
            onClick={() => onModeChange('Beginner')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
              mode === 'Beginner'
                ? 'bg-gradient-to-r from-dashboard-yellow to-dashboard-yellow/90 text-black shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            {mode === 'Beginner' && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full animate-pulse"></div>
            )}
            <span className="relative z-10">Pemula</span>
          </button>
          <button
            onClick={() => onModeChange('Pro')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
              mode === 'Pro'
                ? 'bg-gradient-to-r from-dashboard-yellow to-dashboard-yellow/90 text-black shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            {mode === 'Pro' && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full animate-pulse"></div>
            )}
            <span className="relative z-10">Pro</span>
          </button>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground relative z-10">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-600 animate-pulse' : 'bg-gray-400'}`}></div>
        <span className="font-medium">{isActive ? 'Sistem Aktif' : 'Sistem Siaga'}</span>
      </div>
    </div>
  );
};

export default ControlPanel;
