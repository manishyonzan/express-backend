const express = require("express");
const orderController = require("../controller/order/order");
const { getUserFromToken } = require("../middleware/getUserFromToken");
const path = require("path");

const router = express.Router();
// router.get("/:filename",getUserFromToken,orderController.changeProductquantity);

const UPLOADS_DIR = path.join(__dirname, '..', 'files');

router.get("/:filename", (req, res) => {
    console.log("hello", UPLOADS_DIR);
    // res.sendFile(`C:/Users/SAMSUNG/Documents/express/pracrice/uploads/${req.params.filename}`);
    res.sendFile(path.join(UPLOADS_DIR, '/room3.jpeg'));
    // res.send({message:"hello world"})
});

// app.use("/images", express.static(path.join(__dirname,"public/images"))); this is done to statically serve images


// const corsOptions = {
//   origin: ["https://example.com", "https://anotherdomain.com"], // allowed origins
//   methods: ["GET"], // restrict to GET for static files
//   optionsSuccessStatus: 200
// };

// Apply CORS only to /images route
// app.use("/images", cors(corsOptions), express.static(path.join(__dirname, "public/images")));


// how to access this image from frontend
// fetch("/uploads/room3.jpeg", {
//   headers: {
//     Authorization: `Bearer ${yourToken}`
//   }
// })
//   .then(res => res.blob())
//   .then(blob => {
//     const url = URL.createObjectURL(blob);
//     document.getElementById("img").src = url;
//   });
// html
{/* <img id="img" /> */}




// give access to file using temporary signed url
// https://yourdomain.com/secure-file/room3.jpeg?token=abc123&expires=1700000000

/*

const crypto = require("crypto");

function generateSignedUrl(filename, expiresInSeconds = 300) {
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const secret = process.env.SIGNED_URL_SECRET || "your-secret-key";

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${filename}:${expires}`)
    .digest("hex");

  return `/secure-file/${filename}?expires=${expires}&token=${signature}`;
}




verify the signed url 
router.get("/secure-file/:filename", (req, res) => {
  const { filename } = req.params;
  const { token, expires } = req.query;

  const secret = process.env.SIGNED_URL_SECRET || "your-secret-key";
  const now = Math.floor(Date.now() / 1000);

  if (!token || !expires || now > parseInt(expires)) {
    return res.status(403).send("Link expired or invalid");
  }

  const expectedToken = crypto
    .createHmac("sha256", secret)
    .update(`${filename}:${expires}`)
    .digest("hex");

  if (token !== expectedToken) {
    return res.status(403).send("Invalid signature");
  }

  const filePath = path.join(UPLOADS_DIR, filename);
  res.sendFile(filePath);
});

can be directyly used in here
<img src="https://yourdomain.com/secure-file/room3.jpeg?token=...&expires=..." />
*/

module.exports = router;