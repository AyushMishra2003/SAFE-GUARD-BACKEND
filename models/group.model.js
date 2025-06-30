import { model, Schema } from "mongoose";



const GroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Safe-Gurad-User',
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Safe-Gurad-User',
            },
        ],

    },
    {
        timestamps: true
    }
)

// 🟡 Index on 'members'
GroupSchema.index({ members: 1 });


const Group=model("Group",GroupSchema)

export default Group