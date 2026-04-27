const firebaseConfig = {
  apiKey: "AIzaSyAsbIXG686g4uCi1K0W0exngg7RkPMDZds",
  authDomain: "kultian-8cef4.firebaseapp.com",
  databaseURL: "https://kultian-8cef4-default-rtdb.firebaseio.com",
  projectId: "kultian-8cef4",
  storageBucket: "kultian-8cef4.firebasestorage.app",
  messagingSenderId: "1016555988115",
  appId: "1:1016555988115:web:963467fc30fc609774d966",
  measurementId: "G-MSSHTEPE7L"
}
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// REGISTER
function register(){
    auth.createUserWithEmailAndPassword(
        email.value, password.value
    ).then(()=>alert("Registered"));
}

// LOGIN
function login(){
    auth.signInWithEmailAndPassword(
        loginEmail.value, loginPassword.value
    ).then(()=>{
        window.location="student.html";
    });
}

// BOOK CLASS
function bookClass(){
    const user = auth.currentUser;

    if(!user){
        alert("Login first");
        return;
    }

    db.collection("bookings").add({
        email: user.email,
        course: course.value,
        date: new Date()
    });

    alert("Booked!");
}

// LOAD PROGRESS
function loadProgress(){
    const user = auth.currentUser;

    db.collection("progress").doc(user.email).get()
    .then(doc=>{
        if(doc.exists){
            const percent = doc.data().percent;

            document.getElementById("progressFill").style.width = percent + "%";
            document.getElementById("progressText").innerText = percent + "%";
        }
    });
}
