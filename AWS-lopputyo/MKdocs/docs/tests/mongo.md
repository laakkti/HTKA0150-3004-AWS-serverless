
## Get dates

Get NDVI-image dates from Mongodb Atlas service.

```
requests/
└── mongo/
    └── get_dates.rest
```

`functions:`
```
get_mongo_dates:
    handler: mongo/lambda/getdates.handler
    events:
      - httpApi:
          path: /mongo/getdates
          method: post
```

```
POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/mongo/getdates
Content-Type: application/json

{
    "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          24.019017492777,
          64.233073829478
        ],
        [
          24.019347556527,
          64.232990313561
        ],
        [
          24.019615315522,
          64.232919904435
        ],
        [
          24.020482755912,
          64.233076168492
        ],
        [
          24.022361546928,
          64.233414777739
        ],
        [
          24.022304933188,
          64.233512300717
        ],
        [
          24.022162986048,
          64.233683337832
        ],
        [
          24.020810232778,
          64.233413298021
        ],
        [
          24.020072476793,
          64.23327072941
        ],
        [
          24.019017492777,
          64.233073829478
        ]
      ]
    ]
  }
}
```

```
sls logs -f funktionnimi
```

**On success**
<img src="../../img2/mongo_getdates_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>


## Get images

```
requests/
└── mongo/
    └── get_images.rest
```

`functions:`
```
get_mongo_allimages:
    handler: mongo/lambda/getimages.handler
    events:
      - httpApi:
          path: /mongo/getimages
          method: post
```

```
POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/mongo/getimages
Content-Type: application/json

{    
    "type": "Polygon",
    "coordinates": [
      [
        [
          24.019017492777,
          64.233073829478
        ],
        [
          24.019347556527,
          64.232990313561
        ],
        [
          24.019615315522,
          64.232919904435
        ],
        [
          24.020482755912,
          64.233076168492
        ],
        [
          24.022361546928,
          64.233414777739
        ],
        [
          24.022304933188,
          64.233512300717
        ],
        [
          24.022162986048,
          64.233683337832
        ],
        [
          24.020810232778,
          64.233413298021
        ],
        [
          24.020072476793,
          64.23327072941
        ],
        [
          24.019017492777,
          64.233073829478
        ]
      ]
    ]  
}
```

**On success**
<img src="../../img2/mongo_getimages_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>
