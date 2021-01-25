<template>
    <main class="main">
        <section v-show="isAddingExperience === false && isEditingExperience === false" class="experience-section">
            <h1 class="experience-section-title">Experience</h1>
            <ul class="experience-list">
                <li class="experience-list-item" v-for="(role, index) in experience" :key="index">
                    <button class="experience-btn-edit" @click="editExperience(index)">edit</button>
                    <h2 class="experience-company">{{role.company}}</h2>
                    <div class="experience-title-dates-container">
                        <p class="experience-role">{{role.title}}</p>
                        <p class="experience-dates">{{role.dates}}<span v-if="role.dates && role.dates.length === 5">Current</span></p>
                    </div>
                    <p class="experience-description">{{role.description}}</p>
                </li>
            </ul>
            <button class="form-btn add-experience-btn" @click="addExperience()">Add Experience</button>
        </section>
        <section v-show="isAddingExperience === true" class="add-experience-section">
            <h2>Add Experience</h2>
            <form class="add-experience-section-form">
                <label class="form-label">Company</label>
                <input v-model="newExperience.company"/>
                <label class="form-label">Title</label>
                <input v-model="newExperience.title"/>
                <label class="form-label">Year Start</label>
                <input v-model="newExperience.yearStart"/>
                <span class="form-warning" v-if="formSubmitAttempt && missingYearStartAddExp">This field is required</span>
                <span class="form-warning" v-else-if="formSubmitAttempt && yearStartNotNumsAddExp">Only Numbers are allowed</span>
                <span class="form-warning" v-else-if="formSubmitAttempt && yearStartMustBeFourDigitsAddExp">This field must contain 4 digits</span>
                <label class="form-label">Year End</label>
                <input v-model="newExperience.yearEnd"/>
                <label class="form-label">Description</label>
                <textarea v-model="newExperience.description"></textarea>
                <div class="form-btn-container">
                    <button class="form-btn" @click="saveNewExperience($event)">Save</button>
                    <button class="form-btn form-btn-cancel" @click="cancelAddExperience($event)">Cancel</button>
                </div>
            </form>
        </section>
        <section v-show="isEditingExperience === true" class="edit-experience-section">
            <h2>Edit Experience</h2>
            <form class="edit-experience-section-form">
                <label class="form-label">Company</label>
                <input v-model="selectedExperience.company"/>
                <label class="form-label">Title</label>
                <input v-model="selectedExperience.title"/>
                <label class="form-label">Year Start</label>
                <span class="form-warning" v-if="formSubmitAttempt && missingYearStartEditExp">This field is required</span>
                <span class="form-warning" v-else-if="formSubmitAttempt && yearStartNotNumsEditExp">Only Numbers are allowed</span>
                <span class="form-warning" v-else-if="formSubmitAttempt && yearStartMustBeFourDigitsEditExp">This field must contain 4 digits</span>
                <input v-model="selectedExperience.yearStart"/>
                <label class="form-label">Year End</label>
                <input v-model="selectedExperience.yearEnd"/>
                <label class="form-label">description</label>
                <textarea v-model="selectedExperience.description"></textarea>
                <div class="form-btn-container">
                    <button class="form-btn" @click="UpdateExperience($event)">Save</button>
                    <button class="form-btn form-btn-cancel" @click="cancelEditExperience($event)">Cancel</button>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
