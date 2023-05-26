const mongoose= require ('mongoose');

mongoose.set("strictQuery", false); 
mongoose.connect(process.env.mongo_url)


// Checking the connection and making connection object
const db= mongoose.connection;

db.on('connected', ()=>{
    console.log("Mongo DB is successfully connected.");
})

db.on('error', ()=>{
    console.log("Mongo DB connection failed."); 
}) 