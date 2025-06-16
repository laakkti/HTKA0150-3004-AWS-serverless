### The Evalscript

 Evalscripts are a piece of Javascript code, used to visualise satellite imagery and to control what values the Sentinel Hub services will return.

Evalscript, there is three functions:

In function setup()we specify the required (Sentinel-2) bands as inputs and also specify the output responses with individually assigned ids. We can further customise the number of bands and the raster sampleType of each output response to your requirements. We also specify the mosaicking method Orbit. This means you are requesting the flattened mosaicked image for each orbit so that there is only one sample per pixel per orbit.

With the help of preProcessScenes, we allow only data from the two defined dates to be used, and the Orbit mosaicking method is used to mosaic the two scenes that cover the AOI into a single pixel array.

The third function is where pixel analysis takes place; computing NDVI for both scenes and BSI for the second scene. Lastly, the harvested formula is applied to the two indices you generated.

Advanced evalscripts can be complicated, and what we explain above with all the functions, may not make sense if you are not familiar with them. We invite you to learn all about scripting with Sentinel Hub, starting with tutorials for anyone, including those not familiar with coding or remote sensing