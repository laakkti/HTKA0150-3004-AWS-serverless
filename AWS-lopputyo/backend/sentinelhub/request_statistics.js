const axios = require("axios");
var calculateDim = require("./utils/calculateDim");
const { sentinelhub_authentication } = require("./request_token");

const request_statistics = async (geometry, dateFrom, dateTo) => {
  
  const authToken = await sentinelhub_authentication();

  const evalscript = `
    //VERSION=3
    function setup() {
      return {
        input: [{
          bands: ["B04", "B08", "dataMask"]
        }],
        output: [
          {
            id: "NDVI",
            bands: 1,
            sampleType: "FLOAT32"
          },
          {
            id: "dataMask",
            bands: 1
          }
        ]
      };
    }

    function evaluatePixel(samples) {
      let ndvi = (samples.B08 - samples.B04) / (samples.B08 + samples.B04);
      return {
        NDVI: [ndvi],
        dataMask: [samples.dataMask]
      };
    }
  `;

  async function getWidthAndHeight(geometry) {
    const res = 512;
    let width = res;
    let height = await calculateDim.calculateHeight(geometry, width);
    if (width < height) {
      height = res;
      width = await calculateDim.calculateWidth(geometry, height);
    }
    return { width, height };
  }

  const { width, height } = await getWidthAndHeight(geometry);

  let bearAuthToken = `Bearer ${authToken}`;

  try {
    const result = await axios({
      method: "post",
      url: "https://services.sentinel-hub.com/api/v1/statistics",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearAuthToken,
      },
      data: {
        input: {
          bounds: {
            geometry: geometry,
          },
          data: [
            {
              dataFilter: { maxCloudCoverage: 20 },
              type: "sentinel-2-l1c",
            },
          ],
        },
        aggregation: {
          timeRange: {
            from: dateFrom,
            to: dateTo,
          },
          aggregationInterval: {
            of: "P1D",
          },
          RESX: "10m",
          RESY: "10m",
          width: width,
          height: height,
          evalscript: evalscript,
        },
        calculations: {
          default: {},
        },
      },
    });

    return {            
        status: result.status,
        data: result.data.data
      }
    
  } catch (err) {
    return {
      statusCode: 500,
      error: err.message,
    };
  }
};

module.exports = {
  request_statistics,
};
