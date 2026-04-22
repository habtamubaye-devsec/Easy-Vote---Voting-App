import React, { useState } from 'react';

type DataPoint = {
  label: string;
  value: number;
  color: string;
};

type ResultChartProps = {
  data: DataPoint[];
};

const ResultChart: React.FC<ResultChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = data.reduce((acc, point) => acc + point.value, 0);
  let cumulativeAngle = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Chart Section */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-300 transform hover:scale-105">
        <svg viewBox="-1.1 -1.1 2.2 2.2" className="transform -rotate-90 drop-shadow-xl">
          {data.map((point, index) => {
            const startAngle = cumulativeAngle;
            const sliceAngle = point.value / total;
            cumulativeAngle += sliceAngle;

            const [startX, startY] = getCoordinatesForPercent(startAngle);
            const [endX, endY] = getCoordinatesForPercent(cumulativeAngle);

            const largeArcFlag = sliceAngle > 0.5 ? 1 : 0;
            const isHovered = hoveredIndex === index;

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`,
            ].join(' ');

            return (
              <path
                key={index}
                d={pathData}
                fill={point.color}
                className={`transition-all duration-300 cursor-pointer ${
                  isHovered ? 'opacity-100 scale-105' : 'opacity-90'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                   transformOrigin: 'center'
                }}
              />
            );
          })}
        </svg>
        
        {/* Center Donut Hole */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-36 h-36 bg-white rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center border-8 border-gray-50">
            {hoveredIndex !== null ? (
              <>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate max-w-[100px]">
                  {data[hoveredIndex].label}
                </span>
                <span className="text-2xl font-black text-gray-800">
                  {((data[hoveredIndex].value / total) * 100).toFixed(1)}%
                </span>
              </>
            ) : (
              <>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Winning Score</span>
                <span className="text-3xl font-black text-green-600">
                  {data.length > 0 ? ((data[0].value / total) * 100).toFixed(0) : 0}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((point, index) => (
          <div 
            key={index} 
            className={`flex items-center space-x-3 p-3 rounded-2xl border transition-all duration-200 ${
              hoveredIndex === index 
                ? 'bg-white border-green-200 shadow-md transform -translate-y-1' 
                : 'bg-gray-50 border-gray-100 shadow-sm'
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: point.color }}></div>
            <div className="flex-1 truncate text-sm font-bold text-gray-700">{point.label}</div>
            <div className={`text-sm font-black ${hoveredIndex === index ? 'text-green-600' : 'text-gray-400'}`}>
              {((point.value / total) * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultChart;
