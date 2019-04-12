<template>
  <div class="results">
    <!-- Loop through each result and create an nuxt-link that goes to /results/ID  -->
    Pick a type:
    <select name id v-model="searchPick" v-on:change="changeSearch()">
      <option value="accom">Accomodationn</option>
      <option value="food">Food</option>
      <option value="event">Event</option>
      <option value="attraction">Attraction</option>
      <option value="poi">Point of Interest</option>
      <option value="tour">Tour</option>
    </select>
    <template v-if='results!==null '>
      <template v-if="results.length == 0">Sorry there were no results</template>
      <template v-else>
        <nuxt-link
          :to="'/results/'+searchPick +'/' + result.stop_id"
          v-for="result in results"
          v-bind:key="result.stop_id"
        >{{result.name}}</nuxt-link>
      </template>
    </template>
    <div class="loading" v-if='loading == true'>
        <div class="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      results: null,
      searchPick: 'accom',
      loading: false
    }
  },
  methods: {
    changeSearch() {
        this.loading = true;
      const config = {
        headers: { Authorization: 'bearer ' + process.env.API_KEY }
      }
      // Create the axios request including the headers

      // Search Request
      this.$axios
        .get(
          'https://api.autoura.com/api/stops/search?stop_types=' +
            this.searchPick,
          config
        )
        .then(response => {
          // Code works
            this.loading = false;
          // We get the array and assign it to results data
          this.results = response.data.response

          console.log(response)
        })
        .catch(error => {
          // Code doesnt work
          console.log(error)
        })
    }
  },
  mounted() {
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
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}

</style>
