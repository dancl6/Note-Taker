// make available node.js modules
const fs = require('fs');
const path = require('path');
const express = require('express');

// make avialalbe notes.json database
var { notes } = require('./db/notes');

// make available express options
const PORT = process.env.PORT || 3004;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// provide path to index.html front end
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// provide path to notes.html front  end
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// get route to server to get notes
app.get("/api/notes", (req, res) => {  
  res.json(notes);
})

// post route to server to save notes
app.post("/api/notes", (req, res) => {
  let length = notes.length;
  let newId = length;
  newId = newId.toString();
  let reqB = req.body; 
  notes.push({title: reqB.title, text: reqB.text, id: newId});  
  // return notes;
  fs.writeFileSync(
    path.join(__dirname, "./db/notes.json"),
    JSON.stringify({ notes }, null, 2)
  );
  res.json(notes);
})

// delete route to server to delete notes
app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params.id);
  notes[req.params.id] = null;
  // delete key from notes.json
  delete notes[req.params.id];
  // filter out empty keys from notes.json
  var filtered = notes.filter(function(el){
    return el !=  null;
  })  
  console.log(filtered);  
  // re-order id's for notes.json
  for (let i = 0 ; i< filtered.length; i++) {
    let j = i.toString()
    filtered[i].id = j;
  }
  notes = filtered;
  console.log(filtered);
  // write out new notes.json
  fs.writeFileSync(
    path.join(__dirname, "./db/notes.json"),
    JSON.stringify({ notes }, null, 2)
  );
  res.json(notes);
})


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});