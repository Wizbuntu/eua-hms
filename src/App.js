import React from 'react'


// Login Page
import StudentLogin from './Pages/StudentLogin'
import StaffLogin from './Pages/StaffLogin'


// Register
import StudentRegister from './Pages/StudentRegister'

// Dashboard
import StaffDashboard from './Pages/StaffDashboard'

// View Staff
import ViewStaff from './Pages/ViewStaff'

// student dashboard
import StudentDashboard from './Pages/StudentDashboard'
import StudentDashboardDetails from './Pages/StudentDashboardDetails'

// staff view
import StaffViewHostelRequest from './Pages/StaffViewHostelRequest'

// staff view clearance details
import StaffViewHostelDetails from './Pages/StaffViewHostelDetails'

// add User
import AddUser from './Pages/AddUser'


// Students Data
import AddStudentsData from './Pages/AddStudentData'
import ViewStudentsData from './Pages/ViewStudentData'



// create clearance
import CreateClearanceRequest from './Pages/CreateClearanceRequest'



// hostel and room
import AddHostel from './Pages/AddHostel'
import ViewHostel from './Pages/ViewHostel'

// Hostel request
import CreateHostelRequest from './Pages/CreateHostelRequest'


// client Nav bar
import Home from './Pages/Home'


// React router dom
import {BrowserRouter, Switch, Route} from 'react-router-dom'

const App = () => {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/student/login" component={StudentLogin} />
              <Route exact path="/staff/login" component={StaffLogin} />
              <Route exact path="/staff/dashboard" component={StaffDashboard} />
              {/* Hostel/Room */}
              <Route exact path="/staff/hostel/add" component={AddHostel} />
              <Route exact path="/staff/hostel/view" component={ViewHostel} />

              {/* Hostel Request */}
              <Route exact path="/student/create/hostel/request" component={CreateHostelRequest} />



              <Route exact path="/staff/dashboard/hostel/requests" component={StaffViewHostelRequest} />
              <Route exact path="/view/staff" component={ViewStaff} />
              <Route exact path="/student/register" component={StudentRegister} />
              <Route exact path="/student/dashboard" component={StudentDashboard} />
              <Route exact path="/user/add" component={AddUser} />
              <Route exact path="/student/dashboard/:uid" component={StudentDashboardDetails} />
              <Route exact path="/student/create/clearance/request" component={CreateClearanceRequest} />
              <Route exact path="/student/data/add" component={AddStudentsData} />
              <Route exact path="/student/data/view" component={ViewStudentsData} />
              <Route exact path="/staff/view/hostel/details/:uid" component={StaffViewHostelDetails} />

          </Switch>
        
      </BrowserRouter>
  );
}

export default App;
