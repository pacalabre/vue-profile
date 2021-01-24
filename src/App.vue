<template>
  <div id="app" class="profile-container">
    <About class="about-component" :name='userProfile.name' :picture='userProfile.picture' :bio='userProfile.bio' />
    <Experience :experience='userProfile.experience' @newExperience="addNewExperience" @updatedExperience="updateExperience" />
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
      userProfile: {},
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
  methods: {
    addNewExperience(newExperience) {
      this.userProfile.experience.push(newExperience);
      ProfileService.updateExperince(this.userProfile)
      .catch(err => {
        console.log(err);
      })
    },
    updateExperience() {
      ProfileService.updateExperince(this.userProfile)
      .catch(err => {
        console.log(err);
      })
    },

  }
}
</script>

<style>

  body {
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .profile-container {
    display: flex;
  }

  .about-component {
    width: 75%;
  }
</style>
