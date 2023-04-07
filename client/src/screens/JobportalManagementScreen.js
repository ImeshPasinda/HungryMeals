import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { addJob, deleteJobAction, getAllJobs } from './../actions/jobportalAction';

var jobDescriptions,jobsalary,joblocation;
function JobportalManagementScreen() {


    const [jobs, setJobs] = useState([]);
    const [filterdJobs, setFilterdJobs] = useState([]);
    const [searchJobs, setSearchJobs] = useState("");




    function createjob() {
        // Validate the input fields
        if (!JobTitle || !JobDescription || !Salary || !Location || !Category) {
            Swal.fire('Error', 'Please fill in all the required fields', 'error');
            return;
        }

        // Create a new job object
        const newJob = {
            jobtitle: JobTitle,
            description: JobDescription,
            salary: Salary,
            location: Location,
            category: Category,
        };

        // Add the new job to the database using Redux action
        dispatch(addJob(newJob));

        // Show success message and reset the input fields
        //Swal.fire('Success', 'New job added successfully', 'success');
        setJobTitle('');
        setJobDescription('');
        setSalary('');
        setLocation('');
        setCategory('');
    }

    useEffect(() => {

        function getJobs() {

            axios.get("/api/jobportal/getalljobs").then((res) => {
                setJobs(res.data);
                console.log(res.data)


                setFilterdJobs(res.data);


            }).catch((err) => {
                console.log(err.message)

            })
        }

        getJobs();

    }, [])


    function jobdetails(JobId) {


        axios.get("/api/jobportal/getalljobs").then((res) => {
    
          setJobs(res.data);
          console.log(JobId)
          //console.log(res.data)
    
    
          for (let index = 0; index < res.data.length; index++) {
    
            if (res.data[index]._id === JobId) {
              //console.log(res.data[index].subject)
    
              //console.log(res.data[index].message)
              jobDescriptions = res.data[index].description
              jobsalary = res.data[index].salary
              joblocation = res.data[index].location

            }
          }
    
    
    
        }).catch((err) => {
          console.log(err.message)
    
        })
      }







    //create data table
    const columns = [
        {
            name: "Job ID",
            selector: (row) => row._id,
            sortable: true
        },

        {
            name: "Job Title",
            selector: (row) => row.jobtitle,
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.category,

        },
        // {
        //     name: "Description",
        //     selector: (row) => row.description,
        // },

        // {
        //     name: "Salary",
        //     selector: (row) => row.salary,

        // },
        // {
        //     name: "Location",
        //     selector: (row) => row.location,

        // },
        // {
        //     name: "Job Details",
        //     cell: row => <button  className="btn" data-bs-toggle="modal" href="#exampleModal" role="button">View</button>

        // },
        {
            name: "Job Details",
            cell: row => <button onClick={() => { jobdetails(row._id) }} className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" role="button">View</button>

        },
        {
            name: "Update",
            cell: row => <button className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Update</button>

        },
        {
            name: "Delete",
            cell: row => <button onClick={() => { deleteJob(row._id) }} className="btn" role="button">Delete</button>


        },


    ]


    // search button
    useEffect(() => {
        const results = jobs.filter(jobs => {
            return jobs._id.toLowerCase().match(searchJobs.toLowerCase());
        });

        setFilterdJobs(results);
    }, [searchJobs]);


    //delete
    const dispatch = useDispatch();

    function deleteJob(JobId) {

        dispatch(deleteJobAction(JobId));


    }


    const [JobTitle, setJobTitle] = useState('')
    const [JobDescription, setJobDescription] = useState('')
    const [Salary, setSalary] = useState('')
    const [Location, setLocation] = useState('')
    const [Category, setCategory] = useState('')








    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='row justify-content-center'>
                <div className='col-md-9 m-3   p-0 ' >
                    <DataTable

                        title='Job Portal Management'
                        columns={columns}
                        data={filterdJobs}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search here..."
                                className='w-25 form-control'
                                value={searchJobs}
                                onChange={(e) => setSearchJobs(e.target.value)}

                            />

                        }


                    />
                    <br />
                    <br />
                    <div className='modal-footer'>
                        <div className='p-1'>
                            <button class="btn" data-bs-target="#addnewjob" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-plus" aria-hidden="true"></i>Create a New Job</button>
                        </div>

                        {/* generate report button */}
                        <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate  Report</button>
                        </div>
                        <br />
                        <div className='p-1'>
                            <button class="btn" a href="admin/jobApplicantManage"><i style={{ fontSize: '15px', color: 'white' }} aria-hidden="true"></i>Go to Job Applicants page</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* create jobs modal */}
            <div class="modal fade" id="addnewjob" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="updateemailLabel">Create New Job</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <form>


                                <div class="mb-3">
                                    <label for="job-name" class="col-form-label">Job Title:</label>
                                    <input

                                        required
                                        type="text"
                                        class="form-control"
                                        id="job-name"
                                        value={JobTitle}
                                        onChange={(e) => { setJobTitle(e.target.value) }}

                                    />
                                </div>


                                <div class="mb-3">
                                    <label for="desc" class="col-form-label">Description:</label>
                                    <input

                                        required
                                        type="text"
                                        class="form-control"
                                        id="desc"
                                        value={JobDescription}
                                        onChange={(e) => { setJobDescription(e.target.value) }}

                                    />
                                </div>


                                <div class="mb-3">
                                    <label for="customer-password" class="col-form-label">Salary:</label>
                                    <input

                                        required
                                        type="text"
                                        class="form-control"
                                        id="customer-password"
                                        value={Salary}
                                        onChange={(e) => { setSalary(e.target.value) }}

                                    />
                                </div>

                                <div class="mb-3">
                                    <label for="customer-cpassword" class="col-form-label">Location:</label>
                                    <input

                                        required
                                        type="text"
                                        class="form-control"
                                        id="customer-cpassword"
                                        value={Location}
                                        onChange={(e) => { setLocation(e.target.value) }}

                                    />
                                </div>


                                <div class="mb-3">
                                    <label for="category" class="col-form-label">Category:</label>
                                    <input

                                        required
                                        type="text"
                                        class="form-control"
                                        id="category"
                                        value={Category}
                                        onChange={(e) => { setCategory(e.target.value) }}

                                    />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">

                            <button onClick={createjob} type="button" class="btn ">Post Job</button>
                            <button type="button" class="btn " data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>






            {/* view job details model */}


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Detailed Information</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Job Description</p>

                            <p className='text-muted'>{jobDescriptions}</p>

                            <p>Salary</p>

                            <p className='text-muted'>{ jobsalary}</p>

                            <p>Location</p>

                            <p className='text-muted'>{ joblocation}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn " data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>


