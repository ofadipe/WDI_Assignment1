<template>
  <div class="map">
    
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <!-- Loop through the brewsData for l-marker -->
      <!-- For the lat-lng attribute, we pass the longitude and latitude to a custom method we made -->
      <l-marker
        v-for="(brew) in brewsData"
        v-bind:key="brew.id"
        :lat-lng="provideLatLng(brew.latitude, brew.longitude)"
      >
      <l-icon
      :icon-size="brew.iconSize"
      :icon-url="defaultIcon"> 

      </l-icon>
      </l-marker>
      <l-marker :lat-lng="userLocation" v-if="userLocation !==null">
        <l-icon
        :icon-size="[30,30]"
        :icon-url="locationIcon">

        </l-icon>
      </l-marker>
    </l-map>
  </div>
  <!-- /.row map -->
</template>

<script>
import { LMap, LTileLayer, LMarker,LIcon, L } from "vue2-leaflet";
import beer from "../assets/beer-icon.png"
import house from "../assets/house.png"

export default {
  name: "BrewMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  // Stating that we want brews passed through (data)
  props:{
    // Specify that brewsData prop has to be an array, otherwise will show an error in console
    brewsData: Array
  },
  data() {
    return {
      zoom: 13,
      defaultIcon: beer,
      locationIcon: house,
      
      center: L.latLng(47.41322, -1.219482),
      url:
        "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=fefd15e6d19f4972a552d8382d4ba42b",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482),
      userLocation: null
    };
  },
  methods: {
  
    provideLatLng(theLat, theLng) {
      // Takes a longitude and latitude, and will return a leaflet latLng object
      return L.latLng(theLat, theLng);
    }
  },
  mounted: function() {
    // When component loads, ask to get location and if yes it will create user marker
    this.$getLocation().then(coordinates => {
      this.userLocation = L.latLng(coordinates.lat, coordinates.lng);
      this.center = this.userLocation
    });

   
  }
};
</script>

<style lang="scss"  scoped>
.map {
  height: 95vh;
}
</style>
