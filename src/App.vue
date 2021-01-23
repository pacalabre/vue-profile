<template>
  <div id="app">
    <About :name='userProfile.name' :picture='userProfile.picture' :bio='userProfile.bio' />
    <Experience :experience='userProfile.experience' />
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
