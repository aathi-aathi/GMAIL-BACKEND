import {MongoClient} from "mongodb"
import dotenv from 'dotenv'

dotenv.config()
// Mongo URI
const cloudCluster = process.env.DB_CLUSTER ||'@cluster0.gwbexdp.mongodb.net';
const dbName=process.env.DB_NAME || " ";
const dbUserName = process.env.DB_USER || " ";
const dbPassword = process.env.DB_PASSWORD || " ";
const cloudURI =`mongodb+srv://${dbUserName}:${dbPassword}${cloudCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(cloudURI)
const db = client.db(dbName);
const connectToDb=async()=>{
try{
    await client.connect();
    console.log("mongodb connect successfully")
}
catch(err){
    console.log("err",err)
    process.exit(1)
}
}
export {client,db}
export default connectToDb