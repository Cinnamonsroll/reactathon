import mongoose from "mongoose"
const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    mongoose.connect("mongodb+srv://Summer:scotland217@cluster0.qjfsh.mongodb.net/santaPics?retryWrites=true&w=majority")
    return handler(req, res)
}
export default connectDB