
import React, { useState, useEffect } from 'react';
import { TrialData } from '../types';
import { LEARNING_DURATION_MS } from '../constants';

interface LearningPhaseProps {
  trials: TrialData[];
  onComplete: (updatedTrials: TrialData[]) => void;
}

const LearningPhase: React.FC<LearningPhaseProps> = ({ trials, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [confidence, setConfidence] = useState(50);
  const [sliderMoved, setSliderMoved] = useState(false);
  const [localTrials, setLocalTrials] = useState<TrialData[]>([...trials]);

  const currentPair = localTrials[currentIndex];

  useEffect(() => {
    setShowRating(false);
    setSliderMoved(false);
    setConfidence(50);
    
    const timer = setTimeout(() => {
      setShowRating(true);
    }, LEARNING_DURATION_MS);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleNext = () => {
    const updatedTrials = [...localTrials];
    updatedTrials[currentIndex] = {
      ...updatedTrials[currentIndex],
      confidence: confidence
    };
    
    setLocalTrials(updatedTrials);

    if (currentIndex < trials.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(updatedTrials);
    }
  };

  return (
    <div className="space-y-12 py-8 flex flex-col items-center">
      <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">
        זוג {currentIndex + 1} מתוך {trials.length}
      </div>

      <div className="text-center h-24 flex flex-col justify-center">
        <h2 className="text-5xl font-bold text-gray-800 transition-all duration-300">
          {currentPair.word1} &mdash; {currentPair.word2}
        </h2>
      </div>

      <div className={`w-full max-w-md space-y-8 transition-all duration-500 transform ${showRating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="space-y-4">
          <label className="block text-center text-xl font-medium text-gray-700">
            דרגו את הסיכוי שלכם לזכור את צמד המילים:
          </label>
          
          {/* Forced LTR for the slider area so 0 is on the left and 100 is on the right */}
          <div className="relative pt-10 pb-6" dir="ltr">
             <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span dir="rtl">0% (כלל לא)</span>
              <span dir="rtl">100% (בטוח)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={confidence}
              onChange={(e) => {
                setConfidence(parseInt(e.target.value));
                setSliderMoved(true);
              }}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-center mt-4" dir="rtl">
              <span className="text-3xl font-bold text-blue-600">{confidence}%</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!sliderMoved}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            sliderMoved 
              ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentIndex === trials.length - 1 ? 'סיום למידה' : 'לצמד הבא'}
        </button>
      </div>
    </div>
  );
};

export default LearningPhase;
