<template>
    <main class="main">
        <section v-show="isAddingExperience === false && isEditingExperience === false" class="experience-section">
            <h2 class="experience=section-title">Experience</h2>
            <ul class="experience-list">
                <li class="experience-list-item" v-for="(role, index) in experience" :key="index">
                    <button @click="editExperience(index)">edit</button>
                    <h3 class="experience-company">{{role.company}}</h3>
                    <div class="experience-title-dates-container">
                        <h4>{{role.title}}</h4>
                        <p>{{role.dates}}</p>
                    </div>
                    <p class="experience-description">{{role.description}}</p>
                </li>
            </ul>
            <button @click="addExperience()">Add Experience</button>
        </section>
        <section v-show="isAddingExperience === true" class="add-experience-section">
            <h2>Add Experience</h2>
            <form class="add-experience-section-form">
                <label>Company</label>
                <input v-model="newExperience.company"/>
                <label>Title</label>
                <input v-model="newExperience.title"/>
                <label>Years</label>
                <input v-model="newExperience.yearStart"/> to <input v-model="newExperience.yearEnd"/>
                <label>description</label>
                <textarea v-model="newExperience.description"></textarea>
                <button @click="saveNewExperience($event)">Save</button>
                <button @click="cancelAddExperience($event)">Cancel</button>
            </form>
        </section>
        <section v-show="isEditingExperience === true" class="edit-experience-section">
            <h2>Edit Experience</h2>
            <form class="edit-experience-section-form">
                <label>Company</label>
                <input v-model="selectedExperience.company"/>
                <label>Title</label>
                <input v-model="selectedExperience.title"/>
                <label>Years</label>
                <input v-model="selectedExperience.yearStart"/> to <input v-model="selectedExperience.yearEnd"/>
                <label>description</label>
                <textarea v-model="selectedExperience.description"></textarea>
                <button @click="UpdateExperience($event)">Save</button>
                <button @click="cancelEditExperience($event)">Cancel</button>
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
            newExperience: {
                company: "",
                title: "",
                description: "",
                yearStart:"",
                yearEnd: ""
            },
            selectedIndex: Number,
            selectedExperience: {}
        }
    },
    props: {
        experience: Array
    },
    methods: {
        addExperience() {
            this.isAddingExperience = true;
        },
        saveNewExperience(event) {
            event.preventDefault();
            this.$emit('newExperience',this.newExperience);
            this.newExperience = {};
            this.isAddingExperience = false;
        },
        cancelAddExperience(event) {
            event.preventDefault();
            this.isAddingExperience = false;
        },
        editExperience(index) {
            this.isEditingExperience = true;
            this.selectedIndex = index;
            this.selectedExperience = this.$props.experience[index];
        },
        UpdateExperience(event){
            event.preventDefault();
            this.$emit('updatedExperience', this.selectedExperience);
            this.selectedExperience = {};
            this.isEditingExperience = false;
        },
        cancelEditExperience(event) {
            event.preventDefault();
            this.isEditingExperience = false;
        },
    }
}
</script>

<style scoped>

.experience-section, .main {
    background: white;
    display: flex;
    flex-direction: column;
    margin: auto;
}

.experience-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.experience-list-item {
    display: flex;
    flex-direction: column;
    list-style: none;
    border-bottom: 2px solid rgb(230, 229, 229);
    padding: 0 20px;
    max-width: 600px;
}

.experience-title-dates-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.experience-company, .experience-description {
    text-align: left;
}

.add-experience-section-form {
    display: flex;
    flex-direction: column;
}

</style>