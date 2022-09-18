const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const fs = require('fs');
const formidable = require('formidable');

const USER_NAME = 'ariel0lin';
const API_KEY = '1cbe36b6765c60f779eb90524b377e1e';
var CLIENT_ID = 'vrfTsvX7LnVsValMVaxBM2PVteEaJz21DOeBvci';
var ENVIRONMENT_URL = 'https://api.veryfi.com/';

app.use('/frontend', express.static(__dirname + '/frontend'));
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/fileupload', function (req, res) {
   const form = new formidable.IncomingForm();
   form.parse(req, function (err, fields, files) {
      const file = files.img;
      if (file) {
         const fileName = file.oldFilename;
         const filePath = file.filepath;
         console.log(fileName, filePath);
         const base64str = fs.readFileSync(filePath, 'base64');
         console.log(base64str);
         var jsonData = {
            file_data: base64str,
            file_name: fileName,
            boost_mode: true,
         };
         var options = {
            method: 'POST',
            uri: ENVIRONMENT_URL + '/api/v8/partner/documents/',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               'CLIENT-ID': CLIENT_ID,
               AUTHORIZATION: `apikey ${USER_NAME}:${API_KEY}`,
            },
            json: jsonData,
         };
         request(options, function (error, response, body) {
            console.log(error, response, body);
         });
      }
   });
});

app.get('/getAllReceipts', function (req, res) {
   var options = {
      method: 'GET',
      uri: ENVIRONMENT_URL + '/api/v8/partner/documents/',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         'CLIENT-ID': CLIENT_ID,
         AUTHORIZATION: `apikey ${USER_NAME}:${API_KEY}`,
      },
   };
   request(options, function (error, response, body) {
      res.send(response);
   });
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
