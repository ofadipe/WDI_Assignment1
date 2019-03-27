<template>
    <h1>{{name}} </h1>
</template>

<script>
import axios from 'axios'
export default {
  data (){
    return axios.get('https://api.autoura.com/api/stops/search?group_context=friends&stop_types=tour')
    .then((res) => res.data)
  }
  }
 
</script>


<style>

</style>
