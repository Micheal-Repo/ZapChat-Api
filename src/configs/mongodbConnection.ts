import mongoose from "mongoose";



export default  function mongodbConnect() {
  
  mongoose.set('bufferCommands', false); // Disable buffering globally
  mongoose.set('strictQuery', true);
  
  console.log("connecting to Database...")
  
  const db = mongoose.connection;
  const url:any = process.env.MONGO_URL;
  
  mongoose.connect(url)
  .then(() => {
      console.log("connected to database");
    })
    .catch((err)=>{
     console.log("unable to connect to database")
      console.log(err.message) 
   })
  
  
  db.on("connected", () => {
    console.log("database connection established successfully");
  });
  db.on("disconnected", () => {
    console.log("disconnected from database");
  });
  db.on("reconnected", () => {
    console.log("reconnected to database successfully");
  });
  db.on('error', (err) => {
  console.error('MongoDB connection error:');
});
}




