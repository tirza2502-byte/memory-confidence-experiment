
import React from 'react';
import { TrialData } from '../types';

interface ResultsScreenProps {
  trials: TrialData[];
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ trials, onRestart }) => {
  const averageConfidence = trials.reduce((acc, t) => acc + (t.confidence || 0), 0) / trials.length;
  const averageAccuracy = trials.reduce((acc, t) => acc + (t.accuracy || 0), 0) / trials.length;

  const downloadAsCSV = () => {
    // Column headers
    const headers = ['מילה ראשונה', 'תשובה נכונה', 'התשובה שלך', 'ביטחון', 'דיוק'];
    
    // Create rows
    const rows = trials.map(trial => [
      trial.word1,
      trial.word2,
      trial.response || '',
      `${trial.confidence}%`,
      trial.accuracy?.toString() || '0'
    ]);

    // Join headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Add BOM for UTF-8 (essential for Hebrew in Excel)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `תוצאות_ניסוי_זיכרון_${new Date().toLocaleDateString('he-IL')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">התוצאות שלך</h1>
        <div className="flex justify-center gap-12">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600">{averageAccuracy.toFixed(0)}%</div>
            <div className="text-xs font-semibold text-gray-400 uppercase">דיוק ממוצע</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-purple-600">{averageConfidence.toFixed(0)}%</div>
            <div className="text-xs font-semibold text-gray-400 uppercase">ביטחון ממוצע</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
              <th className="px-6 py-4 border-b">מילה ראשונה</th>
              <th className="px-6 py-4 border-b">תשובה נכונה</th>
              <th className="px-6 py-4 border-b">התשובה שלך</th>
              <th className="px-6 py-4 border-b">ביטחון</th>
              <th className="px-6 py-4 border-b text-center">דיוק</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trials.map((trial, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{trial.word1}</td>
                <td className="px-6 py-4 text-gray-600">{trial.word2}</td>
                <td className="px-6 py-4 text-gray-800">
                  {trial.response || <span className="text-gray-300 italic">ללא תשובה</span>}
                </td>
                <td className="px-6 py-4 text-gray-600">{trial.confidence}%</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    trial.accuracy === 100 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {trial.accuracy}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={downloadAsCSV}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          הורדה לאקסל
        </button>
        <button
          onClick={onRestart}
          className="px-8 py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-xl transition-all"
        >
          התחל ניסוי מחדש
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
