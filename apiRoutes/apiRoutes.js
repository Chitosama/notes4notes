const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { json } = require("body-parser");

function readNote(){
  // used to debug console.log('here')

  //GET all notes for the db.json
  var data = fs.readFileSync(path.join(__dirname, "../db/db.json"));
  //parse data stream from read db file
  dataParsed = JSON.parse(data);
  //send data back to file
  return dataParsed

}

router.get("/", (req, res) => {
    res.json(readNote())
});


// could be moved in future for apiRouts file clean up
// used for creating new notes
function createNote(note) {
  var dataParsed = readNote(note);
  //added ID to be able to keep track of current and future notes
  const { id, title, text } = note;

  //ID here is used based on current limitation but with an ongoing db we could have a flag for deleted and 
  //continue to build the db without actually deleting data and be able to keep a history for true deletion on a later date.
  cur_id = dataParsed.length + 1;
  const newNote = { id : cur_id, title, text };
  // POST add new note for the db.json
  dataParsed.push(newNote);

  // used for debugging
  // console.log(dataParsed)
  // console.log(newNote)
  // console.log(id)

  // used to write new complete set of notes
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(dataParsed)
  );
}

router.post("/", (req, res) => {
  res.json(createNote(req.body));
});

router.delete("/:id", (req, res) => {
    //grab current note list
    currNote = readNote()
    //debugging console.log(currNote)

    //iterate finding matching id
    for (i=0;i<currNote.length;i++){
        if (currNote[i].id == req.params.id){
            //debugging console.log(currNote[i].id)
            //DELETE found matching id
            currNote.splice(i,1)
            //debugging console.log(currNote)
        }
    }
  //debugging console.log(currNote)

  //Update DB by overwritting
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(currNote)
  )

//debugging console.log(req.params.id)
  
//get updated view
res.json(readNote())
});

router.all('/', function(req, res, next) {
    res.send("don't do that.");
  })

module.exports = router;
