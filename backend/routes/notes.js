const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

// ROUTE 1: GET all the notes. authentication required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})
// ROUTE 2: Post add note. '/api/notes/addnote'. login required
router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Descriptin atleast 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { title, description, tag } = req.body
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      })
      const savedNote = await note.save()
      if (savedNote) {
        res
          .status(200)
          .send({ status: 'success', message: 'Saved successfully', savedNote })
        // res.json(savedNote);
      } else {
        res
          .status(500)
          .send({ status: 'error', message: 'Creating note failed' })
      }
    } catch (error) {
      res.status(500).send('Internal server error')
    }
  },
)

// Route 3: update a note. PUT '/auth/notes/update'. required login
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body
  try {
    // creating new note object
    const newNote = {}
    if (title) {
      newNote.title = title
    }
    if (description) {
      newNote.description = description
    }
    if (tag) {
      newNote.tag = tag
    }

    // find note and then update it.
    let note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(400).send('Not Found')
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed')
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    )
    res.json({ note })
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

// Route 4: delete a note. Delete '/auth/notes/deletenote/:id'. required login
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // find note and then update it.
    let note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(400).send('Not Found')
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed')
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ Success: 'Note has been deleted', note })
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

module.exports = router
