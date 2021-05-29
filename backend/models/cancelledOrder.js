const mongoose = require('mongoose');

const cancelledOrderSchema = mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        
        
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
       
    },
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
     
    },
    reason:{
         type:String,
        default:'bad attitude'

    },
    
  
    cancellationTime:{
        
        type:String,
        default:Date.now
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

cancelledOrderSchema .virtual('id').get(function () {
    return this._id.toHexString();
});

cancelledOrderSchema .set('toJSON', {
    virtuals: true,
});


exports.CancelledOrder = mongoose.model('cancelledOrder', cancelledOrderSchema );
