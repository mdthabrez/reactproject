const express = require('express');
const cors = require('cors'); // Import cors module
const puppeteer = require('puppeteer');
const fs = require('fs');
const handlebars = require('handlebars');

const app = express();

// Use cors middleware
app.use(cors());

app.use(express.json());

app.post('/api/form', async (req, res) => {
  const formData = req.body;
  // Do something with the form data, e.g. save to database
  console.log(formData);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Read the HTML template from a file
  const htmlTemplate = fs.readFileSync('template.hbs', 'utf-8');

  // Compile the Handlebars template with actual values
  const template = handlebars.compile(htmlTemplate);
  const data = { name: formData.name, regisNo: formData.registration, branch: formData.branch, dept: formData.dept, mobile: formData.mobile, date: formData.date,purpose: formData.purpose }; // Example data from Node.js program
  const htmlContent = template(data);

  // Set the content of the HTML file to convert
  await page.setContent(htmlContent);

  // Generate the PDF
  const pdfBuffer = await page.pdf({ format: 'A4' });

  // Close the browser
  await browser.close();

  console.log('PDF generated successfully!');

  // Send the PDF as a response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
  res.send(pdfBuffer);
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});