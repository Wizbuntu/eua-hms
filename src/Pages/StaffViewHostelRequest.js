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



const StaffViewHostelRequest = () => {


     // init userAuthenticated
   const [userAuthenticated, setUserAuthenticated] = useState(false)

   // hostel request
   const [hostelRequests, setHostelRequests] = useState({})

   // init student data state
   const [studentData, setStudentData] = useState({})


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
       app.database().ref().child("HostelRequest").on("value", (snapshot) => {
           if(snapshot.val()) {
               // update hostel request 
               setHostelRequests(snapshot.val())

               console.log(snapshot.val())
           }
       })

      }
  })
  }, [])


        // handle delete user
        const deleteHostelRequest = (uid) => {
            app.database().ref().child(`HostelRequest/${uid}`).remove((error) => {
              if(error) {
                console.log(error)
                return toast.error("Oops! An error has occured")
              }

              return toast.success("Hostel request deleted successfully")
            })
        }


         // Filter clearance request function
      const filterHostelRequest = (filterText) => {
        if(filterText) {
            // Filter clearance request by status
            app.database().ref('HostelRequest').orderByChild('status').equalTo(filterText).on("value", (snapshot) => {
              if(snapshot.val()) {
                
                // Update hostel request
                setHostelRequests(snapshot.val())
              } else {
                    // update hostel request with empty object
                    setHostelRequests({})
              }
            })
        } else {
          // update clearance request with empty object
          //   Fetch all users
            app.database().ref().child("HostelRequest").on("value", (snapshot) => {
              if(snapshot.val()) {
                  // update setUser list 
                  setHostelRequests(snapshot.val())

                  console.log(snapshot.val())
              }
          })
        }
       
    }




    // search clearance request
    const searchHostelRequest = (searchText) => {

      if(searchText) {

          // Filter clearance request by status
          app.database().ref('HostelRequest').orderByChild('studentRegNo').equalTo(searchText).on("value", (snapshot) => {
            if(snapshot.val()) {
              
              // Update clearance request
              setHostelRequests(snapshot.val())
  
            } else {
                  // update clearance request with empty object
                  setHostelRequests({})
            }
          })

      } else {

         // update clearance request with empty object
          //   Fetch all users
          app.database().ref().child("HostelRequest").on("value", (snapshot) => {
            if(snapshot.val()) {
                // update setUser list 
                setHostelRequests(snapshot.val())

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
                  <h2 class="h3 mb-0 page-title">Hostel Requests</h2>
                </div>
              
              </div>
            
              <div class="card shadow">
                <div class="card-body">
                <div class="toolbar">
                        <form class="form">
                          <div class="form-row">
                            <div class="form-group col-auto mr-auto">
                              <label class="my-1 mr-2 sr-only" for="inlineFormCustomSelectPref1">Show</label>
                              <select onChange={(e) => filterHostelRequest(e.target.value)} class="custom-select mr-sm-2" id="inlineFormCustomSelectPref1">
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Cleared">Successful</option>
                                <option value="Rejected">Declined</option>
                               
                              </select>
                            </div>

                            
                            
                            <div class="form-group col-auto">
                             
                              <input type="text" onChange={(e) => searchHostelRequest(e.target.value)} class="form-control" id="search1" placeholder="Search By Reg No"/>
                            </div>
                          </div>
                        </form>
                      </div>
      <table class="table table-borderless table-hover">
        <thead>
          <tr>
           
            <th>S/N</th>
            <th>Name</th>
            <th>Reg No</th>
            <th>Course</th>
            <th>Level</th>
            <th>Semester</th>
            <th>gender</th>
            <th>Hostel Name</th>
            <th>Room Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hostelRequests? 

          Object.keys(hostelRequests).map((key, index) => {
           return <tr key={key}>
              <td>
                  {index+1}
              </td>
              <td>
              <p class="mb-0 text-muted"><Link to={`/staff/view/hostel/details/${key}`}><strong>{`${hostelRequests[key].studentFirstName? hostelRequests[key].studentFirstName: "Nil"} ${hostelRequests[key].studentLastName? hostelRequests[key].studentLastName: "Nil"}`}</strong></Link></p>
              </td>
              <td>
                <p class="mb-0 text-muted"><strong>{hostelRequests[key].studentRegNo? hostelRequests[key].studentRegNo : "Nil"}</strong></p>
              
              </td>
              <td>
                <p class="mb-0 text-muted">{hostelRequests[key].studentCourse? hostelRequests[key].studentCourse : "Nil"}</p>
                
              </td>
              <td>
                <p class="mb-0 text-muted">{hostelRequests[key].level? hostelRequests[key].level : "Nil"}</p>
                
              </td>
              <td>
                <small class="mb-0 text-muted">{hostelRequests[key].semester? hostelRequests[key].semester : "None"}</small>
              </td>

              <td>
                <small class="mb-0 text-muted">{hostelRequests[key].studentGender? hostelRequests[key].studentGender : "None"}</small>
              </td>

              <td>
                <small class="mb-0 text-muted">{hostelRequests[key].hostelName? hostelRequests[key].hostelName : "None"}</small>
              </td>

              <td>
                <small class="mb-0 text-muted">{hostelRequests[key].roomNumber? hostelRequests[key].roomNumber : "None"}</small>
              </td>

             
              {hostelRequests[key].status === "Pending" ?  <td><span class="badge badge-warning">Pending</span></td> : 
                  hostelRequests[key].status === "Rejected" ? <td><span class="badge badge-danger">Declined</span></td> : 
                  <td><span class="badge badge-success">Successful</span></td>
              }

                <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="text-muted sr-only">Action</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                            <a onClick={() => deleteHostelRequest(key)} class="dropdown-item" href="#">Remove</a>
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

export default StaffViewHostelRequest
