import React, {useState, useEffect, useRef} from 'react'

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



const StaffViewClearanceDetails = (props) => {

    const hostelUid = props.match.params.uid

    
    // init useHistory
    const history = useHistory()


     // init userAuthenticated
   const [userAuthenticated, setUserAuthenticated] = useState(false)

   // users state
   const [hostelDetails, setHostelDetails] = useState({})

  //  init useRef
  const hostelDetailsRef = useRef({})


   useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if(!user) {

          // return to login
          return history.push({pathname: '/student/login'}) 
      } else {

        // set authenticated user to true
        setUserAuthenticated(true)

        // get current authenticated student details
        app.database().ref().child(`HostelRequest/${hostelUid}`).on("value", (snapshot) => {
          if(snapshot.val()) {

            // update clearance request details
            setHostelDetails(snapshot.val())

            
            
          }
        })   

      }
    })
    
}, [])


        // init clearanceStatus state
        const [updateHostelDetails, setUpdateHostelDetails] = useState({})
        const [updateSingleHostelDetail, setUpdateSingleHostelDetail] = useState({})
        const [singleHostelDetailKey, setSingleHostelDetailKey] = useState(null)


        // init editHostelRoom state
        const [editHostelRoom, setEditHostelRoom] = useState({
          hostelName: "",
          roomNumber: ""
        })

        // destructure
        const {hostelName, roomNumber} = editHostelRoom


        // change clearance status function
        const changeHostelRequestStatus = (status) => {
           if(status) {
               if(status === "Rejected") {

                    // init status data
                    const statusData = {
                        status: status
                    }

                    // update clearance request database
                    app.database().ref().child(`HostelRequest/${hostelUid}`).update(statusData, (error) => {
                        if(error) {
                            console.log(error.message)
                            return toast.error("Oops! An error has occured")
                        }

                        // return success
                        return toast.success("Status updated successfully")
                    })
               } else {

                   // init status data
                   const statusData = {
                        status: status
                    }

                    // update clearance request database
                    app.database().ref().child(`HostelRequest/${hostelUid}`).update(statusData, (error) => {
                        if(error) {
                            console.log(error.message)
                            return toast.error("Oops! An error has occured")
                        }

                        // return success
                        return toast.success("Status updated successfully")
                    })
                   
               }
           }
        }

        // handle Clearance Message func
        const handleChange = (data) =>(e) => {
            
            setEditHostelRoom({...editHostelRoom, [data]: e.target.value})

            console.log(editHostelRoom)
           
        }


        // handle Submit message
        const handleSubmit = () => {
            if(!hostelName) {
                return toast.error("Please select hostel name")
            }

            if(!roomNumber) {
              return toast.error("Please select room Number")
          }

            // get message data
            const editHostelData = {
                hostelName: hostelName,
                roomNumber: roomNumber
            }


             // update clearance request database
            app.database().ref().child(`HostelRequest/${hostelUid}`).update(editHostelData, (error) => {
                if(error) {
                    console.log(error.message)
                    return toast.error("Oops! An error has occured")
                }

                

              // get hostel by hostel name
              app.database().ref("HostelRoom").orderByChild("hostelName").equalTo(editHostelData.hostelName).on("value", (snapshot) => {
                if(snapshot.val()) {
                  // update hostel details
                  setUpdateHostelDetails(snapshot.val())
                }
              })


              // iterate through updateHostelDetails
              Object.keys(updateHostelDetails).map((key) => {
                if(updateHostelDetails[key].roomNumber === Number(editHostelData.roomNumber)) {
                  return (
                    // find hostel Name by ID
                  app.database().ref().child(`HostelRoom/${key}`).on("value", (snapshot) => {
                    if(snapshot.val()){
                      // get details
                      const allocated = snapshot.val().alocated + 1
                      const maxAllocation = snapshot.val().maxAllocation
                      const available = maxAllocation - allocated

                      // get data
                      const getHostelData = {
                        alocated: allocated,
                        maxAllocation: maxAllocation,
                        available: available,
                        key: key
                      }

                      hostelDetailsRef.current = getHostelData

                   
                      
                    }
                  })
                    
                  )
                }


                if(hostelDetailsRef.current.key) {
                   //update hostel data
                  app.database().ref().child(`HostelRoom/${hostelDetailsRef.current.key}`).update(hostelDetailsRef.current, (error) => {
                   if(error) {
                     console.log(error)
                     return toast.error(error.message)
                   }
 
                   // return success
                   return history.push('/staff/dashboard/hostel/requests')
                 })
                console.log(updateHostelDetails)
               }

              })

              

             

               
            })
        }



    return (
        <React.Fragment>
            <NavBar/>
            <ToastContainer/>
            <StaffSidebar/>

            <main role="main" class="main-content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
              <h2 class="h3 mb-4 page-title">Hostel Request Details</h2>
              <div class="my-4">
               
                <div class="list-group mb-5 shadow">
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <strong class="mb-2">Update Hostel Request Status</strong>
                        
                      </div> 
                      <div class="col-auto">
                        {/* Clearance Status */}
                        <div class="form-row">
                        <div class="form-group">
                        
                        <select onChange={(e) => changeHostelRequestStatus(e.target.value)} class="form-control" id="clearance_status">
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Cleared">Successful</option>
                          <option value="Rejected">Rejected</option>
                         
                        </select>
                        </div>
                        </div>
                      </div> 
                    </div> 
                  </div>

                 
                    <div class="list-group-item">
                      <div class="row align-items-center">
                        <div class="col">
                          <strong class="mb-2">Allocate Hostel &amp; Room</strong>
                         
                          <div className="form-group c">
                                            <select onChange={handleChange('hostelName')} className="form-control" id="hostelName">
                                            <option value="">Select Hostel</option>
                                                    <option value="Hostel A">Hostel A (Female)</option>
                                                    <option value="Hostel B">Hostel B (Female)</option>
                                                    <option value="Hostel C">Hostel C (Female)</option>
                                                    <option value="Hostel D">Hostel D (Male)</option>
                                                    <option value="Hostel E">Hostel E (Male)</option>
                                                    <option value="Royal Lodge B">Royal Lodge B (Female)</option> 
                                                    <option value="Osueke Lodge">Osueke Lodge (Male)</option>                                      
                                            </select>
                            </div>


                           {/* Room */}
                           <div className="form-group">
                                           
                                            <select onChange={handleChange('roomNumber')} className="form-control" id="roomNumber">
                                            <option value="">Select Room</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                                                        
                                            </select>
                                </div> 
                          
                        </div> 
                        <div class="col-auto">
                          {/* Send Button */}
                          <button onClick={() => handleSubmit()} className="btn btn-primary btn-sm">Allocate</button>
                        </div> 
                      </div> 
                  </div> 
                   
                   
                    {hostelDetails? 
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <strong class="mb-2">Hostel Request Status: </strong>
                        {hostelDetails.status === "Pending" ? 
                             <span class="badge badge-pill badge-warning ml-2" style={{fontSize: 12}}>Pending</span>
                             :
                             hostelDetails.status === "Rejected" ? 
                             <span class="badge badge-pill badge-danger ml-2" style={{fontSize: 12}}>Declined</span> :
                             hostelDetails.status === "Cleared" ? 
                             <span class="badge badge-pill badge-success ml-2" style={{fontSize: 12}}>Successful</span> :
                             <span class="badge badge-pill badge-primary ml-2" style={{fontSize: 12}}>Loading...</span>
                    }
                       
                      </div> 
                     
                    </div>
                  </div> 
                  :
                  
                    <div>Loading...</div>
                    }
                    
                    
                  
                </div> 
               


                <h5 class="mb-0 mt-5">Student Reciept Document</h5>
                <p>List of uploaded student reciept document.</p>
                <table class="table border bg-white">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Reciept Document</th>
                     
                     
                    </tr>
                  </thead>
                  <tbody>
                  {hostelDetails.recieptDocuments? 
                  hostelDetails.recieptDocuments.map((reciept, index) => {
                    return <React.Fragment key={index}>

                    <tr>
                      <th scope="col">{index+1}</th>
                      <td><a href={reciept}>{`Reciept ${index+1}`}</a></td>
                    </tr>
                    </React.Fragment>

                        })
                                          
                        :
                        <div className="text-center">Loading...</div>

                        }

                    
                   
                  </tbody>
                </table>

                

                <h5 class="mb-0 mt-5">Hostel Request Details</h5>
                <p>List of hostel request details.</p>
                <table class="table border bg-white">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Hostel Data</th>
                     
                     
                    </tr>
                  </thead>
                  <tbody>
                  {hostelDetails.hostelName? 
                 
                    <React.Fragment>
                    <tr>
                      <td>1</td>
                      <td>{hostelDetails.hostelName}</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Room {hostelDetails.roomNumber}</td>
                    </tr>

                    <tr>
                    <td>3</td>
                    <td>{hostelDetails.level}</td>
                    </tr>

                    <tr>
                    <td>4</td>
                    <td>Semester {hostelDetails.semester}</td>
                    </tr>
                    </React.Fragment>                      
                        :
                        <div className="text-center">Loading...</div>

                        }

                  </tbody>
                </table>

              

                
               
              </div> 
            </div> 
          </div> 
        </div> 
       
       
      </main> 
            
        </React.Fragment>
    )
}

export default StaffViewClearanceDetails
