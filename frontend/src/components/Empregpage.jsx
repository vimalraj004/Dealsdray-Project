import React,{useState} from 'react'
import style from "./Style.module.css"
import { TextField,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio,Button,FormGroup,ButtonGroup,InputLabel,MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';



const Empregpage = () => {
    let[name,setname]=useState("")
    let[mail,setmail]=useState("")
    let[gender,setgender]=useState("")
    let[phoneno,setphoneno]=useState("")
    let[desig,setdesig]=useState("")
    let[course,setcourse]=useState([])
    let[image,setimage]=useState()


    let[namecolor,setnamecolor]=useState(true)
    let[mailcolor,setmailcolor]=useState(true)
    let[phonenocolor,setphonenocolor]=useState(true)

   
    

    let getname=(e)=>{
        setname(e.target.value)
          if(e.target.value.length>=4&&e.target.value.match(stringregex)){
               setnamecolor(true)
           }
           else{
               setnamecolor(false)
               }
   }
   let getmail=(e)=>{
       setmail(e.target.value)
       if(e.target.value.match(emailregex)){
           setmailcolor(true)
       }
       else{
           setmailcolor(false) 
       }
   }
   let getgender=(e)=>{
    setgender(e.target.value)
}
    let getdesig=(e)=>{
        setdesig(e.target.value)
    }
    let getcourse=(e)=>{
     let {value,checked}=e.target;
     setcourse((prevcourse) => {
        if (checked) {
            // Add the value to the array if it's checked and not already in the array
            return [...prevcourse, value];
        } else {
            // Remove the value from the array if it's unchecked
            return prevcourse.filter(course => course !== value);
        }
    });
   
    }
  
let getphoneno=(e)=>{
    setphoneno(e.target.value)
    if(e.target.value.length>=10&&e.target.value.match(numberregex)){
        setphonenocolor(true)
    }
    else{
        setphonenocolor(false) 
    }
}
let getimage=(e)=>{
    console.log(e.target.files[0]);
      setimage(e.target.files[0])
  }

   let payload={
    name,
    mail,
   phoneno,
   course,
   gender,
   desig,


}
let emailregex=/.+\@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
let stringregex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
let numberregex=/^[0-9]+$/
let navigate=useNavigate()

let register=()=>{
    console.log(payload);
     // console.log(fname,lname,email,gender,role,dob,phoneno,address,company,Salary);
       
     if(name.length>4&&name.match(stringregex)&&mail.match(emailregex)&&phoneno.match(numberregex)&&phoneno.length==10){
          
        const payload1 = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            payload1.append(key, value);
        });
        
        // Append the image separately
        payload1.append('image', image);

        axios.post("http://localhost:2222/register",payload1) 
        .then((res)=>{console.log("data posted",res);
                      // console.log(res.data);
                    if(res.data=="useremail is already in use"){
                      alert("useremail is already in use")
                    }
                  else{
                    navigate("/adminpage")
                  }})
        .catch((err)=>{console.log("data failed to post",err);})
       
      }
      else{
        if(name.length>4&&name.match(stringregex)){
         setnamecolor(true)
        }
        else{
         setnamecolor(false)
        }
      
        if(mail.match(emailregex)){
         setmailcolor(true)
        }
        else{
         setmailcolor(false)
        }
    
        if(phoneno.length==10&&phoneno.match(numberregex)){
         setphonenocolor(true)
        }
        else{
         setphonenocolor(false)
        }
     
   }
}
  return (
    <div id={style.empregpage}>
        <div id={style.headingtext}>
            <h1>Register page</h1>
        </div>
        <div id={style.regform}>
        <TextField required helperText={namecolor?"":"please fill the name"} color={namecolor?"primary":"error"} value={name} onChange={getname} id="outlined-basic" sx={{width:"300px",height:"20px",marginTop:"40px"}} label="Enter your Name" variant="outlined" />
        <TextField required helperText={mailcolor?"":"please fill the mail"} color={mailcolor?"primary":"error"} value={mail} onChange={getmail} id="outlined-basic" sx={{width:"300px",height:"20px",marginTop:"40px"}} label="Enter your Emailid" variant="outlined" />
     <TextField required helperText={phonenocolor?"":"please fill the Phoneno"} color={phonenocolor?"primary":"error"} value={phoneno} onChange={getphoneno} id="outlined-basic" sx={{width:"300px",height:"20px",marginTop:"40px"}} label="Phoneno" variant="outlined" />
     
     <FormGroup sx={{ display: "flex", flexDirection: "row", width: "307px", marginTop: "50px" }}>
    <FormLabel>Course:</FormLabel>
    <FormControlLabel
        control={<Checkbox value="MCA" checked={course.includes("MCA")} onChange={getcourse} />}
        label="MCA"
    />
    <FormControlLabel
        control={<Checkbox value="BCA" checked={course.includes("BCA")} onChange={getcourse} />}
        label="BCA"
    />
    <FormControlLabel
        control={<Checkbox value="BSC" checked={course.includes("BSC")} onChange={getcourse} />}
        label="BSC"
    />
</FormGroup>
      
       <FormControl sx={{marginTop:"10px",display:"flex",marginRight:"20px"}}>
                <FormLabel id="demo-radio-buttons-group-label">Gender :</FormLabel>
        <RadioGroup sx={{width:"100%",display:"flex",flexDirection:"row"}}  value={gender} onChange={getgender} aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
       </RadioGroup>
       </FormControl>

       <FormControl sx={{width:"300px",marginTop:"20px"}}>
             <InputLabel id="demo-simple-select-label">Designation</InputLabel>
             <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={desig}
               label="Designation"
               onChange={getdesig}
             >
               <MenuItem value={"Hr"}>Hr</MenuItem>
               <MenuItem value={"Manager"}>Manager</MenuItem>
               <MenuItem value={"Sales"}>Sales</MenuItem>
             </Select>
     </FormControl>
     <FormLabel >Profile Pic :</FormLabel>
      <input onChange={getimage} type="file" />
                <Button onClick={register} style={{marginTop:"10px"}} variant="outlined">Register</Button>
        </div>
    </div>
  )
}

export default Empregpage