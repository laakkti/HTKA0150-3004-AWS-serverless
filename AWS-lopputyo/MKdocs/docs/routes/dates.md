#### Dates

The connection method is WebSocket. The WebSocket connection is secured using a token during the connection process. 
While getting data the situation/phases of the process is sent by websocket.

Retrieves/returns a list of Sentinel-hub NDVI dates with statistics and updates the database if new data is available.

List the days with found images for the given geometry found in Sentinel Hub. Service should store the given geometry and the days in which the images can be found so that there would be no need to re-query the days (only newer days from the last query should be queried) every time from Sentinel Hub. If the image is available for given day then the service should assign unique id "sentinelid" for that day and image. 

################


## connect
During the connect function, a token is used to authenticate the WebSocket connection.

```mermaid
sequenceDiagram
    Autonumber
    participant Client
    participant AWS as AWS: connect.handler    
    
    activate AWS
    Note left of AWS: wss://w2iuklgym6.execute-api.eu-north-1.amazonaws.com/dev?token
    Client->> AWS: #connect.handler (token in querystring)
    AWS ->> AWS: checkToken
    
    alt Token valid        
        AWS-->>Client: 200 connected
    #    Note right of AWS: connected
    else Token not valid
        
        AWS-->>Client: 403 forbidden 
    #    Note right of AWS: not connected
    end
    deactivate AWS

```

## getNdviDates

```mermaid
sequenceDiagram
    Autonumber
    participant Client
    participant AWS as AWS: getNdviDates.handler
    participant MongoDB
    participant SentinelHub

    activate AWS
    #Note left of AWS: wss://w2iuklgym6.execute-api.eu-north-1.amazonaws.com/dev?token
    Client->> AWS: socket.send(JSON.stringify({ action: "getNdviDates", data: geoData }));  
    AWS->> MongoDB: Query
    MongoDB-->> AWS: Data

    alt Data found in MongoDB
        alt Current date is newer than last date in list for specific geometry (AOI)
            AWS->>SentinelHub: Request new data
            SentinelHub-->>AWS: Response (New data)
            AWS->>MongoDB: Store new data
            AWS->>MongoDB: Query by geoJSON
            MongoDB-->>AWS: Data
        end
        AWS-->>Client: Response array of dates
        Note right of AWS: Data found in MongoDB
    else Data not found in MongoDB
        AWS->>SentinelHub: Request
        SentinelHub-->>AWS: Response (Data not found in MongoDB)
        AWS->>MongoDB: Store Data
        AWS->>MongoDB: Query
        MongoDB-->>AWS: Data
        AWS-->>Client: Response array of dates
        Note right of AWS: Data not found in MongoDB
    end
    deactivate AWS

```

if new data (statistics) is available it will be stored into the database. Also NDVI-imagedata related to all new dates will be request from SentinelHub

```mermaid
sequenceDiagram
    Autonumber
    participant AWS as AWS: getNdviDates.handler
    participant SentinelHub
    participant MongoDB

    AWS->>SentinelHub: Request new data    
    SentinelHub-->>AWS: Response (new data)
    AWS->>MongoDB: Store new data

    loop Request image data
        AWS->>SentinelHub: Request image data (for each new data item)
        SentinelHub-->>AWS: Response (image data)
        AWS->>MongoDB: Store image data with statistics
    end
```

## SentinelHub token-based authentication

For use of sentinelHub-service needs autentication token

sentinekhub token pitää ottaa talteen sillä sitä ei voida kysellä joka requestin yhteydessä not allowed for...
TÄMÄ LIITTYY dates websocket kohtaan SIIRRÄÄ sinne!!! koska siellä vain ollaan yhteydessä sentinelhubiin!!!!
```mermaid
sequenceDiagram
    participant Client as AWS:getNdviDates.handler
    participant AuthFunction as sentinelhub_authentication
    participant SSM as AWS:SSM
    participant Check as checkToken
    participant SHub as SentinelHub

    Client->>AuthFunction: Invoke sentinelhub_authentication()
    AuthFunction->>SSM: getParameter("sentinelhub_token")
    alt Token exists
        SSM-->>AuthFunction: Return token
        AuthFunction->>Check: checkToken(token)
        Check-->>AuthFunction: Return expiration time
        alt Token expiring soon (<= 600s)
            AuthFunction->>SHub: authenticate(client_id, client_secret)
            SHub-->>AuthFunction: Return newToken
            AuthFunction->>SSM: putParameter("sentinelhub_token", newToken)
        end
    else Token not found
        AuthFunction->>SHub: authenticate(client_id, client_secret)
        SHub-->>AuthFunction: Return newToken
        AuthFunction->>SSM: putParameter("sentinelhub_token", newToken)
    end
    AuthFunction-->>Client: Return valid token
```

Tämä kokonaisuudessaan tekee muutakin kuin vain palauttaa tiedot, hakeee sentinelistä ja tallentaa tietokantaan niin ei tarvitse jatkossa enää hakea ja käyttää sentnelhubin process ja request units.


## Code locations
```
websocket/
├── connect.js
├── disconnect.js 
└── getNdviDates.js
```


## Definition for serverless.yml

`functions:`
```
  connect:
    handler: websocket/connect.handler
    events:
      - websocket:
          route: $connect
  disconnect:
    handler: websocket/disconnect.handler
    events:
      - websocket:
          route: $disconnect
  getNdviDates:
    handler: websocket/getNdviDates.handler
    timeout: 240
    events:
      - websocket:
          route: getNdviDates
```
timeout is most important, depending of the size of the aoi (area of interenst) geometry, depending on timerange and traffic enough time is needed for the process.


##################################### tämä lähetetään fronendistä ja funktio on getNdvi...

on client

const geoData = {
    start_date: startDate,
    end_date: endDate,
    geometry: geoJson,
  };
socket.send(JSON.stringify({ action: "getNdviDates", data: geoData }));
#####################################

| Endpoint Url      |
| ----------------- |
| wss://w2iuklgym6.execute-api.eu-north-1.amazonaws.com/dev |


## **Request**

| Name         | Type                                   | Description                                                |
|--------------|----------------------------------------|-------------------------------------------------------------|
| geometry     | geoJSON                                | Geometry in geoJSON format, coordinate reference system WGS84 (EPSG:4326) |
| start_date   | dateString (ISO 8601) | The start date to include images from                      |
| end_date     | dateString (ISO 8601) | The end date to include images to                          |

```
{   
	"geometry": "geoJSON",
	"start_date": "dateString",
	"end_date": "dateString"
}
```

## **Response**

| Name           | Type                                   | Description                                           |
|----------------|----------------------------------------|-------------------------------------------------------|
|                | array                                  | All the days from which images can be queried          |
| generationtime | dateString (ISO 8601) | The date of the image                                 |
| sentinelid     | string                 | generationtime and geometry converted to sha256-format, generated for the request to be used when fetching the image from database e.g. 2023-05-30T00:00:00Z_c7a5478757abfae7286751b0950e58991fa3f6ef77f77e844baba038cb86b647|

```json 
[
  {
    "generationtime": "2023-05-15T00:00:00Z",
    "sentinelid": "2023-05-15T00:00:00Z_c7a5478757abfae7286751b0950e58991fa3f6ef77f77e844baba..."
  },
  {
    "generationtime": "2023-05-30T00:00:00Z",
    "sentinelid": "2023-05-30T00:00:00Z_c7a5478757abfae7286751b0950e58991fa3f6ef77f77e844baba..."
  },
  ...
]
```



