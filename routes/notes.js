const myNotes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

myNotes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
myNotes.get('/:note_id', (req, res) => {
  const idNote = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === idNote);
      return result.length > 0
        ? res.json(result)
        : res.json('Sorry, there is no note with this ID');
    });
});

module.exports = myNotes;