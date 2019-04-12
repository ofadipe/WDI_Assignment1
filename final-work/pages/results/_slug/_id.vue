<template>
  <div v-if="object !== null">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 class="">
 <v-img
          style="color: white"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              height="300"
              :src="object.picture.url"
            >
          <v-layout row wrap class="mx-4 mb-4 mt-4">

            <v-flex xs12 >


              <h1>{{object.name}}</h1>
            </v-flex>
            <v-flex xs4>{{object.summary}}</v-flex>
            <!--- Needs to be moved to the right more -->
            <v-flex xs8 class="" >
              <a :href="object.website_url" target="_blank">Website: {{object.website_url}}</a>
            </v-flex>
          </v-layout>

              </v-img>
        </v-flex>
        <v-flex xs6 mt-4>
          <h2>About {{object.name}}</h2>
          {{object.description}}
        </v-flex>
        <v-flex xs6 mt-4>
          <iframe
            v-if="object.video.platform == 'youtube'"
            width="560"
            height="315"
            :src="'https://www.youtube.com/embed/' + object.video.id"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <iframe
            v-else-if="object.video.platform == 'vimeo'"
            :src="'https://player.vimeo.com/video/'+ object.video.id"
            width="640"
            height="320"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          ></iframe>
          <!-- Move to the right more -->
          <img v-else :src="object.picture.url" :alt="'Photograph of ' + object.name" width="400" height="300">
        </v-flex>
        <v-flex xs12 align-center text-xs-center class="mt-4" v-if="object.important !== ''">
          <h2>Important information</h2>
          {{object.important}}
        </v-flex>
        <v-flex xs12>
          <GmapMap
            :center="{lat:object.location.geocode.lat, lng:object.location.geocode.lng}"
            :zoom="15"
            map-type-id="terrain"
            style="width: 100%; height: 500px"
          >
            <GmapMarker
              :position="{lat:object.location.geocode.lat, lng:object.location.geocode.lng}"
              :clickable="true"
            />
          </GmapMap>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>
<style>
</style>
<script>
export default {
  data() {
    return {
      object: null,
      weather: null
    };
  },
  methods: {
    getWeather() {
      this.$axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + this.object.location.geocode.lat + '&lon=' + this.object.location.geocode.lng + '&APPID=03bc9df889d6cf24f69ebed9ace4d15b')
      .then(response => {
        console.log("Weather below");
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    // process.env.variablename for environment variables output
    console.log("The API key is: " + process.env.API_KEY);

    // Provide Authroization Header that is a bearer
    const config = {
      headers: { Authorization: "bearer " + process.env.API_KEY }
    };
    // Create the axios request including the headers
    this.$axios
      .get(
        // The ID paramater gets taken from the localhost URL and put to our API Search
        "https://api.autoura.com/api/stops/get?stop_id=" +
          this.$route.params.id,
        config
      )
      .then(response => {
        // Code works
        this.object = response.data.response[0];
        this.getWeather();
        console.log(response);
      })
      .catch(error => {
        // Code doesnt work
        console.log(error);
      });


  }
};
</script>

