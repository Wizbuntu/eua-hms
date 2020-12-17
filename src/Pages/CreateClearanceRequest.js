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





const CreateClearanceRequest = () => {


     // init userAuthenticated
        const [userAuthenticated, setUserAuthenticated] = useState(null)

          // init student data state
        const [studentData, setStudentData] = useState({})


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
                    console.log(snapshot.val())
                }
            })

            }
        })
        }, [])


        // init personal document state
        const [personalDocuments, setPersonalDocuments] = useState([])

        // init reciept document state
        const [recieptDocuments, setRecieptDocuments] = useState([])

        

         // init reciept document state
         const [courseFormDocuments, setCourseFormDocuments] = useState([])


        //  init createClearanceBtn state
        const [Loading, setLoading] = useState(false)
        
      



            // Cloudinary Upload Widget
        const personalDocumentWidget = () => {
            window.cloudinary.openUploadWidget({ cloud_name: "drfztez7u", upload_preset: "yypbmjlq", tags:['documents']},
                function(error, results) {

                    if(error) {
                        console.log(error)
                       
                    }
                    
                    const personaldoc = []
                    // save result in state
                    if(results) {
                       
                        //  iterate 
                        results.map((result) => {

                            personaldoc.push(result.url)

                            console.log(personaldoc)
                            
                            // update personal Documents
                           setPersonalDocuments([...personalDocuments, ...personaldoc])

                        
                        })
                       
                    }

                    

                }); 
        }

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


        const CourseFormDocumentsWidget = () => {
            window.cloudinary.openUploadWidget({ cloud_name: "drfztez7u", upload_preset: "yypbmjlq", tags:['documents']},
                function(error, results) {

                    if(error) {
                        console.log(error)
                       
                    }

                    // init empty array
                    const courseFormDocs = []

                    // save result in state
                    if(results) {
                    //  iterate 
                    results.map((result) => {
                         // push to empty array 
                         courseFormDocs.push(result.url)

                         console.log(courseFormDocs)
                        // update personal Documents
                        setCourseFormDocuments([...courseFormDocuments, ...courseFormDocs])
                    })
                    }
                    

                }); 
        }


        // handle submit course request
        const CourseRequestSubmit = () => {
            // set Loading to true
            setLoading(true)
            // validate 
            if(personalDocuments.length === 0) {
                // set Loading to false
                setLoading(false)
                return toast.error("Please upload the required documents")
            }

            if(recieptDocuments.length === 0) {
                // set Loading to false
                setLoading(false)
                return toast.error("Please upload scanned copies of reciepts")
            }

            if(courseFormDocuments.length === 0) {
                // set Loading to false
                setLoading(false)
                return toast.error("Please upload scanned copies of course forms")
            }

            // get course request data
            const clearanceRequestData = {
                personalDocuments,
                recieptDocuments,
                courseFormDocuments,
                studentUid: userAuthenticated,
                studentFirstName: studentData.firstName,
                studentLastName: studentData.lastName,
                studentRegNo: studentData.regNo,
                studentCourse: studentData.course,
                studentDepartment: studentData.department,
                status: "Pending",
                createdAt: new Date().toDateString()
            }


            // push to database
            app.database().ref().child('ClearanceRequest').push(clearanceRequestData, (error) => {
                if(error) {
                     // set Loading to false
                setLoading(false)
                return toast.error("Oops! An error has occured")
                }
                
                // set Loading to false
                setLoading(false)
                return toast.success("Clearance Request Uploaded successfully")
            })
            
        }

    
       

    return (
        <React.Fragment>

            <StudentNavbar/>
            <StudentSidebar/>
            <ToastContainer/>

                <main role="main" className="main-content">
                    <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12">
                        <h2 className="h5 page-title">Personal Documents</h2>
                        <p className="text-muted">You are required to upload scanned copies of the following documents: <b>Waec Result, Jamb Result, Birth Certificate, State of Origin, Admission Letter</b></p>
                            {/* Personal Documents Card */}
                        <div onClick={() => personalDocumentWidget()} style={{cursor: "pointer"}} className="card shadow mb-4">
                            <div className="card-body text-center">
                            <a href="#!" className="avatar avatar-lg">
                            <span className="fe fe-32 fe-upload text-muted mb-0"></span>
                            </a>
                            <div className="card-text my-2">
                                <strong className="card-title my-0">Upload Personal Document </strong>
                                <p className="small"><span className="badge badge-dark" style={{fontSize: 15}}>{personalDocuments !== 0? `${personalDocuments.length} documents uploaded`: "No documents uploaded"}</span></p>
                            </div>
                            </div> 
                           
                        </div> 
                        </div> 
                        
                    </div> 


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

                    <div className="row justify-content-center">
                        <div className="col-12">
                        <h2 className="h5 page-title">Course Forms</h2>
                        <p className="text-muted">You are required to upload scanned copies of your course forms (Completely filled and signed).</p>
                            {/* Personal Documents Card */}
                        <div className="card shadow mb-4" onClick={() => CourseFormDocumentsWidget()} style={{cursor: "pointer"}}>
                            <div className="card-body text-center">
                            <a href="#!" className="avatar avatar-lg">
                            <span className="fe fe-32 fe-upload text-muted mb-0"></span>
                            </a>
                            <div className="card-text my-2">
                                <strong className="card-title my-0">Upload Course Forms </strong>
                               
                                <p className="small"><span className="badge badge-dark" style={{fontSize: 15}}>{courseFormDocuments? `${courseFormDocuments.length} course form uploaded`: "No course forms uploaded"}</span></p>
                            </div>
                            </div> 
                           
                        </div> 
                        </div> 
                        
                    </div> 

                    <div className="row justify-content-center">
                        <div className="col-12">
                            {Loading? <button className="btn mb-2 btn-primary btn-lg btn-block" disabled>Loading...</button> :
                                  <button onClick={() => CourseRequestSubmit()} type="button" className="btn mb-2 btn-primary btn-lg btn-block">Submit</button>
                            }
                      
                        </div>
                    </div>
                    </div>    
                </main> 
            
        </React.Fragment>
    )
}

export default CreateClearanceRequest
