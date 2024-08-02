import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyCbeWaVWqfwtLWaHePWJqsFXqZXJEOKm4Q",
    authDomain: "project-vws-cb0cb.firebaseapp.com",
    databaseURL: "https://project-vws-cb0cb-default-rtdb.firebaseio.com",
    projectId: "project-vws-cb0cb",
    storageBucket: "project-vws-cb0cb.appspot.com",
    messagingSenderId: "575337970725",
    appId: "1:575337970725:web:2065eb7f903a79c62f53cc",
    measurementId: "G-YJ26VNF9MT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

let googleBtn = document.getElementById('googleBtn');
let profilePic = document.getElementById('profilePic');
let username = document.getElementById('username');
let videoProfile = document.getElementById('videoProfile');
let imageProfile = document.getElementById('imageProfile');
let tweetProfile = document.getElementById('tweetProfile');
let user = null;

// Google Sign-In
googleBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
      updateUserProfile(user);
      loadUserData(user.uid);
    })
    .catch((error) => {
      console.error("Error during sign-in: ", error);
    });
});

// Update User Profile
function updateUserProfile(user) {
  profilePic.src = user.photoURL;
  username.textContent = user.displayName;
}

// Load User Data
function loadUserData(uid) {
  loadSectionData(uid, 'videos', videoProfile, 'video');
  loadSectionData(uid, 'images', imageProfile, 'image');
  loadSectionData(uid, 'tweets', tweetProfile, 'text');
}

// Load Section Data
function loadSectionData(uid, section, container, type) {
  const sectionRef = ref(db, `${section}/${uid}`);
  onValue(sectionRef, (snapshot) => {
    container.innerHTML = "";
    const data = snapshot.val();
    if (data) {
      for (let key in data) {
        let item = data[key];
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');

        if (type === 'video') {
          itemElement.innerHTML = `<video width="320" height="240" controls>
            <source src="${item.url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>`;
        } else if (type === 'image') {
          itemElement.innerHTML = `<img src="${item.url}" alt="Image" width="320" height="240">`;
        } else if (type === 'text') {
          itemElement.innerHTML = `<div><strong>${item.username}</strong>: ${item.content}</div>`;
        }
        container.appendChild(itemElement);
      }
    } else {
      container.innerHTML = `<p>No ${section} available.</p>`;
    }
  });
}

// On Auth State Changed
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user = currentUser;
    updateUserProfile(user);
    loadUserData(user.uid);
    googleBtn.style.display = 'none';
  } else {
    profilePic.src = '';
    username.textContent = '';
    googleBtn.style.display = 'block';
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menuButton');
    const navDrawer = document.getElementById('navDrawer');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navDrawer.classList.toggle('open');
            if (navDrawer.classList.contains('open')) {
                menuButton.textContent = '✖'; // Change to close icon
            } else {
                menuButton.textContent = '☰'; // Change to menu icon
            }
        });
    }
});

