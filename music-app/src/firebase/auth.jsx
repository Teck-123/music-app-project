import { auth } from "../firebase"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const signup = async (email, password, displayName = "") => {
  if (!email || !password) {
    throw new Error("Email and password are necessary");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email address");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 5 characters");
  }

  try {
    const userDetails = await createUserWithEmailAndPassword(auth, email, password);
    const user = userDetails.user

    if (displayName) {
      await updateProfile(user, { displayName: displayName.trim() });
    }
    return userDetails.user;
  } catch (error) {
    throw new Error(getFriendlyErrorMessage(error));
  }
};

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  try {
    const userDetails = await signInWithEmailAndPassword(auth, email, password);
    return userDetails.user;
  } catch (error) {
    throw new Error(getFriendlyErrorMessage(error));
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("Failed to log out: " + error.message);
  }
};


const getFriendlyErrorMessage = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try again";
    case "auth/invalid-email":
      return "Invalid email format";
    case "auth/weak-password":
      return "Password is too weak. Should be at least 5 characters";
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password. Try again";
    case "auth/too-many-requests":
      return "Too many attempts, please try again later";
    default:
      return error.message || "An error occurred";
  }

  
};