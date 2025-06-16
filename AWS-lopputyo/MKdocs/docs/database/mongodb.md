HUOM: insertMany eli array annetaan parametriksi
sekä dates että images

mongoURI="mongodb+srv://laakktidev:AA4598@develop.pgqgteo.mongodb.net/ndvidb?retryWrites=true&w=majority"

### Folder Structure

```
- mongo
  - models
    - dates.js
    - images.js
    - users.js
    - workarea.js
  - mongodb.js
```





miksi var -> const!!!

```
var mongoose = require("mongoose");

var workareaSchema = new mongoose.Schema({

  id: {
    type: String,
    required: true,
    unique: true,
  },
  workareaid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  backofficeid: {
    type: String,
    required: true,
    unique: false,
  },
  geometry: {
    type: String,
    required: true,
    unique: true,
  },
  ndvi: {
    type: Boolean,
    default: false,
  }
});

module.exports = new mongoose.model("Workarea", workareaSchema);
```

```mermaid
classDiagram

  class workareaSchema {
    - id: String
    - workareaid: String
    - name: String
    - backofficeid: String
    - geometry: String
    - ndvi: Boolean
    + required: true
    + unique: true
    + default: false
  }
```

<table>
  <tr>
    <td style="width: 48%;">
      <!-- Content for the first item -->
      Item 1 content goes here.
    </td>
    <td style="width: 48%;">
      <!-- Content for the second item -->
      Item 2 content goes here.
    </td>
  </tr>
</table>

noSQL
This adds neItem (array) to the beginning of the array of dates in document
markable is **$position: 0** to the beginnign of the array

```
const ret = await datesModel.findOneAndUpdate(
      { id: id },
      { $push: { dates: { $each: newItem, $position: 0 } } },
      { new: true }
 );
```

MongoDB Atlas "cloud service"
tähän oleelliset asiat mm. kuva rinnakkain
voiko kuvan klikata suurempana auki??? jos niin miten

Tietoturva!!!
ip access: huomioi lokaali docker ja azure

Data handling in Azure Data Studio integrated
https://docs.mongodb.com/mongodb-shell/

data in collection
db.dates.find()

db.dates.find({},{\_id:0,id:0,area:0,\_\_v:0})

count/size of dates array

db.dates.aggregate([ { $project: { _id: 0, datesCount: { $size: '$dates' } } }])

db.images.countDocuments()

poista collection:
db.dates.drop()



Data-studio kuvia myös


/**
 * Registers a new user.
 * @param {string} firstname - The user's first name.
 * @param {string} lastname - The user's last name.
 * @param {string} email - The user's email.
 * @param {string} passwordHash - The hashed password.
 * @param {boolean} admin - Whether the user is an admin.
 */
register,

/**
 * Logs in a user.
 * @param {string} email - The user's email.
 * @returns {Object|null} - The user object if found, otherwise null.
 */
login,

/**
 * Saves user data.
 * @param {string} data - The user data.
 * @returns {boolean} - Whether the operation was successful.
 */
saveUser,

/**
 * Retrieves user status.
 * @param {string} companyId - The company ID.
 * @returns {Object|boolean} - The user object if found, otherwise false.
 */
userStatus,

/**
 * Updates user data.
 * @param {string} companyId - The company ID.
 * @param {Array} data - The new data.
 * @returns {boolean} - Whether the operation was successful.
 */
updateUser,

/**
 * Saves image data.
 * @param {Object} data - The image data.
 * @returns {boolean} - Whether the operation was successful.
 */
saveImage,

/**
 * Retrieves image data by ID.
 * @param {string} id - The ID.
 * @returns {Object|null} - The image data object if found, otherwise null.
 */
getImage,

/**
 * Retrieves all images that match the search string.
 * @param {string} search - The search string.
 * @returns {Array} - The array of matching image data objects.
 */
getAllImages,

/**
 * Deletes an image by ID.
 * @param {string} id - The ID.
 * @returns {boolean} - Whether the operation was successful.
 */
deleteImage,

/**
 * Saves dates data.
 * @param {string} id - The ID.
 * @param {Array} data - The dates data.
 * @param {Object} geometry - The geometry.
 * @param {number} area - The area.
 * @returns {boolean} - Whether the operation was successful.
 */
saveDates,

/**
 * Inserts multiple dates into the database.
 * @param {Array} dataArray - The array of data objects.
 * @returns {boolean} - Whether the operation was successful.
 */
insertManyDates,

/**
 * Updates dates data.
 * @param {string} id - The ID.
 * @param {Array} newItem - The new item to add.
 * @returns {boolean} - Whether the operation was successful.
 */
updateDates,

/**
 * Deletes dates data.
 * @param {string} id - The ID.
 * @returns {boolean} - Whether the operation was successful.
 */
deleteDates,

