 // Firebase
 import firebase from 'firebase/app'

 // firebase auth
 import 'firebase/auth'

 // firebase database
 import 'firebase/database'

 // firebase config
 const firebaseConfig = {
     apiKey: "AIzaSyDRzB8J3N4F7h7jNNOQt_YC7_6aY18rFsk",
     authDomain: "hostel-management-system-5dadf.firebaseapp.com",
     databaseURL: "https://hostel-management-system-5dadf-default-rtdb.firebaseio.com",
     projectId: "hostel-management-system-5dadf",
     storageBucket: "hostel-management-system-5dadf.appspot.com",
     messagingSenderId: "390118829066",
     appId: "1:390118829066:web:e59da22666a23113dac3f3"

 };


 // init firebase
 const app = firebase.initializeApp(firebaseConfig)

 app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)



 // export 
 export default app