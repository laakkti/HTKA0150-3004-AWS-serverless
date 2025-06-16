#### Endpoints

<pre>
endpoints:
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/login
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/signup
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/private
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/validategeojson
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/ndvi/getimages
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/get_token
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/get_statistics
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/getimage
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/mongo/getdates
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/mongo/getimages
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/mongo/getimage
  wss://w2iuklgym6.execute-api.eu-north-1.amazonaws.com/dev

functions:
  loginUser: ndvi-websocket-app-dev-loginUser
  signupUser: ndvi-websocket-app-dev-signupUser
  privateAPI: ndvi-websocket-app-dev-privateAPI
  connect: ndvi-websocket-app-dev-connect
  disconnect: ndvi-websocket-app-dev-disconnect
  getNdviDates: ndvi-websocket-app-dev-getNdviDates
  validateGeojson: ndvi-websocket-app-dev-validateGeojson
  get_allimages: ndvi-websocket-app-dev-get_allimages
  get_sentinelhub_token: ndvi-websocket-app-dev-get_sentinelhub_token
  get_sentinelhub_statistics: ndvi-websocket-app-dev-get_sentinelhub_statistics
  get_sentinelhub_image: ndvi-websocket-app-dev-get_sentinelhub_image
  get_mongo_dates: ndvi-websocket-app-dev-get_mongo_dates
  get_mongo_allimages: ndvi-websocket-app-dev-get_mongo_allimages
  get_mongo_image: ndvi-websocket-app-dev-get_mongo_image  
</pre>