import React from 'react'
import noteContext from '../context/noteContext'
import { useContext, useState } from 'react'

const AddNotes = (props) => {
   const context = useContext(noteContext)
   const { addNotes } = context;

   const [note, setNote] = useState({ title: "", description: "", tag: "" })

   const handleClick = (e) => {
      e.preventDefault();
      addNotes(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" })
      if (note.description.length < 5) {
         alert("plesae give correct data")
      }
      // props.showAlert("success", "Successful Added");
   }

   const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
   }
   return (
      <div>

            <div className="container my-3 mt-5">
               <h2>Add Your Notes:</h2>
               <form>
                  <div className="mb-3">
                     <label htmlFor="title" className="form-label">Title of Your Notes: </label>
                     <input type="text" className="form-control" placeholder='Title' id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />

                  </div>
                  <div className="mb-3">
                     <label htmlFor="description" className="form-label">Description: </label>
                     <input type="text" className="form-control" placeholder='Min length should be 5' id="description" name='description' value={note.description} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                     <label htmlFor="tag" className="form-label">Tag: </label>
                     <input type="text" className="form-control" placeholder='Tag' id="tag" name='tag' value={note.tag} onChange={onChange} />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
               </form>
            </div>

      </div>
   )
}

export default AddNotes
