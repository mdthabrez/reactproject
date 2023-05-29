const db = require("../models");
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken,
    bonafide: Bonafide } = db;

const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');
const puppeteer = require('puppeteer');
const cors = require('cors');


const Op = db.Sequelize.Op;

exports.createBonafide = async (req, res) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlTemplate = fs.readFileSync('template.hbs', 'utf-8');
  const template = handlebars.compile(htmlTemplate);


  res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  console.log(req.body);
  const studentName = req.body.studentName;
  const studentRegis = req.body.studentRegis;
  const studentDept = req.body.studentDept;
  const studentBranch = req.body.studentBranch;
  const studentYear = req.body.studentYear;
  const dateOfIssue = req.body.dateOfIssue;
  const purpose = req.body.purpose;
  let pdf_data = "pdf_data";
  let pdf_name = "pdf_name";

  let pdfBuffer ="";
    const data ={
        studentName,
        studentRegis,
        studentDept,
        studentBranch,
        studentYear,
        dateOfIssue,
        purpose,
      } 


  const htmlContent = template(data);

  await page.setContent(htmlContent);

   pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  console.log('PDF generated successfully!');

   pdf_data = pdfBuffer.toString('base64');
  const timestamp = Date.now();
   pdf_name = `bonafide_${timestamp}.pdf`;

try {
  await Bonafide.create({
    student_name: studentName,
    student_regis: studentRegis,
    student_dept: studentDept,
    student_branch: studentBranch,
    student_year: studentYear,
    date_of_issue: dateOfIssue,
    purpose :purpose,
    pdf_data: pdf_data,
    pdf_name: pdf_name,
  });

  // Return a success message as a string
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
  res.status(201).send(pdfBuffer);
} catch (error) {
  console.error('Error:', error);
  res.status(500).send('Internal server error');
}
   
}

exports.getAll = async (req,res) =>{
  
    try {
      const pdfs = await Bonafide.findAll();
      res.json(pdfs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.getBonafide = (req,res) => {

  const {
    student_name,
    student_regis,
    student_dept,
    student_branch,
    student_year,
    date_of_issue,
    purpose,
  } = req.query;

  // Build the filter object based on the provided query parameters
  const filters = {
    student_name,
    student_regis,
    student_dept,
    student_branch,
    student_year,
    date_of_issue,
    purpose,
  };

  Bonafide.findAll({
    where: filters,
  })
    .then((bonafideRecords) => {
      res.status(200).json(bonafideRecords);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    });

}

exports.getBonafidefilter = async(req,res) =>{

  console.log(req.body);
  try {
    const pdfs = await Bonafide.findAll({
      where: {
        student_name: { [Op.like]: `%${req.body.studentName}%` },
        student_regis: { [Op.like]: `%${req.body.registrationNumber}%` },
        student_dept: { [Op.like]: `%${req.body.department}%` },
        student_branch: { [Op.like]: `%${req.body.branch}%` },
        student_year: { [Op.like]: `%${req.body.year}%` },
        purpose: { [Op.like]: `%${req.body.purpose}%` }
      }
    });
    res.json(pdfs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getBonafideFilename = async(req,res) =>{

  const filename = req.params['filename'];
  try {
    const bonafide = await Bonafide.findOne({
      attributes: ['pdf_data'],
      where: {
        pdf_name: filename
      }
    });

    if (!bonafide) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    const base64Code = bonafide.pdf_data;
    const pdfBuffer = Buffer.from(base64Code, 'base64');

    // Send the PDF buffer to the frontend
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}