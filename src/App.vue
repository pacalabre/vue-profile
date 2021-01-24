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

@import url('https://fonts.googleapis.com/css2?family=Average+Sans&display=swap');

  body {
    margin: 0;
    background: #edf1f3;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }

  h1,h2,h3,h4,h5,h6,a,button,p {
    font-family: 'Average Sans', sans-serif;
    /* margin: 0;
    padding: 0; */
  }

  input {
    height: 25px;
    border: transparent;
  }

  textarea { 
    height: 100px;
    border: transparent;
  }

  .profile-container {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 768px) {
    .profile-container {
      flex-direction: row;
    }

    .about-component {
      width: 75%;
    }
  }
</style>
