import React from 'react';

type RankedCheckBoxProps = {
  rank?: number;
  value: string;
  onSelect: () => void;
};

const RankedCheckBox: React.FC<RankedCheckBoxProps> = ({
  value,
  rank,
  onSelect,
}) => (
  <div 
    className={`my-4 box relative cursor-pointer transition-all duration-200 ${
      rank 
        ? 'bg-green-50 border-green-600 ring-2 ring-green-600 ring-opacity-20 shadow-lg translate-x-1' 
        : 'bg-white border-gray-200 text-gray-800 hover:border-green-300'
    }`} 
    onClick={() => onSelect()}
  >
    <div className={`font-semibold ${rank ? 'text-green-900' : 'text-gray-700'}`}>
      {value}
    </div>
    {rank && (
      <div className="absolute w-8 h-8 -top-4 -right-4 rounded-full bg-green-600 shadow-md border-2 border-white flex items-center justify-center">
        <span className="text-center font-black text-white text-sm">{rank}</span>
      </div>
    )}
  </div>
);

export default RankedCheckBox;
