## Token

```
requests/
└── sentinelhub/
    └── get_sentinelhub_token.rest
```

`functions:`
```
get_sentinelhub_token:
    handler: sentinelhub/lambda/get_token.handler
    events:
    - httpApi:
        path: /sentinelhub/get_token
        method: post
```

```
POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/get_token
```

**On success**
<img src="../../img2/sentinelhub_token_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>


## Statistics

```
requests/
└── sentinelhub/
    └── get_statistics.rest
```

`functions:`
```
get_sentinelhub_statistics:
    handler: sentinelhub/lambda/get_statistics.handler
    timeout: 60
    events:
      - httpApi:
          path: /sentinelhub/get_statistics
          method: post
```
```
POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/get_statistics
Content-Type: application/json

{
    "start_date":"2024-04-01T00:00:00Z",
    "end_date":"2024-10-01T00:00:00Z",
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


**On success**
<img src="../../img2/sentinelhub_statistics_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

## Image

Getting processed NDVI image for specifig day from sentinelhub

```
requests/
└── sentinelhub/
    └── get_image.rest
```

`functions:`
```
get_sentinelhub_image:
    handler: sentinelhub/lambda/get_image.handler
    timeout: 30
    events:
      - httpApi:
          path: /sentinelhub/getimage
          method: post
```

POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/sentinelhub/getimage
Content-Type: application/json

{
    "start_date":"2024-04-19T00:00:00Z",    
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

**On success**
<img src="../../img2/sentinelhub_image_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>
