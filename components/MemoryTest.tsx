
import React, { useState } from 'react';
import { TrialData } from '../types';

interface MemoryTestProps {
  trials: TrialData[];
  onComplete: (updatedTrials: TrialData[]) => void;
}

const MemoryTest: React.FC<MemoryTestProps> = ({ trials, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [localTrials, setLocalTrials] = useState<TrialData[]>([...trials]);

  const currentPair = localTrials[currentIndex];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = inputValue.trim();
    const isCorrect = response === currentPair.word2; // Hebrew doesn't have cases, simple match.
    
    const updatedTrials = [...localTrials];
    updatedTrials[currentIndex] = {
      ...updatedTrials[currentIndex],
      response: response,
      accuracy: isCorrect ? 100 : 0
    };

    setLocalTrials(updatedTrials);

    if (currentIndex < trials.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
    } else {
      onComplete(updatedTrials);
    }
  };

  return (
    <div className="space-y-12 py-8 text-center animate-fadeIn">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">מבחן זיכרון</h2>
        <p className="text-gray-500">כתבו את המילה המשלימה עבור המילה המוצגת.</p>
        <div className="text-sm font-medium text-gray-400">
          מבחן {currentIndex + 1} מתוך {trials.length}
        </div>
      </div>

      <form onSubmit={handleNext} className="max-w-md mx-auto space-y-12">
        <div className="flex flex-col items-center gap-4">
          <div className="text-gray-400 uppercase tracking-widest text-sm font-semibold">רמז:</div>
          <div className="text-6xl font-bold text-blue-600">
            {currentPair.word1}
          </div>
          <div className="text-gray-300 text-4xl">&mdash;</div>
        </div>

        <div className="space-y-6">
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full text-center text-3xl font-bold py-4 border-b-4 border-gray-200 focus:border-blue-500 outline-none transition-colors"
            placeholder="כתבו כאן..."
          />
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all active:scale-95"
          >
            {currentIndex === trials.length - 1 ? 'סיום מבחן' : 'למילה הבאה'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemoryTest;
