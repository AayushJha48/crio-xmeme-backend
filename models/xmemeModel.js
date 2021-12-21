const mongoose = require("mongoose")

// Specifying schema for memes to be stored in the dataBase
const xmemeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        trim: true,
        require: true
    },
    caption: {
        type: String,
        trim: true,
        require: true,
        maxlength: 2000
    },
    url: {
        type: String,
        trim: true,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Xmeme", xmemeSchema);
