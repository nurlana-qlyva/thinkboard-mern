import Note from "../models/Note.js";

export const getAllNotes = async (_ , res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error is in getAllNotes controller" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error is in getAllNotes controller" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "succesfully created" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updatedNote) return res.status(404).json({ message: "note not found" });
    res.status(200).json({ message: "succesfully updated" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "note not found" });

    res.status(200).json({ message: "succesfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
