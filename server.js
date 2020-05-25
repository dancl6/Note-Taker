// make available node.js modules
const fs = require('fs');
const path = require('path');
const express = require('express');

// make avialalbe notes.json database
var { db } = require('./db/db');

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
  res.json(db);
})

// post route to server to save notes
app.post("/api/notes", (req, res) => {
  let length = db.length;
  let newId = length;
  newId = newId.toString();
  let reqB = req.body; 
  db.push({title: reqB.title, text: reqB.text, id: newId});  
  // return notes;
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ db }, null, 2)
  );
  res.json(db);
})

// delete route to server to delete notes
app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params.id);
  db[req.params.id] = null;
  // delete key from notes.json
  delete db[req.params.id];
  // filter out empty keys from notes.json
  var filtered = db.filter(function(el){
    return el !=  null;
  })  
  console.log(filtered);  
  // re-order id's for notes.json
  for (let i = 0 ; i< filtered.length; i++) {
    let j = i.toString()
    filtered[i].id = j;
  }
  db = filtered;
  console.log(filtered);
  // write out new notes.json
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ db }, null, 2)
  );
  res.json(db);
})


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});