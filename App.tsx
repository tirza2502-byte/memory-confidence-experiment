
import React, { useState, useCallback } from 'react';
import { ExperimentPhase, TrialData } from './types';
import { WORD_PAIRS, VERBAL_PROBLEMS } from './constants';
import StartScreen from './components/StartScreen';
import LearningPhase from './components/LearningPhase';
import DistractionTask from './components/DistractionTask';
import MemoryTest from './components/MemoryTest';
import ResultsScreen from './components/ResultsScreen';

const App: React.FC = () => {
  const [phase, setPhase] = useState<ExperimentPhase>(ExperimentPhase.START);
  const [trials, setTrials] = useState<TrialData[]>(
    WORD_PAIRS.map(pair => ({ ...pair }))
  );

  const handleStart = () => {
    setPhase(ExperimentPhase.LEARNING);
  };

  const handleLearningComplete = (updatedTrials: TrialData[]) => {
    setTrials(updatedTrials);
    setPhase(ExperimentPhase.DISTRACTION);
  };

  const handleDistractionComplete = () => {
    setPhase(ExperimentPhase.TEST);
  };

  const handleTestComplete = (finalTrials: TrialData[]) => {
    setTrials(finalTrials);
    setPhase(ExperimentPhase.RESULTS);
  };

  const handleRestart = () => {
    setTrials(WORD_PAIRS.map(pair => ({ ...pair })));
    setPhase(ExperimentPhase.START);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12">
        {phase === ExperimentPhase.START && (
          <StartScreen onStart={handleStart} />
        )}
        
        {phase === ExperimentPhase.LEARNING && (
          <LearningPhase 
            trials={trials} 
            onComplete={handleLearningComplete} 
          />
        )}
        
        {phase === ExperimentPhase.DISTRACTION && (
          <DistractionTask 
            problems={VERBAL_PROBLEMS} 
            onComplete={handleDistractionComplete} 
          />
        )}
        
        {phase === ExperimentPhase.TEST && (
          <MemoryTest 
            trials={trials} 
            onComplete={handleTestComplete} 
          />
        )}
        
        {phase === ExperimentPhase.RESULTS && (
          <ResultsScreen 
            trials={trials} 
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};

export default App;
