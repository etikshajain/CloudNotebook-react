import noteContext from "./noteContext"
import React,{useState} from "react"

const NoteState=(props)=>{

    const host="http://localhost:5000";
    const initialNotes=[];

    const [notes, setNotes] = useState(initialNotes);

    //getALL NOTES:
    const getAllNotes=async()=>{
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const json= await response.json(); 
        //   console.log(json);

        //adding in front end
        setNotes(json);
    }


    //add a note:
    const addNote=async(title, description,tag)=>{
        //api call
        let data={
            "title":title,
            "description":description,
            "tag":tag
        }
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(data) 
          });
          const json= await response.json(); 

        //adding in front end
        setNotes(notes.concat(json));
    }


    //delete a note:
    const deleteNote=async (id)=>{
        //api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
        //   const json= await response.json(); 
        //deleting in frontend:
        let newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
        console.log("deleted note with id"+id);
    }


    //edit a note
    const editNote=async (id,title, description,tag)=>{
        //api call
        let data={
            "title":title,
            "description":description,
            "tag":tag
        }
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(data) 
          });
          const json= await response.json(); 
        //editing in frontend
        for (let index = 0; index < notes.length; index++) {
            if(notes[index]._id===id){
                notes[index].title=title;
                notes[index].description=description;
                notes[index].tag=tag;
                break;
            }
        }
        setNotes(notes);
        getAllNotes();
    }
    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;