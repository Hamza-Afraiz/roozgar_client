const mongoose = require('mongoose');

const ongoingOrderSchema = mongoose.Schema({
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
vendorName:{
    type:String,
    default:'hamza'
},
image:{
    type:String,
    default:'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip'
},
serviceTitle:{
    type:String,
    default:'not defined'
}
    ,
    price:{
       type:String,
       default:'300'
    },
    completionTime:{
        type:String,
        default:'1 hour'
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

ongoingOrderSchema .virtual('id').get(function () {
    return this._id.toHexString();
});

ongoingOrderSchema.set('toJSON', {
    virtuals: true,
});


exports.OngoingOrder = mongoose.model('ongoingOrder', ongoingOrderSchema );
