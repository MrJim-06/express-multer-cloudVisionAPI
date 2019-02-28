export const googleApiConfig = {
  endPoint: 'https://vision.googleapis.com/v1/images:annotate?key=',
  key: '---Your Google Api Key------',
  body: {
    requests: [
      {
        image: {
          content: undefined,
        },
        features: {
          type: undefined,
          maxResults: undefined,
        },
      },
    ],
  },
};
