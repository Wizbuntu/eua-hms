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



const ViewHostel = () => {


     // init userAuthenticated
   const [userAuthenticated, setUserAuthenticated] = useState(false)

   // users state
   const [hostelRooms, setHostelRooms] = useState({})


   // init history
   const history = useHistory()


  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if(!user) {

          // return to login
          return history.push({pathname: '/staff/login'}) 
      } else {
         
         setUserAuthenticated(true)

       //   Fetch all users
       app.database().ref().child("HostelRoom").on("value", (snapshot) => {
           if(snapshot.val()) {
               // update setUser list 
               setHostelRooms(snapshot.val())

               console.log(snapshot.val())
           }
       })

      }
  })
  }, [])


        // handle delete user
        const deleteHostelRoom = (uid) => {
            app.database().ref().child(`HostelRoom/${uid}`).remove((error) => {
              if(error) {
                console.log(error)
                return toast.error("Oops! An error has occured")
              }

              return toast.success("Hostel and Room deleted successfully")
            })
        }


         // Filter clearance request function
      const filterHostelRoom = (filterText) => {
        if(filterText) {
            // Filter clearance request by status
            app.database().ref('HostelRoom').orderByChild('status').equalTo(filterText).on("value", (snapshot) => {
              if(snapshot.val()) {
                
                // Update hostel
                setHostelRooms(snapshot.val())
              } else {
                    // update rooms with empty object
                    setHostelRooms({})
              }
            })
        } else {
          // update hostel rooms
            app.database().ref().child("HostelRoom").on("value", (snapshot) => {
              if(snapshot.val()) {
                  // update set Hostel Rooms
                  setHostelRooms(snapshot.val())

                  console.log(snapshot.val())
              }
          })
        }
       
    }
    

    return (
        <React.Fragment>
            <NavBar/>
            <ToastContainer/>
            <StaffSidebar/>

            <div class="wrapper">

            <main role="main" class="main-content">
            <div class="container-fluid">
            <div class="row justify-content-center">
            <div class="col-12">
              <div class="row align-items-center my-4">
                <div class="col">
                  <h2 class="h3 mb-0 page-title">Clearance Requests</h2>
                </div>
              
              </div>
            
              <div class="card shadow">
                <div class="card-body">
                <div class="toolbar">
                        <form class="form">
                          <div class="form-row">
                            <div class="form-group col-auto mr-auto">
                              <select onChange={(e) => filterHostelRoom(e.target.value)} class="custom-select mr-sm-2" id="inlineFormCustomSelectPref1">
                                <option value="">Select Availability</option>
                                <option value="Available">Available</option>
                                <option value="Occupied">Occupied</option>
                               
                               
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
      <table class="table table-borderless table-hover">
        <thead>
          <tr>
           
            <th>S/N</th>
            <th>Hostel Name</th>
            <th>Room Number</th>
            <th>Designation</th>
            <th>Available</th>
            <th>Allocated</th>
            <th>Maximum Allocation</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hostelRooms? 

          Object.keys(hostelRooms).map((key, index) => {
           return <tr key={key}>
              <td>
                  {index+1}
              </td>
              <td>
              <p class="mb-0 text-muted"><a href="#"><strong>{`${hostelRooms[key].hostelName? hostelRooms[key].hostelName: "Nil"} `}</strong></a></p>
              </td>
              <td>
                <p class="mb-0 text-muted"><strong>{hostelRooms[key].roomNumber? hostelRooms[key].roomNumber : "Nil"}</strong></p>
              
              </td>
              <td>
                <p class="mb-0 text-muted">{hostelRooms[key].designation? hostelRooms[key].designation : "Nil"}</p>
                
              </td>
              <td>
                <p class="mb-0 text-muted">{hostelRooms[key].available? hostelRooms[key].available : "Nil"}</p>
                
              </td>
              <td>
                <p class="mb-0 text-muted">{hostelRooms[key].alocated}</p>
                
              </td>
              <td>
                <small class="mb-0 text-muted">{hostelRooms[key].maxAllocation? hostelRooms[key].maxAllocation : "None"}</small>
              </td>
              <td>
              <small class="mb-0 text-muted">{hostelRooms[key].status? hostelRooms[key].status : "Nil"}</small>
              </td>
              

                <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="text-muted sr-only">Action</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                            <a onClick={() => deleteHostelRoom(key)} class="dropdown-item" href="#">Remove</a>
                    </div>
                </td>
             
          </tr>
          })
        
         
          :
          <div>Loading...</div>
          }
        </tbody>
      </table>
    </div>
  </div>
 
</div>
</div> 
</div>



</main> 

</div> 
            
        </React.Fragment>
    )
}

export default ViewHostel
