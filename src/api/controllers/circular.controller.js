const db = require("../models");
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken,
    bonafide: Bonafide,
    circular:Circular,
    remainders:Remainders } = db;

const fs = require('fs');
const Op = db.Sequelize.Op;

exports.createCircular = async(req, res) => {
  const pdfPath = req.body.pdfPath;
  
  try {
    const data = await fs.promises.readFile('data.json', 'utf8');
    const jsonData = JSON.parse(data);

    const insertResult = await Circular.create({
      recipient: req.body.to,
      sender: req.body.from,
      circular_date: req.body.date,
      circular_subject: req.body.subject,
      ref_no: req.body.referenceNumber,
      circular_data: req.body.pdf_Data,
      circular_name: pdfPath
    });

    console.log('Insert query executed successfully');

    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].pdfPath === pdfPath) {
        console.log('Located Record');

        if (jsonData[i].pdf_json.Event !== '') {
          console.log('Going to add remainder');

          const circularId = insertResult.circular_id;
          const currentTimestamp = new Date().toISOString();

          await Remainders.create({
            remainder: jsonData[i].pdf_json.Event,
            remainder_deadline: jsonData[i].pdf_json.Deadline,
            created_at: currentTimestamp,
            circular_id: circularId
          });

          console.log('Remainder inserted successfully');
          break;
        }
      }
    }

    res.status(200).json({ message: 'Insert successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  };

  exports.getAllCircular = (req,res) => {

    Circular.findAll()
    .then((circularData) => {
      const circularRecords = circularData.map((record) => ({
        recipient: record.recipient,
        sender: record.sender,
        circularDate: record.circular_date,
        circularSubject: record.circular_subject,
        refNo: record.ref_no,
        circularData: record.circular_data,
      }));

      res.status(200).json(circularRecords);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    });

  }