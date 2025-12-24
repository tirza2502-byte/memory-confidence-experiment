
import { WordPair, VerbalProblem } from './types';

export const WORD_PAIRS: WordPair[] = [
  { word1: 'חתול', word2: 'כלב' },
  { word1: 'ציפור', word2: 'מחשב' },
  { word1: 'גרב', word2: 'נעל' },
  { word1: 'אנייה', word2: 'כלנית' },
  { word1: 'ענן', word2: 'שמיים' },
  { word1: 'מפית', word2: 'דלי' },
  { word1: 'ביצה', word2: 'תרנגולת' },
  { word1: 'כסא', word2: 'אריה' }
];

export const VERBAL_PROBLEMS: VerbalProblem[] = [
  { options: ['כלב', 'חתול', 'אריה', 'שולחן'], correctAnswer: 'שולחן' },
  { options: ['תפוח', 'בננה', 'מלפפון', 'דובדבן'], correctAnswer: 'מלפפון' },
  { options: ['ירוק', 'כחול', 'אדום', 'רחוב'], correctAnswer: 'רחוב' },
  { options: ['ספר', 'עט', 'מחברת', 'גלידה'], correctAnswer: 'גלידה' }
];

export const LEARNING_DURATION_MS = 3000;
