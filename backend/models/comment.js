const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
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
    
    description: {
        type: String,
        default:''
    },
   
    images: [{
        type: String
    }],
   
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    
    },
   
   
    
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

commentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

commentSchema.set('toJSON', {
    virtuals: true,
});


exports.Comment = mongoose.model('comment', commentSchema);
