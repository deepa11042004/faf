import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

// Create upload directory helper
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/misc";

    if (req.baseUrl.includes("services")) {
      folder = "public/uploads/services";
    } else if (req.baseUrl.includes("projects")) {
      folder = "public/uploads/projects";
    } else if (req.baseUrl.includes("gallery")) {
      folder = "public/uploads/gallery";
    } else if (req.baseUrl.includes("team")) {
      folder = "public/uploads/team";
    } else if (req.baseUrl.includes("devices")) {
      folder = "public/uploads/devices";
    } else if (req.baseUrl.includes("settings")) {
      folder = "public/uploads/logos";
    } else if (req.baseUrl.includes("applications")) {
      folder = "public/uploads/resumes";
    } else {
      folder = "public/uploads/misc";
    }

    ensureDirectoryExists(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|webp/;
  const allowedDocTypes = /pdf|doc|docx/;

  const extname = path.extname(file.originalname).toLowerCase().replace(".", "");
  const mimetype = file.mimetype;

  if (file.fieldname === "resume") {
    if (allowedDocTypes.test(extname) || mimetype.includes("pdf") || mimetype.includes("word")) {
      return cb(null, true);
    }
    return cb(new Error("Only PDF, DOC, and DOCX files are allowed for resumes!"));
  }

  if (allowedImageTypes.test(extname) && mimetype.includes("image")) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, JPEG, PNG, and WebP image formats are supported!"));
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB Limit
  },
  fileFilter
});

/**
 * Optimizes a single file on disk in place using Sharp.
 */
async function optimizeSingleFile(file) {
  if (!file || !file.path) return;
  const isImage =
    file.mimetype?.startsWith("image/") ||
    /\.(jpg|jpeg|png|webp)$/i.test(file.path);

  if (!isImage) return;

  const tempPath = `${file.path}-temp-${Date.now()}`;
  try {
    // Rename existing file to temp
    await fs.promises.rename(file.path, tempPath);

    // Process with Sharp: downscale if > 1920px, compress quality to 82%
    await sharp(tempPath)
      .resize(1920, 1920, {
        fit: "inside",
        withoutEnlargement: true
      })
      .toFile(file.path);

    // Clean up temp file
    await fs.promises.unlink(tempPath).catch(() => {});
  } catch (err) {
    console.error("Sharp image optimization failed for:", file.path, err.message);
    // Restore temp file if original destination failed
    if (fs.existsSync(tempPath) && !fs.existsSync(file.path)) {
      await fs.promises.rename(tempPath, file.path).catch(() => {});
    }
  }
}

/**
 * Express middleware to automatically optimize all uploaded images in req.file / req.files.
 */
export const optimizeUploadedImages = async (req, res, next) => {
  try {
    if (req.file) {
      await optimizeSingleFile(req.file);
    }
    if (req.files) {
      const filesList = Array.isArray(req.files)
        ? req.files
        : Object.values(req.files).flat();
      for (const file of filesList) {
        await optimizeSingleFile(file);
      }
    }
  } catch (error) {
    console.error("Error in optimizeUploadedImages middleware:", error);
  }
  next();
};

