<template>
  <div class="dashboard">
    <div id="data">
      <ul>
        <li>{{data.Total_Cases_max}}<div>Total</div></li>
        <li>{{data.Active_Cases_max}}<div>Active</div></li>
        <li>{{data.Recovered_max}}<div>Recovered</div></li>
        <li>{{data.Deaths_max}}<div>Death</div></li>
      </ul>
    </div>
    
    <div id="map"></div>
    <div style="text-align: left;" :v-if="patient" >
      <h3>{{patient.Name_of_the_Patient}}</h3> 
      <span>{{patient.Age}}yrs {{patient.Gender}}</span><br/>
      
      <span style="color: red" v-if="patient.Status == 'Death'">
        {{patient.Current_Status}}</span>
      <span style="color: green" v-else-if="patient.Status == 'Recovered'">  
         {{patient.Current_Status}}</span>
      <span style="color: orange" v-else>    
         {{patient.Current_Status}}</span>
      <br /><br />

      <address>{{patient.Address}}</address>
      {{patient.Travell_History__name_of_Country_City}}<br/><br/>
      {{patient.Isolation_Status}}<br/>
      
      <small>Identified on: {{format_date(patient.Date_of_Identification)}}</small>
      
    </div>
  </div>
</template>

<script>
var map;
 import moment from 'moment'
import DashboardApi from '../services/dashboard.js';
export default {
  name: 'Dashboard',
  props: {
    msg: String
  },
  data() {
    return {
      data: {},

      patient : {
        Name_of_the_Patient: '',
        Age: '',
        Gender: '',
        Current_Status: '',
        Address: '',
        Isolation_Status: '',
        Travell_History__name_of_Country_City: '',
      }
    }
  },
  methods :{
    setData(){
      this.patient = window.patient;
    },
    format_date(value){
        if (value) {
          return moment.unix(String(value/1000)).format('DD/MM/YYYY')
        }
    }
   },
  mounted:function() {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://apis.mapmyindia.com/advancedmaps/v1/vfuf54nw4uecvwwbvps3ak1wnls117vv/map_load?v=1.3')
    document.head.appendChild(recaptchaScript)

    DashboardApi.getData().then(data => {
      this.data = data[0].attributes;
      console.log(this.data)
    })
    
    DashboardApi.getList().then(list => {
      window.dashList = list;
      map = new window.MapmyIndia.Map("map",{ center:[12.972442,77.580643],zoomControl: true,hybrid:true });
      
      map.setZoom(11)

      var gIcon = window.L.icon(
        {
        iconUrl: 'https://maps.mapmyindia.com/images/2.png',
        iconRetinaUrl: 'https://maps.mapmyindia.com/images/2.png',
        iconSize: [34, 48], 
        popupAnchor: [-3, -15]
        }); 
        var rIcon = window.L.icon(
        {
        iconUrl: 'https://maps.mapmyindia.com/images/3.png',
        iconRetinaUrl: 'https://maps.mapmyindia.com/images/3.png',
        iconSize: [34, 48], 
        popupAnchor: [-3, -15]
        }); 
        var oIcon = window.L.icon(
        {
        iconUrl: 'https://maps.mapmyindia.com/images/8.png',
        iconRetinaUrl: 'https://maps.mapmyindia.com/images/8.png',
        iconSize: [34, 48], 
        popupAnchor: [-3, -15]
        }); 
        var bIcon = window.L.icon(
        {
        iconUrl: 'https://maps.mapmyindia.com/images/6.png',
        iconRetinaUrl: 'https://maps.mapmyindia.com/images/6.png',
        iconSize: [34, 48], 
        popupAnchor: [-3, -15]
        }); 
        console.log(gIcon, rIcon, oIcon, bIcon)
      for (var i=0;i<list.length;i++){
        var icon = oIcon;
        var idDate = moment.unix(String(list[i].attributes.Date_of_Identification/1000));
        var curDate = moment();
        if(curDate.diff(idDate, 'days') < 6) {
          icon = bIcon;
        }
        else if(list[i].attributes.Status == 'Recovered'){
          icon = gIcon;
        } else if(list[i].attributes.Status == 'Death') {
          icon = rIcon;
        } else {
          icon = oIcon;
        }
        var mk = window.L.marker([list[i].attributes.Y, list[i].attributes.X], {icon: icon, 'title':i}).addTo(map);
        mk.on("click", function (e) 
        {
          var id = e.target.options.title;

          window.patient= window.dashList[id].attributes;
          
          window.Dash.$children[0].$children[0].setData();
        });     
      }
      
     
      //get zoho token if logged in as Zoho user
      
      
    })
  
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map {
    height: 400px;  /* The height is 400 pixels */
    width: 100%;  /* The width is the width of the web page */
    margin: 20px 0;
    
  }
  h3 {
    margin: 0 4px;
  }
  address, small {
    color: #999;
  }
  #data {
    margin-bottom: 30px;
  }
  #data ul {
    margin: 0 auto; padding: 0;
    list-style: none;
    overflow: auto;
  }
    #data ul li {
      float: left;
      margin-right: 50px;
      font-size: 45px;
      font-weight: bold;
    }
      #data ul li div {
        font-size: 12px;
        font-weight: normal;
        color: #666;
      }

</style>
