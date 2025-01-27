import multer from 'multer';
import fs from 'fs';
import { RequestHandler } from 'express';

// Configure multer diskStorage with dynamic destination
const storage = (uploadPath: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const userDefinedPath = uploadPath || 'public/'; // Use the provided path or default to 'public/'
      fs.mkdirSync(userDefinedPath, { recursive: true }); // Ensure the directory exists
      cb(null, userDefinedPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = (uploadPath: string) =>
  multer({
    storage: storage(uploadPath),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

export const singleFileUpload = (
  path: string,
  fieldname = 'media'
): RequestHandler => upload(path).single(fieldname);

export const multipleFileUpload = (
  path: string,
  fields: { name: string; maxCount: number }[]
): RequestHandler => upload(path).fields(fields);

// Clean up function to delete the temporary file if an error occurs
export const cleanUpFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Failed to delete file:', err);
    }
  });
};
