const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    text:{
        type: string,
        default:""

    },
    imageUrl:{
        type:string,
        default:""

    },
    videoUrl:{
        type:string,
        default:""

    },
    seen:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User"
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User"
    },
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "message"
      },
    ],
  },
  {
    timestamps: true
  }
)
const MessageModel = mongoose.model('Message', messageSchema)
const ConversationModel = Mongoose.model('conversation',conversationSchema )
module.exports = {
    MessageModel,
    ConversationModel
 
}