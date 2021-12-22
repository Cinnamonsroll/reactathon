import image from "../../models/image";
import { randomBytes } from 'node:crypto';
import connectDB from "../../utils/mongodb"
let handler = async (req, res) => {
    if (req.method === "POST") {
        const { url, type, password } = req.body;
        if (!url) res.status(200).json({ error: "No url provided" });
        const imageData = await image.create({
            url,
            id: randomBytes(16).toString('hex'),
            mimeType: type,
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