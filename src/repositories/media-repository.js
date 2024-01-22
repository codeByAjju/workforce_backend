import config from "../config";
import constant from "../constant";
import models from '../models';
import path from 'path';
const { commanConstant } = constant;
const { media } = models;

export default {
  async creatAWS(params, file, headers, connection) {
    let output = '';
    const mediaType = config.app.mediaStorage === commanConstant.MEDIA.MEDIA_STORAGE.LOCAL
      ? params.mediaType : null;
    const imageDir = path.join(__dirname, `../../${file.path}`);
    const HTTPs = connection.encrypted === undefined ? 'http' : 'https'

    const mediaData = {
      name: file.filename || file.originalname,
      basePath: file.path,
      imagePath: imageDir,
      baseUrl: `${HTTPs}://${headers.host}/${file.path}`,
      mediaType,
      mediaFor: params.mediaFor,
      status: commanConstant.MEDIA.STATUS.PENDING,
    };
    const result = await media.create(mediaData);
    return result;
  }
}