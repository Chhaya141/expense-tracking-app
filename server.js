const path=require('path');
const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const transactions=require('./Routes/transactions');
const connectDb=require('./config/db');
const cors=require('cors');
const { dirname } = require('path');
//we put environment variable in config file so create it and ten access it 

dotenv.config({path:'./config/config.env'})
connectDb();

const app=express();
//in order to use json data or add json data to body we need to call te middleware
app.use(express.json());
app.use(cors());
//app.get('/',(req,res)=>{res.send('hello');});
app.use('/api/v1/transactions',transactions);
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
if(process.env.NODE_ENV==='production'){

    app.use(express.static('client/build'));
    app.get('*',(req,res)=>res.sendFile(path.resolve(_dirname,'client','build','index.html')));
}
const PORT=process.env.PORT||5000;
app.listen(PORT,console.log(`${PORT} is the port and ${process.env.NODE_ENV}`));
 