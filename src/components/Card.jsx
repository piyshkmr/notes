import React from "react";
import "./card.css";

function Card({ title, content, date, id, deleteNote, selectNote }) {
  return (
    <div key={id} className="card">
      <div className="card-top">
        <small className="card-date">{date}</small>
        <span className="card-action">
          <i
            style={{ color: "#48dbfb" }}
            onClick={() => selectNote(id)}
            class="fas fa-edit"
          ></i>
          <i
            style={{ color: "tomato" }}
            onClick={() => deleteNote(id)}
            class="fas fa-trash"
          ></i>
        </span>
      </div>
      <h3 className="card-title">{title}</h3>

      <p className="card-content">{content}</p>
    </div>
  );
}

export default Card;
