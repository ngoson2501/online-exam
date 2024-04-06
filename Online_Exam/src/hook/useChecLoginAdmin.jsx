import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'

export function useCheckLogin() {
    const navigate = useNavigate()
    
    
    useEffect(() => {
        if(!localStorage.getItem('name') || !localStorage.getItem('email')){
            navigate('/Login')
        }
    },[])
    
}