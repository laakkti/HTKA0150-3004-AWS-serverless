### Structure/hierarchy


```
App
└── Navbar
    ├── Search AOI
    ├── Authentication (Login/Register)
    └── Demo Tools Tests About
        ├── NDVI-image & data
        ├── Controls
        ├── ActionBar
        │   ├── Chart
        │   ├── Statistics
        │   ├── CompareYears
        │   ├── OnMap
        │   ├── Location 
        │   └── Weather
        └── ImageFilm
```


### App.js

App is a main component of the application. 

## Navbar
App has a navbar which has login/logout/register functions.
When registered user logged in she/he can select one of the main pages Demo, Tools or Test. Searching and selecting AOI (Area Of Interest ) is handled from Navbar.
Administrator user has all features available, regular user just Demo.
In this document Tools and Tests presentations are not included.

<img src="../../images/navbar.png" alt="navbar" width="800" style="display: block; margin: 0;"/>
<img src="../../images/navbar2.png" alt="navbar" width="800" style="display: block; margin: 0;"/>

## Demo
Demo is the main component for this document.
<img src="../../images/demo.png" alt="navbar" width="800" style="display: block; margin: 0;"/>

### NDVI-image and data
There is a section for NDVI-image of selected date, scale stackbar   and statistical values on the table style of component.
<img src="../../images/image_data.png" alt="navbar" width="300" style="display: block; margin: 0;"/>

### Controls

Controls for "autoplay", speed of autoplay settings slider, arrow-buttons to change date step by step, doepdowns for date and year selection. 
<img src="../../images/controls.png" alt="controls" width="300" style="display: block; margin: 0;"/>


### ActionBar
Views can be selected from ActionBar-component.

<img src="../../images/actionbar.png" alt="actionbar" width="300" style="display: block; margin: 0;"/>

#### Views
     
- <a href="../../usage/chart/" target="_blank">Chart</a>
- <a href="../../usage/statistics/" target="_blank">Statistics</a>
- <a href="../../usage/compare_years/" target="_blank">Compare Years</a>
- <a href="../../usage/onmap/" target="_blank">On map</a>
- <a href="../../usage/location/" target="_blank">Location</a>
- <a href="../../usage/weather/" target="_blank">Weather</a>

### ImageFilm
In the lower right corner there is a button that opens the film view where all images are displayed as film images.
<img src="../../images/imagefilm.png" alt="actionbar" width="800" style="display: block; margin: 0;"/>

<a href="../../usage/film/" target="_blank">Film</a>

