import React, {useState} from 'react'

// react router dom
import {useHistory, Link} from 'react-router-dom'

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// firebase app
import app from '../utils/firebaseConfig';



const StudentLogin = () => {


    // init student login data
    const [studentData, setStudentData] = useState({
        regNo: '',
        password: '',
        loginButtonText: 'Login'
    })

    // init usehistory
    const history = useHistory()


    // destructure
    const {regNo, password, loginButtonText} = studentData


    // handle Change
    const handleChange = (data) => (e) => {
        setStudentData({...studentData, [data]: e.target.value})
    }



    // handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // set login button text to loading
        setStudentData({...studentData, loginButtonText: "Loading..."})


        // validate
        if(!regNo) {
            setStudentData({...studentData, loginButtonText: "Login"})
            return toast.error("Please enter registration number")
        }

        if(!password) {
            setStudentData({...studentData, loginButtonText: "Login"})
            return toast.error("Please enter password")
        }

        // Find student with registration number
        app.database().ref('Student').orderByChild('regNo').equalTo(regNo).on("value", (snapshot) => {
            if(snapshot.val()) {
                 // set login button text to login
                setStudentData({...studentData, loginButtonText: "Login"})

                let studentEmail;

                // Get student Email from data
                Object.keys(snapshot.val()).map((key) => {
                    studentEmail = snapshot.val()[key].email
                })

                
                // Login Student
                    app.auth().signInWithEmailAndPassword(studentEmail, password)
                    .then((success) => {
                        // redirect user to dashboard
                        history.push('/student/dashboard')

                    })
                    .catch((error) => {
                        // set login button text to login
                        setStudentData({...studentData, loginButtonText: "Login"})
                        console.log(error)
                        return toast.error(error.message)
                    })

            } else {
                 // set login button text to login
                 setStudentData({...studentData, loginButtonText: "Login"})
                console.log("Student with reg number not found")
                return toast.error("Student with reg number not found")
            }
        })
        
    }

    return (
        <React.Fragment>

            <ToastContainer/>

            <div className="wrapper vh-100" style={{overflow: "auto"}}>
                <div className="row align-items-center h-100">
                    <form onSubmit={handleSubmit} className="col-lg-3 col-md-4 col-10 mx-auto text-center">
                    <img src="/assets/images/eua-logo.png"></img>
                    <a className="navbar-brand mx-auto mt-2 flex-fill text-center">
                       <h2>Student Login</h2>
                    </a>
                    <h1 className="h5 mb-3">Sign in</h1>
                    <div className="form-group">
                       
                        <input value={regNo} name="regNo" onChange={handleChange('regNo')} type="text" className="form-control form-control-lg" placeholder="Registration Number" required="" autofocus="" />
                    </div>
                    <div className="form-group">
                      
                        <input value={password} name="password" onChange={handleChange('password')} type="password"  className="form-control form-control-lg" placeholder="Password" required="" />
                    </div>
                        <button className="btn mb-4 btn-lg btn-primary btn-block" type="submit">{loginButtonText}</button>
                    <Link className="mt-5" to="/student/register">Don't have an account? Register</Link>
                    
                    <div>
                    <Link className="mt-5" to="/staff/login">Login as Porter/Admin</Link>
                    </div>
                    <p className="mt-5 mb-3 text-muted">© 2020</p>
                    </form>
                </div>
                </div>
    
     
            
        </React.Fragment>
    )
}

export default StudentLogin
