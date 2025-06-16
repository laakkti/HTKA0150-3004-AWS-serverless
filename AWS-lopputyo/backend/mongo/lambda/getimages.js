const hash = require("../../NDVI/utils/hash");
const {getImages} = require("../../NDVI/getImages");


module.exports.handler = async (event) => {
  
  const body = JSON.parse(event.body);
  console.log("#00 ############################################", event.body);
  
  console.log("#0 ############################################", body);
  
  const geometry = body
  //let id = hash.sha256(JSON.stringify(geometry));
  
  console.log("#1 ############################################", geometry);

  let id = hash.sha256(geometry);

  console.log("#2 ############################################ id=",id);

  const images=await getImages(id);
  
  return images;

};
