<template>
  <div class="results">
    <!-- Loop through each result and create an nuxt-link that goes to /results/ID  -->
    Pick a type:
    <!-- v-on:change, when a option is changed, we run changeSearch() function -->
    <select name id v-model="searchPick" v-on:change="changeSearch()">
      <option value="accom">Accomodation</option>
      <option value="food">Food</option>
      <option value="event">Event</option>
      <option value="attraction">Attraction</option>
      <option value="poi">Point of Interest</option>
      <option value="tour">Tour</option>
    </select>
    <!-- Wheel Chair Checkbox, v-model to wheelChair data that is set to false by default, when clicked it will run changeSearch()-->

    <label for="checkboxPets"> Pets </label>
    <!-- This is the checkbox for pets -->
    <input
    type="checkbox"
    id="checkboxPets"
    v-model="pets"
    v-on:change="changeSearch()"
    >
        <label for="checkboxWheelChair">Wheelchair</label>
    <!-- v-on:change, when a option is changed, we run changeSearch() function -->
    <input
      type="checkbox"
      id="checkboxWheelChair"
      v-model="wheelChair"
      v-on:change="changeSearch()"
    >

    <!-- v-on:change, when a option is changed, we run changeSearch() function -->
    <select name id v-model="groupPick" v-on:change="changeSearch()">
      <option value="friends">Friends</option>
      <option value="solo">Individual</option>
      <option value="couple">Couple</option>
      <option value="kids">Kids</option>
      <option value="teenagers">Teenagers</option>
      <option value="Group">Groups</option>
      <option value="party">Party</option>
    </select>

    <template v-if="results!==null ">
      <template v-if="results.length == 0">Sorry there were no results</template>
      <template v-else>
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="result in results" v-bind:key="result.stop_id">
                <v-card>
                  <v-img height="200px" :src="result.picture.url" v-if="result.picture.url !== null">
                    <v-container fill-height fluid pa-2>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline white--text" v-text="result.name"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- v if to check result in for loop has wheelchair set to true, if so show icon -->
                    <v-icon v-if="result.accessibility.wheelchair == true">accessible</v-icon>
                    <v-btn :to="'/results/'+searchPick +'/' + result.stop_id" icon>
                      <v-icon>arrow_right_alt</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </template>
    </template>
    <div class="loading" v-if="loading == true">
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      results: null,
      searchPick: 'accom',
      groupPick: 'friends',
      loading: false,
      wheelChair: false,
      pets: false
    }
  },
  methods: {
    changeSearch() {
      this.loading = true
      const config = {
        headers: { Authorization: 'bearer ' + process.env.API_KEY }
      }
      // Create the axios request including the headerse

      let link =
        'https://api.autoura.com/api/stops/search?group_context=' +
        this.groupPick +
        '&stop_types=' +
        this.searchPick

      if (this.wheelChair) {
        link = link + '&wheelchair=true'
      }

      // Search Requestat
      this.$axios
        .get(link, config)
        .then(response => {
          // Code works
          this.loading = false
          // We get the array and assign it to results data
          this.results = response.data.response

          if(this.pets == true) {
            // do the this.results.filter stuff here.
            // might work?
            // we assume if they allow pets it will be true. but check their data by doing more postman and see if you can find one that isnt unknown.ok
          this.results = this.results.filter(result => result.pets.accept == true)
          }

          console.log(response)
        })
        .catch(error => {
          // Code doesnt work
          console.log(error)
        })
    }
  },
  mounted() {
    // Page loads, we run the search based on default values.
    this.changeSearch()
  }
}
</script>
<style lang="scss">
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #000;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%,
  100% {
    top: 19px;
    height: 26px;
  }
}


.v-card .v-image__image:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
 background: -moz-linear-gradient(top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%);
background: -webkit-linear-gradient(top, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%);
background: linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%);
    }
</style>
