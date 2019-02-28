import * as fs from 'fs';
import { Request, Response } from 'express';

import { ImageDetectService } from '../services/imageDetect.service';

export class ImageDetectController {
  public async labelDetect(req: Request, res: Response) {
    const imageDetectService = new ImageDetectService();
    const imageFile = fs.readFileSync(req.file.path);
    const imageEncoded = Buffer.from(imageFile).toString('base64');
    const response = await imageDetectService.labelDetect(imageEncoded);
    res.status(200).send(response);
    fs.unlinkSync(req.file.path);
  }

  public async landmarkDetect(req: Request, res: Response) {
    const imageDetectService = new ImageDetectService();
    const imageFile = fs.readFileSync(req.file.path);
    const imageEncoded = Buffer.from(imageFile).toString('base64');
    const response = await imageDetectService.landmarkDetect(imageEncoded);
    res.status(200).send(response);
    fs.unlinkSync(req.file.path);
  }
}
