#### getImage.js

### NDVI Image Fetching Module

This JavaScript module fetches NDVI (Normalized Difference Vegetation Index) images from Sentinel Hub based on a given date and geometry. Below is a summary of the key components and functionality.

## Imports
- **sentinelHub**: A library for interacting with Sentinel Hub's API.
- **calculateDim**: A custom utility module for calculating image dimensions.
- **get_bounding_box**: A function from the `@turf/bbox` package to get the bounding box of a geometry.

## Helper Functions
### `addOneDay(date)`
- **Description**: Takes a date object and returns a string representing the next day in ISO format.
- **Parameters**: `date` - The input date.
- **Returns**: A string representing the date of the next day.

### `getWidthAndHeight(geometry)`
- **Description**: Calculates the width and height for an image based on a provided geometry.
- **Parameters**: `geometry` - The geometry object.
- **Returns**: An object containing the width and height for the image.

## Main Function
### `getImage(date, geometry)`
- **Description**: Fetches an NDVI image for a specific date and geometry.
- **Parameters**: 
  - `date` - The date of the image.
  - `geometry` - The geometry object.
- **Returns**: The NDVI image response.
- **Details**:
  - **Evalscript**: Defines how to calculate NDVI and visualize it with specific color mappings based on the NDVI value.
  - **Layer Setup**: Configures a Sentinel-2 Layer with the evalscript and a cloud cover limit.
  - **Image Dimensions**: Uses `getWidthAndHeight` to determine the image's width and height.
  - **Bounding Box**: Computes the bounding box for the provided geometry.
  - **Map Parameters**: Sets parameters for the map request, including time range (from the given date to the next day), resolution (10m), and image dimensions.
  - **Fetch Image**: Attempts to fetch the NDVI image using the specified layer and parameters. Logs an error if the fetch fails.

## Export
- The module exports the `getImage` function, making it available for other parts of the application to use.

