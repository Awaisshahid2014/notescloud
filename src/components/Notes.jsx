import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../contexts/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthState";

const Notes = () => {
  const contextData = useContext(noteContext);
  const { authToken } = useAuth();
  const { notes, handleGetNote, handleEditNote } = contextData;
  const navigate = useNavigate();
  // const token = localStorage.getItem("auth-token");
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const modalRef = useRef(null);
  const modalCloseRef = useRef(null);

  useEffect(() => {
    if (authToken) {
      handleGetNote();
    } else {
      navigate("/login");
    }
  }, [authToken]);

  const updateNote = (currentNote) => {
    modalRef.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const hanldeClickAction = (e, selectedNote) => {
    handleEditNote(
      selectedNote.id,
      selectedNote.etitle,
      selectedNote.edescription,
      selectedNote.etag
    );
    modalCloseRef.current.click();
  };
  function onChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  return (
    <section className="pt-3 container">
      <AddNote />
      <Popup
        modalRef={modalRef}
        modalCloseRef={modalCloseRef}
        hanldeClickAction={hanldeClickAction}
        onChange={onChange}
        note={note}
      />
      <h4>Your Notes</h4>
      <div className="row">
        {!notes.length ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "150px" }}
          >
            <h3>No notes to display</h3>
          </div>
        ) : (
          notes.map((note) => (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          ))
        )}
      </div>
    </section>
  );
};

export default Notes;
