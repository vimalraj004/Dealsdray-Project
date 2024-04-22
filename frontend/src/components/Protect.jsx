import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Protect = (x) => {
    let navigate=useNavigate()
    let Data=x.data
    
    useEffect(()=>{
        let entry= localStorage.getItem("entry")
        let regentry= localStorage.getItem("regentry")
        let editentry= localStorage.getItem("editentry")
        if(!entry){
         navigate("/")
        }
        else if(!regentry){
          navigate("/adminpage")
        }
        else if(!editentry){
          navigate("/adminpage")
        }
     
     },[])
  return (
    <div>
        <Data/>
    </div>
  )
}

export default Protect