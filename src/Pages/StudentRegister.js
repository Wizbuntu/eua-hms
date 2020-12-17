import React, {useState} from 'react'

// firebase app
import app from '../utils/firebaseConfig'


// react router dom
import {useHistory, Link} from 'react-router-dom'

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function StudentRegister() {


    // init Student Register State
    const [studentRegisterData, setStudentRegisterData] = useState({
        email: "",
        regNo: "",
        firstName: "",
        middleName: "",
        lastName: "",
        college: "",
        department: "",
        course: "",
        password: "",
        gender: "",
        registerBtnText: "Register"

    })

    const history = useHistory()

    // destructure student register data
    const {email, regNo, firstName, gender, middleName, lastName, college, course, department, password, registerBtnText} = studentRegisterData


    // handle Change
    const handleChange = (data) => (e) => {
        setStudentRegisterData({...studentRegisterData, [data]: e.target.value})

       
    }


    // handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // set register button text to loading
        setStudentRegisterData({...studentRegisterData, registerBtnText: "Loading..."})


        // validate
        if(!email) {
            // set register button text to register
            setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
            return toast.error("Please enter email address")
        }

        if(!firstName) {
             // set register button text to register
             setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
            return toast.error("Please enter first name")
        }

        if(!lastName) {
             // set register button text to register
             setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
            return toast.error("Please enter last name")
        }

        if(!regNo) {
             // set register button text to register
             setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
            return toast.error("Please enter registration number")
        }

        if(!college) {
             // set register button text to register
             setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
            return toast.error("Please select college")
        }
        if(!department) {
             // set register button text to register
             setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
            return toast.error("Please select department")
        }
        if(!course) {
             // set register button text to register
             setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
            return toast.error("Please select course")
        }
        if(!password) {
             // set register button text to register
             setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
            return toast.error("Please enter password")
        }
        if(!gender) {
            // set register button text to register
            setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
           return toast.error("Please select gender")
       }



        // get studentRegister Data
        const studentRegData = {
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            regNo: regNo,
            email: email,
            course: course,
            college: college,
            department: department,
            gender: gender

        }

        // check student registration number exist
        app.database().ref('StudentData').orderByChild('regNo').equalTo(regNo).on('value', (snapshot) => {
            if(snapshot.val() !== null) {
                 // set register button text to register
                setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})


                // init studentData uid
                let studentDatauid;


                 // check if student is registered
                Object.keys(snapshot.val()).map((key, index) => {
                    if(snapshot.val()[key].registered) {
                        return toast.error("Student has already been registered")
                    } else {
                        studentDatauid = key
                    }
                })


                console.log(studentDatauid)

                if(studentDatauid) {
               
                // create user with email and password
                app.auth().createUserWithEmailAndPassword(email, password)
                .then((data) => {

                    // create student database using user id
                    const rootRef = app.database().ref().child("Student")

                    // create a user Ref
                    const userRef = rootRef.child(data.user.uid)

                    // update data to database
                    userRef.set(studentRegData, (error) => {
                        if (error) {
                            // set register button text to register
                            setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
                            console.log(error)
                           
                        } else {
                             // set register button text to register
                            setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})

                            // set registered true to student Data
                            const registeredData = {
                                registered: true
                            }

                           
                                app.database().ref().child(`StudentData/${studentDatauid}`).update(registeredData, (error) => {
                                    if(error) {
                                        // set register button text to register
                                        setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
                                        console.log(error)
                                        
                                    
                                    }

                                    // set register button text to register
                                    setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
                                    
                                    // push to login
                                    history.push('/student/login')
                                })
                            
                            
                        }

                    })
                })
                .catch((error) => {
                    console.log(error)
                   
                })
            }else {
                console.log("Student has been registered")
            }
            

            } else {
                 // set register button text to register
                 setStudentRegisterData({...studentRegisterData, registerBtnText: "Register"})
                return toast.error("Oops! Student does not exist")
            }
        })


    }

    return (
        <React.Fragment>
            <ToastContainer/>

                <div className="wrapper vh-100">
                <div className="row align-items-center h-100">
                    <form onSubmit={handleSubmit} className="col-lg-6 col-md-8 col-10 mx-auto">
                    <div className="mx-auto text-center my-4">
                    <img src="/assets/images/eua-logo.png" style={{display: 'block', margin: "auto"}}></img>
                        <a className="navbar-brand mx-auto mt-2 flex-fill text-center">
                        <h2 className="my-3">Student Register</h2>
                        </a>
                       
                    </div>
                    <div className="form-row">

                            {/* Email Address */}
                            <div className="form-group col-md-6">
                                <label for="email">Email</label>
                                <input onChange={handleChange('email')} name="email" type="email" className="form-control" id="email" />
                            </div>

                                {/* Registration Number */}
                            <div className="form-group col-md-6">
                                <label for="regNo">Registration Number</label>
                                <input onChange={handleChange('regNo')} name="regNo" type="text" className="form-control" id="regNo" />
                            </div>
                    </div>
                   
                    <div className="form-row">
                        {/* first Name */}
                        <div className="form-group col-md-4">
                        <label for="firstname">Firstname</label>
                        <input value={firstName} onChange={handleChange('firstName')} name="firstName" type="text" id="firstname" className="form-control" />
                        </div>
                        {/* Middle Name */}
                        <div className="form-group col-md-4">
                        <label for="firstname">Middle Name</label>
                        <input value={middleName} onChange={handleChange('middleName')} name="middleName" type="text" id="middlename" className="form-control" />
                        </div>
                        {/* Last Name */}
                        <div className="form-group col-md-4">
                        <label for="lastname">Lastname</label>
                        <input value={lastName} onChange={handleChange('lastName')} name="lastName" type="text" id="lastname" className="form-control" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label for="gender">Gender</label>
                            <select onChange={handleChange('gender')} className="form-control" id="gender">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                         
                            </select>

                        </div>
                    </div>
                        <div className="form-row">
                        {/* College */}
                        <div className="form-group col-md-4">
                        <label for="college">College</label>
                        <select onChange={handleChange('college')} className="form-control" id="college">
                          <option value="">Select College</option>
                          <option value="Science">Science</option>
                         
                        </select>
                        </div>
                        {/* Department */}
                        <div className="form-group col-md-4">
                        <label for="department">Department</label>
                        <select  onChange={handleChange('department')} className="form-control" id="department">
                          <option value="">Select Department</option>
                          <option value="Computer Science &amp; Mathematics">Computer Science &amp; Mathematics</option>
                        </select>
                        </div>

                        {/* Course */}
                        <div className="form-group col-md-4">
                        <label for="course">Course</label>
                        <select onChange={handleChange('course')} className="form-control" id="course">
                          <option value="">Select Course</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Mathematics">Mathematics</option>
                         
                        </select>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="form-row">
                        {/* Password */}
                        <div className="form-group col-md-12">
                        <label for="password">Password</label>
                        <input value={password} onChange={handleChange('password')} name="password" type="password" id="password" className="form-control" />
                        </div>
                       
                    </div>
                    
                    <button className="btn btn-lg btn-primary btn-block" type="submit">{registerBtnText}</button>
                    <Link className="mt-5" to="/student/login">Already have an account? Login</Link>
                    <p className="mt-5 mb-3 text-muted text-center">© 2020</p>
                    </form>
                </div>
                </div>
                
        </React.Fragment>
    )
}

export default StudentRegister
