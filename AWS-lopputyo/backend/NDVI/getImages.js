const mongodb = require("./mongo/mongodb");

const getImages = async (id) => {
  

    console.log("#3 ############################################ id",id);

    let data = await mongodb.getAllImages(id);
    try {
      data = data.map((item) => {
        const plainObject = item.toObject({ getters: true, virtuals: false });
        const updatedImage = {
          ...plainObject.image,
          dataUrl: `data:image/png;base64,${Buffer.from(
            plainObject.image.dataUrl.buffer
          ).toString("base64")}`,
        };
        return {
          ...plainObject,
          image: updatedImage,
        };
      });
      return data;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }


module.exports = { getImages };
