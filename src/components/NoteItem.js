import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
const NoteItem = (props) => {

    const {deleteNote}=useContext(noteContext);

    return (
        <div className="col-md-3 my-3">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description} </p>
                {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                <div className="d-flex justify-content-between">
                    <span className="badge bg-warning text-dark">{props.note.tag!==null?props.note.tag:""}</span>
                    <div>
                    <i className="fas fa-trash-alt mx-2" onClick={()=>deleteNote(props.note._id)}></i>
                    <i className="fas fa-edit mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default NoteItem
