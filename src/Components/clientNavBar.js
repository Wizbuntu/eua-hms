import React from 'react'


// react router dom
import {Link} from 'react-router-dom'

const StudentNavbar =() => {

    return (
        <React.Fragment>

                <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="#">
                <img src="/assets/images/eua-logo.png" className="mr-2" style={{height:50, width:50}}></img>
                    Evangel University Akaeze
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto mr-4">
                    <li class="nav-item active mr-3">
                        <Link to="/" class="nav-link">Home <span class="sr-only">(current)</span></Link>
                    </li>
                    <li class="nav-item mr-3">
                        <a class="nav-link" href="#">About</a>
                    </li>

                    <li class="nav-item mr-3">
                        <Link to="/staff/login" class="nav-link">Staff Login</Link>
                    </li>
                   
                    
                    </ul>
                    
                </div>
                </nav>


               
              
        </React.Fragment>
    )
}

export default StudentNavbar
