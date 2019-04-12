<template>
  <div v-if="object !== null">
    <h1>Hello {{object.name}} your id is {{$route.params.id}}</h1>
    <img
      :src="object.picture.url"
      class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
      alt
    >
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
  </div>
</template>
<style>
</style>
<script>
export default {
  data() {
    return {
      object: null
    }
  },
  mounted() {
    // process.env.variablename for environment variables output
    console.log('The API key is: ' + process.env.API_KEY)

    // Provide Authroization Header that is a bearer
    const config = {
      headers: { Authorization: 'bearer ' + process.env.API_KEY }
    }
    // Create the axios request including the headers
    this.$axios
      .get(
        // The ID paramater gets taken from the localhost URL and put to our API Search
        'https://api.autoura.com/api/stops/get?stop_id=&wheelchair=true' +
          this.$route.params.id,
        config
      )
      .then(response => {
        // Code works
        this.object = response.data.response[0]

        console.log(response)
      })
      .catch(error => {
        // Code doesnt work
        console.log(error)
      })
  }
}
</script>

