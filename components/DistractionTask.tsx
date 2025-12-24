
import React, { useState } from 'react';
import { VerbalProblem } from '../types';

interface DistractionTaskProps {
  problems: VerbalProblem[];
  onComplete: () => void;
}

const DistractionTask: React.FC<DistractionTaskProps> = ({ problems, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      onComplete();
    }
  };

  const currentProblem = problems[currentIndex];

  return (
    <div className="space-y-12 py-8 text-center animate-fadeIn">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">משימה מילולית</h2>
        <p className="text-gray-500">בחרו את המילה היוצאת דופן מתוך 4 המילים הבאות.</p>
        <div className="text-sm font-medium text-gray-400">
          משימה {currentIndex + 1} מתוך {problems.length}
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {currentProblem.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`py-6 px-4 rounded-xl border-2 transition-all text-2xl font-bold ${
                selectedOption === option
                  ? 'border-blue-500 bg-blue-50 text-blue-700 scale-105'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            selectedOption 
              ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentIndex === problems.length - 1 ? 'סיום' : 'למשימה הבאה'}
        </button>
      </div>
    </div>
  );
};

export default DistractionTask;
