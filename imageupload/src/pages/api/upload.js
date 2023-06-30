import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "../../../db"
import Image from "../../../models/image"

const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading image:', err);
        return res.status(500).json({ error: 'Image upload failed!' });
      }

      // Access the uploaded file using req.file
      const { path } = req.file;

      // Convert the image file to Base64
      const fs = require('fs');
      const base64String = fs.readFileSync(path, 'base64');

      // Create a new Image instance
      const newImage = new Image({
        imageUrl: `data:image/png;base64,${base64String}`,
      });

      try {
        // Save the image to the database
        await newImage.save();
        console.log('Image uploaded and saved to MongoDB');
        return res.status(200).json({ message: 'Image uploaded successfully!' });
      } catch (error) {
        console.error('Error saving image to MongoDB:', error);
        return res.status(500).json({ error: 'Image upload failed!' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed!' });
  }
}
