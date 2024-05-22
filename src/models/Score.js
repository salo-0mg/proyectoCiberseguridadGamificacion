import {Schema, model} from 'mongoose'

const scoreSchema = new Schema({
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    scoreSpam: [Number],
    scorePhishing: [Number],
},{
    timestamps: true,
    versionKey: false
})

export default model("Score", scoreSchema)