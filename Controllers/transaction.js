
//const transactions = require('../models/transactions');
const Transaction=require('../models/transactions');
//DESC TO GET ALL the transactions
//route /api/v1/transactions
//access public bcz no authentication

exports.getTransaction= async (req,res,next)=>{
   // res.send('here we get transactions ');
   //we r using await bcz promise returns  objects
      
    try {const transactions= await Transaction.find();
        //to input the transactions from model sec schema
       return res.status(200).json({
           success:true,
           count:transactions.length,
           data:transactions
       });

    } catch (error) {
       res.status(500).json({
           success:false,
           error:"server error"
       })
    }
}
//DESC TO add ALL the transactions
//route /api/v1/transactions
//access public bcz no authentication

exports.addTransaction=async(req,res,next)=>{
try {
    const {text,amount}=req.body;
    const transactions=await Transaction.create(req.body);
    return res.status(201).json({
        success: true,
        data: transactions
      }); 


} catch (err) {
    // console.log(err);
    if(err.name==='ValidationError'){
        const messages=Object.values(err.errors).map(val=>val.message);
        res.status(400).json({
            success:false,
            err:messages.color.red
        });
    }else{
        res.status(500).json({
            success:false,
            err:"server error"
        })
    }
}

}
//DESC TO delete ALL the transactions
//route /api/v1/transactions
//access public bcz no authentication

exports.deleteTransaction=async(req,res,next)=>{
   // res.send('here we delete transactions ');
    try {
        
        const transactions=await Transaction.findById(req.params.id);
        if(!transactions){
            res.status(404).json({
                success:false,
                err:"no transaction found"
            })
        }
        await transactions.remove();
        res.status(200).json({
            success:true,
            data:{}
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            error:"server error"
        })
    }
  
}