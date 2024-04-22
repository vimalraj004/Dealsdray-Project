let express=require("express")
let cors=require("cors")
let bodyparser=require("body-parser")
let mongoose=require("mongoose")
let data=require("./schema/Registerschema")
let data2=require("./schema/Adminregisterschema")
mongoose.connect("mongodb://127.0.0.1:27017/dealdrayproject")
mongoose.connection
.once("open",()=>{console.log("db connected");})
.on("err",()=>{console.log("db failed to connect");})
let app=express()
app.use(express.json({limit:"10mb"}))
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
// app.use(express.static('photos'))

// --------------------------------------adminlogin--------------------------
app.post("/adminlogin",(req,res)=>{
//     console.log(req.body);
//    res.end("welcome to server");
    // console.log(req.body.adminname);
    data2.findOne({name:req.body.adminname})
    .then((x)=>{
        if(x!=null){
            res.json(x)
        }
        else{
            res.json("usernot found")
        }
    })
    .catch((err)=>{res.json(err)})
})
//--------------------multer-------------------------
// const multer  = require('multer')
// const path=require("path")
// // const { log } = require("console")
// const storage = multer.diskStorage({
//     destination:(req, file, cb)=> {
//       cb(null,"photos/pics")
//     },
//     filename:(req, file, cb)=> {
//      cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
//   })
  
//   const upload = multer({ storage: storage })
 //-----------------------------------multer -------------------
app.post("/register",(req,res)=>{
   console.log(req.body);
  
   
 
    data.findOne({mail:req.body.mail})
    .then((x)=>{
       if(x){
        res.json("useremail is already in use")
       }
       else{
       
        const db = new data(req.body);
       
        // let db=new data(req.body)
        db.save()
        .then(()=>{res.json("data saved in db");})
        .catch(()=>{res.json("data failed to save in db")})
       }

    })
    .catch(()=>{})

})
app.get("/emp",(req,res)=>{
    // data.find({$or: [{name:filter}, {email: filter}]})
    data.find()
    .then((x)=>{res.json(x)})
    .catch((err)=>{res.json("failed to get the data from db")})
})
app.get("/editpage/:id",(req,res)=>{
    let id=req.params.id
    data.findOne({_id:id})
    .then((z)=>{
                 res.json(z);
                 })
    .catch(()=>{res.json("failed to fetch the data")})
    
})
app.post("/update/:id",(req,res)=>{
    let id=req.params.id
    // console.log(req.body);
  
    
    data.updateOne({_id:id},req.body)
    .then(()=>{res.json("data updated in db");})
    .catch((err)=>{res.json("failed to update the data in db")})
})
app.post("/deletecard/:id",(req,res)=>{
    let id=req.params.id
    data.deleteOne({_id:id})
    .then(()=>{res.json("data deleted in db");})
    .catch((err)=>{res.json("failed to delete the data in db")})

})
app.post("/filter",(req,res)=>{
    let search= req.body.Search
    console.log(search);
        data.find({$or:[{name:search},{mail:search}]})
        .then((x)=>{
               console.log(x);
            
               if(x[0]!=null){
                 
                  res.json(x)
               }
               else {
                  res.json("user not found")
                 
               }
        })
        .catch(()=>{})
  })

app.listen("2222",()=>{
       console.log("ur 2222 port is running");
})