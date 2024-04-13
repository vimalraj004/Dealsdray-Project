import React, { useState } from 'react'
import style from "./Style.module.css"
import { TextField,Button,FormControl } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import  axios  from 'axios'


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Adminloginpage = () => {


    let [adminname,setadminname]=useState("")
    let [adminpass,setadminpass]=useState("")

    const [showPassword, setShowPassword] = React.useState(false);
    let navigate=useNavigate()

    let getadminname = (e)=>{
         setadminname(e.target.value)
    }
    let getadminpass = (e)=>{
        setadminpass(e.target.value)
   }
   let payload={
    adminname,
    adminpass
}
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
let adminbtn=()=>{
  console.log("heloo");
    axios.post("http://localhost:2222/adminlogin",payload)
    .then((res)=>{console.log(res);
                   if(res.data=="usernot found"){
                    alert("Invalid username")
                   }
                   else if(res.data.password!=adminpass){
                    alert("Wrong password")
                   }
                   else{
                    // navigate(`/staffpage/${res.data._id}`)
                    navigate("/adminpage")
                   }
                  })
    .catch((err)=>{console.log(err);})
    
}
  return (
  
    <div id={style.bg}>
    <h1>Employee Management</h1>
    <div id={style.buttonbox}>
        <div id={style.movebtn}></div>
        <button>Admin</button>
       

    </div>
    <div id={style.forms}>
        <div id={style.form1}>
        <TextField value={adminname} onChange={getadminname} id="outlined-basic" sx={{width:"300px",marginTop:"20px",marginLeft:"50px"}} label="Enter your Name" variant="outlined" />
        {/* <TextField value={adminpass} onChange={getadminpass} id="outlined-basic" sx={{width:"300px",marginTop:"20px",marginLeft:"50px"}} label=" Enter your Password" variant="outlined" /> */}
<FormControl  value={adminpass} onChange={getadminpass} sx={{ m: 1, width: '34ch',marginLeft:"50px",marginTop:"20px" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Enter your Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
</FormControl>

        <Button onClick={adminbtn} variant="contained" sx={{marginTop:"30px",marginLeft:"120px"}}>Admin submit</Button>
        </div>


    </div>
</div>
  )
}

export default Adminloginpage