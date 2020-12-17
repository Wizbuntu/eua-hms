import React, {useEffect, useState, useRef} from 'react'


// NavBar
import StudentNavbar from '../Components/StudentNavbar'

// Sidebar
import StudentSidebar from '../Components/StudentSidebar'

// firebase app
import app from '../utils/firebaseConfig'

// react router dom
import {useHistory, Link} from 'react-router-dom'

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const CreateHostelRequest = () => {


     // init userAuthenticated
        const [userAuthenticated, setUserAuthenticated] = useState(null)

          // init student data state
        const [studentData, setStudentData] = useState({})

        // init Hostel Data

        const [hostelData, setHostelData] = useState({})


        // init history
        const history = useHistory()


        useEffect(() => {
            app.auth().onAuthStateChanged((user) => {
            if(!user) {

                // return to login
                return history.push({pathname: '/student/login'}) 
            } else {
                
                setUserAuthenticated(user.uid)

                // get current authenticated student details
            app.database().ref().child(`Student/${user.uid}`).on("value",(snapshot) => {
                if(snapshot.val()) {
                    setStudentData(snapshot.val())
                    

                    // fetch available hostels
                    app.database().ref('HostelRoom').orderByChild('status').equalTo("Available").on("value", (snapshot) => {
                        if(snapshot.val()) {
                            // update hostel data
                            setHostelData(snapshot.val())
                        }
                    })
                }
            })

            }
        })
        }, [])


   
        // init reciept document state
        const [recieptDocuments, setRecieptDocuments] = useState([])


        // init hostel request state
        const [hostelRequest, setHostelRequest] = useState({
            level: "",
            semester: "",
            hostelName: "",
            roomNumber: "",
            message: ""   
        })


        // destructure
        const {level, semester, message, hostelName, roomNumber} = hostelRequest


        //  init createClearanceBtn state
        const [Loading, setLoading] = useState(false)
        
      

        const RecieptDocumentWidget = () => {
            window.cloudinary.openUploadWidget({ cloud_name: "drfztez7u", upload_preset: "yypbmjlq", tags:['documents']},
                function(error, results) {

                    if(error) {
                        console.log(error)
                       
                    }
                    // init empty array
                    const recieptDoc = []

                    // save result in state
                    if(results) {
                    //  iterate 
                    results.map((result) => {
                        // push to empty array 
                        recieptDoc.push(result.url)

                        console.log(recieptDoc)

                        // update personal Documents
                        setRecieptDocuments([...recieptDocuments, ...recieptDoc])
                       
                    })
                    }
                    

                }); 
        }



        // handle change 
        const handleChange = (data) => (e) => {
            setHostelRequest({...hostelRequest, [data]: e.target.value})

            console.log(hostelRequest)
        }




        // handle submit course request
        const HostelRequestSubmit = () => {
            // set Loading to true
            setLoading(true)
           

            if(recieptDocuments.length === 0) {
                // set Loading to false
                setLoading(false)
                return toast.error("Please upload scanned copies of reciepts")
            }

            // validate
            if(!level) {
                return toast.error("Please select level")
            }

            if(!semester) {
                return toast.error("Please select Semester")
            }

            if(!hostelName) {
                return toast.error("Please select Hostel Name")
            }

            if(!roomNumber) {
                return toast.error("Please select Room Number")
            }




            // get course request data
            const hostelRequestData = {
                recieptDocuments,
                hostelName: hostelName,
                roomNumber: roomNumber,
                level: level,
                semester: semester,
                message: message,
                studentUid: userAuthenticated,
                studentFirstName: studentData.firstName,
                studentLastName: studentData.lastName,
                studentRegNo: studentData.regNo,
                studentCourse: studentData.course,
                studentDepartment: studentData.department,
                studentGender: studentData.gender,
                status: "Pending",
                createdAt: new Date().toDateString()
            }


            console.log(hostelRequestData)

            //push to database
            app.database().ref().child('HostelRequest').push(hostelRequestData, (error) => {
                if(error) {
                     // set Loading to false
                setLoading(false)
                return toast.error("Oops! An error has occured")
                }
                
                // set Loading to false
                setLoading(false)
                return toast.success("Hostel Request Uploaded successfully")
            })
            
        }

    
       

    return (
        <React.Fragment>

            <StudentNavbar/>
            <StudentSidebar/>
            <ToastContainer/>

                <main role="main" className="main-content">
                    <div className="container-fluid">

                    {/* Reciept upload */}
                    <div className="row justify-content-center">
                        <div className="col-12">
                        <h2 className="h5 page-title">Reciepts</h2>
                        <p className="text-muted">You are required to upload scanned copies of your original reciepts</p>
                            {/* Personal Documents Card */}
                        <div className="card shadow mb-4"  onClick={() => RecieptDocumentWidget()} style={{cursor: "pointer"}}>
                            <div className="card-body text-center">
                            <a href="#!" className="avatar avatar-lg">
                            <span className="fe fe-32 fe-upload text-muted mb-0"></span>
                            </a>
                            <div className="card-text my-2">
                                <strong className="card-title my-0">Upload Reciepts </strong>
                               
                                <p className="small"><span className="badge badge-dark"  style={{fontSize: 15}}>{recieptDocuments? `${recieptDocuments.length} reciepts uploaded`: "No reciepts uploaded"}</span></p>
                            </div>
                            </div> 
                           
                        </div> 
                        </div> 
                        
                    </div> 


                    {/* Form */}
                    <form>
                            <hr class="my-4" />
                

                            <div className="form-row">
                                    {/* Level */}
                                    <div className="form-group col-md-6">
                                        <label for="college">Level</label>
                                        <select onChange={handleChange('level')} className="form-control" id="level">
                                        <option value="">Select Level</option>
                                        <option value="100L">100L</option>
                                        <option value="200L">200L</option>
                                        <option value="300L">300L</option>
                                        <option value="400L">400L</option>
                                        <option value="500L">500L</option>
                                        <option value="600L">600L</option>

                                        
                                        </select>
                                    </div>


                                {/* Semester */}
                                <div className="form-group col-md-6">
                                        <label for="college">Semester</label>
                                        <select onChange={handleChange('semester')} className="form-control" id="semester">
                                        <option value="">Select Semester</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        
                                        </select>
                                </div>
                            </div>
                            

                            <div className="form-row">
                                {/* Hostel */}
                                <div className="form-group col-md-6">
                                            <label for="college">Hostel Name / Room Number</label>
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
                                <div className="form-group col-md-6">
                                            <label for="college">Room Number</label>
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

                            <div className="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="firstname">Message (Only for change of hostel)</label>
                                        <input value={message}  onChange={handleChange('message')} name="message" type="text" id="message" class="form-control" />
                                    </div>
                            </div>
                        </form>


                    <div className="row justify-content-center">
                        <div className="col-12">
                            {Loading? <button className="btn mb-2 btn-primary btn-lg btn-block" disabled>Loading...</button> :
                                  <button onClick={() => HostelRequestSubmit()} type="button" className="btn mb-2 btn-primary btn-lg btn-block">Submit</button>
                            }
                      
                        </div>
                    </div>
                    </div>    
                </main> 
            
        </React.Fragment>
    )
}

export default CreateHostelRequest
