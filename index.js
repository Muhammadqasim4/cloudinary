import express from "express"
import "dotenv/config"
import multer from "multer"
import cloudinary from "./config/Cloudinary.js"

const app = express(  )
const port = 3000

const storage = multer.diskStorage({
    filename: function(req, file ,callback){
        callback(null, file.originalname)
    }
})


const upload = multer({ storage });

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post("/", upload.single("image") , async (req, res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        res.json({ image : result.url })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})