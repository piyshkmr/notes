import React, { useEffect, useState } from "react";

import "./App.css";
import "./phone.css";
import Card from "./components/Card";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function getNotesFromLocalStorage() {
  const notesString = localStorage.getItem("notes");
  if (notesString === null) return [];
  const notesJson = JSON.parse(notesString);
  return notesJson;
}

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({ title: "", content: "" });

  // fetching notes from localStorage in start
  useEffect(() => {
    setNotes(getNotesFromLocalStorage);
  }, []);

  function deleteNote(id) {
    if (!window.confirm("Are you sure you want to delete")) return;
    setNotes((prev) => {
      return prev.filter((e) => {
        return e.id !== id;
      });
    });
  }

  function selectNote(id) {
    const note = notes.find((e) => {
      return e.id === id;
    });

    setSelectedNote(note);
    setShowForm(true);
  }

  function updateNote(note) {
    const selectedNoteIndex = notes.findIndex((e) => {
      return e.id === note.id;
    });

    notes[selectedNoteIndex] = note;

    setNotes(() => {
      return [...notes];
    });

    setShowForm(false);

    setSelectedNote({ title: "", content: "" });
  }

  function addNote(note) {
    setNotes((prev) => {
      return [...prev, note];
    });
    setShowForm(false);
  }

  // run every time when notes chnages
  useEffect(() => {
    // saved updated notes in local storage
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      {/* create form  */}
      {showForm && (
        <Form
          setShowForm={setShowForm}
          selectedNote={selectedNote}
          addNote={addNote}
          setNotes={setNotes}
          updateNote={updateNote}
        />
      )}

      {/* create button  */}
      <button onClick={() => setShowForm(!showForm)} className="create-btn">
        {showForm ? <i class="fas fa-times"></i> : <i class="fas fa-plus"></i>}
      </button>

      <Navbar />

      <main id="main">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1400: 4 }}
        >
          <Masonry gutter={14}>
            {notes.map(({ title, content, date, id }) => (
              <Card
                title={title}
                content={content}
                date={date}
                id={id}
                selectNote={selectNote}
                deleteNote={deleteNote}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </main>
    </div>
  );
};

export default App;
