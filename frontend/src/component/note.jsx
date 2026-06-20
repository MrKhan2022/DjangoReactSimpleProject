import React from "react";
import '../style/Note.css'

function Note({note, onDelete}){
    const d = new Date(note.created).toLocaleDateString("en-US")
    return <div className="NoteArea">
        <p className="noteTitle">{note.title}</p>
        <p className="noteContent">{note.content}</p>
        <p className="noteDate">{d}</p>
        <button className="noteDelete" onClick={()=> onDelete(note.id)}>Delete</button>
    </div>
}

export default Note