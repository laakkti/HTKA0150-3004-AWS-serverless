## AWS-serverless 

```
sls deploy
```
getting the endpoints

```
endpoints:
  POST - https://qz8q452n0a.execute-api.eu-north-1.amazonaws.com/handler/getNdviImages
  POST - https://qz8q452n0a.execute-api.eu-north-1.amazonaws.com/sentinelhub/get_token
  POST - https://qz8q452n0a.execute-api.eu-north-1.amazonaws.com/sentinelhub/get_statistics
  POST - https://qz8q452n0a.execute-api.eu-north-1.amazonaws.com/sentinelhub/getimage
  POST - https://qz8q452n0a.execute-api.eu-north-1.amazonaws.com/mongo/getdates
  POST - https://qz8q452n0a.execute-api.eu-north-1.amazonaws.com/mongo/getimages
  POST - https://qz8q452n0a.execute-api.eu-north-1.amazonaws.com/mongo/getimage
  wss://zaxu16xacl.execute-api.eu-north-1.amazonaws.com/dev

functions:
  connect: ndvi-websocket-app-dev-connect (59 MB)
  disconnect: ndvi-websocket-app-dev-disconnect (59 MB)
  getNdviDates: ndvi-websocket-app-dev-getNdviDates (59 MB)
  getNdviImages: ndvi-websocket-app-dev-getNdviImages (59 MB)
  get_sentinelhub_token: ndvi-websocket-app-dev-get_sentinelhub_token (59 MB)
  get_sentinelhub_statistics: ndvi-websocket-app-dev-get_sentinelhub_statistics (59 MB)
  get_sentinelhub_image: ndvi-websocket-app-dev-get_sentinelhub_image (59 MB)
  get_mongo_dates: ndvi-websocket-app-dev-get_mongo_dates (59 MB)
  get_mongo_allimages: ndvi-websocket-app-dev-get_mongo_allimages (59 MB)
  get_mongo_image: ndvi-websocket-app-dev-get_mongo_image (59 MB)
```

## Frontend
```
npm run build
```
As the result folder named `Dist` is created, folder contains working code, which can be deployed to any web-service you like.
