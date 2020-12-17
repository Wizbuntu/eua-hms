import React, {useEffect, useState} from 'react'


// NavBar
import NavBar from '../Components/NavBar'

// Sidebar
import StaffSidebar from '../Components/StaffSidebar'

// firebase app
import app from '../utils/firebaseConfig'

// react router dom
import {useHistory, Link} from 'react-router-dom'



const StaffDashboard = () => {

  // init userAuthenticated
  const [userAuthenticated, setUserAuthenticated] = useState(false)

  // init clearance request
  const [hostelRequest, setHostelRequest] = useState({})

  // init cleared students state
  const [availableHostel, setAvailableHostel] = useState({})

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

        // fetch clearance request
        app.database().ref().child("HostelRequest").on("value", (snapshot) => {
          if(snapshot.val()) {
            // update clearance request state
            setHostelRequest(snapshot.val())

            // fetch cleared students
            app.database().ref('HostelRoom').orderByChild('status').equalTo("Available").on("value", (snapshot) => {
              if(snapshot.val()) {
                  setAvailableHostel(snapshot.val())
              } else {
                setAvailableHostel({})
              }
            })

            // fetch students data
            app.database().ref().child("StudentData").on("value", (snapshot) => {
              if(snapshot.val()) {
                // update student data state
                setStudentData(snapshot.val())
              }
            })
          }
        })

      }
  })
  }, [])

    return (
        <React.Fragment>
            <NavBar/>
            <StaffSidebar/>


            <main role="main" class="main-content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="row">
              <div class="col-md-6 col-xl-4 mb-4">
                  <div class="card shadow border-0">
                    <div class="card-body">
                      <div class="row align-items-center">
                       
                        <div class="col pr-0">
                          <p class="small text-muted mb-0">Hostel Requests</p>
                          <span class="h3 mb-0">{hostelRequest? Object.keys(hostelRequest).length : 0}</span>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-xl-4 mb-4">
                  <div class="card shadow border-0">
                    <div class="card-body">
                      <div class="row align-items-center">
                       
                        <div class="col pr-0">
                          <p class="small text-muted mb-0">Available Hotel &amp; Room</p>
                          <span class="h3 mb-0">{Object.keys(availableHostel).length}</span>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-xl-4 mb-4">
                  <div class="card shadow border-0">
                    <div class="card-body">
                      <div class="row align-items-center">
                       
                        <div class="col pr-0">
                          <p class="small text-muted mb-0">Students Data</p>
                          <span class="h3 mb-0">{Object.keys(studentData).length}</span>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
                </div>
                </div>
                </div>
                </div>
                </main>


            <div class="wrapper">
      

      <main role="main" class="main-content">
        <div class="container-fluid">
          <div class="row justify-content-center">
                
              <div class="row">
              
                <div class="col-md-12">
                  <h6 class="mb-3">Last orders</h6>
                  <table class="table table-borderless table-striped">
                    <thead>
                      <tr role="row">
                        <th>ID</th>
                        <th>Purchase Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col">1331</th>
                        <td>2020-12-26 01:32:21</td>
                        <td>Kasimir Lindsey</td>
                        <td>(697) 486-2101</td>
                        <td>996-3523 Et Ave</td>
                        <td>$3.64</td>
                        <td> Paypal</td>
                        <td>Shipped</td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span class="text-muted sr-only">Action</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="#">Edit</a>
                              <a class="dropdown-item" href="#">Remove</a>
                              <a class="dropdown-item" href="#">Assign</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">1156</th>
                        <td>2020-04-21 00:38:38</td>
                        <td>Melinda Levy</td>
                        <td>(748) 927-4423</td>
                        <td>Ap #516-8821 Vitae Street</td>
                        <td>$4.18</td>
                        <td> Paypal</td>
                        <td>Pending</td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span class="text-muted sr-only">Action</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="#">Edit</a>
                              <a class="dropdown-item" href="#">Remove</a>
                              <a class="dropdown-item" href="#">Assign</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">1038</th>
                        <td>2019-06-25 19:13:36</td>
                        <td>Aubrey Sweeney</td>
                        <td>(422) 405-2736</td>
                        <td>Ap #598-7581 Tellus Av.</td>
                        <td>$4.98</td>
                        <td>Credit Card </td>
                        <td>Processing</td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span class="text-muted sr-only">Action</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="#">Edit</a>
                              <a class="dropdown-item" href="#">Remove</a>
                              <a class="dropdown-item" href="#">Assign</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">1227</th>
                        <td>2021-01-22 13:28:00</td>
                        <td>Timon Bauer</td>
                        <td>(690) 965-1551</td>
                        <td>840-2188 Placerat, Rd.</td>
                        <td>$3.46</td>
                        <td> Paypal</td>
                        <td>Processing</td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span class="text-muted sr-only">Action</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="#">Edit</a>
                              <a class="dropdown-item" href="#">Remove</a>
                              <a class="dropdown-item" href="#">Assign</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">1956</th>
                        <td>2019-11-11 16:23:17</td>
                        <td>Kelly Barrera</td>
                        <td>(117) 625-6737</td>
                        <td>816 Ornare, Street</td>
                        <td>$4.16</td>
                        <td>Credit Card </td>
                        <td>Shipped</td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span class="text-muted sr-only">Action</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="#">Edit</a>
                              <a class="dropdown-item" href="#">Remove</a>
                              <a class="dropdown-item" href="#">Assign</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">1669</th>
                        <td>2021-04-12 07:07:13</td>
                        <td>Kellie Roach</td>
                        <td>(422) 748-1761</td>
                        <td>5432 A St.</td>
                        <td>$3.53</td>
                        <td> Paypal</td>
                        <td>Shipped</td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span class="text-muted sr-only">Action</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="#">Edit</a>
                              <a class="dropdown-item" href="#">Remove</a>
                              <a class="dropdown-item" href="#">Assign</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">1909</th>
                        <td>2020-05-14 00:23:11</td>
                        <td>Lani Diaz</td>
                        <td>(767) 486-2253</td>
                        <td>3328 Ut Street</td>
                        <td>$4.29</td>
                        <td> Paypal</td>
                        <td>Pending</td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span class="text-muted sr-only">Action</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="#">Edit</a>
                              <a class="dropdown-item" href="#">Remove</a>
                              <a class="dropdown-item" href="#">Assign</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> 
              </div> 
            </div>
            </div>
            </main>
        </div> 


            
        </React.Fragment>
    )
}

export default StaffDashboard
