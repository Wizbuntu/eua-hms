import React, {useState} from 'react'

// react router dom
import {useHistory, Link} from 'react-router-dom'

// firebase app
import app from '../utils/firebaseConfig'

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const StaffLogin = () => {

    // init login data state
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        loginBtn: "Login"
    })

    // init history
    const history = useHistory()

    // destructure login Data
    const {email, password, loginBtn} = loginData



    // handle Change
    const handleChange = (data) => (e) => {
        setLoginData({...loginData, [data]: e.target.value})

      
    }

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // set login btn to loading
        setLoginData({...loginData, loginBtn: "Loading..."})

        // validate data
        if(!email) {
            return toast.error("Please enter email")
        }

        if(!password) {
            return toast.error("Please enter password")
        }

        // firebase sign in staff
         // sign in
         app.auth().signInWithEmailAndPassword(email, password)
         .then((success) => {
              // set login btn to loading
            setLoginData({...loginData, loginBtn: "Login"})
             // redirect user to dashboard
             history.push('/staff/dashboard')
 
         })
         .catch((error) => {
             // set login btn to loading
             setLoginData({...loginData, loginBtn: "Login"})
             console.log(error)
             return alert(error.message)
         })
        
       
    }

    return (
        <React.Fragment>
                <ToastContainer/>
                <div className="wrapper vh-100" style={{overflow: "auto"}}>
                <div className="row align-items-center h-100">
                    <form onSubmit={handleSubmit} className="col-lg-3 col-md-4 col-10 mx-auto text-center">
                    <img src="/assets/images/eua-logo.png" style={{display: 'block', margin: "auto"}}></img>
                    <a className="navbar-brand mx-auto mt-2 flex-fill text-center">
                       <h2>Hostel Management System</h2>
                    </a>
                    <h1 className="h5 mb-3">Porter/Admin Login</h1>
                    <div className="form-group">
                       
                        <input onChange={handleChange('email')} name="email" type="email" id="inputEmail" className="form-control form-control-lg" placeholder="Email Address" required="" autofocus="" />
                    </div>
                    <div className="form-group">
                      
                        <input onChange={handleChange('password')} name="password" type="password" id="inputPassword" className="form-control form-control-lg" placeholder="Password" required="" />
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">{loginBtn}</button>
                    <Link className="mt-5" to="/student/login">Are you a student? Login</Link>
                    <p className="mt-5 mb-3 text-muted">© 2020</p>
                    </form>
                </div>
                </div>
            
        </React.Fragment>
    )
}

export default StaffLogin
