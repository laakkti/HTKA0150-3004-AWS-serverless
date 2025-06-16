

### image/getImageData.js
- `getPixelData`: Processes the response to extract pixel data and calculate color percentages.
- `getTemplate`: Creates a template with color percentages based on the given image.
- `getImageData`: Generates image data including statistics and bounding box information.

### image/scales.js
A template array containing objects with color information, amount, and from value.
### authenticate.js
- `authenticate`: Function to authenticate with Sentinel Hub API.

### bboxRatio.js
- `calculateAutoDimensions`: Calculates the auto dimensions for width and height based on the provided geometry, maximum width, and maximum height.
- `calculateMaxMetersPerPixel`: Calculates the maximum meters per pixel for a given geometry.
- `calculatePixelSize`: Calculates the pixel size based on the provided geometry and dimensions.

### calculateDim.js
- `calculateWidth`: Calculates the width dimension based on the given geometry and height.
- `calculateHeight`: Calculates the height dimension based on the given geometry and width.

### checkToken.js
- `getTokenFrom`: Extracts the token from the authorization header of a request.
- `checkAuthToken`: Checks the validity of the JWT token in the authorization header of a request.

### dateTime.js

- `getFormattedTime`: Formats the elapsed time into minutes and seconds.
- `zeroDateTime`: Sets the time of a date object to midnight (00:00:00.000).
- `addOneDay`: Adds one day to the given date.
- `sortByDateTime`: Sorts an array of objects by a specified date-time property.


### geoUtils.js
- `getFeatureCollectionMultiPolygon`: Gets the multi-polygon geometry from a feature collection.
- `appendPolygon`: Appends a polygon to the current geometry.
- `isPolygon`: Checks if a geometry is a polygon.
- `isMultiPolygon`: Checks if a geometry is a multi-polygon.
- `isBbox`: Checks if a geometry is a bounding box.
- `getLatLngFromBbox`: Gets the latitude and longitude coordinates from a bounding box.
- `areAllNumbers`: Checks if all elements in an array are numbers.
- `isValidBbox`: Checks if a bounding box is valid.
- `isValidGeometry`: Checks if a geometry is valid.
- `getBboxFromCoords`: Gets a bounding box from coordinates.
- `getAreaFromGeometry`: Gets the area from a geometry.
- `getAreaFromBounds`: Gets the area from a bounds object.
- `getIntersection`: Calculates the intersection of two geometries.
- `getProperGeometry`: Gets the proper geometry from bounds.
- `getUnion`: Computes the union of two geometries.
- `getAreaCoverPercentage`: Calculates the area cover percentage of one geometry over another.
- `focusMap`: Focuses on the map element.
- `getCoordsFromBbox`: Gets the coordinates from a bounding box.

### hash.js
- `sha256`: Calculates the SHA-256 hash of a given geometry object or string.

### isdateingrowingseason.js
- `isDateInGrowingSeason`: Checks if a given date falls within the specified growing season.

### middleware.js
- `getTokenFrom`: Retrieves the token from the request headers.
- `tokenExtractor`: Middleware for extracting and verifying JWT token from requests.

### scheduleUpdateDb.js
- `start`: Starts a cron job that runs the provided callback function at regular intervals.
- `stop`: Stops the currently running cron job.

