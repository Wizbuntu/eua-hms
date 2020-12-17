import React, {useState} from 'react'


// react router dom
import {Link} from 'react-router-dom'


// firebase app
import app from '../utils/firebaseConfig'


const StaffSidebar = () => {

        const [isAdmin, setIsAdmin] = useState(false)


        const userID = app.auth().currentUser ? app.auth().currentUser.uid : ""


        app.database().ref('Staff/'+userID).once('value')
        .then((snapshot) => {

          if(snapshot.val()) {
              // set User Data
              setIsAdmin(false)
          } else {
            setIsAdmin(true)
          } 
        })
        .catch((error) => {
            console.log(error.message)
        })


    return (
        <React.Fragment>

<aside class="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
        <a href="#" class="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
          <i class="fe fe-x"><span class="sr-only"></span></i>
        </a>
        <nav class="vertnav navbar navbar-light">
        
          <div class="w-100 mb-4 d-flex">
          <a class="navbar-brand mx-auto mt-2 flex-fill text-center" href="./index.html">
            <img src="/assets/images/eua-logo.png" style={{height: 50, width: 50}}></img>
              <h5 className="mt-2">Hostel Management System</h5>
              </a>
          </div>
          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
              <a href="#dashboard" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">
                <i class="fe fe-more-vertical fe-16"></i>
                <span class="ml-3 item-text">Dashboard</span><span class="sr-only">(current)</span>
              </a>
              <ul class="collapse list-unstyled pl-4 w-100" id="dashboard">
                <li class="nav-item active">
                  <Link to="/staff/dashboard" class="nav-link pl-3" href="./index.html"><span class="ml-1 item-text">Home</span></Link>
                </li>
                <li class="nav-item active">
                  <Link to="/staff/dashboard/hostel/requests" class="nav-link pl-3"><span class="ml-1 item-text">View Hostel Request</span></Link>
                </li>
              
               
              </ul>
            </li>
          </ul>


          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
              <a href="#hostel" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">
                <i class="fe fe-home fe-16"></i>
                <span class="ml-3 item-text">Hostel</span><span class="sr-only"></span>
              </a>
              <ul class="collapse list-unstyled pl-4 w-100" id="hostel">
                <li class="nav-item active">
                  <Link to="/staff/hostel/add" class="nav-link pl-3" href="./index.html"><span class="ml-1 item-text">Add Hostel/Room</span></Link>
                </li>
                <li class="nav-item active">
                  <Link to="/staff/hostel/view" class="nav-link pl-3"><span class="ml-1 item-text">View Hostel/Room</span></Link>
                </li>
              
               
              </ul>
            </li>
          </ul>



          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
              <a href="#ui-elements" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">
                <i class="fe fe-box fe-16"></i>
                <span class="ml-3 item-text">Student Data</span>
              </a>
              <ul class="collapse list-unstyled pl-4 w-100" id="ui-elements">
                <li class="nav-item">
                  <Link to="/student/data/view" class="nav-link pl-3" ><span class="ml-1 item-text">View Students</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/student/data/add" class="nav-link pl-3" ><span class="ml-1 item-text">Add Students</span>
                  </Link>
                </li>
                
              </ul>
            </li>

            {isAdmin?  <li class="nav-item dropdown">
              <a href="#forms" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">
              <i class="fe fe-user fe-16"></i>
                <span class="ml-3 item-text">Users</span>
              </a>
              <ul class="collapse list-unstyled pl-4 w-100" id="forms">
                <li class="nav-item">
                  <Link to="/view/staff" class="nav-link pl-3"><span class="ml-1 item-text">View Porters</span></Link>
                  <Link to="/user/add" class="nav-link pl-3"><span class="ml-1 item-text">Add Porter</span></Link>
                </li>
               
                
              </ul>
            </li> : 
              null
            }
          
           
           
           
          </ul>
         
        </nav>
      </aside>
            
        </React.Fragment>
    )
}

export default StaffSidebar
