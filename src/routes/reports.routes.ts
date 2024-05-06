import express, { Response, Request } from "express";
import authenticateToken from "../middleware/auth.middleware";
// import { reportController } from "../controllers";
// import credentials from "../../config/credentials.json"; // from test gmail
import credentials from "../../config/cred.json"; // from casting by dilini

const multer = require("multer");
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
const stream = require("stream");

// router.use(authenticateToken);
// router.get("/orders", reportController.getOrders);
// router.get("/top-selling-items", reportController.getTopSellingItems);
// router.get("/average-order-value", reportController.getAverageOrderValue);

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: "https://www.googleapis.com/auth/drive",
});

const drive = google.drive({
  version: "v3",
  auth,
});

const router = express.Router();

// Endpoint for handling file uploads
router.post("/", upload.single("file"), async (req: any, res: Response) => {
  try {
    const filename = uuidv4() + ".jpg";
    const fileMetadata = {
      name: filename,
      // parents: ["1cog7iX7KuQJ3sLILJnPoykh3cSpruEvy"], // from test gmail
      parents: ["1TOrx3kkTLY5Kt9d6MJhV2lhPWlIrhbTh"], // from casting by dilini
    };

    const media = {
      mimeType: req.file.mimetype,
      body: new stream.PassThrough().end(req.file.buffer),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = response.data.id;

    // Generate a publicly accessible URL for the uploaded image
    const fileURL = `https://lh3.googleusercontent.com/d/${fileId}`;

    console.log("File uploaded to Google Drive, ID:", fileId);
    res.status(200).json({ success: true, fileId, fileURL });
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post(
  "/upload-multiple",
  upload.array("files", 3),
  async (req: any, res) => {
    try {
      // Access the uploaded files in req.files
      const files = req.files;

      // Process each uploaded file
      const fileURLs = [];

      for (const file of files) {
        const filename = uuidv4() + ".jpg";
        const fileMetadata = {
          name: filename,
          // parents: ["1cog7iX7KuQJ3sLILJnPoykh3cSpruEvy"],
          parents: ["1TOrx3kkTLY5Kt9d6MJhV2lhPWlIrhbTh"], // from casting by dilini
        };

        const media = {
          mimeType: file.mimetype,
          body: new stream.PassThrough().end(file.buffer),
        };

        const response = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id",
        });

        const fileId = response.data.id;

        // Generate a publicly accessible URL for the uploaded image
        const fileURL = `https://lh3.googleusercontent.com/d/${fileId}`;

        console.log("File uploaded to Google Drive, ID:", fileId);
        fileURLs.push(fileURL);
      }

      res.status(200).json({ success: true, fileURLs });
    } catch (error) {
      console.error("Error uploading files to Google Drive:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
