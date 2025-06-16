## Get all images

## PUUTTUU serverles.yml määritys

```
requests/
└── ndvi/
    └── get_ndvi_images.rest
```

`functions:`
```
  get_allimages:
    handler: NDVI/lambda/getimages.handler
    events:
      - httpApi:
          path: /ndvi/getimages
          method: post
          authorizer: PrivateAuthorizer
```


## Test

```
POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/ndvi/getimages
Content-Type: application/json
Authorization: Bearer eyJraWQiOiI5VnZvbGludEdKK3dXRlwvazFnZm4rcWVjdzRtakI2VzlJTmd4NlVoWnQ0QT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MGFjODlmYy01MDExLTcwNjctMGM1Ny1kZDZjNmFlZjI4NWEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LW5vcnRoLTEuYW1hem9uYXdzLmNvbVwvZXUtbm9ydGgtMV9TaFQxMFBTVUkiLCJjb2duaXRvOnVzZXJuYW1lIjoiQUE0NTk4QHN0dWRlbnQuamFtay5maSIsIm9yaWdpbl9qdGkiOiI1ZWMzZTA3Yy0yYjVhLTRmN2ItODNlZS1jNzEzYTQzNmVhZWUiLCJhdWQiOiIxdDkwN2x0cmE2dWdyYXZqMDlkYm42bGc1MSIsImV2ZW50X2lkIjoiYmY4NTkwOGYtYjRhMC00MDc5LWFiNTItN2FkMGRhYmRjNDY5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3NDkwOTQ4OTEsIm5hbWUiOiJUaW1vIExhYWtrb25lbiIsImV4cCI6MTc0OTExMjg5MSwiaWF0IjoxNzQ5MDk0ODkxLCJqdGkiOiJkZjU0ZTc4ZC1jM2U4LTRmYzQtYmU2ZC1hMjFlYzJiMmU2NDQiLCJlbWFpbCI6IkFBNDU5OEBzdHVkZW50LmphbWsuZmkifQ.EPw4ZTAdXD1jTTxjuz3iSmP0x8Cs68URvwp_T4caAax4JFNi94ZqOvdHxt6a3zI_sRmsJMeT0jbVO9JzMCHoTz9Qr6FmgXdHMsYgqS-Jpl9Unsr7NPuL7V9FjQUjrZ0Ieki0qphxslJmEZkRFs__RXyj6gmmlPp_E_TMZq9MX4yFpTjbyhUf-MTL8InyUkB0KeE1Wbb37McTkkD6Pua5W-a3tPH9LcflZsMACk-hbiqNPt4pyTBav-FC_QfxFjpeGuOa0Ev65FRx3XpuPmnRiqKdwxrUMsCoOwBJGfrnxib39t505qZwbySik_pfYjj4uksochDLPt8KDiGTA4XSGA

{
    "id":"c7a5478757abfae7286751b0950e58991fa3f6ef77f77e844baba038cb86b647"
}
```
**On success**
<img src="../../img2/allimages_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>



## validategeojson

```
requests/
└── ndvi/
    └── get_geojson_validation.rest
```

`functions:`
```
  validateGeojson:
    handler: NDVI/lambda/validateGeojson.handler
    events:
      - httpApi:
          path: /validategeojson
          method: post
```


```
POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/validategeojson
Content-Type: application/json

{
  "geojson": {
    "type": "Polygon",
    "coordinates": [
      [
        [24.019017492777, 64.233073829478],
        [24.019347556527, 64.232990313561],
        [24.019615315522, 64.232919904435],
        [24.020482755912, 64.233076168492],
        [24.022361546928, 64.233414777739],
        [24.022304933188, 64.233512300717],
        [24.022162986048, 64.233683337832],
        [24.020810232778, 64.233413298021],
        [24.020072476793, 64.23327072941],
        [24.019017492777, 64.233073829478]
      ]
    ]
  }
}
```
**On success**
<img src="../../img2/geojson_validation_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

**On failure**
<img src="../../img2/geojson_validation_test_error.png" alt="image 1" width="800" style="display: block; margin: 0;"/>