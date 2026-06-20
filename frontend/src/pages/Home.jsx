import { useState, useEffect } from "react"
import api from '../api'
import Note from "../component/note"
import '../style/Home.css'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from "../component/LoadingIndicator"

function Home(){
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        getNote();
    }, [])
    const getNote = ()=>{
        api.get('/api/notes/').then((res) => res.data).then((data) => {setNotes(data); console.log(data)}).catch((error)=> alert(error))
    }

    const deleteNote = (id)=>{
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note Deleted!")
            else alert("Failed to delete note.")
            getNote()
        }).catch((error) => alert(error))
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post('/api/notes/', {content,title}).then((res) => {
            if (res.status === 201) alert("Note Created!")
            else alert("Failed to create note.")
            getNote()
        }).catch((error) => alert(error))
    }

    const handleLogout = (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            navigate('/logout')
        }
        catch (error) {
            alert(error)
        }
        finally{
            setLoading(false)
        }
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {
                notes.map((note) => <Note note = {note} onDelete={deleteNote} key={note.id} />)
            }
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br/>
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label htmlFor="content">Content:</label>
            <br/>
            <textarea id="content" name="content" required value={content} onChange={(e) => setContent(e.target.value)} />
            <br/>
            <input type="submit" value='Submit' />
            {loading && <LoadingIndicator />}
            <button onClick={handleLogout}>Logout</button>
        </form>
    </div>
}

export default Home