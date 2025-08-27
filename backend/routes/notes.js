const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Note = require('../model/Note');
const { body, validationResult } = require('express-validator');

//Route 1: get all Note.. use auth-token of the user
//http://localhost:3000/api/notes/fetchAllNotes

router.get('/fetchAllNotes', fetchUser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error", details: error.message });
   }

})

// Route 2: add all Note.. use auth-token of the user of whome this note is..
//http://localhost:3000/api/notes/addNotes

router.post('/addNotes', fetchUser, [
   body('title', 'Title length should min 3').isLength({ min: 3 }),
   body('description', 'Description length should min 5').isLength({ min: 5 }),
],
   async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      try {
         const note = new Note({
            title, description, tag, user: req.user.id,
         })

         const saveNote = await note.save();
         res.json(saveNote);

      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Server Error", details: error.message });
      }

   })

// Route 3: updating the notes...
//http://localhost:3000/api/notes/updateNotes/688ba5df18593cd616e76f7f

router.put('/updateNotes/:id', fetchUser,
   async (req, res) => {
      const { title, description, tag } = req.body;

      // creating a newnote object...
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      //find the note and update ...
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Allowed please") };

      if (note.user.toString() !== req.user.id) { return res.status(404).send("Not Allowed") }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });

   })

// Route 4: Delete the notes...
// http://localhost:3000/api/notes/deleteNotes/688ba5df18593cd616e76f7f
router.delete('/deleteNotes/:id', fetchUser,
   async (req, res) => {

      try {
         let note = await Note.findById(req.params.id);
         if (!note) { return res.status(404).send("Not Allowed please") };

         if (note.user.toString() !== req.user.id) { return res.status(404).send("Not Allowed") }

         note = await Note.findByIdAndDelete(req.params.id)
         res.json("Success: Deleted!")
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Server Error", details: error.message });
      }

   })

module.exports = router