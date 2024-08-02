// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import { getDatabase, ref as databaseRef, onValue } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyBqegABR_9AUUmJHFkBKYlbY9Q2YmejOZQ" ,
//     authDomain: "project-v-31a87.firebaseapp.com",
//     databaseURL: "https://project-v-31a87-default-rtdb.firebaseio.com",
//     projectId: "project-v-31a87",
//     storageBucket: "project-v-31a87.appspot.com",
//     messagingSenderId: "296858252836",
//     appId: "1:296858252836:web:82c2db2701c7ed9d2c4ab1",
//     measurementId: "G-LQF5H9ZRWJ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// // HTML elements
// const videoPlayer = document.getElementById('videoPlayer');
// const videoTitle = document.getElementById('videoTitle');
// const userProfilePic = document.getElementById('userProfilePic');
// const userName = document.getElementById('userName');

// // Get video ID from URL
// const urlParams = new URLSearchParams(window.location.search);
// const videoId = urlParams.get('id');

// if (videoId) {
//     const videoRef = databaseRef(db, `videos/${videoId}`);
//     onValue(videoRef, (snapshot) => {
//         const videoData = snapshot.val();
//         if (videoData) {
//             videoPlayer.innerHTML = `<video controls src="${videoData.videoURL}"></video>`;
//             videoTitle.textContent = videoData.title;
//             userProfilePic.src = videoData.userProfilePic;
//             userName.textContent = videoData.userName;
//         } else {
//             videoPlayer.innerHTML = `<p>Video not found</p>`;
//         }
//     });
// } else {
//     videoPlayer.innerHTML = `<p>Invalid video ID</p>`;
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref as databaseRef, onValue } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";


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
const db = getDatabase(app);

// HTML elements
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const userProfilePic = document.getElementById('userProfilePic');
const userName = document.getElementById('userName');

// Get video ID from URL
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('id');

if (videoId) {
    const videoRef = databaseRef(db, `videos/${videoId}`);
    onValue(videoRef, (snapshot) => {
        const videoData = snapshot.val();
        if (videoData) {
            videoPlayer.innerHTML = `<video controls src="${videoData.videoURL}"></video>`;
            videoTitle.textContent = videoData.title;
            userProfilePic.src = videoData.userProfilePic;
            userName.textContent = videoData.userName;
        } else {
            videoPlayer.innerHTML = `<p>Video not found</p>`;
        }
    });
} else {
    videoPlayer.innerHTML = `<p>Invalid video ID</p>`;
}

