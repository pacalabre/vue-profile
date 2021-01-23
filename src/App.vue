<template>
  <div id="app">
    <About />
    <Experience />
  </div>
</template>

<script>
import About from './components/About.vue'
import Experience from './components/Experience.vue'
import ProfileService from './services/ProfileService'

export default {
  name: 'App',
  components: {
    About,
    Experience
  },
  data() {
    return {
      userProfile: {}
    }
  },
  created() {
      ProfileService.getProfile()
      .then(res => {
        console.log("service res", res);
        this.userProfile = res.data[0];
      })
      .catch(err => {
        console.log("there was an error ", err);
      })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
