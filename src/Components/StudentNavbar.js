import React, {useState} from 'react'

// firebase app
import app from '../utils/firebaseConfig'


const StudentNavbar =() => {


    const [userData, setUserData] = useState(null)


    const userID = app.auth().currentUser ? app.auth().currentUser.uid : ""


    app.database().ref('Student/'+userID).once('value')
    .then((snapshot) => {
        // set User Data
        setUserData(snapshot.val().firstName ? snapshot.val().firstName : "")
       
       
    })
    .catch((error) => {
        console.log(error.message)
    })

    return (
        <React.Fragment>

<nav class="topnav navbar navbar-light">
        <button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
          <i class="fe fe-menu navbar-toggler-icon"></i>
        </button>
        
        <ul class="nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="avatar avatar-sm mt-2">
                <span href="#">{userData}</span>
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Profile</a>
              <a class="dropdown-item" onClick={() => app.auth().signOut()} >Logout</a>
             
            </div>
          </li>
        </ul>
      </nav>
              
        </React.Fragment>
    )
}

export default StudentNavbar
