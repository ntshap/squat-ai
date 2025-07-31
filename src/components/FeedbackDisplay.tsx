
import React from 'react';
import { MessageCircle, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

interface FeedbackDisplayProps {
  feedback: string;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  const isPositive = feedback.includes('Good') || feedback.includes('Excellent') || feedback.includes('Perfect');
  const isWarning = feedback.includes('Slow') || feedback.includes('Focus') || feedback.includes('Remember');

  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-dashboard-yellow/5 via-transparent to-dashboard-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="p-2 rounded-xl bg-dashboard-yellow/10 group-hover:bg-dashboard-yellow/20 transition-colors duration-300 relative">
          <MessageCircle className="w-5 h-5 text-dashboard-yellow" />
          <div className="absolute inset-0 bg-dashboard-yellow/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-dashboard-yellow transition-colors duration-300">
          Umpan Balik Waktu Nyata
        </h3>
        <Zap className="w-4 h-4 text-dashboard-yellow animate-pulse" />
        
        {/* Status indicator */}
        {isPositive && <CheckCircle className="w-4 h-4 text-green-600 animate-pulse" />}
        {isWarning && <AlertTriangle className="w-4 h-4 text-orange-500 animate-pulse" />}
      </div>
      
      <div className="bg-muted/70 border-2 border-dashboard-yellow/20 rounded-xl p-6 min-h-[100px] flex items-center relative overflow-hidden group-hover:border-dashboard-yellow/30 transition-colors duration-300">
        {/* Feedback text with typing effect styling */}
        <p className="text-foreground leading-relaxed font-medium relative z-10 group-hover:text-dashboard-yellow/90 transition-colors duration-300">
          {feedback}
        </p>
        
        {/* Animated cursor */}
        <div className="w-0.5 h-5 bg-dashboard-yellow ml-2 animate-pulse"></div>
        
        {/* Subtle wave animation */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dashboard-yellow/30 to-transparent animate-pulse"></div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-dashboard-yellow/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-dashboard-yellow/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default FeedbackDisplay;
