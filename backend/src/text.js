import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const filePath = path.resolve("public/temp/images__2_-removebg-preview.png");

try {
  console.log(await cloudinary.api.ping());

  const result = await cloudinary.uploader.upload(filePath);

  console.log(result);
} catch (err) {
  console.dir(err, { depth: null });
}