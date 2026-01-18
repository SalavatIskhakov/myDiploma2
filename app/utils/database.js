import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { app } from "./firebase";

const db = getFirestore(app);

//* Users
export const createUser = (uid, name, imageUrl) => {
  return setDoc(doc(db, "Users", uid), {
    uid,
    name,
    imageUrl,
    role: "user",
    xp: "0",
  });
};

export const updateUser = (uid, name, imageUrl) => {
  return updateDoc(doc(db, "Users", uid), {
    uid,
    name,
    imageUrl,
  });
};

export const updateXp = (uid, xp) => {
  return updateDoc(doc(db, "Users", uid), {
    xp,
  });
};

// Create new quiz record for user
export const addQuizForUser = (uid, currentQuizId, data) => {
  return setDoc(doc(db, "Users", uid, "Quizzes", currentQuizId), data);
};

// Get All Users (returns Query)
export const getUsers = () => {
  return collection(db, "Users");
};

// Get User Details by id (returns DocumentReference)
export const getUserById = (uid) => {
  return doc(db, "Users", uid);
};

// Get quizzes collection of user
export const getDataByUid = (uid) => {
  return collection(db, "Users", uid, "Quizzes");
};

// Get quiz data for specific user
export const getDataByUidAndQuizId = async (uid, currentQuizId) => {
  return await getDoc(doc(db, "Users", uid, "Quizzes", currentQuizId));
};

//* Quizzes
export const createQuiz = (currentQuizId, title, description, imageUrl) => {
  return setDoc(doc(db, "Quizzes", currentQuizId), {
    title,
    description,
    imageUrl,
    participants: [],
  });
};

export const deleteQuiz = (currentQuizId) => {
  return deleteDoc(doc(db, "Quizzes", currentQuizId));
};

export const addParticipant = (currentQuizId, userId) => {
  return updateDoc(doc(db, "Quizzes", currentQuizId), {
    participants: arrayUnion(userId)
  })
};

export const deleteParticipant = (currentQuizId, userId) => {
  return updateDoc(doc(db, "Quizzes", currentQuizId), {
    participants: arrayRemove(userId)
  })
};

// Create question
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return setDoc(doc(db, "Quizzes", currentQuizId, "QNA", currentQuestionId), question);
};

export const deleteQuestion = (currentQuizId, currentQuestionId) => {
  return deleteDoc(doc(db, "Quizzes", currentQuizId, "QNA", currentQuestionId));
};

// Get All Quizzes (returns Promise)
export const getQuizzes = () => {
  return getDocs(collection(db, "Quizzes"));
};

// Get quiz details by id
export const getQuizById = (currentQuizId) => {
  return getDoc(doc(db, "Quizzes", currentQuizId));
};

export const getQuizById2 = (currentQuizId) => {
  return doc(db, "Quizzes", "123456");
};

// Get Questions by quizId (returns Query)
export const getQuestionsByQuizId = (currentQuizId) => {
  return collection(db, "Quizzes", currentQuizId, "QNA");
};
