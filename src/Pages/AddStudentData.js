import React, {useState, useEffect} from 'react'

// NavBar
import NavBar from '../Components/NavBar'

// Sidebar
import StaffSidebar from '../Components/StaffSidebar'

// react router dom
import {useHistory, Link} from 'react-router-dom'

// firebase app
import app from '../utils/firebaseConfig'


// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function AddStudentData() {

   // init userAuthenticated
   const [userAuthenticated, setUserAuthenticated] = useState(false)

   // init history
   const history = useHistory()
 
 
   useEffect(() => {
     app.auth().onAuthStateChanged((user) => {
       if(!user) {
 
           // return to login
           return history.push({pathname: '/staff/login'}) 
       } else {
          
          setUserAuthenticated(true)
 
       }
   })
   }, [])

  //  init student Data state
  const [studentData, setStudentData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    regNo: "",
    addStudentBtn: "Add Student Data"
  })

  // destructure
  const {firstName, middleName, lastName, regNo, addStudentBtn} = studentData


  // handle Change
  const handleChange = (data) => (e) => {
    // set StudentData
    setStudentData({...studentData, [data]: e.target.value})

  }

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // set add student data to loading
    setStudentData({...studentData, addStudentBtn: "Loading..."})

    // validate
    if(!firstName) {
       // set add student data to loading
      setStudentData({...studentData, addStudentBtn: "Add Student Data"})
      return toast.error("Please enter first name")
    }


    if(!lastName) {
        // set add student data to loading
       setStudentData({...studentData, addStudentBtn: "Add Student Data"})
       return toast.error("Please enter last name")
    }

    if(!regNo) {
         // set add student data to loading
       setStudentData({...studentData, addStudentBtn: "Add Student Data"})
       return toast.error("Please enter registration number")
    }

    // get Add student data
    const getStudentData = {
      firstName,
      middleName,
      lastName,
      regNo
    }

      // Add student data
      app.database().ref().child('StudentData').push(getStudentData, (error) => {
        if(error) {
          return toast.error("Oops! An error has occured")
        }
         // set add student data to loading
        setStudentData({...studentData, addStudentBtn: "Add Student Data"})
        return toast.success("Student Data added successfully")
      })

  }



    return (
        <React.Fragment>
            <ToastContainer/>
            <NavBar/>
            <StaffSidebar/>

            <main role="main" class="main-content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 col-xl-10">
              <div class="row align-items-center my-4">
                <div class="col">
                  <h2 class="h3 mb-0 page-title">Add Student Data</h2>
                </div>
                
              </div>
              <form onSubmit={handleSubmit}>
                <hr class="my-4" />
                
                <div class="form-row">
                    {/* first name */}
                  <div class="form-group col-md-4">
                    <label for="firstname">Firstname</label>
                    <input  onChange={handleChange('firstName')} name="firstName" type="text" id="firstname" class="form-control" />
                  </div>
                  {/* middlename */}
                  <div class="form-group col-md-4">
                    <label for="middlename">Middlename</label>
                    <input onChange={handleChange('middleName')} name="middleName" type="text" id="middlename" class="form-control" />
                  </div>
                    {/* lastname */}
                  <div class="form-group col-md-4">
                    <label for="lastname">Lastname</label>
                    <input onChange={handleChange('lastName')} name="lastName" type="text" id="lastname" class="form-control" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="regNo">Registration Number</label>
                    <input onChange={handleChange('regNo')} name="regNo" type="text" class="form-control" id="regNo" />
                  </div>
                 
                </div>
                
                <hr class="my-4" />
                <div class="form-row">
                  <div class="col-md-6">
                   
                  <div class="col-md-6 text-right">
                    <button type="submit" class="btn btn-primary">{addStudentBtn}</button>
                  </div>
                </div>
                </div>
              </form>
            </div> 
          </div> 
        </div> 
        
      </main> 
            
        </React.Fragment>
    )
}

export default AddStudentData
