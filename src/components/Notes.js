import React,{useContext, useEffect,useRef,useState} from 'react'
// import PropTypes from 'prop-types'
import noteContext from '../context/notes/noteContext'
import NoteItem from "./NoteItem"
import AddNote from "./AddNote"

import { useHistory } from "react-router-dom";

export const Notes = () => {
    const {notes,getAllNotes,editNote}=useContext(noteContext);
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
    let history=useHistory();
    useEffect(() => {
        // console.log(localStorage.getItem('token'));
        if(localStorage.getItem('token')){
            getAllNotes();
        }
        else{
            history.push("/login");
        }
    }, [])

    const ref=useRef("");
    const refClose=useRef("");
    const updateNote = (curr_note)=>{
        ref.current.click();
        refClose.current.click();
        setNote({id:curr_note._id,etitle:curr_note.title,edescription:curr_note.description,etag:curr_note.tag});
    }
    const handleOnChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    const handleClick = (e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
    }
    return (
        <>
        <AddNote/>

        {/* modal: */}
         {/* Button trigger modal  */}
         <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label"><h3>Title</h3></label>
                        <textarea className="form-control" id="etitle" value={note.etitle} name="etitle" rows="2" onChange={handleOnChange} placeholder="Enter Text" minLength={5} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label"><h3>Description</h3></label>
                        <textarea className="form-control" value={note.edescription} id="edescription" name="edescription" rows="4" onChange={handleOnChange} placeholder="Enter Text" minLength={5} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label"><h3>Tag</h3></label>
                        <textarea className="form-control" id="etag" value={note.etag} name="etag" rows="1" onChange={handleOnChange} placeholder="Enter Text" minLength={2} required></textarea>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<2 ? true:false} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
            </div>

        <div className="row my-3">
            <h1>Your notes:</h1>
            <div className="container mx-2">
            {notes.length===0 && "No notes to display"}
            </div>
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note} updateNote={updateNote}/>
            })}

            </div>
        </>
    )
}


