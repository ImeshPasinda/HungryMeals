import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteApplicantAction } from '../actions/jobApplicantAction';

function JobApplicantsManagementScreen() {









  const [applicants, setApplicants] = useState([]);
  const [filterdApplicants, setFilterdApplicants] = useState([]);
  const [searchApplicant, setSearchApplicant] = useState("");




  useEffect(() => {

    function getJobs() {

      axios.get("/api/jobapply/getallApplications").then((res) => {
        setApplicants(res.data);
        console.log(res.data)


        setFilterdApplicants(res.data);


      }).catch((err) => {
        console.log(err.message)

      })
    }

    getJobs();

  }, [])



  const columns = [
    {
      name: "Applicant ID",
      selector: (row) => row._id,
      sortable: true
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,

    },
    {
      name: "Address",
      selector: (row) => row.address,
      
    },
    {
      name: "Phone No",
      selector: (row) => row.phoneNo,

    },
    {
      name: "Job Category",
      selector: (row) => row.jobCategory,

    },
    {
      name: "Delete",
      cell: row => <button onClick={() => { deleteApplicant(row._id) }} className="btn" role="button">Delete</button>


  },


  ]



    // search button
    useEffect(() => {
      const results = applicants.filter(applicants => {
          return applicants._id.toLowerCase().match(searchApplicant.toLowerCase());
      });

      setFilterdApplicants(results);
  }, [searchApplicant]);

    //delete
    const dispatch = useDispatch();

    function deleteApplicant(ApplicantId) {

        dispatch(deleteApplicantAction(ApplicantId));


    }







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

            title='Job Applicants Management'
            columns={columns}
            data={filterdApplicants}
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
                value={searchApplicant}
                onChange={(e) => setSearchApplicant(e.target.value)}

              />

            }


          />
          <br />
          <br />
          <div className='modal-footer'>
            {/* <div className='p-1'>
                            <button class="btn" data-bs-target="#addnewjob" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-plus" aria-hidden="true"></i>Create a New Job</button>
                        </div> */}

            {/* generate report button */}
            <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate  Report</button>
            </div>
            <br />
            <div className='p-1'>
              <button class="btn" a href="admin/jobportalManage"><i style={{ fontSize: '15px', color: 'white' }} aria-hidden="true"></i>Go to Job Lists </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobApplicantsManagementScreen
