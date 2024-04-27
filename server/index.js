let express=require("express")
let cors=require("cors")
let jwt=require("jsonwebtoken")
let bodyparser=require("body-parser")
let mongoose=require("mongoose")
let data=require("./schema/Registerschema")
let data2=require("./schema/Adminregisterschema")
mongoose.connect("mongodb://127.0.0.1:27017/dealdrayproject")
mongoose.connection
.once("open",()=>{console.log("db connected");})
.on("err",()=>{console.log("db failed to connect");})
require("dotenv").config()
let app=express()
app.use(express.json({limit:"10mb"}))
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
// app.use(express.static('photos'))

// --------------------------------------adminlogin--------------------------
app.post("/adminlogin",async(req,res)=>{
    try{
        let name=req.body.adminname
        console.log(name);
        let pass=req.body.adminpass
        console.log(pass);
        let x=await data2.findOne({name:req.body.adminname});
        console.log(x);
        if(x!=null){
               if(x.password==req.body.adminpass){
                   let token=jwt.sign({name:x.adminname,password:x.adminpass},process.env.secret_key)
                   console.log(process.env.secret_key);
                   res.status(200).send({token:token})
               }
               else{
                   res.status(200).send({"message":"wrong password"})
               }
           }
       else{
           res.status(200).send({"message":"user not found"})
           }

    }
    catch(err){
        res.json(err)
    }
})

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
function checktoken(req,res,next){
    let token=req.headers["authorization"]
    // console.log(token);
    if(token){
        jwt.verify(token,process.env.secret_key,(err,decode)=>{
            if(err){
                res.status(200).send({message:"tokenerr"})
                return
            }
            else{
              req.name=  decode.name
              req.pass=decode.password
              next()
            }
        })
    }

}
app.get("/emp",checktoken,(req,res)=>{

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