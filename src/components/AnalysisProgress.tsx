
import React from 'react';

interface AnalysisProgressProps {
  progress: number;
  status: string;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress, status }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold text-foreground mb-4">Menganalisis Video</h3>
      
      <div className="mb-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-electric-green h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">{progress}% selesai</p>
      </div>
      
      <p className="text-foreground">{status}</p>
    </div>
  );
};

export default AnalysisProgress;
