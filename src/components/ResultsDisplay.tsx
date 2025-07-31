
import React from 'react';
import { Download } from 'lucide-react';

interface ResultsDisplayProps {
  results: {
    totalCorrectSquats: number;
    totalIncorrectSquats: number;
    accuracy: number;
    caloriesBurned: number;
  };
  onDownload: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onDownload }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Hasil Analisis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-electric-green">{results.totalCorrectSquats}</p>
          <p className="text-sm text-muted-foreground">Squat Benar</p>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-red-500">{results.totalIncorrectSquats}</p>
          <p className="text-sm text-muted-foreground">Squat Salah</p>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-electric-green">{results.accuracy}%</p>
          <p className="text-sm text-muted-foreground">Akurasi</p>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-electric-green">{results.caloriesBurned.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">Kalori Terbakar</p>
        </div>
      </div>
      
      <button
        onClick={onDownload}
        className="w-full bg-electric-green hover:bg-electric-green/90 text-background py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Download className="w-4 h-4" />
        <span>Unduh Video Hasil Analisis</span>
      </button>
    </div>
  );
};

export default ResultsDisplay;
