
import mongoose from 'mongoose';
import app from './app';



const port:number = 5000


//Database connection

async function main() {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/Books');
  console.log('Database connection Successfully established');
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
  }catch(err){
    console.log('Failed to connect to Mongo');
  }
}
main();






