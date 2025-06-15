
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

const serviceAccount = require("./firebase-service-account.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "labzeta.appspot.com",
  });
}
const db = admin.firestore();
const bucket = admin.storage().bucket();

app.post("/submit", upload.any(), async (req, res) => {
  const id = "LZ-" + uuidv4().split("-")[0];
  const { name, email, description, category } = req.body;
  const file = req.files[0];

  let fileUrl = "";
  if (file) {
    const blob = bucket.file(`${id}-${file.originalname}`);
    await blob.save(file.buffer, { contentType: file.mimetype });
    fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  }

  await db.collection("requests").doc(id).set({
    id, name, email, description, category,
    fileUrl, status: "Pending", createdAt: new Date().toISOString()
  });

  res.json({ success: true, requestId: id });
});

app.get("/track/:id", async (req, res) => {
  const doc = await db.collection("requests").doc(req.params.id).get();
  if (!doc.exists) return res.json({ found: false });
  res.json({ found: true, data: doc.data() });
});

app.get("/admin-requests", async (req, res) => {
  const snapshot = await db.collection("requests").get();
  const data = snapshot.docs.map(doc => doc.data());
  res.json(data);
});

module.exports = app;
