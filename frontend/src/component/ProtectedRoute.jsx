import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import {useState, useEffect} from 'react'

function ProtectedRoute({children}){
    const [isAuth, SetIsAuth] = useState(null)

    useEffect(()=>{
        auth().catch(()=>{ SetIsAuth(false)})
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try{
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken, 
            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                SetIsAuth(true)
            }
            else{
                SetIsAuth(false)
            }
        }
        catch (error){
            console.log(error)
            SetIsAuth(false)
        }

    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            SetIsAuth(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExp = decoded.exp
        const now = Date.now() / 1000

        if (tokenExp < now) {
            await refreshToken()
        }
        else{
            SetIsAuth(true)
        }
    }

    if (isAuth === null) {
        return <div>Loading...</div>
    }

    return isAuth ? children : <Navigate to = '/login' />
}

export default ProtectedRoute