import { ImageDetectController } from '../controllers/imageDetect.controller';
import { upload } from '../config/upload.config';

export class ImageDetectRoute {
  public controller: ImageDetectController = new ImageDetectController();

  public routes(app) {
    app.route('/labeldetect').post(upload.single('fileUpload'), this.controller.labelDetect);
    app.route('/landmarkdetect').post(upload.single('fileUpload'), this.controller.landmarkDetect);
  }
}
