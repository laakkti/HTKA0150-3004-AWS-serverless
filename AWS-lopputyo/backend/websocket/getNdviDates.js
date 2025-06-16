const { getDates } = require("../NDVI/getDates");


const sendProgress = require("./sendProgress");
//const sendProgress = require("../NDVI/sendProgress");
//const { request_statistics } = require("../sentinelhub/request_statistics");

//*************************************************
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchOneNdviImage(imageId) {
  console.log(`Start fetching NDVI image for ID: ${imageId}`);
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  await sleep(500);
  console.log(`Finished fetching NDVI image for ID: ${imageId}`);
  return `Image ${imageId} fetched`;
}
//*************************************************


exports.handler = async (event) => {
  const { connectionId, domainName, stage, routeKey } = event.requestContext;
  //console.log("RouteKey:", routeKey);

  const body = JSON.parse(event.body);

  const dateFrom = body.data.start_date;
  const dateTo = body.data.end_date;
  const geometry = body.data.geometry;

  const fromTime = new Date(dateFrom);
  const toTime = new Date(dateTo);


  const handleProgress=async(ind,total)=>{
     
    await sendProgress({
    connectionId,
    domainName,
    stage,
    message: JSON.stringify({
      status: "progress",
      progress: ind ,
      total: total
    }),
  });

  }

  const data = await getDates(true, geometry, fromTime, toTime,handleProgress);

  const totalImages = 5;
  const results = [];

  // Send final result
  await sendProgress({
    connectionId,
    domainName,
    stage,
    message: JSON.stringify({
      status: "done",
      data: data ,
    }),
  });

  return { statusCode: 200 };
};
