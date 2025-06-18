### NDVI (Normalized Difference Vegetation Index)

The well known and widely used NDVI is a simple, but effective index for quantifying green vegetation. It normalizes green leaf scattering in Near Infra-red wavelengths with chlorophyll absorption in red wavelengths.
The value range of the NDVI is -1 to 1. Negative values of NDVI (values approaching -1) correspond to water. Values close to zero (-0.1 to 0.1) generally correspond to barren areas of rock, sand, or snow. Low, positive values represent shrub and grassland (approximately 0.2 to 0.4), while high values indicate temperate and tropical rainforests (values approaching 1). It is a good proxy for live green vegetation.

<img src="img/ndvi.jpg" alt="image 1" width="600"/>

[https://fi.wikipedia.org/wiki/NDVI](https://fi.wikipedia.org/wiki/NDVI)


### AWS-serverless API for NDVI-satellite images and statistics from Sentinel-hub services 

This AWS-serverless API makes it possible to getting NDVI (Normalized Difference Vegetation Index) satellite data from sentinel-hub service sentinel-2-l1c and serve it for client.
So the e.g. farmers and agriculture peoples can see the growing situation of the plants.

#### Why sentinel-hub
 <a href="https://medium.com/sentinel-hub/tk-why-its-time-to-stop-processing-satellite-imagery-on-your-laptop-a09dbf8c72c0/" target="_blank">Why it’s time to stop processing satellite imagery on your laptop</a>

### Idea 
The idea of the topic for this exercise is based on a previously implemented the following MERN-fullstack

frontend:   
<a href="https://laakkti.github.io/ytsp0300-3004/" target="_blank" rel="noopener noreferrer">https://laakkti.github.io/ytsp0300-3004/</a>

backend:   
<a href="https://laakkti.github.io/ytsp0200-3004/" target="_blank" rel="noopener noreferrer">https://laakkti.github.io/ytsp0200-3004/</a>


This version is simplified in terms of its core idea by removing some functionalities. In this version, the geometry (GeoJSON) is input (via copy-paste) into the application, which checks its validity and automatically corrects certain errors, including ensuring that the so-called "right-hand rule" is followed.


*Note:* Right-hand Rule

When working with Polygons and MultiPolygons (e.g., in GeoJSON or shapefile format in GIS applications), the right-hand rule defines the coordinate winding order:

🔹 The outer ring (the polygon's outer boundary) should be wound counterclockwise (CCW).

🔹 Inner rings (holes within the polygon) should be wound clockwise (CW).

This rule ensures a consistent geometric representation, which is important for:

- calculating area

- rendering/drawing on maps

- accuracy of geospatial operations (e.g., containment, intersection)


The implementation of the frontend application is not described in detail in this document, only how it is used in practice.   
This document focuses on describing the AWS serverless backend implementation.