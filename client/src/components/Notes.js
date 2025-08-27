import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/noteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
   const { notes, getNotes, editNotes } = useContext(noteContext);
   let history = useNavigate();

   useEffect(() => {
      if (localStorage.getItem('token')) {
         getNotes()
      } else {
         history("/Login");
      }
      // eslint-disable-next-line
   },[])
   

   const ref = useRef(null);
   const refClose = useRef(null);

   const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

   const updateNote = (currentNote) => {
      console.log("upadte button clicked");
      ref.current.click();
      setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
      props.showAlert("success", "Successful Updated");
   }




   const handleClick = (e) => {
      console.log("clickhandle")
      editNotes(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      setNote({ id: "", etitle: "", edescription: "", etag: "" })

   }

   const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
   }
   return (

      <>
         <AddNotes />

         <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit Note
         </button>
         <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Please Edit Your Notes: </h5>

                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="mb-3">
                           <label htmlFor="etitle" className="form-label">Edit Title: </label>
                           <input type="text" className="form-control" placeholder="Title" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />

                        </div>
                        <div className="mb-3">
                           <label htmlFor="description" className="form-label">Edit Description: </label>
                           <input type="text" className="form-control" placeholder='Min length should be 5' id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                           <label htmlFor="tag" className="form-label">Edit Tag: </label>
                           <input type="text" className="form-control" placeholder="Tag" id="etag" name='etag' value={note.etag} onChange={onChange} />
                        </div>

                     </form>
                  </div>
                  <div className="modal-footer">
                     <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                  </div>
               </div>
            </div>
         </div>

         <div className="container row my-3">
            <h4>Your Notes: </h4>
            <div className="container"><small>{notes.length === 0 && 'Sorry! No Notes To Display'}</small></div>

            {Array.isArray(notes) && notes.map((note) => {
               return <NoteItem key={note._id} updateNote={updateNote} note={note} />
            })}
         </div>
      </>
   );
};

export default Notes;
