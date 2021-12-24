let mongoose = require('mongoose'), Schema = mongoose.Schema;
const imageSchema = new Schema({
    files: Array,
    id: String,
    password: String,
});
mongoose.models = {}
module.exports = mongoose.model('Images', imageSchema)

