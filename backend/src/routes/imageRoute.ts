import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // עד 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("פורמט לא נתמך"));
  },
});

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "לא הועלתה תמונה" });

  const url = `/uploads/${req.file.filename}`;
  res.status(200).json({ url });
});

export default router;
