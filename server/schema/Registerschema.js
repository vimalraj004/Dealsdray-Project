let mongoose=require("mongoose")
let dataschema=new mongoose.Schema({
    name:String,
    course:Array,
    mail:String,
    gender:String,
     phoneno:Number,
     desig:String,
     image:String  
})
let data=mongoose.model("newemployee",dataschema)
module.exports=data