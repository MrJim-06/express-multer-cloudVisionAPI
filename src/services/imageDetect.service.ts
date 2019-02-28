import * as request from 'request-promise';

import { googleApiConfig } from '../config/imageDetect.config';
import { ResponseStatus } from '../utils/enum/responseStatus';
import { labelDetectResponse, landmarkDetectResponse } from '../utils/responses';

export class ImageDetectService{

  public async labelDetect(srcImg): Promise<Object> {
    googleApiConfig.body.requests[0].image.content = srcImg;
    googleApiConfig.body.requests[0].features.type = 'LABEL_DETECTION';
    googleApiConfig.body.requests[0].features.maxResults = 10;
    const options = {
      method: 'POST',
      json: true,
      body: googleApiConfig.body,
      url: googleApiConfig.endPoint + googleApiConfig.key,
    };
    await request(options).then((result) => {
      labelDetectResponse.result = ResponseStatus.OK;
      labelDetectResponse.data = [];
      result.responses[0].labelAnnotations.forEach((data) => {
        labelDetectResponse.data.push({
          descreption: data.description,
          score: data.score,
        });
      });
    }).catch((err) => {
      labelDetectResponse.result = ResponseStatus.FAILED;
      console.log(err.message);
    });

    return labelDetectResponse;
  }

  public async landmarkDetect(srcImg): Promise<Object> {
    googleApiConfig.body.requests[0].image.content = srcImg;
    googleApiConfig.body.requests[0].features.type = 'LANDMARK_DETECTION';
    googleApiConfig.body.requests[0].features.maxResults = 1;
    const options = {
      method: 'POST',
      json: true,
      body: googleApiConfig.body,
      url: googleApiConfig.endPoint + googleApiConfig.key,
    };
    await request(options).then((result) => {
      landmarkDetectResponse.result = ResponseStatus.OK;
      landmarkDetectResponse.data.description = result.responses[0].landmarkAnnotations[0].description;
      landmarkDetectResponse.data.locations.latitude = result.responses[0].landmarkAnnotations[0].locations[0].latLng.latitude;
      landmarkDetectResponse.data.locations.longitude = result.responses[0].landmarkAnnotations[0].locations[0].latLng.longitude;
      console.log(result.responses[0].landmarkAnnotations[0]);
    }).catch((err) => {
      labelDetectResponse.result = ResponseStatus.FAILED;
      console.log(err.message);
    });

    return landmarkDetectResponse;
  }
}
