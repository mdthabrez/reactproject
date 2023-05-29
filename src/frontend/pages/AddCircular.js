import React, { useState, useRef } from 'react';
import '../../App.css';
import Popup from '../components/popup.js';
import Navbar from '../components/Navbar';
import api from "../services/api";
import * as ReactBootStrap from 'react-bootstrap';

export default function CircularUpload() {
  const [pdfList, setPdfList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [popup, setPopup] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [pdfPath, setpdfPath] = useState('');
  const [error, setError] = useState('');
  const [pdf_data, setpdf_Data] = useState('');

  const handlePdfChange = (event) => {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList);
    const pdfArray = [];

    filesArray.forEach((file) => {
      if (file.type === 'application/pdf') {
        pdfArray.push(file);
      }
    });

    if (pdfArray.length === 0) {
      alert('No PDF files selected!');
      return;
    }

    setPdfList(pdfArray);
    setCurrentPdf(pdfArray[0]);
    setCurrentPdfIndex(0);
    // Reset input field values
    setReferenceNumber('');
    setFrom('');
    setTo('');
    setDate('');
    setSubject('');
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleNextPdf = () => {
    if (currentPdfIndex < pdfList.length - 1) {
      setCurrentPdf(pdfList[currentPdfIndex + 1]);
      setCurrentPdfIndex(currentPdfIndex + 1);
      // Reset input field values
      setpdfPath('');
      setpdf_Data('');
      setReferenceNumber('');
      setFrom('');
      setTo('');
      setDate('');
      setSubject('');
    } else {
      alert('No more PDFs to display!');
    }
  };

  const handlePrevPdf = () => {
    if (currentPdfIndex > 0) {
      setCurrentPdf(pdfList[currentPdfIndex - 1]);
      setCurrentPdfIndex(currentPdfIndex - 1);
      // Reset input field values
      setpdfPath('');
      setpdf_Data('');
      setReferenceNumber('');
      setFrom('');
      setTo('');
      setDate('');
      setSubject('');
    } else {
      alert('Already displaying the first PDF!');
    }
  };

  const handleReadPdf = () => {
    if (currentPdf) {
      setLoading(true);
      setpdfPath('');
      setpdf_Data('');
      setReferenceNumber('');
      setFrom('');
      setTo('');
      setDate('');
      setSubject('');
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Pdf = reader.result.replace(/^data:application\/pdf;base64,/, '');
        const requestData = { pdf: base64Pdf };
        setpdf_Data(base64Pdf);

        api
          .post('/read-pdf', requestData)
          .then((response) => {
            setLoading(false);
            setpdfPath(response.data.pdfPath);
            setJsonData(response.data.pdf_json);
            setReferenceNumber(response.data.pdf_json['Ref No']);
            setFrom(response.data.pdf_json.Sender);
            setTo(response.data.pdf_json.Recipient);
            const [day, month, year] = response.data.pdf_json.Date.split('-');
            const formattedDate = `${year}-${month}-${day}`;
            setDate(formattedDate);
            setSubject(response.data.pdf_json.Subject);
            
          })
          .catch((error) => {
            console.error('Error reading PDF:', error);
            setLoading(false);
          });
      };
      reader.readAsDataURL(currentPdf);
    } else {
      alert('No PDF selected!');
    }
  };

  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    if (!referenceNumber || !from || !to || !date || !subject) {
      setError('Enter all input fields');
      return;
    }
    const formData = new FormData(formRef.current);
    const formDataObj = {};
    for (let [key, value] of formData.entries()) {
      console.log(key);
      formDataObj[key] = value;
    }
    // Add pdfPath to formDataObj
    formDataObj.pdfPath = pdfPath;
    formDataObj.pdf_Data = pdf_data;

    console.log(formDataObj);

    api
      .post('/addcircular', formDataObj)
      .then((response) => {
        // Handle the response
      })
      .catch((error) => {
        // Handle the error
      });
  };

  return (
    <div>
      <Navbar />
      <div>
        <label htmlFor="pdf-input">Select PDF Folder:</label>
        <input
          type="file"
          id="pdf-input"
          accept="application/pdf"
          multiple
          webkitdirectory="true"
          onChange={handlePdfChange}
        />
      </div>
      {currentPdf && (
        <div className="container border">
          <div className="row">
            <div className="col-md">
              <div className="form-container border">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
                <form className="row g-3 p-3 needs-validation" noValidate ref={formRef} onSubmit={handleSubmit}>
                  <label htmlFor="referenceNo" className="form-label">
                    Reference Number:
                    <input className="form-control" type="text" name="referenceNumber" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
                  </label>
                  <label htmlFor="from" className="form-label">
                    From:
                    <input className="form-control" type="text" name="from" value={from} onChange={(e) => setFrom(e.target.value)} />
                  </label>
                  <label htmlFor="to" className="form-label">
                    To:
                    <input className="form-control" type="text" name="to" value={to} onChange={(e) => setTo(e.target.value)} />
                  </label>
                  <label htmlFor="date" className="form-label">
                    Date:
                    <input className="form-control" type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </label>
                  <label htmlFor="subject" className="form-label">
                    Subject:
                    <textarea className="form-control" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                  </label>
                  {!loading && <button className="btn btn-success" onClick={handleReadPdf}>
                        Read PDF
                      </button>}
                      {!loading && <button className="btn btn-success" onClick={togglePopup}>
                        View Text
                      </button>}
                  
                  {!loading && <button className="btn btn-success" type="submit">
                    Submit
                  </button>}
                  {loading && <ReactBootStrap.Spinner animation = "border"/>}

                  {popup && jsonData && (
                    <Popup
                      content={
                        <div className="popup-content">
                          {jsonData.Text.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                      }
                      handleClose={togglePopup}
                    />
                  )}
                </form>
              </div>
            </div>
            <div className="col-lg pb-3">
              <div>
                {currentPdf && (
                  <iframe
                    title={`PDF ${currentPdfIndex + 1}`}
                    src={`${URL.createObjectURL(currentPdf)}#page=${currentPage}`}
                    width="100%"
                    height="800px"
                  />
                )}

                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={handlePrevPdf}
                    disabled={currentPdfIndex === 0}
                  >
                    Previous PDF
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleNextPdf}
                    disabled={currentPdfIndex === pdfList.length - 1}
                  >
                    Next PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}