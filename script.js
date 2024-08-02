
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
import { getDatabase, ref as databaseRef, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";


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
const storage = getStorage(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

// HTML elements
const googleAuthBtn = document.getElementById('googleAuthBtn');
const titleInput = document.getElementById('titleInput');
const videoUpload = document.getElementById('videoUpload');
const thumbnailUpload = document.getElementById('thumbnailUpload');
const publishBtn = document.getElementById('publishBtn');
const videoContainer = document.getElementById('videoContainer');

let user = null;

// Google Auth
if (googleAuthBtn) {
    googleAuthBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider).then((result) => {
            user = result.user;
            alert(`Hello, ${user.displayName}`);
            checkAuth();
        }).catch((error) => {
            console.error("Error during sign in:", error);
        });
    });
}

// Check if user is authenticated
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in.
            console.log(`User signed in: ${user.displayName}`);
        } else {
            // No user is signed in.
            console.log("No user signed in");
            if (window.location.pathname.includes("uploading.html")) {
                alert("Please log in to upload videos.");
                window.location.href = "index.html";
            }
        }
    });
}

// Ensure user is authenticated when accessing upload page
if (window.location.pathname.includes("uploading.html")) {
    checkAuth();
}

// Publish video
// if (publishBtn) {
//     publishBtn.addEventListener('click', async () => {
//         if (!user) {
//             alert("Please login first");
//             return;
//         }

//         const title = titleInput.value;
//         const videoFile = videoUpload.files[0];
//         const thumbnailFile = thumbnailUpload.files[0];

//         if (!title || !videoFile || !thumbnailFile) {
//             alert("Please provide all the details");
//             return;
//         }

//         // Upload video
//         const videoRef = storageRef(storage, `videos/${videoFile.name}`);
//         await uploadBytes(videoRef, videoFile);
//         const videoURL = await getDownloadURL(videoRef);

//         // Upload thumbnail
//         const thumbnailRef = storageRef(storage, `thumbnails/${thumbnailFile.name}`);
//         await uploadBytes(thumbnailRef, thumbnailFile);
//         const thumbnailURL = await getDownloadURL(thumbnailRef);

//         // Store video details in database
//         const videoData = {
//             title: title,
//             videoURL: videoURL,
//             thumbnailURL: thumbnailURL,
//             userName: user.displayName,
//             userProfilePic: user.photoURL,
//         };

//         const newVideoRef = push(databaseRef(db, 'videos'));
//         await set(newVideoRef, videoData);

//         alert("Video published successfully");
//         fetchVideos();
//     });
// }
if (publishBtn) {
    publishBtn.addEventListener('click', async () => {
        if (!user) {
            alert("Please login first");
            return;
        }

        const title = titleInput.value;
        const videoFile = videoUpload.files[0];
        const thumbnailFile = thumbnailUpload.files[0];

        if (!title || !videoFile || !thumbnailFile) {
            alert("Please provide all the details");
            return;
        }

        // Show alert that the upload has started
        alert("Your video is uploading. Please wait...");

        try {
            // Upload video
            const videoRef = storageRef(storage, `videos/${videoFile.name}`);
            await uploadBytes(videoRef, videoFile);
            const videoURL = await getDownloadURL(videoRef);

            // Upload thumbnail
            const thumbnailRef = storageRef(storage, `thumbnails/${thumbnailFile.name}`);
            await uploadBytes(thumbnailRef, thumbnailFile);
            const thumbnailURL = await getDownloadURL(thumbnailRef);

            // Store video details in database
            const videoData = {
                title: title,
                videoURL: videoURL,
                thumbnailURL: thumbnailURL,
                userName: user.displayName,
                userProfilePic: user.photoURL,
            };

            const newVideoRef = push(databaseRef(db, 'videos'));
            await set(newVideoRef, videoData);

            // Alert that the video was published successfully
            alert("Video published successfully");
            fetchVideos();
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("An error occurred while uploading the video. Please try again.");
        }
    });
}


// Fetch and display videos
function fetchVideos() {
    if (videoContainer) {
        onValue(databaseRef(db, 'videos'), (snapshot) => {
            videoContainer.innerHTML = '';
            snapshot.forEach((childSnapshot) => {
                const videoData = childSnapshot.val();
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                videoItem.innerHTML = `
                    <img src="${videoData.thumbnailURL}" alt="${videoData.title}">
                    <h3>${videoData.title}</h3>
                    <div class="profile">
                        <img src="${videoData.userProfilePic}" alt="${videoData.userName}">
                        <span>${videoData.userName}</span>
                    </div>
                `;
                videoItem.addEventListener('click', () => {
                    window.location.href = `video.html?id=${childSnapshot.key}`;
                });
                videoContainer.appendChild(videoItem);
            });
        });
    }
}

// Initial fetch
fetchVideos();


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

