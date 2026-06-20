import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import '../style/Form.css'
import LoadingIndicator from './LoadingIndicator'

function Form({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            const res = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            }
            else{
                navigate('/login')
            }
        }
        catch (error) {
            alert(error)
        }
        finally{
            setLoading(false)
        }
    }

    const logoutLoginNavigate = (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            if (method === 'login') navigate('/register')
            else navigate('/login')
        }
        catch (error) {
            alert(error)
        }
        finally{
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className='formArea'>

        <h1>{name}</h1>
        <input className='formInput' type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
        <input className='formInput' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
        {loading && <LoadingIndicator />}
        <button className='formButton' type='submit'>{name}</button>
        <button className='formButton' onClick={logoutLoginNavigate}>{method === 'login'? 'Register' : 'Login'}</button>  
    </form>
}

export default Form