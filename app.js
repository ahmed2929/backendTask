let app =require("express")();
const SetMiddleWares=require('./Middleware/index')
const port = process.env.PORT || 4000

// set Middleware
app=SetMiddleWares(app)
 
// Start the server
app.listen(port,()=>{
    console.log(`server is runnig on port ${port}`)
})

module.exports=app