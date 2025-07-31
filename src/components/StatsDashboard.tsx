
import React from 'react';
import StatCard from './StatCard';

interface StatsDashboardProps {
  correctSquats: number;
  incorrectSquats: number;
  caloriesBurned: number;
  movementEfficiency: number;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({
  correctSquats,
  incorrectSquats,
  caloriesBurned,
  movementEfficiency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Squat Benar" value={correctSquats} />
      <StatCard label="Squat Salah" value={incorrectSquats} />
      <StatCard label="Kalori Terbakar" value={caloriesBurned.toFixed(1)} />
      <StatCard label="Efisiensi Gerakan" value={`${movementEfficiency}%`} />
    </div>
  );
};

export default StatsDashboard;
