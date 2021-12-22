let mongoose = require('mongoose'), Schema = mongoose.Schema;
const imageSchema = new Schema({
    url: String,
    id: String,
    mimeType: String,
    password: String,
});
mongoose.models = {}
module.exports = mongoose.model('Images', imageSchema)

