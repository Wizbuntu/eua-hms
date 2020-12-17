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





function AddHostel() {

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
  const [hostelData, setHostelData] = useState({
    roomNumber: Number,
    hostelName: "",
    maxAllocation: Number,
    available: 0,
    alocated: 0,
    designation: "",
    addHostelBtn: "Add Hostel"
  })

  // destructure
  const {roomNumber, hostelName, maxAllocation, available, alocated, designation, addHostelBtn} = hostelData


  // handle Change
  const handleChange = (data) => (e) => {
    // set hostel Data
    setHostelData({...hostelData, [data]: e.target.value})

    console.table(hostelData)

  }

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // set add student data to loading
    setHostelData({...hostelData, addHostelBtn: "Loading..."})

    // validate
    if(!roomNumber) {
       // set add hostel data to loading
      setHostelData({...hostelData, addHostelBtn: "Add Hostel"})
      return toast.error("Please enter room number")
    }


    if(!hostelName) {
         // set add hostel data to loading
      setHostelData({...hostelData, addHostelBtn: "Add Hostel"})
       return toast.error("Please enter hostel name")
    }

    if(!designation) {
        // set add hostel data to loading
    setHostelData({...hostelData, addHostelBtn: "Add Hostel"})
     return toast.error("Please enter select designation")
  }

    // get Add student data
    const getHostelData = {
        roomNumber: Number(roomNumber),
        hostelName,
        maxAllocation: Number(maxAllocation),
        available: Number(maxAllocation),
        alocated,
        status: "Available",
        designation,
    }

      // Add student data
      app.database().ref().child('HostelRoom').push(getHostelData, (error) => {
        if(error) {
             // set add hostel data to loading
            setHostelData({...hostelData, addHostelBtn: "Add Hostel"})
          return toast.error("Oops! An error has occured")
        }
         // set add student data to loading
            setHostelData({...hostelData, addHostelBtn: "Add Hostel"})
        return toast.success("Hostel and Room added successfully")
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
                  <h2 class="h3 mb-0 page-title">Add Hostel &amp; Room</h2>
                </div>
                
              </div>
              <form onSubmit={handleSubmit}>
                <hr class="my-4" />
                
                <div class="form-row">
                    {/* room name */}
                  <div class="form-group col-md-6">
                    <label for="roomNumber">Room Number</label>
                    <input value={roomNumber} onChange={handleChange('roomNumber')} name="roomNumber" type="number" id="roomNumber" class="form-control" />
                  </div>
                  {/* hostel name */}
                  <div class="form-group col-md-6">
                    <label for="hostelName">Hostel Name</label>
                    <input value={hostelName} onChange={handleChange('hostelName')} name="hostelName" type="text" id="hostelName" class="form-control" />
                  </div>

                </div>

                <div className="form-row">
                        {/* maximum allocation */}
                  <div class="form-group col-md-6">
                    <label for="lastname">Maximum Allocation</label>
                    <input value={maxAllocation} onChange={handleChange('maxAllocation')} name="maxAllocation" type="number" id="maxAllocation" class="form-control" />
                  </div>


                  {/* Designation */}
                  <div className="form-group col-md-6">
                        <label for="college">College</label>
                        <select onChange={handleChange('designation')} className="form-control" id="designation">
                          <option value="">Select Designation</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                         
                        </select>
                </div>
                </div>
                   
                
                
                
                <hr class="my-4" />
                <div class="form-row">
                  <div class="col-md-6">
                   
                  <div class="col-md-6 text-right">
                    <button type="submit" class="btn btn-primary">{addHostelBtn}</button>
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

export default AddHostel
