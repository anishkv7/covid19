var request = require('request');
 
const express = require('express');
const app = express();

var optionsget = {
    host : 'static.paytmmoney.com', // here only the domain name
    // (no http/https !)
    port : 443,
    path : '/data/v1/cs_tmp.json', // the rest of the url with parameters if needed
    method : 'GET' // do GET
};




app.get('/api/map', (req, res) => {
    var options = {
        headers: {
            'authority': 'services7.arcgis.com',
            'origin': 'https://bbmp.maps.arcgis.com',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty' ,
            'dnt': 1,
            'accept': '*/*',
            'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,ta;q=0.6'
          },
        url: 'https://services7.arcgis.com/PVhiR1dVuMSOD2an/arcgis/rest/services/Linelist_of_Positive_Cases_Revised/FeatureServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A8609866.866053622%2C%22ymin%22%3A1408887.3053448573%2C%22xmax%22%3A8688138.383017674%2C%22ymax%22%3A1487158.8223089091%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D%0A&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100&resultType=tile',
        method: 'GET'
        }
    request(options, function(error, response, body) {
            
            res.json(JSON.parse(body).features)
        });
});

app.get('/api/data', (req, res) => {
    //
    var q = [{"onStatisticField":"Total_Cases","outStatisticFieldName":"Total_Cases_max","statisticType":"max"}, 
            {"onStatisticField":"Active_Cases","outStatisticFieldName":"Active_Cases_max","statisticType":"max"},
            {"onStatisticField":"Recovered","outStatisticFieldName":"Recovered_max","statisticType":"max"},
            {"onStatisticField":"Deaths","outStatisticFieldName":"Deaths_max","statisticType":"max"}]
    
    var options = {
        headers: {
            'authority': 'services7.arcgis.com',
            'origin': 'https://bbmp.maps.arcgis.com',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty' ,
            'dnt': 1,
            'accept': '*/*',
            'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,ta;q=0.6'
          },
        url: 'https://services7.arcgis.com/PVhiR1dVuMSOD2an/arcgis/rest/services/total_numbers/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics='+ encodeURIComponent(JSON.stringify(q)),
        method: 'GET'
        }
    request(options, function(error, response, body) {
           //console.log(error, response, body)
            res.json(JSON.parse(body).features)
        });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});