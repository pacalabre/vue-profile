<template>
  <div id="app" class="profile-container">
    <About class="about-component" :name='userProfile.name' :picture='userProfile.picture' :bio='userProfile.bio' />
    <Experience :experience='userProfile.experience' @newExperience="addNewExperience" @updatedExperience="updateExperience($event)" @selectedIndexToParent="indexToUpdate($event)" />
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
      nextId: Number,
      updateIndexVal: Number
    }
  },
  created() {
      ProfileService.getProfile()
      .then(res => {
        this.userProfile = res.data[0];
        this.userProfile.experience.forEach((item, i) => {
          item.id = i + 1;
        });
        this.nextId = this.userProfile.experience.length+1;
      })
      .catch(err => {
        console.log("there was an error ", err);
      })


  },
  methods: {
    addNewExperience(newExperience) {
      newExperience.id = this.nextId;
      this.nextId++;
      this.userProfile.experience.push(newExperience);
      ProfileService.updateExperince(this.userProfile)
      .catch(err => {
        console.log(err);
      })
    },
    updateExperience(event) {
      console.log("the experience",this.userProfile.experience[this.updateIndexVal]);
      console.log("data", event)
      this.userProfile.experience[this.updateIndexVal] = {...this.userProfile.experience[this.updateIndexVal], ...event};
      
      ProfileService.updateExperince(this.userProfile)
      .catch(err => {
        console.log(err);
      })
    },
    indexToUpdate(event) {
      console.log(event);
      this.updateIndexVal = event;
    }

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
