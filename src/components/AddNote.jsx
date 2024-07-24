import React, { useContext, useState } from "react";
import noteContext from "../contexts/notes/noteContext";

const AddNote = () => {
  const contextData = useContext(noteContext);
  const { handleAddNote } = contextData;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const hanldeClickAction = (e) => {
    e.preventDefault();
    handleAddNote(note.title, note.description, note.tag);
  };
  function onChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  return (
    <div className="container mb-3">
      <h4>Add Note</h4>
      <form onSubmit={hanldeClickAction}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="titleHelp"
            onChange={onChange}
            value={note.title}
            required
            minLength={5}
          />
          <div id="titleHelp" className="form-text">
            We'll never share your title with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
            required
          />
        </div>
        <div className=" w-100">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
