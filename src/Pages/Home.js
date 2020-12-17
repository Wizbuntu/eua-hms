import React from 'react'


// Client Nav
import ClientNav from '../Components/clientNavBar'

// react router dom
import {Link} from 'react-router-dom'


const Home = () => {
    return (
        <React.Fragment>
            <ClientNav/>

             {/* main content */}
             <div class="wrapper" style={{height: "80vh"}}>
                    <div class="align-items-center h-100 d-flex w-50 mx-auto">
                        <div class="mx-auto text-center">
                        <h1 class="display-1 m-0 font-weight-bolder text-muted" style={{fontSize: 30}}>Hostel Management System</h1>
                        
                        <h6 class="mb-3 text-muted">Welcome to Evangel University Akaeze Hostel Management System.</h6>
                        <Link to="/student/login" class="btn btn-lg btn-secondary px-5">Get Started</Link>
                        </div>
                    </div>
                </div>
            
        </React.Fragment>
    )
}

export default Home
