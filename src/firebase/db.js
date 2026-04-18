import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from './config';
import { format } from 'date-fns';

// ------------------------------------
// Habits API
// ------------------------------------

export async function getHabits(userId) {
  const q = query(
    collection(db, 'habits'), 
    where('userId', '==', userId)
  );
  const snapshot = await getDocs(q);
  const habits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // Sort manually to avoid Firebase Index requirement
  return habits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function addHabit(userId, habitData) {
  return await addDoc(collection(db, 'habits'), {
    ...habitData,
    userId,
    createdAt: new Date().toISOString()
  });
}

export async function updateHabit(habitId, updateData) {
  const habitRef = doc(db, 'habits', habitId);
  return await updateDoc(habitRef, updateData);
}

export async function deleteHabit(habitId) {
  return await deleteDoc(doc(db, 'habits', habitId));
}

// ------------------------------------
// Logs API
// ------------------------------------

// Generate a unique ID for a day-log combination
export function getLogId(habitId, date) {
  // date should be a normalized string (e.g. YYYY-MM-DD)
  return `${habitId}_${date}`;
}

export async function getLogsForDate(userId, dateString) {
  // We can query logs where userId == userId and date == dateString
  const q = query(
    collection(db, 'logs'),
    where('userId', '==', userId),
    where('date', '==', dateString)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getLogsForDateRange(userId, startDate, endDate) {
  const q = query(
    collection(db, 'logs'),
    where('userId', '==', userId),
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllLogs(userId) {
  const q = query(
    collection(db, 'logs'),
    where('userId', '==', userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function toggleHabitLog(userId, habitId, dateString, status) {
  // status: 'completed' | 'missed' | 'none'
  const logId = getLogId(habitId, dateString);
  const logRef = doc(db, 'logs', logId);
  
  if (status === 'none') {
    // delete log if unchecked entirely
    const docSnap = await getDoc(logRef);
    if (docSnap.exists()) {
      await deleteDoc(logRef);
    }
    return null;
  } else {
    // create or update
    const payload = {
      userId,
      habitId,
      date: dateString,
      status, 
      updatedAt: new Date().toISOString()
    };
    await setDoc(logRef, payload);
    return { id: logId, ...payload };
  }
}
