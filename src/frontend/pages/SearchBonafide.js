import React, { useState, useEffect } from "react";

import Navbar from '../components/Navbar';
import api from "../services/api";

function SearchBonafide() {
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const [filter, setFilter] = useState({
    studentName: "",
    registrationNumber: "",
    department: "",
    branch: "",
    year: "",
    purpose: ""
  });

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const res = await api.get("/getbonafide");
      const pdfs = res.data.map((pdf) => pdf);
      setPdfs(pdfs);
      setFilteredPdfs(pdfs);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePdfClick = (pdf) => {
    window.open(`http://localhost:3000/pdf/${pdf.pdf_name}`);
  };

  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const jsonData = JSON.stringify(filter);
      const headers = {
        'Content-Type': 'application/json',
      };
      console.log("jsonData",jsonData);
      const res = await api.post("/getbonafide/filter", jsonData, { headers });
      const pdfs = res.data.map((pdf) => pdf);
      setPdfs(pdfs);
      setFilteredPdfs(pdfs);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1 className="text-center my-5">PDF Viewer</h1>
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentName">Student Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentName"
                  name="studentName"
                  onChange={handleFilter}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registrationNumber">Registration Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="registrationNumber"
                  name="registrationNumber"
                  onChange={handleFilter}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department:</label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  name="department"
                  onChange={handleFilter}
                />
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branch:</label>
                <input
                  type="text"
                  className="form-control"
                  id="branch"
                  name="branch"
                  onChange={handleFilter}
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year:</label>
                <input
                  type="text"
                  className="form-control"
                  id="year"
                  name="year"
                  onChange={handleFilter}
                />
              </div>
              <div className="form-group">
                <label htmlFor="purpose">Purpose:</label>
                <input
                  type="text"
                  className="form-control"
                  id="purpose"
                  name="purpose"
                  onChange={handleFilter}
                />
              </div>

              <div className="form-group mt-3">
                <input type="submit" className="btn btn-primary mb-3" value="Submit" />
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">PDF Name</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Department</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Year</th>
                  <th scope="col">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {pdfs.map((pdf, index) => (
                  <tr key={pdf.id} onClick={() => handlePdfClick(pdf)}>
                    <th scope="row">{index + 1}</th>
                    <td>{pdf.pdf_name}</td>
                    <td>{pdf.student_name}</td>
                    <td>{pdf.student_regis}</td>
                    <td>{pdf.student_dept}</td>
                    <td>{pdf.student_branch}</td>
                    <td>{pdf.student_year}</td>
                    <td>{pdf.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBonafide;