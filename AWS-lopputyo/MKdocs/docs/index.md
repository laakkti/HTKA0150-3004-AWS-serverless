# NDVI-kasvillisuusindeksi

https://fi.wikipedia.org/wiki/NDVI

Sovellus perustuu aiksemmin totetutettuun (seuraavaan) sovellukseen
frontend:
https://laakkti.github.io/ytsp0300-3004/
backend:
https://laakkti.github.io/ytsp0200-3004/

Tämä versio on yksinkertaistettu karsimalla joitakin toimintoja pois, tässä versiossa geometria (geoJson) syötetään (copy-paste)
sovellukselle, joka tarkistaa oikeellisuuden ja korjaa tiettyjä virheitä automaattisesti, myös sen, että ns. "right-hand rule"  
toteutuu.
lisäksi käytetään viteä (tseekkaa fullstackopenista mikä on vite!!!)


### Testit

### Käyttöesimerkki
#### Rekisteröinti/kirjautuminem

### teknisesti
#### Rekisteröinti/kirjautuminem






tämä vois olla liittenä/käsitteinä (vai mikä se on TERMINOLOGIA) ja linkki siihen täältä
## ✅ Oikean käden sääntö (Right-hand rule) – tiivistelmä

Kun käsitellään **Polygoneja ja MultiPolygoneja** (esim. GeoJSON- tai shapefile-muodossa GIS-sovelluksissa), **oikean käden sääntö** määrittää koordinaattien kiertosuunnan:

- 🔹 **Ulkoreuna** (polygonin ääriviiva) tulisi kiertää **vastapäivään** (CCW, *counterclockwise*).
- 🔹 **Sisemmät renkaat** (reiät polygonin sisällä) tulisi kiertää **myötäpäivään** (CW, *clockwise*).

---

### 🧭 Miksi tämä on tärkeää?

Tämä sääntö varmistaa **yhtenäisen geometrian esityksen**, mikä on tärkeää esimerkiksi:

- 📏 pinta-alan laskemisessa  
- 🗺️ kartalla piirtämisessä/renderöinnissä  
- 📐 geospatiaalisten operaatioiden (esim. sisältyvyys, leikkaus) tarkkuudessa






Sovelluksen toimintaa/lopputulwmaa ei kuvata tässä sen enempää kuin se tämä versio eroaa em. kuvatusta frontendin linkistä



TESTEISSÄ jätin tokenin pois, koska sillä ei ole käytännön merkitystä
mongofb,js sisältää myös yhteyden luonnin jos sitä ei ole entuudetaan, joten poista lähinnä requestien koodistq yhteyden luonti pois


mermaid jossa client websocket yhteys -> sentinelhub ->mongo
marmaid client http lambda getImages from mongo 

tämä on deployments

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


Olis ehkä kannattanut tehdä amplify vai mikä se oli serveri

Voisi olla niin, että aluksi leutaan sentinelhubista talletetaan mongoon ja luetaan momngosta
logi kuten nytkin tsktikenttää dates with getStatistics  get images siten että image by image save to mongo  
read from mongo all tai valittu
vai olisko niin ettei luetan kuin yksi eli kuten ennekin haetaan eka datet ja sitten valitaan ja haetaan image, 
mutta silloin socket olisi turha kun oli tarkoitus että edeistymisestä ilmoitetaan  
joten haetaan kaikki ja uusin noletusksena näkyviin listaan


Kutsu luku mongosta annetaan clientista samoin kuin datanhaku käsky sentinelhubista
eli kun socket kertoo että data haettu ja tallenentuu mongoon annetaan uusi köäsky lukea tietokannasta tietyltä 
aikaväliltä olevia tietoja.


Aluksi web-socketin kautta käyttäjä sai tietoa prosessin etenemisestä. on hyvä antaa 
tieto jos/kun toiminto kestää pidempään.

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
          

## TESTIT sentinelhub
### requests

```
requests/
└── get_sentinelhub_token.rest
```

```
sentinelhub/
└── lambda/
    └── get_sentinelhub_token.js
```

HUOMIOI .env jossa secretit koska ei ollut oikeuksia käyttääsecret manageia vai mikä se oli






```
serverless.yml
    functions:
        get_sentinelhub_token:
            handler: sentinelhub/lambda/get_sentinelhub_token.handler
            events:
            - httpApi:
                path: /sentinelhub/get_sentinelhub_token
                method: post
    iam:
    role:
        statements:
        - Effect: Allow
            Action: 
            - ssm:GetParameter
            - ssm:PutParameter
            Resource: "*

```           
huom httpApi  kun muuten kun kysessä on varsinaisesti websocket-app

