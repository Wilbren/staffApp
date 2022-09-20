

// set up firebase backend connection

const firebaseConfig = {
  apiKey: "AIzaSyAb0NvP38GJywHwxysYLjFjtzvjdP2Jvpc",
  authDomain: "service-application-aac6d.firebaseapp.com",
  databaseURL: "https://service-application-aac6d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "service-application-aac6d",
  storageBucket: "service-application-aac6d.appspot.com",
  messagingSenderId: "476662918265",
  appId: "1:476662918265:web:c83ae09e9de67fa82138a8",
  measurementId: "G-Q66ZMTWLTL"
};
firebase.initializeApp(firebaseConfig);

// make authentication and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

// setup materialize javascript components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);


});






//functions for app code


function check(x) {
  x.style.background = "#019267";
}









