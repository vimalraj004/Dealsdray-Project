import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import style from "./Style.module.css"
import { TextField,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio,Button,FormGroup,ButtonGroup,InputLabel,MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';


const Empeditpage = () => {
    let params=useParams()
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

   useEffect(()=>{
    axios.get(`http://localhost:2222/editpage/${params.id}`)
    .then((z) => {
        // console.log("start to edit", z);
        // console.log(z.data);
        setname(z.data.name);
        setcourse(z.data.course)
        setmail(z.data.mail);
        setgender(z.data.gender);
        setdesig(z.data.desig)
        setphoneno(z.data.phoneno);
        setimage(z.data.image)
  
    },[])
    .catch((err) => { console.log("wait for edit", err); })
    
   },[])
    

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
    let getempcourse=(e)=>{
    //  let {value,checked}=e.target;
    //  setcourse((prevcourse) => {
    //     if (checked) {
    //         // Add the value to the array if it's checked and not already in the array
    //         return [...prevcourse, value];
    //     } else {
    //         // Remove the value from the array if it's unchecked
    //         return prevcourse.filter(course => course != value);
    //     }
    // });
    let courses= e.target.value
    if(e.target.checked){
     setcourse([...course,courses])
    }
    else{
     setcourse(course.filter((x)=>{ return(x!=courses)}))
    }
   
    }
  
let getphoneno=(e)=>{
    if(e.target.value.length<=10){
        setphoneno(e.target.value)
    }
    if(e.target.value.length>=10&&e.target.value.match(numberregex)){
        setphonenocolor(true)
    }
    else{
        setphonenocolor(false) 
    }
}
let getimage=(e)=>{
    // console.log(e.target.files[0]);
    let file=e.target.files[0]
    let filereader=new FileReader()
    if(file){
        filereader.readAsDataURL(file)
        filereader.onload=()=>{
           let base64string= filereader.result
           setimage(base64string)
        }
    }
  }

   let payload={
    name,
    mail,
   phoneno,
   course,
   gender,
   desig,
   image


}
let emailregex=/.+\@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
let stringregex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
let numberregex=/^[0-9]+$/
let navigate=useNavigate()
let update=()=>{
    // console.log(payload);
     // console.log(fname,lname,email,gender,role,dob,phoneno,address,company,Salary);
       
    
          
        // const payload1 = new FormData();
        // Object.entries(payload).forEach(([key, value]) => {
        //     payload1.append(key, value);
        // });
        
        // // Append the image separately
        // payload1.append('image', image);

        axios.post(`http://localhost:2222/update/${params.id}`, payload)
        .then((res) => { console.log("data updated", res);
        navigate("/adminpage") })
        .catch((err) => { console.log("data failed to update", err); })
       
       
      
    
}
  return (
    <div id={style.empregpage}>
    <div id={style.headingtext}>
        <h1>Edit page</h1>
    </div>
    <div id={style.regform}>
    <TextField required helperText={namecolor?"":"please fill the name"} color={namecolor?"primary":"error"} value={name} onChange={getname} id="outlined-basic" sx={{width:"300px",height:"20px",marginTop:"40px"}} label="Enter your Name" variant="outlined" />
    <TextField required helperText={mailcolor?"":"please fill the mail"} color={mailcolor?"primary":"error"} value={mail} onChange={getmail} id="outlined-basic" sx={{width:"300px",height:"20px",marginTop:"40px"}} label="Enter your Emailid" variant="outlined" />
 <TextField required helperText={phonenocolor?"":"please fill the phoneno"} color={phonenocolor?"primary":"error"} value={phoneno} onChange={getphoneno} id="outlined-basic" sx={{width:"300px",height:"20px",marginTop:"40px"}} label="Phoneno" variant="outlined" />
 
 {/* <FormGroup sx={{ display: "flex", flexDirection: "row", width: "307px", marginTop: "50px" }}>
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
</FormGroup> */}
<div style={{marginTop:"50px"}}>
<FormLabel>Course:</FormLabel>
<input type="checkbox" value="MCA" checked={course.includes("MCA")}   onChange={getempcourse}/>MCA
<input type="checkbox" value="BCA" checked={course.includes("BCA")}    onChange={getempcourse} />BCA
<input type="checkbox" value="BSC" checked={course.includes("BSC")}   onChange={getempcourse} />BSC
</div>
  
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
 <div style={{display:"flex",marginTop:"20px",marginLeft:"40px"}}>
 <FormLabel >Profile Pic :</FormLabel>
  <input onChange={getimage} type="file" />
 </div>
            <Button onClick={update} style={{marginTop:"10px"}} variant="outlined">Update</Button>
    </div>
</div>
)
  
}

export default Empeditpage