## NDVI (Normalized Difference Vegetation Index)

The well known and widely used NDVI is a simple, but effective index for quantifying green vegetation. It normalizes green leaf scattering in Near Infra-red wavelengths with chlorophyll absorption in red wavelengths.
The value range of the NDVI is -1 to 1. Negative values of NDVI (values approaching -1) correspond to water. Values close to zero (-0.1 to 0.1) generally correspond to barren areas of rock, sand, or snow. Low, positive values represent shrub and grassland (approximately 0.2 to 0.4), while high values indicate temperate and tropical rainforests (values approaching 1). It is a good proxy for live green vegetation.

<img src="img/ndvi.jpg" alt="image 1" width="600"/>

[https://fi.wikipedia.org/wiki/NDVI](https://fi.wikipedia.org/wiki/NDVI)


The application is based on a previously implemented the following application

frontend:   
https://laakkti.github.io/ytsp0300-3004/

backend:   
https://laakkti.github.io/ytsp0200-3004/

Tämä versio on perusidealtaan yksinkertaistettu karsimalla joitakin toimintoja pois, tässä versiossa geometria (geoJson) syötetään (copy-paste)
sovellukselle, joka tarkistaa oikeellisuuden ja korjaa tiettyjä virheitä automaattisesti, myös sen, että ns. "right-hand rule"  
toteutuu.


#### API for NDVI-satellite images and statistics from Sentinel-hub services 

This RESTful API makes it possible to getting NDVI (Normalized Difference Vegetation Index) satellite data from sentinel-hub service sentinel-2-l1c and serve it for client.
So the e.g. farmers and agriculture peoples can see the growing situation of the plants.


#### Why sentinel-hub
 <a href="https://medium.com/sentinel-hub/tk-why-its-time-to-stop-processing-satellite-imagery-on-your-laptop-a09dbf8c72c0/" target="_blank">Why it’s time to stop processing satellite imagery on your laptop</a>


tämä vois olla liittenä/käsitteinä (vai mikä se on TERMINOLOGIA) ja linkki siihen täältä
**Oikean käden sääntö (Right-hand rule)**

Kun käsitellään **Polygoneja ja MultiPolygoneja** (esim. GeoJSON- tai shapefile-muodossa GIS-sovelluksissa), **oikean käden sääntö** määrittää koordinaattien kiertosuunnan:

- 🔹 **Ulkoreuna** (polygonin ääriviiva) tulisi kiertää **vastapäivään** (CCW, *counterclockwise*).
- 🔹 **Sisemmät renkaat** (reiät polygonin sisällä) tulisi kiertää **myötäpäivään** (CW, *clockwise*).


Tämä sääntö varmistaa **yhtenäisen geometrian esityksen**, mikä on tärkeää esimerkiksi:

- pinta-alan laskemisessa  
- kartalla piirtämisessä/renderöinnissä  
- geospatiaalisten operaatioiden (esim. sisältyvyys, leikkaus) tarkkuudessa



Sovelluksen toimintaa/lopputulemaa ei kuvata tässä sen enempää kuin se tämä versio eroaa em. kuvatusta frontendin linkistä


```
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
```

client:
socket.send(JSON.stringify({ action: "getNdviImages", data: { ... } }));

action: "getNdviImages"

getNdviImages is defined in serverless.yml the routeksi

functions:
  getNdviImages:
    handler: handler.getNdviImages
    events:
      - websocket:
          route: getNdviImages
          

selitä mitä ja miksi on esim. aws-ssm? tässä tapauksessa tallenetaan token, joka on voimassa 60min. 
ettei tarvitse hakea joka kerta uudelleen, joka vie resureeseja sentinelhubista ja on myöskin rajoitettu niiden käyttö tietyllä aikavakiolla eli tietyssä ajassa tietty määrä sallittu.



