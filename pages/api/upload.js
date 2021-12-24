import image from "../../models/image";
import { randomBytes } from 'node:crypto';
import connectDB from "../../utils/mongodb"
let handler = async (req, res) => {
    if (req.method === "POST") {
        const { files, password } = req.body;
        if (!files.length) res.status(200).json({ error: "No files" });
        const imageData = await image.create({
            id: randomBytes(16).toString('hex'),
            files,
            password
        })
        return res.status(200).json({
            key: imageData.id,
        })
    }
}
export default connectDB(handler)
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}