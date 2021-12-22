import image from "../../../models/image";
import connectDB from "../../../utils/mongodb"
let handler = async (req, res) => {
    const { id } = req.query;
    if (!id) return res.json({ error: "No id provided" });
    const imageData = await image.findOne({ id });
    if (!imageData) return res.json({ error: "No image found" });
    return res.json({ imageData })
}
export default connectDB(handler)
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}