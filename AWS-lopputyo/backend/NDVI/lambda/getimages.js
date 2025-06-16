const {getImages} = require("../getImages");


module.exports.handler = async (event) => {
  
  const body = JSON.parse(event.body);
  
  const id = body.id;
  
  const images=await getImages(id);
  
  return images;

};
