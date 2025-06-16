## using the demo/example client app for the AWS-serverless

### overview
TARINAA TÄHÄN DOC/readme.md ja ytsp0300-3004

<img src="../../img2/frontend/start.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/about.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/signup.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/login.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/geojson_validation.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/geojson_validation_error.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/geojson_validation_ok.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/prosessing.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/gettingimages.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_bar.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_stat.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_onmap.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_onmap_full.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_onmap_full_zoomed.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_location.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_location_full.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_location_full_zoomed.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

<img src="../../img2/frontend/showingdata_film.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

At the app bar there is button geometry for add new geometry of area of interest.
<img src="../../img2/frontend/geojson_validation.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

kerro kontrolleista kuinka voidaan vaihtaa päivämäärä bar-view swipe film dropdown


mainitse, että axios.all is used in parallel processing for the images from sentinelhub into mongoDb, jossakin toisessa yhteydessä mutta websocket info of the process käy tois nopeasti tässä tapauksessa.

<!--<video width="800" controls>
  <source src="../../video/frontend/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>-->

At first time when there is not data in database it takeas a while for the process.
When the data is already saved to the database, the data to the client is loaded very quickly. 