export default {
    data() {
        return {
            isAddingExperience: false,
            isEditingExperience: false,
            formSubmitAttempt: false,
            buildString: "",
            newExperience: {
                company: "",
                title: "",
                description: "",
                yearStart:"",
                yearEnd: "",
                dates: "",
            },
            selectedIndex: Number,
            selectedExperience: {
                company: "",
                title: "",
                description: "",
                yearStart:"",
                yearEnd: "",
                dates: "",
            },
        }
    },
    props: {
        experience: Array
    },
    watch: {
        newExperience: {
            handler: function(after) {
                this.newExperience.dates = `${after.yearStart}|${after.yearEnd}`
            },
            deep: true
        },
        selectedExperience: {
            handler: function(after) {
                this.selectedExperience.dates = `${after.yearStart}|${after.yearEnd}`
            },
            deep: true
        },
    },
    computed: {
        missingYearStartAddExp: function () {
            return this.newExperience.yearStart === "" ; 
        },
        yearStartNotNumsAddExp: function () {
            return isNaN(this.newExperience.yearStart); 
        },
        yearStartMustBeFourDigitsAddExp: function () {
            return this.newExperience.yearStart.length !== 4;
        },
        missingYearStartEditExp: function () {
            return this.selectedExperience.yearStart === "" ; 
        },
        yearStartNotNumsEditExp: function () {
            return isNaN(this.selectedExperience.yearStart); 
        },
        yearStartMustBeFourDigitsEditExp: function () {
            return this.selectedExperience.yearStart.length !== 4;
        },
  },
    methods: {
        addExperience() {
            this.isAddingExperience = true;
        },
        saveNewExperience(event) {
            event.preventDefault();
            if(this.missingYearStartAddExp || this.yearStartNotNumsAddExp || this.yearStartMustBeFourDigitsAddExp) {
                this.formSubmitAttempt = true;
                return;
            }
            this.$emit('newExperience',this.newExperience);
            this.resetNewExperienceForm();
        },
        resetNewExperienceForm() {
            this.newExperience = {
                company: "",
                title: "",
                description: "",
                yearStart:"",
                yearEnd: "",
                dates: "",
            };
            this.isAddingExperience = false;
            this.formSubmitAttempt = false;
        },
        cancelAddExperience(event) {
            event.preventDefault();
            this.resetNewExperienceForm();
            this.isAddingExperience = false;
        },
        editExperience(index) {
            this.isEditingExperience = true;
            this.selectedIndex = index;
            const yearStartStr = this.$props.experience[index].dates.substring(0,4);
            const yearEndStr = this.getYearEnd(this.$props.experience[index].dates);
            this.selectedExperience = {
                company: this.$props.experience[index].company,
                dates: this.$props.experience[index].dates,
                description: this.$props.experience[index].description,
                id: this.$props.experience[index].id,
                title: this.$props.experience[index].title,
                yearStart:yearStartStr,
                yearEnd: yearEndStr,
            }
        },
        getYearEnd(str) {
            if(str.length === 5) {
                return "Current"
            } else if (str.length > 5) {
                return str.split('|')[1];
            }
        },
        UpdateExperience(event){
            event.preventDefault();
            if(this.missingYearStartEditExp || this.yearStartNotNumsEditExp || this.yearStartMustBeFourDigitsEditExp) {
                this.formSubmitAttempt = true;
                return;
            }
            this.$emit('selectedIndexToParent', this.selectedIndex)
            this.$emit('updatedExperience', this.selectedExperience);

            this.selectedExperience = {};
            this.isEditingExperience = false;
        },
        cancelEditExperience(event) {
            event.preventDefault();
            this.selectedExperience = {};
            this.isEditingExperience = false;
        },

    }
}
</script>

<style scoped>


.main {
    width: 100%;
    min-height: 100vh;
}

.experience-section-title {
    font-size: 1.75rem;
}

.experience-section, .main {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
}

.experience-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0;
}

.experience-list-item {
    display: flex;
    flex-direction: column;
    list-style: none;
    max-width: 600px;
    background: white;
    margin: 20px;
    padding: 10px 25px;
    border-radius: 8px;
}

.experience-title-dates-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.experience-company, .experience-description {
    text-align: left;
    margin-top: 0;
    margin-bottom: 0;
}

.experience-role, .experience-dates {
    margin-top: 0;
    margin-bottom: 0;
}

.experience-description {
    margin-top: 10px;
    margin-bottom: 10px;
}

.experience-btn-edit {
    align-self: flex-end;
    background: transparent;
    border-color: transparent;
    color: white;
    font-size: 14px;
    color: #2573db;
}

.add-experience-section, .edit-experience-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    margin: 80px auto;
    height: 100vh;
}

.add-experience-section-form, .edit-experience-section-form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    align-self: center;
    width: 90%;
}

.add-experience-btn {
    align-self: center;
    margin: 15px auto;
}

.form-btn-container {
    margin-top: 20px;
}

.form-btn {
    background: #2573db;
    color: white;
    font-size: 20px;
    max-width: 175px;
    border-radius: .5rem;
    border: none;
    padding: 8px 16px;
    margin: 0 5px;
}

.form-label {
    align-self: baseline;
    margin-top: 15px;
}

.form-btn-cancel {
    background: transparent;
    border: #2573db solid thin;
    color: #2573db;
}

.form-warning {
    color: red;
}

.form-btn:hover {
    background: #3089ff;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
}

.form-btn-cancel:hover {
    background: #2573db;
    border: #2573db solid thin;
    color: white;
}

.experience-btn-edit:hover {
    cursor: pointer;
}

</style>