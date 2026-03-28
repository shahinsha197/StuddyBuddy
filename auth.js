/**
 * StudyBuddy AI - Authentication Logic
 * Handles Firebase initialization and user state management.
 */

// 1. YOUR FIREBASE CONFIGURATION
// Replace these placeholders with your actual Firebase project details.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIIm0PUxGwvE3GgWfriE3TlkcQv6j_aYU",
  authDomain: "studybuddy-9fc2f.firebaseapp.com",
  projectId: "studybuddy-9fc2f",
  storageBucket: "studybuddy-9fc2f.firebasestorage.app",
  messagingSenderId: "130394122143",
  appId: "1:130394122143:web:143563d0d9dbbff0f2ffaa",
  measurementId: "G-5C3E1HCW08"
};

// 2. INITIALIZE FIREBASE
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/**
 * REGISTER NEW USER
 */
async function register() {
  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Optional: Update profile with the name
    if (name) {
      await user.updateProfile({ displayName: name });
    }

    alert("Registration successful! Redirecting to dashboard...");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Registration Error:", error.message);
    alert(error.message);
  }
}

/**
 * LOGIN EXISTING USER
 */
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Invalid credentials. Please try again.");
  }
}

/**
 * LOGOUT USER
 */
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Logout Error:", error);
  });
}

/**
 * AUTH STATE OBSERVER
 * Protects the dashboard by redirecting unauthenticated users.
 */
auth.onAuthStateChanged((user) => {
  const currentPage = window.location.pathname;
  
  // If on dashboard and not logged in, redirect to login
  if (currentPage.includes("dashboard.html") && !user) {
    window.location.href = "login.html";
  }
  
  // If on login/register and already logged in, redirect to dashboard
  if ((currentPage.includes("login.html") || currentPage.includes("register.html")) && user) {
    window.location.href = "dashboard.html";
  }
});
// Initialize Firestore
const db = firebase.firestore();

/**
 * SAVE USER PROGRESS
 * Saves a study topic to the user's personal collection.
 */
async function saveProgress(topicName, status = "Started") {
  const user = auth.currentUser;
  
  if (!user) {
    console.error("No user logged in");
    return;
  }

  try {
    await db.collection("users").doc(user.uid).collection("topics").add({
      name: topicName,
      status: status,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("Progress saved!");
  } catch (error) {
    console.error("Error saving progress: ", error);
  }
}

/**
 * GET USER TOPICS
 * Retrieves all saved topics for the logged-in user.
 */
async function getUserTopics() {
  const user = auth.currentUser;
  if (!user) return [];

  const snapshot = await db.collection("users").doc(user.uid).collection("topics")
    .orderBy("timestamp", "desc")
    .get();

  return snapshot.docs.map(doc => doc.data());
}