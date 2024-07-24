import { useContext, useState } from "react";
import NoteContext from "./noteContext";
import { APICall } from "../../Helpers/HelperFunction.js";
import alertContext from "../alerts/alertContext.js";

const NoteState = (props) => {
  const theme1 = { color: "bg-dark" };
  const [theme, setTheme] = useState(theme1);

  const { showAlert } = useContext(alertContext);

  const updateTheme = (themeClass) => {
    setTheme({ color: themeClass });
  };

  const [notes, setNotes] = useState([]);

  // Get all notes
  const handleGetNote = async () => {
    // todo api call
    const response = await APICall("notes/fetchallnotes", "GET", "", {});

    if (response) {
      setNotes(response);
    }
  };
  // Add a note
  const handleAddNote = async (title, description, tag) => {
    const response = await APICall("notes/addnote", "POST", "", {
      title,
      description,
      tag,
    });
    // todo api call
    if (response.status) {
      setNotes(notes.concat(response.savedNote));
      showAlert("Note created", "success");
    } else {
      showAlert("Failed Note creation", "danger");
    }
  };

  // Edit a Note
  const handleEditNote = async (id, title, description, tag) => {
    const response = await APICall("notes/updatenote", "PUT", `/${id}`, {
      title,
      description,
      tag,
    });
    if (response) {
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id == id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      showAlert("Edit note successfully", "success");
    }
  };

  // Delete a Note
  const handleDelete = async (id) => {
    const response = await APICall("notes/deletenote", "DELETE", `/${id}`, {});

    if (response.Success) {
      const filteredNotes = notes.filter((note) => note._id !== id);

      setNotes(filteredNotes);
      showAlert("Note deleted successfully", "success");
    } else {
      showAlert("Error deleting", "danger");
    }
  };

  return (
    <NoteContext.Provider
      value={{
        theme,
        updateTheme,
        notes,
        setNotes,
        handleAddNote,
        handleEditNote,
        handleDelete,
        handleGetNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