/**
 * Retrieves dates data by ID.
 * @param {string} id - The ID.
 * @returns {Object|null} - The dates data object if found, otherwise null.
 */
getDates,

/**
 * Retrieves all date sets.
 * @returns {Array} - The array of date sets.
 */
getAllDateSets,

/**
 * Clears all collections in the database.
 */
doEmptyDb,

/**
 * Retrieves all data for a specific user.
 * @param {string} user - The user name.
 * @returns {Array} - The array of data objects.
 */
getAllData,

/**
 * Checks if data exists for a specific user and date.
 * @param {string} user - The user name.
 * @param {string} date - The date.
 * @returns {Object|null} - The data object if found, otherwise null.
 */
ifExists,

/**
 * Saves block data.
 * @param {Object} data - The block data.
 * @returns {boolean} - Whether the operation was successful.
 */
saveBlock,

/**
 * Retrieves all block data.
 * @returns {Array} - The array of block data objects.
 */
getBlocks,

/**
 * Retrieves all block data that are not marked as NDVI.
 * @returns {Array} - The array of block data objects.
 */
getBlocksNotNDVI,

/**
 * Sets the NDVI status of a block by ID.
 * @param {string} id - The block ID.
 * @param {boolean} status - The NDVI status to set.
 * @returns {boolean} - Whether the operation was successful.
 */
setBlockNDVIStatus,

/**
 * Sets the NDVI status of all block data.
 * @param {boolean} status - The NDVI status to set.
 * @returns {boolean} - Whether the operation was successful.
 */
setAllBlockNDVIStatus,

/**
 * Drops the dates collection.
 * @returns {boolean} - Whether the operation was successful.
 */
dropDates,

/**
 * Drops the images collection.
 * @returns {boolean} - Whether the operation was successful.
 */
dropImages





There is also postgreSQL approach in github source code 
but this doumentatioin is not handling it, mongoDb with some reason is the choosen one for the database. costs price
So the whole syste is MERN stack fullstack
LAITA tämä intoroolettä fullstack is MERN-stack.
Mern is very populr stack now a datas...

MERN is considered a full-stack because it encompasses both the client-side and server-side of web development:

Client-side (Front-end): React is used for building the user interface, which is the part of the app that users interact with directly.
Server-side (Back-end): Node.js runs the server, Express.js handles the routing and middleware, and MongoDB is used for storing data.
So, with MERN, you have all the components necessary to build and run a complete web application from start to finish, using JavaScript throughout the entire development process. This is why it’s referred to as a “full-stack” solution.🌐


Mainitse mongoose mongodb.js:ssä

https://www.npmjs.com/package/mongoose

```npm i mongoose```

HUOM: insertMany eli array annetaan parametriksi
sekä dates että images

mongoURI="mongodb+srv://laakktidev:AA4598@develop.pgqgteo.mongodb.net/ndvidb?retryWrites=true&w=majority"

### Folder Structure

```
- mongo
  - models
    - dates.js
    - images.js
    - users.js
  - mongodb.js
```

miksi var -> const!!!

```
var mongoose = require("mongoose");

var workareaSchema = new mongoose.Schema({

  id: {
    type: String,
    required: true,
    unique: true,
  },
  workareaid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  backofficeid: {
    type: String,
    required: true,
    unique: false,
  },
  geometry: {
    type: String,
    required: true,
    unique: true,
  },
  ndvi: {
    type: Boolean,
    default: false,
  }
});

module.exports = new mongoose.model("Workarea", workareaSchema);
```

```mermaid
classDiagram

  class workareaSchema {
    - id: String
    - workareaid: String
    - name: String
    - backofficeid: String
    - geometry: String
    - ndvi: Boolean
    + required: true
    + unique: true
    + default: false
  }
```

<table>
  <tr>
    <td style="width: 48%;">
      <!-- Content for the first item -->
      Item 1 content goes here.
    </td>
    <td style="width: 48%;">
      <!-- Content for the second item -->
      Item 2 content goes here.
    </td>
  </tr>
</table>

noSQL
This adds neItem (array) to the beginning of the array of dates in document
markable is **$position: 0** to the beginnign of the array

```
const ret = await datesModel.findOneAndUpdate(
      { id: id },
      { $push: { dates: { $each: newItem, $position: 0 } } },
      { new: true }
 );
```

MongoDB Atlas "cloud service"
tähän oleelliset asiat mm. kuva rinnakkain
voiko kuvan klikata suurempana auki??? jos niin miten

Tietoturva!!!
ip access: huomioi lokaali docker ja azure

Data handling in Azure Data Studio integrated
https://docs.mongodb.com/mongodb-shell/

data in collection
db.dates.find()

db.dates.find({},{\_id:0,id:0,area:0,\_\_v:0})

count/size of dates array

db.dates.aggregate([ { $project: { _id: 0, datesCount: { $size: '$dates' } } }])

db.images.countDocuments()

poista collection:
db.dates.drop()
