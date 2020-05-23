const fs = require('fs');
const path = require('path');
const express = require('express');

const { notes } = require('./db/notes');
const Note = require('./lib/Note.js');

const PORT = process.env.PORT || 3004;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/assets/css/style.css"));
// });

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log(notes);
  res.json(notes);
})

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  let length = notes.length;
  console.log(length);
  let newId = length;
  newId = newId.toString();
  let reqB = req.body;
  console.log(reqB);


  notes.push({title: reqB.title, text: reqB.text, id: newId});
  console.log(notes);

 
})

// app.get('/api/test', (req, res) => {

//   let results = db;
//   console.log(" console : ");
//   // console.log(req);
//   console.log(results);
//   res.json(results);
//   // res.json(result);
  
// });

// app.post('/api/db/db', (req, res) => {
//   // set id based on what the next index of the array will be
//   req.body.id = db.length.toString();

//   // if any data in req.body is incorrect, send 400 error back
//   if (!validateNote(req.body)) {
//     res.status(400).send('The note is not properly formatted.');
//   } else {
//     const note = createNewNote(req.body, note);
//     res.json(note);
//   }
// });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});