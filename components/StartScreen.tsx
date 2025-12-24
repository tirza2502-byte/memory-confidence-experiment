
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center space-y-8 animate-fadeIn">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          ניסוי זיכרון
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
          ברוכים הבאים למעבדה לפסיכולוגיה קוגניטיבית. ניסוי זה מודד את היכולת שלכם לזכור צמדי מילים ואת המודעות שלכם לביצועי הזיכרון שלכם.
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl text-right space-y-3 border border-blue-100">
        <h2 className="font-semibold text-blue-900 text-lg">למה לצפות:</h2>
        <ul className="space-y-2 text-blue-800 list-disc list-inside">
          <li>למדו 8 צמדי מילים במשך 3 שניות כל אחד.</li>
          <li>דרגו את הסיכוי שלכם לזכור את צמד המילים.</li>
          <li>בצעו משימה מילולית כדי לנקות את זיכרון העבודה.</li>
          <li>שחזרו את המילים החסרות במבחן הסופי.</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full md:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 text-lg"
      >
        התחל ניסוי
      </button>
    </div>
  );
};

export default StartScreen;
