import HttpStatus from 'http-status';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import repositories from '../repositories';
import config from '../config';

const { mediaRepository } = repositories;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { mediaType, mediaFor } = req.params;
    const fileDir = path.join(
      __dirname,
      `../../public/uploads/${mediaType}/${mediaFor}/`,
    );
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true }, (err) => {
        throw Error(err);
      });
    }

    file.thumbDir = fileDir;

    cb(null, `public/uploads/${mediaType}/${mediaFor}/`);
  },
  // filename: (req, file, cb) => {
  //   const datetimestamp = Date.now();
  //   const filename = file.originalname.replace(/[^A-Z0-9.]/gi, '-');
  //   const fileArray = filename.split('.');
  //   const ext = fileArray.pop();
  //   cb(null, `${fileArray.join('-')}-${datetimestamp}.${ext}`);
  // },
});

const uploadFile = multer({
  storage: config.app.mediaStorage === 'local' ? storage : null,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    let fileFormats = [];
    if (req.params.mediaType === 'image') {
      fileFormats = ['.png', '.jpg', '.gif', '.jpeg'];
    } else if (req.params.mediaType === 'video') {
      fileFormats = ['.mp4', '.mov', '.wmv', '.mp4'];
    } else if (req.params.mediaType === 'audio') {
      fileFormats = ['.aac', '.m4a', '.mp3'];
    } else if (req.params.mediaType === 'file') {
      fileFormats = ['.pdf', '.doc', '.docx'];
    } else if (req.params.mediaType === 'media') {
      fileFormats = ['.png','.jpg','.gif','.aac','.m4a','.mp3','.jpeg','.pdf','.doc','.docx','.mp4','.mov','.wmv',];}
    if (fileFormats.indexOf(ext.toLowerCase()) === -1) {
      return callback(
        new Error(`Allowed file format ${fileFormats.toString()}.`),
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: config.app.mediaUploadSizeLimit,
  },
});

// const createThumb = async (req, next) => {
//   const { filename: image, thumbDir } = req.file;
//   try {
//     await sharp(req.file.path)
//       .resize(150)
//       .jpeg({ quality: 50 })
//       .toFile(`${thumbDir}/${image}`);
//     return true;
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  async uploadMedia(req, res, next) {
    try {
      const { params } = req;
      const { mediaType } = params;
      params.mediaType = mediaType;

      uploadFile.single('file')(req, res, async (error) => {
        if (error instanceof multer.MulterError) {
        console.log("inside the uploadFile.single inside the MulterError");
          if (error.code === 'LIMIT_FILE_SIZE') {
            error.message = 'File Size Error'
          }
          error.status = HttpStatus.BAD_REQUEST;
          return next(error);
        }
        if (error) {
          // An unknown error occurred when uploading.
          error.status = HttpStatus.BAD_REQUEST;
          console.log("inside the upload media");
          return next(error);
        }

        if (config.app.mediaStorage === 'local') {
          // Generate Image thumb
          if (mediaType === 'image') {
            await createThumb(req, next);
          }
        }
        next();
      });
    } catch (error) {
      next(error);
    }
  },
  async saveMedia(req, res, next) {
    console.log("inside the saveMedia method");
    try {
      const result = await mediaRepository.creatAWS(req);
      res.status(HttpStatus.CREATED).json({
        success: true,
        data: result,
        message: '',
      });
    } catch (error) {
      next(error);
    console.log("inside the error");
    }
  },
};
