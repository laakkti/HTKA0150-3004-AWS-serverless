const { setAuthToken } = require("@sentinel-hub/sentinelhub-js");
const { sentinelhub_authentication } = require("../sentinelhub/request_token");
const axios = require("axios");
const hash = require("./utils/hash");
const geoUtils = require("./utils/geoUtils");
const { request_statistics } = require("../sentinelhub/request_statistics");

const mongodb = require("./mongo/mongodb");

const { getImage } = require("../sentinelhub/request_image");
const { getImageData } = require("../sentinelhub/utils/image/getImageData");
const dateTime = require("./utils/dateTime");


const getImageWithData = async (item, geometry) => {
  let image = await getImage(item.generationtime, geometry);

  console.log("xxxxxxxxxxxxxxxxxxxxxx ", image);

  if (image) {
    let data = await getImageData(geometry, image, {
      id: item.sentinelid,
      average: item.stats.average,
      max: item.stats.max,
      min: item.stats.min,
      std: item.stats.std,
    });

    return data;
  } else {
    return null;
  }
};

const getSentinelDates = async (geometry, fromTime, toTime) => {
  let data = [];
  const stats = await request_statistics(geometry, fromTime, toTime);

  let statsData = stats.data;
  //console.log("wwwwwwwwwwwwwwwwwwwwwwwwww");
  //console.log(JSON.stringify(statsData));

  if (statsData.length > 0) {
    statsData.reverse();
    for (let stat of statsData) {
      let statRef = stat.outputs.NDVI.bands.B0.stats;
      let mean = statRef.mean;
      if (mean >= 0.1) {
        data = [
          ...data,
          {
            generationtime: stat.interval.from,
            stats: {
              average: statRef.mean,
              max: statRef.max,
              min: statRef.min,
              std: statRef.stDev,
            },
            sentinelid: stat.interval.from + "_" + hash.sha256(geometry),
          },
        ];
      }
    }
  } else {
    console.log(
      "No data for the geometry **********************************************************************",
      fromTime,
      " - ",
      toTime
    );
  }

  return data;
};

const saveSentinelDataToMongo = async (save, geometry, fromTime, toTime,handleProgress) => {
  
  let id = hash.sha256(geometry);
  const area = geoUtils.getAreaFromGeometry(geometry);
  let savedDates = [];
  let res = null;

  try {
    if (save) {
      res = await mongodb.saveDates(id, savedDates, geometry, area);
    }

    let startTime = performance.now();
    
    console.log("Quering NDVI-dates from sentinelHub");
    await handleProgress("Quering NDVI-dates from sentinelHub",null);

    let dates = await getSentinelDates(geometry, fromTime, toTime); 
    let endTime = performance.now();
    var elapsedTime = endTime - startTime;
    console.log(
      dates.length,
      " STATISTICS ElapsedTime (sec): ",
      elapsedTime / 1000
    );

    console.log("#1 ------------------------------------------");

    console.log(dates);

    console.log("#2 ------------------------------------------");

    if (dates.length > 0) {
      startTime = performance.now();
      let ind=0;
      const responses = await axios.all(
        dates.map(async (item) => {
          let _data = await getImageWithData(item, geometry);
          
          if (_data) {
            //console.log("#### IMAGE ", _data);
            await mongodb.saveImage(_data);
            ind++;
            await handleProgress(ind, dates.length)

          }
        })
      );
    
      console.log("responses )))))))))))))))))))  ",responses);
      endTime = performance.now();
      elapsedTime = endTime - startTime;
      console.log("IMAGES ElapsedTime (sec): ", elapsedTime / 1000);

      savedDates = dateTime.sortByDateTime(dates, "generationtime", "desc");
      res = await mongodb.updateDates(id, savedDates);
      return res;
    }

    return false;
  } catch (e) {
    console.log("XXerror: ", e.message);
    return false;
  }
};

const getDates = async (
  ifReturnsData,
  geometry,
  fromTime,
  toTime,
  handleProgress
) => {
  
  const authToken = await sentinelhub_authentication();
  setAuthToken(authToken);

  let status = true;
  let id = hash.sha256(geometry);

  let data = await mongodb.getDates(id);

  console.log("data", data);
  if (!data || data.dates.length === 0) {
    console.log("#1");
    //return null;
    status = await saveSentinelDataToMongo(true, geometry, fromTime, toTime, handleProgress);
  } else if (data.dates.length === 0) {
    // ei ole vielä dataa tietokannassa
    console.log("#2");
    return null;
  } else {
    // päivitetään jos tarvetta
    console.log("#3", status);

    /*
    console.log(
      toTime,
      " isDateInGrowingSeason ",
      isDateInGrowingSeason(toTime, growingSeason)
    );
    if (isDateInGrowingSeason(toTime, growingSeason)) {*/
    
    if (data.dates[0].generationtime < dateTime.zeroDateTime(toTime)) {
      let fromTime = new Date(dateTime.addOneDay(data.dates[0].generationtime));
      console.log("#4", status);
      status = await saveSentinelDataToMongo(false, geometry, fromTime, toTime,handleProgress);
    }
    //}
  }

  console.log(status, "---", ifReturnsData);
  if (ifReturnsData) {
    data = await mongodb.getDates(id);
    console.log("################## ifRet ", data);
    return data;
  } else {
    return null;
  }
};

module.exports = { getDates };
