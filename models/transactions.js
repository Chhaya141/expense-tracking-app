const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    text: {
        type:String,
        trim: true,
        required: [true, 'add some text']

    },
    amount: {
        type:Number,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now
    }
});
module.exports = mongoose.model('Transaction', TransactionSchema);
