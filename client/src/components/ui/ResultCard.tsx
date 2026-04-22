import React from 'react';
import { Results } from 'shared/poll-types';
import ResultChart from './ResultChart';

type ResultCardProps = {
  results: DeepReadonly<Results>;
};

const COLORS = [
  '#10B981', // Emerald 500
  '#3B82F6', // Blue 500
  '#F59E0B', // Amber 500
  '#EF4444', // Red 500
  '#8B5CF6', // Violet 500
  '#EC4899', // Pink 500
  '#06B6D4', // Cyan 500
  '#F97316', // Orange 500
];

const ResultCard: React.FC<ResultCardProps> = ({ results }) => {
  const chartData = results.map((result, index) => ({
    label: result.nominationText.charAt(0).toUpperCase() + result.nominationText.slice(1),
    value: result.score,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-full py-4">
      <ResultChart data={chartData} />
      
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-100 pb-2">Detailed Scores</h2>
        <div className="divide-y divide-gray-100">
          {results.map((result, index) => (
            <div
              key={result.nominationID}
              className="flex justify-between items-center py-3"
            >
              <div className="flex items-center">
                <div 
                   className="w-2 h-2 rounded-full mr-3" 
                   style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="font-medium text-gray-700 capitalize">{result.nominationText}</span>
              </div>
              <div className="font-bold text-gray-900">
                {result.score.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
