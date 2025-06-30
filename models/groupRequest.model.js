import { model, Schema } from "mongoose";


const groupRequestSchema = new Schema(
    {
         
        groupId:{
            type: Schema.Types.ObjectId,
            ref: 'Group',
            required: true
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'Safe-Gurad-User',
            required: true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'Safe-Gurad-User',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        },
    },
    {
        timestamps:true
    }
)


const GroupRequest = model("GroupRequest", groupRequestSchema);

export default GroupRequest

