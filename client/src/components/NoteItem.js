import React from 'react'
import { useContext} from 'react';
import noteContext from '../context/noteContext';

const NoteItem = (props) => {
   const context = useContext(noteContext)
   const { deleteNotes } = context;
   const { note,updateNote } = props;

   return (
      <div className="col-md-3" key={note._id}>
         <div className="card my-3">
            <div className="card-body">
               <h5 className="card-title">{note.title}</h5>
               <i className="far fa-trash-alt mx-2" onClick={() => { deleteNotes(note._id) }}></i>
               <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
               <p className="card-text">{note.description}</p>
               <p className="card-text"><small>Tag: {note.tag}</small></p>
            </div>
         </div>
      </div>

   )
}

export default NoteItem