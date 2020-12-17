import React from 'react'

// react router dom
import {Link} from 'react-router-dom'


const StudentSidebar =() => {
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
            <li class="nav-item">
              <Link to="/student/dashboard" data-toggle="collapse" aria-expanded="false" class="nav-link">
                <i class="fe fe-home fe-16"></i>
                <span class="ml-3 item-text">Dashboard</span><span class="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
         
          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item">
              <Link to="/student/create/hostel/request" data-toggle="collapse" aria-expanded="false" class="nav-link">
                <i class="fe fe-box fe-16"></i>
                <span class="ml-3 item-text">Create Hostel Request</span>
              </Link>
            </li>
           
          </ul>
         
        </nav>
      </aside>
            
        </React.Fragment>
    )
}

export default StudentSidebar
