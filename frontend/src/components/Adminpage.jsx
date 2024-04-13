import React,{useState,useEffect} from 'react'
import style from "./Style.module.css"
import { TextField,Button,FormControl, colors } from '@mui/material'
import { useNavigate,Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import  axios  from 'axios'
const Adminpage = () => {
  let navigate=useNavigate()
  let [data,setdata]=useState([])
  let[Search,setsearch]=useState("")
  let[remove,setremove]=useState(true)


  useEffect(()=>{
      axios.get("http://localhost:2222/emp")
      .then((x)=>{console.log("i got the data");
                  console.log(x);
                  setdata(x.data)
                  // setimg(x.data[0].img);
                })
      .catch(()=>{console.log("i didnt get the data");})
  },[remove])

  let find=()=>{
       if(Search.length>0){
      axios.get(`http://localhost:2222/filter/${Search}`)
      .then((res)=>{console.log("data sended for filter",res)
                    if(res.data=="user not found"){
                      alert("user not found")
                    }
                    else{
                      setdata(res.data)
                    };})
      .catch((err)=>{console.log("failed to send the data for filter",err);})

     }
     else{
      alert("fill the box")

     }
         

   }
   let Delete=(id)=>{
    axios.post(`http://localhost:2222/deletecard/${id}`)
    .then(()=>{console.log("data deleted");})
    .catch(()=>{console.log("failed to delete the data");})
    setremove(!remove)
  }

  let logout=()=>{
   
    navigate("/")
   }
  return (
    <div id={style.adminpagebg} >
    <nav id={style.nav} > 
    <div id={style.logoutbtn} ><Button onClick={logout} className='border-2'  style={{border:"2px solid white",color:"white",marginTop:"10px"}}>Logout</Button></div>
    <div id={style.heading} >welcome to Employees page</div>
    <div id={style.searchbar} ><TextField value={Search} onChange={(e)=>{ setsearch(e.target.value)
    if(e.target.value.length==0){
      setremove(remove+1)
    }
   }} style={{marginTop:"20px",backgroundColor:"white",border:"none",height:"38px",borderRadius:"5px"}} placeholder='search' size='small' variant='outlined' type='search'></TextField><Button onClick={find} style={{height:"38px",marginLeft:"20px",border:"2px solid white",marginTop:"25px" ,color:"white"}} variant='outlined'>Find</Button></div>
    <div id={style.addemployee}><Button size='small' variant="outlined" style={{color:"white",marginTop:"20px",backgroundColor:"blue"}}><AddIcon></AddIcon> <Link style={{color:"white",textDecoration:"none"}}  to="/empregpage">Add Employee</Link></Button></div>
    </nav>
    <div id={style.emplist} >
    {data.map((y)=>{
        return(
            <div >
                 <section id={style.profilecard} >
                    <img id={style.profile} src={`http://localhost:2222/pics/`+y.image}></img>
                   <h1>Name :{y.name}</h1>
                   <h2>Mail:{y.mail}</h2>
                    <h2>Phoneno :{y.phoneno}</h2>
                    <h2>Desig:{y.desig}</h2>
                    <h2>Gender:{y.gender}</h2>
                    <h2>Course:{y.course}</h2>
                    <div id={style.btnbox}>
                    <Button sx={{height:"30px",cursor:"pointer"}}  variant="contained" ><Link style={{color:"white",textDecoration:"none"}} to={`/empeditpage/${y._id}`}>Edit</Link></Button>
                    <Button onClick={()=>{Delete(y._id)}} sx={{height:"30px",cursor:"pointer"}}  variant="contained" >Delete</Button>

                    </div>
          

                 </section>
            </div>
        )
    })}
    </div>
</div>
  )
}

export default Adminpage