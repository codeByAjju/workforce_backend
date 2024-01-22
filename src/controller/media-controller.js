import HttpStatus from "http-status";
import multer from "multer";
import fs from "fs";
import path from "path";
import repositories from "../repositories";
import config from "../config";

const { mediaRepository } = repositories;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { mediaType, mediaFor } = req.params;
    cb(null, `public/uploads/${mediaType}/${mediaFor}/`);
  },
});

const uploadFile = multer({
  storage: config.app.mediaStorage === "local" ? storage : null,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    let fileFormats = [];
    if (req.params.mediaType === "image") {
      fileFormats = [".png", ".jpg", ".gif", ".jpeg"];
    } else if (req.params.mediaType === "video") {
      fileFormats = [".mp4", ".mov", ".wmv", ".mp4"];
    } else if (req.params.mediaType === "audio") {
      fileFormats = [".aac", ".m4a", ".mp3"];
    } else if (req.params.mediaType === "file") {
      fileFormats = [".pdf", ".doc", ".docx"];
    } else if (req.params.mediaType === "media") {
      fileFormats = [
        ".png",
        ".jpg",
        ".gif",
        ".aac",
        ".m4a",
        ".mp3",
        ".jpeg",
        ".pdf",
        ".doc",
        ".docx",
        ".mp4",
        ".mov",
        ".wmv",
      ];
    }
    if (fileFormats.indexOf(ext.toLowerCase()) === -1) {
      return callback(
        new Error(`Allowed file format ${fileFormats.toString()}.`)
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: config.app.mediaUploadSizeLimit,
  },
});

export default {
  async uploadMedia(req, res, next) {
    try {
      const { params } = req;
      const { mediaType } = params;
      params.mediaType = mediaType;

      uploadFile.single("file")(req, res, async (error) => {
        if (!error) {
          const result = await mediaRepository.creatAWS(req);
        } else {
          console.log(error);
        }
      });
    } catch (error) {
      next(error);
    }
  },
};
