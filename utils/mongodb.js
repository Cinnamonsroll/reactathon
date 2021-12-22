import mongoose from "mongoose"
import config from "../config.json"
const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    mongoose.connect(config.mongo)
    return handler(req, res)
}
export default connectDB