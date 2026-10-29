export type UserRole = 'student' | 'admin';

export interface AppUser {
  uid: string;
  displayName: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface MufrodatItem {
  id: string;
  arabic: string;
  latin: string;
  meaning: string;
  type: 'isim' | 'fiil' | 'dhomir' | 'harf';
  gender?: 'mudzakkar' | 'muannats';
  exampleArabic?: string;
  exampleMeaning?: string;
}

export interface QawaidRule {
  title: string;
  summary: string;
  explanation: string;
  examples: {
    arabic: string;
    latin: string;
    meaning: string;
    note?: string;
  }[];
}

export interface HiwarLine {
  speaker: string;
  speakerRole: string;
  arabic: string;
  latin: string;
  meaning: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  arabicPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Chapter {
  id: string;
  number: number;
  titleArabic: string;
  titleLatin: string;
  titleMeaning: string;
  description: string;
  badgeColor: string;
  mufrodat: MufrodatItem[];
  qawaid: QawaidRule;
  hiwar: {
    title: string;
    setting: string;
    dialogs: HiwarLine[];
  };
  qiraah: {
    title: string;
    arabicText: string;
    indonesianText: string;
  };
  quiz: QuizQuestion[];
}

export interface QuizSubmissionRecord {
  id?: string;
  userId: string;
  userName: string;
  userEmail?: string;
  chapterId: string;
  chapterTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  createdAt: string;
}

export interface Announcement {
  id?: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface CustomMaterial {
  id?: string;
  title: string;
  arabic: string;
  meaning: string;
  chapterId: string;
  authorName: string;
  createdAt: string;
}
