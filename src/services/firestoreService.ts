import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { QuizSubmissionRecord, Announcement, CustomMaterial, AppUser } from '../types';

const USERS_COLLECTION = 'users';
const QUIZ_RESULTS_COLLECTION = 'quizResults';
const ANNOUNCEMENTS_COLLECTION = 'announcements';
const CUSTOM_MATERIALS_COLLECTION = 'customMaterials';

// Sync or save user profile to Firestore
export async function syncUserProfile(user: AppUser): Promise<void> {
  const path = `${USERS_COLLECTION}/${user.uid}`;
  try {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email || '',
        role: user.role,
        avatar: user.avatar || '',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Save Quiz Submission Record
export async function saveQuizSubmission(record: Omit<QuizSubmissionRecord, 'id'>): Promise<string> {
  const path = QUIZ_RESULTS_COLLECTION;
  try {
    const docRef = await addDoc(collection(db, path), {
      ...record,
      createdAt: new Date().toISOString(),
      serverCreated: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Get Quiz Results for specific student
export async function getStudentQuizResults(userId: string): Promise<QuizSubmissionRecord[]> {
  const path = QUIZ_RESULTS_COLLECTION;
  try {
    const q = query(
      collection(db, path),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<QuizSubmissionRecord, 'id'>),
    }));
  } catch (error) {
    // Fallback if index is building or query error
    try {
      const qFallback = query(collection(db, path), where('userId', '==', userId));
      const snap = await getDocs(qFallback);
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<QuizSubmissionRecord, 'id'>),
      }));
      return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (fallbackErr) {
      handleFirestoreError(fallbackErr, OperationType.LIST, path);
    }
  }
}

// Get All Quiz Results (restricted per-user by security rules)
export async function getAllQuizResults(): Promise<QuizSubmissionRecord[]> {
  const path = QUIZ_RESULTS_COLLECTION;
  try {
    const snap = await getDocs(collection(db, path));
    const items = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<QuizSubmissionRecord, 'id'>),
    }));
    return items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  } catch {
    // If global list is locked down by strict per-user rules, query current user's records
    try {
      if (auth.currentUser) {
        return await getStudentQuizResults(auth.currentUser.uid);
      }
    } catch {
      // Ignored
    }
    return [];
  }
}

// Announcements
export async function getAnnouncements(): Promise<Announcement[]> {
  const path = ANNOUNCEMENTS_COLLECTION;
  try {
    const snap = await getDocs(collection(db, path));
    const items = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Announcement, 'id'>),
    }));
    return items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function addAnnouncement(announcement: Omit<Announcement, 'id'>): Promise<string> {
  const path = ANNOUNCEMENTS_COLLECTION;
  try {
    const docRef = await addDoc(collection(db, path), {
      ...announcement,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Custom Materials
export async function getCustomMaterials(): Promise<CustomMaterial[]> {
  const path = CUSTOM_MATERIALS_COLLECTION;
  try {
    const snap = await getDocs(collection(db, path));
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<CustomMaterial, 'id'>),
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function addCustomMaterial(material: Omit<CustomMaterial, 'id'>): Promise<string> {
  const path = CUSTOM_MATERIALS_COLLECTION;
  try {
    const docRef = await addDoc(collection(db, path), {
      ...material,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
