import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveQuizAttempt({
  userId,
  quizId,
  title,
  subject,
  difficulty,
  score,
  totalQuestions
}) {
  await addDoc(collection(db, "quizAttempts"), {
    userId,
    quizId,
    title,
    subject,
    difficulty,
    score,
    totalQuestions,
    createdAt: serverTimestamp()
  });
}