import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const host = "http://localhost:3000";
  const initialNotes = [];

  const [notes, setnotes] = useState(initialNotes);
  


  //get all Notes...
  const getNotes = async () => {
  const token = localStorage.getItem('token');
  console.log('Token:', token ? 'exists' : 'missing');
  
  const response = await fetch(`http://localhost:3000/api/notes/fetchAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
  console.log('Response status:', response.status);  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error:', errorText);
    return;
  }
  const json = await response.json();
  setnotes(json);
}




  //ADD A NOTES...
  const addNotes = async (title, description, tag) => {
    console.log("concainate a new note");
    const response = await fetch(`http://localhost:3000/api/notes/addNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setnotes(notes.concat(note))
  }



  // DELETE A NOTES..
  const deleteNotes = async (id) => {
    alert("Confirm to Delete the Note");
    console.log("deleting Notes " + id);
    const response = await fetch(`http://localhost:3000/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        // use the auth-token of get data...
      },
    });
    const json = await response.json();
    setnotes(json);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes);
  }



  // EDIT A NOTES
  const editNotes = async (id, title, description, tag) => {
    const response = await fetch(`http://localhost:3000/api/notes/updateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        // use the auth-token of get data...
      },
      body: JSON.stringify({ title, description, tag }),

    });
    const json =await response.json();
    console.log(json);

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setnotes, addNotes, deleteNotes, editNotes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
