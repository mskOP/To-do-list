const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const tarikh=require(__dirname+"/date.js");
console.log(tarikh());
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static_files"));




/*
app.get("/",function(req,res){
        let today=new Date();
        let currentDay=today.getDay();
       let day="";
       if(currentDay==0||currentDay==6){
        day="weekend";
       }else{
        day="weekdays";
       }

       res.render("list",{KindOfDay:day});
});
*/


let items=[];
let workItems=[];
app.get("/",function(req,res){
    let today=new Date();

   let options={
    weekday:"long",
    day:"numeric",
    month:"long"
   };

   let day=today.toLocaleDateString("en-US",options);
   
   res.render("list",{listTitle:day,newListItems:items});

});
app.get("/work",function(req,res){
      res.render("list",{listTitle:"Work",newListItems:workItems});
});

app.get("/about",function(req,res){
    res.render("about");
});

// console.log(document.getElementById('newItem').value);
app.post("/",function(req,res){
   let item= req.body.newItem;
   if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/work");
   }else{
    items.push(item);
      res.redirect("/");
   }
  
//   console.log(item);

});




app.listen(3000,function(){
    console.log("server started on port 3000");
});