import React, {useEffect, useState} from 'react'

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


const ViewStaff = () => {

    // init userAuthenticated
   const [userAuthenticated, setUserAuthenticated] = useState(false)

    // users state
    const [userList, setUserList] = useState({})

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
        app.database().ref().child("Porter").on("value", (snapshot) => {
            if(snapshot.val()) {
                // update setUser list 
                setUserList(snapshot.val())
            }
        })
 
       }
   })
   }, [])


    // init handle Delete User
        const handleDeleteUser = (uid) => {
            app.database().ref().child(`Porter/${uid}`).remove((error) => {
                if(error) {
                  console.log(error)
                  return toast.error("Oops! An error has occured")
                }
                
                return toast.success("Porter deleted successfully")
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
                        <div class="col-12">
                        <div class="row">
                        
                            <div class="col-md-12 my-4">
                            <h2 class="h4 mb-1">Porters List</h2>
                            <div class="card shadow">
                                <div class="card-body">
                               
                                
                                <table class="table table-borderless table-hover">
                                    <thead>
                                    <tr>
                                       
                                        <th>S/N</th>
                                        <th>First Name</th>
                                        <th>Middle Name</th>
                                        <th>Last Name</th>
                                        <th class="w-25">Email Address</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(userList).map((key, index) => {
                                            return <React.Fragment key={index}>
                                                 <tr>
                                       
                                                    <td>
                                                    <p class="mb-0 text-muted"><strong>{index+1}</strong></p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 text-muted"><strong>{userList[key].firstName}</strong></p>
                                                    
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 text-muted"><strong>{userList[key].middleName}</strong></p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 text-muted"><strong>{userList[key].lastName}</strong></p>
                                                    </td>
                                                    
                                                    <td class="text-muted">
                                                        <p class="mb-0 text-muted">{userList[key].email}</p>
                                                    </td>
                                                    <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <span class="text-muted sr-only">Action</span>
                                                    </button>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                       
                                                        <a onClick={() => handleDeleteUser(key)} class="dropdown-item" href="#">Remove</a>
                                                       
                                                    </div>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        })}
                                   
                                    
                                 
                                    </tbody>
                                </table>
                                
                                </div>
                            </div>
                            </div> 
                        </div>
                        </div>
                        </div>
                        
                    </div> 
                    
                </main> 
            
        </React.Fragment>
    )
}

export default ViewStaff
