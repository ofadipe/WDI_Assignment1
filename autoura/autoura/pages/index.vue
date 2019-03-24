<template>

  <div>
    <h1>Search Autoura</h1>
    <br/>

    <form @submit.prevent="submit">

      <input placeholder="Let see if this works"
      v-model="search" autofocus />


    </form>

  </div>

</template>

<script>
export default {
  components:{

  },
  data() {
    return {
      search: ''
    }
  },
    methods: {
      submit(event) {
        this.$router.push(`results/${this.search}`);
      }
  }
}
</script>



<style>
  *{
    text-align: center;
  }

  h1 {
    padding: 20px;
  }
</style>

