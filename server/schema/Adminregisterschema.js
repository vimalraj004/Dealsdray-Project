let mongoose=require("mongoose")
let dataschema=new mongoose.Schema({
    name:"String",
    password:"String"
})
let data2=mongoose.model("adminlist",dataschema)
module.exports=data2