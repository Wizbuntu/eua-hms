import React, {useEffect, useState} from 'react'

// firebase app
import app from '../utils/firebaseConfig'
import secondaryApp from '../utils/firebaseConfigSecondary'


// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react router dom
import {useHistory, Link} from 'react-router-dom'


// NavBar
import NavBar from '../Components/NavBar'

// Sidebar
import StaffSidebar from '../Components/StaffSidebar'


const AddUser = () => {

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


        //    init user state
        const [userData, setUserData] = useState({
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            password: "",
            addUserBtn: "Add Porter"
        })

        // destructure
        const {firstName, lastName, middleName, email, password, addUserBtn} = userData


        // handle change
        const handleChange = (data) => (e) => {
            setUserData({...userData, [data]: e.target.value})

            console.log(userData)
        }

        // handle submit
        const handleSubmit = (e) => {
            e.preventDefault()

            // set add user btn 
            setUserData({...userData, addUserBtn: "Loading..."})

            // validate
            if(!firstName) {
                return toast.error("Please enter first name")
            }

            if(!lastName) {
                return toast.error("Please enter last name")
            }
            if(!email) {
                return toast.error("Please enter email address")
            }
            if(!password) {
                return toast.error("Please enter password")
            }



            // get user data
            const user_data = {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                email: email,
                admin: false
               
            }


            // create user with email and password
            secondaryApp.auth().createUserWithEmailAndPassword(user_data.email, password)
            .then((data) => {

                // create doctor profile
            const rootRef = app.database().ref().child("Porter")

            // create a user Ref
            const staffRef = rootRef.child(data.user.uid)

            // update data to database
            staffRef.set(user_data, (error) => {
                if (error) {
                     // set user data 
                    setUserData({...userData, addUserBtn: "Add Porter"})
                    return toast.error(error)
                } else {
                    // set user data 
                    setUserData({...userData, addUserBtn: "Add Porter"})

                    // sign out user
                    secondaryApp.auth().signOut();

                    // return success
                    return toast.success("Registration Successful")
                }

            })

            })
            .catch((error) => {
                 // set user data 
                setUserData({...userData, addUserBtn: "Add Porter"})
                console.log(error.message)
                return toast.error("Oops! An error has occured")
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
                  <h2 class="h3 mb-0 page-title">Add Porter</h2>
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
                    <label for="regNo">Email Address</label>
                    <input onChange={handleChange('email')} name="email" type="email" class="form-control" id="email" />
                  </div>
                 
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="regNo">Password</label>
                    <input onChange={handleChange('password')} name="password" type="password" class="form-control" id="password" />
                  </div>
                 
                </div>

              
               
                
                <hr class="my-4" />
                <div class="form-row">
                 
                   
                  <div class="col-md-6 text-right">
                    <button type="submit" class="btn btn-primary">{addUserBtn}</button>
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

export default AddUser
