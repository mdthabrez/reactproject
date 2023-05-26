import React, { useState ,useRef} from 'react';
import '../../App.css';
import Navbar from '../components/Navbar';


export default function CircularUpload() {
  const [pdfList, setPdfList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);

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
  };


  const handleNextPdf = () => {
    if (currentPdfIndex < pdfList.length - 1) {
      setCurrentPdf(pdfList[currentPdfIndex + 1]);
      setCurrentPdfIndex(currentPdfIndex + 1);
    } else {
      alert('No more PDFs to display!');
    }
  };

  const handlePrevPdf = () => {
    if (currentPdfIndex > 0) {
      setCurrentPdf(pdfList[currentPdfIndex - 1]);
      setCurrentPdfIndex(currentPdfIndex - 1);
    } else {
      alert('Already displaying the first PDF!');
    }
  };


  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const formDataObj = {};
    for (let [key, value] of formData.entries()) {
      formDataObj[key] = value;
    }
    console.log(formDataObj);
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
        <div className="container border ">

          <div className="row">
            <div class="col-md">
              <div className="form-container border">
      <form class="row g-3 p-3 needs-validation" noValidate ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="title" class="form-label">
        Title:
        <input class="form-control" type="text" name="title"  ref={formRef} />
      </label>
      <label htmlFor="referenceNo" class="form-label">
        Reference Number:
        <input class="form-control" type="text" name="referenceNumber"  ref={formRef} />
      </label>
      <label  htmlFor="from" class="form-label">
        From:
        <input class="form-control" type="text" name="from" ref={formRef} />
      </label>
      <label htmlFor="to" class="form-label">
        To:
        <input class="form-control" type="text" name="to"  ref={formRef} />
      </label>
      <label htmlFor="date" class="form-label">
        Date:
        <input class="form-control" type="date" name="date"  ref={formRef} />
      </label>
      <label  htmlFor="Seal No:" class="form-label">
        Seal Number:
        <input class="form-control" type="text" name="sealNumber"  ref={formRef} />
      </label>
      <label htmlFor="subject" class="form-label">
        Subject:
        <textarea class="form-control" name="subject"  ref={formRef}/>
      </label>
      <button class="btn btn-success " type="submit">Submit</button>
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

                <div class="d-flex justify-content-between mt-3">
                  <button className='btn btn-primary' onClick={handlePrevPdf} disabled={currentPdfIndex === 0}>
                    Previous PDF
                  </button>
                  <button  className='btn btn-primary'
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


