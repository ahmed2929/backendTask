const BodyParser = require("body-parser");
const dataObjects =require("../routes/index")
const Cors = require("cors");
module.exports=(app)=>{ 
  // set cors
  app.use(Cors());
   // set bodyParser
    app.use(BodyParser.json());
    
 
// set routes
app.get("/", (req, res) => {
    res.status(200).json({
      status: "Success",
      message: `Welcome `,
    });
  });
  
  app.use("/api/v1/", dataObjects);
 

  //Handling un handle routes
    app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "Error 404",
      message: `path not found. Can't find ${req.originalUrl} on this server`,
    });
    });
   


//error handle 
app.use((error,req,res,next)=>{
   const status    = error.statusCode || 500 ;
   const message   = error.message           ;
   const data      = error.data              ;
   if(status===500){
    console.log(error)
   return res.status(status).json({message:"internal server error",data:data});
   }
   res.status(status).json({message:message,data:data});
});


return app;
}