import React,{useState,useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const {addNote}=useContext(noteContext);
    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
        e.preventDefault(); //to prevent page reload upon submitting
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
    }
    const handleOnChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    return (
        <div>
            <div className="container">
            <h1>Add a note:</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"><h3>Title</h3></label>
                    <textarea className="form-control" id="title" name="title" rows="2" value={note.title}  onChange={handleOnChange} placeholder="Enter Text" minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label"><h3>Description</h3></label>
                    <textarea className="form-control" id="description" name="description"  value={note.description} rows="4" onChange={handleOnChange} placeholder="Enter Text" minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"><h3>Add Tag</h3></label>
                    <textarea className="form-control" id="tag" name="tag" rows="1"  value={note.tag} onChange={handleOnChange} placeholder="Enter Text" minLength={2} required></textarea>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<2 ? true:false} type="submit" className="btn btn-primary" onClick={handleClick}>AddNote</button>
            </form>
            </div>
        </div>
    )
}

export default AddNote