- websocket:
          route: getNdviImages   

selitä mitä ja miksi on esim. aws-ssm? tässä tapauksessa tallenetaan token, joka on voimassa 60min. 
ettei tarvitse hakea joka kerta uudelleen, joka vie resureeseja sentinelhubista ja on myöskin rajoitettu niiden käyttö tietyllä aikavakiolla eli tietyssä ajassa tietty määrä sallittu.


```
requests/
└── get_statistics.rest
```

```
sentinelhub/
└── lambda/
    └── get_statistics.js
```

## TESTIT mongo
### requests






yksinkertainen kaavio
websocket ja lambda funktiot 

kappaleessa tähän linkki on kerrottu sovelluksesta vaikka kyseesä on backend kurssi olen tehnyt myös frontendin koska se on oleellinen... 





## UUTTA



endpointit

rekisteröityminen 
- kaavio
- mitä tarvitaan yml-fileen käytä tekoälyä kun kysyt mitä tarvitaan (anna yml-siäsltä AI:lle) cognito 
- tiedosto hierarkia
- testit rest koodi (joka voidaan toistaa copy-paste) - ja kuva kaappaus
- clientilta kaavio hierarkia (tiedosto services/user...) ja todellinen kuvakaappaus

- jso email löytyy jo  pitäisi tulla ilmoitus kuten loginissa käyttäjätunntu tai salasana väärin
  - signupissa ilmoitus jos salasana ei ole valid ja email ei ole valid 
```
endpoints:
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/login
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/signup
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/private
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/handler/getNdviImages
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/get_token
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/get_statistics
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/getimage
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/mongo/getdates
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/mongo/getimages
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/ndvi/getimages
  POST - https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/mongo/getimage
  wss://w2iuklgym6.execute-api.eu-north-1.amazonaws.com/dev
functions:
  loginUser: ndvi-websocket-app-dev-loginUser
  signupUser: ndvi-websocket-app-dev-signupUser
  privateAPI: ndvi-websocket-app-dev-privateAPI
  authorizer: ndvi-websocket-app-dev-authorizer
  connect: ndvi-websocket-app-dev-connect
  disconnect: ndvi-websocket-app-dev-disconnect
  getNdviDates: ndvi-websocket-app-dev-getNdviDates
  getNdviImages: ndvi-websocket-app-dev-getNdviImages
  get_sentinelhub_token: ndvi-websocket-app-dev-get_sentinelhub_token
  get_sentinelhub_statistics: ndvi-websocket-app-dev-get_sentinelhub_statistics
  get_sentinelhub_image: ndvi-websocket-app-dev-get_sentinelhub_image
  get_mongo_dates: ndvi-websocket-app-dev-get_mongo_dates
  get_mongo_allimages: ndvi-websocket-app-dev-get_mongo_allimages
  get_allimages: ndvi-websocket-app-dev-get_allimages
  get_mongo_image: ndvi-websocket-app-dev-get_mongo_image
```





## API for NDVI-satellite images and statistics from Sentinel-hub services 

This RESTful API makes it possible to getting NDVI (Normalized Difference Vegetation Index) satellite data from sentinel-hub service sentinel-2-l1c and serve it for client.
So the e.g. farmers and agriculture peoples can see the growing situation of the plants.

### NDVI (Normalized Difference Vegetation Index)

The well known and widely used NDVI is a simple, but effective index for quantifying green vegetation. It normalizes green leaf scattering in Near Infra-red wavelengths with chlorophyll absorption in red wavelengths.
The value range of the NDVI is -1 to 1. Negative values of NDVI (values approaching -1) correspond to water. Values close to zero (-0.1 to 0.1) generally correspond to barren areas of rock, sand, or snow. Low, positive values represent shrub and grassland (approximately 0.2 to 0.4), while high values indicate temperate and tropical rainforests (values approaching 1). It is a good proxy for live green vegetation.

<img src="img/ndvi.jpg" alt="image 1" width="600"/>

### Why sentinel-hub
 <a href="https://medium.com/sentinel-hub/tk-why-its-time-to-stop-processing-satellite-imagery-on-your-laptop-a09dbf8c72c0/" target="_blank">Why it’s time to stop processing satellite imagery on your laptop</a>


