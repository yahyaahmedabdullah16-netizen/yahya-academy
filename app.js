const firebaseConfig = {
  apiKey: "AIzaSyAsbIXG686g4uCi1K0W0exngg7RkPMDZds",
  authDomain: "kultian-8cef4.firebaseapp.com",
  databaseURL: "https://kultian-8cef4-default-rtdb.firebaseio.com",
  projectId: "kultian-8cef4",
  storageBucket: "kultian-8cef4.firebasestorage.app",
  messagingSenderId: "1016555988115",
  appId: "1:1016555988115:web:963467fc30fc609774d966",
  measurementId: "G-MSSHTEPE7L"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// 🔐 CHANGE THIS TO YOUR EMAIL
const ADMIN_EMAIL = "youremail@gmail.com";

// AUTH STATE
auth.onAuthStateChanged(user => {
    if(!user){
        if(!window.location.pathname.includes("index.html")){
            window.location = "index.html";
        }
    } else {
        if(window.location.pathname.includes("admin.html")){
            if(user.email !== ADMIN_EMAIL){
                alert("Not authorized");
                window.location = "student.html";
            }
            loadBookings();
        }

        if(window.location.pathname.includes("student.html")){
            loadProgress();
        }
    }
});

// REGISTER
function register(){
    auth.createUserWithEmailAndPassword(
        email.value,
        password.value
    ).then(()=>alert("Registered"))
    .catch(e=>alert(e.message));
}

// LOGIN
function login(){
    auth.signInWithEmailAndPassword(
        loginEmail.value,
        loginPassword.value
    ).then(user=>{
        if(user.user.email === ADMIN_EMAIL){
            window.location = "admin.html";
        } else {
            window.location = "student.html";
        }
    }).catch(e=>alert(e.message));
}

// LOGOUT
function logout(){
    auth.signOut();
}

// BOOK CLASS
function bookClass(){
    const user = auth.currentUser;

    db.collection("bookings").add({
        email: user.email,
        course: course.value,
        date: new Date()
    });

    alert("Booked");
}

// LOAD BOOKINGS
function loadBookings(){
    db.collection("bookings")
    .orderBy("date", "desc")
    .onSnapshot(snapshot => {

        const div = document.getElementById("bookings");
        div.innerHTML = "";

        snapshot.forEach(doc => {
            const data = doc.data();

            div.innerHTML += `
                <p>${data.email} - ${data.course}</p>
            `;
        });
    });
}

// UPDATE PROGRESS (TEACHER)
function updateProgress(){
    db.collection("progress").doc(studentEmail.value).set({
        percent: parseInt(progressValue.value)
    });

    alert("Updated");
}

// LOAD PROGRESS (STUDENT)
function loadProgress(){
    const user = auth.currentUser;

    db.collection("progress").doc(user.email).get()
    .then(doc=>{
        if(doc.exists){
            document.getElementById("progressText").innerText =
                doc.data().percent + "%";
        }
    });
}
