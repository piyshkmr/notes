import React, { useState } from "react";
import "./form.css";
import { v4 as uuid } from "uuid";

function Form({ selectedNote, addNote, updateNote }) {
  const [note, setNote] = useState({
    title: selectedNote.title,
    content: selectedNote.content,
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setNote((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function submitForm(e) {
    e.preventDefault();
    if (!note.title || !note.content) return;
    // if note id exixts update note
    if (selectedNote.id) {
      note.id = selectedNote.id;
      note.date = selectedNote.date;
      updateNote(note);
      return;
    }
    // add note
    note.id = uuid();
    note.date = todayDateString();
    addNote(note);
  }

  function todayDateString() {
    var options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    var today = new Date();

    return today.toLocaleDateString("en-US", options);
  }

  return (
    <div className="overlay">
      <form id="noteForm" onSubmit={submitForm}>
        <input
          name="title"
          value={note.title}
          onChange={handleInput}
          placeholder="Title"
          autoFocus={false}
        />
        <textarea
          rows={6}
          value={note.content}
          onChange={handleInput}
          name="content"
          placeholder="Content"
          autoFocus={false}
        ></textarea>
        <button type="submit">
          <i class="fas fa-check-circle"></i>&nbsp; Done
        </button>
      </form>
    </div>
  );
}

export default Form;