{/* update modal */}


















{/* generate report */}

<div class="modal fade" id="exampleModalToggleReport" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Job Portal Detailed Report</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <div class="container my-4">

                                        <div class="border p-5 mb-5">

                                            <section>
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow shadow" >
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>ACTIVE JOB VACANCIES <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }} ></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>{}</strong>
                                                                    <small class="text-success ms-2">
                                                                        <i class="fas fa-arrow-up fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>
                                                                {/* <h5 class="text-muted mb-0">11 467</h5> */}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>EXPIRED JOB VACANCIES <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>{}</strong>
                                                                    <small class="text-success ms-2">
                                                                        <i class="fas fa-arrow-up fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />
                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>

                                                                {/* <h5 class="text-muted mb-0">38 454</h5> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>Verified User Rate <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>{}%</strong>
                                                                    <small class="text-success ms-2">
                                                                        <i class="fas fa-arrow-up fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />
                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>

                                                                <h5 class="text-muted mb-0"></h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>Deleted User Accounts <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>0</strong>
                                                                    <small class="text-danger ms-2">
                                                                        <i class="fas fa-arrow-down fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>
                                                                <h5 class="text-muted mb-0"></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section>
                                                <div class="row">
                                                    <div class="col-md-8 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">

                                                                <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                                                    <li class="nav-item" role="presentation">
                                                                        <a class="nav-link active" id="ex1-tab-1" data-mdb-toggle="pill" role="tab"
                                                                            aria-controls="ex1-pills-1" aria-selected="true">Verified Users</a>
                                                                    </li>



                                                                </ul>

                                                                {/* <div className=''> {VerifiedUsers.map((names) => (
                                                                    <ol>{names}<i class="fa fa-check-circle p-1" title="Verified Customer" style={{ fontSize: '14px', color: '#00b9ff' }} aria-hidden="true"></i></ol>

                                                                ))}
                                                                </div> */}



                                                                <div class="tab-content" id="ex1-content">
                                                                    <div class="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                                                        <div id="chart-users"></div>
                                                                    </div>
                                                                    <div class="tab-pane fade" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                                                                        <div id="chart-page-views"></div>
                                                                    </div>
                                                                    <div class="tab-pane fade" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                                                                        <div id="chart-average-time"></div>
                                                                    </div>
                                                                    <div class="tab-pane fade" id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                                                                        <div id="chart-bounce-rate"></div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4 mb-4">
                                                        <div class="card mb-4">
                                                            <div class="card-body shadow">
                                                                <p class="text-center"><strong>Current period</strong></p>
                                                                <div id="pie-chart-current">0</div>
                                                            </div>
                                                        </div>

                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-center"><strong>Previous period</strong></p>
                                                                <div id="pie-chart-previous">0</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                        </div>


                                    </div>

                                </div>

                                <div class="modal-footer">
                                    <button class="btn" onClick={() => window.print()} >Print</button>
                                    <button class="btn" data-bs-toggle="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>









        </div>
    )
}

export default JobportalManagementScreen
