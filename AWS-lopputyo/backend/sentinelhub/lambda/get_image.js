// tätä ei varinaisesti käytetä mutta tehdään esimerksi
const {setAuthToken} = require("@sentinel-hub/sentinelhub-js");
const { sentinelhub_authentication } = require("../request_token");
const { getImage } = require("../request_image");

module.exports.handler = async (event) => {
  // tartee myös tokenin tsekkauksen, jaa'a toimiiko sentinelhub kirjaston kautta
  // http-vaihtoehto toisella koneella viime kevääältä tais olla joulukuussa
  // toimii set-metodilla

  const body = JSON.parse(event.body);

  const date=body.start_date;
  const geometry=body.geometry;

  const authToken = await sentinelhub_authentication();  
  setAuthToken(authToken);
  
  const image=await getImage(date, geometry);
  console.log("LAMBDA ", image);
  return {
    status: 200,    
    data: image
  };

};
